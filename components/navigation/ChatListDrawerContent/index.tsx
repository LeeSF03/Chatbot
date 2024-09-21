import { View, Text, Platform, Pressable } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useConversationStore, useNewChatModalStore } from '@/stores'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { db, conversationSchema } from '@/db'
import { desc } from 'drizzle-orm'
import Entypo from '@expo/vector-icons/Entypo'
import { Props } from './props'

export function ChatListDrawerContent({ ...restProps }: Props) {
  //========== HOOKS ==========
  const { styles } = useStyles(styleSheets)
  const { openModal } = useNewChatModalStore((state) => ({
    openModal: state.openModal,
  }))
  const { conversations, setConversations } = useConversationStore((state) => ({
    conversations: state.conversations,
    setConversations: state.setConversations,
  }))
  const { data } = useLiveQuery(
    db
      .select()
      .from(conversationSchema)
      .orderBy(desc(conversationSchema.createdAt))
  )

  //========== EFFECTS ==========
  useEffect(() => {
    setConversations(data)
  }, [data])

  return (
    <SafeAreaView style={styles.drawerWrapper}>
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
      <DrawerContentScrollView>
        <DrawerItemList {...restProps} />
        {conversations.map(({ id, title }) => (
          <Pressable
            key={id}
            style={styles.drawerItemContainer}
            onPress={() => console.log('pressed', id)}
          >
            {({ pressed }) => (
              <View style={styles.drawerItem(pressed)}>
                <Text style={styles.drawerItemLabel}>{title}</Text>
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  style={styles.drawerItemIcon}
                />
              </View>
            )}
          </Pressable>
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
    flex: 1,
    marginRight: theme.margins.sm,
    color: 'white',
  },
  drawerItemIcon: {
    color: 'white',
  },
}))
