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
