import { describe, it, expect } from 'vitest';
import { percentOfCompletedVideos } from './Sidebar';
import { mockVideos } from '../../assets/data/mockData';

describe('Sidebar component', () => {
  it('counts percent of watched videos', () => {
    expect(percentOfCompletedVideos(mockVideos)).toBe(75);
  });
});
