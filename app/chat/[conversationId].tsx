import {
  View,
  Image,
  FlatList,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import {
  ChtMessageBubble,
  ChtTextInput,
  ChtMessageBubbleProps,
} from '@/components'
import { useEffect, useState } from 'react'
import ChatRobot from '@/assets/images/chat/chat-robot.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useKeyboardGradualHeightAnimation } from '@/hooks'
import Animated from 'react-native-reanimated'
import { ChtSpacer } from '@/components/ChtSpacer'
import Ionicons from '@expo/vector-icons/Ionicons'
import { hexColorOnInteract, createMessage } from '@/helpers'
import { Controller, useForm } from 'react-hook-form'
import { useNewChatModalStore } from '@/stores'
import { useLocalSearchParams } from 'expo-router'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { db, messageSchema } from '@/db'
import { eq } from 'drizzle-orm'
import { useMutation } from '@tanstack/react-query'

function ChatSection({ type = 'sent', message }: ChtMessageBubbleProps) {
  //= ========= HOOKS ==========
  const { styles } = useStyles(chatSectionStyleSheets, {
    type,
  })

  //= ========= VARIABLES ==========
  const RobotProfile =
    type === 'received' ? (
      <Image source={ChatRobot} style={styles.chatRobotImage} />
    ) : null

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {RobotProfile}
        <ChtMessageBubble message={message} type={type} />
      </View>
    </View>
  )
}

const chatSectionStyleSheets = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    marginBottom: theme.margins.md,
    variants: {
      type: {
        sent: {
          justifyContent: 'flex-end',
        },
        received: {
          justifyContent: 'flex-start',
        },
      },
    },
  },
  section: {
    flexDirection: 'row',
    width: {
      sm: 600,
    },
    maxWidth: '85%',
    columnGap: theme.margins.sm,
  },
  chatRobotImage: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#1C0055',
  },
}))

type Message = ChtMessageBubbleProps & {
  id: number
  createdAt: number
  conversationId: number
}

type MessageSend = {
  message: string
}

type OllamaResponse = { context: number[]; response: string; done: boolean }

const ChatScreen = () => {
  //========== HOOKS ==========
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const { styles } = useStyles(chatScreenStyleSheets)
  const { animatedStyle } = useKeyboardGradualHeightAnimation()
  const { isOpen } = useNewChatModalStore(({ isOpen }) => ({ isOpen }))
  const { data } = useLiveQuery(
    db
      .select()
      .from(messageSchema)
      .where(eq(messageSchema.conversationId, parseInt(conversationId)))
      .orderBy(messageSchema.createdAt),
    [conversationId]
  )
  const { control, handleSubmit, reset } = useForm<MessageSend>({
    defaultValues: {
      message: '',
    },
  })
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: MessageSend) => {
      // console.log('getting ollama message')
      let json: OllamaResponse | null = null

      const res = await fetch('http://10.0.2.2:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.1:8b',
          prompt: data.message,
          stream: false,
        }),
      }).catch((err) => console.error(err))

      if (!res) return json

      json = await res.json()

      return json
    },
  })

  //========== STATES ==========
  const [messages, setMessages] = useState<Message[]>(data as Message[])

  //========== FUNCTIONS ==========
  const onSendMessage = async (data: MessageSend) => {
    Keyboard.dismiss()
    const messages = (await createMessage(
      data.message,
      parseInt(conversationId)
    )) as Message[]

    reset()

    setMessages((prevMessages) => [
      ...prevMessages,
      ...messages,
      {
        message: <ActivityIndicator />,
        type: 'received',
        createdAt: Date.now(),
        conversationId: parseInt(conversationId),
        id: -1,
      },
    ])

    const res = await mutateAsync(data)
    if (!res) {
      console.error('Failed to get ollama message')
      return
    }

    const ollamaMessage = res.response
    const ollamaMessages = (await createMessage(
      ollamaMessage,
      parseInt(conversationId),
      'received'
    )) as Message[]

    setMessages((prevMessages) => {
      prevMessages.pop() // remove the loading indicator
      return [...prevMessages, ...ollamaMessages]
    })
  }

  //========== EFFECTS ==========
  useEffect(() => {
    setMessages(data as Message[])
  }, [data])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatSection message={item.message} type={item.type} />
        )}
        ListHeaderComponent={<ChtSpacer />}
        style={styles.chatContainer}
      />
      <Controller
        name="message"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ...rest } }) => (
          <View style={styles.textInputContainer}>
            <ChtTextInput
              style={styles.textInput}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSendMessage)}
              value={value}
              {...rest}
            />
            <Pressable
              onPress={handleSubmit(onSendMessage)}
              disabled={isPending || !value}
            >
              {({ pressed }) => (
                <Ionicons
                  name="send-sharp"
                  size={24}
                  style={styles.sendIcon(pressed)}
                />
              )}
            </Pressable>
          </View>
        )}
      />
      {!isOpen && <Animated.View style={animatedStyle} />}
    </SafeAreaView>
  )
}

const chatScreenStyleSheets = createStyleSheet((theme) => ({
  chatContainer: {
    flex: 1,
    paddingHorizontal: theme.paddings.md,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightPrimary,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.paddings.md,
    backgroundColor: theme.colors.primary,
    borderTopWidth: 2,
    borderTopColor: '#1C0055',
    columnGap: theme.margins.md,
  },
  textInput: {
    flex: 1,
    flexShrink: 1,
  },
  sendIcon: (pressed: boolean) => ({
    color: pressed
      ? hexColorOnInteract(theme.colors.lightPrimary)
      : theme.colors.lightPrimary,
  }),
}))

export default ChatScreen
