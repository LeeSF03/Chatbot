import React from 'react'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ChatListDrawerContent, ChtTextInput } from '@/components'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { Text, Pressable, View, Keyboard } from 'react-native'
import { useConversationStore, useNewChatModalStore } from '@/stores'
import Feather from '@expo/vector-icons/Feather'
import { Controller, useForm } from 'react-hook-form'
import { createConversation } from '@/helpers'

type Conversation = {
  title: string
}

export default function DrawerLayout() {
  //= ========= HOOKS ==========
  const { styles } = useStyles(styleSheets)
  const { isOpen, closeModal } = useNewChatModalStore((state) => ({
    isOpen: state.isOpen,
    closeModal: state.closeModal,
  }))
  const { conversations, setConversations } = useConversationStore((state) => ({
    conversations: state.conversations,
    setConversations: state.setConversations,
  }))
  const { control, handleSubmit, reset } = useForm<Conversation>({
    defaultValues: {
      title: '',
    },
  })

  //========== FUNCTIONS ==========
  const handleCloseModal = () => {
    Keyboard.dismiss()
    closeModal()
    reset()
  }
  const onCreateChat = async (data: Conversation) => {
    handleCloseModal()
    const cv = await createConversation(data.title)
    setConversations([...cv, ...conversations])
    reset()
  }

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
            title: 'Chat Demo',
          }}
        />
      </Drawer>
      <View style={styles.newChatModalContainer(isOpen)}>
        <Pressable
          onPress={handleCloseModal}
          style={styles.newChatModalOverlay}
        />
        <View style={styles.newChatModal}>
          <View style={styles.newChatTopContainer}>
            <Text style={styles.newChatModalTitle}>Enter Chat Title</Text>
            <Pressable onPress={handleSubmit(onCreateChat)}>
              {({ pressed }) => (
                <Feather
                  name="plus-circle"
                  size={20}
                  style={styles.newChatSaveIcon(pressed)}
                />
              )}
            </Pressable>
          </View>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ...rest } }) => (
              <ChtTextInput
                style={styles.newChatModalInput}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onCreateChat)}
                {...rest}
              />
            )}
          />
        </View>
      </View>
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
  newChatModalContainer: (isModaOpen: boolean) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: isModaOpen ? 'flex' : 'none',
  }),
  newChatModalOverlay: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.4,
    width: '100%',
    height: '100%',
  },
  newChatModal: {
    backgroundColor: 'white',
    margin: 'auto',
    width: '80%',
    maxWidth: 400,
    borderRadius: 10,
    padding: 15,
    rowGap: 10,
  },
  newChatTopContainer: {
    flexDirection: 'row',
  },
  newChatModalTitle: {
    fontSize: 20,
    fontFamily: 'JetBrains',
    flex: 1,
  },
  newChatSaveIcon: (pressed: boolean) => ({
    color: theme.colors.primary,
    opacity: pressed ? 0.5 : 1,
    padding: 2,
    borderRadius: 10,
  }),
  newChatModalInput: {
    width: '100%',
  },
}))
