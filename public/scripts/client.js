/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Generates DOM structure with interpolated values from JSON/Objects.
const createTweetElement = (tweetObject) => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const safeHTML = `<p class="tweet-body" >${escape(tweetObject.content.text)}</p>`;
  const $tweet = (`
  <article class="tweet-container">
    <header class="tweets-header">
      <div class="tweet-profile">
        <img src="${tweetObject.user.avatars}">
        <p>${tweetObject.user.name}</p>
      </div>
      <p class="tweet-handle">${tweetObject.user.handle}</p>
    </header>
      ${safeHTML}
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
    $('#main-container').empty();
    renderTweets(data);
  });
};
// Get tweets is called to retrieve tweets and display them on the DOM before jQuery can start.
loadTweets();




$(() => {
// Listener, takes action on submit event.
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const $tweetText =  $('#tweet-text').val();
    if ($tweetText === "") {
      console.log('inside',$tweetText);
      $(".error-message").text("Failed to Post - Tweet field must not be empty #EMPTYTWEET.");
      $(".error-message").slideDown();
      return;
    }
    if ($tweetText.length > 140) {
      $(".error-message").text("Failed to Post - Tweet field has too many characters #WOAH.");
      $(".error-message").slideDown();
      return;
    }
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: 'POST',
      data: $('.tweet-form').serialize()
    }).then(() => {
      $(".error-message").slideUp();
      loadTweets();
      $('form').trigger('reset');
    });
  });
});
