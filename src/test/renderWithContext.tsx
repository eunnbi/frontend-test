import { Toaster } from 'sonner';
import { render } from 'vitest-browser-react';

import type { ReactNode } from 'react';

export function renderWithContext(element: ReactNode) {
  return render(
    <>
      {element}
      <Toaster />
    </>
  );
}
