export interface IVimeoPitctures{
    active: boolean;
    resource_key: string;
    sizes: Array<any>;
    type: string;
    uri: string;
}

export interface IVimeoUser{
    account: string;
    bio: string;
    created_time: string;
    link: string;
    location: string;
    metadata: any;
    name: any;
    pictures: any;
    resource_key: string;
    uri: string;
    websites: any;
}

// export interface IVimeoEntryProps{
//     title?: string;
//     description: string;
//     author?: IVimeoUser;
//     url?: string;
//     playerProps?: string;
//     pictures?: IVimeoPitctures;
//     showVideo: boolean;
//     onClick?: any;
// }
export interface IVimeoEntryProps{
    item: any;
    onShowVideo: any;
}