window.onload = function(){
	/*左侧滑动*/
	//leftSwipe();
	iscrollLeft();

	/*右侧滑动*/
	//rightSwipe();
	iscrollRight();

}

var leftSwipe = function(){
	/*
	1、上下滑动
	 */
	var parentBox = document.querySelector('.cate_left');
	var childBox = parentBox.querySelector('ul');

	var startY = 0;
	var distanceY = 0;

	/*程序的核心点*/
	var currentY = 0;

	childBox.addEventListener('touchstart',function(e){
		startY = e.touches[0].clientY;
	});
	childBox.addEventListener('touchmove',function(e){
		var moveY = e.touches[0].clientY;
		distanceY = moveY - startY;
		console.log(distanceY);

		/*将要去做定位的位置*/
		var translateY = currentY + distanceY;

		childBox.style.transform = 'translateY('+translateY+'px)';
		childBox.style.webkitTransform = 'translateY('+translateY+'px)';


	});
	childBox.addEventListener('touchend',function(e){
		currentY = currentY + distanceY;
	});
}

var iscrollLeft = function(){
	new IScroll(document.querySelector('.cate_left'))
}

var iscrollRight = function(){
	new IScroll(document.querySelector('.cate_right'))
}
var rightSwipe = function(){
	
}