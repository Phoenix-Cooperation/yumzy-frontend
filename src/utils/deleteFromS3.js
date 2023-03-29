import axios from "axios";

export const deleteFromS3 = async (images) => {

  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_S3_GET_PRESIGNED_URL_API;

  await Promise.all(images.map(async (image) => {
    const imageFolderSplit = image.split("/")

    const imageName = imageFolderSplit[1]
    const imageExt = imageName.split(".")[1]
    let type = ""

    if (imageExt === "png") {
      type = "image/png"
    } else if (imageExt === "jpg" || imageExt === "jpeg") {
      type = "image/jpeg"
    }

    

    const body = {
      fileName: imageName,
      fileType: type
    }

    console.log(body, "delete from s3")
    try {
      const { data } = await axios.delete(url, { data: {...body}});
      
      const { body: presignedUrl } = data;

      await axios.delete(presignedUrl)
    } catch (error) {
      console.log(error)
    }

  }))

  
}