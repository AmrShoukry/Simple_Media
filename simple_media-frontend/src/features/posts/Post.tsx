import React from 'react';
import Avatar from '@/components/ui/avatar/Avatar';
import { BsHandThumbsUp } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  post: string;
  handleDeletePost: (id: string)=> void;
  idx: string;
}

const Post: React.FC<Props> = (props) => {

  const { post, handleDeletePost, idx} = props;

  return (
    <>
      <li className='w-500 py-4 border bg-white border-solid border-grey5 rounded-md px-6 my-6 font-normal text-gray-500'>
        <div className='flex gap-x-2 items-center'>
          <Avatar firstname='Sam' lastname='dami' variant='pry' />
          <span className='capitalize'>@{'Frexz'}</span>
        </div>
        <span className='py-3 pl-12 pr-4 block'>{post}</span>
        
        <div className='flex py-1 items-center mx-3 justify-between'>
          <div className='flex gap-x-9'>
            <span className='flex gap-x-2 items-center'>
              <BsHandThumbsUp  /> {'0'}
            </span>
            <span className='flex gap-x-2 items-center'>
              <FaRegCommentAlt  /> {'3'}
            </span>
          </div>
          <button onClick={() => handleDeletePost(idx)}>
            <AiOutlineDelete  />
          </button>
        </div>
      </li>
    </>
  );
}

export default Post;
