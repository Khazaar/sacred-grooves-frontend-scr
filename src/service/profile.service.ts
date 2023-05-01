import { ArtistModel } from "@/models/artistModel";
import { OrganizerModel } from "@/models/organizerModel";
import { PictureModel } from "@/models/pictureModel";
import { ProfileModel } from "@/models/profileModel";
import { UserModel } from "@/models/userModel";

export async function getProfilesData(
    targetSub: string | undefined,
    targetRole: string | undefined,
    targetId: string | undefined
) {
    try {
        const params = new URLSearchParams();
        if (targetSub) params.append("targetSub", targetSub);
        if (targetRole) params.append("targetRole", targetRole);
        if (targetId) params.append("targetId", targetId);

        const res = await fetch("/api/profiles?" + params, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: any[] = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function claimRole(targetRole: string) {
    try {
        const params = new URLSearchParams();
        if (targetRole) params.append("targetRole", targetRole);
        const res = await fetch("/api/profiles?" + params, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: any[] = await res.json();

        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateProfileMe(profile: ProfileModel) {
    try {
        const res = await fetch("/api/profiles/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        });
        const data: any = await res.json();

        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
}

// export async function refreshProfileMe(sub) {
//     try {
//         const res = await fetch("/api/profiles/me", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         const data: any = await res.json();

//         console.log(data);

//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }
