import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import Post from "@/features/posts/Post";
import { getAllPosts } from "@/features/posts/postSlice";
import Header from "@/components/heading/Header";
import { getUserAsync } from "@/features/auth/authSlice";
import Modal from "@/components/ui/modal/Modal";
import { deletePost } from "@/features/posts/postService";

interface Props {}

const Home: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState(false);

  const posts = useAppSelector((state) => state.posts);

  const users = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    // dispatch(toggleModal())
    setShowModal((prev) => !prev);
  };

  const handleDeletePost = (id) => {
    console.log(`id = ${id}`);
    deletePost(id);
  };

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // const { data } = posts.posts

  console.log(posts.posts);

  if (!posts?.posts?.data) {
    return <div>loading</div>;
  }

  return (
    <div>
      <section className="mx-4 w-full">
        {users.isSuccess && (
          <Header
            openModal={handleOpenModal}
            firstname={users.user?.data.firstName as string}
            lastname={users.user?.data.lastName as string}
            username={users.user?.data.username as string}
          />
        )}
        <div className="mt-14">
          <ul className="my-5 ">
            {users?.isSuccess &&
              posts.posts["data"].map((post) => (
                <Post
                  key={post?.id}
                  post={post?.content}
                  postObj={post}
                  handleDeletePost={() => handleDeletePost(post?._id)}
                  idx={post.id}
                  firstname={users.user?.data.firstName as string}
                  lastname={users?.user?.data?.lastName as string}
                  username={users?.user?.data?.username as string}
                />
              ))}
          </ul>
        </div>
      </section>
      {showModal && (
        <Modal
          firstname={users?.user?.data?.firstName as string}
          lastname={users?.user?.data?.lastName as string}
          username={users?.user?.data?.username as string}
          closeModal={handleOpenModal}
        />
      )}
    </div>
  );
};

export default Home;
