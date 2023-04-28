import { UserModel } from "@/models/userModel";
import { uploadAvatar } from "@/service/user.service";
import { Button, Avatar, Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

type AvatarProps = {
    user: UserModel;
};

function AvatarProfile({ avatarProps }: { avatarProps: AvatarProps }) {
    const [currentImage, setCurrentImage] = useState<File | null>();
    // const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCurrentImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            //setPreviewImageUrl(url);
            avatarProps.user.avatar.pictureS3Url = url;
            avatarProps.user.avatar.isAvaratSelected = true;
        }
    };
    const handleUpload = async () => {
        if (!currentImage) return;
        avatarProps.user.avatar.pictureS3Url = await uploadAvatar(currentImage);
        avatarProps.user.avatar.isAvaratSelected = false;
        //router.push("/profile");
    };
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
                {avatarProps.user?.isEditing && (
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                    >
                        Select avatar
                    </Button>
                )}
            </label>
            {/* {previewImageUrl && <img src={previewImageUrl} alt="Preview" />} */}

            <Box sx={{ width: 200 }}>
                <Image
                    alt="Avatar"
                    width={200}
                    height={200}
                    src={avatarProps.user.avatar.pictureS3Url}
                />
            </Box>

            {avatarProps.user.avatar.isAvaratSelected &&
                avatarProps.user?.isEditing && (
                    <Button onClick={handleUpload}>Upload</Button>
                )}
        </Box>
    );
}
export default observer(AvatarProfile);
