import { getMe } from "@/servise/user.service";
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
} from "@mui/material";
import { useEffect, useState } from "react";
//process.env.LOCALHOST_URL +

export default function ShowUserMe({ userMe }: { userMe: IUserDto }) {
    return (
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
                <Button href="/profile/user/editUserMe">Edit</Button>
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
                                    {userMe.nickName}
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
                                    {userMe.firstName}
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
                                    {userMe.lastName}
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
                                    {userMe.email}
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
                                    {userMe.telegramName}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
