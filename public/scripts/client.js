/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Generates DOM structure with interpolated values from JSON/Objects.
const createTweetElement = (tweetObject) => {
  const $tweet = (`
  <article class="tweet-container">
    <header class="tweets-header">
      <div class="tweet-profile">
        <img src="${tweetObject.user.avatars}">
        <p>${tweetObject.user.name}</p>
      </div>
      <p class="tweet-handle">${tweetObject.user.handle}</p>
    </header>
    <p class="tweet-body">${tweetObject.content.text}</p>
    <footer class="tweets-footer">
      <p>${timeago.format(tweetObject.created_at)}</p>
    <div class="tweets-actions">
      <i id="report-flag" class="fa-solid fa-flag"></i>
      <i id="retweet" class="fa-solid fa-retweet"></i>
      <i id="like" class="fa-solid fa-heart"></i>
  </div>
  </footer>
</article>
`);
  return $tweet;
};
// Loops array of objects, appending each obeject leveraging (^CTE^) function above.
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#main-container').prepend(createTweetElement(tweet));
  }
  return;
};
// GetTweets asynchronously retrieve tweets within the server.
const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets",
    type: "GET"
  }).then(function(data) {
    renderTweets(data);
  });
};
// Get tweets is called to retrieve tweets and display them on the DOM before jQuery can start.
loadTweets();




$(() => {
// Listener, takes action on submit event.
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: 'POST',
      data: $('.tweet-form').serialize()
    }).then(() => {
      $('#main-container').empty();
      loadTweets();
    });
  });
});
