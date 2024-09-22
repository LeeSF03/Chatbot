import { View, Text } from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { hexColorOnInteract } from '@/helpers'

export default function ChatScreen() {
  //========== HOOKS ==========
  const { styles } = useStyles(chatScreenStyleSheets)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Create New Chat</Text>
      </View>
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
