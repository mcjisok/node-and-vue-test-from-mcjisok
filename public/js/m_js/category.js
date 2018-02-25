window.onload = function(){
	$('.cate_left').find('li').eq(0).addClass('now');
	$('.cate_right').eq(0).addClass('show');

	/*左侧滑动*/
	//leftSwipe();
	iscrollLeft();

	/*右侧滑动*/
	//rightSwipe();
	iscrollRight();	

	swipeCategory();

	// 点击返回按钮返回上一页
	historyGo();

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

var swipeCategory = function () {
	
	$('.cate_left').find('li').tap(function () {
		$(this).addClass('now').siblings().removeClass('now');
		//var id = $(this).attr('data_id');
		var _thisIndex = $(this).index()

		$('.cate_right').eq(_thisIndex).removeClass('hide').addClass('show').siblings().removeClass('show');
		new IScroll(document.querySelectorAll('.cate_right')[_thisIndex]);		
	})
}

var historyGo = function () {
	$('.icon_back').tap(function () {
		window.history.go(-1);
	})
}