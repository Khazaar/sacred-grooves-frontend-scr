import { PictureModel, ProfileModel, UserModel } from "@/models/models";
import { plainToInstance } from "class-transformer";

export async function getProfiles(
    targetSub?: string | undefined,
    targetRole?: string | undefined
) {
    try {
        const params = new URLSearchParams();
        if (targetSub != undefined) params.append("targetSub", targetSub);
        if (targetRole) params.append("targetRole", targetRole);

        const res = await fetch("/api/profiles?" + params, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: any[] = await res.json();
        // const profileMy = plainToInstance(
        //     ProfileModel,
        //     data
        // ) as any as ProfileModel;
        console.log(data);
        const profiles: ProfileModel[] = [];
        data.forEach((prf) => {
            const profileMy = new ProfileModel(prf.auth0sub);
            profileMy.user = new UserModel();
            profileMy.user.email = prf.user.email;
            profileMy.user.nickName = prf.user.nickName;
            profileMy.user.firstName = prf.user.firstName;
            profileMy.user.lastName = prf.user.lastName;
            profileMy.user.telegramName = prf.user.telegramName;
            profileMy.user.avatar = new PictureModel();
            profileMy.user.avatar.pictureS3Url = prf.user?.avatar?.pictureS3Url;
            profiles.push(profileMy);
        });
        console.log(profiles);

        return profiles;
    } catch (error) {
        console.log(error);
    }
}
