export interface postType {
    id: number,
    owner: number,
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
    owner: number,
    content: string,
    created: string, 
    updated: string,
};

export interface voteType {
    id: number,
    owner: number,
    post: number,
    type: number,
    created: string, 
    updated: string,
}

export interface tagType {
    id: number;
    name: string;
    description: string;
}