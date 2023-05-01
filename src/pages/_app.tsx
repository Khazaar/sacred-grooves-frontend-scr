import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { theme } from "@/assets/theme";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "@/utility/createEmotionCache";
import Layout from "../components/Layout";
import { createContext } from "react";
import { ProfileModel } from "@/models/profileModel";

const clientSideEmotionCache = createEmotionCache();

export default function App(props: any) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    //const profileMy = useProfileMy(pageProps.initialState);
    const profileMy = new ProfileModel(); // Mock

    return (
        <CacheProvider value={emotionCache}>
            <UserProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserProvider>
        </CacheProvider>
    );
}
