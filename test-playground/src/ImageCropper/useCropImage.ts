import { useRef, useState } from 'react';

import type { MouseEventHandler } from 'react';

export const useCropImage = (cropperSize: number) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const drawImageToCanvas = (
    imageElement: HTMLImageElement,
    x: number,
    y: number
  ) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const { width, height, naturalWidth, naturalHeight } = imageElement;

    ctx.drawImage(
      imageElement,
      Math.floor(x * (naturalWidth / width)),
      Math.floor(y * (naturalHeight / height)),
      cropperSize * (naturalWidth / width),
      cropperSize * (naturalHeight / height),
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsMouseDown(true);
    if (!imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - (imageRect.left + window.scrollX);
    const y = e.clientY - (imageRect.top + window.scrollY);
    setPosition({ x, y });
  };

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isMouseDown) return;
    if (!imageRef.current || !boxRef.current || !cropperRef.current) return;

    const cropperRect = cropperRef.current.getBoundingClientRect();
    const boxRect = boxRef.current.getBoundingClientRect();

    let left = e.clientX - position.x;
    left = Math.min(left, cropperRect.left + window.scrollX);
    left = Math.max(
      left,
      cropperRect.right + window.scrollX - imageRef.current.width
    );

    let top = e.clientY - position.y;
    top = Math.min(top, cropperRect.top + window.scrollY);
    top = Math.max(
      top,
      cropperRect.bottom + window.scrollY - imageRef.current.height
    );

    imageRef.current.style.left = `${left - (boxRect.left + window.scrollX)}px`;
    imageRef.current.style.top = `${top - (boxRect.top + window.scrollY)}px`;

    drawImageToCanvas(
      imageRef.current,
      cropperRect.left + window.scrollX - left,
      cropperRect.top + window.scrollY - top
    );
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseOut = () => {
    setIsMouseDown(false);
  };

  return {
    imageRef,
    cropperRef,
    canvasRef,
    boxRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseOut,
    drawImageToCanvas,
  };
};
