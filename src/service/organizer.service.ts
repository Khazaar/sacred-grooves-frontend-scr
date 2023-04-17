export async function createOrganizer() {
    try {
        const res = await fetch("/api/organizers/", {
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

export async function updateOrganizer(userMe: IUserDto) {
    fetch("/api/organizers/me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userMe),
    });
}
