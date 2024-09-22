import { View, Text, Platform, Pressable } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
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
  //========== HOOKS ==========
  const { styles, theme } = useStyles(styleSheets)
  const { push } = useRouter()
  const { openModal } = useNewChatModalStore((state) => ({
    openModal: state.openModal,
  }))
  const {
    conversations,
    setConversations,
    removeConversation,
    selectedConversation,
    selectConversation,
  } = useConversationStore((state) => ({
    conversations: state.conversations,
    setConversations: state.setConversations,
    removeConversation: state.removeConversation,
    selectedConversation: state.selectedConversation,
    selectConversation: state.selectConversation,
  }))
  const { data } = useLiveQuery(
    db
      .select()
      .from(conversationSchema)
      .orderBy(desc(conversationSchema.createdAt))
  )

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
  const handleConversationItemPress = (
    conversation: Exclude<typeof selectedConversation, null>
  ) => {
    selectConversation(conversation)
    push({
      pathname: '/chat/[conversationId]',
      params: { conversationId: conversation.id },
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
        {conversations.map((conversation) => (
          <View key={conversation.id} style={styles.drawerItemContainer}>
            <Pressable
              key={conversation.id}
              style={(state) => [
                styles.drawerItem,
                selectedConversation?.id === conversation.id
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
                handleConversationItemPress(conversation)
              }}
              android_ripple={{
                color:
                  conversation?.id === selectedConversation?.id
                    ? primaryOnInteract
                    : '#EFBBFF',
              }}
            >
              <Text style={styles.conversationItemLabel}>
                {conversation.title}
              </Text>
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
                      onPress: () => handleDeleteConversation(conversation.id),
                    },
                    {
                      key: 'edit',
                      title: 'Edit',
                      onPress: () => handleEditConversation(conversation.id),
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
    fontFamily: 'JetBrains',
  },
  drawerItemIcon: {
    color: 'white',
  },
}))
