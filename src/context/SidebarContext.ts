import { createContext } from 'react';
import { VideoType } from '../interface/types';

export interface SidebarContextType {
  currentVideo: VideoType;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export default SidebarContext;
