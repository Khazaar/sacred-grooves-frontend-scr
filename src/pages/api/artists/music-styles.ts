import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function Me(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const response = await fetch(
                    process.env.NEST_HOST + "/music-styles",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        method: "GET",
                    }
                );
                const musicStylesRaw = await response.json();
                const musicStyles: string[] = (musicStylesRaw as any[]).map(
                    (musicStyle) => {
                        return musicStyle.musicStyleName as string;
                    }
                );
                res.status(200).json(musicStyles);
                break;
            } catch (error) {
                console.error(error);
            }
    }
});
