import type { AppProps } from "next/app";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";

import { theme } from "@/assets/theme";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "@/utility/createEmotionCache";
import AppMenu from "./components/AppMenu";
import Layout from "./components/Layout";
import { createContext } from "react";
import { useProfiles } from "./profiles/utils";
import { ProfilesModel } from "@/models/profilesModel";

const clientSideEmotionCache = createEmotionCache();
export const MobxContext = createContext({});

export default function App(props: any) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    const profiles = useProfiles(pageProps.initialState);

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <MobxContext.Provider value={profiles}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </MobxContext.Provider>
                </UserProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
