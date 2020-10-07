define([], function() {
    return {
        init: function() {
            let $user = $('.found');
            let $usernameflag = true;
            $user.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.11.1/Snail/php/registry.php',
                    data: {
                        username: $user.val()
                    }
                }).done(function(result) {
                    if ($user.val() !== '') {
                        if (!result) { //不存在
                            $('.userSpan').html('√').css('color', 'green');
                            $usernameflag = true;
                        } else {
                            $('.userSpan').html('该用户名已经存在').css('color', 'red');
                            $usernameflag = false;
                        }
                    } else {
                        $('.userSpan').html('用户名不能为空').css('color', 'red');
                    }
                })
            });
            $('.password').on('input', function() {
                    if ($('.password').val() !== '') {
                        $('.passSpan').html('√').css('color', 'green');
                    } else {
                        $('.passSpan').html('密码不能为空').css('color', 'red');
                    }
                })
                // $('.repass').on('input', function() {
                //     if ($('.repass').val() !== '') {
                //         $('.repassSpan').html('√').css('color', 'green');
                //     } else {
                //         $('.repassSpan').html('确认密码不能为空').css('color', 'red');
                //     }
                // })


            $('form').on('submit', function() {
                if ($user.val() == '') {
                    $('.userSpan').html('用户名不能为空').css('color', 'red');
                    $usernameflag = false;
                }
                if ($('.password').val() == '') {
                    $('.passSpan').html('密码不能为空').css('color', 'red');
                    $usernameflag = false;
                }
                // if ($('.repass').val() == '') {
                //     $('.repassSpan').html('确认密码不能为空').css('color', 'red');
                //     $usernameflag = false;
                // }
                if (!$usernameflag) {
                    return false; //阻止提交
                }
            });
        }
    }
})