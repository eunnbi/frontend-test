import { valibotResolver } from '@hookform/resolvers/valibot';
import { css, cx } from '@styled-system/css';
import { vstack } from '@styled-system/patterns';
import { type ComponentProps, forwardRef, useId } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import * as v from 'valibot';

interface MemberFormFields {
  name: string;
  email: string;
}

interface MemberCreateFormProps {
  createMember: (newMember: MemberFormFields) => Promise<void>;
}

const newMemberSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1, '이름을 입력해주세요.'),
    v.maxLength(24, '이름은 24자까지만 입력 가능합니다.')
  ),
  email: v.pipe(
    v.string(),
    v.minLength(1, '이메일을 입력해주세요.'),
    v.email('올바른 이메일 형식을 입력해주세요.')
  ),
});

export const MemberCreateForm = ({ createMember }: MemberCreateFormProps) => {
  const methods = useForm<MemberFormFields>({
    resolver: valibotResolver(newMemberSchema),
  });

  const { register, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createMember(data);
      toast.success('멤버를 추가했어요!');
    } catch {
      toast.error('멤버를 추가하지 못했어요. 다시 시도해주세요.');
    }
  });

  const id = useId();

  return (
    <FormProvider {...methods}>
      <h2
        id={id}
        className={css({
          fontSize: '2rem',
          fontWeight: 'bold',
        })}
      >
        멤버 추가
      </h2>
      <form
        onSubmit={onSubmit}
        aria-labelledby={id} // 폼에 접근 가능한 이름 붙여주기
        className={cx(
          vstack(),
          css({
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid black',
            margin: '12px',
          })
        )}
      >
        {/* label을 이용해 input에 접근 가능한 이름 붙여주기 */}
        <Label name='이름' required>
          <Input type='text' {...register('name')} />
          <ErrorMessage name='name' />
        </Label>
        <Label name='이메일' required>
          <Input type='text' {...register('email')} />
          <ErrorMessage name='email' />
        </Label>
        <Button type='submit'>추가하기</Button>
      </form>
    </FormProvider>
  );
};
interface LabelProps extends ComponentProps<'label'> {
  name: string;
  required?: boolean;
}
const Label = ({ children, name, required, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={cx(vstack({ alignItems: 'start' }), css({ width: '100%' }))}
    >
      <div>
        {name} {required && <span className={css({ color: 'red' })}>*</span>}
      </div>
      {children}
    </label>
  );
};
interface InputProps extends ComponentProps<'input'> {
  name: keyof MemberFormFields;
}
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    formState: { errors },
  } = useFormContext<MemberFormFields>();
  return (
    <input
      ref={ref}
      {...props}
      className={css({
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #d9dee2',
        padding: '16px',
        // 웹 표준 기반 스타일링 (aria 속성 활용)
        '&[aria-invalid=true]': {
          borderColor: 'red',
        },
      })}
      aria-invalid={typeof errors[props.name]?.message === 'string'}
    />
  );
});
Input.displayName = 'Input';

interface ErrorMessageProps {
  name: keyof MemberFormFields;
}
const ErrorMessage = ({ name }: ErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext<MemberFormFields>();

  const errorMessage = errors[name]?.message;

  if (typeof errorMessage !== 'string') return <p />;

  return (
    /* ARIA 표준 활용 (role과 accessible name을 이용해 테스트) */
    <p role='alert' aria-label={errorMessage} className={css({ color: 'red' })}>
      {errorMessage}
    </p>
  );
};

interface ButtonProps extends ComponentProps<'button'> {}
const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={css({
        background: '#4f89fb',
        color: 'white',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        padding: '14px 16px',
        fontSize: '17px',
        fontWeight: 600,
        transitionProperty: 'background, color',
        transitionDuration: '.125s',
        transitionTimingFunction: 'ease-in-out',
        _hover: {
          background: '#1863f6',
        },
      })}
    >
      {children}
    </button>
  );
};
