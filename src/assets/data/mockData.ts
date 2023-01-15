import { SectionType, VideoType } from '../../interface/types';

export const mockSections: SectionType[] = [
  {
    _id: '1',
    name: 'שעור 1',
    description: 'דסקריבשן על השעור מה שם מה לומדים',
  },
  {
    _id: '2',
    name: 'שעור 2',
    description: 'דסקריבשן על השעור מה שם מה לומדים',
  },
  {
    _id: '3',
    name: 'שעור 3',
    description: 'דסקריבשן על השעור מה שם מה לומדים',
  },
];

export const mockVideos: VideoType[] = [
  {
    _id: '1',
    name: 'פרק 1',
    path: 'src/assets/videos/pexels-mart-production-8471384.mp4',
    watched: true,
    section: mockSections[0],
    course: 'Course One',
    description: 'פה לומדים על זה',
  },
  {
    _id: '2',
    name: 'פרק 2',
    path: 'src/assets/videos/pexels-mikhail-nilov-6706912.mp4',
    watched: true,
    section: mockSections[0],
    course: 'Course One',
    description: 'פה לומדים על זה',
  },
  {
    _id: '3',
    name: 'פרק 3',
    path: 'src/assets/videos/production ID_4267248.mp4',
    watched: true,
    section: mockSections[1],
    course: 'Course One',
    description: 'פה לומדים על זה',
  },
  {
    _id: '4',
    name: 'פרק 4',
    path: 'src/assets/videos/sample.mp4',
    watched: false,
    section: mockSections[1],
    course: 'Course One',
    description: 'פה לומדים על זה',
  },
];
