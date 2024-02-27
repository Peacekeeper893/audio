import React, { Fragment } from "react";

const Comments = ({ name }) => {
    var disqus_config = function () {
        this.page.url = window.location.href; // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = name; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function () {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
            s = d.createElement("script");
        s.src = "https://novelsounds.disqus.com/embed.js";
        s.setAttribute("data-timestamp", +new Date());
        (d.head || d.body).appendChild(s);
    })();
    return (
        <Fragment>
            <div id="disqus_thread" className="p-8 pt-20 dark:bg-d-bg-200 dark:text-white"></div>
        </Fragment>
    );
};

export default Comments;
