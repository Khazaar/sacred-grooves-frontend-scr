import { ProfileModel, UserModel } from "@/models/models";
import { plainToInstance } from "class-transformer";

export async function getProfileMy() {
    try {
        const res = await fetch("/api/profiles/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        const profileMy = plainToInstance(
            ProfileModel,
            data
        ) as any as ProfileModel;

        return profileMy;

        //return data as IUserDto;
    } catch (error) {
        console.log(error);
    }
}
