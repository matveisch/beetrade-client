export interface VideoType {
  _id: string;
  name: string;
  path: string;
  watched: boolean;
  section: string;
  course: string;
}

export interface SectionType {
  _id: string;
  name: string;
  description: string;
}
