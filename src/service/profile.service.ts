import {
    ArtistModel,
    OrganizerModel,
    PictureModel,
    ProfileModel,
    UserModel,
} from "@/models/models";
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
            if (prf.artist) {
                profileMy.artist = new ArtistModel();
                profileMy.artist.artistTypes = prf.artist.artistTypes;
                profileMy.artist.musicStyles = prf.artist.musicStyles;
            }
            if (prf.organizer != undefined) {
                profileMy.organizer = new OrganizerModel();
                profileMy.organizer.mainLocation = prf.organizer.mainLocation;
            }
            profiles.push(profileMy);
        });
        console.log(profiles);

        return profiles;
    } catch (error) {
        console.log(error);
    }
}

export async function claimRole(targetRole: string) {
    try {
        const params = new URLSearchParams();
        if (targetRole) params.append("targetRole", targetRole);
        const res = await fetch("/api/profiles?" + params, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: any[] = await res.json();

        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
}
