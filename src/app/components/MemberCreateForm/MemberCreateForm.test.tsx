import { describe, expect, it } from 'vitest';

import { renderWithContext } from '@/test/renderWithContext';

import { MemberCreateForm } from './MemberCreateForm';

describe('MemberCreateForm test', () => {
  it('올바른 정보를 입력하면 멤버를 추가할 수 있다', async () => {
    let submitted: null | { name: string; email: string } = null;

    const screen = renderWithContext(
      <MemberCreateForm
        createMember={async (newMember) => {
          submitted = newMember;
        }}
      />
    );

    const form = screen.getByRole('form', { name: '멤버 추가' });

    await form.getByRole('textbox', { name: '이름' }).fill('강은비');
    await form
      .getByRole('textbox', { name: '이메일' })
      .fill('jenabill@naver.com');

    await form.getByRole('button', { name: '추가하기' }).click();

    await expect.element(screen.getByText('멤버를 추가했어요!')).toBeVisible();

    expect(submitted).toEqual({
      name: '강은비',
      email: 'jenabill@naver.com',
    });
  });

  it('이름이나 이메일을 입력하지 않으면 에러 메시지를 보여준다', async () => {
    let submitted: null | { name: string; email: string } = null;

    const screen = renderWithContext(
      <MemberCreateForm
        createMember={async (newMember) => {
          submitted = newMember;
        }}
      />
    );

    await screen.getByRole('button', { name: '추가하기' }).click();

    await expect
      .element(screen.getByRole('alert', { name: '이름을 입력해주세요.' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('alert', { name: '이메일을 입력해주세요.' }))
      .toBeVisible();

    expect(submitted).toBeNull();
  });

  it('이름이 25자 이상이면 에러 메시지를 보여준다', async () => {
    let submitted: null | { name: string; email: string } = null;

    const screen = renderWithContext(
      <MemberCreateForm
        createMember={async (newMember) => {
          submitted = newMember;
        }}
      />
    );

    const form = screen.getByRole('form', { name: '멤버 추가' });
    await form
      .getByRole('textbox', { name: '이름' })
      .fill('강은비강은비강은비강은비강은비강은비강은비강은비강은비');
    await form.getByRole('button', { name: '추가하기' }).click();

    await expect
      .element(
        screen.getByRole('alert', {
          name: '이름은 24자까지만 입력 가능합니다.',
        })
      )
      .toBeVisible();
    await expect
      .element(screen.getByRole('alert', { name: '이메일을 입력해주세요.' }))
      .toBeVisible();

    expect(submitted).toBeNull();
  });

  it('이메일 형식이 올바르지 않으면 에러 메시지를 보여준다', async () => {
    let submitted: null | { name: string; email: string } = null;

    const screen = renderWithContext(
      <MemberCreateForm
        createMember={async (newMember) => {
          submitted = newMember;
        }}
      />
    );

    const form = screen.getByRole('form', { name: '멤버 추가' });
    await form.getByRole('textbox', { name: '이름' }).fill('강은비');
    await form.getByRole('textbox', { name: '이메일' }).fill('jenabill');
    await form.getByRole('button', { name: '추가하기' }).click();

    await expect
      .element(
        screen.getByRole('alert', {
          name: '올바른 이메일 형식을 입력해주세요.',
        })
      )
      .toBeVisible();

    expect(submitted).toBeNull();
  });

  it('올바른 정보를 입력하고 폼 제출 시 에러가 발생하면 에러 토스트 메시지를 띄운다', async () => {
    let submitted: null | { name: string; email: string } = null;

    const screen = renderWithContext(
      <MemberCreateForm
        createMember={async (newMember) => {
          submitted = newMember;
          throw new Error('에러 발생!');
        }}
      />
    );

    const form = screen.getByRole('form', { name: '멤버 추가' });
    await form.getByRole('textbox', { name: '이름' }).fill('강은비');
    await form
      .getByRole('textbox', { name: '이메일' })
      .fill('jenabill@naver.com');
    await form.getByRole('button', { name: '추가하기' }).click();

    await expect
      .element(screen.getByText('멤버를 추가하지 못했어요. 다시 시도해주세요.'))
      .toBeVisible();

    expect(submitted).toEqual({
      name: '강은비',
      email: 'jenabill@naver.com',
    });
  });
});
