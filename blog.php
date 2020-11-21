<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
?>
<!DOCTYPE html>
<html>
<head>
    <?php include 'html_lib/global_head_elements.html'; ?>
    <link rel="stylesheet" href="css_lib/blog.css">
</head>

<body>

    <?php include 'html_lib/nav.php'; ?>

    <main id='main'>
        
        <h1>My blog</h1>
<?php if( isset($_SESSION['uuid']) ) include 'assets/html_lib/blog_post_form.php'; ?>
        <button onclick='getNextToLastPost( -1 )'>Get Posts</button>
    </main>
</body> 

<script src='assets/js_lib/blog.js'></script>
</html>