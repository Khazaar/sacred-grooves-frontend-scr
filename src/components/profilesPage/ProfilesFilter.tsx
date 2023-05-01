import { UserRoles } from "@/enums";
import { Type } from "@aws-sdk/client-s3";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { ChangeEvent, useState } from "react";
import { useMobxContext } from "../layout/Layout";
import SearchIcon from "@mui/icons-material/Search";

type rolesCheckedType = {
    role: UserRoles;
    isSelected: boolean;
};

function ProfilesFilter() {
    const mobxContext = useMobxContext();
    // const [rolesChecked, setRolesChecked] = useState<rolesCheckedType[]>([
    //     { role: UserRoles.Artist, isSelected: true },
    //     { role: UserRoles.Organizer, isSelected: true },
    //     { role: UserRoles.SupportTeam, isSelected: true },
    // ]);

    const handleRolesCheckedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        mobxContext.profilesAll.rolesSelected.forEach((item) => {
            if (item.role === event.target.name) {
                mobxContext.profilesAll.setRoleSelected(
                    item.role,
                    event.target.checked
                );
            }
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "5rem",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <SearchIcon sx={{ fontSize: "3rem", alignContent: "center" }} />
            <TextField
                id="outlined-basic"
                variant="outlined"
                value={mobxContext.profilesAll.promptFilter}
                onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                    mobxContext.profilesAll.setPromptFilter(e.target.value);
                }}
                sx={{}}
            />
            {/* <Typography variant="h5">Roles:</Typography> */}

            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                {mobxContext.profilesAll.rolesSelected.map((item, index) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.isSelected}
                                onChange={handleRolesCheckedChange}
                                name={item.role}
                                key={"chb" + item.role}
                            />
                        }
                        label={item.role}
                        key={"fcl" + index}
                    />
                ))}
            </FormGroup>
        </Box>
    );
}

export default observer(ProfilesFilter);
