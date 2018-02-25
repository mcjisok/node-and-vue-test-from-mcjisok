/*
* JD ���� �汾 1.0
*  wuhaixin@jd.com
* 1. ��ԪԪ�ؿ�����Ӧ���ӿ��
* 2. ��Ļ��תʱ����Ӧ�������Ż���
* 3. ֧��������л���
* 4. ֧�������л���
*
*
* ��������⣺1. ��Ļ��ת����Ӧ����ҪΪ���ǡ��������ȡ�����2. ����ĩβ�հף�Ŀǰû�з���ĸ�������޷���̬�趨��������!?��
* */

;(function($){

    $.fn.jdSlider = function (config) {

        var _wrapperWidth, _itemPerScreen;
        var _slider = $(this);
        var _divContainer = $(this).find('.jd-slider-container');
        var _sliderItem = $(this).find('.jd-slider-item');
        var _sliderWidth;
        var _sliderItemWidth = _sliderItem.eq(0).width();
        var _box = {initX: 0, initY: 0, startX: 0, endX: 0, sliderX: 0, _sliderDirection:1, startY: 0, sliderFlag: false};

        //ȱʡ����
        var _config = $.extend({}, {
            lineNum: 1,
            fitToScreen:false
        }, config);



        /*Ϊ��ʹͼƬ��Ԫƽ�̲���Ӧ���ӿ�ȣ�����һ��Ļ�ڳ��ֲ���ȫ��ʾ�ĵ�Ԫ*/
        var setItems = function(){

            if(!_config.fitToScreen){
               return;
            }

            _wrapperWidth = _slider.width();//��ȡ��������������
            var itemW = _sliderItemWidth;
            //console.log('PaddingLeft is : '+parseInt(_sliderItem.eq(0).css('padding-left')));
            //console.log('PaddingRight is : '+parseInt(_sliderItem.eq(0).css('padding-right')));
            //console.log('MarginLeft is : '+parseInt(_sliderItem.eq(0).css('margin-left')));
            //console.log('MarginRight is : '+parseInt(_sliderItem.eq(0).css('margin-right')));

            //console.log('itemW='+itemW);


            var remainW = Number(_wrapperWidth) % itemW;
            _itemPerScreen = parseInt(_wrapperWidth / itemW);

            itemW = itemW + parseInt(remainW/_itemPerScreen);

            //���õ�Ԫ���
            _divContainer.css({
                width:_sliderItem.length / _config.lineNum * itemW
            });
            //���ð�����Ԫ���������
            _sliderItem.css({
                width:itemW
            });

        };


        //��ʼ������
        var initSlider = function(){
            _box.endX = 0;
            _wrapperWidth = _slider.width();//��Ļ��תʱ�����趨�������������
            setItems();//��Ļ��תʱ�����趨���鵥Ԫ���

            /*�ж������������1�У�ֱ�ӻ�ȡ�������ܳ��ȣ������2�У���Ҫ������������item�����ٳ���2.*/
            if(_config.lineNum==1){
                _sliderWidth = Number(_divContainer.width());
            }else{
                _sliderWidth = Number(_sliderItem.width()) * parseInt(_sliderItem.length / _config.lineNum);//��ȡ��������������
            }

            //���ø߶�
            _divContainer.css({
                height:Number(_sliderItem.outerHeight(true))*_config.lineNum
            });

            window.addEventListener('orientationchange', function(){
                initSlider();
            });
        };

        //����Ч��
        var sliding = function(k){
            _divContainer.css("-webkit-transform", "translate3d(" + (_box.endX = k) + "px,0,0)");
        };

        _slider.bind('touchstart',function(e){
            _box.sliderFlag = true;
             var et = e.originalEvent.touches[0];
            _box.startX = et.pageX;
            _box.initX = et.pageX;
            _box.initY = et.pageY;
        });

        _slider.bind('touchmove',function(e){
             var et = e.originalEvent.touches[0];

            //console.log(Math.abs(et.pageY - _box.initY) / Math.abs(et.pageX - _box.initX));

            /*�жϻ���ʱ��ָ�Ļ�������*/
            if (_box.sliderFlag && Math.abs(et.pageY - _box.initY) / Math.abs(et.pageX - _box.initX) < 0.6) {


                //_box.endX = et.pageX - _box.startX +  _box.endX;
                //var temEndX = et.pageX - _box.startX +  _box.endX;
                _box._sliderDirection = (et.pageX - _box.startX < 0) ? 'LEFT' : 'RIGHT';

                //_divContainer.css("-webkit-transform", "translate3d(" + temEndX + "px,0,0)");
               // _box.startX = et.pageX;
                e.preventDefault();
            }else{

                _box.sliderFlag = false;
            }
        });

        _slider.bind("touchend", function(e){
            if (!_box.sliderFlag) return;//
             var et = e.originalEvent.touches[0];

            if(_box.endX > 0){

                sliding(_box.endX = 0);
            }else if(_box.endX < -(_sliderWidth-_wrapperWidth)){
                sliding(_box.endX = -(_sliderWidth-_wrapperWidth));

            }else{

                //console.log('_wrapperWidth='+_wrapperWidth);

                if(_box._sliderDirection == 'LEFT') {
                    //console.log('LEFT');

                    //_sliderItem.length / _config.lineNum  %  _itemPerScreen
                    //�������һҳʱ���ɼ���Χ����ʣ��Ԫ�Ŀ���ܺͣ�iw����С�ڿɼ���Χ�Ŀ�ȡ��򻬶�����Ϊ��ʣ��Ԫ����ܺͣ�iw����
                    var limitLeftX = _sliderWidth - _wrapperWidth;
                    //console.log('limitLeftX = ' + limitLeftX);
                    _box.sliderX = (_divContainer.width() -_wrapperWidth - Math.abs(_box.sliderX) < _wrapperWidth) ? -limitLeftX : _box.sliderX - _wrapperWidth;
                    //console.log('_box.sliderX='+_box.sliderX);
                    //console.log('_divContainer.width='+_divContainer.width());
                    sliding(_box.sliderX);//���󻬶�

                }else{
                    //console.log('RIGHT');
                    //_box.sliderX = (_divContainer.width() -_wrapperWidth - Math.abs(_box.sliderX) < _wrapperWidth) ? _box.sliderX - _sliderItemWidth : _box.sliderX - _wrapperWidth;


                    _box.sliderX = (_box.sliderX + _wrapperWidth > 0) ? 0 : _box.sliderX + _wrapperWidth;

                    //console.log('_box.sliderX = ' + _box.sliderX);

                    sliding(_box.sliderX);
                }

            }
            _box.sliderFlag = false;

        });

        return initSlider();

    }

})(jQuery);

