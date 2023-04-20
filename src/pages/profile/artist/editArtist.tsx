import { updateArtistMe } from "@/service/artist.service";
import { getAllArtistTypes, getAllMusicSlyles } from "@/service/artist.service";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface ArtistTypeSelected {
    artistType: string;
    isSelected: boolean;
}

interface MusicStyleSelected {
    musicStyle: string;
    isSelected: boolean;
}

export default function EditArtist({ userMe }: { userMe: IUserDto }) {
    //const [artist, setArtist] = useState<IArtistDto>();
    const [allArtisTypes, setAllArtisTypes] = useState<string[]>(["1"]);
    const [artistTypes, setArtistTypes] = useState<ArtistTypeSelected[]>([]);

    const [allMusicStyles, setAllMusicStyles] = useState<string[]>(["1"]);
    const [musicStyles, setMusicStyles] = useState<MusicStyleSelected[]>([]);

    const handleCheckboxArtistTypeChange = (artistType: string) => {
        const updatedItems = artistTypes.map((item) => {
            if (item.artistType === artistType) {
                return { ...item, isSelected: !item.isSelected };
            }
            return item;
        });
        setArtistTypes(updatedItems);
    };

    const handleCheckboxMusicStyleChange = (musicSlyle: string) => {
        const updatedItems = musicStyles.map((item) => {
            if (item.musicStyle === musicSlyle) {
                return { ...item, isSelected: !item.isSelected };
            }
            return item;
        });
        setMusicStyles(updatedItems);
    };

    const handleSaveArtist = async () => {
        const newArtist: IArtistLocal = {
            artistTypes: artistTypes
                .filter((item) => item.isSelected)
                .map((item) => item.artistType),
            musicStyles: musicStyles
                .filter((item) => item.isSelected)
                .map((item) => item.musicStyle),
        };
        updateArtistMe(newArtist).then((data) => console.log(data));
    };

    useEffect(() => {
        getAllArtistTypes().then((data) => {
            setAllArtisTypes(data);
        });
        getAllMusicSlyles().then((data) => {
            setAllMusicStyles(data);
        });
    }, []);

    useEffect(() => {
        userMe?.artist?.artistTypes &&
            setArtistTypes(
                allArtisTypes.map((item) => {
                    return {
                        artistType: item,
                        isSelected:
                            (userMe?.artist?.artistTypes &&
                                userMe.artist.artistTypes.filter(
                                    (e) => e.artistTypeName === item
                                ).length > 0) ||
                            false,
                    };
                })
            );
    }, [allArtisTypes]);

    useEffect(() => {
        userMe?.artist?.musicStyles &&
            setMusicStyles(
                allMusicStyles.map((item) => {
                    return {
                        musicStyle: item,
                        isSelected:
                            (userMe?.artist?.musicStyles &&
                                userMe.artist.musicStyles.filter(
                                    (e) => e.musicStyleName === item
                                ).length > 0) ||
                            false,
                    };
                })
            );
    }, [allMusicStyles]);

    // useEffect(() => {
    //     artist && updateArtist(artist).then((data) => console.log(data));
    // }, [artist]);

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <FormControl>
                    <FormLabel component="legend">Select artist type</FormLabel>

                    <Box>
                        <FormGroup>
                            {artistTypes?.map((item, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={item.isSelected}
                                            onChange={() => {
                                                handleCheckboxArtistTypeChange(
                                                    item.artistType
                                                );
                                            }}
                                            name={item.artistType}
                                            key={"chb" + item.artistType}
                                        />
                                    }
                                    key={"fcl" + index}
                                    label={item.artistType}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </FormControl>
                <FormControl>
                    <FormLabel component="legend">Select music style</FormLabel>
                    <Box>
                        <FormGroup>
                            {musicStyles?.map((item, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={item.isSelected}
                                            onChange={() => {
                                                handleCheckboxMusicStyleChange(
                                                    item.musicStyle
                                                );
                                            }}
                                            name={item.musicStyle}
                                            key={"chb" + item.musicStyle}
                                        />
                                    }
                                    label={item.musicStyle}
                                    key={"fcl" + index}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </FormControl>
            </Box>
            <Button onClick={handleSaveArtist}>Save artist information</Button>
        </Box>
    );
}
