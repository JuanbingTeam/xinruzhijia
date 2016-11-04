(function ($, undefined) {
    var activity = function () {
        this.page1 = $('.page1');
        this.page2 = $('.page2');
        this.fogCanvas = $('#fogCanvas');
        this.skyContainer = $('.sky-container');
        this.popup = $('#popup');
        this.skyScale = 1;
        this.skyImgWith = 2516;
        this.skyImgHeight = 1033;        
    };

    activity.prototype.init = function () {
        if (commonObj.browser.ua.indexOf('mobile') < 0) {
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
    };

    activity.prototype.bindEvents = function () {
        var self = this;

        $('.left-branch, .right-branch').on('tap', function () {
            //$('.left-branch').addClass('slideOutLeft');
            $('.left-branch, .right-branch').children('img').each(function () {
                var $this = $(this);
                $this.addClass($this.attr('data-animation'));                
            });
            $('.branchTip').removeClass('fog-show').addClass('fog-hide');
            setTimeout(function () {
                $('.door').css('zIndex', 3);
                $('.doorTip').addClass('fog-show');
            }, 800);
            //$('.right-branch').addClass('slideOutRight');
        });

        $('.door, .light').on('tap', function () {
            $('.left-door').addClass('left-door-open');
            $('.right-door').addClass('right-door-open');
            self.page1.addClass('page1-open');
            $('.light').addClass('light-show');
            $('.doorTip').removeClass('fog-show').addClass('fog-hide');
            self.page2.show();
            setTimeout(function () {
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
                $('#test').html(parseInt(e.alpha) + ' ' + parseInt(e.beta) + ' ' + parseInt(e.gamma));
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
        if (window.DeviceOrientationEvent) {
            var lastAcc;
            window.addEventListener('deviceorientation', function (e) {
                if (lastAcc) {
                    var delB = Math.abs(e.alpha - lastAcc.alpha);    // beta轴偏转角
                    if (delB > 7) {                        
                        window.removeEventListener('deviceorientation');
                        self.showSky();
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
        self.initThree();
    };

    activity.prototype.initThree = function () {
        var self = this, container, objects, mouse, camera, scene, renderer, controls, geometry, mesh;
        var hasInit = false;
        var animate = function(){

            window.requestAnimationFrame( animate );
            controls.update();
            if (!hasInit) {
                camera.lookAt({
                    x: 1,
                    y: 0,
                    z: 1
                });
                hasInit = true;
            }
            renderer.render(scene, camera);
        };

        function random() {
            var e = 2e3 * Math.random() - 1e3;
            return e > 0 && 200 > e ? e += 200 : e > -200 && 0 >= e ? e += -200 : e = e,
            e
        }

        var E = {
            head1: {
                scale: 1,
                angle: 320,
                y: -1
            },
            head2: {
                scale: 1,
                angle: 280,
                y: -.5
            },
            head3: {
                scale: .9,
                angle: 250,
                y: 0
            },
            head4: {
                scale: 1,
                angle: 195,
                y: -1.5
            },
            head5: {
                scale: 1.1,
                angle: 180,
                y: 1
            },
            head6: {
                scale: 1,
                angle: 138,
                y: -1
            },
            head7: {
                scale: 1,
                angle: 98,
                y: .5
            },
            head8: {
                scale: 0.7,
                angle: 50,
                y: -1
            },
            head9: {
                scale: 1,
                angle: 340,
                y: 1.2
            }
        };

        container = document.getElementById('skyWrapper');

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 600);
						
        controls = new THREE.DeviceOrientationControls( camera );

        scene = new THREE.Scene(),
        mouse = new THREE.Vector2,
        objects = [];
        var projector = new THREE.Projector();
        //group = new THREE.Group();
        //scene.add(group);

        var geometry = new THREE.SphereGeometry(500, 20, 50);
        geometry.scale( -1, 1, 1 );

        var material = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load('assets/images/sky.jpg')
        } );

        var mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh);						

        for (var e = 0; 9 > e; e++) {
            var t = (new THREE.TextureLoader).load("assets/images/rose" + (e + 1) + ".png")
              , i = new THREE.SpriteMaterial({
                  map: t,
                  color: 16777215,
                  fog: !0
              })
              , n = new THREE.Sprite(i);
            n.scale.x = n.scale.y = n.scale.z = 1.1;
            var r = 360 * e / 7
              , a = Math.sin(E["head" + (e + 1)].angle * Math.PI / 180) * (4 / E["head" + (e + 1)].scale)
              , o = E["head" + (e + 1)].y
              , s = Math.cos(E["head" + (e + 1)].angle * Math.PI / 180) * (4 / E["head" + (e + 1)].scale);
            n.position.set(a, o, s),
            n.name = e + 1,
            n.no = e + 1,
            n.angle = r,
            n.typeAdd = "head",
            objects.push(n),
            scene.add(n);
        }

        //var geometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
        //var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, side: THREE.BackSide, wireframe: true } );
        //var mesh = new THREE.Mesh( geometry, material );
        //scene.add( mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = 0;
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', function() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );

        }, false);

        var object, clickFlag, angleLastClicked, lastHeadClicked; //your object
        
        document.addEventListener('touchstart', function (event) {
            //alert();
            var touches = event.touches;
            if (!touches.length) {
                return;
            }
            touches = touches[0];
            var mouseX = (touches.clientX / window.innerWidth) * 2 - 1;
            var mouseY = -(touches.clientY / window.innerHeight) * 2 + 1;
            var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            projector.unprojectVector(vector, camera);
            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var intersects = raycaster.intersectObjects(objects, true);
            //alert(JSON.stringify(intersects));
            if (intersects.length > 0) {
                //alert('待添加扫码加公众号');
                self.showPopup();
            }
        }, false);

        animate();
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
})(Zepto);