function hackerNewsTopStories() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
							var topStoriesArr = JSON.parse(xmlhttp.responseText);
							console.log(topStoriesArr);
							 return topStoriesArr;
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

hackerNewsTopStories();
