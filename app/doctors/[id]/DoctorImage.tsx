'use client';

import Image from 'next/image';
import { useState } from 'react';

interface DoctorImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className: string;
}

export default function DoctorImage({ src, alt, fallbackSrc, className }: DoctorImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={96}
      height={96}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}