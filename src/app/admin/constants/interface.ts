export interface ParentDTO {
  name: string;
  parent: number;
}

export interface ParentDatum {
  id: number;
  name: string;
  parent: number;
  isRemoved: boolean;
  subtopics: SubTopics[]
}

export interface SubTopics {
  id: number;
  name: string;
}

export interface TopicDto {
  id: number;
  name: string;
  parent: number
}
