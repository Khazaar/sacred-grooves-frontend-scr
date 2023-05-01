import { makeAutoObservable, makeObservable } from "mobx";

export class OrganizerModel {
    mainLocation?: string = "";
    isActive: boolean = false;
    constructor() {
        //makeAutoObservable(this);
        makeObservable(this, { mainLocation: true, isActive: true });
    }
}
