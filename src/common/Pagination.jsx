import React, { useEffect, useState } from "react";
import { useCreatePostsMutation, useListPostsQuery } from "../api/userapi/postDataApi";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
 

  const { data: posts, isLoading, isFetching,refetch } = useListPostsQuery(currentPage);
  const [createPosts] = useCreatePostsMutation()

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isFetching && !isLoading) {
    return <div>Fetching</div>;
  }

  if (!posts) {
    return <div>No posts :</div>;
  }
  function handleCreatePost(){
    createPosts({
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      setCurrentPage(1)
  }

  return (
    <div>
      {posts.map(({ id, title, status }) => (
        <div key={id}>
          {title} - {status}
        </div>
      ))}
      <button
        className="me-10"
        onClick={() => setCurrentPage(currentPage - 1)}
        isLoading={isFetching}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        isLoading={isFetching}
      >
        Next
      </button>
      <button className="ms-5"
        onClick={() => refetch()}
      >
        Refetch
      </button>

      <button className="ms-5"
        onClick={() => handleCreatePost()}
      >
        ADD
      </button>
    </div>
  );
};

export default Pagination;
