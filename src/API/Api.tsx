import { IArtist, IInfo, ITag, ITrack } from "../types/types";
import { apiKey, apiRoot, methods } from "../utils/constants";


export default class Api {
    static async getTopArtists(limit = 12, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.TopArtists}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.artists.artist as IArtist[];
    }

    static async getTagsByArtist(name: string) {
        const response = await fetch(apiRoot + `?method=${methods.TopTagsByArtist}&artist=${name}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.toptags.tag.slice(0,3) as ITag[];
    }

    static async getPopularTracks(limit = 12, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.TopTracks}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.tracks.track as ITrack[];
    }

    static async getTagsByTrack(track: string, artist: string) {
        if(track.includes('&'))
            return []
        const response = await fetch(apiRoot + `?method=${methods.TopTagsByTrack}&artist=${artist}&track=${track}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.toptags.tag.slice(0,3) as ITag[];
    }

    static async getArtistsBySearchValue(value: string, limit = 8, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.ArtistsBySearchValue}&artist=${value}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.results.artistmatches.artist as IArtist[];
    }

    static async getAlbumsBySearchValue(value: string, limit = 8, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.AlbumsBySearchValue}&album=${value}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.results.albummatches.album as IInfo[];
    }

    static async getTracksBySearchValue(value: string, limit = 10, page = 1) {
        const response = await fetch(apiRoot + `?method=${methods.TracksBySearchValue}&track=${value}&page=${page}&limit=${limit}&api_key=${apiKey}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        return data.results.trackmatches.track as IInfo[];
    }

    static async getAdditionalInfoAboutTrack(track: string, artist: string) {
        const response = await fetch(apiRoot + `?method=${methods.AdditionalInfoAboutTrack}&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message)
            throw new Error(data.message);
        }
        if(typeof data.track?.duration === 'undefined')
            return 0;
        else 
            return parseInt(data.track.duration);
    }
}