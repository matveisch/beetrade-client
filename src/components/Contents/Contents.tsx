import { useContext, useState } from 'react';
import SidebarContext, { SidebarContextType } from '../../context/SidebarContext';
import { VideoType } from '../../interface/types';
import classes from './Contents.module.scss';
import Description from './Description/Description';
import NavButton from './NavButton/NavButton';
import SectionsGrid from './SectionsGrid/SectionsGrid';

interface ButtonType {
  title: string;
  active: boolean;
}

export function selectOneButton(button: ButtonType, buttons: ButtonType[]): ButtonType[] {
  const localButtons = [...buttons];

  localButtons.forEach(item => (item.active = false));
  const buttonIndex = localButtons.indexOf(button);
  localButtons[buttonIndex].active = true;

  return localButtons;
}

export function findActiveButton(buttons: ButtonType[]) {
  return buttons.find(button => button.active === true);
}

export function getRightComponent(button: ButtonType | undefined, currentVideo: VideoType) {
  switch (button?.title) {
    case 'סקירה כללית':
      return <Description body={currentVideo.description} />;
    case 'רשימת שיעורים':
      return <SectionsGrid />;
    default:
      return 'סקירה כללית';
  }
}

function Contents() {
  const [buttons, setButtons] = useState([
    { title: 'סקירה כללית', active: true },
    { title: 'רשימת שיעורים', active: false },
  ]);

  const { currentVideo } = useContext(SidebarContext) as SidebarContextType;

  return (
    <div className={classes.contents}>
      <nav className={classes.navbar}>
        {buttons.map(button => {
          return (
            <NavButton
              title={button.title}
              key={button.title}
              isActive={button.active}
              onClick={() => setButtons(selectOneButton(button, buttons))}
            />
          );
        })}
      </nav>
      {getRightComponent(findActiveButton(buttons), currentVideo)}
    </div>
  );
}

export default Contents;
