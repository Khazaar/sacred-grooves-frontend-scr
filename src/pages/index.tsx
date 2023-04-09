import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, Card } from "@mui/material";
import { Inter } from "next/font/google";
import Home from "./home";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
    const { user, error, isLoading } = useUser();
    const userSG: IUserDto = {
        nickName: "test",
        firstName: "test",
        lastName: "test",
        email: "ff@ff.f",
    };

    const handleOnSubmitClick = () => {
        console.log("Submit clicked");
        fetch("/api/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userSG),
        });
    };

    return (
        <>
            {user && <Home></Home>}
            <Card sx={{}}>
                <Box></Box>
                <a href="/api/auth/login">Login</a>
                <a href="/api/auth/logout">Logout</a>
                <a href="/profile">Profile</a>
                <a href="/api/users/">Get me</a>
                <a href="/createUser">Create user</a>
                <Button onClick={handleOnSubmitClick}>Create User</Button>
            </Card>
        </>
    );
}
