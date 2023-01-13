import { VideoType } from '../../interface/types';

const mockVideos: VideoType[] = [
  {
    _id: '1',
    name: 'Video One',
    path: 'src/assets/videos/pexels-mart-production-8471384.mp4',
    watched: true,
    courseName: 'Course One',
  },
  {
    _id: '2',
    name: 'Video Two',
    path: 'src/assets/videos/pexels-mikhail-nilov-6706912.mp4',
    watched: false,
    courseName: 'Course One',
  },
  {
    _id: '3',
    name: 'Video Three',
    path: 'src/assets/videos/production ID_4267248.mp4',
    watched: false,
    courseName: 'Course One',
  },
  {
    _id: '4',
    name: 'Video Four',
    path: 'src/assets/videos/sample.mp4',
    watched: false,
    courseName: 'Course One',
  },
];

export default mockVideos;
