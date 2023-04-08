import { Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

// const defaultUser: IUserDto = {
//     email: "",
//     nickName: "",
//     lastName: "",
// };
export default function CreateUser() {
    const [user, setUser] = React.useState<IUserDto>();
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
            email: "user@ewe.vc",
        });
    };

    const handleOnSubmitClick = () => {
        console.log("Submit clicked");
        fetch("/api/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    };

    return (
        <Box component="form">
            <TextField
                required
                id="nickName"
                label="Nick name"
                name="nickName"
                onChange={handleInputChange}
            />
            <TextField
                id="firstName"
                label="First name"
                name="firstName"
                onChange={handleInputChange}
            ></TextField>
            <TextField
                id="lastName"
                label="Last name"
                name="lastName"
                onChange={handleInputChange}
            ></TextField>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleOnSubmitClick}
            >
                Submit
            </Button>
        </Box>
    );
}
