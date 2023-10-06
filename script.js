var tweetIDCount = 0;
var currentShowingTweet = -1;
var currentShowingElement = null;
const textareaPost = document.getElementById('textareaPost');
var currentUser = 'dalia_21';
var users = {
  'alice': { name: 'dalia_', profile: 'img/profile.jpg' },
  'dalia_21': { name: 'Dalia', profile: 'img/profile.jpg' }
};
var tweets = [];
document.querySelector('#create-post img').src = users[currentUser].profile;
document.querySelector('#profile img').src = users[currentUser].profile;
const tweetReplica = document.getElementById('tweet-replica');
const postButton = document.getElementById('postButton');
postButton.addEventListener('click', e => {
  const text = document.querySelector('#create-post textarea').value;
  if (text.length > 0) {
    newPost(currentUser, text);
    document.querySelector('#create-post textarea').value = '';
  }
});
document.getElementById('full-tweet-likes-icon').addEventListener('click', e => {
  const heart = document.getElementById('full-tweet-likes-icon');
  const tweetDiv = currentShowingElement;
  if (heart.classList.contains('fa-regular')) { // like tweet
    heart.classList.remove('fa-regular');
    heart.classList.add('fa-solid');
    heart.style.color = 'red'; 
  } else { // dislike tweet
    heart.classList.remove('fa-solid');
    heart.classList.add('fa-regular');
    heart.style.color = ' ';
  }
});
function newPost(author, text) {
  var clone = tweetReplica.cloneNode(true);
  document.getElementById('tweets').prepend(clone);
  clone.style.display = 'flex';
  clone.querySelector('.tweet-left img').src = users[author].profile;
  clone.querySelector('.tweet-name').innerHTML = users[author].name;
  clone.querySelector('.tweet-username').innerHTML = "@" + author;
  clone.querySelector('.tweet-post').innerHTML = text;
  // const d = new Date();
  const post = {
    id: tweetIDCount, username: author,
    content: text
  };
  tweets.push(post);
  clone.addEventListener('click', e => {
    showTweet(post.id);
    currentShowingElement = clone;
  });
  const likeDiv = clone.querySelector('.tweet-like');
  likeDiv.addEventListener('click', e => {
    e.stopPropagation();
    const heart = likeDiv.querySelector('i');
    if (heart.classList.contains('fa-regular')) { // like tweet
      heart.classList.remove('fa-regular');
      heart.classList.add('fa-solid');
      likeDiv.style.color = 'red';
      clone.style.background = "#8ecff7";
      
    } else { // dislike tweet
      heart.classList.remove('fa-solid');
      heart.classList.add('fa-regular');
      likeDiv.style.color = '';
    clone.style.background = "#ffffff";
    }
  });
  const repeatDiv = clone.querySelector('.tweet-retweet');
  repeatDiv.addEventListener('click', e => {
    e.stopPropagation();
    repeatTweet(post.id);
    repeatDiv.style.color = "#15c848";
  });
  tweetIDCount++;
}
function repeatTweet(tweetId) {
  const originalTweet = tweets.find(tweet => tweet.id === tweetId);
  if (originalTweet) {
    const author = originalTweet.username;
    const text = originalTweet.content;

    newPost(author, text, 'retweet');
  }
}
