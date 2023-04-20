import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MyProfileProvider } from "@/MyProfileProvider";
import { getProfileMy } from "@/service/profile.service";
import { useEffect, useState } from "react";
import { ProfileModel } from "@/models/models";
import { theme } from "@/assets/theme";
import { ThemeProvider } from "@emotion/react";

export default function App({ Component, pageProps }: AppProps) {
    const [profileMy, setProfileMy] = useState<ProfileModel>();
    useEffect(() => {
        getProfileMy().then((data) => {
            setProfileMy(data);
        });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </ThemeProvider>
    );
}
