import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { getA11ySnapshot } from '@/test/getA11ySnapshot';

import { MultipleOptions } from './SelectWithCombobox.stories';

describe('SelectWithCombobox', () => {
  it('콤보박스를 클릭하면 옵션 목록을 보여준다.', async () => {
    const screen = render(<MultipleOptions />);

    // given 콤보박스의 초기 상태에서 "설정하기" 텍스트가 표시된다.
    await expect
      .element(screen.getByRole('combobox', { name: '사용자' }))
      .toHaveTextContent('설정하기');

    // when 콤포박스를 클릭한다.
    await screen.getByRole('combobox', { name: '사용자' }).click();

    // then 옵션 목룍이 표시된다
    const expectedTextContents = ['탐정토끼', '김태희', 'stelo'];
    const elements = screen.getByRole('option').elements();
    expect(elements).toHaveLength(3);
    elements.forEach((element, index) => {
      expect(element).toHaveTextContent(expectedTextContents[index]);
    });

    expect(getA11ySnapshot(document.body)).toMatchInlineSnapshot(`
			"combobox: 사용자
			dialog: 사용자
			  combobox: 이름을 입력해주세요.
			  listbox
			    option: 탐정토끼
			    option: 김태희
			    option: stelo"
		`);
  });

  it('옵션을 검색할 수 있다.', async () => {
    const screen = render(<MultipleOptions />);
    await screen.getByRole('combobox', { name: '사용자' }).click();

    await screen
      .getByRole('combobox', { name: '이름을 입력해주세요.' })
      .fill('김ㅌ');

    await expect
      .element(screen.getByRole('option'))
      .toHaveTextContent('김태희');

    await screen
      .getByRole('combobox', { name: '이름을 입력해주세요.' })
      .fill('ㅌ');

    const expectedTextContents = ['탐정토끼', '김태희'];
    const elements = screen.getByRole('option').elements();
    expect(elements).toHaveLength(2);
    elements.forEach((element, index) => {
      expect(element).toHaveTextContent(expectedTextContents[index]);
    });
  });

  it('검색 결과가 없는 경우 "No Result" 메시지를 보여준다.', async () => {
    const screen = render(<MultipleOptions />);

    await screen.getByRole('combobox', { name: '사용자' }).click();
    await screen
      .getByRole('combobox', { name: '이름을 입력해주세요.' })
      .fill('asdf');

    await expect
      .element(screen.getByRole('dialog', { name: '사용자' }))
      .toHaveTextContent('No Result');
  });

  it('옵션을 선택하고 해재할 수 있다.', async () => {
    const screen = render(<MultipleOptions />);

    await screen.getByRole('combobox', { name: '사용자' }).click();
    await screen.getByRole('option', { name: '김태희' }).click();
    await screen.getByRole('button', { name: '김태희 해제하기' }).click();

    // Web first assertion (https://playwright.dev/docs/best-practices#use-web-first-assertions)
    await expect
      .element(screen.getByRole('dialog', { name: '사용자를 해제할까요?' }))
      .toBeVisible();

    expect(getA11ySnapshot(document.body)).toMatchInlineSnapshot(`
			"button: 김태희 해제하기
			dialog: 사용자를 해제할까요?
			  heading: 사용자를 해제할까요?
			  button: 확인"
		`);

    await screen
      .getByRole('dialog', { name: '사용자를 해제할까요?' })
      .getByRole('button', { name: '확인' })
      .click();

    await expect
      .element(screen.getByRole('combobox', { name: '사용자' }))
      .toHaveTextContent('설정하기');
  });
});
