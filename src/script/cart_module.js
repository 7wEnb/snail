define(['jcookie'], function() {
    return {
        init: function() {
            //1.获取cookie渲染对应的商品列表
            function showlist(sid, num) { //sid：编号  num：数量
                $.ajax({
                    url: 'http://192.168.11.1/Snail/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid == value.sid) {
                            let $clonebox = $('.cat_list:hidden').clone(true, true); //克隆隐藏元素
                            $clonebox.find('.merchandise').find('img').attr('src', value.url);
                            $clonebox.find('.merchandise').find('img').attr('sid', value.sid);
                            $clonebox.find('.info').find('a').html(value.title);
                            $clonebox.find('.unit_price').html(value.price);
                            $clonebox.find('.changebox').find('input').val(num);
                            //计算单个商品的价格
                            $clonebox.find('.total_price').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block');
                            $('.cattab').append($clonebox);
                            calcprice(); //计算总价
                        }
                    });

                });
            }

            //2.获取cookie渲染数据
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                let s = $.cookie('cookiesid').split(',');
                let n = $.cookie('cookienum').split(',');
                $.each(s, function(index, value) {
                    showlist(s[index], n[index]);
                });
            }

            //3.计算总价
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.cat_list:visible').each(function(index, ele) {
                    if ($(ele).find('.checkbox input').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.changebox input').val());
                        $count += parseFloat($(ele).find('.total_price').html());
                    }
                });
                $('.numtips').find('.totalnum').html($sum);
                $('.price').find('.totalprice').html($count.toFixed(2));
            }

            //4.全选
            $('.allsel').on('change', function() {
                $('.cat_list:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.allsel').prop('checked', $(this).prop('checked'));
                calcprice(); //计算总价
            });
            let $inputs = $('.cat_list:visible').find(':checkbox');
            $('.cattab').on('change', $inputs, function() {
                //$(this):被委托的元素，checkbox
                if ($('.cat_list:visible').find(':checkbox').length === $('.cat_list:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice();
            });

            //5.数量的改变
            $('.add').on('click', function() {
                let $num = $(this).parents('.cat_list').find('.changebox input').val();
                $num++;
                $(this).parents('.cat_list').find('.changebox input').val($num);

                $(this).parents('.cat_list').find('.total_price').html(calcsingleprice($(this)));
                calcprice();
                setcookie($(this));
            });


            $('.minus').on('click', function() {
                let $num = $(this).parents('.cat_list').find('.changebox input').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).parents('.cat_list').find('.changebox input').val($num);
                $(this).parents('.cat_list').find('.total_price').html(calcsingleprice($(this)));
                calcprice();
                setcookie($(this));
            });

            $('.changebox input').on('input', function() {
                let $reg = /^\d+$/g;
                let $value = $(this).val();
                if (!$reg.test($value)) {
                    $(this).val(1);
                }
                $(this).parents('.cat_list').find('.total_price').html(calcsingleprice($(this)));
                calcprice();
                setcookie($(this));
            });

            //计算单价
            function calcsingleprice(obj) {
                let $dj = parseFloat(obj.parents('.cat_list').find('.unit_price').html());
                let $num = parseInt(obj.parents('.cat_list').find('.changebox input').val());
                return ($dj * $num).toFixed(2)
            }

            //将改变后的数量存放到cookie中
            let arrsid = [];
            let arrnum = [];

            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }

            function setcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.cat_list').find('img').attr('sid');
                arrnum[$.inArray($sid, arrsid)] = obj.parents('.cat_list').find('.changebox input').val();
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }

            //6.删除
            function delcookie(sid, arrsid) {
                let $index = -1;
                $.each(arrsid, function(index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);

                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }
            $('.delete a').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.cat_list').remove();
                    delcookie($(this).parents('.cat_list').find('img').attr('sid'), arrsid);
                    calcprice();
                }
            });

            $('.main_cacubar .batch').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除已选中吗?')) {
                    $('.cat_list:visible').each(function() {
                        if ($(this).find(':checkbox').is(':checked')) { //
                            $(this).remove();
                            delcookie($(this).find('img').attr('sid'), arrsid);
                        }
                    });
                    calcprice();
                }
            });
        }
    }
})