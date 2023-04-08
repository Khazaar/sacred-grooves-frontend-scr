import { useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

export default function Profile() {
    const { user, error, isLoading } = useUser();
    //const accessToken = getAccessToken(req, res);
    //console.log(accessToken);
    return (
        user && (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
}
