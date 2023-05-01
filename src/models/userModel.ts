import { makeAutoObservable, makeObservable, observable } from "mobx";
import { MapLocationModel } from "./mapLocationModel";
import { PictureModel } from "./pictureModel";

export class UserModel {
    email: string = "";
    nickName: string = "";
    firstName: string = "";
    lastName: string = "";
    telegramName: string = "";
    avatar: PictureModel = new PictureModel();
    mapLocation?: MapLocationModel;
    about: string = "";

    constructor() {
        //makeObservable(this, { isEditing: observable, nickName: observable });
        makeAutoObservable(this);
        //this.avatar = new PictureModel();
    }
}
