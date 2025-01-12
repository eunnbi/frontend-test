import { css } from '@styled-system/css';

export const button = () =>
  css({
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
  });
