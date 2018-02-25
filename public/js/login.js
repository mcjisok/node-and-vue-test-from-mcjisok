$(function(){
layui.use(['layer', 'form'], function(){
	var layer = layui.layer
	,form = layui.form;
	

	form.on('submit',function(data){	
		
		var signupname = $('#signupName'),
		signupPassword = $('#signupPassword');

		$.ajax({
			url:'/user/singup',
			type:'POST',
			data:$('#signup').serialize(),
		}).done(function(data){
			if(data.results === 1){
				layer.open({
				  title: '土豆商城'
				  ,content: '用户已存在！',
				  yes:function(index){
				  	signupname.val('');
				  	signupPassword.val('');
				  	layer.close(index);
				  }
				});  
			}
			else if(data.results === 2){
				layer.open({
					title:'土豆商城',
					content:'注册成功，点击跳转',
					yes:function(index){
						window.location.href='/signin'
					}
				})
			}
		})
		return false;
	})
  
});

	$('#lg').bind('click',function(){
		var oTxtname = $('#signinName');
		var oTxtpsw = $('#signinPassword');
		if (oTxtname.val() != '' && oTxtpsw.val() != '') {
			$.ajax({
				url:'/user/singin',
				type:'POST',
				data:$('#login').serialize(),

			}).done(function(data){
				if(data.results === 1){
					layer.open({
					  title: '土豆商城'
					  ,content: '用户不存在！',
					  yes:function(index){
					  	oTxtname.val('');
					  	oTxtpsw.val('');
					  	layer.close(index);
					  }
					});  
				}
				else if(data.results === 3){
					layer.open({
					  title: '土豆商城'
					  ,content: '密码错误！',
					  yes:function(index){
					  	oTxtpsw.val('');
					  	layer.close(index);
					  }
					});  
				}
				else{
					window.location.href='/'
				}
			})
		}
	})

	$('#signup').bind('click',function(){

	})
})