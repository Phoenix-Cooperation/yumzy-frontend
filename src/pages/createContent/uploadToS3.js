import axios from "axios";

export const uploadToS3 = async (files) => {
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_S3_GET_PRESIGNED_URL_API;
  const uploadedFiles = []

  let errors = []
  await Promise.all(files.map(async (file) => {
    console.log(file);
    const { type, name } = file.file;
    console.log(type, name)
    const body = {
      fileName: name,
      fileType: type
    }

    try {
      const { data } = await axios.post(
        url,
        body
      )

      const { body: presignedUrl } = data;
      await axios.put(presignedUrl, file.file);
      

      if (type === "image/jpeg" || type === "image/png") {
        uploadedFiles.push(`images/${name}`);
      } else {
        uploadedFiles.push(`${name}`)
      }
    } catch (err) {

      console.log(`file upload failed with error ${err.message}`)
      errors.push(err.message);
    }

    

  }))

  return [uploadedFiles, errors];
}

