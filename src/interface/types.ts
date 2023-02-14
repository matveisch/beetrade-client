export interface VideoType {
  _id: string;
  name: string;
  path: string;
  watched: boolean;
  section: SectionType;
  course: string;
  description: string;
}

export interface SectionType {
  _id: string;
  name: string;
  description: string;
}

export interface UserDataType {
  firstName: string;
  secondName?: string;
  email: string;
  isAdmin: boolean;
  hasPaid: boolean;
  facebook?: string;
  telegram?: string;
  linkedin?: string;
}
