{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){console.log("****",t,"****");let o=e(t.data.post);$("#posts-list-container>ul").prepend(o),n($(" .delete-post-button",o)),new PostComments(t.data.post._id),new ToggleLike($(".toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n        <small>\n            <a class="toggle-like-button" data-likes="0" href="/likes/toggle?id=${t._id}&type=Post"> \n                0 Likes \n            </a>\n\n        </small>\n        ${t.content},\n        ${t.user.name}\n        \x3c!-- ${t.user} --\x3e\n        <div id="posts-container">\n            \n            \x3c!-- delete option is visible only if signed in user has written post --\x3e\n\n            <a class="delete-post-button" href="/posts/destroy/${t._id}">X</a>\n\n            <form action="/comments/create" method="POST">\n                <input name="content" type="text" placeholder="Type here to add comment...">\n                \x3c!-- post._id (id of post) is sent to comment.post in the comment schema --\x3e\n                <input type="hidden" name="post" value=${t._id} >\n                <input type="submit" value="Add comment">\n            </form>\n\n        </div>    \n        <div class="post-comments-list">\n            <ul id="post-comments-${t._id}">\n                \n            </ul>\n        </div>\n    </li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){console.log(t),$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post deleted!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},o=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}