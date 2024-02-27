import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { MdClose } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import Avatar from '../avatar/Avatar';
import { useAppDispatch } from '@/app/hooks';
import { postAsync } from '@/features/posts/postSlice';
import './modal.scss'

interface Props {
  firstname: string;
  lastname: string;
  username: string;
  closeModal: ()=> void;
}

const Modal: React.FC<Props> = (props) => {

  const { firstname, lastname, username, closeModal } = props;

  const [content, setContent] = useState('')

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    // dispatch(createPost(postText))
    const newPost = {
      id: nanoid(6),
      content
    }
    dispatch(postAsync(newPost))
    // console.log(newPost) 
    setContent('')
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
            <Avatar 
              firstname={firstname} 
              lastname={lastname}
              variant='pry' 
            />
            <p className='capitalize text-2xl'>{username}</p>
          </div>

          <form onSubmit={handleSubmit} className=''>
            <div className='modal_input pl-8 pr-7'>
              <textarea 
                value={content} 
                name='post'
                id='post'
                placeholder={`Share what's on your mind ${'Amr'}...`}
                onChange={handleChange} 
              />
            </div>
            <span className='flex justify-end pr-5 -mt-5'>
              <GoPencil  />
            </span>
            <div 
              className="modal_footer items-center bottom-0 flex justify-end absolute left-0 py-4 px-5">
              <button 
                disabled={!content.trim()} 
                className={
                `bg-pry text-grey4 py-2 px-7 rounded-lg ${!content.trim() && 'bg-gray-400'}`
              }>
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
