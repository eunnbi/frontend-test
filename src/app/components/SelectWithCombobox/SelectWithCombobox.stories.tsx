import { Dialog, DialogDismiss, DialogHeading } from '@ariakit/react';
import { overlay, OverlayProvider } from 'overlay-kit';
import { useState } from 'react';

import { button } from '@/app/styles/button';
import { dialog } from '@/app/styles/dialog';

import { testMemberList } from './mockData';
import { SelectWithCombobox } from './SelectWithCombobox';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'SelectWithCombobox',
  tags: ['autodocs'],
} satisfies Meta<typeof SelectWithCombobox>;

export default meta;

export const SelectWithComboboxStory = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <OverlayProvider>
      <SelectWithCombobox
        label='사용자'
        emptyValue={<div>설정하기</div>}
        emptyList={<span>No Results</span>}
        placeholder='이름을 입력해주세요.'
        optionList={testMemberList.map((member) => ({
          value: member.id,
          searchValue: member.name,
          label: <div> {member.name}</div>,
        }))}
        selectedValue={selectedValue}
        onChange={(option) => {
          if (option === null) {
            overlay.open(({ isOpen, close }) => {
              return (
                <Dialog open={isOpen} onClose={close} className={dialog()}>
                  <DialogHeading>사용자를 해제할까요?</DialogHeading>
                  <DialogDismiss
                    className={button()}
                    onClick={() => {
                      setSelectedValue(null);
                    }}
                  >
                    확인
                  </DialogDismiss>
                </Dialog>
              );
            });
          } else {
            setSelectedValue(option);
          }
        }}
      />
    </OverlayProvider>
  );
};
