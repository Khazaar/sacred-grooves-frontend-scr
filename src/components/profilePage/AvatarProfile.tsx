import { UserModel } from "@/models/userModel";
import { uploadAvatar } from "@/service/user.service";
import { Button, Avatar, Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ProfileModel } from "@/models/profileModel";
import { useProfileMy } from "../Layout";

type AvatarProps = {
    profile: ProfileModel;
};

function AvatarProfile({ avatarProps }: { avatarProps: AvatarProps }) {
    const [currentImage, setCurrentImage] = useState<File | null>();
    // const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
    const profileMy = useProfileMy();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCurrentImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            //setPreviewImageUrl(url);
            avatarProps.profile.user.avatar.pictureS3Url = url;
            profileMy.user.avatar.pictureS3Url = url;
            avatarProps.profile.user.avatar.isAvaratSelected = true;
        }
    };
    const handleUpload = async () => {
        if (!currentImage) return;
        avatarProps.profile.user.avatar.pictureS3Url = await uploadAvatar(
            currentImage
        );
        avatarProps.profile.user.avatar.isAvaratSelected = false;
        profileMy.user.avatar.pictureS3Url =
            avatarProps.profile.user.avatar.pictureS3Url;

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
                {profileMy.isEditing && (
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
                {avatarProps.profile.user.avatar.pictureS3Url != "" && (
                    <Image
                        alt="Avatar"
                        width={200}
                        height={200}
                        src={avatarProps.profile.user.avatar.pictureS3Url}
                    />
                )}
            </Box>

            {avatarProps.profile.user.avatar.isAvaratSelected &&
                profileMy.isEditing && (
                    <Button onClick={handleUpload}>Upload</Button>
                )}
        </Box>
    );
}
export default observer(AvatarProfile);
