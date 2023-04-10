import React, { useEffect, useState } from "react";
import AppMenu from "@/components/AppMenu";
import { Button } from "@mui/material";
import ShowUserMe from "./user/showUserMe";
import { getMe } from "@/servise/user.service";
import { UserRoles } from "@/enums";
import EditArtist from "./artist/editArtist";

interface IRoleClaimed {
    role: UserRoles;
    isClaimed: boolean;
}

export default function Profile() {
    //const accessToken = getAccessToken(req, res);
    //console.log(accessToken);
    const [rolesClaimed, setRolesClaimed] = useState<IRoleClaimed[]>([
        { role: UserRoles.Artist, isClaimed: false },
        { role: UserRoles.Organizer, isClaimed: false },
        { role: UserRoles.SupportTeam, isClaimed: false },
        { role: UserRoles.Visitor, isClaimed: false },
    ]);
    const [userMe, setUserMe] = useState<IUserDto>();

    useEffect(() => {
        getMe().then((data) => {
            setUserMe(data);
        });
    }, []);
    const handleCheckboxChange = (role: UserRoles) => {
        const updatedItems = rolesClaimed.map((item) => {
            if (item.role === role) {
                return { ...item, isClaimed: !item.isClaimed };
            }
            return item;
        });
        setRolesClaimed(updatedItems);
    };

    return (
        <>
            <AppMenu></AppMenu>
            <h1>User Information</h1>
            {userMe && <ShowUserMe userMe={userMe}></ShowUserMe>}
            <Button href="/profile/user/editUserMe">
                Edit user information
            </Button>
            {/* <h1>Claim roles</h1>
            {rolesClaimed.map((item) => (
                <div key={item.role}>
                    <input
                        type="checkbox"
                        id={`checkbox-${item.role}`}
                        checked={item.isClaimed}
                        onChange={() => handleCheckboxChange(item.role)}
                    />
                    <label htmlFor={`checkbox-${item.role}`}>{item.role}</label>
                </div>
            ))} */}
            <EditArtist></EditArtist>
        </>
    );
}
