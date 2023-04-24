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

export async function getProfilesApi(
    targetSub: string | undefined,
    targetRole: string | undefined
) {
    const paramsOutcome = new URLSearchParams();
    if (targetSub) paramsOutcome.append("targetSub", targetSub as any);
    if (targetRole) paramsOutcome.append("targetRole", targetRole as any);
    const response = await fetch(
        process.env.NEST_HOST + "/profiles?" + paramsOutcome,
        {
            method: "GET",
        }
    );
    return await response.json();
}

export default async function getProfiles(
    req: NextApiRequestWithFormData,
    res: any
) {
    switch (req.method) {
        case "GET":
            try {
                //const { accessToken } = await getAccessToken(req, res);
                // //const url = new URL(req.url as any);
                // const paramsIncome = new URLSearchParams(req.url as any);
                const targetSub = req.query.targetSub as string;
                const targetRole = req.query.targetRole as string;
                const data = await getProfilesApi(targetSub, targetRole);

                res.status(200).json(data);
                break;
            } catch (error) {
                console.error(error);
            }
    }
}

export const config = {
    api: {
        externalResolver: true,
        bodyParser: {
            sizeLimit: "20mb", // Set desired value here
        },
    },
};
