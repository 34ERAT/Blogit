import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.COULDINARY_API_KEY,
  api_secret: process.env.COULDINARY_API_SECRET,
});

export async function upload(byteArrayBuffer: Buffer<ArrayBufferLike>) {
  const { secure_url }: UploadApiResponse = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, uploadResult) => {
        if (error) throw error;
        return resolve(uploadResult as UploadApiResponse);
      })
      .end(byteArrayBuffer);
  });
  return secure_url;
}
