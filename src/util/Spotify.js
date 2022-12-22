import { CLIENT_ID } from "./config";
const REDIRECT_URI = "http://localhost:3000/";
let accessToken;

const Spotify = { 
    getAccessToken() {
        if (accessToken) { 
            return accessToken;
        }
        // Checking for an access token match. 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if ( accessTokenMatch && expiresInMatch ) { 
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = accessUrl;
        }

    },

    async search(term) { 
        
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        const jsonResponse = await response.json();

        if(!jsonResponse.tracks) {
            return [];
        }

        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));

        /*  USING PROMISES AND .THEN CHAINS 
            LEAVING THIS IN FOR LATER COMPARISON */
        // try {    
        //     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         }
        //     }).then(response => {
        //         return response.json();
        //     }).then(jsonResponse => {
        //         if (!jsonResponse.tracks) { 
        //             return [];
        //         }
        //         return jsonResponse.tracks.items.map(track => ({
        //             id: track.id,
        //             name: track.name,
        //             artist: track.artists[0].name,
        //             album: track.album.name,
        //             uri: track.uri
        //         }));
        //     })
        // } catch(e) { 
        //     console.log(e);
        // }
    },

    async savePlaylist(playlistName, trackURIs) { 
        if(!playlistName || !trackURIs.length) { 
            return;
        }

        const baseURL = 'https://api.spotify.com';
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`}

        // Fetch the userID
        const responseForId = await fetch(`${baseURL}/v1/me`, { headers: headers });
        const jsonResponseForId = await responseForId.json();
        const userId = jsonResponseForId.id;

        // Create a new playlist 
        const responseForPlaylist = await fetch(`${baseURL}/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            });

        const jsonResponseForPlaylist = await responseForPlaylist.json();
        const playlistId = jsonResponseForPlaylist.id;
        console.log(jsonResponseForPlaylist);
        fetch(`${baseURL}/v1/playlists/${playlistId}/tracks`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs })
            });
    }
}

export default Spotify;