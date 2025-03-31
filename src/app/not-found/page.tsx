import { Seo } from '@/shared/components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-xl">Página no encontrada</p>
      </div>
    </>
  );
}