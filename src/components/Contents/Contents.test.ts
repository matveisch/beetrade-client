import { describe, it, expect } from 'vitest';
import { findActiveButton, getRightComponent, selectOneButton } from './Contents';

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
    const buttons = [
      { title: 'סקירה כללית', active: false },
      { title: 'שאילות', active: true },
      { title: 'רשימת שיעורים', active: false },
    ];

    expect(getRightComponent(findActiveButton(buttons))).toEqual('שאילות');
  });
});
