import { v2 } from "cloudinary";

export const destroyCloudinary = async (publicId: string): Promise<boolean> => {
    const cloudinaryV2 = v2;

    cloudinaryV2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_SECRET_KEY
    });

    /**
     *  여러개의 publicId를 제거 할 경우:
     * 
     *    https://cloudinary.com/documentation/admin_api#delete_resources
     *    const public_ids: Array<string> = [];
     *    const data = await cloudinary.api.delete_resources(public_ids, {});
     */
    const { result } = await cloudinaryV2.uploader.destroy(publicId, { invalidate: true });

    /**
     *  result: "ok"   // completed
     *  result: "not found"  // success
     */
    if(result === "ok") {
        return true;
    } else {
        return false;
    }
};