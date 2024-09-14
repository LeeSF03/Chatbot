import React from 'react'
import { StatusBar, Pressable, Text, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useStyles, createStyleSheet } from 'react-native-unistyles'

import { hexColorOnInteract, setKvStorage } from '@/helpers'

import OnBoardRobot from '@/assets/images/onboard/onboard-robot.png'
import { useMMKVBoolean } from 'react-native-mmkv'
import { Redirect } from 'expo-router'

const starterPurple = '#ECDFF9'

function OnboardPage() {
  //========== HOOKS ==========
  const { styles } = useStyles(styleSheets)
  const [onboardingComplete] = useMMKVBoolean('onboardingComplete')

  //========== CALLBACKS ==========
  const handleGetStarted = () => {
    setKvStorage('onboardingComplete', true)
  }

  //========== VIEW ==========
  if (onboardingComplete) {
    return <Redirect href="/(chats)" />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        colors={[starterPurple, '#C52EF7']}
        locations={[0.5, 0.88]}
        style={styles.linearGradient}
      >
        <Image
          source={OnBoardRobot}
          contentFit="contain"
          style={styles.robotImage}
        />
        <Pressable onPress={handleGetStarted} style={styles.getStartedButton}>
          {({ pressed }) => (
            <Text style={styles.getStartedText(pressed)}>Get Started</Text>
          )}
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  )
}
export default OnboardPage

const styleSheets = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: starterPurple,
  },
  linearGradient: { flex: 1, alignItems: 'center' },
  robotImage: { width: 300, height: 300, marginTop: 75 },
  getStartedButton: { marginTop: 150 },
  getStartedText: (pressed: boolean) => ({
    fontFamily: 'JetBrains',
    fontSize: 24,
    color: '#ECDFF9',
    padding: theme.paddings.md,
    borderRadius: 10,
    backgroundColor: pressed ? hexColorOnInteract('#1C0055') : '#1C0055',
  }),
}))
