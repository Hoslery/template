import { ISimpleList, IFooterCol } from "../types/types"

export const languages: ISimpleList[] = [
    {id: 1, text: 'English'},
    {id: 2, text: 'Deutsch'},
    {id: 3, text: 'Español'},
    {id: 4, text: 'Français'},
    {id: 5, text: 'Italiano'},
    {id: 6, text: '日本語'},
    {id: 7, text: 'Polski'},
    {id: 8, text: 'Português'},
    {id: 9, text: 'Русский'},
    {id: 10, text: 'Svenska'},
    {id: 11, text: 'Türkçe'},
    {id: 12, text: '简体中文'},
]

export const privacyItems: ISimpleList[] = [
    {id: 1, extraInf: '© 2022 Last.fm Ltd. All rights reserved' ,text: 'CBS Interactive'},
    {id: 2, text: 'Terms of Use'},
    {id: 3, text: 'Privacy Policy'},
    {id: 4, text: 'Legal Policies'},
    {id: 5, text: 'Cookies Policy'},
    {id: 6, text: 'Cookie Information'},
    {id: 7, text: 'Jobs at ViacomCBS'},
    {id: 8, text: 'Last.fm Music'},
]

export const footerCol: IFooterCol[] = [
    {title: 'Company', links: [
        {id: 1, text: 'About Last.fm'},
        {id: 2, text: 'Contact Us'},
        {id: 3, text: 'Jobs'},
    ]}, 
    {title: 'Help', links: [
        {id: 1, text: 'Track My Music'},
        {id: 2, text: 'Community Support'},
        {id: 3, text: 'Community Guidelines'},
        {id: 4, text: 'Help'}
    ]},
    {title: 'Goodies', links: [
        {id: 1, text: 'Download Scrobbler'},
        {id: 2, text: 'Developer API'},
        {id: 3, text: 'Free Music Downloads'},
        {id: 4, text: 'Merchandise'}
    ]},
    {title: 'Account', links: [
        {id: 1, text: 'Sign Up'},
        {id: 2, text: 'Log In'},
        {id: 3, text: 'Subscribe'},
    ]},
    {title: 'Follow Us', links: [
        {id: 1, text: 'Facebook'},
        {id: 2, text: 'Twitter'},
        {id: 3, text: 'Instagram'},
        {id: 4, text: 'YouTube'}
    ]},
]

export const navItems: ISimpleList[] = [
    {id: 1, text: 'Live'},
    {id: 2, text: 'Music'},
    {id: 3, text: 'Charts'},
    {id: 4, text: 'Events'},
    {id: 5, text: 'Features'},
    {id: 6, text: 'More...'}
]

export const authItems: ISimpleList[] = [
    {id: 1, text: 'Log in'},
    {id: 2, text: 'Sign Up'}
]

export const apiRoot: string = "http://ws.audioscrobbler.com/2.0/";
export const apiKey: string = "80bd75ebdb197778667b6757f51d855d";

export const methods = {
	TopArtists: "chart.gettopartists",
	TopTracks: "chart.gettoptracks",
	TopTagsByArtist: "artist.gettoptags",
	TopTagsByTrack: "track.gettoptags",
    ArtistsBySearchValue: "artist.search",
    AlbumsBySearchValue: "album.search",
    TracksBySearchValue: "track.search",
    AdditionalInfoAboutTrack: "track.getInfo"
}

export const searchNavTitles: ISimpleList[] = [
    {id: 1, text:'Top Results'},
    {id: 2, text: 'Artists'},
    {id: 3, text: 'Albums'},
    {id: 4, text: 'Tracks'}
]
