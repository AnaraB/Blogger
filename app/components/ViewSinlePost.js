import React, { useEffect } from "react";
import Page from "./Page";

function ViewSinglePost() {
  return (
    <Page title="Fake Hardcoded title">
      <div className="d-flex justify-content-between">
        <h2>The World Voyager</h2>
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
        <a href="#">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />
        </a>
        Posted by <a href="#">brad</a> on 2/10/2020
      </p>

      <div className="body-content">
        <p>
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
        </p>
      </div>
    </Page>
  );
}

export default ViewSinglePost;
