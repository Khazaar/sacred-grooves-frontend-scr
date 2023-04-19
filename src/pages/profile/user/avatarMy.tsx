import { ProfileModel } from "@/models/models";
import { uploadAvatar } from "@/service/user.service";
import { Button, Avatar, Box } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";

type AvatarProps = {
    profileMy: ProfileModel;
};

export default function AvatarMy({
    avatarProps,
}: {
    avatarProps: AvatarProps;
}) {
    const [currentImage, setCurrentImage] = useState<File | null>();
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>("");
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCurrentImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setPreviewImageUrl(url);
        }
    };
    const handleSave = async () => {
        //userMe && (await updateMe(userMe));
        currentImage && (await uploadAvatar(currentImage));
        //router.push("/profile");
    };
    useEffect(() => {
        if (avatarProps.profileMy?.user?.avatar?.pictureS3Url) {
            setPreviewImageUrl(
                avatarProps.profileMy?.user?.avatar?.pictureS3Url
            );
        }
    });
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 5,
            }}
        >
            <input
                id="btn-upload"
                name="file"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="btn-upload">
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span"
                >
                    Select avatar
                </Button>
            </label>
            {/* {previewImageUrl && <img src={previewImageUrl} alt="Preview" />} */}
            {previewImageUrl && (
                <Box sx={{ width: 200, height: 200 }}>
                    <img alt="Avatar" width="100%" src={previewImageUrl} />
                </Box>
            )}

            <Button onClick={handleSave}>Upload</Button>
        </Box>
    );
}
