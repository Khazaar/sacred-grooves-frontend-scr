import { getMe, updateMe } from "@/servise/user.service";
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function EditUserMe() {
    const [userMe, setUserMe] = useState<IUserDto>();
    const router = useRouter();
    useEffect(() => {
        getMe().then((data) => {
            setUserMe(data);
        });
    }, []);
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        setUserMe((prevData) => ({
            ...prevData,
            [name]: e.target.value,
        }));
    };

    const handleSave = async () => {
        userMe && (await updateMe(userMe));
        router.push("/profile");
    };
    return (
        <>
            {userMe && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow key="Nick Name">
                                <TableCell component="th" scope="row">
                                    Nick Name
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={userMe.nickName}
                                        size="small"
                                        onChange={handleChange}
                                        name="nickName"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="First Name">
                                <TableCell component="th" scope="row">
                                    First Name
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={userMe.firstName}
                                        size="small"
                                        onChange={handleChange}
                                        name="firstName"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="Last Name">
                                <TableCell component="th" scope="row">
                                    Last Name
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={userMe.lastName}
                                        size="small"
                                        onChange={handleChange}
                                        name="lastName"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="Telegram">
                                <TableCell component="th" scope="row">
                                    Telegram
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        id="standard-basic"
                                        variant="outlined"
                                        value={userMe.telegramName}
                                        size="small"
                                        onChange={handleChange}
                                        name="telegramName"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Button onClick={handleSave}>Save</Button>
        </>
    );
}
