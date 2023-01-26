import Compress from "compress.js";

const compress = new Compress();

export const resizeImageFn = async (file)  => {
  const resizedImage = await compress.compress([file], { 
    size: 2, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 300, // the max width of the output image, defaults to 1920px
    maxHeight: 300, // the max height of the output image, defaults to 1920px
    resize: true // defaults to true, set false if you do not want to resize the image width and height
  });

  const img = resizedImage[0];
  const { data: base64str, ext: imgExt } = img;

  const BlobFile = Compress.convertBase64ToFile(base64str, imgExt);
  return new File([BlobFile], file.name, { type: file.type });
}

// export default resizeImageFn;