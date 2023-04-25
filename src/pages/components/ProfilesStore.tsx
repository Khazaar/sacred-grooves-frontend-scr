import { ProfilesModel } from "@/models/profilesModel";
import React, { useContext, useRef } from "react";

const ProfilesContext = React.createContext<ProfilesModel>(
    null as unknown as ProfilesModel
);

// export const useProfiles = () => useContext(ProfilesContext);

// type Props = {
//     children: React.ReactNode;
// };

// export function ProfilesProvider({ children }: Props) {
//     const profiles = useRef(new ProfilesModel());
//     return (
//         <ProfilesContext.Provider value={profiles.current}>
//             {children}
//         </ProfilesContext.Provider>
//     );
// }
