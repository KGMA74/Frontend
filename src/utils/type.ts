export interface postType {
    id: number,
    author: number,
    category: number,
    tags: number,
    title: string,
    details: string,
    created: string,
    updated: string,
};

export interface commentType {
    id: number,
    post: number,
    author: number,
    content: string,
    created: string, 
    updated: string,
};

export interface voteType {
    id: number,
    author: number,
    post: number,
    type: string,
    created: string, 
    updated: string,
}

export interface tagType {
    name: string;
    description: string;
}

export interface ProfileType {
    id: number,
    photo: string,
    reputation: number,
    bio: string,
    confirmed: boolean,
    updated: string,

}

export interface categoryType {
    name: string;
    description: string;
}