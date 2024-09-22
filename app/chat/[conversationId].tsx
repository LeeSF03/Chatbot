import { View, Image, FlatList, Pressable, Keyboard } from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { ChtMessageBubble, ChtTextInput } from '@/components'
import { useMemo, useState } from 'react'
import ChatRobot from '@/assets/images/chat/chat-robot.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useKeyboardGradualHeightAnimation } from '@/hooks'
import Animated from 'react-native-reanimated'
import { ChtSpacer } from '@/components/ChtSpacer'
import Ionicons from '@expo/vector-icons/Ionicons'
import { hexColorOnInteract } from '@/helpers'
import { Controller, useForm } from 'react-hook-form'
import { useNewChatModalStore } from '@/stores'
import { useLocalSearchParams } from 'expo-router'

type ChatSectionProps = {
  type?: 'sent' | 'received'
  message: string
}

function ChatSection({ type = 'sent', message }: ChatSectionProps) {
  //= ========= HOOKS ==========
  const { styles } = useStyles(chatSectionStyleSheets, {
    type,
  })

  //= ========= VARIABLES ==========
  const RobotProfile = useMemo(
    () =>
      type === 'received' ? (
        <Image source={ChatRobot} style={styles.chatRobotImage} />
      ) : null,
    [type]
  )

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

type Message = {
  id: number
  message: string
  type: 'sent' | 'received'
}

const ChatScreen = () => {
  //========== HOOKS ==========
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const { styles } = useStyles(chatScreenStyleSheets)
  const { animatedStyle } = useKeyboardGradualHeightAnimation()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      message: `this is chat id ${conversationId}`,
      type: 'sent',
    },
  ])
  const { isOpen } = useNewChatModalStore(({ isOpen }) => ({ isOpen }))
  const { control, handleSubmit } = useForm({
    defaultValues: {
      message: '',
    },
  })

  // TODO: delete later
  const demoMessages: Message[] = useMemo(
    () => [
      {
        id: 0,
        message: `this is chat id ${conversationId}`,
        type: 'sent',
      },
    ],
    [conversationId]
  )

  //========== FUNCTIONS ==========
  const onSendMessage = (data: { message: string }) => {
    Keyboard.dismiss()
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length,
        message: data.message,
        type: 'sent',
      },
    ])
  }

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
      <View style={styles.textInputContainer}>
        <Controller
          name="message"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, ...rest } }) => (
            <ChtTextInput
              style={styles.textInput}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSendMessage)}
              {...rest}
            />
          )}
        />
        <Pressable onPress={handleSubmit(onSendMessage)}>
          {({ pressed }) => (
            <Ionicons
              name="send-sharp"
              size={24}
              style={styles.sendIcon(pressed)}
            />
          )}
        </Pressable>
      </View>
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
