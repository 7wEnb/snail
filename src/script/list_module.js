define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {

            //排序的变量
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            //1.渲染列表页的数据-默认渲染第一页
            (function() {
                const $render = $('.sale_allitems')
                $.ajax({
                        url: 'http://192.168.13.28/Snail/php/list.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let strhtml = ''
                        $.each(data, function(index, value) {

                            strhtml += `
                          <div class="sale_item">
                              <a href=""><img src="${value.url}" alt=""></a>
                              <div class="sale_info">
                                  <p class="sale_name">${value.title}</p>
                                  <p class="sale_price">￥${value.price}</p>
                              </div>
                          </div>
                              `
                            strhtml += '</div>'
                        })
                        $render.html(strhtml);
                        //重置数组
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        //将页面的li元素追加到两个数组中。
                        $('.sale_allitems .sale_item').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });



                        //懒加载
                        $(function() {
                            $(".sale_price").lazyload({ effect: "fadeIn" });
                        });
                    })
            })()
            //2.分页思路
            //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get)
            $('.page').pagination({
                pageCount: 4, //总的页数 - 后端传入的。
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    const $render = $('.sale_allitems')
                    $.ajax({
                            url: 'http://192.168.13.28/Snail/php/list.php',
                            dataType: 'json',
                            data: {
                                page: api.getCurrent() //传输页面
                            }
                        })
                        .done(function(data) {
                            let strhtml = ''
                            $.each(data, function(index, value) {

                                strhtml += `
                                <div class="sale_item">
                                    <a href=""><img src="${value.url}" alt=""></a>
                                    <div class="sale_info">
                                        <p class="sale_name">${value.title}</p>
                                        <p class="sale_price">￥${value.price}</p>
                                    </div>
                                </div>
                                `
                                strhtml += '</div>'
                            })
                            $render.html(strhtml);

                            //重置数组
                            array_default = []; //排序前的li数组
                            array = []; //排序中的数组
                            prev = null;
                            next = null;
                            //将页面的li元素追加到两个数组中。
                            $('.sale_allitems .sale_item').each(function(index, element) {
                                array[index] = $(this);
                                array_default[index] = $(this);

                            });
                        });
                }
            });
            //3.排序
            // 默认
            $('button').eq(0).on('click', function() {
                //array_default = [li,li,li,li......]
                $.each(array_default, function(index, value) {
                    $('.sale_allitems').append(value);
                });
                return;
            });

            //升序
            $('button').eq(1).on('click', function() {

                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.sale_price').html().substring(1)); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.sale_price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        // console.log(prev, next);
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;

                        }

                    }
                }

                $.each(array, function(index, value) {
                    $('.sale_allitems').append(value);
                });

            });
            // 降序
            $('button').eq(2).on('click', function() {
                console.log(3);
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.sale_price').html().substring(1));
                        next = parseFloat(array[j + 1].find('.sale_price').html().substring(1));
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                //清空原来的列表，将排序后的数据添加上去。
                //empty() : 删除匹配的元素集合中所有的子节点。
                // $('.list ul').empty();//清空原来的列表
                $.each(array, function(index, value) {
                    $('.sale_allitems').append(value);
                });
            })
















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
        }
    }
})