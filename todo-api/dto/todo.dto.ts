export interface PostTodoRequest {
    text: string;
}

export interface PutTodoRequest {
    _id: string;
    text: string;
}

export interface GetTodoResponse {
    _id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
