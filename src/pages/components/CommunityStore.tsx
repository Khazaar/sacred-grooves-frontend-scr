import { CommunityModel } from "@/models/models";
import React, { useContext, useRef } from "react";

const CommunityContext = React.createContext<CommunityModel>(
    null as unknown as CommunityModel
);

export const useCommunity = () => useContext(CommunityContext);

type Props = {
    children: React.ReactNode;
};

export function CommunityProvider({ children }: Props) {
    const community = useRef(new CommunityModel());

    return (
        <CommunityContext.Provider value={community.current}>
            {children}
        </CommunityContext.Provider>
    );
}
