import { makeObservable, observable } from "mobx";
import { MapLocationModel } from "./mapLocationModel";
import { PictureModel } from "./pictureModel";

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
    }
}
