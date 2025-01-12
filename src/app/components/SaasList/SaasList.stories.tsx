import { mockList } from './mockData';
import { SaasList } from './SaasList';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'SaasList',
  tags: ['autodocs'],
} satisfies Meta<typeof SaasList>;

export default meta;

export const EmptyList = () => <SaasList list={[]} />;

export const NonEmptyList = () => <SaasList list={mockList} />;
