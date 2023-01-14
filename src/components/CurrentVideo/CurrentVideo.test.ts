import { describe, it, expect } from 'vitest';
import { getFirstUnseenVideo } from './CurrentVideo';
import { mockVideos } from '../../assets/data/mockData';

describe('CurrentVideo component', () => {
  it('returns first unseen video in the array', () => {
    expect(getFirstUnseenVideo(mockVideos)).toBe(mockVideos[3]);
  });
});
