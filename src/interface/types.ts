export interface VideoType {
  _id: string;
  name: string;
  path: string;
  watched: boolean;
  section: SectionType;
  course: string;
}

export interface SectionType {
  _id: string;
  name: string;
  description: string;
}
