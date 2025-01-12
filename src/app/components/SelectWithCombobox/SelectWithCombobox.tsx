import * as Ariakit from '@ariakit/react';
import { css, cx } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { getRegExp } from 'korean-regexp';
import { type ReactNode, startTransition, useState } from 'react';

interface SelectWithComboboxProps {
  label: ReactNode;
  emptyValue: ReactNode;
  emptyList: ReactNode;
  optionList: { value: string; searchValue: string; label: ReactNode }[];
  selectedValue: string | null;
  placeholder: string;
  onChange: (value: string | null) => void;
}

export const SelectWithCombobox = ({
  label,
  emptyValue,
  emptyList,
  optionList,
  selectedValue,
  placeholder,
  onChange,
}: SelectWithComboboxProps) => {
  const [searchValue, setSearchValue] = useState('');
  const regexp = getRegExp(searchValue);

  const matches = optionList.filter((option) =>
    regexp.test(option.searchValue)
  );

  const selectedOption = selectedValue
    ? optionList.find((option) => option.value === selectedValue)
    : null;

  return (
    <Ariakit.ComboboxProvider
      resetValueOnHide
      setValue={(value) => {
        startTransition(() => {
          setSearchValue(value);
        });
      }}
    >
      <Ariakit.SelectProvider setValue={onChange} defaultValue=''>
        <Ariakit.SelectLabel>{label}</Ariakit.SelectLabel>
        {selectedOption ? (
          <button
            type='button'
            className={cx(inputClassName, hstack())}
            onClick={() => {
              onChange(null);
            }}
          >
            {selectedOption.label} 해제하기
          </button>
        ) : (
          <Ariakit.Select className={inputClassName}>
            <Ariakit.SelectValue>{() => emptyValue}</Ariakit.SelectValue>
          </Ariakit.Select>
        )}
        <Ariakit.SelectPopover
          gutter={4}
          sameWidth
          className={cx(
            vstack(),
            css({
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 12px 40px -4px rgba(25,30,40,.16)',
            })
          )}
        >
          <Ariakit.Combobox
            autoSelect
            placeholder={placeholder}
            aria-label={placeholder}
            className={inputClassName}
          />
          <Ariakit.ComboboxList className={css({ width: '100%' })}>
            {matches.length > 0
              ? matches.map((option) => (
                  <Ariakit.SelectItem
                    key={option.value}
                    value={option.value}
                    className={css({
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      '&[data-active-item]': {
                        background: '#f1f4f6',
                      },
                    })}
                    render={
                      <Ariakit.ComboboxItem>
                        {option.label}
                      </Ariakit.ComboboxItem>
                    }
                  />
                ))
              : emptyList}
          </Ariakit.ComboboxList>
        </Ariakit.SelectPopover>
      </Ariakit.SelectProvider>
    </Ariakit.ComboboxProvider>
  );
};

const inputClassName = css({
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #d9dee2',
  padding: '16px',
  textAlign: 'left',
});
