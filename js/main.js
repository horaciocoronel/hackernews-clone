function hackerNewsTopStories() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
							var topStoriesArr = JSON.parse(xmlhttp.responseText);
							console.log(topStoriesArr);
							topStoriesArr.forEach(function(element) {
								// Executes the getArticleInfo function passing the article ID
								getArticleInfo(element);
							});
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
		 					<span class="source">(${parseLocation(`${response.url}`)})</span>
		 					<div class="article-subtitle">
		 						<span class="score">${response.score}</span> points by <span class="author">${response.by}</span> <span class="posted">2 hours ago</span> | hide | <span class="comments">${response.descendants}</span> comments
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

var parseLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
		var parsedUrl = l.hostname;
		parsedUrl.replace('www.','')
		console.log(parsedUrl);
    return parsedUrl;
};





hackerNewsTopStories();
