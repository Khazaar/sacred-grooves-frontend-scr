import {
    withApiAuthRequired,
    getAccessToken,
    getSession,
} from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export default withApiAuthRequired(async function Me(req, res) {
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
                console.log(accessToken);
                console.log("PATCH", req.body);
                const response = await fetch(
                    process.env.NEST_HOST + "/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(req.body),
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
    },
};
