'use client';
import { css } from '@styled-system/css/css';
import { createContext, useContext } from 'react';

import type { ReactNode } from 'react';

interface FilterGroupProps {
  title: string;
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

const Context = createContext<
  Pick<FilterGroupProps, 'value' | 'onValueChange'> | undefined
>(undefined);

export const FilterGroup = ({
  title,
  children,
  value,
  onValueChange,
}: FilterGroupProps) => {
  return (
    <fieldset>
      <legend className={css({ display: 'block' })}>{title}</legend>
      <Context.Provider value={{ value, onValueChange }}>
        {children}
      </Context.Provider>
    </fieldset>
  );
};

interface FilterItemProps {
  value: string;
  children: ReactNode;
}

export const FilterItem = ({ value, children }: FilterItemProps) => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      'Filter.Item should be rendered inside the Filter.Group component'
    );
  }

  const isChecked = value === context.value;

  return (
    <label
      className={css({
        borderRadius: '9999px',
        padding: '8px 12px',
        borderWidth: '1px',
        borderColor: 'transparent',
        backgroundColor: '#f1f4f6',
        fontSize: '0.75rem',
        transition: 'all 0.125s ease-in-out',
        cursor: 'pointer',
        // 웹 표준을 이용한 스타일링
        '&:has(input:checked)': {
          borderColor: '#4f89fb',
          backgroundColor: '#eaf3fe',
          color: '#1863f6',
        },
      })}
    >
      {children}
      <input
        className={css({ srOnly: true })}
        type='radio'
        value={value}
        checked={isChecked}
        onChange={() => {
          context.onValueChange(value);
        }}
      />
    </label>
  );
};

export const Group = FilterGroup;
export const Item = FilterItem;
