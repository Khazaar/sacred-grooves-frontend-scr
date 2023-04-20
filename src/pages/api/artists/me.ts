import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function Me(req, res) {
    switch (req.method) {
        case "PATCH":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const response = await fetch(
                    process.env.NEST_HOST + "/artists/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        method: "PATCH",
                        body: JSON.stringify(req.body),
                    }
                );
                const artist = await response.json();
                res.status(200).json(artist);
                break;
            } catch (error) {
                console.error(error);
            }
        case "POST":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const response = await fetch(
                    process.env.NEST_HOST + "/artists/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    }
                );
                const artist = await response.json();
                res.status(200).json(artist);
                break;
            } catch (error) {
                console.error(error);
            }
    }
});
