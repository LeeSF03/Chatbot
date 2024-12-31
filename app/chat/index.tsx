import { View, Text } from 'react-native'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function ChatScreen() {
  //========== HOOKS ==========
  const { styles } = useStyles(chatScreenStyleSheets)

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="chat-plus-outline"
          size={96}
          color="purple"
        />
        <Text>Chat Screen</Text>
      </View>
    </SafeAreaView>
  )
}

const chatScreenStyleSheets = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightPrimary,
  },
}))
