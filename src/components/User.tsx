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
} from "@mui/material";

import { ChangeEvent, useEffect } from "react";
import AvatarProfile from "./AvatarProfile";
import { observer } from "mobx-react";
import { updateUserMe } from "@/service/user.service";

import { ProfileModel } from "@/models/profileModel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserModel } from "@/models/userModel";

type UserProps = {
    profile: ProfileModel;
};

function User({ userProps }: { userProps: UserProps }) {
    const { user, error, isLoading } = useUser();

    const handleUserInfoChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // const dynamicKey = e.target.name as keyof UserModel;
        // userProps.profile.user[dynamicKey] = e.target.value as string;
    };
    const isUserMe = userProps.profile.auth0sub == user?.sub;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 600,
                    margin: "2rem 0 2rem 0",
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h5" component="div">
                        User information
                    </Typography>
                    {!userProps.profile.user.isEditing && isUserMe && (
                        <>
                            <Button
                                onClick={() => {
                                    //userProps.profile.user.setEditingState(true);
                                    userProps.profile.user.isEditing = true;
                                    console.log(userProps.profile.user);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                href="/api/auth/logout"
                            >
                                Log out
                            </Button>
                        </>
                    )}
                    {userProps.profile.user.isEditing && (
                        <Button
                            onClick={() => {
                                updateUserMe(userProps.profile.user);
                                userProps.profile.user.isEditing = false;
                            }}
                        >
                            Save changes
                        </Button>
                    )}
                </Box>
                {userProps.profile.user && (
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 400, maxWidth: 600 }}
                            aria-label="simple table"
                        >
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
                                            value={
                                                userProps.profile.user.nickName
                                            }
                                            size="small"
                                            onChange={(
                                                e: ChangeEvent<
                                                    | HTMLInputElement
                                                    | HTMLTextAreaElement
                                                >
                                            ) => {
                                                userProps.profile.user.nickName =
                                                    e.target.value;
                                            }}
                                            name="nickName"
                                            disabled={
                                                !userProps.profile.user
                                                    .isEditing
                                            }
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
                                            value={
                                                userProps.profile.user.firstName
                                            }
                                            size="small"
                                            onChange={(
                                                e: ChangeEvent<
                                                    | HTMLInputElement
                                                    | HTMLTextAreaElement
                                                >
                                            ) => {
                                                userProps.profile.user.firstName =
                                                    e.target.value;
                                            }}
                                            name="firstName"
                                            disabled={
                                                !userProps.profile.user
                                                    .isEditing
                                            }
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
                                            value={
                                                userProps.profile.user.lastName
                                            }
                                            size="small"
                                            onChange={(
                                                e: ChangeEvent<
                                                    | HTMLInputElement
                                                    | HTMLTextAreaElement
                                                >
                                            ) => {
                                                userProps.profile.user.lastName =
                                                    e.target.value;
                                            }}
                                            name="lastName"
                                            disabled={
                                                !userProps.profile.user
                                                    .isEditing
                                            }
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
                                                userProps.profile.user.email =
                                                    e.target.value;
                                            }}
                                            name="email"
                                            disabled={
                                                !userProps.profile.user
                                                    .isEditing
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Telegram">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        variant="head"
                                    >
                                        <a
                                            href={
                                                "https://t.me/" +
                                                userProps.profile.user
                                                    .telegramName
                                            }
                                        >
                                            Telegram
                                        </a>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={
                                                userProps.profile.user
                                                    .telegramName
                                            }
                                            size="small"
                                            onChange={(
                                                e: ChangeEvent<
                                                    | HTMLInputElement
                                                    | HTMLTextAreaElement
                                                >
                                            ) => {
                                                userProps.profile.user.telegramName =
                                                    e.target.value;
                                            }}
                                            name="telegramName"
                                            disabled={
                                                !userProps.profile.user
                                                    .isEditing
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <AvatarProfile
                avatarProps={{
                    user: userProps.profile.user,
                }}
            ></AvatarProfile>
        </Box>
    );
}

export default observer(User);
