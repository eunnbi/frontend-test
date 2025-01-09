import { describe, it, expect } from 'vitest';
import { FilterStory } from './Filter.stories';
import { render, screen } from '@testing-library/react';

describe('Filter test', () => {
  it('결제 내역 있는 SaaS를 필터할 수 있다.', () => {
    render(<FilterStory />);

    expect(screen.getByRole('radio', { name: '전체' })).toBeChecked();
    expect(
      screen.getByRole('radio', { name: '결제 내역 있는 SaaS' })
    ).not.toBeChecked();

    screen.getByRole('radio', { name: '결제 내역 있는 SaaS' }).click();

    expect(screen.getByRole('radio', { name: '전체' })).not.toBeChecked();
    expect(
      screen.getByRole('radio', { name: '결제 내역 있는 SaaS' })
    ).toBeChecked();
  });
});
