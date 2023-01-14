import { describe, it, expect } from 'vitest';
import { mockVideos } from '../../assets/data/mockData';
import { percentOfCompletedVideos } from './ProgressBar/ProgressBar';

describe('Sidebar component', () => {
  it('counts percent of watched videos', () => {
    expect(percentOfCompletedVideos(mockVideos)).toBe(75);
  });
});
