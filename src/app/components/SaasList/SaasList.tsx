'use client';

import { VStack } from '@styled-system/jsx';
import * as Filter from '../Filter/Filter';
import { SaasListItem } from './SaasListItem';
import Link from 'next/link';
import { useState } from 'react';

interface SaasListProps {
  list: {
    id: string;
    name: string;
    logoUrl: string | null;
    lastPaidAt: Date | null;
  }[];
}

export const SaasList = ({ list }: SaasListProps) => {
  const [selected, setSelected] = useState('all');

  if (list.length === 0) {
    return <Link href='/connect'>연동하세요</Link>;
  }

  const paidList = list.filter((item) => item.lastPaidAt !== null);

  const filteredList = selected === 'all' ? list : paidList;

  return (
    <VStack>
      <Filter.Group title='필터' value={selected} onValueChange={setSelected}>
        <Filter.Item value='all'>전체 {list.length}</Filter.Item>
        <Filter.Item value='with-payment'>
          결제 내역 있는 SaaS {paidList.length}
        </Filter.Item>
      </Filter.Group>
      <ul aria-label='SaaS 목록'>
        {filteredList
          .sort(
            (a, b) =>
              (b.lastPaidAt?.valueOf() ?? 0) - (a.lastPaidAt?.valueOf() ?? 0)
          )
          .map((item) => (
            <SaasListItem
              key={item.id}
              id={item.id}
              name={item.name}
              logoUrl={item.logoUrl}
              lastPaidAt={item.lastPaidAt}
            />
          ))}
      </ul>
    </VStack>
  );
};
