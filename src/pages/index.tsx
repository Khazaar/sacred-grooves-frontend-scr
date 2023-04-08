import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <a href="/api/auth/login">Login</a>
            <a href="/api/auth/logout">Logout</a>
            <a href="/profile">Profile</a>
            <a href="/api/users/">Get me</a>
            <a href="/createUser">Create user</a>
        </>
    );
}
