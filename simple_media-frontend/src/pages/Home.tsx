import React from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { increment } from '@/features/counterSlice';
interface Props {

}

const Home: React.FC<Props> = () => {

  const counter = useAppSelector(state => state.counter.counter);

  const dispatch = useAppDispatch()

  const handleIncre =()=> {
    dispatch(increment(3))
  }

  return (
    <div>
      home
      <p>{ counter }</p>
      <button onClick={handleIncre}>click</button>
    </div>
  );
}

export default Home;
