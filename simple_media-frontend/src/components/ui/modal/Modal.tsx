import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import Avatar from '../avatar/Avatar';
import { useAppDispatch } from '@/app/hooks';
import { createPost, toggleModal } from '@/features/posts/postSlice';
import './modal.scss'

interface Props {

}

const Modal: React.FC<Props> = () => {

  const [postText, setPostText] = useState('')

  const dispatch = useAppDispatch()

  const closeModal =()=> {
    dispatch(toggleModal())
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    dispatch(createPost(postText))
    console.log(postText)
    setPostText('')
    closeModal()
  }

  return (
    <div className='modal backdrop-blur-sm'>
      <div className='modal_body bg-white relative'>

        <div className='modal_header px-5 py-4'>
          <h3 className='text-xl'>Create a post</h3>
        </div>

        <section className=''>
          <div className='flex gap-x-3 items-center p-5'>
            <Avatar firstname='Amr' lastname='Shoukry' variant='pry' />
            <p className='capitalize text-2xl'>{'Amr'}</p>
          </div>

          <form onSubmit={handleSubmit} className=''>
            <div className='modal_input px-5'>
              <textarea 
                value={postText} 
                name='post'
                id='post'
                placeholder={`Share what's on your mind ${'Amr'}...`}
                onChange={handleChange} 
              />
            </div>
            <div 
              className="modal_footer items-center bottom-0 flex justify-end absolute left-0 py-4 px-5">
              <button className='bg-pry text-grey4 py-2 px-7 rounded-lg'>
                Post
              </button>
            </div>

          </form>
          <button onClick={closeModal} className='absolute top-4 right-5 text-2xl'>
            <MdClose  />
          </button>
        </section>

        {/* <div className="modal_footer bottom-16 absolute">
          <div></div>
        </div> */}

      </div>
    </div>
  );
}

export default Modal;
