import {
    withApiAuthRequired,
    getAccessToken,
    getSession,
} from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
export default withApiAuthRequired(async function createUser(req, res) {
    //debugger;
    const session = await getSession(req, res);

    if (session) {
        console.log("E-mail :", session.user.email);
        try {
            const { accessToken } = await getAccessToken(req, res);
            console.log(req.body);
            const response = await fetch(process.env.NEST_HOST + "/users/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            });
            const userMe = await response.json();
            console.log(userMe);
            //return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
});
