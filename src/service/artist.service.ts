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
