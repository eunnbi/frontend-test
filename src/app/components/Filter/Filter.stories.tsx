'use client';
import { useState } from 'react';
import * as Filter from './Filter';
import { Meta } from '@storybook/react';

const meta = {
  title: 'Filter',
  tags: ['autodocs'],
} satisfies Meta<typeof Filter.FilterGroup>;

export default meta;

export const FilterStory = () => {
  const [selected, setSelected] = useState('all');
  return (
    <Filter.Group title='필터' value={selected} onValueChange={setSelected}>
      <Filter.Item value='all'>전체</Filter.Item>
      <Filter.Item value='with-payment'>결제 내역 있는 SaaS</Filter.Item>
    </Filter.Group>
  );
};
