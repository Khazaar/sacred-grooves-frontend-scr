import { ArtistModel } from "@/models/models";
import React from "react";
type ArtistProps = {
    artist: ArtistModel | undefined;
};

export default function Artist({ artistProps }: { artistProps: ArtistProps }) {
    return <>{artistProps.artist?.profileId}</>;
}
