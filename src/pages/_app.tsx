import type { AppProps } from "next/app";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { MyProfileProvider } from "@/MyProfileProvider";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { ProfileModel } from "@/models/models";
import { theme } from "@/assets/theme";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "@/utility/createEmotionCache";
import AppMenu from "./components/AppMenu";
import Layout from "./components/Layout";
import { CommunityProvider } from "./components/CommunityStore";

const clientSideEmotionCache = createEmotionCache();

export default function App(props: any) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <CommunityProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </CommunityProvider>
                </UserProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
