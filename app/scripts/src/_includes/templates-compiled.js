if (!!!templates) var templates = {};
templates["gallery"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project__inline__inner\">");t.b("\n" + i);if(t.s(t.f("items",c,p,1),c,p,0,49,542,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"project__inline__item\">");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-prev\"></a>");t.b("\n" + i);t.b("      <img src=\"/");t.b(t.v(t.f("path",c,p,0)));t.b("/");t.b(t.v(t.f("file",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("alt",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-close\"></a>");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-next\"></a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);if(t.s(t.f("file2",c,p,1),c,p,0,292,529,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"project__inline__item\">");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-prev\"></a>");t.b("\n" + i);t.b("      <img src=\"/");t.b(t.v(t.f("path",c,p,0)));t.b("/");t.b(t.v(t.f("file2",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("alt2",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-close\"></a>");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-next\"></a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("  <ul>");t.b("\n" + i);if(t.s(t.f("items",c,p,1),c,p,0,574,747,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li><a href=\"#\" data-count=\"");t.b(t.v(t.f("count",c,p,0)));t.b("\">");t.b(t.v(t.f("count",c,p,0)));t.b("</a></li>");t.b("\n" + i);if(t.s(t.f("count2",c,p,1),c,p,0,656,731,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li><a href=\"#\" data-count=\"");t.b(t.v(t.f("count2",c,p,0)));t.b("\">");t.b(t.v(t.f("count2",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["item_1x1"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project__items--");t.b(t.v(t.f("side",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div class=\"project__item--1x1 project__item\" data-pos=\"");t.b(t.v(t.f("side",c,p,0)));t.b("_");t.b(t.v(t.f("pos",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <img src=\"/");t.b(t.v(t.f("path",c,p,0)));t.b("/");t.b(t.v(t.f("thumb",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("alt",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"project__item--1x1 project__item\" data-pos=\"");t.b(t.v(t.f("side",c,p,0)));t.b("_");t.b(t.v(t.f("pos",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <img src=\"/");t.b(t.v(t.f("path",c,p,0)));t.b("/");t.b(t.v(t.f("thumb2",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("alt2",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["item_2x1"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project__item--2x1 project__item--");t.b(t.v(t.f("side",c,p,0)));t.b("\" data-pos=\"");t.b(t.v(t.f("side",c,p,0)));t.b("_");t.b(t.v(t.f("pos",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <img src=\"/");t.b(t.v(t.f("path",c,p,0)));t.b("/");t.b(t.v(t.f("thumb",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("alt",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["item_2x2"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project__item--2x2 project__item--");t.b(t.v(t.f("side",c,p,0)));t.b("\" data-pos=\"");t.b(t.v(t.f("side",c,p,0)));t.b("_");t.b(t.v(t.f("pos",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <img src=\"/");t.b(t.v(t.f("path",c,p,0)));t.b("/");t.b(t.v(t.f("thumb",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("alt",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["items"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project__items--");t.b(t.v(t.d("item.side",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  ");t.b(t.v(t.f("item1",c,p,0)));t.b("\n" + i);t.b("  ");t.b(t.v(t.f("item2",c,p,0)));t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["page"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!doctype html>");t.b("\n" + i);t.b("<html class=\"no-js\" lang=\"\">");t.b("\n" + i);t.b("<head>");t.b("\n" + i);t.b("    <meta charset=\"utf-8\">");t.b("\n" + i);t.b("    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">");t.b("\n" + i);t.b("    <title>Mystery Meat</title>");t.b("\n" + i);t.b("    <meta name=\"description\" content=\"\">");t.b("\n" + i);t.b("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");t.b("\n");t.b("\n" + i);t.b("    <link rel=\"stylesheet\" href=\"/styles/styles.css\">");t.b("\n" + i);t.b("</head>");t.b("\n" + i);t.b("<body>");t.b("\n" + i);t.b("    <div class=\"page__container\">");t.b("\n" + i);t.b("        <div class=\"page__inner\">");t.b("\n" + i);t.b("            ");t.b(t.t(t.f("content",c,p,0)));t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <footer>");t.b("\n" + i);t.b("        <ul>");t.b("\n" + i);t.b("            <li><a href=\"#\" class=\"icon-cleaver\"></a></li>");t.b("\n" + i);t.b("            <li><a href=\"#\" class=\"icon-mm\"></a></li>");t.b("\n" + i);t.b("            <li><a href=\"#\" class=\"icon-pants\"></a></li>");t.b("\n" + i);t.b("        </ul>");t.b("\n" + i);t.b("    </footer>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"overlay\"></div>");t.b("\n");t.b("\n" + i);t.b("    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->");t.b("\n" + i);t.b("    <script>");t.b("\n" + i);t.b("    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=");t.b("\n" + i);t.b("        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;");t.b("\n" + i);t.b("    e=o.createElement(i);r=o.getElementsByTagName(i)[0];");t.b("\n" + i);t.b("    e.src='//www.google-analytics.com/analytics.js';");t.b("\n" + i);t.b("    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));");t.b("\n" + i);t.b("    ga('create','UA-XXXXX-X','auto');ga('send','pageview');");t.b("\n" + i);t.b("    </script>");t.b("\n");t.b("\n" + i);t.b("    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js\"></script>");t.b("\n" + i);t.b("    <script src=\"/scripts/app.js\"></script>");t.b("\n" + i);t.b("</body>");t.b("\n" + i);t.b("</html>");return t.fl(); },partials: {}, subs: {  }});
templates["project"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"page project\">");t.b("\n" + i);t.b("    <header>");t.b("\n" + i);t.b("        <h1>");t.b(t.v(t.f("title",c,p,0)));t.b("<a href=\"#\" class=\"icon-info\"></a></h1>");t.b("\n" + i);t.b("    </header>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("ritems",c,p,0)));t.b("\n" + i);t.b("    ");t.b("\n");t.b("\n" + i);t.b("    <div class=\"project__inline\">");t.b("\n" + i);t.b("        ");t.b(t.t(t.f("gallery",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"project__detail\">");t.b("\n" + i);t.b("      <h1>");t.b(t.v(t.f("title",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("      <hr />");t.b("\n" + i);t.b("      <p>");t.b(t.v(t.f("blurb",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("      <a href=\"#\" class=\"icon-close\"></a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
