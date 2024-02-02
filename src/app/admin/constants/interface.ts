import { Content } from "src/app/interface/content";

export interface ParentDTO {
  name: string;
  parent: number;
}

export interface Topic {
  id: number;
  name: string;
  parent: number;
  isRemoved: boolean;
}

export interface ChildContent {
  id: number;
  topic: number;
  type: string;
  body: string;
  isRemoved: boolean;
  iconType: string;
}

export interface CreateParentDto {
  isRemoved: boolean;
  name: string;
  parent: number
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

