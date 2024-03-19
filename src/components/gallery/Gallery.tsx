'use client';

import {LazyLoadImage} from 'react-lazy-load-image-component'
export const Gallery = ({ images }: { images: any[] }) => {
  
    return (
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 '>
  {images.map((image: any) => (
    <div key={image.id} className='w-[150px] h-[150px] '>
      <LazyLoadImage  src={image.image} placeholderSrc='/placeholder.jpg'  height={160} width={160} className=' max-w-full max-h-full'  />
    </div>
  ))}
</div>
    );
  };
