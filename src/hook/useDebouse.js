import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debounceVale, setDebounceVale] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVale(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value]);

  return debounceVale;
};
export default useDebounce;
