// import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

// type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

// const useInput = <T>(initialData: T): ReturnTypes<T> => {
//   const [value, setValue] = useState(initialData);
//   const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setValue((e.target.value as unknown) as T);
//   }, []);
//   return [value, handler, setValue];
// };

// export default useInput;

import { Dispatch, SetStateAction, useCallback, useState} from "react"

//매개변수는 타입을 꼭 붙여줘야한다. 
//리턴 등은 타입을 타입스크립트가 추론해 주어서 명시하지 않아도 되지만
//매개변수는 타입을 명시해줘야함
//어떤 타입이 들어올지 모를땐 any
// : 이후에는 리턴 타입을 설정해준다. 
// Dispatch 와 SetStateAction은 React가 제공하는 타입이다.


//리턴타입을 변수로 설정 할 수 있다.
//리턴 타입에 any를 안 넣을 려면 any 대신 ChangeEvent<HTMLInputElement>
//e.target.value 대신 e.target.value as unkown as T를 넣으면 해결 된다.
type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>]

const useInput = <T = any> (initialData: T) : ReturnTypes<T> => {
  console.log(initialData);
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, [])
  return [ value, handler, setValue];
} 

export default useInput;