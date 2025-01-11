import { css } from '@styled-system/css';
import { render, screen } from '@testing-library/react';
import { page } from '@vitest/browser/context';
import { createRef } from 'react';
import { beforeAll, describe, expect, it } from 'vitest';

import { ImageCropper } from './ImageCropper';

const getMockImageSrc = (width: number, height: number) => {
  return `https://picsum.photos/${width}/${height}`;
};

const mockAlt = 'test';

beforeAll(() => {
  page.viewport(828, 896);
});

describe('When "ImageCropper" is rendered', () => {
  it('With "src" prop, it should render the img element with the "src" attribute.', async () => {
    const src = getMockImageSrc(200, 300);
    render(
      <ImageCropper
        src={src}
        alt={mockAlt}
        styles={css.raw({ height: '100vw' })}
      />
    );

    await expect
      .element(screen.getByAltText(mockAlt))
      .toHaveAttribute('src', src);
  });

  it('With "alt" prop, it should render the img element with the "alt" attribute.', async () => {
    render(
      <ImageCropper
        src={getMockImageSrc(200, 300)}
        alt={mockAlt}
        styles={css.raw({ height: '100vw' })}
      />
    );

    await expect
      .element(screen.getByAltText(mockAlt))
      .toHaveAttribute('alt', mockAlt);
  });

  it('With portrait image, the width of img element should be same with the cropper size while keeping the aspect ratio.', async () => {
    const width = 300;
    const height = 500;
    const cropperSize = 120;

    render(
      <ImageCropper
        src={getMockImageSrc(width, height)}
        alt={mockAlt}
        cropperSize={cropperSize}
        styles={css.raw({ height: '100vw' })}
      />
    );

    await expect
      .poll(() => screen.getByAltText(mockAlt), { timeout: 3000 })
      .toHaveAttribute('width', `${cropperSize}`);

    await expect
      .poll(() => screen.getByAltText(mockAlt), { timeout: 3000 })
      .toHaveAttribute('height', `${cropperSize / (width / height)}`);
  });

  it('With landscape image, the height of img element should be same with the cropper size while keeping the aspect ratio.', async () => {
    const width = 500;
    const height = 300;
    const cropperSize = 120;

    render(
      <ImageCropper
        src={getMockImageSrc(width, height)}
        alt={mockAlt}
        cropperSize={cropperSize}
        styles={css.raw({ height: '100vw' })}
      />
    );

    await expect
      .poll(() => screen.getByAltText(mockAlt), { timeout: 3000 })
      .toHaveAttribute('width', `${cropperSize * (width / height)}`);

    await expect
      .poll(() => screen.getByAltText(mockAlt), { timeout: 3000 })
      .toHaveAttribute('height', `${cropperSize}`);
  });

  it('With the "resultSize" prop, it should render the canvas element with "resultSize" width.', () => {
    const resultSize = 100;

    render(
      <ImageCropper
        src={getMockImageSrc(300, 500)}
        alt={mockAlt}
        resultSize={resultSize}
      />
    );

    const element = screen.getByRole('presentation').querySelector('canvas');

    expect(element).toHaveAttribute('width', `${resultSize}`);
  });

  it('With the "resultSize" prop, it should render the canvas element with "resultSize" height.', () => {
    const resultSize = 100;

    render(
      <ImageCropper
        src={getMockImageSrc(300, 500)}
        alt={mockAlt}
        resultSize={resultSize}
      />
    );

    const element = screen.getByRole('presentation').querySelector('canvas');

    expect(element).toHaveAttribute('height', `${resultSize}`);
  });

  it('With the forwarded ref, the ref should be defined.', () => {
    const ref = createRef<HTMLCanvasElement>();

    render(
      <ImageCropper
        ref={ref}
        src={getMockImageSrc(300, 500)}
        alt={mockAlt}
        resultSize={100}
      />
    );

    expect(ref.current).toBeDefined();
  });

  // TODO: add interaction test
});
