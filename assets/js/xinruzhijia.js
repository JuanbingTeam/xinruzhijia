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
        this.TWEEN = this.initTween();
    };

    activity.prototype.bindEvents = function () {
        var self = this;

        $('.left-branch, .right-branch').on('tap, swipe', function () {
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
                $('.doorTip').hide();
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
        var self = this, TWEEN = self.TWEEN, container, objects, mouse, camera, scene, renderer, controls, geometry, mesh;
        var hasInit = false;
        var meteorAll = [];
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
        function addMeteor() {
            for (var e = 0; 30 > e; e++) {
                var t = (new THREE.TextureLoader).load("assets/images/meteor.png")
                  , i = new THREE.SpriteMaterial({
                      map: t,
                      color: 16777215,
                      fog: !0
                  })
                  , n = new THREE.Sprite(i);
                n.scale.x = 5,
                n.scale.y = 5,
                n.scale.z = 5;
                var r = 360 * e / 30
                  , a = 30 * Math.sin(THREE.Math.degToRad(r - 37.5))
                  , o = 60
                  , s = 30 * Math.cos(THREE.Math.degToRad(r - 37.5))
                  , c = 30 * Math.sin(THREE.Math.degToRad(r + 37.5))
                  , h = 0
                  , l = 30 * Math.cos(THREE.Math.degToRad(r + 17.5));
                n.position.set(a, o, s),
                n.xNum = a,
                n.yNum = o,
                n.zNum = s,
                n.xNum2 = c,
                n.yNum2 = h,
                n.zNum2 = l,
                n.name = e + 1,
                n.angle = r,
                n.typeAdd = "meteor",
                meteorAll.push(n),
                scene.add(n)
            }
        }
        function addMeteor1() {
            for (var e = 0; 2 > e; e++) {
                var t = (new THREE.TextureLoader).load("assets/images/meteor.png")
                  , i = new THREE.SpriteMaterial({
                      map: t,
                      color: 16777215,
                      fog: !0
                  })
                  , n = new THREE.Sprite(i);
                n.scale.x = 5,
                n.scale.y = 5,
                n.scale.z = 5;
                var r = 70 + 20 * (e - 3)
                  , a = 30 * Math.sin(THREE.Math.degToRad(r - 60.5))
                  , o = -10 + 20 * Math.random()
                  , s = 30 * Math.cos(THREE.Math.degToRad(r - 60.5))
                  , c = 30 * Math.sin(THREE.Math.degToRad(r + 37.5))
                  , h = -80
                  , l = 30 * Math.cos(THREE.Math.degToRad(r + 37.5));
                n.position.set(a, o, s),
                n.xNum = a,
                n.yNum = o,
                n.zNum = s,
                n.xNum2 = c,
                n.yNum2 = h,
                n.zNum2 = l,
                n.name = e + 1,
                n.angle = r,
                n.typeAdd = "meteorFirst",
                meteorAll.push(n),
                scene.add(n)
            }
        }
        function addMeteorFlash() {
            for (var e = 0; 30 > e; e++) {
                var t = (new THREE.TextureLoader).load("assets/images/meteor2.png")
                  , i = new THREE.SpriteMaterial({
                      map: t,
                      color: 16777215,
                      fog: !0
                  })
                  , n = new THREE.Sprite(i);
                n.scale.x = 5,
                n.scale.y = 5,
                n.scale.z = 5;
                var r = -100
                  , a = -100
                  , o = -100;
                n.position.set(r, a, o),
                n.name = e + 1,
                n.material.opacity = 0,
                n.typeAdd = "flash",
                //flashAll.push(n),
                scene.add(n)
            }
        }
        function startMeteor(e, t) {
            function i(t) {
                e.position.x = e.xNum,
                e.position.y = e.yNum,
                e.position.z = e.zNum,
                e.position.x = e.xNum,
                e.position.y = e.yNum,
                e.position.z = e.zNum,
                new TWEEN.Tween(e.position).to({
                    x: e.xNum2,
                    y: e.yNum2,
                    z: e.zNum2
                }, t).easing(TWEEN.Easing.Circular.Out).onComplete(function () {
                    var e = 8e3 * Math.random() + 8e3;
                    i(e)
                }).start(),
                new TWEEN.Tween(e.position).to({
                    x: e.xNum2,
                    y: e.yNum2,
                    z: e.zNum2
                }, t).easing(TWEEN.Easing.Circular.Out).onComplete(function () { }).start(),
                setTimeout(function () {
                    new TWEEN.Tween(e.material).to({
                        opacity: 1
                    }, t / 2).easing(TWEEN.Easing.Circular.Out).onComplete(function () {
                        e.material.opacity = 0;
                        var t = e;
                        flashAll.forEach(function (e) {
                            e.name == t.name && (e.material.opacity = 1,
                            e.position.x = t.position.x,
                            e.position.y = t.position.y,
                            e.position.z = t.position.z,
                            setTimeout(function () {
                                e.material.opacity = 0,
                                e.position.x = -100,
                                e.position.y = -100,
                                e.position.z = -100
                            }, 300))
                        })
                    }).start()
                }, t / 8)
            }
            5e3 * Math.random() + 5e3;
            i(t)
        }
        function startMeteors() {
            meteorAll.forEach(function (e) {
                var t = Math.floor(5e3 * Math.random());
                startMeteor(e, t)
            })
        }
        var E = {
            head1: {
                scale: 1.2,
                angle: 20,
                y: -1
            },
            head2: {
                scale: 0.9,
                angle: 50,
                y: -.5
            },
            head3: {
                scale: .8,
                angle: 100,
                y: 0
            },
            head4: {
                scale: 1.3,
                angle: 110,
                y: -1.5
            },
            head5: {
                scale: 1.1,
                angle: 130,
                y: 1
            },
            head6: {
                scale: 0.9,
                angle: 140,
                y: -1
            },
            head7: {
                scale: 1.2,
                angle: 165,
                y: .5
            },
            head8: {
                scale: 1.2,
                angle: 193,
                y: -1
            },
            head9: {
                scale: 1,
                angle: 226,
                y: -.5
            },
            head10: {
                scale: .9,
                angle: 240,
                y: 1.5
            },
            head11: {
                scale: 1.3,
                angle: 264,
                y: -1.5
            },
            head12: {
                scale: 1.1,
                angle: 282,
                y: 1
            },
            head13: {
                scale: 0.9,
                angle: 316,
                y: -1
            },
            head14: {
                scale: 1.2,
                angle: 345,
                y: .7
            }
        }, g = {
            img1: {
                scale: 1.5,
                angle: 6,
                y: 4
            },
            img2: {
                scale: 1.5,
                angle: 50,
                y: -5
            },
            img3: {
                scale: 1.3,
                angle: 64,
                y: .5
            },
            img4: {
                scale: 1.2,
                angle: 84,
                y: 2.5
            },
            img5: {
                scale: 1.1,
                angle: 108,
                y: -1
            },
            img6: {
                scale: 1.3,
                angle: 140,
                y: 1
            },
            img7: {
                scale: 1.1,
                angle: 152,
                y: -3.5
            },
            img8: {
                scale: 1,
                angle: 170,
                y: -2
            },
            img9: {
                scale: 1.5,
                angle: 186,
                y: 4
            },
            img10: {
                scale: 1.5,
                angle: 218,
                y: -4
            },
            img11: {
                scale: 1.3,
                angle: 244,
                y: -.5
            },
            img12: {
                scale: 1.2,
                angle: 264,
                y: 2.5
            },
            img13: {
                scale: 1.1,
                angle: 288,
                y: -1
            },
            img14: {
                scale: 1.3,
                angle: 320,
                y: 1
            },
            img15: {
                scale: 1.1,
                angle: 332,
                y: -3.5
            },
            img16: {
                scale: 1,
                angle: 343,
                y: -5.5
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

        var geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale( -1, 1, 1 );

        var material = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load('assets/images/sky.jpg')
        } );

        var mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh);
        
        for (var n = 0, r = mesh.geometry.vertices.length; r > n; n++) {
            var a = mesh.geometry.vertices[n];
            a.normalize(),
            a.multiplyScalar(550)
        }

        for (var e = 0; 14 > e; e++) {
            e > 6 ? j = e - 7 : j = e;
            var t = (new THREE.TextureLoader).load("assets/images/rose" + (j + 1) + ".png")
              , i = new THREE.SpriteMaterial({
                  map: t,
                  color: 16777215,
                  fog: !0
              })
              , n = new THREE.Sprite(i);
            n.scale.x = n.scale.y = n.scale.z = 2;
            var r = 360 * e / 7
              , a = Math.sin(E["head" + (e + 1)].angle * Math.PI / 180) * (4 / E["head" + (e + 1)].scale)
              , o = E["head" + (e + 1)].y
              , s = Math.cos(E["head" + (e + 1)].angle * Math.PI / 180) * (4 / E["head" + (e + 1)].scale);
            n.position.set(a, o, s),
            n.name = e + 1,
            n.no = j + 1,
            n.angle = r,
            n.typeAdd = "head",
            scene.add(n)
        }

        for (var e = 0; 16 > e; e++) {
            var t = g["img" + (e + 1)]
              , i = (new THREE.TextureLoader).load("assets/images/rose3.png")
              , n = new THREE.SpriteMaterial({
                  map: i,
                  color: 16777215
              })
              , r = new THREE.Sprite(n);
            r.scale.x = r.scale.y = r.scale.z = t.scale;
            var a = 8 * Math.sin(t.angle * Math.PI / 180)
              , o = t.y
              , s = 8 * Math.cos(t.angle * Math.PI / 180);
            r.position.set(a, o, s),
            r.typeAdd = "coffeebean",
            //coffeeBeenAll.push(r),
            scene.add(r)
        }

        //var geometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
        //var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, side: THREE.BackSide, wireframe: true } );
        //var mesh = new THREE.Mesh( geometry, material );
        //scene.add( mesh );
        
        window.scene = scene;
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = 0;
        container.appendChild(renderer.domElement);
        addMeteor(),
        addMeteorFlash(),
        startMeteors();
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
    activity.prototype.initTween = function () {
        var TWEEN = TWEEN || function () {
            var e = [];
            return {
                REVISION: "7",
                getAll: function () {
                    return e
                },
                removeAll: function () {
                    e = []
                },
                add: function (t) {
                    e.push(t)
                },
                remove: function (t) {
                    t = e.indexOf(t),
                    -1 !== t && e.splice(t, 1)
                },
                update: function (t) {
                    if (0 === e.length)
                        return !1;
                    for (var i = 0, n = e.length, t = void 0 !== t ? t : Date.now() ; n > i;)
                        e[i].update(t) ? i++ : (e.splice(i, 1),
                        n--);
                    return !0
                }
            }
        }();
        TWEEN.Tween = function (e) {
            var t = {}
            , i = {}
            , n = 1e3
            , r = 0
            , a = null
            , o = TWEEN.Easing.Linear.None
            , s = TWEEN.Interpolation.Linear
            , c = []
            , h = null
            , l = !1
            , u = null
            , p = null;
            this.to = function (e, t) {
                return null !== t && (n = t),
                i = e,
                this
            }
            ,
            this.start = function (n) {
                TWEEN.add(this),
                l = !1,
                a = void 0 !== n ? n : Date.now(),
                a += r;
                for (var o in i)
                    if (null !== e[o]) {
                        if (i[o] instanceof Array) {
                            if (0 === i[o].length)
                                continue; i[o] = [e[o]].concat(i[o])
                        }
                        t[o] = e[o]
                    }
                return this
            }
            ,
            this.stop = function () {
                return TWEEN.remove(this),
                this
            }
            ,
            this.delay = function (e) {
                return r = e,
                this
            }
            ,
            this.easing = function (e) {
                return o = e,
                this
            }
            ,
            this.interpolation = function (e) {
                return s = e,
                this
            }
            ,
            this.chain = function () {
                return c = arguments,
                this
            }
            ,
            this.onStart = function (e) {
                return h = e,
                this
            }
            ,
            this.onUpdate = function (e) {
                return u = e,
                this
            }
            ,
            this.onComplete = function (e) {
                return p = e,
                this
            }
            ,
            this.update = function (r) {
                if (a > r)
                    return !0;
                !1 === l && (null !== h && h.call(e),
                l = !0);
                var d, f = (r - a) / n, f = f > 1 ? 1 : f, E = o(f);
                for (d in t) {
                    var m = t[d]
                    , g = i[d];
                    e[d] = g instanceof Array ? s(g, E) : m + (g - m) * E
                }
                if (null !== u && u.call(e, E),
                1 == f) {
                    for (null !== p && p.call(e),
                    f = 0,
                    E = c.length; E > f; f++)
                        c[f].start(r);
                    return !1
                }
                return !0
            }
        }
        ,
        TWEEN.Easing = {
            Linear: {
                None: function (e) {
                    return e
                }
            },
            Quadratic: {
                In: function (e) {
                    return e * e
                },
                Out: function (e) {
                    return e * (2 - e)
                },
                InOut: function (e) {
                    return 1 > (e *= 2) ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
                }
            },
            Cubic: {
                In: function (e) {
                    return e * e * e
                },
                Out: function (e) {
                    return --e * e * e + 1
                },
                InOut: function (e) {
                    return 1 > (e *= 2) ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
                }
            },
            Quartic: {
                In: function (e) {
                    return e * e * e * e
                },
                Out: function (e) {
                    return 1 - --e * e * e * e
                },
                InOut: function (e) {
                    return 1 > (e *= 2) ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
                }
            },
            Quintic: {
                In: function (e) {
                    return e * e * e * e * e
                },
                Out: function (e) {
                    return --e * e * e * e * e + 1
                },
                InOut: function (e) {
                    return 1 > (e *= 2) ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
                }
            },
            Sinusoidal: {
                In: function (e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                },
                Out: function (e) {
                    return Math.sin(e * Math.PI / 2)
                },
                InOut: function (e) {
                    return .5 * (1 - Math.cos(Math.PI * e))
                }
            },
            Exponential: {
                In: function (e) {
                    return 0 === e ? 0 : Math.pow(1024, e - 1)
                },
                Out: function (e) {
                    return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
                },
                InOut: function (e) {
                    return 0 === e ? 0 : 1 === e ? 1 : 1 > (e *= 2) ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
                }
            },
            Circular: {
                In: function (e) {
                    return 1 - Math.sqrt(1 - e * e)
                },
                Out: function (e) {
                    return Math.sqrt(1 - --e * e)
                },
                InOut: function (e) {
                    return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                }
            },
            Elastic: {
                In: function (e) {
                    var t, i = .1;
                    return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1,
                    t = .1) : t = .4 * Math.asin(1 / i) / (2 * Math.PI),
                    -(i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4)))
                },
                Out: function (e) {
                    var t, i = .1;
                    return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1,
                    t = .1) : t = .4 * Math.asin(1 / i) / (2 * Math.PI),
                    i * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / .4) + 1)
                },
                InOut: function (e) {
                    var t, i = .1;
                    return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1,
                    t = .1) : t = .4 * Math.asin(1 / i) / (2 * Math.PI),
                    1 > (e *= 2) ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4) : .5 * i * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4) + 1)
                }
            },
            Back: {
                In: function (e) {
                    return e * e * (2.70158 * e - 1.70158)
                },
                Out: function (e) {
                    return --e * e * (2.70158 * e + 1.70158) + 1
                },
                InOut: function (e) {
                    return 1 > (e *= 2) ? .5 * e * e * (3.5949095 * e - 2.5949095) : .5 * ((e -= 2) * e * (3.5949095 * e + 2.5949095) + 2)
                }
            },
            Bounce: {
                In: function (e) {
                    return 1 - TWEEN.Easing.Bounce.Out(1 - e)
                },
                Out: function (e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                },
                InOut: function (e) {
                    return .5 > e ? .5 * TWEEN.Easing.Bounce.In(2 * e) : .5 * TWEEN.Easing.Bounce.Out(2 * e - 1) + .5
                }
            }
        },
        TWEEN.Interpolation = {
            Linear: function (e, t) {
                var i = e.length - 1
                , n = i * t
                , r = Math.floor(n)
                , a = TWEEN.Interpolation.Utils.Linear;
                return 0 > t ? a(e[0], e[1], n) : t > 1 ? a(e[i], e[i - 1], i - n) : a(e[r], e[r + 1 > i ? i : r + 1], n - r)
            },
            Bezier: function (e, t) {
                var i, n = 0, r = e.length - 1, a = Math.pow, o = TWEEN.Interpolation.Utils.Bernstein;
                for (i = 0; r >= i; i++)
                    n += a(1 - t, r - i) * a(t, i) * e[i] * o(r, i);
                return n
            },
            CatmullRom: function (e, t) {
                var i = e.length - 1
                , n = i * t
                , r = Math.floor(n)
                , a = TWEEN.Interpolation.Utils.CatmullRom;
                return e[0] === e[i] ? (0 > t && (r = Math.floor(n = i * (1 + t))),
                a(e[(r - 1 + i) % i], e[r], e[(r + 1) % i], e[(r + 2) % i], n - r)) : 0 > t ? e[0] - (a(e[0], e[0], e[1], e[1], -n) - e[0]) : t > 1 ? e[i] - (a(e[i], e[i], e[i - 1], e[i - 1], n - i) - e[i]) : a(e[r ? r - 1 : 0], e[r], e[r + 1 > i ? i : r + 1], e[r + 2 > i ? i : r + 2], n - r)
            },
            Utils: {
                Linear: function (e, t, i) {
                    return (t - e) * i + e
                },
                Bernstein: function (e, t) {
                    var i = TWEEN.Interpolation.Utils.Factorial;
                    return i(e) / i(t) / i(e - t)
                },
                Factorial: function () {
                    var e = [1];
                    return function (t) {
                        var i, n = 1;
                        if (e[t])
                            return e[t];
                        for (i = t; i > 1; i--)
                            n *= i;
                        return e[t] = n
                    }
                }(),
                CatmullRom: function (e, t, i, n, r) {
                    var e = .5 * (i - e)
                    , n = .5 * (n - t)
                    , a = r * r;
                    return (2 * t - 2 * i + e + n) * r * a + (-3 * t + 3 * i - 2 * e - n) * a + e * r + t
                }
            }
        };
        return TWEEN;
    };
    //new activity().init();
    window.a = new activity();
    a.init();
})(Zepto);