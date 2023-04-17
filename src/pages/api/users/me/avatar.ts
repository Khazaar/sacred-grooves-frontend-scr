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

type NextApiRequestWithFormData = NextApiRequest & {
    file?: File;
};

export default withApiAuthRequired(async function Me(
    req: NextApiRequestWithFormData,
    res
) {
    switch (req.method) {
        case "POST":
            try {
                const formData = new FormData();
                // formData.append("file", req.file);
                const form = new formidable.IncomingForm();
                form.parse(req, async (err, fields, files: any) => {
                    console.log(files.file);
                    if (files.file) {
                    }

                    let buffer = fs.createReadStream(files.file.filepath);
                    const avatarBlob = new Blob([files.file.filepath], {
                        type: "image/jpeg",
                    });
                    formData.set("file", buffer);
                    const { accessToken } = await getAccessToken(req, res);
                    const response = await fetch(
                        process.env.NEST_HOST + "/users/me/avatar",
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                //"Content-Type": "multipart/form-data",
                            },
                            body: formData,
                            method: "POST",
                        }
                    );
                    //const userMe = await response.json();
                    res.status(200);
                });

                break;
            } catch (error) {
                console.error(error);
            }
    }
});

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
};
