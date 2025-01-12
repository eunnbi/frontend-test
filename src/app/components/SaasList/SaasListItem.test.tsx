import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  결제내역_없는_SaaS,
  로고_결제내역_있는_SaaS,
  이름만_있는_SaaS,
} from './mockData';
import {
  OnlyNameSaasItem,
  SaasItemWithLogoAndPayment,
  SaasItemWithoutPayment,
} from './SaasListItem.stories';

describe('SaasListItem test', () => {
  it('이름만 있는 Saas', () => {
    render(<OnlyNameSaasItem />);

    expect(
      screen.queryByRole('heading', { name: 이름만_있는_SaaS.name })
    ).toBeVisible();
    expect(screen.queryByText('결제')).toBeNull();
  });

  it('로고 결제내역 있는 SaaS', () => {
    render(<SaasItemWithLogoAndPayment />);

    expect(
      screen.queryByRole('heading', { name: 로고_결제내역_있는_SaaS.name })
    ).toBeVisible();
    expect(screen.queryByText('2024년 6월 27일 결제')).toBeVisible();
  });

  // NOTE: 링크 테스트 시 링크가 실제로 존재하는지에 대한 여부를 확인하는데는 어려움이 있기 때문에, framework에서 지원하는 typed route를 활용하면 좋다.
  it('항목은 해당 SaaS의 상세 페이지로 가는 링크이다.', () => {
    render(<SaasItemWithoutPayment />);

    expect(
      screen.queryByRole('link', { name: 결제내역_없는_SaaS.name })
    ).toHaveAttribute('href', `/saas/${결제내역_없는_SaaS.id}`);
  });
});
