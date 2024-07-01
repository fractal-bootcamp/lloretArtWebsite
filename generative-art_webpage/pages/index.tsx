import { useState } from 'react';

type Artist = {
    id: number;
    name: string;
    email: string;
    clerkId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    avatarUrl: string | null;
};

export default function Home() {
    const [artists, setArtists] = useState<Artist[]>([]);

    const fetchArtists = async () => {
        const response = await fetch('/api/artists');
        const data = await response.json();
        setArtists(data);
    };

    return (
        <div>
            <h1>Artists</h1>
            <button onClick={fetchArtists}>Fetch Artists</button>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>
                        {artist.name} - {artist.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
