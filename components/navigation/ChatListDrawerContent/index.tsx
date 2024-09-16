import { View, Text, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useNewChatModalStore } from '@/stores'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { db, conversations } from '@/db'
import { desc } from 'drizzle-orm'
import { Props } from './props'

export function ChatListDrawerContent({ ...restProps }: Props) {
  //= ========= HOOKS ==========
  const { styles } = useStyles(styleSheets)
  const { openModal } = useNewChatModalStore(({ openModal }) => ({ openModal }))
  const { data } = useLiveQuery(
    db.select().from(conversations).orderBy(desc(conversations.createdAt))
  )

  //========== STATES ==========
  const [conversationItems, setConversationItems] = useState(data)

  return (
    <SafeAreaView style={styles.drawerWrapper}>
      <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
        <DrawerItemList {...restProps} />
        <Pressable style={styles.drawerItemContainer} onPress={openModal}>
          {({ pressed }) => (
            <View style={styles.drawerItem(pressed)}>
              <Text style={styles.drawerItemLabel}>New</Text>
              <Feather
                name="plus-circle"
                size={16}
                style={styles.drawerItemIcon}
              />
            </View>
          )}
        </Pressable>
        {/* TODO: restyle this */}
        <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
        {conversationItems.map((conversation) => (
          <DrawerItem
            key={conversation.id}
            label={conversation.title}
            onPress={() => {}}
          />
        ))}
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
  drawerItemContainer: {
    padding: 10,
  },
  drawerItem: (pressed: boolean) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: pressed ? '#EFBBFF' : '#D896FF',
    padding: 10,
    borderRadius: 5,
  }),
  drawerItemLabel: {
    marginRight: theme.margins.sm,
    color: 'white',
  },
  drawerItemIcon: {
    color: 'white',
  },
}))
