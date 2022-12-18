export interface ITag {
    name: string,
    url: string
}

export interface IImage {
    [key: string]: string
}

export interface IArtist  {
    name: string,
    url: string,
    image: IImage[],
    listeners? : number
}

export interface ITrack  {
    name: string,
    url: string,
    image: IImage[],
    artist: IArtist
}

export interface IInfo  {
    artist: string,
    image: IImage[],
    name: string,
    url: string,
    duration?: number
}

export interface IRoute {
    path: string,
    element: JSX.Element,
    exact: boolean
}

export interface ISimpleList {
    id: number,
    extraInf?: string, 
    text: string
}

export interface IFooterCol {
    title: string,
    links: ISimpleList[]
}
