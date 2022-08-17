import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

export type FeeContextType = {
  calculatedFee: number;
  saveFee: (fee: number) => void;
};

const DEFAULT_VALUE = 0;

export const FeeContext = React.createContext<FeeContextType | null>(null);

export const FeeProvider = ({children}: Props) => {
  const [calculatedFee, setCalculatedFee] =
    React.useState<number>(DEFAULT_VALUE);

  const saveFee = (fee: number) => {
    setCalculatedFee(calculatedFee + fee);
  };

  return (
    <FeeContext.Provider
      value={{
        calculatedFee,
        saveFee,
      }}>
      {children}
    </FeeContext.Provider>
  );
};
