import { useEffect } from 'react';
import classes from './CourseChooser.module.scss';
import arrow from '../../../assets/images/Arrow 6.svg';
import { SectionType } from '../../../interface/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCurrentSection, setCurrentSection } from '../../../features/currentSection/currentSectionSlice';
import { selectSections, setSections } from '../../../features/sections/sectionsSlice';
import { getData } from '../../../lib';

export function handleSectionChange(sections: SectionType[], direction: string, currentSection: SectionType) {
  let section: SectionType = currentSection;
  const currentSectionIndex: number = sections.findIndex(item => item._id === currentSection._id);

  if (direction === 'next') {
    section = currentSectionIndex === sections.length - 1 ? sections[0] : sections[currentSectionIndex + 1];
  } else if (direction === 'prev') {
    section = currentSectionIndex === 0 ? sections[sections.length - 1] : sections[currentSectionIndex - 1];
  }

  return section;
}

function CourseChooser() {
  const currentSection = useAppSelector(selectCurrentSection);
  const sections = useAppSelector(selectSections);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData<SectionType[]>('section').then(data => {
      dispatch(setSections(data));
    });
  }, []);

  // todo: error handling
  if (!sections || !currentSection) return <div>error</div>;

  return (
    <div className={classes.courseChooser}>
      <div className={classes.courseTitle}>
        <button
          type="button"
          onClick={() => {
            dispatch(setCurrentSection(handleSectionChange(sections, 'prev', currentSection)));
          }}>
          <img src={arrow} alt="" style={{ transform: 'rotate(-180deg)' }} />
        </button>
        <h1>{currentSection?.name}</h1>
        <button
          type="button"
          onClick={() => {
            dispatch(setCurrentSection(handleSectionChange(sections, 'next', currentSection)));
          }}>
          <img src={arrow} alt="" />
        </button>
      </div>
      <div className={classes.courseDescription}>
        <h1>{currentSection.description}</h1>
      </div>
    </div>
  );
}

export default CourseChooser;
