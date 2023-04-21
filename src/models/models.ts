import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class UserModel {
    email: string = "";
    nickName: string = "";
    firstName: string = "";
    lastName: string = "";
    telegramName?: string = "";
    avatar: PictureModel;
    mapLocation?: MapLocationModel;
    isEditing: boolean = false;

    constructor() {
        makeObservable(this, { isEditing: observable, nickName: observable });
        this.avatar = new PictureModel();
        //makeAutoObservable(this);
    }

    // setEditingState(isEditing: boolean) {
    //     this.isEditing = isEditing;
    //     console.log("isEditing", this.isEditing);
    // }
}

export class PictureModel {
    title?: string = "";
    pictureS3Url?: string = "";
    isAvaratSelected: boolean = false;
    constructor() {
        makeObservable(this, { title: observable, pictureS3Url: observable });
    }
}

export class ArtistModel {
    artistTypes?: string[];
    musicStyles?: string[];
    profileId?: number;
}
export class OrganizerModel {
    mainLocation?: string;

    constructor(organizer: OrganizerModel) {
        this.mainLocation = organizer.mainLocation;
    }
}
export class ProfileModel {
    user: UserModel;
    artist?: ArtistModel;
    organizer?: OrganizerModel;
    auth0sub?: string;

    constructor(auth0sub?: string) {
        this.auth0sub = auth0sub;
        this.user = new UserModel();
        //makeAutoObservable(this);
        makeObservable(this, { user: observable });
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
