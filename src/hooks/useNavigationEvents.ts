import { useLayoutEffect, useRef } from 'react';

import useNavCurrentRouteName from './useNavCurrentRouteName';

const useNavigationEvents = (routeName, focus, blur) => {
  const isFocusedRef = useRef(false);
  const focusRef = useRef(focus);
  const blurRef = useRef(blur);
  const routeNameRef = useRef(routeName);
  const currentRouteName = useNavCurrentRouteName();

  useLayoutEffect(() => {
    focusRef.current = focus;
    blurRef.current = blur;
  }, [blur, focus]);

  useLayoutEffect(() => {
    if (currentRouteName === routeNameRef.current) {
      isFocusedRef.current = true;
      focusRef.current();
    } else if (isFocusedRef.current) {
      isFocusedRef.current = false;
      blurRef.current();
    }
  }, [currentRouteName]);
};

export default useNavigationEvents;
