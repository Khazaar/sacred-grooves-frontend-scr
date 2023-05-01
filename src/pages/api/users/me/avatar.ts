import {
    withApiAuthRequired,
    getAccessToken,
    getSession,
} from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import nextConnect from "next-connect";
import multer from "multer";
import formidable from "formidable";
import * as fs from "fs";
import { FormData } from "formdata-node";
import axios, { AxiosResponse } from "axios";
import http from "http";
import {
    S3Client,
    PutObjectCommandInput,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

type NextApiRequestWithFormData = NextApiRequest & {
    file?: File;
};
function createUrlFromFileName(fileName: string): string {
    // remove any leading/trailing whitespace
    let cleanedName = fileName.trim();

    // replace any whitespace or special characters with a dash
    cleanedName = cleanedName.replace(/[\s\/\\+]+/g, "-");

    // convert to lowercase
    cleanedName = cleanedName.toLowerCase();

    return cleanedName;
}

export const uploadImageToS3AWS = async (file: any) => {
    const s3 = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
        },
        region: "eu-central-1",
    });
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const pictureId = uuid();
    const objectKey = `${pictureId}${createUrlFromFileName(
        file.originalFilename
    )}`;
    const contentType = file.mimetype;
    const fileStream = fs.createReadStream(file.filepath);

    const uploadParams: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: objectKey,
        Body: fileStream,
        ACL: "public-read",
        // ContentType: contentType,
    };
    const imagerUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
    try {
        await s3.send(new PutObjectCommand(uploadParams));
        console.log(`Image uploaded to S3: ${imagerUrl}`);
        return imagerUrl;
    } catch (error) {
        console.log(error);
    }
};

export default withApiAuthRequired(async function Me(
    req: NextApiRequestWithFormData,
    res
) {
    switch (req.method) {
        case "POST":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const form = new formidable.IncomingForm();
                form.parse(req, async (err, fields, files: any) => {
                    //console.log(files.file);
                    if (!files.file) {
                        res.status(400).json({ message: "No file uploaded" });
                        return;
                    } else {
                        try {
                            const url = await uploadImageToS3AWS(files.file);
                            console.log(url);
                            if (url) {
                                const response = await fetch(
                                    process.env.NEST_HOST + "/users/me/avatar",
                                    {
                                        method: "POST",
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            avatarUrl: url,
                                        }),
                                    }
                                );
                                res.status(200).json({ url: url });
                            }
                        } catch (error) {
                            console.error(error);
                            res.status(500);
                        }
                    }
                });
            } catch (error) {
                console.error(error);
                res.status(500);
            }
        // case "GET":
        //     try {
        //         const url  = req.query;
        //         const response = await fetch(url as any);
        //         const imageData = Buffer.from(response.blob, 'binary');
        //         res.status(200).json(data);
        //     }
    }
});

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
};
