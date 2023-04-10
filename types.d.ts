interface IUserDto {
    password?: string;
    email?: string;
    nickName?: string;
    firstName?: string;
    lastName?: string;
    telegramName?: string;
    mapLocation?: MapLocation;
}

interface MapLocation {
    name?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
    country?: string;
}

interface IArtistDto {
    artistTypes: string;
    musicStyles: string;
}
