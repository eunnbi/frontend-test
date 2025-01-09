import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { ImageCropper } from './ImageCropper';

const getMockImageSrc = (width: number, height: number) => {
  return `https://picsum.photos/${width}/${height}`;
};

const mockAlt = 'test';

describe('When "ImageCropper" is rendered', () => {
  it('With "src" prop, it should render the img element with the "src" attribute.', async () => {
    const src = getMockImageSrc(200, 300);
    render(<ImageCropper src={src} alt={mockAlt} />);

    await expect
      .element(screen.getByAltText(mockAlt))
      .toHaveAttribute('src', src);
  });

  it('With "alt" prop, it should render the img element with the "alt" attribute.', async () => {
    render(<ImageCropper src={getMockImageSrc(200, 300)} alt={mockAlt} />);

    await expect
      .element(screen.getByAltText(mockAlt))
      .toHaveAttribute('alt', mockAlt);
  });

  it('After the image load, the aspect ratio of img element should be the same with the original aspect ratio.', async () => {
    const width = 300;
    const height = 500;

    render(
      <ImageCropper
        src={getMockImageSrc(width, height)}
        alt={mockAlt}
        cropperSize={120}
      />
    );

    const element = screen.getByAltText(mockAlt);
    element.setAttribute('width', width.toString());
    element.setAttribute('height', height.toString());

    fireEvent.load(element);

    const aspectRatio =
      Number(element.getAttribute('width')) /
      Number(element.getAttribute('height'));

    expect(aspectRatio).toBe(width / height);
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
});
