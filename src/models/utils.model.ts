import { UserRoles } from "@/enums";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { PictureModel } from "./pictureModel";
import { ProfileModel } from "./profileModel";
import { UserModel } from "./userModel";

export const parseProfile = (prf: any) => {
    const profile = new ProfileModel(prf.auth0sub);
    profile.id = prf.id;
    profile.user = new UserModel();
    profile.user.email = prf.user.email;
    profile.user.nickName = prf.user.nickName;
    profile.user.firstName = prf.user.firstName;
    profile.user.lastName = prf.user.lastName;
    profile.user.telegramName = prf.user.telegramName;
    profile.user.avatar = new PictureModel();
    profile.user.avatar.pictureS3Url = prf.user?.avatar?.pictureS3Url;
    if (prf.artist) {
        profile.artist = new ArtistModel();
        // profile.artist.artistTypes = prf.artist.artistTypes;
        // profile.artist.musicStyles = prf.artist.musicStyles;
        profile.roles.push(UserRoles.Artist);
        for (const muticStyle of prf.artist.musicStyles) {
            profile.artist.musicStyles.push({
                musicStyleName: muticStyle.musicStyleName,
                isSelected: muticStyle.isSelected,
            });
        }
        for (const artisitType of prf.artist.artistTypes) {
            profile.artist.artistTypes.push({
                artistTypeName: artisitType.artistTypeName,
                isSelected: artisitType.isSelected,
            });
        }
    }
    if (prf.organizer != undefined) {
        profile.organizer = new OrganizerModel();
        profile.organizer.mainLocation = prf.organizer.mainLocation;
        profile.roles.push(UserRoles.Organizer);
    }
    return profile;
};
