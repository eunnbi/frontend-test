import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FilterStory } from './Filter.stories';

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

/**NOTE: 웹 표준을 이용한 스타일링
 * 라디오 체크여부에 따른 스타일이 잘 적용되었는지 테스트하고 싶다면 웹 표준을 활용해 스타일을 작성하는 것이 좋다.
 * 스타일까지 직접 테스트하진 않지만, role 및 accessible name으로 요소에 접근하고 속성을 검증하는 식의 테스트를 작성한다면 스타일은 자연스럽게 검증되고 확신할 수 있다.
 */
