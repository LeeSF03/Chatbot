import { View, Text, Platform, Pressable, Keyboard } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import {
  DrawerContentScrollView,
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
import { ChtChatDrawerDropdownMenu } from '@/components/ChtDropdownMenu'
import { deleteConversation, hexColorOnInteract } from '@/helpers'
import { useRouter } from 'expo-router'

import { Props } from './props'

export function ChatListDrawerContent({ ...restProps }: Props) {
  // close the keyboard when drawer is opened
  Keyboard.dismiss()

  //========== HOOKS ==========
  const { styles, theme } = useStyles(styleSheets)
  const router = useRouter()
  const { openModal } = useNewChatModalStore((state) => ({
    openModal: state.openModal,
  }))
  const { conversations, setConversations, removeConversation } =
    useConversationStore((state) => ({
      conversations: state.conversations,
      setConversations: state.setConversations,
      removeConversation: state.removeConversation,
    }))
  const { data } = useLiveQuery(
    db
      .select()
      .from(conversationSchema)
      .orderBy(desc(conversationSchema.createdAt))
  )

  //========== STATES ==========
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null)

  //========== VARIABLES ==========
  const primaryOnInteract = useMemo(
    () => hexColorOnInteract(theme.colors.primary),
    [theme.colors.primary]
  )

  //========== FUNCTIONS ==========
  const handleDeleteConversation = (id: number) => {
    removeConversation(id)
    deleteConversation(id)
  }
  const handleEditConversation = (id: number) => {
    console.log('edit', id)
  }
  const handleConversationItemPress = (id: number) => {
    setSelectedConversation(id)
    router.push({
      pathname: '/(chats)[conversationId]',
      params: { conversationId: id },
    })
  }

  //========== EFFECTS ==========
  useEffect(() => {
    setConversations(data)
  }, [data])

  return (
    <SafeAreaView style={styles.drawerWrapper}>
      <View style={styles.drawerItemContainer}>
        <Pressable
          style={(state) => [
            styles.drawerItem,
            {
              backgroundColor:
                state.pressed && Platform.OS === 'ios' ? '#EFBBFF' : '#D896FF',
            },
          ]}
          onPress={openModal}
          android_ripple={{ color: '#EFBBFF' }}
        >
          <Text style={styles.newChatItemLabel}>New</Text>
          <Feather name="plus-circle" size={16} style={styles.drawerItemIcon} />
        </Pressable>
      </View>
      {/* TODO: restyle this */}
      <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
      <DrawerContentScrollView>
        <DrawerItemList {...restProps} />
        {conversations.map(({ id, title }) => (
          <View key={id} style={styles.drawerItemContainer}>
            <Pressable
              key={id}
              style={(state) => [
                styles.drawerItem,
                selectedConversation === id
                  ? {
                      backgroundColor:
                        state.pressed && Platform.OS === 'ios'
                          ? primaryOnInteract
                          : theme.colors.primary,
                    }
                  : {
                      backgroundColor:
                        state.pressed && Platform.OS === 'ios'
                          ? '#EFBBFF'
                          : '#D896FF',
                    },
              ]}
              onPress={() => {
                setSelectedConversation(id)
                handleConversationItemPress(id)
              }}
              android_ripple={{
                color:
                  selectedConversation === id ? primaryOnInteract : '#EFBBFF',
              }}
            >
              <Text style={styles.conversationItemLabel}>{title}</Text>
              {/* have to wrap the dropdown in view, otherwise the press colorchange of the view parent can only happen once for some reason */}
              <View>
                <ChtChatDrawerDropdownMenu
                  trigger={
                    <Entypo
                      name="dots-three-vertical"
                      size={16}
                      style={styles.drawerItemIcon}
                    />
                  }
                  items={[
                    {
                      key: 'delete',
                      title: 'Delete',
                      onPress: () => handleDeleteConversation(id),
                    },
                    {
                      key: 'edit',
                      title: 'Edit',
                      onPress: () => handleEditConversation(id),
                    },
                  ]}
                />
              </View>
            </Pressable>
          </View>
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
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  newChatItemLabel: {
    marginRight: theme.margins.sm,
    color: 'white',
  },
  conversationItemLabel: {
    flex: 1,
    color: 'white',
  },
  drawerItemIcon: {
    color: 'white',
  },
}))
