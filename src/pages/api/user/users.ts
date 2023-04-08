import {
    withApiAuthRequired,
    getAccessToken,
    getSession,
} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function userMe(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res);
        console.log(accessToken);
        const response = await fetch(process.env.NEST_HOST + "/users/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userMe = await response.json();
        console.log(userMe);
        //return await response.json();
    } catch (error) {
        console.error(error);
    }
});
