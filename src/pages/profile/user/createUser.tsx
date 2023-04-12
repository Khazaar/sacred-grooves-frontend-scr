import AppMenu from "@/components/AppMenu";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

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
        });
    };
    const router = useRouter();

    const handleOnSubmitClick = () => {
        try {
            console.log("Submit clicked");
            fetch("/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            router.push("/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AppMenu></AppMenu>
            <Box component="form">
                <Typography variant="h4">Create User</Typography>
                <Box>
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
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleOnSubmitClick}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
}
