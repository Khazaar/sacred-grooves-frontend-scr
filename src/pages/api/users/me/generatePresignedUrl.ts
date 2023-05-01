import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextApiRequest } from "next";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
export default withApiAuthRequired(async function generatePresignedUrl(
    req: NextApiRequest,
    res
) {
    const s3Client = new S3Client({
        region: "eu-central-1",
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
        },
    });
    const key = "11"; //req.body.key;

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: key,
        ContentType: "image/png", // Set the content type of the file you're uploading
        ACL: "public-read",
    };

    const command = new PutObjectCommand(uploadParams);

    const presignedPost = await createPresignedPost(s3Client, uploadParams);
    console.log(presignedPost);
    const ppResult: IPresignedPost = {
        url: presignedPost.url,
        key: key,
    };
    res.status(200).json(ppResult);
});
