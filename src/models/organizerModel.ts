import { makeAutoObservable } from "mobx";

export class OrganizerModel {
    mainLocation?: string;
    constructor() {
        makeAutoObservable(this);
    }
}
