import { makeAutoObservable } from "mobx";

export class SupportTeamModel {
    abilities?: string;
    isActive: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }
}
