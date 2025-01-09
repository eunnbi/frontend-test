import { forwardRef, useEffect, useRef } from 'react';

import styles from './ImageCropper.module.css';
import { useCropImage } from './useCropImage.ts';

import type { ForwardedRef, MutableRefObject } from 'react';

const DEFAULT_SIZE = 512;

export interface ImageCropperProps {
  cropperSize?: number;
  resultSize?: number;
  src: string;
  alt: string;
}

export const ImageCropper = forwardRef<HTMLCanvasElement, ImageCropperProps>(
  (
    { cropperSize = DEFAULT_SIZE, resultSize = DEFAULT_SIZE, src, alt },
    forwardedRef
  ) => {
    const {
      imageRef,
      cropperRef,
      canvasRef,
      boxRef,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      drawImageToCanvas,
    } = useCropImage(cropperSize);

    const isLoading = useRef(true);

    const resizeImage = (imageElement: HTMLImageElement) => {
      const aspect = imageElement.width / imageElement.height;
      const width = aspect > 1 ? cropperSize * aspect : cropperSize;
      const height = aspect > 1 ? cropperSize : cropperSize / aspect;
      imageElement.style.display = 'block';
      imageElement.width = width;
      imageElement.height = height;
    };

    useEffect(() => {
      if (isLoading.current) return;
      if (!imageRef.current) return;
      if (!cropperRef.current) return;

      const cropperRect = cropperRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      drawImageToCanvas(
        imageRef.current,
        cropperRect.left - imageRect.left,
        cropperRect.top - imageRect.top
      );
    }, [resultSize]);

    return (
      <div
        role='presentation'
        ref={boxRef}
        className={styles.box}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          ref={imageRef}
          crossOrigin='anonymous'
          onLoad={(e) => {
            isLoading.current = true;
            resizeImage(e.currentTarget);
            drawImageToCanvas(
              e.currentTarget,
              (e.currentTarget.width - cropperSize) / 2,
              (e.currentTarget.height - cropperSize) / 2
            );
            e.currentTarget.style.removeProperty('left');
            e.currentTarget.style.removeProperty('top');
            isLoading.current = false;
          }}
        />
        <canvas
          className={styles.canvas}
          width={resultSize}
          height={resultSize}
          ref={mergeRefs([canvasRef, forwardedRef])}
        />
        <div
          ref={cropperRef}
          className={styles.cropper}
          style={{
            width: cropperSize,
            height: cropperSize,
          }}
        />
      </div>
    );
  }
);

ImageCropper.displayName = 'ImageCropper';

const mergeRefs = <T extends Element>(
  refs: (MutableRefObject<T | null> | ForwardedRef<T>)[]
) => {
  return (elem: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(elem);
      } else if (ref) {
        ref.current = elem;
      }
    });
  };
};
