import { actionKeysUser } from "@/enums";
import { ProfileModel, UserModel } from "@/models/models";
import { getMe, updateUserMe } from "@/service/user.service";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    TextField,
} from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import AvatarMy from "./avatarMy";
//process.env.LOCALHOST_URL +

type UserProps = {
    profileMy: ProfileModel;
};

export default function UserMy({ userProps }: { userProps: UserProps }) {
    const [actionKeyUser, setActionKeyUser] = useState<actionKeysUser>(
        actionKeysUser.view
    );
    const { user, error, isLoading } = useUser();
    const [userMe, setUserMe] = useState<UserModel>(new UserModel());

    const handleUserInfoChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        setUserMe((prevData) => ({
            ...prevData,
            [name]: e.target.value,
        }));
        //console.log(userMe);
    };
    useEffect(() => {
        if (userProps.profileMy && !userProps.profileMy.user) {
            setActionKeyUser(actionKeysUser.edit);
            userMe.email = user?.email as string;
            setUserMe(userMe);
        } else {
            setActionKeyUser(actionKeysUser.view);
            userProps.profileMy.user && setUserMe(userProps.profileMy.user);
        }
    }, [userProps]);
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
                    {actionKeyUser == actionKeysUser.view && (
                        <Button
                            onClick={() => {
                                setActionKeyUser(actionKeysUser.edit);
                            }}
                        >
                            Edit
                        </Button>
                    )}
                    {actionKeyUser == actionKeysUser.edit && (
                        <Button
                            onClick={() => {
                                setActionKeyUser(actionKeysUser.view);
                                updateUserMe(userMe);
                            }}
                        >
                            Save changes
                        </Button>
                    )}
                    <Button href="/api/auth/logout">Log out</Button>
                </Box>
                {userMe && (
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
                                            value={userMe.nickName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="nickName"
                                            disabled={
                                                actionKeyUser ==
                                                actionKeysUser.view
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
                                            value={userMe.firstName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="firstName"
                                            disabled={
                                                actionKeyUser ==
                                                actionKeysUser.view
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
                                            value={userMe.lastName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="lastName"
                                            disabled={
                                                actionKeyUser ==
                                                actionKeysUser.view
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
                                            value={userMe.email}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="email"
                                            disabled={
                                                actionKeyUser ==
                                                actionKeysUser.view
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
                                                userMe.telegramName
                                            }
                                        >
                                            Telegram
                                        </a>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={userMe.telegramName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="telegramName"
                                            disabled={
                                                actionKeyUser ==
                                                actionKeysUser.view
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <AvatarMy
                avatarProps={{
                    profileMy: userProps.profileMy,
                }}
            ></AvatarMy>
        </Box>
    );
}
