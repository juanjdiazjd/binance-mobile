
export type actionType<T = {}> = {
    type: string;
    error?: boolean;
    payload?: T;
  };

  
export const createAction = ({ type, error, payload }: actionType<any>) => {
    return {
      type,
      error,
      payload
    };
  };
  