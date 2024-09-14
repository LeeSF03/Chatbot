export const numberToHex = (n: number) => {
  return n.toString(16).toLowerCase().padStart(2, '0')
}

export const rgbaToHex = (r: number, g: number, b: number, a: number = 1) => {
  return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}${numberToHex(Math.round(a * 255))}`
}

export const hexColorOnInteract = (hex: string, opacity: number = 0.5) => {
  if (hex.length !== 7) {
    throw new Error('Hex color must be 7 characters long')
  }
  if (hex[0] !== '#') {
    throw new Error('Hex color must start with a #')
  }
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be between 0 and 1')
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const redTransparentAdjusted = Math.round(r * opacity + 255 * (1 - opacity))
  const greenTransparentAdjusted = Math.round(g * opacity + 255 * (1 - opacity))
  const blueTransparentAdjusted = Math.round(b * opacity + 255 * (1 - opacity))

  return rgbaToHex(
    redTransparentAdjusted,
    greenTransparentAdjusted,
    blueTransparentAdjusted
  )
}
