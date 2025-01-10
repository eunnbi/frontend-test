import { css, cx } from '@styled-system/css';
import { forwardRef, useEffect, useRef } from 'react';

import { useCropImage } from './useCropImage';

import type { ForwardedRef, RefObject } from 'react';

const DEFAULT_SIZE = 512;

export interface ImageCropperProps {
  cropperSize?: number;
  resultSize?: number;
  src: string;
  alt: string;
  className?: string;
}

export const ImageCropper = forwardRef<HTMLCanvasElement, ImageCropperProps>(
  (
    {
      cropperSize = DEFAULT_SIZE,
      resultSize = DEFAULT_SIZE,
      src,
      alt,
      className,
    },
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
        className={cx(
          css({
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            cursor: 'move',
            overflow: 'clip',
          }),
          className
        )}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={css({
            display: 'none',
            position: 'absolute',
            maxWidth: 'initial',
            cursor: 'move',
          })}
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
          className={css({
            display: 'none',
            position: 'absolute',
            top: '50%',
            height: '50%',
            transform: 'translate(-50%, -50%)',
          })}
          width={resultSize}
          height={resultSize}
          ref={mergeRefs([canvasRef, forwardedRef])}
        />
        <div
          ref={cropperRef}
          className={css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius: '40px',
            outline: '1px solid rgba(255, 255, 255, 0.5)',
            background: 'transparent',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            overflow: 'clip',
            cursor: 'move',
          })}
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
  refs: (RefObject<T | null> | ForwardedRef<T>)[]
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
