import { MemberCreateForm } from './MemberCreateForm';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'MemberCreateForm',
  tags: ['autodocs'],
} satisfies Meta<typeof MemberCreateForm>;

export default meta;

export const MemberCreateFormStory = () => {
  return (
    <MemberCreateForm
      createMember={async (newMember) => {
        alert(JSON.stringify(newMember));
      }}
    />
  );
};
