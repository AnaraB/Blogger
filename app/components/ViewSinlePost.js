import React, { useEffect, useState } from "react";
import Page from "./Page";
import { useParams, Link } from "react-router-dom";
import  Axios from "axios";

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();


   // Fetching post data from the server
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`);
        console.log(response.data);
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
        console.log(e);
      }
    }
    fetchPost();
  }, []);

  if(isLoading) 
   return(
    <Page title="...">
      <div>Loading...</div>
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
        {/* <p>
          We arrived at Cierva Cove at 7 am and I had my typical hot chocolate
          up in the Dome Observation Lounge on Deck 7. The weather did not look
          particularly appealing, though it was calm, so the kayakers were able
          to go out. For me, I decided to skip the day's zodiac excursion. It
          was nice. I took a long hot shower, read my book, and just enjoyed
          some me time. L went and said it was actually pretty good, though it
          did start to snow. They saw more swimming penguins and humpback
          whales, but they may have even seen a blue whale! It was not a
          humpback and was huge, so that was exciting. He also showed me a video
          he took of two penguins walking along a mini iceberg.... and one fell
          off! So cute! It took us three hours to travel to our next
          destination, Palaver Point, where we were supposed to have an
          afternoon land excursion. However, the weather did not cooperate and
          the excursion was cancelled. So, not much to talk about this day;
          instead, I'll go over a little of life on board the World Voyager.
        </p> */}
      </div>
    </Page>
  );
}

export default ViewSinglePost;
