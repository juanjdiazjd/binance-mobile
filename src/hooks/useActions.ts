import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const useActions = actions => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );
};

export default useActions;
