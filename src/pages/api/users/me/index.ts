import { UserModel } from "@/models/userModel";
import {
    withApiAuthRequired,
    getAccessToken,
    getSession,
} from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type NextApiRequestWithFormData = NextApiRequest & {
    file?: File;
};

export default withApiAuthRequired(async function Me(
    req: NextApiRequestWithFormData,
    res
) {
    const formData = new FormData();

    req.file && formData.append("file", req.file);
    const userDto: UserModel = req.body;

    switch (req.method) {
        case "GET":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const response = await fetch(
                    process.env.NEST_HOST + "/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        method: "GET",
                    }
                );
                const userMe = await response.json();
                res.status(200).json(userMe);
                break;
            } catch (error) {
                console.error(error);
            }
        case "PATCH":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const response = await fetch(
                    process.env.NEST_HOST + "/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userDto),
                        method: "PATCH",
                    }
                );
                const userMe = await response.json();
                res.status(200).json(userMe);
                break;
            } catch (error) {
                console.error(error);
            }
    }
});

export const config = {
    api: {
        externalResolver: true,
        bodyParser: {
            sizeLimit: "20mb", // Set desired value here
        },
    },
};
