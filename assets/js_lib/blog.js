if(document.addEventListener) {
    window.addEventListener('scroll', function(){
        loadMoreBlogPosts();
    });
    window.addEventListener('load', function(){
        initialPostLoad();
    })
}

function getNextToLastPost( lastPostUPID ) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("blogPosts").innerHTML += this.responseText;
        }
    };

    xhttp.open('POST', 'assets/php/blogGetPost.php', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('submit=1&getBlogPost=1&limit=5&upid=' + lastPostUPID );
}

function getUpidOfLastPost() {
    var error = 0;
    try {
        var lastChild = document.getElementById("blogPosts").lastChild.getAttribute("id");
    } catch (x) {
        var lastChildId = -1;
        error = 1;
    } finally {
        if( !error )var lastChildId = document.getElementById("blogPosts").lastChild.getAttribute("id").substring(9);
    }
    return String(lastChildId);
}

function loadMoreBlogPosts() {
    
    var scrollPos = window.scrollY;
    var height = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    
    if( scrollPos + window.innerHeight >= 0.9 * height ){
        var lastUpid = getUpidOfLastPost();
        getNextToLastPost( lastUpid );
    }
}

function initialPostLoad() {
    getNextToLastPost( getUpidOfLastPost() );
}