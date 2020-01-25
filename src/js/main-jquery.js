$(function() {
	var imgs = [
		"1.jpg",
		"2.jpg",
		"3.jpg"
	];
	createImages(imgs);
	setInterval(rotateImages, 6000);
	var $navItem = $("nav ul li");
	$navItem.hover(highlight, highlight);
	$navItem.click(setActive);
});

function highlight(evt) {
	$(this).toggleClass("highlighted");
}

function setActive(evt) {
	evt.preventDefault();
	var navItem = $("nav ul li").not("active");
	if(navItem) {
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	}
}

function createImages(imgs) {
	$("#hero").empty();
	$.each(imgs, (index, value) => {
		const img = $("<img src='" + value + "' />");
		$("#hero").append(img);
	});
	$("#hero img:first").addClass("current");
}

function rotateImages() {
	var curImg = $("#hero .current");
	var nxtImg = curImg.next();
	if(nxtImg.length == 0) { nxtImg = $("#hero img:first"); }
	curImg.addClass("previous").removeClass("current");
	nxtImg.addClass("current").css({opacity:"0"}).animate({opacity:"1"},3000,function() { curImg.removeClass("previous"); });
}