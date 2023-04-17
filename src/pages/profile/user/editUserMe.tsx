import { getMe, updateMe, uploadAvatar } from "@/service/user.service";
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    Avatar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function EditUserMe() {
    const [userMe, setUserMe] = useState<IUserDto>();
    const [currentImage, setCurrentImage] = useState<File | null>();
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>("");
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

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
        //userMe && (await updateMe(userMe));
        currentImage && (await uploadAvatar(currentImage));
        //router.push("/profile");
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCurrentImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setPreviewImageUrl(url);
        }
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
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleFileChange}
                />
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span"
                >
                    Select avatar
                </Button>
                {/* {previewImageUrl && <img src={previewImageUrl} alt="Preview" />} */}
                {previewImageUrl && (
                    <Avatar
                        alt="Remy Sharp"
                        src={previewImageUrl}
                        sx={{ width: 100, height: 100 }}
                    />
                )}
            </label>
            <Button onClick={handleSave}>Save</Button>
        </>
    );
}
