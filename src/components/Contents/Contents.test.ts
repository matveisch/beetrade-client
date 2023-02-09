import { describe, it, expect } from 'vitest';
import { findActiveButton, getRightComponent, selectOneButton } from './Contents';
import { mockSections } from '../../assets/data/mockData';

describe('Contents component', () => {
  it('selects only one button', () => {
    const buttons = [
      { title: 'סקירה כללית', active: false },
      { title: 'שאילות', active: false },
      { title: 'רשימת שיעורים', active: true },
    ];

    expect(selectOneButton(buttons[1], buttons)).toEqual([
      { title: 'סקירה כללית', active: false },
      { title: 'שאילות', active: true },
      { title: 'רשימת שיעורים', active: false },
    ]);
  });

  it('returns active button', () => {
    const buttons = [
      { title: 'סקירה כללית', active: false },
      { title: 'שאילות', active: false },
      { title: 'רשימת שיעורים', active: true },
    ];

    expect(findActiveButton(buttons)).toEqual({ title: 'רשימת שיעורים', active: true });
  });

  it('returns right component', () => {
    const currentVideo = {
      _id: '1',
      name: 'שעור 1',
      path: 'src/assets/videos/pexels-mart-production-8471384.mp4',
      watched: true,
      section: mockSections[0],
      course: 'Course One',
      description: 'פה לומדים על זה',
    };

    const buttons = [
      { title: 'סקירה כללית', active: false },
      { title: 'שאילות', active: true },
      { title: 'רשימת שיעורים', active: false },
    ];

    expect(getRightComponent(findActiveButton(buttons), currentVideo)).toEqual('שאילות');
  });
});
