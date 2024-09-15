import { View, Text, Platform } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Props } from './props'

export function ChatListDrawerContent({ ...restProps }: Props) {
  //= ========= HOOKS ==========
  const { styles } = useStyles(styleSheets)
  const router = useRouter()

  //= ========= VARIABLES ==========
  const { state, navigation } = restProps
  // console.log('state', state)

  //= ========= CALLBACKS ==========
  const handleNavigateNewChatPage = () => {
    router.navigate('/(chats)/')
  }
  return (
    <SafeAreaView style={styles.drawerWrapper}>
      <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
        <DrawerItemList {...restProps} />
      </DrawerContentScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerLabel}>CHATBOT</Text>
      </View>
    </SafeAreaView>
  )
}

const styleSheets = createStyleSheet((theme, runtime) => ({
  drawerWrapper: {
    flex: 1,
    backgroundColor: theme.colors.lightPrimary,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  drawerContainer: {
    flex: 1,
  },
  footerContainer: {
    height: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabel: {
    color: 'white',
    fontFamily: 'JetBrains',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
}))
