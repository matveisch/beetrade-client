import { useEffect, useState } from 'react';
import classes from './CurrentVideo.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Sidebar } from '../Sidebar/Sidebar';
import mockVideos from '../../assets/data/mockData';
import { VideoType } from '../../interface/types';

export function getFirstUnseenVideo(videos: VideoType[]): VideoType {
  const firstUnseen = videos.find(video => !video.watched);

  return firstUnseen !== undefined ? firstUnseen : videos[0];
}

function CurrentVideo() {
  const [videos, setVideos] = useState<VideoType[]>();
  const [firstUnseenVideo, setFirstUnseenVideo] = useState<VideoType | undefined>();

  useEffect(() => {
    setVideos(mockVideos);
  }, []);

  useEffect(() => {
    if (videos) setFirstUnseenVideo(getFirstUnseenVideo(videos));
  }, [videos]);

  if (!firstUnseenVideo) return <div>error</div>;

  return (
    <div className={classes.currentVideo}>
      <div>
        <VideoPlayer videoPath={firstUnseenVideo.path} />
      </div>
      <Sidebar currentVideo={firstUnseenVideo} />
    </div>
  );
}

export default CurrentVideo;
