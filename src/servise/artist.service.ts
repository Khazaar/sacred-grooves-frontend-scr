export async function createArtist() {
    try {
        const res = await fetch("/api/artists/", {
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
export async function updateArtist(data: IArtistLocal) {
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
