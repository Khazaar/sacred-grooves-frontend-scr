import type { AppProps } from "next/app";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";

import { theme } from "@/assets/theme";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "@/utility/createEmotionCache";
import AppMenu from "../components/AppMenu";
import Layout from "../components/Layout";
import { createContext } from "react";
import { useProfiles } from "../service/use.service";
import { ProfilesModel } from "@/models/profilesModel";
import { ProfileModel } from "@/models/profileModel";

const clientSideEmotionCache = createEmotionCache();
type MobxContetnType = {
    profiles: ProfilesModel;
    currentProfile: ProfileModel;
};

export const MobxContext = createContext(new ProfilesModel());

export default function App(props: any) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    const profiles = useProfiles(pageProps.initialState);

    return (
        <CacheProvider value={emotionCache}>
            <UserProvider>
                <MobxContext.Provider value={profiles}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </MobxContext.Provider>
            </UserProvider>
        </CacheProvider>
    );
}
