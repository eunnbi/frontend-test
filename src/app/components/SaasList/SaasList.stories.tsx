import { Meta } from '@storybook/react';
import { SaasList } from './SaasList';
import { mockList } from './mockData';

const meta = {
  title: 'SaasList',
  tags: ['autodocs'],
} satisfies Meta<typeof SaasList>;

export default meta;

export const EmptyList = () => <SaasList list={[]} />;

export const NonEmptyList = () => <SaasList list={mockList} />;
