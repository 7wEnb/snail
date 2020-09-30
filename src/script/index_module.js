define([], function() {
    return {
        init: function() {
            //首页渲染
            (function() {
                const $render = $('.wnsjk_right')
                $.ajax({
                        url: 'http://192.168.13.28/Snail/php/alldata.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let strhtml = ''
                        $.each(data, function(index, value) {

                            strhtml += `
                        
                        <div class="wn_simcard">
                        <div class="simcard_name">${value.title}</div>
                        <div class="simcard_intro">${value.content}</div>
                        <div class="simcard_price">${value.price}</div>
                        <div class="simcard_img"><img  src="${value.url}" alt=""></div>  
                        </div>
                        `
                            strhtml += '</div>'
                            if (index == 3) {
                                return false
                            }
                        })
                        $render.html(strhtml)
                    })
            })()



            //二级菜单
            const $menuli = $('.left li');
            const $item = $('.cartlist .item');
            const $cartlist = $('.cartlist');
            $menuli.on('mouseover', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $item.eq($(this).index()).show().siblings('.item').hide();
                $cartlist.show();
            });
            $menuli.on('mouseout', function() {
                $(this).removeClass('active');
                $cartlist.hide();
            });
            $cartlist.hover(() => {
                $cartlist.show();
            }, () => {
                $cartlist.hide();
            });




            // 鼠标移入显示顶部菜单
            // $('.djzb').mouseover(function() {    
            //     $('.topyc').show();    
            // })
            // 鼠标移入显示顶部菜单
            $(".djzb").mouseover(function() {
                    $('.topyc').slideDown("1000", function() {})
                })
                //移入隐藏，隐藏继续显示
            $('.topyc').mouseover(function() {    
                    $('.topyc').show();    
                })
                //鼠标移入非 li（.djzb） 顶部菜单隐藏
            $($('li').not('.djzb')).mouseout(function() {    
                    $('.topyc').hide();    
                })
                //鼠标移出已显示的顶部菜单消失
            $('.topyc').mouseout(function() {    
                $('.topyc').hide();
            })



            //返回顶部
                
            $('.top').click(function() {
                $('html,body').animate({
                    scrollTop: 0
                })
            })

            // 游戏道具TAB切换
            const $btns = $('.xydj_category>div');
            const $divs = $('.gameprops');

            $btns.on('click', function() {
                $(this).addClass('bot').siblings('div').removeClass('bot');
                $divs.eq($(this).index()).show().siblings('.gameprops').hide();

            });


            //轮播图
            let $liW = $('.right li').first().width();
            let index = null;
            $('.right ul').width($('.right li').size() * $liW + 'px');
            $(".right .dot a").click(function() { //小圆点切换图片
                index = $(this).index() - 1;
                move();
            });

            function move() { //右移
                index++;
                if (index === $(".right .dot a").length + 1) {
                    $('.right ul').css({
                        left: 0
                    })
                    index = 1
                }
                if (index === $(".right .dot a").length) {
                    $(".right .dot a").eq(0).addClass("select").siblings().removeClass("select");
                }
                if (index === -1) {
                    $('.right ul').css({
                        left: -($('.right li').length - 1) * $liW + 'px'
                    })
                    index = $(".right .dot a").length - 1;
                }
                $(".right .dot a").eq(index).addClass("select").siblings().removeClass("select");
                $(".right ul").stop().animate({ left: -$liW * index });
            };
            $('.leftarrows').click(function() { //点击左箭头
                index -= 2;
                move();
            });
            $('.rightarrows').click(function() { //点击右箭头
                move();
            });
            $(".right").hover(function() { //鼠标移入暂停，移出继续
                    $('.leftarrows').css({
                        display: 'block'
                    });
                    $('.rightarrows').css({
                        display: 'block'
                    })
                    clearInterval($timer);
                },
                function() {
                    $('.leftarrows').css({
                        display: 'none'
                    });
                    $('.rightarrows').css({
                        display: 'none'
                    })
                    $timer = setInterval(move, 3000);
                });
            let $timer = setInterval(move, 3000); //自动轮播
        }

    }
})