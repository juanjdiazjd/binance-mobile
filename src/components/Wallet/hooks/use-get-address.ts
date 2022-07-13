import {useCallback, useState} from 'react';

export const useGetAddress = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [address, setAddress] = useState<string>('');

  useCallback(() => {
    setAddress(address);
  }, [address]);

  return [address, setAddress];
};
