$(function() {

    // 搜索框切换
    (function() {
        var aLi = $('#menu li');
        var oText = $('#search').find('.form .text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var iNow = 0;
        oText.val(arrText[iNow]);

        aLi.each(function(index) {

            $(this).click(function() {

                aLi.attr('class', 'gradient');
                // is not a function  
                // get() 把jQuery对象转化为原生JS对象        aLi[index] 偷懒写法
                // aLi[index].attr('class');
                // aLi.get(index).attr('class', 'active');

                // jQuery对象
                // aLi.eq(index).attr('class', 'active');
                $(this).attr('class', 'active');

                iNow = index;
                oText.val(arrText[iNow]);
            });
        });

        /* this,当前活动元素？ 也就是oText */
        oText.focus(function() {
            if ($(this).val() == arrText[iNow]) {
                $(this).val('');
            }
        });

        oText.blur(function() {
            if (oText.val() == '') {
                oText.val(arrText[iNow]);
            }
        });
    })();

    // update文字弹性滑动
    (function() {

        var oDiv = $('.update');
        var oUl = oDiv.find('ul');
        var oUpBtn = $('#updateUpBtn');
        var oDownBtn = $('#updateDownBtn');
        var timer = null;
        var iH = 0;
        var iNow = 0;
        var iLen = 0;

        var arrData = [
            { 'name': '萱萱', 'time': 4, 'title': '那些灿烂华美的瞬间', 'url': 'http://www.miaov.com/2013/' },
            { 'name': '畅畅', 'time': 5, 'title': '广东3天抓获涉黄疑犯', 'url': 'http://www.miaov.com/2013/#curriculum' },
            { 'name': '萱萱', 'time': 6, 'title': '国台办回应王郁琦', 'url': 'http://www.miaov.com/2013/#about' },
            { 'name': '畅畅', 'time': 7, 'title': '那些灿烂华美的瞬间', 'url': 'http://www.miaov.com/2013/#message' },
            { 'name': '萱萱', 'time': 8, 'title': '那些灿烂华美的瞬间', 'url': 'http://www.miaov.com/2013/' },
            { 'name': '畅畅', 'time': 9, 'title': '广东3天抓获涉黄疑犯', 'url': 'http://www.miaov.com/2013/#curriculum' },
            { 'name': '萱萱', 'time': 10, 'title': '国台办回应王郁琦', 'url': 'http://www.miaov.com/2013/#about' },
            { 'name': '畅畅', 'time': 11, 'title': '那些灿烂华美的瞬间', 'url': 'http://www.miaov.com/2013/#message' }
        ];
        iLen = arrData.length;

        // 初始化
        var str = '';
        for (var i = 0; i < iLen; i++) {
            str += '<li><a href = "' + arrData[i].url + '"><strong>' + arrData[i].name + '</strong><span> ' + arrData[i].time + '分钟前 </span>写了一篇新文章：' + arrData[i].title + '…</a></li>';
        }
        oUl.html(str);
        iH = oUl.find('li').height();

        // 按钮点击上下运动. num：步数
        oUpBtn.click(function() {
            doMove(-1);
        });
        oDownBtn.click(function() {
            doMove(1);
        });

        function doMove(num) {

            iNow += num;
            // 边界值判定  iNow应该一直都是0和负数
            if (Math.abs(iNow) > iLen - 1) {
                iNow = 0;
            }
            if (iNow > 0) {
                // ！！！注意！注意！这里是负数 
                iNow = -(iLen - 1);
            }
            oUl.stop().animate({ 'top': iH * iNow }, 2200, 'elasticOut');
        }

        // 自动向上运动  Here！！！ oDiv.hover  vs  oUl.hover  后者在点击数时不会停止动画
        oDiv.hover(function() {
            clearInterval(timer);
        }, autoPlay);

        function autoPlay() {
            // clearInterval(timer);
            timer = setInterval(function() {
                doMove(-1);
            }, 3500);
        }
        autoPlay();
    })();

    // options选项卡切换
    (function() {

        navTab($('.tabNav1'), $('.tabCon1'), 'click');
        navTab($('.tabNav2'), $('.tabCon2'), 'click');
        navTab($('.tabNav3'), $('.tabCon3'), 'mouseover');
        navTab($('.tabNav4'), $('.tabCon4'), 'mouseover');

        function navTab(oNav, aCon, sEvent) {

            var aElem = oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function(index) {

                $(this).on(sEvent, function() {

                    // 标签切换

                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');

                    // 三角切换显示

                    aElem.find('a').removeClass('triangle_down_red').addClass('triangle_down_gray');
                    $(this).find('a').removeClass('triangle_down_gray').addClass('triangle_down_red');

                    // 内容显示
                    aCon.hide().eq(index).show();

                });
            });
        }
    })();

    // 自动播放焦点图
    (function() {

        var oDiv = $('#fade');

        var aUlLi = oDiv.find('ul li');
        var aOlLi = oDiv.find('ol li');
        var oP = oDiv.find('p');
        var arr = ['爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方'];
        var timer = null;
        var iNow = 0;

        // 初始化一下
        doFade();

        // 封装方法
        function doFade() {

            aUlLi.each(function(i) {
                if (i != iNow) {
                    aUlLi.eq(i).fadeOut().css('zIndex', 1);
                    aOlLi.eq(i).removeClass('active');
                } else {
                    aUlLi.eq(i).fadeIn().css('zIndex', 2);
                    aOlLi.eq(i).addClass('active');
                }
            });
            oP.text(arr[iNow]);
        }

        // 自动播放
        function autoFade() {

            timer = setInterval(function() {
                // iNow++;
                // iNow%=arr.length;
                iNow = iNow >= (arr.length-1) ? 0 : iNow+1;
                doFade();
            }, 2000);
        }
        autoFade();

        // 点击
        aOlLi.click(function(){
            iNow = $(this).index();
            doFade();
            return false;
        });

        // 停止自动播放
        oDiv.hover(function(){
            clearInterval(timer);
        }, autoFade);
    })();

    // 日历提示说明
    (function() {

        // 星期
        var aSpan = $('.calendar h3 span');
        // 格子里的img
        var aImg = $('.calendar .img');
        // prompt 提示框
        var oPrompt = $('.today_info');
        var oImg = oPrompt.find('img');
        var oStrong = oPrompt.find("strong");
        var oP = oPrompt.find('p');

        aImg.hover(function() {

            var iTop = $(this).parent().position().top - 30;
            var iLeft = $(this).parent().position().left + 55;
            var index = $(this).parent().index() % aSpan.length;

            // console.log(index);

            oPrompt.show().css({ 'left': iLeft, 'top': iTop });
            oImg.attr('src', $(this).attr('src'));
            oStrong.text(aSpan.eq(index).text());

            // 自定义属性 info
            oP.text($(this).attr('info'));

        }, function() {
            oPrompt.hide();
        });
    })();

    // BBS高亮显示
    (function() {

        $('.bbs ol li').mouseover(function() {
            $('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
        });
    })();

    // HOT鼠标提示效果
    (function() {

        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];

        // console.log($('.hot_area li'));

        $('.hot_area li').mouseover(function() {

            if ($(this).index() == 0) return;

            $(".hot_area li p").remove();

            // 双引号少了一半
            // 宽度获取 width()   是方法，不是属性
            var str = '<p style = "width:' + ($(this).width() - 12) + 'px; height:' + ($(this).height() - 12) + 'px;"> ' + arr[$(this).index()] + ' </p>';

            // console.log(str);

            $(this).append(str);

            /*var w = $(this).width()-12;
            var h = $(this).height()-12;
            var oPP = $(this).append('p');
            oPP.css({'left':w, 'top':h});
            oPP.text("ni shuo sha");*/
        });
    })();
});
