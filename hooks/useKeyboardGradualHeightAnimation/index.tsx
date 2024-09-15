import { useKeyboardHandler } from 'react-native-keyboard-controller'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

export const useKeyboardGradualHeightAnimation = () => {
  const height = useSharedValue(0)
  useKeyboardHandler(
    {
      onMove: (event) => {
        'worklet'

        height.value = Math.max(0, event.height)
      },
    },
    []
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

  return {
    animatedStyle,
    height,
  }
}
