import { ArtistModel } from "@/models/artistModel";

export async function createArtistMe() {
    try {
        const res = await fetch("/api/artists/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
export async function updateArtistMe(data: IArtistLocal) {
    try {
        const res = await fetch("/api/artists/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getAllArtistTypes() {
    try {
        const res = await fetch("/api/artists/artist-types", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getAllMusicSlyles() {
    try {
        const res = await fetch("/api/artists/music-styles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getAllArtists() {
    try {
        const res = await fetch("/api/artists/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const artists: ArtistModel[] = [];
        const data: ArtistModel[] = await res.json();
        data.forEach((artist) => {
            const art = new ArtistModel();
            art.profileId = artist.profileId;
            artists.push(art);
        });
        return artists;
    } catch (error) {
        console.log(error);
    }
}
