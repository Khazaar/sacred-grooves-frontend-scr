import { makeAutoObservable } from "mobx";
import React, { useContext, useEffect, useRef } from "react";
import { ProfileModel } from "./models/models";

// export default class TeamStore {
//     constructor(players: Athlete[]) {
//         makeAutoObservable(this);
//         this.players = players;
//     }

//     state: string = "New York";
//     setState = (state: string) => {
//         this.state = state;
//     };

//     mascot: string = "";
//     setMascot = (mascot: string) => {
//         this.mascot = mascot;
//     };

//     players: Athlete[] = [];
//     setPlayers = (players: Athlete[]) => {
//         this.players = players;
//     };

//     get teamName(): string {
//         return `${this.state} ${this.mascot}`;
//     }

//     get totalYearlyCost(): number {
//         return this.players.reduce(
//             (totalSalary, currentAthlete) =>
//                 totalSalary + currentAthlete.salary,
//             0
//         );
//     }

//     addPlayer = (player: Athlete) => {
//         this.players.push(player);
//     };
// }

const ProfileContext = React.createContext<ProfileModel>(
    null as unknown as ProfileModel
);

export const useMyProfile = () => useContext(ProfileContext);

type Props = {
    children: React.ReactNode;
    profile: ProfileModel | undefined;
};

export function MyProfileProvider({ children, profile }: Props) {
    const myProfile = useRef(profile);
    // useEffect(() => {
    //     myProfile = await getProfileMy();
    // }, []);

    return (
        <>
            {myProfile.current && (
                <ProfileContext.Provider value={myProfile.current}>
                    {children}
                </ProfileContext.Provider>
            )}
        </>
    );
}
