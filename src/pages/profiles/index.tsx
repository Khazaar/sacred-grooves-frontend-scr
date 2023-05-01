import { enableStaticRendering, observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Avatar,
} from "@mui/material";
import router from "next/router";
import { ProfileModel } from "@/models/profileModel";
import { ProfilesModel } from "@/models/profilesModel";
import { parseProfile } from "@/models/utils.model";

// enable static rendering ONLY on server
const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

export const getServerSideProps = async () => {
    console.log("making server request before app");
    const params = new URLSearchParams();
    params.append("targetRole", "any");
    //params.append("targetId", "0");
    const response = await fetch(
        process.env.NEST_HOST + "/profiles?" + params,
        {
            method: "GET",
        }
    );
    const profilesData: any[] = await response.json();

    return {
        props: {
            profilesData,
        },
    };
};

function IndexProfiles({ profilesData }: { profilesData: any }) {
    const profiles: ProfileModel[] = [];
    if (profilesData)
        profilesData.forEach((profileData: any) => {
            profiles.push(parseProfile(profileData));
        });
    return (
        <>
            <Typography variant="h4" align="center">
                Our community
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell align="right">Nick name</TableCell>
                            <TableCell align="right">First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Roles</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {profilesContext.profiles?.state == "done" && */}
                        {profiles.map((prf: ProfileModel) => (
                            <TableRow
                                key={prf.auth0sub}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                                onClick={() => {
                                    router.push(`/profile/` + prf.id);
                                }}
                                hover={true}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar
                                        alt={prf.user.nickName}
                                        src={prf.user.avatar.pictureS3Url}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {prf.user.nickName}
                                </TableCell>

                                <TableCell align="right">
                                    {prf.user.firstName}
                                </TableCell>
                                <TableCell align="right">
                                    {prf.user.lastName}
                                </TableCell>
                                <TableCell align="right">
                                    {prf.getRoles().map((role) => (
                                        <Typography variant="body2" key={role}>
                                            {role}
                                        </Typography>
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    {prf.user.mapLocation?.address}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default observer(IndexProfiles);
