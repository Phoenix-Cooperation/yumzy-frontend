const generateImageName = (imgExt) => {
  const timestamp = new Date().getTime()
  const randomString = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${randomString}.${imgExt}`
}

export default generateImageName