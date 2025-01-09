import './reset.css';

import { Dialog, Flex } from '@radix-ui/themes';

import { ImageCropper } from './ImageCropper/ImageCropper';
import { useRef, useState } from 'react';

export default function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState('');

  const save = () => {
    if (!ref.current) return;
    const dataURL = ref.current.toDataURL('image/png', 1);
    setUrl(dataURL);
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Content>
        <Dialog.Title mb={'4'}>Change Logo Image</Dialog.Title>
        <Flex style={{ height: 512 }} mb={'2'}>
          <ImageCropper
            ref={ref}
            src={'https://picsum.photos/200/400'}
            alt={'test'}
            cropperSize={300}
          />
        </Flex>
        <button onClick={save}>Show Result</button>
        {url && <img src={url} />}
      </Dialog.Content>
    </Dialog.Root>
  );
}
