import { createContext, Dispatch, SetStateAction } from 'react';
import { SectionType, VideoType } from '../interface/types';

export interface SidebarContextType {
  currentVideo: VideoType;
  currentSection: SectionType;
  setCurrentSection: Dispatch<SetStateAction<SectionType>>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export default SidebarContext;
