import React from 'react';

interface Props {
  post: string;
}

const Post: React.FC<Props> = (props) => {

  const { post } = props;

  return (
    <>
      <li className='w-500 py-7 border bg-white border-solid border-grey5 rounded-md px-6 my-3 font-normal text-gray-500'>
        {post}
      </li>
    </>
  );
}

export default Post;
