import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Typography,
    Box,
    TextField,
    Card,
} from "@mui/material";

import { ChangeEvent, useEffect } from "react";
import AvatarProfile from "./AvatarProfile";
import { observer } from "mobx-react";
import { updateUserMe } from "@/service/user.service";

import { ProfileModel } from "@/models/profileModel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserModel } from "@/models/userModel";
import { profilePageEntityStyle } from "@/styles/muiComponentStyles";
import { useProfileMy } from "../Layout";

type UserProps = {
    profile: ProfileModel;
};

function User({ userProps }: { userProps: UserProps }) {
    const { user, error, isLoading } = useUser();
    const profileMy = useProfileMy();

    const handleUserInfoChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // const dynamicKey = e.target.name as keyof UserModel;
        // userProps.profile.user[dynamicKey] = e.target.value as string;
    };

    return (
        <Card sx={profilePageEntityStyle}>
            {/* <Box> */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Table sx={{ maxWidth: "80%" }} aria-label="simple table">
                    <TableBody>
                        <TableRow key="Nick Name">
                            <TableCell
                                component="th"
                                scope="row"
                                variant="head"
                            >
                                Nick Name
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    value={userProps.profile.user.nickName}
                                    size="small"
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        profileMy.user.nickName =
                                            e.target.value;
                                    }}
                                    name="nickName"
                                    disabled={!userProps.profile.isEditing}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key="First Name">
                            <TableCell
                                component="th"
                                scope="row"
                                variant="head"
                            >
                                First Name
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    value={userProps.profile.user.firstName}
                                    size="small"
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        profileMy.user.firstName =
                                            e.target.value;
                                    }}
                                    name="firstName"
                                    disabled={!userProps.profile.isEditing}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key="Last Name">
                            <TableCell
                                component="th"
                                scope="row"
                                variant="head"
                            >
                                Last Name
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    value={userProps.profile.user.lastName}
                                    size="small"
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        profileMy.user.lastName =
                                            e.target.value;
                                    }}
                                    name="lastName"
                                    disabled={!userProps.profile.isEditing}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key="E-mail">
                            <TableCell
                                component="th"
                                scope="row"
                                variant="head"
                            >
                                E-mail
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    value={userProps.profile.user.email}
                                    size="small"
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        profileMy.user.email = e.target.value;
                                    }}
                                    name="email"
                                    disabled={!userProps.profile.isEditing}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key="Telegram">
                            <TableCell
                                component="th"
                                scope="row"
                                variant="head"
                            >
                                Telegram
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    value={userProps.profile.user.telegramName}
                                    size="small"
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        profileMy.user.telegramName =
                                            e.target.value;
                                    }}
                                    name="telegramName"
                                    disabled={!userProps.profile.isEditing}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <AvatarProfile
                    avatarProps={{
                        profile: userProps.profile,
                    }}
                ></AvatarProfile>
            </Box>
            {/* </Box> */}
            <Typography sx={{ marginLeft: 0 }}>About user:</Typography>
            <TextField
                sx={{ width: "100%" }}
                multiline
                rows={5}
                disabled={!userProps.profile.isEditing}
                onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                    profileMy.user.about = e.target.value;
                }}
                value={
                    userProps.profile.isEditing
                        ? profileMy.user.about
                        : userProps.profile.user.about
                }
            />
        </Card>
    );
}

export default observer(User);
