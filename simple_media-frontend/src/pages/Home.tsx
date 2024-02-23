import React from 'react';
import { GoPencil } from "react-icons/go";
import Avatar from '@/components/ui/avatar/Avatar';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import Post from '@/features/posts/Post';
import { toggleModal, deletePost } from '@/features/posts/postSlice';




interface Props {

}

const Home: React.FC<Props> = () => {
  
  const posts = useAppSelector(state => state.posts.posts);

  const dispatch = useAppDispatch()

  const handleOpenModal =()=> {
    dispatch(toggleModal())
  }

  const handleDeletePost =(id: string)=> {
    dispatch(deletePost(id))
    console.log(id)
  }
  
  return (
    <section className='mx-4 w-full'>
      <div onClick={handleOpenModal} className='w-500 py-7 cursor-pointer border bg-white border-solid border-grey5 rounded-md relative px-6'>
        <div className='w-full flex items-center gap-x-5'>
          <Avatar firstname='Amr' lastname='Shoukry' variant='pry' />
          <h2 className='text-gray-400 text-2xl'>
            Share what's on your mind, {'Amr'}...
          </h2>
        </div>
        <span className='absolute right-6 top-11'>
          <GoPencil  />
        </span>
      </div>

      <div className='mt-14'>
        <ul className='my-5 '>
          {
            posts.map(post => (
             <Post 
              key={post.id} 
              post={post.body} 
              handleDeletePost={handleDeletePost}
              idx={post.id}
            />
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default Home;
