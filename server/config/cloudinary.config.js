import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"

cloudinary.config({ 
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function deleteImage (imageURL) {
    try {
        let cloudinaryImageId = imageURL.split("/").pop().split(".")[0];
        return await cloudinary.uploader.destroy(cloudinaryImageId);
    } catch (error) {
        console.log("error in deleting image from cloudinary");
    }
    
}


export async function uploadImage (image) {
  return await cloudinary.uploader.upload(image);
}



export default cloudinary;
