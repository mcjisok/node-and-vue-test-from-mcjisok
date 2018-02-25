// JavaScript Document
$(function(){
	$(".category").each(function(){
		$(this).mouseover(function(){
			$(this).css("opacity",1)
		}).mouseleave(function(){
			$(this).css("opacity",0.9)	
		})
	})
	
	$(".hotSale_prd_box:last").css("border-right","none");
	
})

$(function(){
    var thisTime;
    //鼠标离开左侧内容栏
    $('.cat_wrap .cat_list .float').mouseleave(function(even){
        thisTime = setTimeout(thisMouseOut,1000);
    });
    //鼠标点击左侧内容栏   滑动出弹层
    $('.cat_wrap .cat_list .float').mouseenter(function(){
        $(this).addClass("active").siblings().removeClass("active");
        clearTimeout(thisTime);
        var thisUB = $('.cat_wrap .cat_list .float').index($(this));
        if($.trim($('.cat_subcont .cat_sublist').eq(thisUB).html()) != ""){
            $('.cat_subcont').addClass('active');
            $('.cat_sublist').hide();
            $('.cat_sublist').eq(thisUB).show();
        }else{
            $('.cat_subcont').removeClass('active');
        }
    });
    //函数——执行鼠标离开左侧内容栏的动作
    function thisMouseOut(){
        $('.cat_subcont').removeClass('active');
        $('.cat_wrap .cat_list .float').removeClass('active');
    }
    $('.cat_subcont').mouseenter(function(){
        clearTimeout(thisTime);
        $('.cat_subcont').addClass('active');
    });
    $('.cat_subcont').mouseleave(function(){
        $('.cat_subcont').removeClass('active');
        $('.cat_wrap .cat_list .float').removeClass('active');
    });
});     