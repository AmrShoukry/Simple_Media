import React, { useState } from 'react';
import Avatar from '@/components/ui/avatar/Avatar';
import { useAppSelector } from '@/app/hooks';
import Post from '@/features/posts/Post';
// import { increment } from '@/features/counterSlice';
interface Props {

}

const Home: React.FC<Props> = () => {

  const [postText, setPostText] = useState('')
  
  const posts = useAppSelector(state => state.posts.posts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  };

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    console.log(postText)
    setPostText('')
  }


  return (
    <section className='mx-4 w-full'>
      <div className='w-500 py-7 border bg-white border-solid border-grey5 rounded-md px-6'>
        <div className='w-full flex items-center gap-x-5'>
          <Avatar firstname='Amr' lastname='Shoukry' variant='pry' />
          <h2 className='text-gray-400 text-2xl'>
            Share what's on your mind, {'Amr'}...
          </h2>
        </div>
      </div>

      <div className=''>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" value={postText} onChange={handleChange} />
          </div>
          <button>submit</button>
        </form>

        <ul className='my-5 '>
          {
            posts.map(post => (
             <Post key={post.id} post={post.body} />
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default Home;
