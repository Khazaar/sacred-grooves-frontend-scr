export async function getMe() {
    try {
        const res = await fetch("/api/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await res.json();

        //return data as IUserDto;
    } catch (error) {
        console.log(error);
    }
}

export async function updateMe(userMe: IUserDto) {
    fetch("/api/users/me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userMe),
    });
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