define([], function() {
    return {
        init: function() {
            //渲染数据
            let $sid = location.search.substring(1).split('=')[1]
            if (!$sid) {
                $sid = 1;
            }
            $.ajax({
                url: 'http://192.168.11.1/Snail/php/getsid.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                $('.title').html(data.title)
                $('.sellprice').html(data.price)
                $('.subtitle').html(data.content)
                $('.tablist').attr('src', data.piclisturl)
                $('.tablist').attr('sid', data.sid)
                $('.big_picture img').attr('src', data.url)
                console.log(data.piclisturl.split(','));
                let $pics = data.piclisturl.split(',')
                let str = ''
                $.each($pics, function(index, value) {
                    str += '<li><img width="60" height="60" src="' + value + '"/>></li>';
                })
                $('.tablist ul').html(str)
            })
            const $bpic = $('.big_picture img');
            const $spic = $('.tablist');
            // 点击小图切换到大图
            $('.tablist ul').on('click', 'li', function() {
                let picurl = $(this).find('img').attr('src');
                $spic.attr('src', picurl);
                $bpic.attr('src', picurl);
            });
            //购物车效果
            let arrsid = []
            let arrnum = []

            function cookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',')
                    arrnum = $.cookie('cookienum').split(',')
                }
            }
            $('.cart_row .to_cart').on('click', function() {
                cookie();
                if ($.inArray($sid, arrsid) != -1) {
                    let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.txt_count').val());
                    arrnum[$.inArray($sid, arrsid)] = $num;
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else {
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('.txt_count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                alert('加入成功');
            });
            //按钮加加减减
            (function() {
                let num = $('.txt_count').val()
                $('.minus').on('click', function() {
                    if (num > 1) {
                        num--
                        $('.txt_count').val(num)
                    }
                })
                $('.add').on('click', function() {
                    num++
                    $('.txt_count').val(num)
                })
            })();


        }
    }
})