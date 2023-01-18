import { selectCurrentVideo, setCurrentVideo } from '../../../features/currentVideo/currentVideoSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { VideoType } from '../../../interface/types';
import VideoElement from '../VideoElement/VideoElement';
import classes from './ListOfVideos.module.scss';

interface ListOfVideosProps {
  currentSectionVideos: VideoType[];
}

function ListOfVideos({ currentSectionVideos }: ListOfVideosProps) {
  const currentVideo = useAppSelector(selectCurrentVideo);
  const dispatch = useAppDispatch();

  // todo: add context here passing current videos
  return (
    <div className={classes.listOfVideos}>
      {currentSectionVideos.map(video => {
        return (
          <VideoElement
            key={video._id}
            isActive={currentVideo?._id === video._id}
            video={video}
            onClick={() => dispatch(setCurrentVideo(video))}
          />
        );
      })}
    </div>
  );
}

export default ListOfVideos;
