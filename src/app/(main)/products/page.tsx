import { Suspense } from 'react';
import ProductSearchPage from './Products';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductSearchPage />
    </Suspense>
  );
}
