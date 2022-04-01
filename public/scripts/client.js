//This script will load any data on server startup before the post method will be ready for any submissions, it will retrieve any tweets within the server.

// Generates DOM structure with interpolated values from JSON/Objects, (runs 2nd when post is called).
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
// Loops array of objects, appending each obeject leveraging (^CTE^) function above (runs 3rd when post is called).
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#main-container').prepend(createTweetElement(tweet));
  }
  return;
};
// loadTweets asynchronously retrieve tweets within the server, will empty current posts. (runs 4th when post is called)
const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets",
    type: "GET"
  }).then(function(data) {
    $('#main-container').empty();
    renderTweets(data);
  });
};
// loadTweets is called to retrieve the tweets, will run after loadTweets above is complete on a tweet submission. (runs 5th when post is called)
loadTweets();


$(() => {
  //(runs 1st asynchronously when post is called through submit event on form using the tweet button)
// JQUERY Listener, takes action on submit event, conditionals provided to prompt error message on client side. (exceed chars limit/ empty string).
// If conditionals are false we will make a post request will made to the server and supply the data so our function above can do the structure/reading/emptying/loading)
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
