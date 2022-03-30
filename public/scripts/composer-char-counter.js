$(document).ready(() =>{
  // grab the input
  const $tweetText =  $('#tweet-text');
  // grab the counter
  const $counter = $('#counter');
  // listen for the input event.
  $tweetText.on("input", function() {
    $counter.val(140 - $tweetText.val().length);
    if ($counter.val() < 0) {
      $counter.css("color", "red");
    }
    if ($counter.val() >= 0) {
      $counter.css("color", "black");
    }
  });

});
