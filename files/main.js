
///////////////////////////////////////////////
// Menu handling and scrolling to sections
///////////////////////////////////////////////

var topMenu = $(".navbar.navbar-fixed-top .nav"),
    menuBar = $(".navbar.navbar-fixed-top .navbar-header"),
    topMenuHeight = menuBar.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(el) {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        } else {
            return "";
        }
    });

$("a").click(function() {
    $(".navbar-collapse.in").collapse("hide");
    $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top - menuBar.outerHeight() + 1
    }, 500);
    return false;
});

var updateMenu = function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function() {
        if ($(this).offset().top <= fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems.parent().removeClass("active")
        .end().filter("[href='#" + id + "']").parent().addClass("active");

    var $activityBoxes = $(".activity-box");

    function shouldBeHighlighted(x) {
        return ($(this).offset().top > fromTop) && (($(this).offset().top + $(this).height()) <= fromTop + $(window).height());
    }

    var highlited = $activityBoxes.filter(shouldBeHighlighted);
    $activityBoxes.removeClass("highlighted");
    highlited.addClass("highlighted");
};

var showMoreProjects = function() {
    $(".more-projects").removeClass("hidden");
    $(".show-more-projects-link").addClass("hidden");
}

var hideMoreProjects = function() {
    $(".more-projects").addClass("hidden");
    $(".show-more-projects-link").removeClass("hidden");
}
    
$(window).scroll(updateMenu);
$(window).ready(updateMenu);


