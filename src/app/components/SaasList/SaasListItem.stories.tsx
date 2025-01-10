import { Meta } from '@storybook/react';

import {
  결제내역_없는_SaaS,
  로고_결제내역_있는_SaaS,
  로고_없는_SaaS,
  이름만_있는_SaaS,
} from './mockData';
import { SaasListItem } from './SaasListItem';

const meta = {
  title: 'SaasListItem',
  tags: ['autodocs'],
} satisfies Meta<typeof SaasListItem>;

export default meta;

export const SaasItemWithoutPayment = () => (
  <SaasListItem {...결제내역_없는_SaaS} />
);

export const NoLogoSaasItem = () => <SaasListItem {...로고_없는_SaaS} />;

export const OnlyNameSaasItem = () => <SaasListItem {...이름만_있는_SaaS} />;

export const SaasItemWithLogoAndPayment = () => (
  <SaasListItem {...로고_결제내역_있는_SaaS} />
);
