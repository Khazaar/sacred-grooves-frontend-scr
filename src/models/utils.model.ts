import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { PictureModel } from "./pictureModel";
import { ProfileModel } from "./profileModel";
import { UserModel } from "./userModel";

export const parceProfile = (prf: any) => {
    const profileMy = new ProfileModel(prf.auth0sub);
    profileMy.id = prf.id;
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
    return profileMy;
};
