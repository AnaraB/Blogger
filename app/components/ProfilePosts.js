import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";

function ProfilePosts() {
  // Extracting username from URL parameters
  const { username } = useParams();
  // State variables for loading status and posts
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Fetching posts data from the server
  useEffect(() => {
    //create clean up function to cancel axios request
    // const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        // Fetching posts for a specific user
        const response = await Axios.get(`/profile/${username}/posts`);
        // console.log(response.data);
        // Updating state with fetched posts data
        setPosts(response.data);
        setIsLoading(false); // Update loading status
      } catch (e) {
        console.log("There was a problem");
      }
    }
    fetchPosts();
        // call clean up function, cancel axios request if not needed any more 
    // return () => {
    //   ourRequest.cancel();
    // }
  }, []); //Dependency array to execute effect only when username changes

  // Display loading message until posts are fetched
  if (isLoading) return <LoadingIcon />;
  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const dateFormated = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return (
          //each post will have its unique url link
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={post.author.avatar} />{" "}
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small">on {dateFormated}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
