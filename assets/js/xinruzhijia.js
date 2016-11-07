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
        self.showPage(2);
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
        //self.initThree();
        self.initNewThree();
    };

    activity.prototype.initThree = function () {
        var self = this, container, objects, mouse, camera, scene, renderer, controls, geometry, mesh;
        var hasInit = false;
        var TWEEN = self.TWEEN;
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


    activity.prototype.initNewThree = function() {
        var app = { 
            pages: {},
            currentPage: 1
        }, TWEEN = this.TWEEN, self = this;
        function getRandom(e, t) {
            return Math.random() * (t - e) + e
        }
        function getTime() {
            return (new Date).getTime()
        }
        function Dot(e, t, i, n, r, a) {
            this.stage = e,
            this.ctx = e.context,
            this.startX = t,
            this.startY = i,
            this.startZ = n,
            this.destX = 0,
            this.destY = 0,
            this.destZ = 0,
            this.z = n,
            this.x = t,
            this.y = i,
            this.radius = r,
            this.color = a
        }
        function ParticalImg(e) {
            this.focallength = 250,
            this.particalRadius = 3,
            this.stageDom = null ,
            this.targetImg = null ,
            this.canvas = null ,
            this.context = null ,
            this.autoStart = !1,
            this.imgBounder = null ,
            this.stageBounder = null ,
            this.requestId = null ,
            this.dots = [],
            this.pause = !0,
            this.startTime = 0,
            this.init(e),
            this.prepare()
        }
        function init() {
            function e() {
                var e = 2e3 * Math.random() - 1e3;
                return e > 0 && 200 > e ? e += 200 : e > -200 && 0 >= e ? e += -200 : e = e,
                e
            }
            container = document.getElementById("skyWrapper"),
            //document.body.appendChild(container),
            camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,600),
            scene = new THREE.Scene;
            2 * Math.PI;
            group = new THREE.Group,
            scene.add(group);
            var t = new THREE.SphereGeometry(500,60,40);
            t.scale(-1, 1, 1);
            var i = new THREE.MeshBasicMaterial({
                map: (new THREE.TextureLoader).load("assets/images/sky.jpg")
            });
            mesh = new THREE.Mesh(t,i),
            scene.add(mesh);
            for (var n = 0, r = mesh.geometry.vertices.length; r > n; n++) {
                var a = mesh.geometry.vertices[n];
                a.normalize(),
                a.multiplyScalar(550)
            }
            for (var o, a, s = new THREE.BoxGeometry(200,200,200,16,16,16), o = s.vertices, c = new Float32Array(3 * o.length), h = new Float32Array(3 * o.length), l = new Float32Array(o.length), u = new THREE.Color, n = 0, r = o.length; r > n; n++)
                a = new THREE.Vector3(1e3 * Math.random() - 500,1e3 * Math.random() - 500,e()),
                a.toArray(c, 3 * n),
                u.setHSL(.54, .62, .73),
                u.toArray(h, 3 * n),
                l[n] = .1 * (Math.random() + 50);
            var p = new THREE.BufferGeometry;
            p.addAttribute("position", new THREE.BufferAttribute(c,3)),
            p.addAttribute("customColor", new THREE.BufferAttribute(h,3)),
            p.addAttribute("size", new THREE.BufferAttribute(l,1));
            var i = new THREE.ShaderMaterial({
                uniforms: {
                    color: {
                        type: "c",
                        value: new THREE.Color(16777215)
                    },
                    texture: {
                        type: "t",
                        value: (new THREE.TextureLoader).load("assets/images/disc.png")
                    }
                },
                //vertexShader: document.getElementById("vertexshader").textContent,
                //fragmentShader: document.getElementById("fragmentshader").textContent,
                alphaTest: .9
            });
            particles = new THREE.Points(p,i),
            particles2 = new THREE.Points(p,i),
            scene.add(particles),
            scene.add(particles2),
            raycaster = new THREE.Raycaster,
            raycaster1 = new THREE.Raycaster,
            mouse = new THREE.Vector2,
            renderer = new THREE.WebGLRenderer,
            renderer.setPixelRatio(window.devicePixelRatio),
            renderer.setSize(window.innerWidth, window.innerHeight),
            container.appendChild(renderer.domElement),
            document.addEventListener("mousemove", onDocumentMouseMove, !1),
            document.addEventListener("touchstart", onDocumentTouchStart, !1),
            document.addEventListener("click", onDocumentClick, !1),
            document.addEventListener("touchmove", onDocumentTouchMove, !1),
            document.addEventListener("touchend", onDocumentTouchEnd),
            window.addEventListener("resize", onWindowResize, !1)
        }
        function loadTexture(e) {
            var t = new THREE.Texture(texture_placeholder)
            , i = new THREE.MeshBasicMaterial({
                map: t,
                overdraw: .5
            })
            , n = new Image;
            return n.onload = function() {
                t.image = this,
                t.needsUpdate = !0
            }
            ,
            n.src = e,
            i
        }
        function onWindowResize() {
            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2,
            camera.aspect = window.innerWidth / window.innerHeight,
            camera.updateProjectionMatrix(),
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        function onDocumentMouseMove(e) {
            mouseX = e.clientX - windowHalfX,
            mouseY = e.clientY - windowHalfY
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
                var t = (new THREE.TextureLoader).load("assets/images/meteor1.png")
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
        function startMeteor1(e, t) {
            function i(t) {
                e.position.x = e.xNum,
                e.position.y = e.yNum,
                e.position.z = e.zNum,
                new TWEEN.Tween(e.position).to({
                    x: e.xNum2,
                    y: e.yNum2,
                    z: e.zNum2
                }, t).easing(TWEEN.Easing.Circular.Out).onComplete(function() {
                    var e = 1e4 * Math.random() + 1e4;
                    i(e)
                }).start()
            }
            var n = 1e4 * Math.random() + 1e4;
            i(n)
        }
        function startMeteors1() {
            meteorAll.forEach(function(e) {
                var t = Math.floor(5e3 * Math.random());
                startMeteor1(e, t)
            })
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
                flashAll.push(n),
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
                }, t).easing(TWEEN.Easing.Circular.Out).onComplete(function() {
                    var e = 8e3 * Math.random() + 8e3;
                    i(e)
                }).start(),
                new TWEEN.Tween(e.position).to({
                    x: e.xNum2,
                    y: e.yNum2,
                    z: e.zNum2
                }, t).easing(TWEEN.Easing.Circular.Out).onComplete(function() {}).start(),
                setTimeout(function() {
                    new TWEEN.Tween(e.material).to({
                        opacity: 1
                    }, t / 2).easing(TWEEN.Easing.Circular.Out).onComplete(function() {
                        e.material.opacity = 0;
                        var t = e;
                        flashAll.forEach(function(e) {
                            e.name == t.name && (e.material.opacity = 1,
                            e.position.x = t.position.x,
                            e.position.y = t.position.y,
                            e.position.z = t.position.z,
                            setTimeout(function() {
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
            meteorAll.forEach(function(e) {
                var t = Math.floor(5e3 * Math.random());
                startMeteor(e, t)
            })
        }
        function onDocumentTouchStart(e) {
            touchFlag = 1,
            renderer.render(scene, camera),
            touchstartLon = cameraSetting.lon,
            onPointerDownPointerX = e.touches[0].clientX,
            onPointerDownPointerY = e.touches[0].clientY,
            onPointerDownLon = cameraSetting.lon,
            onPointerDownLat = cameraSetting.lat,
            mouse.x = e.touches[0].clientX / renderer.domElement.clientWidth * 2 - 1,
            mouse.y = 2 * -(e.touches[0].clientY / renderer.domElement.clientHeight) + 1
        }
        function onDocumentClick(e) {}
        function onDocumentTouchEnd(e) {
            if (clickFlag)
                return !1;
            if (!touchmoveFlag) {
                raycaster.setFromCamera(mouse, camera);
                var t = raycaster.intersectObjects(scene.children);
                if (t.length > 0 && "head" == t[0].object.typeAdd)
                    if (0 == clickFlag) {
                        angleLastClicked = cameraSetting.lon,
                        clickFlag = 1,
                        lastHeadClicked = t[0].object.name;
                        var i = t[0].object.no;
                        scene.children.forEach(function(e) {
                            "Sprite" == e.type && e.name != lastHeadClicked && (e.material.opacity = 1 - e.material.opacity)
                        });
                        var n;
                        n = angleLastClicked > 0 ? 90 + 360 * parseInt(angleLastClicked / 360) : -270 + 360 * parseInt(angleLastClicked / 360),
                        new TWEEN.Tween(camera.position).to({
                            x: t[0].point.x - 2 * Math.cos(THREE.Math.degToRad(cameraSetting.lon)),
                            y: t[0].point.y,
                            z: t[0].point.z - 2 * Math.sin(THREE.Math.degToRad(cameraSetting.lon))
                        }, 2e3).easing(TWEEN.Easing.Circular.Out).start(),
                        new TWEEN.Tween(cameraSetting).to({
                            lon: cameraSetting.lon,
                            lat: 0
                        }, 2e3).easing(TWEEN.Easing.Circular.Out).onComplete(function() {
                            setTimeout(function() {
                                t[0].object.material.opacity = 0,
                                hideHeadFlag = 1,
                                setTimeout(function() {
                                    app.showPage(3, i)
                                }, 100)
                            }, 200)
                        }).start()
                    } else
                        1 == clickFlag && t[0].object.name == lastHeadClicked;
                else
                    t.length > 0 && "coffeebean" === t[0].object.typeAdd ? 0 == clickFlag && (scene.children.forEach(function(e) {
                        "Sprite" == e.type && (e.material.opacity = 0)
                    }),
                    renderer.render(scene, camera),
                    app.showPage(3, 8),
                    clickFlag = 1) : t.length > 0 && "logo" === t[0].object.typeAdd ? 0 == clickFlag && (app.showPage(4),
                    clickFlag = 1) : t.length > 0 && "meteor" === t[0].object.typeAdd && 0 == clickFlag && (app.showDialog(1),
                    clickFlag = 1)
            }
            isUserInteracting = !1,
            setTimeout(function() {
                touchFlag = 0,
                touchmoveFlag = 0,
                app.lonLeft += cameraSetting.lon - touchstartLon
            }, 1e3)
        }
        function returnSky() {
            scene.children.forEach(function(e) {
                "Sprite" == e.type && (e.material.opacity = 1)
            }),
            angleLastClicked && (new TWEEN.Tween(cameraSetting).to({
                lon: angleLastClicked,
                lat: 0
            }, 2e3).easing(TWEEN.Easing.Circular.Out).start(),
            new TWEEN.Tween(camera.position).to({
                x: 0,
                y: 0,
                z: 0
            }, 2e3).easing(TWEEN.Easing.Circular.Out).start()),
            setTimeout(function() {
                clickFlag = 0,
                touchFlag = 0
            }, 500)
        }
        function onDocumentTouchMove(e) {
            1 === e.touches.length && (touchmoveFlag = 1,
            touchFlag = 1,
            e.preventDefault(),
            1 == e.touches.length && 0 == clickFlag && (e.preventDefault(),
            cameraSetting.lon = 1.1 * (onPointerDownPointerX - e.touches[0].pageX) + onPointerDownLon,
            cameraSetting.lat = 1.1 * (e.touches[0].pageY - onPointerDownPointerY) + onPointerDownLat))
        }
        function animate() {
            requestAnimationFrame(animate),
            render()
        }
        function render() {
            if (3 !== app.currentPage) {
                raycaster1.setFromCamera(centerCaster, camera);
                var e = raycaster1.intersectObjects(scene.children);
                if (e.length > 0 && "head" == e[0].object.typeAdd) {
                    e[0].object.material.opacity = 1;
                    var t = e[0].object.name;
                    hideHeadFlag && (t = null ),
                    scene.children.forEach(function(e) {
                        "head" == e.typeAdd && e.name != t && (clickFlag && allStartFlag ? e.material.opacity = 0 : e.material.opacity = .4)
                    })
                }
                if (particles.rotation.x -= 2e-4,
                particles.rotation.y += 5e-4,
                particles.rotation.z += 5e-4,
                particles2.rotation.x += 2e-4,
                particles2.rotation.y -= 5e-4,
                particles2.rotation.z -= 5e-4,
                TWEEN.update(),
                !clickFlag && !touchFlag) {
                    lastLon - app.lon > 330 ? lonCircleNum -= 1 : lastLon - app.lon < -330 && (lonCircleNum += 1);
                    var i;
                    i = app.isIos ? app.lon - 360 * lonCircleNum - app.lonFirst : app.lon - 360 * lonCircleNum - app.lonFirst,
                    new TWEEN.Tween(cameraSetting).to({
                        lon: i,
                        lat: app.lat
                    }, 1e3).easing(TWEEN.Easing.Circular.Out).start(),
                    lastLon = app.lon
                }
                cameraSetting.lat = Math.max(cameraLimit, Math.min(25, cameraSetting.lat)),
                phi = THREE.Math.degToRad(90 - cameraSetting.lat),
                theta = THREE.Math.degToRad(cameraSetting.lon),
                numx = 500 * Math.sin(phi) * Math.cos(theta),
                numy = 500 * Math.cos(phi),
                numz = 500 * Math.sin(phi) * Math.sin(theta),
                camera.lookAt({
                    x: numx,
                    y: numy,
                    z: numz
                }),
                renderer.render(scene, camera)
            }
        }
        Array.prototype.forEach1 = function(e) {
            for (var t = 0; t < this.length; t++)
                e.call(this[t])
        }
        ,
        Dot.prototype.paint = function() {
            var e = this;
            this.ctx.save();
            var t = (this.z + e.stage.focallength) / (2 * e.stage.focallength);
            this.ctx.fillStyle = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + "," + t + ")",
            this.ctx.fillRect(e.stage.canvas.width / 2 + (this.x - e.stage.canvas.width / 2), e.stage.canvas.height / 2 + (this.y - e.stage.canvas.height / 2), 2 * this.radius, 2 * this.radius),
            this.ctx.restore()
        }
        ,
        ParticalImg.prototype.init = function(e) {
            this.focallength = e.focallength || 250,
            this.particalRadius = e.particalRadius || 3,
            this.totalSteps = e.totalSteps || 100,
            this.canvas = e.canvas,
            this.targetImg = e.targetImg,
            this.imgBounder = e.targetImg.getBoundingClientRect(),
            this.stageBounder = e.stageDom.getBoundingClientRect(),
            this.canvas.width = this.stageBounder.width,
            this.canvas.height = this.stageBounder.height,
            this.context = this.canvas.getContext("2d")
        }
        ,
        ParticalImg.prototype.loadImg = function(e, t) {
            e.complete ? t.call(e) : e.onload = function() {
                t.call(this)
            }
        }
        ,
        ParticalImg.prototype.prepare = function() {
            var e = this
            , t = new Image;
            t.src = this.targetImg.src,
            e.loadImg(t, function() {
                e.context.drawImage(t, e.imgBounder.left - e.stageBounder.left, e.imgBounder.top - e.stageBounder.top, e.imgBounder.width, e.imgBounder.height),
                e.dots = e.getimgData(),
                e.initAnimate()
            })
        }
        ,
        ParticalImg.prototype.getimgData = function() {
            var e = this
            , t = e.context.getImageData(0, 0, e.canvas.width, e.canvas.height);
            e.context.clearRect(0, 0, e.canvas.width, e.canvas.height);
            for (var i = [], n = 0; n < t.width; n += e.particalRadius)
                for (var r = 0; r < t.height; r += e.particalRadius) {
                    var a = 4 * (r * t.width + n);
                    if (t.data[a + 3] > 128) {
                        var o = new Dot(e,n - e.particalRadius,r - e.particalRadius,0,e.particalRadius,{
                            a: t.data[a],
                            b: t.data[a + 1],
                            c: t.data[a + 2]
                        });
                        i.push(o)
                    }
                }
            return i
        }
        ,
        ParticalImg.prototype.initAnimate = function() {
            var e = this;
            this.dots.forEach1(function() {
                this.z = e.focallength,
                this.destX = getRandom(0, e.canvas.width),
                this.destY = getRandom(0, e.canvas.height),
                this.destZ = -e.focallength
            }),
            this.dots.forEach1(function() {
                this.paint()
            }),
            e.autoStart && (e.startTime = getTime(),
            setTimeout(function() {
                e.animate()
            }, 500))
        }
        ,
        ParticalImg.prototype.animate = function() {
            var e = this
            , t = e.dots;
            e.context.clearRect(0, 0, e.canvas.width, e.canvas.height),
            t.forEach1(function() {
                var t = this;
                Math.abs(t.destX - t.x) < .1 && Math.abs(t.destY - t.y) < .1 && Math.abs(t.destZ - t.z) < .1 ? (t.x = t.destX,
                t.y = t.destY,
                t.z = t.destZ,
                e.pause = !0) : (t.x = t.x + 1 * (t.destX - t.x) / e.totalSteps,
                t.y = t.y + 1 * (t.destY - t.y) / e.totalSteps,
                t.z = t.z + 1 * (t.destZ - t.z) / e.totalSteps,
                e.pause = !1),
                t.paint()
            }),
            e.pause ? (cancelAnimationFrame(e.requestId),
            e.onEnd()) : e.requestId = requestAnimationFrame(function() {
                e.animate()
            })
        }
        ,
        ParticalImg.prototype.onEnd = function() {}
        ,
        ParticalImg.prototype.start = function() {
            this.pause = !1,
            this.startTime = getTime(),
            this.animate()
        }
        ,
        ParticalImg.prototype.reset = function() {
            var e = this
            , t = e.dots;
            t.forEach1(function() {
                var e = this;
                e.x = e.startX,
                e.y = e.startY,
                e.z = e.startZ,
                e.paint()
            })
        }
        ;
        
        var container, group, particle, camera, scene, renderer, raycaster, raycaster1, mouse, cameraLimit = -70, hideHeadFlag = 0, centerCaster = new THREE.Vector2(0,0), numx, numy, numz, lastHeadClicked, angleLastClicked, projector = new THREE.Projector, clickFlag = 1, coffeeBeenAll = [], meteorAll = [], flashAll = [], touchFlag = 0, allStartFlag = 0, touchstartLon, texture_placeholder, isUserInteracting = !1, onMouseDownMouseX = 0, onMouseDownMouseY = 0, onMouseDownLon = 0, onMouseDownLat = 0, phi = 0, theta = 0, target = new THREE.Vector3, cameraSetting = {
            lon: 90,
            lat: -90
        }, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, particles, uniforms, PARTICLE_SIZE = 20, INTERSECTED, touchmoveFlag = 0;
        init(),
        animate();
        var lastLon = 0
        , lonCircleNum = 0;
        app.loader = function() {
            function e(e, t) {
                for (var i = 0; i < e.length; i++)
                    e[i] == t && (e[i] = e[e.length - 1],
                    e.pop())
            }
            function t(e, t, i) {
                this.imgs = e,
                this.id = t,
                this.each = i && i.each || function() {}
                ,
                this.all = i && i.all || function() {}
                ,
                this.onProcessChange = i && i.onProcessChange || function() {}
                ,
                this.isFinish = !1,
                this._paused = !1,
                this._numItems = 0,
                this._numLoadings = 0,
                this._numItemsLoaded = 0,
                this._loadedPercent = 0,
                this._maxConnections = 4,
                this._loadQueueBackup = [],
                this._loadQueue = [],
                this._loadedQueue = [],
                this._loadingQueue = [],
                this._loadfiles()
            }
            function i() {
                this.manifest = null ,
                this.useXML = !0,
                this.onEachFrontImgLoaded = null ,
                this.onAllFrontImgLoaded = null ,
                this.onFrontProcessChange = null ,
                this.showPageNo = 0,
                this.currentTask = null ,
                this._rawTaskQueue = [],
                this._doneTaskQueue = [],
                this._waitingTaskQueue = []
            }
            return t.prototype = {
                load: function() {
                    this._paused = !1,
                    this._loadNext()
                },
                pause: function(e) {
                    for (var t = 0; t < this._loadingQueue.length; t++) {
                        var i = this._loadingQueue[t];
                        i.setAttribute("data-loaded", "unload"),
                        i.onload = null ,
                        i.onerror = null ,
                        i.src = "",
                        this._loadQueue.push(i)
                    }
                    this._numLoadings = 0,
                    this._loadingQueue = [],
                    this._paused = !0
                },
                _loadfiles: function() {
                    this._numItems = this.imgs.length;
                    for (var e = 0; e < this.imgs.length; e++) {
                        var t = this.imgs[e].getAttribute("data-src");
                        t || (t = this.imgs[e].src,
                        this.imgs[e] = new Image),
                        this.imgs[e].url = t,
                        this.imgs[e].setAttribute("data-loaded", "unload"),
                        this.imgs[e].percent = 0,
                        this._loadQueue.push(this.imgs[e]),
                        this._loadQueueBackup.push(this.imgs[e])
                    }
                },
                _loadNext: function() {
                    if (0 === this._numItems) {
                        var e = this;
                        return this.isFinish = !0,
                        this._paused = !0,
                        $("body").trigger("taskFinished", [e.id]),
                        void (e.all && e.all.call(app.loader))
                    }
                    if (!this._paused)
                        for (var t = 0; t < this._loadQueue.length && !(this._numLoadings >= this._maxConnections); t++) {
                            var i = this._loadQueue[t];
                            i.setAttribute("data-loaded", "loading"),
                            this._loadingQueue.push(i),
                            this._numLoadings++,
                            this._loadQueue.splice(t, 1),
                            t--,
                            this._loadImg(i)
                        }
                },
                _loadImg: function(e) {
                    var t = this;
                    e.setAttribute("data-loaded", "loading"),
                    e.src = e.url,
                    e.complete ? (e.setAttribute("data-loaded", "loaded"),
                    t._onImgLoaded(e)) : (e.onload = function() {
                        e.setAttribute("data-loaded", "loaded"),
                        t._onImgLoaded(e),
                        e.onload = null 
                    }
                    ,
                    e.onerror = function() {
                        e.setAttribute("data-loaded", "error"),
                        t._onImgLoaded(e),
                        e.onerror = null 
                    }
                    )
                },
                _onImgLoaded: function(t) {
                    this._numLoadings--,
                    this._numItemsLoaded++,
                    e(this._loadingQueue, t),
                    this._loadedQueue.push(t);
                    var i = this;
                    this.onProcessChange instanceof Function && (i._loadedPercent = this._numItemsLoaded / this._numItems,
                    i.onProcessChange && this.onProcessChange.call(t, {
                        img: t,
                        src: t.src,
                        index: this._numItemsLoaded,
                        percent: i._loadedPercent
                    })),
                    this._numItemsLoaded >= this._numItems && (i.isFinish = !0,
                    i._paused = !0,
                    $("body").trigger("taskFinished", [i.id]),
                    i.all && this.all.call(app.loader)),
                    this._loadNext()
                }
            },
            i.prototype = {
                init: function(e) {
                    this.manifest = e.manifest,
                    this.firstTaskId = e.firstTaskId,
                    this.onEachFrontImgLoaded = e.onEachFrontImgLoaded,
                    this.onFrontProcessChange = e.onFrontProcessChange,
                    this.onAllFrontImgLoaded = e.onAllFrontImgLoaded;
                    for (var t = this, i = t.manifest, n = 0, r = i.length; r > n; n++) {
                        for (var a = this._getImgArray(i[n].selector), o = [], s = 0; i[n].imgs && s < i[n].imgs.length; s++) {
                            var c = new Image;
                            c.setAttribute("data-src", i[n].imgs[s]),
                            o.push(c)
                        }
                        Array.prototype.push.apply(o, a),
                        t.addTask(o, i[n].id)
                    }
                    $("body").on("taskFinished", function(e, i) {
                        t.currentTask = t.getNextTask(),
                        -1 == t.currentTask ? t.allTaskDoneCallback() : t.currentTask.load()
                    })
                },
                start: function(e) {
                    this.currentTask = this.getNextTask(e),
                    this.currentTask.onProcessChange = this.onFrontProcessChange,
                    this.currentTask.all = this.onAllFrontImgLoaded,
                    this.currentTask.load()
                },
                addTask: function(e, i) {
                    var n = new t(e,i);
                    this._rawTaskQueue.push(n),
                    this._waitingTaskQueue.push(n)
                },
                allTaskDoneCallback: function() {},
                isTaskDone: function(e) {
                    for (var t = 0, i = this._rawTaskQueue.length; i > t; t++)
                        if (this._rawTaskQueue[t].id == e)
                            return this._rawTaskQueue[t].isFinish;
                    return -1
                },
                getNextTask: function(e) {
                    var t = this
                    , i = 0
                    , n = t._rawTaskQueue.length;
                    if (void 0 !== e && null  !== e && "" !== e)
                        for (i = 0; n > i; i++)
                            if (t._rawTaskQueue[i].id == e)
                                return t._rawTaskQueue[i];
                    for (i = 0; n > i; i++)
                        if (t._rawTaskQueue[i].isFinish !== !0)
                            return t._rawTaskQueue[i];
                    return i == n ? -1 : void 0
                },
                _getImgArray: function() {
                    for (var e = [], t = [], i = 0; i <= arguments.length; i++)
                        t = Array.prototype.slice.call(document.querySelectorAll(arguments[i])),
                        Array.prototype.push.apply(e, t);
                    return e
                }
            },
            new i
        }(),
        function(e) {
            var t, i, n = {
                init: function(r) {
                    return this.each(function() {
                        var a = e(this)
                        , o = a.data("eraser");
                        if (!o) {
                            var s = function() {
                                var s = e("<canvas/>")
                                , c = s.get(0)
                                , h = c.getContext("2d")
                                , l = window.devicePixelRatio || 1
                                , u = h.webkitBackingStorePixelRatio || h.mozBackingStorePixelRatio || h.msBackingStorePixelRatio || h.oBackingStorePixelRatio || h.backingStorePixelRatio || 1
                                , p = l / u
                                , d = parseInt(a.width()) + 1
                                , f = parseInt(a.height()) + 1
                                , E = parseInt(d * p) + 1
                                , m = parseInt(f * p) + 1
                                , g = a.offset()
                                , v = !r || r.enabled !== !1
                                , T = (r && r.size ? r.size : 40) * p
                                , y = r && r.completeRatio ? r.completeRatio : .7
                                , R = r && r.completeFunction ? r.completeFunction : null 
                                , x = r && r.progressFunction ? r.progressFunction : null 
                                , H = "auto" == a.css("z-index") ? 1 : a.css("z-index")
                                , b = []
                                , M = Math.floor(E / T)
                                , _ = M * Math.floor(m / T)
                                , w = _
                                , S = a[0];
                                for (a.after(s),
                                c.id = S.id,
                                c.className = S.className,
                                c.width = E,
                                c.height = m,
                                c.style.width = d.toString() + "px",
                                c.style.height = f.toString() + "px",
                                h.drawImage(S, 0, 0, E, m),
                                a.remove(),
                                h.globalCompositeOperation = "destination-out",
                                h.strokeStyle = "rgba(255,0,0,255)",
                                h.lineWidth = T,
                                h.lineCap = "round",
                                s.bind("mousedown.eraser", n.mouseDown),
                                s.bind("touchstart.eraser", n.touchStart),
                                s.bind("touchmove.eraser", n.touchMove),
                                s.bind("touchend.eraser", n.touchEnd); w--; )
                                    b.push(1);
                                t = g.left,
                                i = g.top,
                                o = {
                                    posX: 0,
                                    posY: 0,
                                    touchDown: !1,
                                    touchID: -999,
                                    touchX: 0,
                                    touchY: 0,
                                    ptouchX: 0,
                                    ptouchY: 0,
                                    canvas: s,
                                    ctx: h,
                                    w: E,
                                    h: m,
                                    scaleRatio: p,
                                    source: S,
                                    size: T,
                                    parts: b,
                                    colParts: M,
                                    numParts: _,
                                    ratio: 0,
                                    enabled: v,
                                    complete: !1,
                                    completeRatio: y,
                                    completeFunction: R,
                                    progressFunction: x,
                                    zIndex: H
                                },
                                s.data("eraser", o),
                                e(window).resize(function() {
                                    var e = s.offset();
                                    o.posX = e.left,
                                    o.posY = e.top
                                })
                            }
                            ;
                            this.complete && this.naturalWidth > 0 ? s() : a.load(s)
                        }
                    })
                },
                touchStart: function(e) {},
                touchMove: function(e) {},
                touchEnd: function(e) {},
                evaluatePoint: function(e, t, i) {
                    if (e.enabled) {
                        var n = Math.floor(t / e.size) + Math.floor(i / e.size) * e.colParts;
                        n >= 0 && n < e.numParts && (e.ratio += e.parts[n],
                        e.parts[n] = 0,
                        e.complete || (n = e.ratio / e.numParts,
                        n >= e.completeRatio ? (e.complete = !0,
                        null  != e.completeFunction && e.completeFunction()) : null  != e.progressFunction && e.progressFunction(n)))
                    }
                },
                mouseDown: function(e) {},
                mouseMove: function(e) {
                    e.preventDefault()
                },
                mouseUp: function(e) {},
                clear: function() {
                    var t = e(this)
                    , i = t.data("eraser");
                    if (i) {
                        i.ctx.clearRect(0, 0, i.w, i.h);
                        for (var n = i.numParts; n--; )
                            i.parts[n] = 0;
                        i.ratio = i.numParts,
                        i.complete = !0,
                        null  != i.completeFunction && i.completeFunction()
                    }
                },
                moveSelf: function(t) {
                    var i = e(this)
                    , r = i.data("eraser")
                    , a = t.x - r.posX
                    , o = t.y - r.posY;
                    a *= r.scaleRatio,
                    o *= r.scaleRatio,
                    n.evaluatePoint(r, a, o),
                    r.ctx.beginPath(),
                    r.ctx.moveTo(t.x, t.y),
                    r.ctx.lineTo(a, o),
                    r.ctx.stroke(),
                    i.css({
                        "z-index": i.css("z-index") == r.zIndex ? parseInt(r.zIndex) + 1 : r.zIndex
                    })
                },
                enabled: function() {
                    var t = e(this)
                    , i = t.data("eraser");
                    return !(!i || !i.enabled)
                },
                enable: function() {
                    var t = e(this)
                    , i = t.data("eraser");
                    i && (i.enabled = !0)
                },
                disable: function() {
                    var t = e(this)
                    , i = t.data("eraser");
                    i && (i.enabled = !1)
                },
                size: function(t) {
                    var i = e(this)
                    , n = i.data("eraser");
                    n && t && (n.size = t,
                    n.ctx.lineWidth = t)
                },
                reset: function() {
                    var t = e(this)
                    , i = t.data("eraser");
                    if (i) {
                        i.ctx.globalCompositeOperation = "source-over",
                        i.ctx.drawImage(i.source, 0, 0, i.w, i.h),
                        i.ctx.globalCompositeOperation = "destination-out";
                        for (var n = i.numParts; n--; )
                            i.parts[n] = 1;
                        i.ratio = 0,
                        i.complete = !1,
                        i.touchDown = !1
                    }
                },
                progress: function() {
                    var t = e(this)
                    , i = t.data("eraser");
                    return i ? i.ratio / i.numParts : 0
                }
            };
            e.fn.eraser = function(t) {
                return n[t] ? n[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not yet exist on jQuery.eraser") : n.init.apply(this, arguments)
            }
        }(Zepto),
        app.bgm = function() {
            function e() {
                return c.hasIcon ? (h.css({
                    position: "fixed",
                    left: "18px",
                    top: "20px",
                    width: "30px",
                    height: "30px",
                    "z-index": "999"
                }),
                h.on("touchstart", function(e) {
                    return e.preventDefault(),
                    e.stopPropagation(),
                    o.paused ? t() : i(),
                    !1
                }),
                void h.appendTo($("body"))) : (c.iOn = "",
                c.iOff = "",
                !1)
            }
            function t() {
                o.play(),
                h[0].src = c.iOn,
                h.removeClass("tag-music-off")
            }
            function i() {
                o.pause(),
                h[0].src = c.iOff,
                h.addClass("tag-music-off")
            }
            function n() {
                o = c.audio || new Audio,
                o.volume = 1,
                o.loop = !0,
                o.autoPlay = !0,
                o.src = c.src,
                $(".p0,.p1,.dialog0").one("touchend", function() {
                    h.hasClass("tag-music-on") && t()
                }),
                t()
            }
            function r(t) {
                c = $.extend(c, t),
                e(),
                n()
            }
            function a(e) {
                var n = o.paused;
                e = s + e,
                i(),
                o.src = e,
                n || t()
            }
            var o, s = app.root, c = {
                hasIcon: "true",
                audio: "",
                iOn: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAbFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8+T+BWAAAAI3RSTlMAETws8TgF6uKn9tK1liAY187DhmkK325TTUbHvK2fjncyWvMShscAAAFYSURBVFjD7dfJcoMwEEXRFiABwjaDAc9T3v//Y1ykiORt+i2y0F3B5pQohKqRVCr13zKW621hyd6J6u1xIHt3qvdERfaQMb0DsGF6IwBL9nrH877wbk/2iHv6tHjesrwzlsqc5nHBDCv4onh2sUoAhWV4OVC3ImacUbwo3kWWphsqo/d2qOUnd0VN8MJx0BaEo8YET564ELxruC70R82EIdzcsRVt8TMe0ai9mNjBO61XxEvyaNXeLKEKudarKgl1BK/88HZarytiHE7rNbHnK9HWI/5YbmpviLwMI8GbwvDhW7W3gZG1+ipMz5UnvVeHLZf1QvW2GcG7/35i04Mz4K9eNqmg9nw8W/P2Xuvr0Ghjg6WuY8zPZkBI77UNonL16j44GP2WiyspI1+o1no3fHTUeh5xs1Nyjrw8mRH1YPzyhvaiz/SrtrHCyB2GAr5/5JJKpVJ/6BsLSCpoiNaQXgAAAABJRU5ErkJggg==",
                iOff: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMAeOUVGnXhHtxz3hH4IQQr0reolzfrUDzxw49q18qHMQ0IsJ9YDGRJQi33bi0AAAILSURBVFjD7ZbbsqIwEEUbwkVJQAREBO/Ouez//8HBVM4Qhnmhw9MU64myylVttXs3tLKy8r/TolrUV6Je1HdFt7DvtajPQ7SwD0di8yHpL7bAnq1L262gMR3A/sfIEpswoBGfAPKM57uHCXwvGH37F3quxCPwfGy2YuJDzRWGG/heTAO19qnKYcIotCb8guawYwpjL0JiTfgNI7wxhSKM4A8THuEqjEdLqdDjHwA0FXfC7XspAWl2QNE/ys8Ezc1hKclWGN+FNI8nIsn+yQkiL9WPKMyH2V4/shCeb5YSD3UgGn7VpL1QZ1la9RLiQlyEyfIdp6EvGv5xykyWH5aPXihJw89yiotdDjnxETrLtiKGyohP+s6yOtOAQkAafpZxsBQ+TM84ZFlZBXvWPqcJlS7YpXwUHIDoz4QRHuTIWZksv1ERuXLBULAST2ffCalOSqDLulvA9xChKdhOCWffHvfsp2CLPS3gk+/G1lk+1O6+AvFPwZY5LeMzBduUsbvvhd1wlz33fZTGR0Fp7jIT8V1/VbL3mbNrlsL8yV0OzeaM4+hliTWhOGHgOHpZisJ4vi6Hxc4+AZyl3HPYyNEJYCylgI3/r7s8R3fEiGJ6l5PwY4bviRH15KZs0M7xKdgk2fSmtOkMXTYZbyKUNIcEFi05c8XAldyRFxj2FS1B1p0aqLy90crKygqD34kwQDsg5OkCAAAAAElFTkSuQmCC",
                src: s + "assets/media/bgm.mp3"
            }, h = $('<img id="icon-bgm">');
            return {
                audio: o,
                init: r,
                change: a,
                play: t,
                pause: i
            }
        }(),
        function() {
            app.initPages = function() {
                $.each(app.pages, function(e, t) {
                    app.pages[e].init && app.pages[e].init()
                }),
                $.each(app.dialogs, function(e, t) {
                    app.dialogs[e].init && app.dialogs[e].init()
                })
            }
            ,
            app.showPage = self.showPage = function(e, t) {
                var i = app.currentPage;
                if (0 !== i && !app.pages[i].isFlipReady)
                    return !1;
                if (app.pages[e]) {
                    var n = app.pages[e].dependingTask;
                    if (app.isMultiLoad && !app.loader.isTaskDone(n)) {
                        $(".dialog100").show();
                        var r = app.loader.currentTask;
                        return r.id != n && (r.pause(),
                        r = app.loader.getNextTask(n),
                        r.load()),
                        r.all = function() {
                            app.showPage(e)
                        }
                        ,
                        !1
                    }
                    $(".dialog100").hide(),
                    app.pages[e].hasBranch && (t || (t = 1),
                    app.currentBranch = t,
                    $(".p" + e).find(".branch").hide(),
                    $(".p" + e + "-" + t).show()),
                    $(".page").fadeOut(500),
                    $(".p" + e).fadeIn(500),
                    app.pages[i] && app.pages[i].onLeave && app.pages[i].onLeave(),
                    app.pages[e].onLoad && app.pages[e].onLoad(),
                    app.currentPage = e;
                }
            }
            ,
            app.showDialog = function(e) {
                $(".dialog").fadeOut(500),
                $(".dialog" + e).fadeIn(500)
            }
        }(),
        app.common = function() {
            function e(e, n, r) {
                var a, o;
                i / t >= n / r ? (a = t,
                o = t * n / r) : (a = i * r / n,
                o = i),
                e.css({
                    width: a,
                    height: o
                })
            }
            var t = $(window).width()
            , i = $(window).height()
            , n = function() {
                var e = navigator.userAgent.toLowerCase()
                , t = {
                    ua: e,
                    isAndroid: /Android/i.test(e),
                    isIos: /iPhone|iPad|iPod/i.test(e),
                    isBlackberry: /BlackBerry/i.test(e),
                    isWindowsPhone: /IEMobile/i.test(e)
                };
                return t.isMoblie = t.isAndroid || t.isIos || t.isBlackberry || t.isWindowsPhone,
                t.isPC = !t.isMoblie,
                t
            }();
            return {
                initContentBox: e,
                browser: n
            }
        }(),
        app.pages[1] = function() {
            function e() {
                $(".dialog4").on("click", function() {
                    $(".dialog4-text-box").fadeIn(500)
                }),
                $(".dialog4-close").on("touchstart", function(e) {
                    e.preventDefault(),
                    $(".dialog4").fadeOut(500, function() {
                        r()
                    })
                }),
                i()
            }
            function t(e) {
                //1 == c && e.beta - f > 5 && (c = 0,
                e = {alpha:10};
                (true,
                $(".dialog2").addClass("pagemovedown"),
                $(".p1-box").addClass("pagemovedown"),
                $(".p2").show(),
                a(),
                setTimeout(function() {
                    app.addHead(),
                    app.addCoffee(),
                    app.addLogo()
                }, 1e3));
                var t = e.alpha >> 0;
                !d && t && (d++,
                h = t),
                app.isIos || (t > h ? t -= h : t += 360 - h),
                e.webkitCompassHeading ? app.lon = e.webkitCompassHeading + app.lonLeft : app.lon = 360 - t + app.lonLeft,
                app.lat = e.beta - 90
            }
            function i() {
                //window.DeviceOrientationEvent && window.addEventListener("deviceorientation", t, !1)
                window.addEventListener("touchstart", t, !1)
            }
            function n() {
                setTimeout(function() {
                    return l > 0 && u > 0 ? !1 : (r(),
                    void (s.isFlipReady = !0))
                }, 1e3)
            }
            function r() {
                $(".p1-start,.p1-bg").fadeIn(1e3, function() {
                    addMeteor1(),
                    startMeteors1(),
                    $(".p1-people-box,.p1-people-shadow").fadeIn(1e3, function() {
                        $(".p1-text-hide1").fadeIn(2e3, function() {
                            setTimeout(function() {
                                $(".p1-text-hide1").fadeOut(1e3, function() {
                                    $(".p1-text-hide2").fadeIn(2e3, function() {
                                        setTimeout(function() {
                                            $(".p1-text-hide2").fadeOut(1e3, function() {
                                                c = 1,
                                                $(".dialog2").fadeIn(500),
                                                $(".upphone1-img").addClass("upphone-hand")
                                            })
                                        }, 2e3)
                                    })
                                })
                            }, 1e3)
                        })
                    })
                })
            }
            function a() {
                new TWEEN.Tween(cameraSetting).to({
                    lon: 90,
                    lat: 0
                }, 6e3).easing(TWEEN.Easing.Linear.None).onComplete(function() {
                    cameraLimit = -25,
                    app.showPage(2)
                }).delay(1500).start()
            }
            function o() {
                s.isFlipReady = !1,
                setTimeout(function() {
                    clickFlag = 0,
                    touchFlag = 0,
                    addMeteor(),
                    addMeteorFlash(),
                    startMeteors(),
                    app.lonFirst = app.lon - 90
                }, 200)
            }
            var s = {
                init: e,
                onLoad: n,
                onLeave: o,
                dependingTask: "p1",
                isFlipReady: !1,
                hasBranch: !1
            }
            , c = 0;
            app.lonLeft = 0;
            var h = null 
            , l = navigator.userAgent.indexOf("HUAWEI")
            , u = navigator.userAgent.indexOf("MicroMessenger")
            , p = navigator.userAgent.indexOf("OS 8");
            l > 0 && u > 0 && ($(".p1-bg").hide(),
            $(".dialog4").show());
            var d = 0
            , f = 90;
            p > 0 && (f = 60),
            app.isIos = function() {
                var e = "undefined" != typeof navigator ? navigator.userAgent : "";
                return /iPhone|iPad|iPod/i.test(e)
            }(),
            app.addCoffee = function() {
                for (var e = 0; 16 > e; e++) {
                    var t = g["img" + (e + 1)]
                    , i = (new THREE.TextureLoader).load("assets/images/rose9.png")
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
                    coffeeBeenAll.push(r),
                    scene.add(r)
                }
            }
            ,
            app.addLogo = function() {
                return;
                for (var e = 0; 11 > e; e++) {
                    var t = m["img" + (e + 1)]
                    , i = (new THREE.TextureLoader).load("img/" + t.src + ".png")
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
                    r.typeAdd = t.type,
                    coffeeBeenAll.push(r),
                    scene.add(r)
                }
            }
            ,
            app.addHead = function() {
                for (var e = 0; 7 > e; e++) {
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
            }
            ;
            var E = {
                head1: {
                    scale: 1.6,
                    angle: 26,
                    y: -1
                },
                head2: {
                    scale: 1,
                    angle: 50,
                    y: -.5
                },
                head3: {
                    scale: .9,
                    angle: 84,
                    y: 0
                },
                head4: {
                    scale: 1.8,
                    angle: 84,
                    y: -1.5
                },
                head5: {
                    scale: 1.5,
                    angle: 110,
                    y: 1
                },
                head6: {
                    scale: 1,
                    angle: 136,
                    y: -1
                },
                head7: {
                    scale: 1.6,
                    angle: 165,
                    y: .5
                },
                head8: {
                    scale: 1.6,
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
                    scale: 1.8,
                    angle: 264,
                    y: -1.5
                },
                head12: {
                    scale: 1.5,
                    angle: 282,
                    y: 1
                },
                head13: {
                    scale: 1,
                    angle: 316,
                    y: -1
                },
                head14: {
                    scale: 1.6,
                    angle: 345,
                    y: .7
                }
            }
            , m = {
                img1: {
                    scale: 3.5,
                    angle: 30,
                    y: 2.5,
                    src: "sky_logo",
                    type: "logo"
                },
                img2: {
                    scale: 3.5,
                    angle: 110,
                    y: -3,
                    src: "sky_logo",
                    type: "logo"
                },
                img3: {
                    scale: 3.5,
                    angle: 210,
                    y: 2.5,
                    src: "sky_logo",
                    type: "logo"
                },
                img4: {
                    scale: 3.5,
                    angle: 290,
                    y: -2.5,
                    src: "sky_logo",
                    type: "logo"
                },
                img5: {
                    scale: 1.5,
                    angle: 9,
                    y: 2,
                    src: "bottle1",
                    type: "coffeebean"
                },
                img6: {
                    scale: 1.5,
                    angle: 64,
                    y: 2.3,
                    src: "bottle2",
                    type: "coffeebean"
                },
                img7: {
                    scale: 1.5,
                    angle: 140,
                    y: 3,
                    src: "bottle3",
                    type: "coffeebean"
                },
                img8: {
                    scale: 1.5,
                    angle: 189,
                    y: 2,
                    src: "bottle1",
                    type: "coffeebean"
                },
                img9: {
                    scale: 1.5,
                    angle: 244,
                    y: -2.3,
                    src: "bottle2",
                    type: "coffeebean"
                },
                img10: {
                    scale: 1.5,
                    angle: 320,
                    y: 3,
                    src: "bottle3",
                    type: "coffeebean"
                },
                img11: {
                    scale: 4,
                    angle: 350,
                    y: -2.9,
                    src: "sky_logo",
                    type: "logo"
                }
            }
            , g = {
                img1: {
                    scale: 1,
                    angle: 6,
                    y: 4
                },
                img2: {
                    scale: 1,
                    angle: 50,
                    y: -5
                },
                img3: {
                    scale: .8,
                    angle: 64,
                    y: .5
                },
                img4: {
                    scale: .7,
                    angle: 84,
                    y: 2.5
                },
                img5: {
                    scale: .6,
                    angle: 108,
                    y: -1
                },
                img6: {
                    scale: .8,
                    angle: 140,
                    y: 1
                },
                img7: {
                    scale: .6,
                    angle: 152,
                    y: -3.5
                },
                img8: {
                    scale: .5,
                    angle: 170,
                    y: -2
                },
                img9: {
                    scale: 1,
                    angle: 186,
                    y: 4
                },
                img10: {
                    scale: 1,
                    angle: 218,
                    y: -4
                },
                img11: {
                    scale: .8,
                    angle: 244,
                    y: -.5
                },
                img12: {
                    scale: .7,
                    angle: 264,
                    y: 2.5
                },
                img13: {
                    scale: .6,
                    angle: 288,
                    y: -1
                },
                img14: {
                    scale: .8,
                    angle: 320,
                    y: 1
                },
                img15: {
                    scale: .6,
                    angle: 332,
                    y: -3.5
                },
                img16: {
                    scale: .5,
                    angle: 343,
                    y: -5.5
                }
            };
            return s
        }(),
        app.pages[2] = function() {
            function e() {
                t()
            }
            function t() {
                var e = 1;
                setInterval(function() {
                    $(".p2-monet-starlight" + e).addClass("starlight-blink"),
                    e++
                }, 350),
                e == $(".p2-monet-starlight").length && clearInterval(),
                $(".meteor-anim6").on("touchstart", function(e) {
                    e.preventDefault(),
                    $(".dialog1").fadeIn()
                }),
                $(".p2-frame-close").on("touchstart", function(e) {
                    e.preventDefault(),
                    setTimeout(function() {
                        clickFlag = 0,
                        touchFlag = 0
                    }, 300),
                    $(".dialog1").fadeOut()
                })
            }
            function i() {
                1 != $(".dialog3").data("i") && ($(".dialog3").data("i", "1"),
                app.showpageNum > 0 && (clickFlag = 0,
                touchFlag = 0,
                addMeteor(),
                addMeteorFlash(),
                startMeteors(),
                app.lonFirst = app.lon - 90),
                $(".dialog3").fadeIn(500, function() {
                    setTimeout(function() {
                        $(".dialog").fadeOut(500),
                        allStartFlag = 1
                    }, 2e3)
                })),
                setTimeout(function() {
                    r.isFlipReady = !0
                }, 1e3)
            }
            function n() {
                $(".meteor6").removeClass("meteor-anim6"),
                r.isFlipReady = !1
            }
            var r = {
                init: e,
                onLoad: i,
                onLeave: n,
                dependingTask: "p2",
                isFlipReady: !1,
                hasBranch: !0
            };
            return r
        }(),
        app.pages[3] = function() {
            function e() {
                i()
            }
            function t(e, t) {
                return parseInt(Math.round(Math.random() * (t - e) + e))
            }
            function i() {
                $(".p3-btn").on("touchstart", function(e) {
                    var i = app.currentBranch;
                    setTimeout(function() {
                        $(".p3-picture-" + i).show(),
                        $(".p3-picture-name" + i).show();
                        var e = t(1, 5e4);
                        $(".pic" + i).hide().attr("src", "img/pic" + i + ".gif?v=" + e),
                        $(".p3-hand").show()
                    }, 1e3),
                    app.showPage(2)
                }),
                $(".p3-pic-box").on("touchstart", function(e) {
                    var t = $(this).data("id");
                    $(".pic" + t).show(),
                    $(".p3-picture-" + t).hide(),
                    $(".p3-picture-name" + t).fadeOut(500),
                    e.preventDefault(),
                    e.stopPropagation(),
                    $(".p3-hand").fadeOut(500)
                })
            }
            function n() {
                "1" !== $(".p3-picture-" + app.currentBranch).data("done") && ($(".pic" + app.currentBranch).attr("src", "img/pic" + app.currentBranch + ".gif?v=" + app.firstRandom),
                $(".p3-picture-" + app.currentBranch).data("done", "1")),
                $(".coffeebean1").addClass("p3-coffeebean-anim1"),
                $(".coffeebean2").addClass("p3-coffeebean-anim2"),
                $(".coffeebean3").addClass("p3-coffeebean-anim3"),
                8 == app.currentBranch ? ($(".coffeebean3").addClass("coffeebean8"),
                $(".p3-logo").hide()) : $(".p3-invite-friends").addClass("invite-friends-blink"),
                $(".p3-start").addClass("p3-start-rotate"),
                setTimeout(function() {
                    a.isFlipReady = !0
                }, 1e3)
            }
            function r() {
                hideHeadFlag = 0,
                returnSky(),
                $(".p3-invite-friends").removeClass("invite-friends-blink"),
                setTimeout(function() {
                    $(".coffeebean1").removeClass("p3-coffeebean-anim1"),
                    $(".coffeebean2").removeClass("p3-coffeebean-anim2"),
                    $(".coffeebean3").removeClass("p3-coffeebean-anim3"),
                    $(".coffeebean3").removeClass("coffeebean8"),
                    $(".p3-start").removeClass("p3-start-rotate"),
                    $(".p3-logo").show(),
                    $(".p3-hand").show(),
                    $(".p3-picture-name").show(),
                    $(".p3-picture-on").show()
                }, 500),
                a.isFlipReady = !1
            }
            var a = {
                init: e,
                onLoad: n,
                onLeave: r,
                dependingTask: "p3",
                isFlipReady: !1,
                hasBranch: !0
            };
            return a
        }(),
        app.pages[4] = function() {
            function e() {
                t()
            }
            function t() {
                $(".p4-close").on("touchstart", function(e) {
                    setTimeout(function() {
                        clickFlag = 0
                    }, 500),
                    app.showPage(2)
                })
            }
            function i() {
                $(".p4-outer").addClass("p4-outer-rotate"),
                $(".p4-outer1").addClass("p4-outer1-rotate"),
                $(".p4-inner").addClass("starlight-blink"),
                $(".p4-meteor").addClass("p4-meteor-anim"),
                setTimeout(function() {
                    r.isFlipReady = !0
                }, 1e3)
            }
            function n() {
                $(".p4-outer").removeClass("p4-outer-rotate"),
                $(".p4-outer1").removeClass("p4-outer1-rotate"),
                $(".p4-inner").removeClass("starlight-blink"),
                $(".p4-meteor").removeClass("p4-meteor-anim"),
                r.isFlipReady = !1
            }
            var r = {
                init: e,
                onLoad: i,
                onLeave: n,
                dependingTask: "p4",
                isFlipReady: !1,
                hasBranch: !0
            };
            return r
        }(),
        $(function() {
            function e(e, t) {
                return parseInt(Math.round(Math.random() * (t - e) + e))
            }
            function t() {
                $(".btn-prev").click(function(e) {
                    e.preventDefault(),
                    app.pages[app.currentPage - 1] && app.showPage(app.currentPage - 1)
                }),
                $(".btn-next").click(function(e) {
                    e.preventDefault(),
                    app.pages[app.currentPage + 1] && app.showPage(app.currentPage + 1)
                }),
                $(".btn-touchable").on("touchstart", function() {
                    $(this).addClass("touched")
                }),
                $(".btn-touchable").on("touchend", function() {
                    $(this).removeClass("touched")
                })
            }
            function i(e, t) {
                var i = 0
                , n = function() {
                    r = setInterval(function() {
                        i += 1 | 3 * Math.random(),
                        i >= 79 && (i = 79,
                        clearInterval(r)),
                        a(i)
                    }, 150)
                }
                , a = function(e) {
                    $(".p0-process").text(e + "%")
                }
                ;
                $(".cssloader").hide(),
                app.showpageNum > 0 || ($(".p0").show(),
                n()),
                app.loader.init({
                    manifest: [{
                        id: "p1",
                        selector: ".p1 img",
                        imgs: ["assets/images/sky.jpg"]
                    }, {
                        id: "p2",
                        selector: ".p2 img",
                        imgs: ["assets/images/rose1.png", "assets/images/rose2.png", "assets/images/rose3.png", "assets/images/rose4.png", "assets/images/rose5.png", "assets/images/rose6.png", "assets/images/rose7.png", "assets/images/rose5.png", "assets/images/rose3.png", "assets/images/rose2.png"]
                    }, {
                        id: "p3",
                        selector: ".p3 img",
                        imgs: []
                    }, {
                        id: "p4",
                        selector: ".p4 img"
                    }],
                    onAllFrontImgLoaded: function(n) {
                        clearInterval(r),
                        i = 80,
                        r = setInterval(function() {
                            i += 3,
                            i >= 100 && (i = 100,
                            clearInterval(r),
                            app.showPage(e, t)),
                            a(i)
                        }, 20)
                    }
                }),
                app.loader.showPageNo = e,
                app.loader.start("p" + e)
            }
            function n() {
                app.initPages(),
                app.showpageNum > 0 ? (cameraLimit = -25,
                i(2),
                app.addHead(),
                app.addCoffee(),
                app.addLogo()) : i(1),
                app.common.initContentBox($(".content"), 5, 3),
                t(),
                app.bgm && app.bgm.init({
                    iOn: "img/music_on.png",
                    iOff: "img/music_off.png"
                })
            }
            var r = 0;
            app.showpageNum = window.location.search.indexOf(page = 2),
            app.firstRandom = e(1, 5e4),
            $(".p3").on("touchstart", function(e) {
                e.stopPropagation()
            }),
            $(".p3").on("touchmove", function(e) {
                e.stopPropagation()
            }),
            $(".p4").on("touchstart", function(e) {
                e.stopPropagation()
            }),
            $(".p4").on("touchmove", function(e) {
                return e.stopPropagation(),
                !1
            }),
            n()
        }),

        function() {
            function e() {
                a || (a = document.createElement("div"),
                a.style.background = "black",
                a.style.position = "fixed",
                a.style.width = "100%",
                a.style.height = "100%",
                a.style.left = 0,
                a.style.top = 0,
                a.style.textAlign = "center",
                a.style.zIndex = 1e6,
                a.style.overflow = "hidden",
                a.innerHTML = '<div  style="position: absolute; top: 50%;   left: 50%; -webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)"><img style="height:150px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADSBAMAAADJZwRlAAAAD1BMVEUAAAD7+/v+/v7////9/f2XbP5GAAAABXRSTlMA/mwzs0Mc0mcAAAlcSURBVHja7V1RdpswEFQlDlAwB5BMDiBsDmBC73+mNsVkjcdiLOtJ5r129dGXEprpanZYjUSsXg5jV6PDoW5H6TDTj0O1jEaG/hqtDLOMSZUN3bIMqtWoGlU0tPeRd/iTKhnuEn3L6FXB0PE/rWAGjTevZOOsCsVHXdcv1KSpC82xq/9E6x9Po9de23nAxaMqErr+G83ja5f+Z3/oD18aqd4Urg4j1K3XNpjBU5EpNuMVYDwNnVUFoqq/404Kh6+vTzL8ezLY1xJ2feXylV9/HVbyVTZGwQelvIcMzjUsCHfHwaFeBWtRymfQ1es4qH3FIjIS0766haqGsLvioKsxpu+2+XgzTqsx87cAB8caoz3Pi456Hn4eixzOoyf9bSaRWf7kGeztF4FVzkCROdoFb7MbDro7CawiSjkzB1FkDrcppRTTJMsZKHicJKdcbExmgNjJtLq5nfXW74GD44qCXqb9OYQfCDDfDAvrzIL4/VO8EhmvpzvczduLZC0yVXMPfCrJQS4yxkPx2PcC1OEehouN+VTZo1/3+qbD5La+EAd5J+NnDgLCsD2YfYr1XZtq7KOrTRkOcpFB/NuLlNwWNXYyqwxysdGByc8lMsMdB3kpdznbLRQZZ6WKEWFxDqLIQPfOxMZ0GVp+TM80SKkaG0b4Bg7qOTX6WgfAQRCbAhzEGm2uCPwXncy0sbA/FOEgzvAMoEE6cbHJwEFkl1XuJj1+Uy5tWQ7qK/evONXJw+N/G6Hp8tpv/Q0F2/m5r5GDIDZZOYhpsUupYDK42PisGTTXlDjS2YPYFOLgUrxzbrza5OBjR8RMWTPo5oWmvuZl5uCBt2aXrBxEkekXkWHJkFLOz0EUmaju0edfk6DIzF4kTPGm2JhPZqKnU1BEhnIQHRHkYD6RQS+Siw3elEtkkIJcbHJzcMncUiqUgyI2UsoGWqBsIrPQSXLCxSYvB5cmdcYZRScpZXZT+nLJishAcLFJNjD5RLXjuiSh3dou5YwcNLi3iRzkpQwczLPBaQUgtPykbyAmeupz7oO4a8+Ucp64Fq+B1SRwkPcNCcFobhcxlCmumthSTuKg+dwUmcsiMgLQ+Ogys0lMu0SJjESM2CQxrXlWZGSlG983JDHNPiEyhINcbFKeFg21BVe9p7EFxcYEb4Yt7FQH2Sf0A03M7lJkBnXLt215W2QDFIR/GgxMHj6+lBFGQ/Ye1hzssosNwrABkYEKNNEc7MDc5IEwPonIpHBwoXpIbE4fv/7E0W9LiSciE8VBNNGDYmM+JEl+S0oOW6co7jj4yingcCmfTwvG1m7NoycUjOAgmujgiATSaDeO3E1MZCR8HAd5KctVi2kSHFxkxMAkASY63bbVwncsBJzJUGrFRI/kIN+2rfCiu83fr1+WPOdePdC7ZJD1DQ5q4XQ8Hh3OIooMD85BglC6igNrFlBk0jgoJvpmKQsFPMw8gECRSecgQygXJwIQRSaBg2Cig9hgChsOsIcZTgjdkEUK1KbF72/DAn5RyMEnG2w00ZnYOCwT/QjgGBAZYqITDmIp8znmANuUA714EzlbqrGOzaPvHQkFEzhISnmE3JpH2uMCFEQTnQea6HyhcUCAlvex3MDkHJSZFIRMVMYHifoBFEzmYIDkE5IQGysEqONeaok/6D2CSIQZ5x4BGZGCYGAmcNBAIw9VQrqFXgDm4GAFrspGvoZQt4CZ5SY6P4mOjWi4jFGpkYVtFg6O0A9DvojOgK2XwEHdbJ+J/am2ewMjtCS2nhiYiRwc4P08mNAQLfkTk5voHKBbAWzY0xjLmDe/CbsI8AphS4RQxDuAELGbLomDVb0FMNguWGLrvc5BD/0gAESlJiSE5peb6JyDAgE4iAARRpuwh0CXnTgvxFa7KDLHIDYpBiZQEBwX0rw4TDWWcoKJLo86+WkSngOsBANBSE10zkEzQo0QgLCiD5RyioluCAUJQDFFKMJ0Drrtt6i9W8y2XxOksCEHpFNM9OB7yuHyaRDDtP22gU0w0XGGEUW1Ud5OEBKxec1Eh+kAFJhdD3UCCLGUE0x0IjKQwkMAg91E+KKJPngmMnjVhpqg9vN49sFSTjEwucgMm87z6Rtit/E2hn7ZRJd6k7hgluQKxvn4JzpPxCaFgyNQMJRCn3DQ6WUTHUUGvhnm/hWEr3CQiQxqLgkqNvEmOn/OSQqbpPOEbbSByUQGm4W8B53QRPdEZPDcLETWg07OgsiEm3hEnv+g0+CJyNCzWvGlHMdBLjISTi6kIPQxHDSSfqQgpvCSCDBebJzlIiNxTDJbhvMLpTx4IjIksoqNaUgnkxzcEeEmOulk0gJN9Ogf4exCwXaM71fi/XCPYsNvMtekyz5YzoC+gXNwWEC53BRUesK3OLlQu4UTOtsBejEweSmjsT1+026E5KcHmugaSplUluTbZacg9g3cRO8F1CC35QnTQXfOOehWAInIJHMQ+gZqopt6BTDPDIuJHrtIcbaSmpeWNHuYZ0rZTPe/RngkvEjHZWP6Bt3e7c+YMZfIiIGJixRiop9u/iMVpWA6B2PFxo1S8WbMKzKGL1JQlKRXPZ5GXvjpHCR9A3DQkOVSJg4ysRH7rS/UTIOJ/mwpj2S5lJODHGGHyyWv8obfXKQgB3VBCqoBTHTyNobpgIKTyhhoonOxceUoiKeAudh0BUUGOcjFRjdVQZGBjRxeyqajtmBODnKEZUUGOcjF5pSVgunmpq4LigxykCM0dTEK4kl0LjYIsFV5Y/CRez3Vrn5d/oNSLioy/CS6hjwVFBk8BczFpmwngxzkpTyAyLw9xBEp0MlgGFk10VIuJDLoh1eN6lbj7jMDvhGe/FBCZNAPt6aV8f25C+Myjgua0eJyqUyscgcZ/K6MdqxBZPYRMrPFOxlno0q5tMggQNI3EAqWDeNBbEqKDF9J9asJ1IUpiFOMBgJppYktmAEgbIf0l3Up705k+sv6y90sl9Q8vRCulMjwdqufAn1DcZFxdiuDJw8IS4uM2ZZnew98N8ulkO9QcZEpwsFqCt7ARaYEB6tD+I6yImMCf+1FBwHhHhoFpc5BgGYsqdLDJVjA2m5s236qnIGKjPHh5RKAP7/9KfwVZhco7nRmJx+2lvoR1UUL2JjYH9cZVTSqRtvlw5SN1ewD04+6dBtobP+zv1zHz+VD5+WD5/V61L5TpUP7dQb1ZgbV//gf/+Nfjd9F2SbMsc4MggAAAABJRU5ErkJggg=="/><br><div style="height: 1.6rem; color: white; font-size: 18px; text-align: center;">竖屏浏览,体验更佳</div></div>',
                document.body.appendChild(a))
            }
            function t() {
                a && (a.style.display = "block")
            }
            function i() {
                a && (a.style.display = "none")
            }
            function n() {
                var e = window.orientation;
                switch (e) {
                case 90:
                case -90:
                    e = "landscape",
                    t();
                    break;
                default:
                    e = "portrait",
                    i()
                }
            }
            function r() {
                e(),
                window.addEventListener("orientationchange", n, !1),
                a.addEventListener("touchstart", function(e) {
                    e.preventDefault()
                }, !1),
                n()
            }
            var a;
            r()
        }(),
        function() {
            var e = ".scrollable";
            $(document).on("touchmove", function(e) {
                e.preventDefault()
            }),
            $("body").on("touchstart", e, function(e) {
                0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1)
            }),
            $("body").on("touchmove", e, function(e) {
                $(this)[0].scrollHeight > $(this).innerHeight() && e.stopPropagation()
            })
        }(),
        function() {
            var e = navigator.userAgent.toLowerCase()
            , t = null ;
            (e.indexOf("iphone") >= 0 || e.indexOf("ipad") >= 0) && document.body.addEventListener("touchend", function(e) {
                var i = (new Date).getTime();
                t = t || i + 1;
                var n = i - t;
                return 500 > n && n > 0 ? (e.preventDefault(),
                !1) : void (t = i)
            }, !1)
        }();

    };

    activity.prototype.initTween = function() {
        var TWEEN = TWEEN || function() {
            var e = [];
            return {
                REVISION: "7",
                getAll: function() {
                    return e
                },
                removeAll: function() {
                    e = []
                },
                add: function(t) {
                    e.push(t)
                },
                remove: function(t) {
                    t = e.indexOf(t),
                    -1 !== t && e.splice(t, 1)
                },
                update: function(t) {
                    if (0 === e.length)
                        return !1;
                    for (var i = 0, n = e.length, t = void 0 !== t ? t : Date.now(); n > i; )
                        e[i].update(t) ? i++ : (e.splice(i, 1),
                        n--);
                    return !0
                }
            }
        }();
        TWEEN.Tween = function(e) {
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
            , p = null ;
            this.to = function(e, t) {
                return null  !== t && (n = t),
                i = e,
                this
            }
            ,
            this.start = function(n) {
                TWEEN.add(this),
                l = !1,
                a = void 0 !== n ? n : Date.now(),
                a += r;
                for (var o in i)
                    if (null  !== e[o]) {
                        if (i[o] instanceof Array) {
                            if (0 === i[o].length)
                                continue;i[o] = [e[o]].concat(i[o])
                        }
                        t[o] = e[o]
                    }
                return this
            }
            ,
            this.stop = function() {
                return TWEEN.remove(this),
                this
            }
            ,
            this.delay = function(e) {
                return r = e,
                this
            }
            ,
            this.easing = function(e) {
                return o = e,
                this
            }
            ,
            this.interpolation = function(e) {
                return s = e,
                this
            }
            ,
            this.chain = function() {
                return c = arguments,
                this
            }
            ,
            this.onStart = function(e) {
                return h = e,
                this
            }
            ,
            this.onUpdate = function(e) {
                return u = e,
                this
            }
            ,
            this.onComplete = function(e) {
                return p = e,
                this
            }
            ,
            this.update = function(r) {
                if (a > r)
                    return !0;
                !1 === l && (null  !== h && h.call(e),
                l = !0);
                var d, f = (r - a) / n, f = f > 1 ? 1 : f, E = o(f);
                for (d in t) {
                    var m = t[d]
                    , g = i[d];
                    e[d] = g instanceof Array ? s(g, E) : m + (g - m) * E
                }
                if (null  !== u && u.call(e, E),
                1 == f) {
                    for (null  !== p && p.call(e),
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
                None: function(e) {
                    return e
                }
            },
            Quadratic: {
                In: function(e) {
                    return e * e
                },
                Out: function(e) {
                    return e * (2 - e)
                },
                InOut: function(e) {
                    return 1 > (e *= 2) ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
                }
            },
            Cubic: {
                In: function(e) {
                    return e * e * e
                },
                Out: function(e) {
                    return --e * e * e + 1
                },
                InOut: function(e) {
                    return 1 > (e *= 2) ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
                }
            },
            Quartic: {
                In: function(e) {
                    return e * e * e * e
                },
                Out: function(e) {
                    return 1 - --e * e * e * e
                },
                InOut: function(e) {
                    return 1 > (e *= 2) ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
                }
            },
            Quintic: {
                In: function(e) {
                    return e * e * e * e * e
                },
                Out: function(e) {
                    return --e * e * e * e * e + 1
                },
                InOut: function(e) {
                    return 1 > (e *= 2) ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
                }
            },
            Sinusoidal: {
                In: function(e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                },
                Out: function(e) {
                    return Math.sin(e * Math.PI / 2)
                },
                InOut: function(e) {
                    return .5 * (1 - Math.cos(Math.PI * e))
                }
            },
            Exponential: {
                In: function(e) {
                    return 0 === e ? 0 : Math.pow(1024, e - 1)
                },
                Out: function(e) {
                    return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
                },
                InOut: function(e) {
                    return 0 === e ? 0 : 1 === e ? 1 : 1 > (e *= 2) ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
                }
            },
            Circular: {
                In: function(e) {
                    return 1 - Math.sqrt(1 - e * e)
                },
                Out: function(e) {
                    return Math.sqrt(1 - --e * e)
                },
                InOut: function(e) {
                    return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                }
            },
            Elastic: {
                In: function(e) {
                    var t, i = .1;
                    return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1,
                    t = .1) : t = .4 * Math.asin(1 / i) / (2 * Math.PI),
                    -(i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4)))
                },
                Out: function(e) {
                    var t, i = .1;
                    return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1,
                    t = .1) : t = .4 * Math.asin(1 / i) / (2 * Math.PI),
                    i * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / .4) + 1)
                },
                InOut: function(e) {
                    var t, i = .1;
                    return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1,
                    t = .1) : t = .4 * Math.asin(1 / i) / (2 * Math.PI),
                    1 > (e *= 2) ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4) : .5 * i * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4) + 1)
                }
            },
            Back: {
                In: function(e) {
                    return e * e * (2.70158 * e - 1.70158)
                },
                Out: function(e) {
                    return --e * e * (2.70158 * e + 1.70158) + 1
                },
                InOut: function(e) {
                    return 1 > (e *= 2) ? .5 * e * e * (3.5949095 * e - 2.5949095) : .5 * ((e -= 2) * e * (3.5949095 * e + 2.5949095) + 2)
                }
            },
            Bounce: {
                In: function(e) {
                    return 1 - TWEEN.Easing.Bounce.Out(1 - e)
                },
                Out: function(e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                },
                InOut: function(e) {
                    return .5 > e ? .5 * TWEEN.Easing.Bounce.In(2 * e) : .5 * TWEEN.Easing.Bounce.Out(2 * e - 1) + .5
                }
            }
        },
        TWEEN.Interpolation = {
            Linear: function(e, t) {
                var i = e.length - 1
                , n = i * t
                , r = Math.floor(n)
                , a = TWEEN.Interpolation.Utils.Linear;
                return 0 > t ? a(e[0], e[1], n) : t > 1 ? a(e[i], e[i - 1], i - n) : a(e[r], e[r + 1 > i ? i : r + 1], n - r)
            },
            Bezier: function(e, t) {
                var i, n = 0, r = e.length - 1, a = Math.pow, o = TWEEN.Interpolation.Utils.Bernstein;
                for (i = 0; r >= i; i++)
                    n += a(1 - t, r - i) * a(t, i) * e[i] * o(r, i);
                return n
            },
            CatmullRom: function(e, t) {
                var i = e.length - 1
                , n = i * t
                , r = Math.floor(n)
                , a = TWEEN.Interpolation.Utils.CatmullRom;
                return e[0] === e[i] ? (0 > t && (r = Math.floor(n = i * (1 + t))),
                a(e[(r - 1 + i) % i], e[r], e[(r + 1) % i], e[(r + 2) % i], n - r)) : 0 > t ? e[0] - (a(e[0], e[0], e[1], e[1], -n) - e[0]) : t > 1 ? e[i] - (a(e[i], e[i], e[i - 1], e[i - 1], n - i) - e[i]) : a(e[r ? r - 1 : 0], e[r], e[r + 1 > i ? i : r + 1], e[r + 2 > i ? i : r + 2], n - r)
            },
            Utils: {
                Linear: function(e, t, i) {
                    return (t - e) * i + e
                },
                Bernstein: function(e, t) {
                    var i = TWEEN.Interpolation.Utils.Factorial;
                    return i(e) / i(t) / i(e - t)
                },
                Factorial: function() {
                    var e = [1];
                    return function(t) {
                        var i, n = 1;
                        if (e[t])
                            return e[t];
                        for (i = t; i > 1; i--)
                            n *= i;
                        return e[t] = n
                    }
                }(),
                CatmullRom: function(e, t, i, n, r) {
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