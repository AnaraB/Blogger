import React, { useEffect, useState } from "react";
import Page from "./Page";
import { useParams, Link } from "react-router-dom";
import  Axios from "axios";
import LoadingIcon from "./LoadingIcon";

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();


   // Fetching post data from the server
  useEffect(() => {
    //create clean up function to cancel axios request
   const ourRequest = Axios.CancelToken.source()

    async function fetchPost() {

      try {
        const response = await Axios.get(`/post/${id}`, {cancelToken: ourRequest.token});
        console.log(response.data);
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
        console.log(e);
      }
    }
    fetchPost()
    // call clean up function, cancel axios request if not needed any more 
    return () => {
      ourRequest.cancel()

    }
  }, []);

  if(isLoading) 
   return(
    <Page title="...">
     <LoadingIcon />
    </Page>
  )


  const date = new Date(post.createdDate)
  const dateFormated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img
            className="avatar-tiny"
            src={post.author.avatar}
          />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on 2/10/2020
      </p>

      <div className="body-content">
        {post.body}
      </div>
    </Page>
  );
}

export default ViewSinglePost;
