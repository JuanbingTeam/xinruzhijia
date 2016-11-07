(function (undefined) {
    var activity = function () {
        this.page1 = $('.page1');
        this.page2 = $('.p1');
        this.fogCanvas = $('#fogCanvas');
        this.skyContainer = $('.sky-container');
        this.popup = $('#popup');
        this.skyScale = 1;
        this.skyImgWith = 2516;
        this.skyImgHeight = 1033;        
    };

    activity.prototype.init = function () {
        if (navigator.userAgent.toLowerCase().indexOf('mobile') < 0) {
            $('body').css({
                maxWidth: '640px',
                margin: '0 auto'                
            });
        }
        var self = this;
        this.initFog();
        this.bindEvents();
        var clientHeight = document.documentElement.clientHeight, clientWidth = document.documentElement.clientWidth;
        if (clientHeight / clientWidth > 2468 / 1468) {
            $('.roses').css('top', 'auto');
        }
        this.maxTranslateY = clientHeight / 4;
        this.skyContainer.css({
            height: clientHeight * self.skyScale + 'px',
            width: clientHeight * self.skyScale / self.skyImgHeight * self.skyImgWith + 'px',
            left: -(clientHeight * self.skyScale / self.skyImgHeight * self.skyImgWith - clientWidth) / 2 + 'px'
        });

        this.maxTranslateX = (clientHeight * self.skyScale / self.skyImgHeight * self.skyImgWith - clientWidth) / 2;

        //this.TWEEN = this.initTween();
    };

    activity.prototype.bindEvents = function () {
        var self = this, isMove = false, moveBranch = function() {
			$('.left-branch, .right-branch').children('img').each(function () {
                var $this = $(this);
                $this.addClass($this.attr('data-animation'));                
            });
            $('.branchTip').removeClass('fog-show').addClass('fog-hide');
            setTimeout(function () {
                $('.door').css('zIndex', 3);
                $('.doorTip').addClass('fog-show');
            }, 800);
		};
        $(document).on('touchstart', function() {
            isMove = false;
        })
        .on('touchmove', function() {
            isMove = true;
        })
        .on('touchend', function() {
            isMove = false;
        });
        $('.left-branch, .right-branch').on('touchmove', moveBranch).on('click', moveBranch);

        $('.door, .light').on('click, touchend', function (e) {
            if(isMove) {
                isMove = false;
                return;
            }
            $('.left-door').addClass('left-door-open');
            $('.right-door').addClass('right-door-open');
            self.page1.addClass('page1-open');
            $('.light').addClass('light-show');
            $('.doorTip').removeClass('fog-show').addClass('fog-hide');
            self.page2.show();
            setTimeout(function () {
                self.page1.hide();
                self.showPage2();
            }, 2000);
        });

        self.page1.on('webkitAnimationEnd', function () {
            //self.page1.hide();
        });

        self.fogCanvas.on('webkitTransitionEnd', function () {
            self.fogCanvas.hide();
            $('#fogTip').hide();
            $('.branchTip').addClass('fog-show');
        });

        self.popup.on('click', function (e) {
            if (e.target && e.target.className !== 'qr-img') {
                self.hidePopup();
            }
        });
    };

    activity.prototype.initFog = function () {
        var fogCanvas = this.fogCanvas[0],
                width = document.documentElement.clientWidth,
                height = document.documentElement.clientHeight,
                cxt = fogCanvas.getContext('2d');
        fogCanvas.width = width;
        fogCanvas.height = height;
        //cxt.drawImage(img,0,0,canvas.width,canvas.height);
        cxt.beginPath();
        cxt.fillStyle = 'rgba(255,255,255,0.4)';
        cxt.fillRect(0, 0, width, height);
        cxt.closePath();
        //cxt.strokeStyle = "rgba(255,255,255,0.1)";
        cxt.lineWidth = 25;//线的宽度
        cxt.lineCap = 'round';//线的两头样式为圆
        cxt.lineJoin = 'round';//线的拐角样式为圆
        cxt.globalCompositeOperation = 'destination-out';//变透明
        cxt.beginPath();
        cxt.save();
        //cxt.translate(-(width * 0.15), -(height * 0.373));

        var startX, startY;

        function touchStart(event) {
            event.preventDefault();
            if (!event.touches.length) return;
            var touch = event.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            //cxt.clearRect(startX, startY, 50, 50);
            cxt.moveTo(startX, startY);
            //console.log(startX + ',' + startY);
            //cxt.arc(startX,startY,10,0,Math.PI*2,true);画空心圆
            cxt.stroke();
            cxt.restore();
            //cxt.moveTo(100,100);
            //alert(startX);
            //       cxt.beginPath();
            //       cxt.clearRect(startX,startY,50,50);
            //       cxt.closePath();
            //       cxt.fill();
            //       cxt.restore();
        }

        var closeX, closeY;
        function touchMove(event) {
            event.preventDefault();
            var touch = event.touches[0];
            closeX = touch.pageX;
            closeY = touch.pageY;
            //console.log(closeX + ',' + closeY);
            cxt.lineTo(closeX, closeY);
            //cxt.moveTo(closeX, closeY);
            cxt.stroke();
        }

        function touchEnd(event) {
            event.preventDefault();
            //alert(canvas.width);
            data = cxt.getImageData(0, 0, fogCanvas.width, fogCanvas.height).data;
            //console.log(data);
            for (var i = 0, j = 0; i < data.length; i += 4) {
                if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
                    j++;
                }
            }
            //alert(j);
            //alert(canvas.width*canvas.height*0.5);
            //假如j的数量小于等于图片的0.7了，就全清除
            if (j <= fogCanvas.width * fogCanvas.height * 0.9) {
                fogCanvas.className = 'fog-hide';
                $('#fogTip').addClass('fog-hide').children('.tip-circle').removeClass('tiping');
            }
            console.log(j);
        }

        //add touch start listener
        fogCanvas.addEventListener("touchstart", touchStart, false);
        fogCanvas.addEventListener('touchmove', touchMove, false);
        fogCanvas.addEventListener('touchend', touchEnd, false);
    };

    activity.prototype.showSky = function () {
        var self = this, roses = self.skyContainer.children('.float');
        self.page2.addClass('page2-sky-show');
        //self.skyContainer.children('.sky-img').addClass('skyimg-show');
        //roses.each(function () {
        //    var $this = $(this);
        //    $this.addClass($this.attr('data-animation'));
        //});
        //setTimeout(function () {
            //self.skyContainer.addClass('sky-container-transition');            
            //setTimeout(function () {
                //roses.each(function () {
                    //var $this = $(this);
                    //$this.removeClass($this.attr('data-animation')).addClass('rose-moving');
                //});
                //self.moveSky();
            //}, 2000);            
        //}, 5000);
        //self.showPage(2);
        //self.begainRose();
    };

    activity.prototype.moveSky = function () {
        var self = this;
        if (window.DeviceOrientationEvent) {
            var lastAcc;
            window.addEventListener('deviceorientation', function (e) {
                if (!lastAcc) {
                    lastAcc = e;
                    return;
                }
                //$('#test').html(parseInt(e.alpha) + ' ' + parseInt(e.beta) + ' ' + parseInt(e.gamma));
                var prevX = parseInt(self.skyContainer.attr('data-x')) || 0;
                var x = e.beta;  // In degree in the range [-180,180]
                var y = e.gamma; // In degree in the range [-90,90]
                if (x > 90) { x = 90 };
                if (x < -90) { x = -90 };
                var delG = y - lastAcc.gamma, absDelG = Math.abs(delG);
                if (absDelG > 0 && absDelG < 10) {
                    //var translateX = self.maxTranslateX * y / 90, translateY = self.maxTranslateY * y / 90;
                    //translateY = 0;
                    var translateX = prevX + parseInt(2 * Math.PI * 50 * delG / 360);
                    if (translateX > self.maxTranslateX) {
                        translateX = self.maxTranslateX;
                    }
                    else if (translateX < -self.maxTranslateX) {
                        translateX = -self.maxTranslateX;
                    }
                    self.skyContainer.css({
                        'transform': 'translateX(' + translateX + 'px)',
                        '-webkit-transform': 'translateX(' + translateX + 'px)'
                    }).attr('data-x', translateX);
                }
                else {
                    var prevX = parseInt(self.skyContainer.attr('data-x')) || 0;
                    var delA = e.alpha - lastAcc.alpha, absDelA = Math.abs(delA);    // beta轴偏转角
                    if (absDelA > 0 && absDelA < 20) {
                        var x = prevX + parseInt(2 * Math.PI * 100 * delA / 360);
                        if (x > self.maxTranslateX) {
                            x = self.maxTranslateX;
                        }
                        else if (x < -self.maxTranslateX) {
                            x = -self.maxTranslateX;
                        }
                        self.skyContainer.css({
                            'transform': 'translateX(' + x + 'px)',
                            '-webkit-transform': 'translateX(' + x + 'px)'
                        }).attr('data-x', x);
                    }
                }
                lastAcc = e;
            }, false);
        }
        else {
            self.page2.on('swipe', function () {
                //self.showSky();
            });
        }
    }

    activity.prototype.showPage2 = function () {
        var self = this;
        self.page2.addClass('page2-show');
        //self.initNewThree();
        return;
        if (window.DeviceOrientationEvent) {
            var lastAcc;
            window.addEventListener('deviceorientation', function (e) {
                if (lastAcc) {
                    var delB = Math.abs(e.alpha - lastAcc.alpha);    // beta轴偏转角
                    if (delB > 7) {                        
                        window.removeEventListener('deviceorientation');
                        self.showSky();
                        //self.showPage(2);
                    }
                    //alert(delB);
                }
                lastAcc = e;
            }, false);
        }
        else {
            self.page2.on('swipeUp', function () {
                self.showSky();
            });
        }
        //self.initThree();
        
    };

    activity.prototype.hidePopup = function () {
        var self = this;
        self.popup.removeClass('fog-show').addClass('fog-hide');
        setTimeout(function () {
            self.popup.hide();
        }, 1000);
    };

    activity.prototype.showPopup = function () {
        var self = this;
        setTimeout(function () {
            self.popup.show();
            setTimeout(function () {
                self.popup.removeClass('fog-hide').addClass('fog-show');
            });
        }, 500);        
    };

    //new activity().init();
    window.a = new activity();
    a.init();
})();