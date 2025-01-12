import { css } from '@styled-system/css';

export const dialog = () =>
  css({
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 12px 40px -4px rgba(25,30,40,.16)',
    position: 'fixed',
    inset: '0.75rem',
    zIndex: 50,
    margin: 'auto',
    display: 'flex',
    height: 'fit-content',
    maxHeight: 'calc(100dvh - 2 * 0.75rem)',
    flexDirection: 'column',
    gap: '1rem',
    overflow: 'auto',
    backgroundColor: 'white',
    padding: '1rem',
    color: 'black',
    maxWidth: '420px',
  });
