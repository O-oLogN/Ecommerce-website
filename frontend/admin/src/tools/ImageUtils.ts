export const imageToUrl = (image: File) => {
    return image ? `data:image/png;base64,${image}` : image
}
