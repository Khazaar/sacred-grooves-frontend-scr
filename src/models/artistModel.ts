import { makeAutoObservable } from "mobx";

type MusicStyle = {
    musicStyleName: string;
    isSelected: boolean;
};
type ArtisitType = {
    artistTypeName: string;
    isSelected: boolean;
};

export class ArtistModel {
    artistTypes: ArtisitType[] = [];
    musicStyles: MusicStyle[] = [];
    profileId?: number;
    isActive: boolean = false;
    creativityDescription: string = "";
    toggleMusicStyle = (musicStyleName: string) => {
        const musicStyle = this.musicStyles.find(
            (x) => x.musicStyleName === musicStyleName
        );
        if (musicStyle) {
            musicStyle.isSelected = !musicStyle.isSelected;
        }
    };

    toggleArtisitType = (artistTypeName: string) => {
        const artisitType = this.artistTypes.find(
            (x) => x.artistTypeName === artistTypeName
        );
        if (artisitType) {
            artisitType.isSelected = !artisitType.isSelected;
        }
    };

    deactivate = () => {
        this.isActive = false;
        this.artistTypes.forEach((x) => (x.isSelected = false));
        this.musicStyles.forEach((x) => (x.isSelected = false));
    };

    constructor() {
        makeAutoObservable(this);
    }
}
