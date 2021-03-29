if (document.addEventListener) {                // For all major browsers, except IE 8 and earlier

    document.getElementById('createNewPost').addEventListener('click',  ()=>{ 
        createNewPost(); 
    });
}


function createNewPost() {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        
        if(this.readyState == 4 && this.status == 200) postCreateSuccess();
        if(this.readyState == 4 && this.status == 400) postCreateFail();
    };
    const data = new FormData();

    data.append('createPostInDB', 1);

    xhttp.open('POST', 'assets/php_lib/blogCreatePost.inc.php', true);
    xhttp.send(data);

}



function postCreateSuccess() {
    document.getElementById('blogEditor').style.display = 'block';
}



function postCreateFail() {

}