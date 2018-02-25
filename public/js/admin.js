$(function(){
	$('.del').click(function(e){
		var target = $(e.target)
		//var id = target.date('id')
		var id = $(this).attr("date-id")
		console.log(id)
		var tr = $('.item-id-' + id)

		layer.confirm('是否删除该商品？', {
		  btn: ['确认', '取消'] //可以无限个按钮
		  
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				type:'DELETE',
				url:'/admin/movie/list?id=' + id
			})
			.done(function(results){
				if(results.success === 1){
					if(tr.length> 0){
						tr.remove()
					}
				}
			});
			layer.close(index)
		});
		
	})

	$('.del_user').click(function(e){
		var target = $(e.target)
		//var id = target.date('id')
		var id = $(this).attr("date-id")
		console.log(id)
		var tr = $('.item-id-' + id);

		layer.confirm('是否删除该用户？', {
		  btn: ['确认', '取消'] //可以无限个按钮
		  
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				type:'DELETE',
				url:'/admin/userlist?id=' + id
			})
			.done(function(results){
				if(results.success === 1){
					if(tr.length> 0){
						tr.remove()
					}
				}
			})
			layer.close(index)
		});


		
		
		
	})

	$('#douban').blur(function(){
		var douban = $(this)
		var id = douban.val()

		if(id){
			$.ajax({
				url:'https://api.douban.com/v2/movie/subject/' + id,
				cache:true,
				type:'get',
				dataType:'jsonp',
				crossDomain:true,
				jsonp:'callback',
				success:function(data){
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors.name)
					$('#inputCountry').val(data.countries[0])
					//$('#inputLanguage').val(data.)
					$('#inputPoster').val(data.images.large)
					$('#inputYear').val(data.year)
					$('#inputSummary').val(data.summary)
				}

			})
		}
	})

	// $('#uploadPoster').bind('change',function(){
	// 	var formData = new FormData($('.layui-form')[0])

	// 	$.ajax({
	// 		url:'/uploadimage',
	// 		type:'POST',
	// 		data:formData,
	// 		async: false,
 //            cache: false,
 //            timeout:100,
 //            contentType: false,//<----头信息设置为false
 //            processData: false,
 //            // success:function(data){
 //            // 	if(data.success === 1){
 //            // 		alert('文件上传成功');
 //            // 	}
 //            // 	else if(data.results === 'fail'){
 //            // 		alert('文件上传失败：原因是' + data.reason)
 //            // 	}
 //            // },
 //            // error:function(xhr){
 //            // 	alert('文件上传失败：原因是' + xhr)
 //            // }
	// 	})
	// 	.done(function(data){
	// 	 	if(data.success === 1){
 //        		//alert('文件上传成功,图片地址为：' + data.imgurl );
 //        		$('#preview').attr('src',data.imgurl);
 //        		$('#inputPoster').attr('value',data.imgurl);
 //        	}
 //        	else if(data.results === 'fail'){
 //        		alert('文件上传失败：原因是' + data.reason)
 //        	}
	// 	})
	// })



	var productid = $('#productid').val();
	//上传图片
	layui.use('upload', function(){
		var detailurl = '/detailimg_upload/' + productid
		var mainimagesurl = '/mainimages_upload/' + productid
		var $ = layui.jquery
		,upload = layui.upload;

		//上传商品主图
		upload.render({
			elem:'#mainimages'
			,url: mainimagesurl
			,accept:'file'
			,exts:'jpg|png|gif|bmp|jpeg'
			,multiple: true
			,before: function(obj){
				//预读本地文件示例，不支持ie8				
			}
			,done: function(res){				
				var content = 	'<div class="imglist1">' +
								'<img src="'+ res.imgurl +'" alt="'+ res.imgurl +'" width="100%" class="layui-upload-img"> '+
								'<a href="javascript:;"><i class="layui-icon  main-i" style="font-size: 30px; color: #ccc; line-height:35px;">&#xe640;</i></a>'
								'</div>'
				//$('#demo2').append(content)
				//var mkdown = $('#pre_detailimg').find('div')
				$(content).insertBefore($('.mainimgMK'))				
			}
		})

		//上传商品详情图
		upload.render({
			elem: '#upload_detailimg'
			,url: detailurl
			,accept:'file'
			,exts:'jpg|png|gif|bmp|jpeg'
			,multiple: true
			,before: function(obj){
				//预读本地文件示例，不支持ie8
				
			}
			,done: function(res){				
				var content = 	'<div class="imglist">' +
								'<img src="'+ res.imgurl +'" alt="'+ res.imgurl +'" width="100%" class="layui-upload-img"> '+
								'<a href="javascript:;"><i class="layui-icon detail-i" style="font-size: 30px; color: #ccc; line-height:35px;">&#xe640;</i></a>'
								'</div>'
				//$('#demo2').append(content)
				$(content).insertBefore($('.detailMK'))				
			}
		})

		upload.render({
			elem:'#uploadPoster'
			,url:'/uploadCateBanner'
			, accept: 'file'
			, exts: 'jpg|png|gif|bmp|jpeg'
			, multiple: true
			, before: function (obj) {
				//预读本地文件示例，不支持ie8

			}
			, done: function (res) {
				console.log(res)
				$('#catebanner').attr('src',res.imgurl);
				$('#cateban').val(res.imgurl);
			}
		})
	})


	//删除商品主图
	$('#main').on('click','.main-i',function(e){
		var _this = $(this)							//this指向绑定某个元素，即.main-i
		var target = $(e.target)
		//var imgurl = $(this).attr("imgurl")
		var imgurl = target.parent().siblings('img').attr('src')
		//alert('1')
		var ajaxurl = '/del_mainimg/' + productid
		var main_length = $('.imglist1').length
		if(main_length < 2 ){
			layer.open({
			  content: '请保存至少一张商品主图！'
			});   
		}else{
			//alert(mainlength)
			$.ajax({
				url:ajaxurl,
				type:'POST',
				data:{imgurl:imgurl}
			}).done(function(res){
				if(res.results === 1){	
					//alert('11111')				
					$(_this).parents('div.imglist1').remove()
				}
			})
		}
		
		
	})
	$('#main').on('mouseover','.main-i',function(e){
		var target = $(e.target)
		$(target).css("color","#FF5722")
	})
	$('#main').on('mouseout','.main-i',function(e){
		var target = $(e.target)
		$(target).css("color","#ccc")
	})




	// //删除当前点击的详情图
	$('#detail').on('click','.detail-i',function(e){
		var target = e.target
		var _this = $(this)
		var imgurl = $(this).parent().siblings('img').attr('src')
		var ajaxurl = '/del_detailimg/' + productid
		var detail_length
		$.ajax({
			url:ajaxurl,
			type:'POST',
			data:{imgurl:imgurl}
		}).done(function(res){
			if(res.results === 1){					
				$(_this).parents('div.imglist').remove()
			}
		})
	})
	$('#detail').on('mouseover','.detail-i',function(e){
		var target = $(e.target)
		$(target).css("color","#FF5722")
	})
	$('#detail').on('mouseout','.detail-i',function(e){
		var target = $(e.target)
		$(target).css("color","#ccc")
	})	

	$('.search_btn').click(function(){		
		//var data = $('.searchFrom').serializeArray();		

		var cate = $('#cate').val();
		var label = $('#label').val();
		var brand = $('#brand').val();
		
		var newData = [];
		if(cate != ''){
			newData.push({name:'catetory',value:cate})
		}
		if(label != ''){
			newData.push({name:'product_label',value:label})
		}
		if(brand != ''){
			newData.push({name:'product_brand',value:brand})
		}
		
		if(newData.length > 0){
			$.ajax({
				url:'/list_search',
				type:'POST',
				data:newData
			}).done(function(results){
				//console.log(results)
				if(results.results === 0){
					$('tbody').empty().append('<div>暂无商品</div>')
				}
				else{
					$('tbody').empty().append(results);
				}				
			})
			return false;				
		}				
	})
	//添加二级分类dom
	$('.addChildcate').click(function(){
		var childcateDOM = '<div pane="" class="layui-form-item chilaCate"><lable for="inputChildCatetory" class="layui-form-label">二级分类</lable><div class="layui-input-inline"><input id="inputChildCatetory" type="text" class="layui-input" name="childcate[name]" required="required" lay-verify="required"></div><a class="layui-btn layui-btn-danger delChildcate" value=""><i class="layui-icon">&#xe640;</i>删除</a></div>';
		var mkdown = $('#cateup');
		$(childcateDOM).insertBefore(mkdown);
	})
	//删除二级分类dom
	$('#catemenu').on('click','.delChildcate',function(e){
		var target = e.target;				
		$(this).parents('.chilaCate').remove();
	})
	//异步删除二级分类数据
	$('.delChildcate').click(function(e){
		var target = e.target;
		var id = $(target).attr('data-id')
		console.log(id)
		$.ajax({
			url:'/childcate/delete',
			type:'POST',
			data:{_id:id}
		}).done(function(res){	
			if(res.result === 1){
				layer.open({
				  content: '删除二级分类成功'
				});  
				$(target).parents('.layui-form-item').remove();
			}		
		})
	})

	layui.use('form', function(){
		var form = layui.form;
		form.on('submit(formDemo)', function(data){
			layer.alert(JSON.stringify(data.field), {
				title: '最终的提交信息'
			})
			return false;
		});
		form.on('select(cate)', function(data){
			//console.log(data.elem); //得到select原始DOM对象
			//console.log(data.value); //得到被选中的值
			//console.log(data.othis); //得到美化后的DOM对象
			var parent_id = data.value
			$.ajax({
				url:'/getchildcate',
				type:'POST',
				data:{id:parent_id}
			}).done(function(results){
				//console.log(results)
				if($('.layui-inline')[1]){
					$('.layui-inline')[1].remove();
				}
				$(results).appendTo($('#categoryMenu'))
				form.render()
				// var childcates = results[0].childcates
				// for(var i = 0; i<childcates.length; i++){
				// 	console.log(childcates[i]._id);
				// 	var childcateName = childcates[i].name;
				// 	var childcateID = childcates[i]._id;
				// 	var str = '<option value="'
				// 			+ childcateID
				// 			+'">'
				// 			+ childcateName
				// 			+'</option>'
				// 	//console.log(str)
				// 	$(str).appendTo('#childcate_admin')

				// }
				
			})
			
		});  	 
	});


})