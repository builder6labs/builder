import { useEffect, useState } from 'react';
import { Builder } from '@builder6/sdk';

export function useIsPreviewing() {
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    if (Builder.isEditing || Builder.isPreviewing) {
      setIsPreviewing(true);
    }
  }, []);

  return isPreviewing;
}
