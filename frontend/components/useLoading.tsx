import { useState } from 'react';

/**
 * Custom hook to wrap an async function and return a loading status
 * @param action async function to be dispatched
 */
const useLoading = (action: (...args: any[]) => Promise<any>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const doAction = (...args: any[]) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };

  return [loading, doAction] as [boolean, (...args: any[]) => Promise<any>];
};

export default useLoading;
