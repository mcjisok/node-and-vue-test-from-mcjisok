$(document).ready(function() {

	$('#signup').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {/*验证*/
            username: {/*键名username和input name值对应*/
                message: 'The username is not valid',
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '用户名不能为空'
                    },
                    stringLength: {/*长度提示*/
                        min: 5,
                        max: 30,
                        message: '用户名长度必须在5到30位之间'
                    }/*最后一个没有逗号*/
                }
            },
            password: {
                message:'密码无效',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 5,
                        max: 18,
                        message: '密码长度必须在5到18位之间'
                    }
                }
            }
        }
    });

    $('#signin').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {/*验证*/
            username: {/*键名username和input name值对应*/
                message: 'The username is not valid',
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '用户名不能为空'
                    },
                    stringLength: {/*长度提示*/
                        min: 5,
                        max: 30,
                        message: '用户名长度必须在5到30位之间'
                    }/*最后一个没有逗号*/
                }
            },
            password: {
                message:'密码无效',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    }, 
                    stringLength: {
                        min: 5,
                        max: 18,
                        message: '密码长度必须在5到18位之间'
                    }
                }
            }
        }
    });

    $(".btn-default").click(function(){
    	var a = $(this).parent().siblings('.modal-body').find('.form-group input')
    	for (var i = 0; i< a.length; i++) {
    		if(a[i].value !== ""){
    			a[i].value = ""
    		}
    	}

    })
})