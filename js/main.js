var topStoriesArr;
function hackerNewsTopStories(myIndexNumber, myMaximumNumber) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
							var topStoriesArr = JSON.parse(xmlhttp.responseText);
							// console.log(topStoriesArr);

								for (myIndexNumber; myIndexNumber < myMaximumNumber; myIndexNumber++) {
									getArticleInfo(topStoriesArr[myIndexNumber])
								}

							// topStoriesArr.forEach(function(element) {
							// 	// Executes the getArticleInfo function passing the article ID
							// 	getArticleInfo(element);
							// });
							 // return xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
    xmlhttp.send();
}

var position = 0
function getArticleInfo(articleId) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				 if (xmlhttp.status == 200) {
					 var response = JSON.parse(xmlhttp.responseText);
					 var article = document.createElement("article");
	           article.innerHTML = `
							 <div class="article-position">
			 					<span class="rank">${position + 1}.</span>
			 					<span class="arrow"></span>
			 				</div>
			 				<div class="article-title">
			 					<span class="title"><a href="${response.url}" target="_blank">${response.title}</a> </span>
			 					<span class="source">(${parseLocation(response.url)})</span>
			 					<div class="article-subtitle">
			 						<span class="score">${response.score}</span> points by <span class="author"><a href="https://news.ycombinator.com/user?id=${response.by}" target="_self">${response.by}</a></span> <span class="posted"><a href="https://news.ycombinator.com/item?id=${response.id}" target="_self">${parseTime(response.time)}</a> </span> | hide | <span class="comments"><a href="https://news.ycombinator.com/item?id=${response.id}" target="_self">${response.descendants} comments</a></span>
			 					</div>
			 				</div>
						 `
					 var main = document.querySelector("main");
					 main.appendChild(article, main);

				 }
				 position += 1;
			 }

		 };
		 xmlhttp.open("GET", "https://hacker-news.firebaseio.com/v0/item/"+articleId+".json?", true);
		 xmlhttp.send();
}

function parseLocation(href) {
    var l = document.createElement("a");
    l.href = href;
		var parsedUrl = l.hostname;
		parsedUrl.replace('www.','')
		// console.log(parsedUrl);
    return parsedUrl;
};

function parseTime(date) {
  var seconds = Math.floor((new Date(Date.now()) - (date+'000')) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}


function getDistFromBottom () {

  var scrollPosition = window.pageYOffset;
  var windowSize     = window.innerHeight;
  var bodyHeight     = document.body.offsetHeight;

  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);

}




hackerNewsTopStories(0,30);
// getDistFromBottom();


var myIndexNumber = 30;
var myMaximumNumber = 60;
// 				document.addEventListener('scroll', function() {
//         distToBottom = getDistFromBottom();
//         // console.log('scrolling', getDistFromBottom());
//
//         if (distToBottom <= 0 && myIndexNumber <= 500) {
//           // pollingForData = true;
//           // loadingContainer.classList.add('no-content');
// 					setTimeout(function(){
// 					hackerNewsTopStories(myIndexNumber, myMaximumNumber);
// 					if (myIndexNumber < 480) {
// 						myIndexNumber+=30;
// 						myMaximumNumber+=30;
// 						// console.log(myMaximumNumber);
// 					} else if (myMaximumNumber >= 480) {
// 						myIndexNumber+=20;
// 						myMaximumNumber=500;
// 						alert('no more articles available');
// 					} else if (myIndexNumber > 500) {
// 						return false;
// 					}
// 				}, 400);
// 			} else if (myMaximumNumber === 500) {
// 				return false;
// 			}
// });
