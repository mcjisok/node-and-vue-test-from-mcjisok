$(function(){
	layui.use(['form','upload'], function(){
	  var form = layui.form;
	  
	  //监听提交
	  form.on('submit(formDemo)', function(data){
	    layer.msg(JSON.stringify(data.field));
	    return false;
	  });


	  //var $ = layui.jquery
	  
	});
})

