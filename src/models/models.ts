export class UserModel {
    email?: string = "";
    nickName?: string = "";
    firstName?: string = "";
    lastName?: string = "";
    telegramName?: string = "";
    avatar?: PictureModel;
    mapLocation?: MapLocationModel;
    constructor(
        email?: string,
        nickName?: string,
        firstName?: string,
        lastName?: string,
        telegramName?: string
    ) {
        this.email = email;
        this.nickName = nickName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.telegramName = telegramName;
    }

    // setEmail(email: string) {
    //     this.email = email;
    // }
}

export class PictureModel {
    title?: string;
    pictureS3Url?: string;
    constructor(title?: string, pictureS3Url?: string) {
        this.title = title;
        this.pictureS3Url = pictureS3Url;
    }
}

export class ArtistModel {
    artistTypes?: string[];
    musicStyles?: string[];

    constructor(artist: ArtistModel) {
        this.artistTypes = artist.artistTypes;
        this.musicStyles = artist.musicStyles;
    }
}
export class OrganizerModel {
    mainLocation?: string;

    constructor(organizer: OrganizerModel) {
        this.mainLocation = organizer.mainLocation;
    }
}
export class ProfileModel {
    user?: UserModel;
    artist?: ArtistModel;
    organizer?: OrganizerModel;
    auth0sub?: string;
    constructor(auth0sub: string) {
        this.auth0sub = auth0sub;
    }
    updateUser(
        email?: string,
        nickName?: string,
        firstName?: string,
        lastName?: string,
        telegramName?: string
    ) {
        this.user = {
            email,
            nickName,
            firstName,
            lastName,
            telegramName,
        };
    }
    updateArtist(artistTypes?: string[], musicStyles?: string[]) {
        this.artist = {
            artistTypes,
            musicStyles,
        };
    }
    updateOrganizer(mainLocation?: string) {
        this.organizer = {
            mainLocation,
        };
    }
}

export class MapLocationModel {
    name?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
    country?: string;
}

// export class IArtistDto {
//     artistTypes: { artistTypeName: string }[];
//     musicStyles: { musicStyleName: string }[];
// }

// export class IArtistLocal {
//     artistTypes: string[];
//     musicStyles: string[];
// }

// export class IOrganizerDto {
//     artistTypes: { artistTypeName: string }[];
//     musicStyles: { musicStyleName: string }[];
// }
