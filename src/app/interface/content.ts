export interface Content {
  id: number;
  body: string;
  input?: string;
  type: string;
  isRemoved?: boolean;
  topic: number;
  editorLen: number;
  taskCounter?: number;
}

export interface ContentVideo {
  id: number;
  body: string;
  type: string;
  isRemoved: boolean;
  topic: number;
}
