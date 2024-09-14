import React from 'react'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ChatListDrawerContent } from '@/components'
import { useStyles, createStyleSheet } from 'react-native-unistyles'

export default function TabLayout() {
  const { styles } = useStyles(styleSheets)

  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={ChatListDrawerContent}
        screenOptions={{
          headerStyle: styles.headerBackgroundContainer,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: 'white',
          drawerItemStyle: styles.item,
          drawerLabelStyle: styles.itemLabel,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'New Chat',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

const styleSheets = createStyleSheet((theme) => ({
  headerBackgroundContainer: {
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    color: 'white',
  },
  item: {
    backgroundColor: theme.colors.primary,
  },
  itemLabel: {
    color: 'white',
  },
}))
