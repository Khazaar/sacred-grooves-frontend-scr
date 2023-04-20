import { PictureModel, ProfileModel, UserModel } from "@/models/models";
import { plainToInstance } from "class-transformer";

export async function getProfileMy() {
    try {
        const res = await fetch("/api/profiles/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: ProfileModel = await res.json();
        // const profileMy = plainToInstance(
        //     ProfileModel,
        //     data
        // ) as any as ProfileModel;
        const profileMy = new ProfileModel(data.auth0sub);
        profileMy.user = new UserModel();
        profileMy.user.email = data.user.email;
        profileMy.user.nickName = data.user.nickName;
        profileMy.user.firstName = data.user.firstName;
        profileMy.user.lastName = data.user.lastName;
        profileMy.user.telegramName = data.user.telegramName;
        profileMy.user.avatar = new PictureModel();
        profileMy.user.avatar.pictureS3Url = data.user?.avatar?.pictureS3Url;

        return profileMy;
    } catch (error) {
        console.log(error);
    }
}
