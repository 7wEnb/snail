define([], function() {
    return {
        init: function() {
            $('.login_btn').on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.11.1/Snail/php/login.php',
                    data: {
                        user: $('#username').val(),
                        pass: $('#password').val()
                    }
                }).done(function(result) {
                    if (result) {
                        location.href = "index.html";
                        localStorage.setItem('username', $('#username').val());
                    } else {
                        $('#password').val('');
                        alert('用户名或者密码错误');
                    }
                });
            });
        }
    }
})