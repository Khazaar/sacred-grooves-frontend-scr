// import { actionKeysUser } from "@/enums";
import { ProfileModel, UserModel } from "@/models/models";
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
import Link from "next/link";
import { ChangeEvent } from "react";
import AvatarMy from "./AvatarProfile";

import { observer } from "mobx-react";
import { updateUserMe } from "@/service/user.service";
//process.env.LOCALHOST_URL +

type UserProps = {
    user: UserModel;
};

function User({ userProps }: { userProps: UserProps }) {
    const handleUserInfoChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // const name = e.target.name;
        // setUserMe((prevData) => ({
        //     ...prevData,
        //     [name]: e.target.value,
        // }));
        //console.log(userMe);
    };
    // useEffect(() => {
    //     if (!userProps.user) {
    //         // userProps.user.setActionKeyUser(actionKeysUser.edit);
    //         // userMe.email = user?.email as string;
    //         // setUserMe(userMe);
    //     } else {
    //         // setActionKeyUser(actionKeysUser.view);
    //         // userProps.profileMy.user && setUserMe(userProps.profileMy.user);
    //     }
    // }, [userProps]);
    // useEffect(() => {}, []);
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
                    {!userProps.user.isEditing && (
                        <Button
                            onClick={() => {
                                //userProps.user.setEditingState(true);
                                userProps.user.isEditing = true;
                                console.log(userProps.user);
                            }}
                        >
                            Edit
                        </Button>
                    )}
                    {userProps.user.isEditing && (
                        <Button
                            onClick={() => {
                                updateUserMe(userProps.user);
                                userProps.user.isEditing = false;
                            }}
                        >
                            Save changes
                        </Button>
                    )}
                    <Button href="/api/auth/logout">Log out</Button>
                </Box>
                {userProps.user && (
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
                                            value={userProps.user.nickName}
                                            size="small"
                                            onChange={(
                                                e: ChangeEvent<
                                                    | HTMLInputElement
                                                    | HTMLTextAreaElement
                                                >
                                            ) => {
                                                userProps.user.nickName =
                                                    e.target.value;
                                                console.log(
                                                    userProps.user.nickName
                                                );
                                            }}
                                            name="nickName"
                                            disabled={!userProps.user.isEditing}
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
                                            value={userProps.user.firstName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="firstName"
                                            disabled={!userProps.user.isEditing}
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
                                            value={userProps.user.lastName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="lastName"
                                            disabled={!userProps.user.isEditing}
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
                                            value={userProps.user.email}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="email"
                                            disabled={!userProps.user.isEditing}
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
                                                userProps.user.telegramName
                                            }
                                        >
                                            Telegram
                                        </a>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <TextField
                                            id="standard-basic"
                                            variant="outlined"
                                            value={userProps.user.telegramName}
                                            size="small"
                                            onChange={handleUserInfoChange}
                                            name="telegramName"
                                            disabled={!userProps.user.isEditing}
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
                    user: userProps.user,
                }}
            ></AvatarMy>
        </Box>
    );
}

// function User2() {
//     const usr = new UserModel();
//     const a = new Athlete("Egor", 1, 1);
//     return (
//         <>
//             <Button
//                 onClick={() => {
//                     usr.setEditingState(true);
//                     a.wishHappyBirthday();
//                     console.log(usr);
//                 }}
//             >
//                 Set true
//             </Button>
//             <Button>{a.age}</Button>
//             <Button onClick={()=>{

//             }}>Create user</Button>
//         </>
//     );
// }
export default observer(User);
