import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type SafeImageProps = Omit<ImageProps, 'onError' | 'alt'> & {
  alt: string
  fallbackSrc?: string
}

export function SafeImage({ alt, fallbackSrc = '/images/placeholder.jpg', ...props }: SafeImageProps) {
  const [error, setError] = useState(false)

  return (
    <Image
      {...props}
      alt={alt}
      src={error ? fallbackSrc : props.src}
      onError={() => setError(true)}
    />
  )
}