import { action, makeAutoObservable, makeObservable, observable } from "mobx";

type MusicStyleIsSelected = {
    musicStyleName: string;
    isSelected: boolean;
};

export class MusicStylesModel {
    musicStyleIsSelected: MusicStyleIsSelected[] = [];
    // hydrate(data: any) {
    //     const musicStyleIsSelected: MusicStyleIsSelected[] = [];
    //     if (data)
    //         data.forEach((mst: any) => {
    //             const musicStyleIsSelectedItem: MusicStyleIsSelected = {
    //                 musicStyleName: mst,
    //                 isSelected: false,
    //             };
    //             musicStyleIsSelected.push(musicStyleIsSelectedItem);
    //         });
    //     this.musicStyleIsSelected = musicStyleIsSelected;
    // }
    constructor() {
        //makeAutoObservable(this);
        this.musicStyleIsSelected = [];
        makeObservable(this, {
            musicStyleIsSelected: observable,
            hydrate: action,
        });
    }
}
