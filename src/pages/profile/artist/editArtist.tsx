import { getAllArtistTypes, getAllMusicSlyles } from "@/servise/user.service";
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

export default function EditArtist() {
    const [artist, setArtist] = useState<IArtistDto>();
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

    const handleSaveArtist = () => {
        setArtist({
            artistTypes: artistTypes
                .filter((item) => item.isSelected)
                .map((item) => item.artistType),
            musicStyles: musicStyles
                .filter((item) => item.isSelected)
                .map((item) => item.musicStyle),
        });
        console.log(artist);
    };

    useEffect(() => {
        getAllArtistTypes().then((data) => {
            setAllArtisTypes(data);
            console.log(allArtisTypes);
        });
        getAllMusicSlyles().then((data) => {
            setAllMusicStyles(data);
            console.log(allMusicStyles);
        });
    }, []);

    useEffect(() => {
        setArtistTypes(
            allArtisTypes?.map((item) => {
                return { artistType: item, isSelected: false };
            })
        );
    }, [allArtisTypes]);

    useEffect(() => {
        setMusicStyles(
            allMusicStyles?.map((item) => {
                return { musicStyle: item, isSelected: false };
            })
        );
    }, [allMusicStyles]);

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <FormControl>
                    <FormLabel component="legend">Select artist type</FormLabel>

                    <Box>
                        {artistTypes?.map((item) => (
                            <FormGroup>
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
                                        />
                                    }
                                    label={item.artistType}
                                />
                            </FormGroup>
                        ))}
                    </Box>
                </FormControl>
                <FormControl>
                    <FormLabel component="legend">Select music style</FormLabel>
                    <Box>
                        {musicStyles?.map((item) => (
                            <FormGroup>
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
                                        />
                                    }
                                    label={item.musicStyle}
                                />
                            </FormGroup>
                        ))}
                    </Box>
                </FormControl>
            </Box>
            <Button onClick={handleSaveArtist}>Save artist information</Button>
        </Box>
    );
}
