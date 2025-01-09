import type { Meta, StoryObj } from '@storybook/react';

import { ImageCropper, type ImageCropperProps } from './ImageCropper';
import { useRef, useState } from 'react';

const meta = {
  title: 'ImageCropper',
  component: ImageCropper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageCropper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PortraitImage: Story = {
  args: {
    src: 'https://picsum.photos/200/400',
    alt: 'random image',
    cropperSize: 300,
    resultSize: 300,
  },
  render: (props) => <ImageCropperWrapper {...props} />,
};

export const LandscapeImage: Story = {
  args: {
    src: 'https://picsum.photos/400/200',
    alt: 'random image',
    cropperSize: 300,
    resultSize: 300,
  },
  render: (props) => <ImageCropperWrapper {...props} />,
};

const ImageCropperWrapper = (props: ImageCropperProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState('');

  const save = () => {
    if (!ref.current) return;
    const dataURL = ref.current.toDataURL('image/png', 1);
    setUrl(dataURL);
  };

  return (
    <>
      <div style={{ height: 512 }}>
        <ImageCropper ref={ref} {...props} />
      </div>
      <button onClick={save}>Show Result</button>
      {url && <img src={url} />}
    </>
  );
};
