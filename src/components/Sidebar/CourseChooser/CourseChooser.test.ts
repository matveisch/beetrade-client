import { describe, it, expect } from 'vitest';
import { mockSections } from '../../../assets/data/mockData';
import { handleSectionChange } from './CourseChooser';

describe('CourseChooser', () => {
  it('returns next section', () => {
    expect(handleSectionChange(mockSections, 'right', mockSections[0])).toBe(mockSections[1]);
  });

  it('returns next section, middle case', () => {
    expect(handleSectionChange(mockSections, 'right', mockSections[1])).toBe(mockSections[2]);
  });

  it('returns previous section', () => {
    expect(handleSectionChange(mockSections, 'left', mockSections[1])).toBe(mockSections[0]);
  });

  it('returns next section, last index', () => {
    expect(handleSectionChange(mockSections, 'right', mockSections[2])).toBe(mockSections[0]);
  });

  it('returns previous section, first index', () => {
    expect(handleSectionChange(mockSections, 'left', mockSections[0])).toBe(mockSections[2]);
  });
});
