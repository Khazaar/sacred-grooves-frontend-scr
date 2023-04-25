import { makeObservable, observable } from "mobx";

export class PictureModel {
    title?: string = "";
    pictureS3Url?: string = "";
    isAvaratSelected: boolean = false;
    constructor() {
        makeObservable(this, { title: observable, pictureS3Url: observable });
    }
}
