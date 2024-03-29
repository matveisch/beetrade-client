import { useState } from 'react';
import classes from './SectionElement.module.scss';
import playButtonBackground from '../../../../assets/images/play-button-back.svg';
import playButton from '../../../../assets/images/play-button.svg';
import { SectionType } from '../../../../interface/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setCurrentSection } from '../../../../features/currentSection/currentSectionSlice';
import { selectVideos } from '../../../../features/videos/videosSlice';

interface SectionElementProps {
  section: SectionType;
}

function SectionElement({ section }: SectionElementProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const videos = useAppSelector(selectVideos);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classes.sectionElement}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => dispatch(setCurrentSection(section))}>
      <div className={classes.header}>
        <div className={classes.playButtonContainer}>
          <img src={playButtonBackground} className={classes.playButtonBackground} alt="" />
          <img src={playButton} className={classes.playButton} alt="" />
        </div>
        <div className={classes.titleContainer}>{section.name}</div>
      </div>
      {isHovered && (
        <ul className={classes.sectionLessons}>
          {videos
            ?.filter(video => video.section === section)
            .map(video => {
              return (
                <li key={video._id} className={classes.video}>
                  {video.name}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default SectionElement;
