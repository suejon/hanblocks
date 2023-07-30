import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, ms = 300) => {
 const [debouncedValue, setDebouncedValue] = useState(value);

 useEffect(() => {
   const handler = setTimeout(() => {
     setDebouncedValue(value);
   }, ms);

   return () => {
     clearTimeout(handler);
   };
 }, [value, ms]);

 return debouncedValue;
};