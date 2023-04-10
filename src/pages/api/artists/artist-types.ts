import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function Me(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const { accessToken } = await getAccessToken(req, res);
                const response = await fetch(
                    process.env.NEST_HOST + "/artist-types",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        method: "GET",
                    }
                );
                const artistsTypesRaw = await response.json();
                const artistsTypes: string[] = (artistsTypesRaw as any[]).map(
                    (artistType) => {
                        return artistType.artisitTypeName as string;
                    }
                );
                res.status(200).json(artistsTypes);
                break;
            } catch (error) {
                console.error(error);
            }
    }
});
