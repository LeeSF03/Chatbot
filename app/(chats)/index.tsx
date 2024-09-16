import {
  View,
  Image,
  FlatList,
  Pressable,
  Button,
  Keyboard,
} from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { ChtMessageBubble, ChtTextInput } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import ChatRobot from '@/assets/images/chat/chat-robot.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useKeyboardGradualHeightAnimation } from '@/hooks'
import Animated from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { ChtSpacer } from '@/components/ChtSpacer'
import Ionicons from '@expo/vector-icons/Ionicons'
import { hexColorOnInteract } from '@/helpers'
import { Controller, useForm } from 'react-hook-form'
import { useNewChatModalStore } from '@/stores'

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

const dummyMessages: Message[] = [
  {
    id: 0,
    message:
      'asdlfa sdl;fkj;as dsdsdfgdfg dsfgsd fsdf gsdfgsdfgs dfgsd fgsdfg sdfgdsfgdf gsdfgdsfglfj',
    type: 'sent',
  },
  {
    id: 1,
    message:
      'asd lfasdl ;fkj; asdlfj aasdas dasd asds dsdfgsd fgsdf gdsfgsdf sdfasdf asdfasdf asdfasd',
    type: 'received',
  },
  {
    id: 2,
    message: 'agsdfgasasdf',
    type: 'sent',
  },
  {
    id: 3,
    message:
      ';lkj;lkj;lkj;lkj;lkj;lkj;ll;kj;lkj;lkj;lkjl;kj;jlkj;kjlklk;lklklk',
    type: 'received',
  },
  {
    id: 4,
    message:
      'asdlfa sdl;fkj;as dsdsdfgdfg dsfgsd fsdf gsdfgsdfgs dfgsd fgsdfg sdfgdsfgdf gsdfgdsfglfj',
    type: 'sent',
  },
  {
    id: 5,
    message:
      'asd lfasdl ;fkj; asdlfj aasdas dasd asds dsdfgsd fgsdf gdsfgsdf sdfasdf asdfasdf asdfasd',
    type: 'received',
  },
  {
    id: 6,
    message: 'agsdfgasasdf',
    type: 'sent',
  },
  {
    id: 7,
    message:
      ';lkj;lkj;lkj;lkj;lkj;lkj;ll;kj;lkj;lkj;lkjl;kj;jlkj;kjlklk;lklklk',
    type: 'received',
  },
  {
    id: 8,
    message:
      'asdlfa sdl;fkj;as dsdsdfgdfg dsfgsd fsdf gsdfgsdfgs dfgsd fgsdfg sdfgdsfgdf gsdfgdsfglfj',
    type: 'sent',
  },
  {
    id: 9,
    message:
      'asd lfasdl ;fkj; asdlfj aasdas dasd asds dsdfgsd fgsdf gdsfgsdf sdfasdf asdfasdf asdfasd',
    type: 'received',
  },
  {
    id: 10,
    message: 'agsdfgasasdf',
    type: 'sent',
  },
  {
    id: 11,
    message:
      ';lkj;lkj;lkj;lkj;lkj;lkj;ll;kj;lkj;lkj;lkjl;kj;jlkj;kjlklk;lklklk',
    type: 'received',
  },
]

export default function ChatScreen() {
  //========== HOOKS ==========
  const { styles } = useStyles(chatScreenStyleSheets)
  const { animatedStyle } = useKeyboardGradualHeightAnimation()
  const [messages, setMessages] = useState(dummyMessages)
  const { isOpen } = useNewChatModalStore(({ isOpen }) => ({ isOpen }))
  const { control, handleSubmit } = useForm({
    defaultValues: {
      message: '',
    },
  })

  //========== FUNCTIONS ==========
  const onSendMessage = (data: { message: string }) => {
    Keyboard.dismiss()
    console.log(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
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
