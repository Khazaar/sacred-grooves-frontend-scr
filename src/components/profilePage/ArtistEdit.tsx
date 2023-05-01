import { ProfileModel } from "@/models/profileModel";

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useProfileMy } from "../Layout";
import { profile } from "console";

type ArtistProps = {
    profile: ProfileModel;
};

function ArtistEdit() {
    const profileMy = useProfileMy();
    const handleCheckboxMusicStyleChange = (musicSlyleName: string) => {
        profileMy.artist?.toggleMusicStyle(musicSlyleName);
        //console.log(artistProps.profile.artist?.musicStyles);
    };
    const handleCheckboxArtistTypeChange = (artistTypeName: string) => {
        profileMy.artist?.toggleArtisitType(artistTypeName);
    };

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <FormControl>
                    <FormLabel component="legend">Select artist type</FormLabel>

                    <Box>
                        <FormGroup>
                            {profileMy.artist?.artistTypes?.map(
                                (item, index) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={item.isSelected}
                                                onChange={() => {
                                                    handleCheckboxArtistTypeChange(
                                                        item.artistTypeName
                                                    );
                                                }}
                                                name={item.artistTypeName}
                                                key={
                                                    "chb" + item.artistTypeName
                                                }
                                            />
                                        }
                                        key={"fcl" + index}
                                        label={item.artistTypeName}
                                    />
                                )
                            )}
                        </FormGroup>
                    </Box>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend">Select music style</FormLabel>
                    <Box>
                        <FormGroup>
                            {profileMy.artist?.musicStyles.map(
                                (item, index) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={item.isSelected}
                                                onChange={() => {
                                                    handleCheckboxMusicStyleChange(
                                                        item.musicStyleName
                                                    );
                                                }}
                                                name={item.musicStyleName}
                                                key={
                                                    "chb" + item.musicStyleName
                                                }
                                            />
                                        }
                                        label={item.musicStyleName}
                                        key={"fcl" + index}
                                    />
                                )
                            )}
                        </FormGroup>
                    </Box>
                </FormControl>
            </Box>
            <Typography sx={{ margin: "0.5rem 0" }}>
                Creativity description:
            </Typography>
            <TextField
                sx={{ width: "100%" }}
                multiline
                rows={5}
                onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                    profileMy.artist.creativityDescription = e.target.value;
                }}
                value={profileMy.artist.creativityDescription}
            />
            <Button
                variant="outlined"
                color="error"
                sx={{ margin: "0.5rem 0" }}
            >
                Delete Artist data
            </Button>
        </Box>
    );
}

export default observer(ArtistEdit);
