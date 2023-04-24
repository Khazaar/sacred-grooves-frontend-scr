import { getProfiles } from "@/service/profile.service";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { CommunityModel, ProfileModel, UserModel } from "@/models/models";
import ProfileItem from "../components/ProfileItem";
import { action } from "mobx";
import { useCommunity } from "../components/CommunityStore";
import {
    Button,
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
import { useRouter } from "next/navigation";

function IndexProfiles() {
    const router = useRouter();
    const community = useCommunity();
    useEffect(() => {
        community.fetchCommunity().then((data) => {
            console.log(data);
        });
    }, []);

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
                            <TableCell align="right">Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {community?.state == "done" &&
                            community.profiles.map((prf) => (
                                <TableRow
                                    key={prf.auth0sub}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                    onClick={() => {
                                        router.push(`/profiles/1`);
                                    }}
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
                                            <Typography
                                                variant="body1"
                                                key={role}
                                            >
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
