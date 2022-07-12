import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const getCurrentRouteName = () => {
  const route = useRoute();

  return route.name;
};

const useNavCurrentRouteName = () => {
  const [currentRouteName, setCurrentRouteName] = useState(
    getCurrentRouteName()
  );

  useEffect(() => {
    const nextRouteName = getCurrentRouteName();

    if (nextRouteName !== currentRouteName) {
      setCurrentRouteName(nextRouteName);
    }
  }, [currentRouteName]);

  return currentRouteName;
};

export default useNavCurrentRouteName;
