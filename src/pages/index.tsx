import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, Card } from "@mui/material";
import { Inter } from "next/font/google";
import Home from "./home";
import Link from "next/link";

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
                <Link href="/api/auth/login">Login</Link>
                <Link href="/api/auth/logout">Logout</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/api/users/">Get me</Link>
                <Link href="/createUser">Create user</Link>
                <Button onClick={handleOnSubmitClick}>Create User</Button>
            </Card>
        </>
    );
}
