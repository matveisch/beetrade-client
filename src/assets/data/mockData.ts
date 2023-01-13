import { SectionType, VideoType } from '../../interface/types';

export const mockVideos: VideoType[] = [
  {
    _id: '1',
    name: 'Video One',
    path: 'src/assets/videos/pexels-mart-production-8471384.mp4',
    watched: true,
    section: 'Section One',
    course: 'Course One',
  },
  {
    _id: '2',
    name: 'Video Two',
    path: 'src/assets/videos/pexels-mikhail-nilov-6706912.mp4',
    watched: true,
    section: 'Section One',
    course: 'Course One',
  },
  {
    _id: '3',
    name: 'Video Three',
    path: 'src/assets/videos/production ID_4267248.mp4',
    watched: true,
    section: 'Section Two',
    course: 'Course One',
  },
  {
    _id: '4',
    name: 'Video Four',
    path: 'src/assets/videos/sample.mp4',
    watched: false,
    section: 'Section Two',
    course: 'Course One',
  },
];

export const mockSections: SectionType[] = [
  {
    _id: '1',
    name: 'Section One',
    description: 'Section with videos about cryptocurrency',
  },
  {
    _id: '2',
    name: 'Section Two',
    description: 'Stock market and all you want to know about it',
  },
  {
    _id: '3',
    name: 'Section Three',
    description: 'Section three description',
  },
];
