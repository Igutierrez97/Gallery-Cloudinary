import { Gallery } from '@/components/gallery/Gallery';

async function getImages() {
  const data = await fetch('https://fakestoreapi.com/products');
  if (!data.ok) throw new Error('Fallo en la carga de archivos');
  return data.json();
}

export default async function Page() {
  const images = await getImages();

  return <div className='my-10 mx-3'>
   <Gallery images={images} />
  </div>;
}
