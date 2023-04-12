interface IUserDto {
    password?: string;
    email?: string;
    nickName?: string;
    firstName?: string;
    lastName?: string;
    telegramName?: string;
    mapLocation?: MapLocation;
    artist?: IArtistDto;
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
    artistTypes: { artistTypeName: string }[];
    musicStyles: { musicStyleName: string }[];
}

interface IArtistLocal {
    artistTypes: string[];
    musicStyles: string[];
}
