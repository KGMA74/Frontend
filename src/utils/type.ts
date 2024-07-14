export interface postType {
    id: string,
    owner: string,
    category: string,
    tags: string,
    title: string,
    details: string,
    created: string,
    updated: string,
};

export interface commentType {
    id: string,
    post: string,
    owner: string,
    content: string,
    created: string, 
    updated: string,
}