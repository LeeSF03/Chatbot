import { View, Image, Text } from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { ChtMessageBubble } from '@/components'
import { useMemo } from 'react'
import Svg, { Circle } from 'react-native-svg'
import ChatRobot from '@/assets/images/chat/chat-robot.png'
import { SafeAreaView } from 'react-native-safe-area-context'

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

export default function ChatScreen() {
  const { styles } = useStyles(chatScreenStyleSheets)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        <ChatSection message="asdlfa sdl;fkj;as dsdsdfgdfg dsfgsd fsdf gsdfgsdfgs dfgsd fgsdfg sdfgdsfgdf gsdfgdsfglfj" />
        <ChatSection
          message="asd lfasdl ;fkj; asdlfj aasdas dasd asds dsdfgsd fgsdf gdsfgsdf sdfasdf asdfasdf asdfasd"
          type="received"
        />
        <ChatSection message="agsdfgasasdf" />
        <ChatSection
          message=";lkj;lkj;lkj;lkj;lkj;lkj;ll;kj;lkj;lkj;lkjl;kj;jlkj;kj';lk';lk;'lk';lk';lk';lk"
          type="received"
        />
      </View>
      <View>
        <Text>Text Input</Text>
      </View>
    </SafeAreaView>
  )
}

const chatScreenStyleSheets = createStyleSheet((theme) => ({
  chatContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightPrimary,
    paddingHorizontal: theme.paddings.md,
  },
}))
