import { useState } from 'react';

import { testMemberList } from './mockData';
import { SelectWithCombobox } from './SelectWithCombobox';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'SelectWithCombobox',
  tags: ['autodocs'],
} satisfies Meta<typeof SelectWithCombobox>;

export default meta;

export const MultipleOptions = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  return (
    <SelectWithCombobox
      label='사용자'
      emptyValue={<div>설정하기</div>}
      placeholder='이름을 입력해주세요.'
      optionList={testMemberList.map((member) => ({
        value: member.id,
        searchValue: member.name,
        label: <div> {member.name}</div>,
      }))}
      selectedValue={selectedValue}
      onChange={setSelectedValue}
    />
  );
};

export const EmptyOption = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  return (
    <SelectWithCombobox
      label='사용자'
      emptyValue={<div>설정하기</div>}
      placeholder='이름을 입력해주세요.'
      optionList={[]}
      selectedValue={selectedValue}
      onChange={setSelectedValue}
    />
  );
};
