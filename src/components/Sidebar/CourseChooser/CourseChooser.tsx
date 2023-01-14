import { useContext, useEffect, useState } from 'react';
import classes from './CourseChooser.module.scss';
import arrow from '../../../assets/images/Arrow 6.svg';
import SidebarContext, { SidebarContextType } from '../../../context/SidebarContext';
import { SectionType } from '../../../interface/types';
import { mockSections } from '../../../assets/data/mockData';

export function handleSectionChange(sections: SectionType[], direction: string, currentSection: SectionType) {
  let section: SectionType = currentSection;
  const currentSectionIndex: number = sections.indexOf(currentSection);

  if (direction === 'right') {
    section = currentSectionIndex === sections.length - 1 ? sections[0] : sections[currentSectionIndex + 1];
  } else if (direction === 'left') {
    section = currentSectionIndex === 0 ? sections[sections.length - 1] : sections[currentSectionIndex - 1];
  }

  return section;
}

function CourseChooser() {
  const [sections, setSections] = useState<SectionType[]>();
  const { currentSection, setCurrentSection } = useContext(SidebarContext) as SidebarContextType;

  useEffect(() => {
    setSections(mockSections);
  }, []);

  // todo: error handling
  if (!sections || !currentSection) return <div>error</div>;

  return (
    <div className={classes.courseChooser}>
      <div className={classes.courseTitle}>
        <button
          type="button"
          onClick={() => {
            setCurrentSection(handleSectionChange(sections, 'right', currentSection));
          }}>
          <img src={arrow} alt="" style={{ transform: 'rotate(-180deg)' }} />
        </button>
        <h1>{currentSection?.name}</h1>
        <button
          type="button"
          onClick={() => {
            setCurrentSection(handleSectionChange(sections, 'left', currentSection));
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
