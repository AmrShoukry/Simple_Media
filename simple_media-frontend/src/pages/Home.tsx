import React from 'react';
// import { useAppSelector, useAppDispatch } from '@/app/hooks';
// import { increment } from '@/features/counterSlice';
interface Props {

}

const Home: React.FC<Props> = () => {

  // const counter = useAppSelector(state => state.counter.counter);

  // const dispatch = useAppDispatch()

  // const handleIncre =()=> {
  //   dispatch(increment(3))
  // }

  return (
    <section className='mx-4'>
      <div>
        <h2></h2>
      </div>
      {/* home
      <p>{ counter }</p>
      <button onClick={handleIncre}>click</button> */}
    </section>
  );
}

export default Home;
