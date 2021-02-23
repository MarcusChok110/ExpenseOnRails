import { useState } from 'react';

const useLoading = (action: (...args: any[]) => Promise<any>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const doAction = (...args: any[]) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };

  return [loading, doAction] as [boolean, (...args: any[]) => Promise<any>];
};

export default useLoading;
