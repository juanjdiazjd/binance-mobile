import useEffectOnce from './useEffectOnce';

const useLifecycles = (mount, unmount) => {
  useEffectOnce(() => {
    mount();

    return unmount;
  });
};

export default useLifecycles;
