import { getMe } from "@/servise/user.service";
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
//process.env.LOCALHOST_URL +

export default function ShowUserMe({ userMe }: { userMe: IUserDto }) {
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
                                    {userMe.nickName}
                                </TableCell>
                            </TableRow>
                            <TableRow key="First Name">
                                <TableCell component="th" scope="row">
                                    First Name
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {userMe.firstName}
                                </TableCell>
                            </TableRow>
                            <TableRow key="Last Name">
                                <TableCell component="th" scope="row">
                                    Last Name
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {userMe.lastName}
                                </TableCell>
                            </TableRow>
                            <TableRow key="E-mail">
                                <TableCell component="th" scope="row">
                                    E-mail
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {userMe.email}
                                </TableCell>
                            </TableRow>
                            <TableRow key="Telegram">
                                <TableCell component="th" scope="row">
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
        </>
    );
}
