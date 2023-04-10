import { getAllArtistTypes } from "@/servise/user.service";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ArtistTypeSelected {
    artistType: string;
    isSelected: boolean;
}

export default function EditArtist() {
    const [artist, setArtist] = useState<IArtistDto>();
    const [allArtisTypes, setAllArtisTypes] = useState<string[]>([""]);
    const [artistTypes, setArtistTypes] = useState<ArtistTypeSelected[]>(
        allArtisTypes.map((item) => {
            return { artistType: item, isSelected: false };
        })
    );

    const handleCheckboxChange = (artistType: string) => {
        const updatedItems = artistTypes.map((item) => {
            if (item.artistType === artistType) {
                return { ...item, isSelected: !item.isSelected };
            }
            return item;
        });
        setArtistTypes(updatedItems);
    };

    useEffect(() => {
        getAllArtistTypes().then((data) => {
            setAllArtisTypes(data);
            console.log(allArtisTypes);
        });
    }, []);
    useEffect(() => {
        setArtistTypes(
            allArtisTypes.map((item) => {
                return { artistType: item, isSelected: false };
            })
        );
    }, [allArtisTypes]);

    return (
        <>
            <Box>
                <h3>Select artist type</h3>
                <Box>
                    {artistTypes.map((item) => (
                        <div key={item.artistType}>
                            <input
                                type="checkbox"
                                id={`checkbox-${item.artistType}`}
                                checked={item.isSelected}
                                onChange={() =>
                                    handleCheckboxChange(item.artistType)
                                }
                            />
                            <label htmlFor={`checkbox-${item.artistType}`}>
                                {item.artistType}
                            </label>
                        </div>
                    ))}
                </Box>
                <h3>Select music style</h3>
            </Box>
        </>
    );
}
