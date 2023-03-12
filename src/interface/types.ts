export interface VideoType {
  _id: string;
  name: string;
  path: string;
  watched: boolean;
  section: SectionType;
  course: CourseType;
  description: string;
}

export interface CourseType {
  name: string;
  description: string;
  _id: string;
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
  password: string;

  isAdmin: boolean;
  confirmed: boolean;
  courses: CourseType[];

  facebook?: string;
  telegram?: string;
  linkedin?: string;
}
