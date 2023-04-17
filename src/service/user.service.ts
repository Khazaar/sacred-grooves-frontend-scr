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

export async function uploadAvatar(file: File): Promise<any> {
    let formData = new FormData();
    formData.append("file", file);
    return fetch("/api/users/me/avatar", {
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
        method: "POST",
    });
}
