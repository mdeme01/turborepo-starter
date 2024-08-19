export const getTextColor = (hexColor: string) => {
    const r = parseInt(hexColor.substring(1, 3), 16)
    const g = parseInt(hexColor.substring(3, 5), 16)
    const b = parseInt(hexColor.substring(5, 7), 16)

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    return luminance > 128 ? 'black' : 'white'
}
