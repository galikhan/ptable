export interface Content {
    id: number;
    body: string;
    input?:string;
    type: string;
    isRemoved?: boolean;
    topic: number;
}