import {
  View,
  Text,
  Platform,
  Pressable,
  PressableStateCallbackType,
} from 'react-native'
import React, { useEffect } from 'react'
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
import { ChtChatDrawerDropdownMenu } from '@/components'

import { Props } from './props'

export function ChatListDrawerContent({ ...restProps }: Props) {
  //========== HOOKS ==========
  const { styles } = useStyles(styleSheets)
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

  //========== FUNCTIONS ==========
  const handleDeleteConversation = (id: number) => {
    console.log('delete', id)
  }
  const handleEditConversation = (id: number) => {
    console.log('edit', id)
  }

  //========== EFFECTS ==========
  useEffect(() => {
    setConversations(data)
  }, [data])

  return (
    <SafeAreaView style={styles.drawerWrapper}>
      <View style={styles.drawerItemContainer}>
        <Pressable
          style={styles.drawerItem}
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
              style={styles.drawerItem}
              onPress={() => console.log('pressed', id)}
              android_ripple={{ color: '#EFBBFF' }}
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
  drawerItem: (state: PressableStateCallbackType) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      state.pressed && Platform.OS === 'ios' ? '#EFBBFF' : '#D896FF',
    padding: 10,
    borderRadius: 5,
  }),
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
