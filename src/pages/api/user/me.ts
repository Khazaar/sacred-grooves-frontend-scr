import {
    withApiAuthRequired,
    getAccessToken,
    getSession,
} from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export default withApiAuthRequired(async function Me(req, res) {
    try {
        console.log("BLAT!!!!!");
        const { accessToken } = await getAccessToken(req, res);
        console.log(accessToken);
        const response = await fetch(process.env.NEST_HOST + "/users/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userMe = await response.json();
        console.log("USER", userMe);
        res.status(200).json(userMe);
    } catch (error) {
        console.error(error);
    }
});

export const config = {
    api: {
        externalResolver: true,
    },
};
