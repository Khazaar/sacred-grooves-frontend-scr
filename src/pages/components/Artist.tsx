import { ProfileModel } from "@/models/profileModel";

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

type ArtistProps = {
    profile: ProfileModel;
};

function Artist({ artistProps }: { artistProps: ArtistProps }) {
    const handleCheckboxMusicStyleChange = (musicSlyleName: string) => {
        artistProps.profile.artist?.toggleMusicStyle(musicSlyleName);
    };
    const handleCheckboxArtistTypeChange = (artistTypeName: string) => {
        artistProps.profile.artist?.toggleArtisitType(artistTypeName);
    };

    const handleSaveArtist = async () => {};

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <FormControl>
                    <FormLabel component="legend">Select artist type</FormLabel>

                    <Box>
                        <FormGroup>
                            {artistProps.profile.artist?.artistTypes?.map(
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
                            {artistProps.profile.artist?.musicStyles.map(
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
            <Button onClick={handleSaveArtist}>Save artist information</Button>
        </Box>
    );
}

export default observer(Artist);
