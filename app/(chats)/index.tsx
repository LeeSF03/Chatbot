import { View, Image } from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { ChtMessageBubble } from '@/components'
import { useMemo } from 'react'
import Svg, { Circle } from 'react-native-svg'
import ChatRobot from '@/assets/images/chat/chat-robot.png'

type ChatSectionProps = {
  type?: 'sent' | 'received'
  message: string
}

const ChatSection = ({ type = 'sent', message }: ChatSectionProps) => {
  //========== HOOKS ==========
  const { styles } = useStyles(chatSectionStyleSheets, {
    type,
  })

  //========== VARIABLES ==========
  const RobotProfile = useMemo(
    () =>
      type === 'received' ? (
        <Image source={ChatRobot} style={styles.chatRobotImage} />
      ) : null,
    [type]
  )

  return (
    <View style={styles.messageWrapper}>
      <View style={styles.messageContainer}>
        {RobotProfile}
        <ChtMessageBubble message={message} type={type} />
      </View>
    </View>
  )
}

const chatSectionStyleSheets = createStyleSheet((theme) => ({
  messageWrapper: {
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
  messageContainer: {
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

export default function ChatScreen() {
  const { styles } = useStyles(chatScreenStyleSheets)

  return (
    <View style={styles.chatPageContainer}>
      <ChatSection message="asdlfa sdl;fkj;as dsdsdfgdfg dsfgsd fsdf gsdfgsdfgs dfgsd fgsdfg sdfgdsfgdf gsdfgdsfglfj" />
      <ChatSection
        message="asd lfasdl ;fkj; asdlfj aasdas dasd asds dsdfgsd fgsdf gdsfgsdf sdfasdf asdfasdf asdfasd"
        type="received"
      />
    </View>
  )
}

const chatScreenStyleSheets = createStyleSheet((theme) => ({
  chatPageContainer: {
    flex: 1,
    backgroundColor: theme.colors.lightPrimary,
    padding: theme.paddings.md,
  },
}))
