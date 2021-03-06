var interval_blog_preview_update;

document.getElementById('blogPostSubmitButton').addEventListener('click', () => {
            updatePost();
});

document.getElementById('blogPosts').addEventListener('click', (event) => {

    if(event.target.nodeName === 'BUTTON') {
        openPostUpdate(event.target.parentElement);
    }
});

function updatePost() {
    clearInterval(interval_blog_preview_update);
    document.getElementById('createNewPost').style.display = 'inline';
    document.getElementById('blogEditorWarper').style.display = 'none';
}

function openPostUpdate(postWarper) {

    const formData = new FormData();
    formData.append('upid', postWarper.getAttribute("id").substring(9));

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let blogPostData =  JSON.parse(this.responseText);

            openPostEditor(blogPostData.upid);
            updatePostEditorWithRawData(blogPostData);
        }
    }

    xhttp.open('POST', 'assets/php_lib/blogGetRawPost.php');
    xhttp.send(formData);
}



function openPostEditor(upid){
    document.getElementById('blogEditorWarper').style.display = 'block';
    document.getElementById('createNewPost').style.display = 'none';

    document.getElementById('blogEditor').innerHTML += 
        '<input style="display: none;"type="number" id="blogPostUpid" value="' +
        upid +
        '">';
    
    interval_blog_preview_update = setInterval(updatePreview, 200);
}



function updatePostEditorWithRawData(rawPostFormData) {
    
    document.getElementById('blogPostTitle').value = rawPostFormData.title;
    document.getElementById('blogPostBody').value = rawPostFormData.text;
    console.log(rawPostFormData.img[0])
    addImgThumbNails(rawPostFormData.img);
}



function addImgThumbNails(imgList){
    imgList.forEach(function( imgName) {
        document.getElementById('blogEditorImgList').innerHTML +=
            '<img class="blogEditorImgList" src="images/' + imgName + '">';
    })
}



function updatePreview() {

    const formData = new FormData();
    formData.append('returnFormatted', 1);
    formData.append('upid', document.getElementById('blogPostUpid').value)
    formData.append('title', document.getElementById('blogPostTitle').value);
    formData.append('body', document.getElementById('blogPostBody').value);

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('blogPreview').innerHTML = this.responseText;
        }
    }

    xhttp.open('POST', 'assets/php_lib/blogUpdatePost.php', true);
    xhttp.send( formData );
}