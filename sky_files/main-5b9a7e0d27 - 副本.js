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
    container = document.createElement("div"),
    document.body.appendChild(container),
    camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,600),
    scene = new THREE.Scene;
    2 * Math.PI;
    group = new THREE.Group,
    scene.add(group);
    var t = new THREE.SphereGeometry(500,60,40);
    t.scale(-1, 1, 1);
    var i = new THREE.MeshBasicMaterial({
        map: (new THREE.TextureLoader).load("img/5.jpg")
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
                value: (new THREE.TextureLoader).load("img/disc.png")
            }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
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
        var t = (new THREE.TextureLoader).load("img/meteor.png")
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
        var t = (new THREE.TextureLoader).load("img/meteor.png")
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
        var t = (new THREE.TextureLoader).load("img/meteor2.png")
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
var THREE = {
    REVISION: "77"
};
"function" == typeof define && define.amd ? define("three", THREE) : "undefined" != typeof exports && "undefined" != typeof module && (module.exports = THREE),
void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)),
void 0 === Math.sign && (Math.sign = function(e) {
    return 0 > e ? -1 : e > 0 ? 1 : +e
}
),
void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", {
    get: function() {
        return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1]
    }
}),
void 0 === Object.assign && function() {
    Object.assign = function(e) {
        if (void 0 === e || null === e)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var t = Object(e), i = 1; i < arguments.length; i++) {
            var n = arguments[i];
            if (void 0 !== n && null !== n)
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    }
}(),
Object.assign(THREE, {
    MOUSE: {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    },
    CullFaceNone: 0,
    CullFaceBack: 1,
    CullFaceFront: 2,
    CullFaceFrontBack: 3,
    FrontFaceDirectionCW: 0,
    FrontFaceDirectionCCW: 1,
    BasicShadowMap: 0,
    PCFShadowMap: 1,
    PCFSoftShadowMap: 2,
    FrontSide: 0,
    BackSide: 1,
    DoubleSide: 2,
    FlatShading: 1,
    SmoothShading: 2,
    NoColors: 0,
    FaceColors: 1,
    VertexColors: 2,
    NoBlending: 0,
    NormalBlending: 1,
    AdditiveBlending: 2,
    SubtractiveBlending: 3,
    MultiplyBlending: 4,
    CustomBlending: 5,
    AddEquation: 100,
    SubtractEquation: 101,
    ReverseSubtractEquation: 102,
    MinEquation: 103,
    MaxEquation: 104,
    ZeroFactor: 200,
    OneFactor: 201,
    SrcColorFactor: 202,
    OneMinusSrcColorFactor: 203,
    SrcAlphaFactor: 204,
    OneMinusSrcAlphaFactor: 205,
    DstAlphaFactor: 206,
    OneMinusDstAlphaFactor: 207,
    DstColorFactor: 208,
    OneMinusDstColorFactor: 209,
    SrcAlphaSaturateFactor: 210,
    NeverDepth: 0,
    AlwaysDepth: 1,
    LessDepth: 2,
    LessEqualDepth: 3,
    EqualDepth: 4,
    GreaterEqualDepth: 5,
    GreaterDepth: 6,
    NotEqualDepth: 7,
    MultiplyOperation: 0,
    MixOperation: 1,
    AddOperation: 2,
    NoToneMapping: 0,
    LinearToneMapping: 1,
    ReinhardToneMapping: 2,
    Uncharted2ToneMapping: 3,
    CineonToneMapping: 4,
    UVMapping: 300,
    CubeReflectionMapping: 301,
    CubeRefractionMapping: 302,
    EquirectangularReflectionMapping: 303,
    EquirectangularRefractionMapping: 304,
    SphericalReflectionMapping: 305,
    CubeUVReflectionMapping: 306,
    CubeUVRefractionMapping: 307,
    RepeatWrapping: 1e3,
    ClampToEdgeWrapping: 1001,
    MirroredRepeatWrapping: 1002,
    NearestFilter: 1003,
    NearestMipMapNearestFilter: 1004,
    NearestMipMapLinearFilter: 1005,
    LinearFilter: 1006,
    LinearMipMapNearestFilter: 1007,
    LinearMipMapLinearFilter: 1008,
    UnsignedByteType: 1009,
    ByteType: 1010,
    ShortType: 1011,
    UnsignedShortType: 1012,
    IntType: 1013,
    UnsignedIntType: 1014,
    FloatType: 1015,
    HalfFloatType: 1025,
    UnsignedShort4444Type: 1016,
    UnsignedShort5551Type: 1017,
    UnsignedShort565Type: 1018,
    AlphaFormat: 1019,
    RGBFormat: 1020,
    RGBAFormat: 1021,
    LuminanceFormat: 1022,
    LuminanceAlphaFormat: 1023,
    RGBEFormat: THREE.RGBAFormat,
    DepthFormat: 1026,
    RGB_S3TC_DXT1_Format: 2001,
    RGBA_S3TC_DXT1_Format: 2002,
    RGBA_S3TC_DXT3_Format: 2003,
    RGBA_S3TC_DXT5_Format: 2004,
    RGB_PVRTC_4BPPV1_Format: 2100,
    RGB_PVRTC_2BPPV1_Format: 2101,
    RGBA_PVRTC_4BPPV1_Format: 2102,
    RGBA_PVRTC_2BPPV1_Format: 2103,
    RGB_ETC1_Format: 2151,
    LoopOnce: 2200,
    LoopRepeat: 2201,
    LoopPingPong: 2202,
    InterpolateDiscrete: 2300,
    InterpolateLinear: 2301,
    InterpolateSmooth: 2302,
    ZeroCurvatureEnding: 2400,
    ZeroSlopeEnding: 2401,
    WrapAroundEnding: 2402,
    TrianglesDrawMode: 0,
    TriangleStripDrawMode: 1,
    TriangleFanDrawMode: 2,
    LinearEncoding: 3e3,
    sRGBEncoding: 3001,
    GammaEncoding: 3007,
    RGBEEncoding: 3002,
    LogLuvEncoding: 3003,
    RGBM7Encoding: 3004,
    RGBM16Encoding: 3005,
    RGBDEncoding: 3006,
    BasicDepthPacking: 3200,
    RGBADepthPacking: 3201
}),
THREE.Color = function(e, t, i) {
    return void 0 === t && void 0 === i ? this.set(e) : this.setRGB(e, t, i)
}
,
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    set: function(e) {
        return e instanceof THREE.Color ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e),
        this
    },
    setScalar: function(e) {
        this.b = this.g = this.r = e
    },
    setHex: function(e) {
        return e = Math.floor(e),
        this.r = (e >> 16 & 255) / 255,
        this.g = (e >> 8 & 255) / 255,
        this.b = (255 & e) / 255,
        this
    },
    setRGB: function(e, t, i) {
        return this.r = e,
        this.g = t,
        this.b = i,
        this
    },
    setHSL: function() {
        function e(e, t, i) {
            return 0 > i && (i += 1),
            i > 1 && (i -= 1),
            1 / 6 > i ? e + 6 * (t - e) * i : .5 > i ? t : 2 / 3 > i ? e + 6 * (t - e) * (2 / 3 - i) : e
        }
        return function(t, i, n) {
            return t = THREE.Math.euclideanModulo(t, 1),
            i = THREE.Math.clamp(i, 0, 1),
            n = THREE.Math.clamp(n, 0, 1),
            0 === i ? this.r = this.g = this.b = n : (i = .5 >= n ? n * (1 + i) : n + i - n * i,
            n = 2 * n - i,
            this.r = e(n, i, t + 1 / 3),
            this.g = e(n, i, t),
            this.b = e(n, i, t - 1 / 3)),
            this
        }
    }(),
    setStyle: function(e) {
        function t(e) {
            void 0 !== e && 1 > parseFloat(e) && void 0
        }
        var i;
        if (i = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e)) {
            var n = i[2];
            switch (i[1]) {
            case "rgb":
            case "rgba":
                if (i = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(n))
                    return this.r = Math.min(255, parseInt(i[1], 10)) / 255,
                    this.g = Math.min(255, parseInt(i[2], 10)) / 255,
                    this.b = Math.min(255, parseInt(i[3], 10)) / 255,
                    t(i[5]),
                    this;
                if (i = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(n))
                    return this.r = Math.min(100, parseInt(i[1], 10)) / 100,
                    this.g = Math.min(100, parseInt(i[2], 10)) / 100,
                    this.b = Math.min(100, parseInt(i[3], 10)) / 100,
                    t(i[5]),
                    this;
                break;
            case "hsl":
            case "hsla":
                if (i = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(n)) {
                    var n = parseFloat(i[1]) / 360
                      , r = parseInt(i[2], 10) / 100
                      , a = parseInt(i[3], 10) / 100;
                    return t(i[5]),
                    this.setHSL(n, r, a)
                }
            }
        } else if (i = /^\#([A-Fa-f0-9]+)$/.exec(e)) {
            if (i = i[1],
            n = i.length,
            3 === n)
                return this.r = parseInt(i.charAt(0) + i.charAt(0), 16) / 255,
                this.g = parseInt(i.charAt(1) + i.charAt(1), 16) / 255,
                this.b = parseInt(i.charAt(2) + i.charAt(2), 16) / 255,
                this;
            if (6 === n)
                return this.r = parseInt(i.charAt(0) + i.charAt(1), 16) / 255,
                this.g = parseInt(i.charAt(2) + i.charAt(3), 16) / 255,
                this.b = parseInt(i.charAt(4) + i.charAt(5), 16) / 255,
                this
        }
        return e && 0 < e.length && (i = THREE.ColorKeywords[e],
        void 0 !== i ? this.setHex(i) : void 0),
        this
    },
    clone: function() {
        return new this.constructor(this.r,this.g,this.b)
    },
    copy: function(e) {
        return this.r = e.r,
        this.g = e.g,
        this.b = e.b,
        this
    },
    copyGammaToLinear: function(e, t) {
        return void 0 === t && (t = 2),
        this.r = Math.pow(e.r, t),
        this.g = Math.pow(e.g, t),
        this.b = Math.pow(e.b, t),
        this
    },
    copyLinearToGamma: function(e, t) {
        void 0 === t && (t = 2);
        var i = t > 0 ? 1 / t : 1;
        return this.r = Math.pow(e.r, i),
        this.g = Math.pow(e.g, i),
        this.b = Math.pow(e.b, i),
        this
    },
    convertGammaToLinear: function() {
        var e = this.r
          , t = this.g
          , i = this.b;
        return this.r = e * e,
        this.g = t * t,
        this.b = i * i,
        this
    },
    convertLinearToGamma: function() {
        return this.r = Math.sqrt(this.r),
        this.g = Math.sqrt(this.g),
        this.b = Math.sqrt(this.b),
        this
    },
    getHex: function() {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    },
    getHexString: function() {
        return ("000000" + this.getHex().toString(16)).slice(-6)
    },
    getHSL: function(e) {
        e = e || {
            h: 0,
            s: 0,
            l: 0
        };
        var t, i = this.r, n = this.g, r = this.b, a = Math.max(i, n, r), o = Math.min(i, n, r), s = (o + a) / 2;
        if (o === a)
            o = t = 0;
        else {
            var c = a - o
              , o = .5 >= s ? c / (a + o) : c / (2 - a - o);
            switch (a) {
            case i:
                t = (n - r) / c + (r > n ? 6 : 0);
                break;
            case n:
                t = (r - i) / c + 2;
                break;
            case r:
                t = (i - n) / c + 4
            }
            t /= 6
        }
        return e.h = t,
        e.s = o,
        e.l = s,
        e
    },
    getStyle: function() {
        return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
    },
    offsetHSL: function(e, t, i) {
        var n = this.getHSL();
        return n.h += e,
        n.s += t,
        n.l += i,
        this.setHSL(n.h, n.s, n.l),
        this
    },
    add: function(e) {
        return this.r += e.r,
        this.g += e.g,
        this.b += e.b,
        this
    },
    addColors: function(e, t) {
        return this.r = e.r + t.r,
        this.g = e.g + t.g,
        this.b = e.b + t.b,
        this
    },
    addScalar: function(e) {
        return this.r += e,
        this.g += e,
        this.b += e,
        this
    },
    multiply: function(e) {
        return this.r *= e.r,
        this.g *= e.g,
        this.b *= e.b,
        this
    },
    multiplyScalar: function(e) {
        return this.r *= e,
        this.g *= e,
        this.b *= e,
        this
    },
    lerp: function(e, t) {
        return this.r += (e.r - this.r) * t,
        this.g += (e.g - this.g) * t,
        this.b += (e.b - this.b) * t,
        this
    },
    equals: function(e) {
        return e.r === this.r && e.g === this.g && e.b === this.b
    },
    fromArray: function(e, t) {
        return void 0 === t && (t = 0),
        this.r = e[t],
        this.g = e[t + 1],
        this.b = e[t + 2],
        this
    },
    toArray: function(e, t) {
        return void 0 === e && (e = []),
        void 0 === t && (t = 0),
        e[t] = this.r,
        e[t + 1] = this.g,
        e[t + 2] = this.b,
        e
    }
},
THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
},
THREE.Quaternion = function(e, t, i, n) {
    this._x = e || 0,
    this._y = t || 0,
    this._z = i || 0,
    this._w = void 0 !== n ? n : 1
}
,
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    get x() {
        return this._x
    },
    set x(e) {
        this._x = e,
        this.onChangeCallback()
    },
    get y() {
        return this._y
    },
    set y(e) {
        this._y = e,
        this.onChangeCallback()
    },
    get z() {
        return this._z
    },
    set z(e) {
        this._z = e,
        this.onChangeCallback()
    },
    get w() {
        return this._w
    },
    set w(e) {
        this._w = e,
        this.onChangeCallback()
    },
    set: function(e, t, i, n) {
        return this._x = e,
        this._y = t,
        this._z = i,
        this._w = n,
        this.onChangeCallback(),
        this
    },
    clone: function() {
        return new this.constructor(this._x,this._y,this._z,this._w)
    },
    copy: function(e) {
        return this._x = e.x,
        this._y = e.y,
        this._z = e.z,
        this._w = e.w,
        this.onChangeCallback(),
        this
    },
    setFromEuler: function(e, t) {
        if (!1 == e instanceof THREE.Euler)
            throw Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var i = Math.cos(e._x / 2)
          , n = Math.cos(e._y / 2)
          , r = Math.cos(e._z / 2)
          , a = Math.sin(e._x / 2)
          , o = Math.sin(e._y / 2)
          , s = Math.sin(e._z / 2)
          , c = e.order;
        return "XYZ" === c ? (this._x = a * n * r + i * o * s,
        this._y = i * o * r - a * n * s,
        this._z = i * n * s + a * o * r,
        this._w = i * n * r - a * o * s) : "YXZ" === c ? (this._x = a * n * r + i * o * s,
        this._y = i * o * r - a * n * s,
        this._z = i * n * s - a * o * r,
        this._w = i * n * r + a * o * s) : "ZXY" === c ? (this._x = a * n * r - i * o * s,
        this._y = i * o * r + a * n * s,
        this._z = i * n * s + a * o * r,
        this._w = i * n * r - a * o * s) : "ZYX" === c ? (this._x = a * n * r - i * o * s,
        this._y = i * o * r + a * n * s,
        this._z = i * n * s - a * o * r,
        this._w = i * n * r + a * o * s) : "YZX" === c ? (this._x = a * n * r + i * o * s,
        this._y = i * o * r + a * n * s,
        this._z = i * n * s - a * o * r,
        this._w = i * n * r - a * o * s) : "XZY" === c && (this._x = a * n * r - i * o * s,
        this._y = i * o * r - a * n * s,
        this._z = i * n * s + a * o * r,
        this._w = i * n * r + a * o * s),
        !1 !== t && this.onChangeCallback(),
        this
    },
    setFromAxisAngle: function(e, t) {
        var i = t / 2
          , n = Math.sin(i);
        return this._x = e.x * n,
        this._y = e.y * n,
        this._z = e.z * n,
        this._w = Math.cos(i),
        this.onChangeCallback(),
        this
    },
    setFromRotationMatrix: function(e) {
        var t = e.elements
          , i = t[0];
        e = t[4];
        var n = t[8]
          , r = t[1]
          , a = t[5]
          , o = t[9]
          , s = t[2]
          , c = t[6]
          , t = t[10]
          , h = i + a + t;
        return h > 0 ? (i = .5 / Math.sqrt(h + 1),
        this._w = .25 / i,
        this._x = (c - o) * i,
        this._y = (n - s) * i,
        this._z = (r - e) * i) : i > a && i > t ? (i = 2 * Math.sqrt(1 + i - a - t),
        this._w = (c - o) / i,
        this._x = .25 * i,
        this._y = (e + r) / i,
        this._z = (n + s) / i) : a > t ? (i = 2 * Math.sqrt(1 + a - i - t),
        this._w = (n - s) / i,
        this._x = (e + r) / i,
        this._y = .25 * i,
        this._z = (o + c) / i) : (i = 2 * Math.sqrt(1 + t - i - a),
        this._w = (r - e) / i,
        this._x = (n + s) / i,
        this._y = (o + c) / i,
        this._z = .25 * i),
        this.onChangeCallback(),
        this
    },
    setFromUnitVectors: function() {
        var e, t;
        return function(i, n) {
            return void 0 === e && (e = new THREE.Vector3),
            t = i.dot(n) + 1,
            1e-6 > t ? (t = 0,
            Math.abs(i.x) > Math.abs(i.z) ? e.set(-i.y, i.x, 0) : e.set(0, -i.z, i.y)) : e.crossVectors(i, n),
            this._x = e.x,
            this._y = e.y,
            this._z = e.z,
            this._w = t,
            this.normalize()
        }
    }(),
    inverse: function() {
        return this.conjugate().normalize()
    },
    conjugate: function() {
        return this._x *= -1,
        this._y *= -1,
        this._z *= -1,
        this.onChangeCallback(),
        this
    },
    dot: function(e) {
        return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
    },
    lengthSq: function() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    },
    length: function() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    },
    normalize: function() {
        var e = this.length();
        return 0 === e ? (this._z = this._y = this._x = 0,
        this._w = 1) : (e = 1 / e,
        this._x *= e,
        this._y *= e,
        this._z *= e,
        this._w *= e),
        this.onChangeCallback(),
        this
    },
    multiply: function(e, t) {
        return void 0 !== t ? this.multiplyQuaternions(e, t) : this.multiplyQuaternions(this, e)
    },
    premultiply: function(e) {
        return this.multiplyQuaternions(e, this)
    },
    multiplyQuaternions: function(e, t) {
        var i = e._x
          , n = e._y
          , r = e._z
          , a = e._w
          , o = t._x
          , s = t._y
          , c = t._z
          , h = t._w;
        return this._x = i * h + a * o + n * c - r * s,
        this._y = n * h + a * s + r * o - i * c,
        this._z = r * h + a * c + i * s - n * o,
        this._w = a * h - i * o - n * s - r * c,
        this.onChangeCallback(),
        this
    },
    slerp: function(e, t) {
        if (0 === t)
            return this;
        if (1 === t)
            return this.copy(e);
        var i = this._x
          , n = this._y
          , r = this._z
          , a = this._w
          , o = a * e._w + i * e._x + n * e._y + r * e._z;
        if (0 > o ? (this._w = -e._w,
        this._x = -e._x,
        this._y = -e._y,
        this._z = -e._z,
        o = -o) : this.copy(e),
        o >= 1)
            return this._w = a,
            this._x = i,
            this._y = n,
            this._z = r,
            this;
        var s = Math.sqrt(1 - o * o);
        if (.001 > Math.abs(s))
            return this._w = .5 * (a + this._w),
            this._x = .5 * (i + this._x),
            this._y = .5 * (n + this._y),
            this._z = .5 * (r + this._z),
            this;
        var c = Math.atan2(s, o)
          , o = Math.sin((1 - t) * c) / s
          , s = Math.sin(t * c) / s;
        return this._w = a * o + this._w * s,
        this._x = i * o + this._x * s,
        this._y = n * o + this._y * s,
        this._z = r * o + this._z * s,
        this.onChangeCallback(),
        this
    },
    equals: function(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
    },
    fromArray: function(e, t) {
        return void 0 === t && (t = 0),
        this._x = e[t],
        this._y = e[t + 1],
        this._z = e[t + 2],
        this._w = e[t + 3],
        this.onChangeCallback(),
        this
    },
    toArray: function(e, t) {
        return void 0 === e && (e = []),
        void 0 === t && (t = 0),
        e[t] = this._x,
        e[t + 1] = this._y,
        e[t + 2] = this._z,
        e[t + 3] = this._w,
        e
    },
    onChange: function(e) {
        return this.onChangeCallback = e,
        this
    },
    onChangeCallback: function() {}
},
Object.assign(THREE.Quaternion, {
    slerp: function(e, t, i, n) {
        return i.copy(e).slerp(t, n)
    },
    slerpFlat: function(e, t, i, n, r, a, o) {
        var s = i[n + 0]
          , c = i[n + 1]
          , h = i[n + 2];
        i = i[n + 3],
        n = r[a + 0];
        var l = r[a + 1]
          , u = r[a + 2];
        if (r = r[a + 3],
        i !== r || s !== n || c !== l || h !== u) {
            a = 1 - o;
            var p = s * n + c * l + h * u + i * r
              , d = p >= 0 ? 1 : -1
              , f = 1 - p * p;
            f > Number.EPSILON && (f = Math.sqrt(f),
            p = Math.atan2(f, p * d),
            a = Math.sin(a * p) / f,
            o = Math.sin(o * p) / f),
            d *= o,
            s = s * a + n * d,
            c = c * a + l * d,
            h = h * a + u * d,
            i = i * a + r * d,
            a === 1 - o && (o = 1 / Math.sqrt(s * s + c * c + h * h + i * i),
            s *= o,
            c *= o,
            h *= o,
            i *= o)
        }
        e[t] = s,
        e[t + 1] = c,
        e[t + 2] = h,
        e[t + 3] = i
    }
}),
THREE.Vector2 = function(e, t) {
    this.x = e || 0,
    this.y = t || 0
}
,
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    get width() {
        return this.x
    },
    set width(e) {
        this.x = e
    },
    get height() {
        return this.y
    },
    set height(e) {
        this.y = e
    },
    set: function(e, t) {
        return this.x = e,
        this.y = t,
        this
    },
    setScalar: function(e) {
        return this.y = this.x = e,
        this
    },
    setX: function(e) {
        return this.x = e,
        this
    },
    setY: function(e) {
        return this.y = e,
        this
    },
    setComponent: function(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        default:
            throw Error("index is out of range: " + e)
        }
    },
    getComponent: function(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw Error("index is out of range: " + e)
        }
    },
    clone: function() {
        return new this.constructor(this.x,this.y)
    },
    copy: function(e) {
        return this.x = e.x,
        this.y = e.y,
        this
    },
    add: function(e, t) {
        return void 0 !== t ? this.addVectors(e, t) : (this.x += e.x,
        this.y += e.y,
        this)
    },
    addScalar: function(e) {
        return this.x += e,
        this.y += e,
        this
    },
    addVectors: function(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this
    },
    addScaledVector: function(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this
    },
    sub: function(e, t) {
        return void 0 !== t ? this.subVectors(e, t) : (this.x -= e.x,
        this.y -= e.y,
        this)
    },
    subScalar: function(e) {
        return this.x -= e,
        this.y -= e,
        this
    },
    subVectors: function(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this
    },
    multiply: function(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this
    },
    multiplyScalar: function(e) {
        return isFinite(e) ? (this.x *= e,
        this.y *= e) : this.y = this.x = 0,
        this
    },
    divide: function(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this
    },
    divideScalar: function(e) {
        return this.multiplyScalar(1 / e)
    },
    min: function(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this
    },
    max: function(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this
    },
    clamp: function(e, t) {
        return this.x = Math.max(e.x, Math.min(t.x, this.x)),
        this.y = Math.max(e.y, Math.min(t.y, this.y)),
        this
    },
    clampScalar: function() {
        var e, t;
        return function(i, n) {
            return void 0 === e && (e = new THREE.Vector2,
            t = new THREE.Vector2),
            e.set(i, i),
            t.set(n, n),
            this.clamp(e, t)
        }
    }(),
    clampLength: function(e, t) {
        var i = this.length();
        return this.multiplyScalar(Math.max(e, Math.min(t, i)) / i)
    },
    floor: function() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this
    },
    ceil: function() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this
    },
    round: function() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this
    },
    roundToZero: function() {
        return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y),
        this
    },
    negate: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this
    },
    dot: function(e) {
        return this.x * e.x + this.y * e.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    angle: function() {
        var e = Math.atan2(this.y, this.x);
        return 0 > e && (e += 2 * Math.PI),
        e
    },
    distanceTo: function(e) {
        return Math.sqrt(this.distanceToSquared(e))
    },
    distanceToSquared: function(e) {
        var t = this.x - e.x;
        return e = this.y - e.y,
        t * t + e * e
    },
    setLength: function(e) {
        return this.multiplyScalar(e / this.length())
    },
    lerp: function(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this
    },
    lerpVectors: function(e, t, i) {
        return this.subVectors(t, e).multiplyScalar(i).add(e)
    },
    equals: function(e) {
        return e.x === this.x && e.y === this.y
    },
    fromArray: function(e, t) {
        return void 0 === t && (t = 0),
        this.x = e[t],
        this.y = e[t + 1],
        this
    },
    toArray: function(e, t) {
        return void 0 === e && (e = []),
        void 0 === t && (t = 0),
        e[t] = this.x,
        e[t + 1] = this.y,
        e
    },
    fromAttribute: function(e, t, i) {
        return void 0 === i && (i = 0),
        t = t * e.itemSize + i,
        this.x = e.array[t],
        this.y = e.array[t + 1],
        this
    },
    rotateAround: function(e, t) {
        var i = Math.cos(t)
          , n = Math.sin(t)
          , r = this.x - e.x
          , a = this.y - e.y;
        return this.x = r * i - a * n + e.x,
        this.y = r * n + a * i + e.y,
        this
    }
},
THREE.Vector3 = function(e, t, i) {
    this.x = e || 0,
    this.y = t || 0,
    this.z = i || 0
}
,
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function(e, t, i) {
        return this.x = e,
        this.y = t,
        this.z = i,
        this
    },
    setScalar: function(e) {
        return this.z = this.y = this.x = e,
        this
    },
    setX: function(e) {
        return this.x = e,
        this
    },
    setY: function(e) {
        return this.y = e,
        this
    },
    setZ: function(e) {
        return this.z = e,
        this
    },
    setComponent: function(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        case 2:
            this.z = t;
            break;
        default:
            throw Error("index is out of range: " + e)
        }
    },
    getComponent: function(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw Error("index is out of range: " + e)
        }
    },
    clone: function() {
        return new this.constructor(this.x,this.y,this.z)
    },
    copy: function(e) {
        return this.x = e.x,
        this.y = e.y,
        this.z = e.z,
        this
    },
    add: function(e, t) {
        return void 0 !== t ? this.addVectors(e, t) : (this.x += e.x,
        this.y += e.y,
        this.z += e.z,
        this)
    },
    addScalar: function(e) {
        return this.x += e,
        this.y += e,
        this.z += e,
        this
    },
    addVectors: function(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this.z = e.z + t.z,
        this
    },
    addScaledVector: function(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this.z += e.z * t,
        this
    },
    sub: function(e, t) {
        return void 0 !== t ? this.subVectors(e, t) : (this.x -= e.x,
        this.y -= e.y,
        this.z -= e.z,
        this)
    },
    subScalar: function(e) {
        return this.x -= e,
        this.y -= e,
        this.z -= e,
        this
    },
    subVectors: function(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this.z = e.z - t.z,
        this
    },
    multiply: function(e, t) {
        return void 0 !== t ? this.multiplyVectors(e, t) : (this.x *= e.x,
        this.y *= e.y,
        this.z *= e.z,
        this)
    },
    multiplyScalar: function(e) {
        return isFinite(e) ? (this.x *= e,
        this.y *= e,
        this.z *= e) : this.z = this.y = this.x = 0,
        this
    },
    multiplyVectors: function(e, t) {
        return this.x = e.x * t.x,
        this.y = e.y * t.y,
        this.z = e.z * t.z,
        this
    },
    applyEuler: function() {
        var e;
        return function(t) {
            return !1 == t instanceof THREE.Euler && void 0,
            void 0 === e && (e = new THREE.Quaternion),
            this.applyQuaternion(e.setFromEuler(t))
        }
    }(),
    applyAxisAngle: function() {
        var e;
        return function(t, i) {
            return void 0 === e && (e = new THREE.Quaternion),
            this.applyQuaternion(e.setFromAxisAngle(t, i))
        }
    }(),
    applyMatrix3: function(e) {
        var t = this.x
          , i = this.y
          , n = this.z;
        return e = e.elements,
        this.x = e[0] * t + e[3] * i + e[6] * n,
        this.y = e[1] * t + e[4] * i + e[7] * n,
        this.z = e[2] * t + e[5] * i + e[8] * n,
        this
    },
    applyMatrix4: function(e) {
        var t = this.x
          , i = this.y
          , n = this.z;
        return e = e.elements,
        this.x = e[0] * t + e[4] * i + e[8] * n + e[12],
        this.y = e[1] * t + e[5] * i + e[9] * n + e[13],
        this.z = e[2] * t + e[6] * i + e[10] * n + e[14],
        this
    },
    applyProjection: function(e) {
        var t = this.x
          , i = this.y
          , n = this.z;
        e = e.elements;
        var r = 1 / (e[3] * t + e[7] * i + e[11] * n + e[15]);
        return this.x = (e[0] * t + e[4] * i + e[8] * n + e[12]) * r,
        this.y = (e[1] * t + e[5] * i + e[9] * n + e[13]) * r,
        this.z = (e[2] * t + e[6] * i + e[10] * n + e[14]) * r,
        this
    },
    applyQuaternion: function(e) {
        var t = this.x
          , i = this.y
          , n = this.z
          , r = e.x
          , a = e.y
          , o = e.z;
        e = e.w;
        var s = e * t + a * n - o * i
          , c = e * i + o * t - r * n
          , h = e * n + r * i - a * t
          , t = -r * t - a * i - o * n;
        return this.x = s * e + t * -r + c * -o - h * -a,
        this.y = c * e + t * -a + h * -r - s * -o,
        this.z = h * e + t * -o + s * -a - c * -r,
        this
    },
    project: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.multiplyMatrices(t.projectionMatrix, e.getInverse(t.matrixWorld)),
            this.applyProjection(e)
        }
    }(),
    unproject: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.multiplyMatrices(t.matrixWorld, e.getInverse(t.projectionMatrix)),
            this.applyProjection(e)
        }
    }(),
    transformDirection: function(e) {
        var t = this.x
          , i = this.y
          , n = this.z;
        return e = e.elements,
        this.x = e[0] * t + e[4] * i + e[8] * n,
        this.y = e[1] * t + e[5] * i + e[9] * n,
        this.z = e[2] * t + e[6] * i + e[10] * n,
        this.normalize()
    },
    divide: function(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this.z /= e.z,
        this
    },
    divideScalar: function(e) {
        return this.multiplyScalar(1 / e)
    },
    min: function(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this.z = Math.min(this.z, e.z),
        this
    },
    max: function(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this.z = Math.max(this.z, e.z),
        this
    },
    clamp: function(e, t) {
        return this.x = Math.max(e.x, Math.min(t.x, this.x)),
        this.y = Math.max(e.y, Math.min(t.y, this.y)),
        this.z = Math.max(e.z, Math.min(t.z, this.z)),
        this
    },
    clampScalar: function() {
        var e, t;
        return function(i, n) {
            return void 0 === e && (e = new THREE.Vector3,
            t = new THREE.Vector3),
            e.set(i, i, i),
            t.set(n, n, n),
            this.clamp(e, t)
        }
    }(),
    clampLength: function(e, t) {
        var i = this.length();
        return this.multiplyScalar(Math.max(e, Math.min(t, i)) / i)
    },
    floor: function() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this
    },
    ceil: function() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this
    },
    round: function() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this
    },
    roundToZero: function() {
        return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y),
        this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z),
        this
    },
    negate: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this
    },
    dot: function(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(e) {
        return this.multiplyScalar(e / this.length())
    },
    lerp: function(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this.z += (e.z - this.z) * t,
        this
    },
    lerpVectors: function(e, t, i) {
        return this.subVectors(t, e).multiplyScalar(i).add(e)
    },
    cross: function(e, t) {
        if (void 0 !== t)
            return this.crossVectors(e, t);
        var i = this.x
          , n = this.y
          , r = this.z;
        return this.x = n * e.z - r * e.y,
        this.y = r * e.x - i * e.z,
        this.z = i * e.y - n * e.x,
        this
    },
    crossVectors: function(e, t) {
        var i = e.x
          , n = e.y
          , r = e.z
          , a = t.x
          , o = t.y
          , s = t.z;
        return this.x = n * s - r * o,
        this.y = r * a - i * s,
        this.z = i * o - n * a,
        this
    },
    projectOnVector: function() {
        var e, t;
        return function(i) {
            return void 0 === e && (e = new THREE.Vector3),
            e.copy(i).normalize(),
            t = this.dot(e),
            this.copy(e).multiplyScalar(t)
        }
    }(),
    projectOnPlane: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Vector3),
            e.copy(this).projectOnVector(t),
            this.sub(e)
        }
    }(),
    reflect: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Vector3),
            this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
        }
    }(),
    angleTo: function(e) {
        return e = this.dot(e) / Math.sqrt(this.lengthSq() * e.lengthSq()),
        Math.acos(THREE.Math.clamp(e, -1, 1))
    },
    distanceTo: function(e) {
        return Math.sqrt(this.distanceToSquared(e))
    },
    distanceToSquared: function(e) {
        var t = this.x - e.x
          , i = this.y - e.y;
        return e = this.z - e.z,
        t * t + i * i + e * e
    },
    setFromSpherical: function(e) {
        var t = Math.sin(e.phi) * e.radius;
        return this.x = t * Math.sin(e.theta),
        this.y = Math.cos(e.phi) * e.radius,
        this.z = t * Math.cos(e.theta),
        this
    },
    setFromMatrixPosition: function(e) {
        return this.setFromMatrixColumn(e, 3)
    },
    setFromMatrixScale: function(e) {
        var t = this.setFromMatrixColumn(e, 0).length()
          , i = this.setFromMatrixColumn(e, 1).length();
        return e = this.setFromMatrixColumn(e, 2).length(),
        this.x = t,
        this.y = i,
        this.z = e,
        this
    },
    setFromMatrixColumn: function(e, t) {
        if ("number" == typeof e) {
            var i = e;
            e = t,
            t = i
        }
        return this.fromArray(e.elements, 4 * t)
    },
    equals: function(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z
    },
    fromArray: function(e, t) {
        return void 0 === t && (t = 0),
        this.x = e[t],
        this.y = e[t + 1],
        this.z = e[t + 2],
        this
    },
    toArray: function(e, t) {
        return void 0 === e && (e = []),
        void 0 === t && (t = 0),
        e[t] = this.x,
        e[t + 1] = this.y,
        e[t + 2] = this.z,
        e
    },
    fromAttribute: function(e, t, i) {
        return void 0 === i && (i = 0),
        t = t * e.itemSize + i,
        this.x = e.array[t],
        this.y = e.array[t + 1],
        this.z = e.array[t + 2],
        this
    }
},
THREE.Vector4 = function(e, t, i, n) {
    this.x = e || 0,
    this.y = t || 0,
    this.z = i || 0,
    this.w = void 0 !== n ? n : 1
}
,
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function(e, t, i, n) {
        return this.x = e,
        this.y = t,
        this.z = i,
        this.w = n,
        this
    },
    setScalar: function(e) {
        return this.w = this.z = this.y = this.x = e,
        this
    },
    setX: function(e) {
        return this.x = e,
        this
    },
    setY: function(e) {
        return this.y = e,
        this
    },
    setZ: function(e) {
        return this.z = e,
        this
    },
    setW: function(e) {
        return this.w = e,
        this
    },
    setComponent: function(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        case 2:
            this.z = t;
            break;
        case 3:
            this.w = t;
            break;
        default:
            throw Error("index is out of range: " + e)
        }
    },
    getComponent: function(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw Error("index is out of range: " + e)
        }
    },
    clone: function() {
        return new this.constructor(this.x,this.y,this.z,this.w)
    },
    copy: function(e) {
        return this.x = e.x,
        this.y = e.y,
        this.z = e.z,
        this.w = void 0 !== e.w ? e.w : 1,
        this
    },
    add: function(e, t) {
        return void 0 !== t ? this.addVectors(e, t) : (this.x += e.x,
        this.y += e.y,
        this.z += e.z,
        this.w += e.w,
        this)
    },
    addScalar: function(e) {
        return this.x += e,
        this.y += e,
        this.z += e,
        this.w += e,
        this
    },
    addVectors: function(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this.z = e.z + t.z,
        this.w = e.w + t.w,
        this
    },
    addScaledVector: function(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this.z += e.z * t,
        this.w += e.w * t,
        this
    },
    sub: function(e, t) {
        return void 0 !== t ? this.subVectors(e, t) : (this.x -= e.x,
        this.y -= e.y,
        this.z -= e.z,
        this.w -= e.w,
        this)
    },
    subScalar: function(e) {
        return this.x -= e,
        this.y -= e,
        this.z -= e,
        this.w -= e,
        this
    },
    subVectors: function(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this.z = e.z - t.z,
        this.w = e.w - t.w,
        this
    },
    multiplyScalar: function(e) {
        return isFinite(e) ? (this.x *= e,
        this.y *= e,
        this.z *= e,
        this.w *= e) : this.w = this.z = this.y = this.x = 0,
        this
    },
    applyMatrix4: function(e) {
        var t = this.x
          , i = this.y
          , n = this.z
          , r = this.w;
        return e = e.elements,
        this.x = e[0] * t + e[4] * i + e[8] * n + e[12] * r,
        this.y = e[1] * t + e[5] * i + e[9] * n + e[13] * r,
        this.z = e[2] * t + e[6] * i + e[10] * n + e[14] * r,
        this.w = e[3] * t + e[7] * i + e[11] * n + e[15] * r,
        this
    },
    divideScalar: function(e) {
        return this.multiplyScalar(1 / e)
    },
    setAxisAngleFromQuaternion: function(e) {
        this.w = 2 * Math.acos(e.w);
        var t = Math.sqrt(1 - e.w * e.w);
        return 1e-4 > t ? (this.x = 1,
        this.z = this.y = 0) : (this.x = e.x / t,
        this.y = e.y / t,
        this.z = e.z / t),
        this
    },
    setAxisAngleFromRotationMatrix: function(e) {
        var t, i, n;
        e = e.elements;
        var r = e[0];
        n = e[4];
        var a = e[8]
          , o = e[1]
          , s = e[5]
          , c = e[9];
        i = e[2],
        t = e[6];
        var h = e[10];
        return .01 > Math.abs(n - o) && .01 > Math.abs(a - i) && .01 > Math.abs(c - t) ? .1 > Math.abs(n + o) && .1 > Math.abs(a + i) && .1 > Math.abs(c + t) && .1 > Math.abs(r + s + h - 3) ? (this.set(1, 0, 0, 0),
        this) : (e = Math.PI,
        r = (r + 1) / 2,
        s = (s + 1) / 2,
        h = (h + 1) / 2,
        n = (n + o) / 4,
        a = (a + i) / 4,
        c = (c + t) / 4,
        r > s && r > h ? .01 > r ? (t = 0,
        n = i = .707106781) : (t = Math.sqrt(r),
        i = n / t,
        n = a / t) : s > h ? .01 > s ? (t = .707106781,
        i = 0,
        n = .707106781) : (i = Math.sqrt(s),
        t = n / i,
        n = c / i) : .01 > h ? (i = t = .707106781,
        n = 0) : (n = Math.sqrt(h),
        t = a / n,
        i = c / n),
        this.set(t, i, n, e),
        this) : (e = Math.sqrt((t - c) * (t - c) + (a - i) * (a - i) + (o - n) * (o - n)),
        .001 > Math.abs(e) && (e = 1),
        this.x = (t - c) / e,
        this.y = (a - i) / e,
        this.z = (o - n) / e,
        this.w = Math.acos((r + s + h - 1) / 2),
        this)
    },
    min: function(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this.z = Math.min(this.z, e.z),
        this.w = Math.min(this.w, e.w),
        this
    },
    max: function(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this.z = Math.max(this.z, e.z),
        this.w = Math.max(this.w, e.w),
        this
    },
    clamp: function(e, t) {
        return this.x = Math.max(e.x, Math.min(t.x, this.x)),
        this.y = Math.max(e.y, Math.min(t.y, this.y)),
        this.z = Math.max(e.z, Math.min(t.z, this.z)),
        this.w = Math.max(e.w, Math.min(t.w, this.w)),
        this
    },
    clampScalar: function() {
        var e, t;
        return function(i, n) {
            return void 0 === e && (e = new THREE.Vector4,
            t = new THREE.Vector4),
            e.set(i, i, i, i),
            t.set(n, n, n, n),
            this.clamp(e, t)
        }
    }(),
    floor: function() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this.w = Math.floor(this.w),
        this
    },
    ceil: function() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this.w = Math.ceil(this.w),
        this
    },
    round: function() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this.w = Math.round(this.w),
        this
    },
    roundToZero: function() {
        return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y),
        this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z),
        this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w),
        this
    },
    negate: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this.w = -this.w,
        this
    },
    dot: function(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(e) {
        return this.multiplyScalar(e / this.length())
    },
    lerp: function(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this.z += (e.z - this.z) * t,
        this.w += (e.w - this.w) * t,
        this
    },
    lerpVectors: function(e, t, i) {
        return this.subVectors(t, e).multiplyScalar(i).add(e)
    },
    equals: function(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
    },
    fromArray: function(e, t) {
        return void 0 === t && (t = 0),
        this.x = e[t],
        this.y = e[t + 1],
        this.z = e[t + 2],
        this.w = e[t + 3],
        this
    },
    toArray: function(e, t) {
        return void 0 === e && (e = []),
        void 0 === t && (t = 0),
        e[t] = this.x,
        e[t + 1] = this.y,
        e[t + 2] = this.z,
        e[t + 3] = this.w,
        e
    },
    fromAttribute: function(e, t, i) {
        return void 0 === i && (i = 0),
        t = t * e.itemSize + i,
        this.x = e.array[t],
        this.y = e.array[t + 1],
        this.z = e.array[t + 2],
        this.w = e.array[t + 3],
        this
    }
},
THREE.Euler = function(e, t, i, n) {
    this._x = e || 0,
    this._y = t || 0,
    this._z = i || 0,
    this._order = n || THREE.Euler.DefaultOrder
}
,
THREE.Euler.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" "),
THREE.Euler.DefaultOrder = "XYZ",
THREE.Euler.prototype = {
    constructor: THREE.Euler,
    get x() {
        return this._x
    },
    set x(e) {
        this._x = e,
        this.onChangeCallback()
    },
    get y() {
        return this._y
    },
    set y(e) {
        this._y = e,
        this.onChangeCallback()
    },
    get z() {
        return this._z
    },
    set z(e) {
        this._z = e,
        this.onChangeCallback()
    },
    get order() {
        return this._order
    },
    set order(e) {
        this._order = e,
        this.onChangeCallback()
    },
    set: function(e, t, i, n) {
        return this._x = e,
        this._y = t,
        this._z = i,
        this._order = n || this._order,
        this.onChangeCallback(),
        this
    },
    clone: function() {
        return new this.constructor(this._x,this._y,this._z,this._order)
    },
    copy: function(e) {
        return this._x = e._x,
        this._y = e._y,
        this._z = e._z,
        this._order = e._order,
        this.onChangeCallback(),
        this
    },
    setFromRotationMatrix: function(e, t, i) {
        var n = THREE.Math.clamp
          , r = e.elements;
        e = r[0];
        var a = r[4]
          , o = r[8]
          , s = r[1]
          , c = r[5]
          , h = r[9]
          , l = r[2]
          , u = r[6]
          , r = r[10];
        return t = t || this._order,
        "XYZ" === t ? (this._y = Math.asin(n(o, -1, 1)),
        .99999 > Math.abs(o) ? (this._x = Math.atan2(-h, r),
        this._z = Math.atan2(-a, e)) : (this._x = Math.atan2(u, c),
        this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-n(h, -1, 1)),
        .99999 > Math.abs(h) ? (this._y = Math.atan2(o, r),
        this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-l, e),
        this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(n(u, -1, 1)),
        .99999 > Math.abs(u) ? (this._y = Math.atan2(-l, r),
        this._z = Math.atan2(-a, c)) : (this._y = 0,
        this._z = Math.atan2(s, e))) : "ZYX" === t ? (this._y = Math.asin(-n(l, -1, 1)),
        .99999 > Math.abs(l) ? (this._x = Math.atan2(u, r),
        this._z = Math.atan2(s, e)) : (this._x = 0,
        this._z = Math.atan2(-a, c))) : "YZX" === t ? (this._z = Math.asin(n(s, -1, 1)),
        .99999 > Math.abs(s) ? (this._x = Math.atan2(-h, c),
        this._y = Math.atan2(-l, e)) : (this._x = 0,
        this._y = Math.atan2(o, r))) : "XZY" === t ? (this._z = Math.asin(-n(a, -1, 1)),
        .99999 > Math.abs(a) ? (this._x = Math.atan2(u, c),
        this._y = Math.atan2(o, e)) : (this._x = Math.atan2(-h, r),
        this._y = 0)) : void 0,
        this._order = t,
        !1 !== i && this.onChangeCallback(),
        this
    },
    setFromQuaternion: function() {
        var e;
        return function(t, i, n) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationFromQuaternion(t),
            this.setFromRotationMatrix(e, i, n)
        }
    }(),
    setFromVector3: function(e, t) {
        return this.set(e.x, e.y, e.z, t || this._order)
    },
    reorder: function() {
        var e = new THREE.Quaternion;
        return function(t) {
            return e.setFromEuler(this),
            this.setFromQuaternion(e, t)
        }
    }(),
    equals: function(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
    },
    fromArray: function(e) {
        return this._x = e[0],
        this._y = e[1],
        this._z = e[2],
        void 0 !== e[3] && (this._order = e[3]),
        this.onChangeCallback(),
        this
    },
    toArray: function(e, t) {
        return void 0 === e && (e = []),
        void 0 === t && (t = 0),
        e[t] = this._x,
        e[t + 1] = this._y,
        e[t + 2] = this._z,
        e[t + 3] = this._order,
        e
    },
    toVector3: function(e) {
        return e ? e.set(this._x, this._y, this._z) : new THREE.Vector3(this._x,this._y,this._z)
    },
    onChange: function(e) {
        return this.onChangeCallback = e,
        this
    },
    onChangeCallback: function() {}
},
THREE.Line3 = function(e, t) {
    this.start = void 0 !== e ? e : new THREE.Vector3,
    this.end = void 0 !== t ? t : new THREE.Vector3
}
,
THREE.Line3.prototype = {
    constructor: THREE.Line3,
    set: function(e, t) {
        return this.start.copy(e),
        this.end.copy(t),
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.start.copy(e.start),
        this.end.copy(e.end),
        this
    },
    center: function(e) {
        return (e || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
    },
    delta: function(e) {
        return (e || new THREE.Vector3).subVectors(this.end, this.start)
    },
    distanceSq: function() {
        return this.start.distanceToSquared(this.end)
    },
    distance: function() {
        return this.start.distanceTo(this.end)
    },
    at: function(e, t) {
        var i = t || new THREE.Vector3;
        return this.delta(i).multiplyScalar(e).add(this.start)
    },
    closestPointToPointParameter: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3;
        return function(i, n) {
            e.subVectors(i, this.start),
            t.subVectors(this.end, this.start);
            var r = t.dot(t)
              , r = t.dot(e) / r;
            return n && (r = THREE.Math.clamp(r, 0, 1)),
            r
        }
    }(),
    closestPointToPoint: function(e, t, i) {
        return e = this.closestPointToPointParameter(e, t),
        i = i || new THREE.Vector3,
        this.delta(i).multiplyScalar(e).add(this.start)
    },
    applyMatrix4: function(e) {
        return this.start.applyMatrix4(e),
        this.end.applyMatrix4(e),
        this
    },
    equals: function(e) {
        return e.start.equals(this.start) && e.end.equals(this.end)
    }
},
THREE.Box2 = function(e, t) {
    this.min = void 0 !== e ? e : new THREE.Vector2(1 / 0,1 / 0),
    this.max = void 0 !== t ? t : new THREE.Vector2(-(1 / 0),-(1 / 0))
}
,
THREE.Box2.prototype = {
    constructor: THREE.Box2,
    set: function(e, t) {
        return this.min.copy(e),
        this.max.copy(t),
        this
    },
    setFromPoints: function(e) {
        this.makeEmpty();
        for (var t = 0, i = e.length; i > t; t++)
            this.expandByPoint(e[t]);
        return this
    },
    setFromCenterAndSize: function() {
        var e = new THREE.Vector2;
        return function(t, i) {
            var n = e.copy(i).multiplyScalar(.5);
            return this.min.copy(t).sub(n),
            this.max.copy(t).add(n),
            this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.min.copy(e.min),
        this.max.copy(e.max),
        this
    },
    makeEmpty: function() {
        return this.min.x = this.min.y = 1 / 0,
        this.max.x = this.max.y = -(1 / 0),
        this
    },
    isEmpty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y
    },
    center: function(e) {
        return (e || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function(e) {
        return (e || new THREE.Vector2).subVectors(this.max, this.min)
    },
    expandByPoint: function(e) {
        return this.min.min(e),
        this.max.max(e),
        this
    },
    expandByVector: function(e) {
        return this.min.sub(e),
        this.max.add(e),
        this
    },
    expandByScalar: function(e) {
        return this.min.addScalar(-e),
        this.max.addScalar(e),
        this
    },
    containsPoint: function(e) {
        return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y)
    },
    containsBox: function(e) {
        return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y
    },
    getParameter: function(e, t) {
        return (t || new THREE.Vector2).set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
    },
    intersectsBox: function(e) {
        return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y)
    },
    clampPoint: function(e, t) {
        return (t || new THREE.Vector2).copy(e).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var e = new THREE.Vector2;
        return function(t) {
            return e.copy(t).clamp(this.min, this.max).sub(t).length()
        }
    }(),
    intersect: function(e) {
        return this.min.max(e.min),
        this.max.min(e.max),
        this
    },
    union: function(e) {
        return this.min.min(e.min),
        this.max.max(e.max),
        this
    },
    translate: function(e) {
        return this.min.add(e),
        this.max.add(e),
        this
    },
    equals: function(e) {
        return e.min.equals(this.min) && e.max.equals(this.max)
    }
},
THREE.Box3 = function(e, t) {
    this.min = void 0 !== e ? e : new THREE.Vector3(1 / 0,1 / 0,1 / 0),
    this.max = void 0 !== t ? t : new THREE.Vector3(-(1 / 0),-(1 / 0),-(1 / 0))
}
,
THREE.Box3.prototype = {
    constructor: THREE.Box3,
    set: function(e, t) {
        return this.min.copy(e),
        this.max.copy(t),
        this
    },
    setFromArray: function(e) {
        for (var t = 1 / 0, i = 1 / 0, n = 1 / 0, r = -(1 / 0), a = -(1 / 0), o = -(1 / 0), s = 0, c = e.length; c > s; s += 3) {
            var h = e[s]
              , l = e[s + 1]
              , u = e[s + 2];
            t > h && (t = h),
            i > l && (i = l),
            n > u && (n = u),
            h > r && (r = h),
            l > a && (a = l),
            u > o && (o = u)
        }
        this.min.set(t, i, n),
        this.max.set(r, a, o)
    },
    setFromPoints: function(e) {
        this.makeEmpty();
        for (var t = 0, i = e.length; i > t; t++)
            this.expandByPoint(e[t]);
        return this
    },
    setFromCenterAndSize: function() {
        var e = new THREE.Vector3;
        return function(t, i) {
            var n = e.copy(i).multiplyScalar(.5);
            return this.min.copy(t).sub(n),
            this.max.copy(t).add(n),
            this
        }
    }(),
    setFromObject: function() {
        var e = new THREE.Vector3;
        return function(t) {
            var i = this;
            return t.updateMatrixWorld(!0),
            this.makeEmpty(),
            t.traverse(function(t) {
                var n = t.geometry;
                if (void 0 !== n)
                    if (n instanceof THREE.Geometry)
                        for (var r = n.vertices, n = 0, a = r.length; a > n; n++)
                            e.copy(r[n]),
                            e.applyMatrix4(t.matrixWorld),
                            i.expandByPoint(e);
                    else if (n instanceof THREE.BufferGeometry && void 0 !== n.attributes.position)
                        for (r = n.attributes.position.array,
                        n = 0,
                        a = r.length; a > n; n += 3)
                            e.fromArray(r, n),
                            e.applyMatrix4(t.matrixWorld),
                            i.expandByPoint(e)
            }),
            this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.min.copy(e.min),
        this.max.copy(e.max),
        this
    },
    makeEmpty: function() {
        return this.min.x = this.min.y = this.min.z = 1 / 0,
        this.max.x = this.max.y = this.max.z = -(1 / 0),
        this
    },
    isEmpty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    },
    center: function(e) {
        return (e || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function(e) {
        return (e || new THREE.Vector3).subVectors(this.max, this.min)
    },
    expandByPoint: function(e) {
        return this.min.min(e),
        this.max.max(e),
        this
    },
    expandByVector: function(e) {
        return this.min.sub(e),
        this.max.add(e),
        this
    },
    expandByScalar: function(e) {
        return this.min.addScalar(-e),
        this.max.addScalar(e),
        this
    },
    containsPoint: function(e) {
        return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
    },
    containsBox: function(e) {
        return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
    },
    getParameter: function(e, t) {
        return (t || new THREE.Vector3).set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
    },
    intersectsBox: function(e) {
        return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
    },
    intersectsSphere: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Vector3),
            this.clampPoint(t.center, e),
            e.distanceToSquared(t.center) <= t.radius * t.radius
        }
    }(),
    intersectsPlane: function(e) {
        var t, i;
        return 0 < e.normal.x ? (t = e.normal.x * this.min.x,
        i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x,
        i = e.normal.x * this.min.x),
        0 < e.normal.y ? (t += e.normal.y * this.min.y,
        i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y,
        i += e.normal.y * this.min.y),
        0 < e.normal.z ? (t += e.normal.z * this.min.z,
        i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z,
        i += e.normal.z * this.min.z),
        t <= e.constant && i >= e.constant
    },
    clampPoint: function(e, t) {
        return (t || new THREE.Vector3).copy(e).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var e = new THREE.Vector3;
        return function(t) {
            return e.copy(t).clamp(this.min, this.max).sub(t).length()
        }
    }(),
    getBoundingSphere: function() {
        var e = new THREE.Vector3;
        return function(t) {
            return t = t || new THREE.Sphere,
            t.center = this.center(),
            t.radius = .5 * this.size(e).length(),
            t
        }
    }(),
    intersect: function(e) {
        return this.min.max(e.min),
        this.max.min(e.max),
        this.isEmpty() && this.makeEmpty(),
        this
    },
    union: function(e) {
        return this.min.min(e.min),
        this.max.max(e.max),
        this
    },
    applyMatrix4: function() {
        var e = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
        return function(t) {
            return this.isEmpty() ? this : (e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
            e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
            e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
            e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
            e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
            e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
            e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
            e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
            this.setFromPoints(e),
            this)
        }
    }(),
    translate: function(e) {
        return this.min.add(e),
        this.max.add(e),
        this
    },
    equals: function(e) {
        return e.min.equals(this.min) && e.max.equals(this.max)
    }
},
THREE.Matrix3 = function() {
    this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]),
    0 < arguments.length && void 0
}
,
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    set: function(e, t, i, n, r, a, o, s, c) {
        var h = this.elements;
        return h[0] = e,
        h[1] = n,
        h[2] = o,
        h[3] = t,
        h[4] = r,
        h[5] = s,
        h[6] = i,
        h[7] = a,
        h[8] = c,
        this
    },
    identity: function() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
        this
    },
    clone: function() {
        return (new this.constructor).fromArray(this.elements)
    },
    copy: function(e) {
        return e = e.elements,
        this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]),
        this
    },
    setFromMatrix4: function(e) {
        return e = e.elements,
        this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
        this
    },
    applyToVector3Array: function() {
        var e;
        return function(t, i, n) {
            void 0 === e && (e = new THREE.Vector3),
            void 0 === i && (i = 0),
            void 0 === n && (n = t.length);
            for (var r = 0; n > r; r += 3,
            i += 3)
                e.fromArray(t, i),
                e.applyMatrix3(this),
                e.toArray(t, i);
            return t
        }
    }(),
    applyToBuffer: function() {
        var e;
        return function(t, i, n) {
            void 0 === e && (e = new THREE.Vector3),
            void 0 === i && (i = 0),
            void 0 === n && (n = t.length / t.itemSize);
            for (var r = 0; n > r; r++,
            i++)
                e.x = t.getX(i),
                e.y = t.getY(i),
                e.z = t.getZ(i),
                e.applyMatrix3(this),
                t.setXYZ(e.x, e.y, e.z);
            return t
        }
    }(),
    multiplyScalar: function(e) {
        var t = this.elements;
        return t[0] *= e,
        t[3] *= e,
        t[6] *= e,
        t[1] *= e,
        t[4] *= e,
        t[7] *= e,
        t[2] *= e,
        t[5] *= e,
        t[8] *= e,
        this
    },
    determinant: function() {
        var e = this.elements
          , t = e[0]
          , i = e[1]
          , n = e[2]
          , r = e[3]
          , a = e[4]
          , o = e[5]
          , s = e[6]
          , c = e[7]
          , e = e[8];
        return t * a * e - t * o * c - i * r * e + i * o * s + n * r * c - n * a * s
    },
    getInverse: function(e, t) {
        e instanceof THREE.Matrix4 && void 0;
        var i = e.elements
          , n = this.elements
          , r = i[0]
          , a = i[1]
          , o = i[2]
          , s = i[3]
          , c = i[4]
          , h = i[5]
          , l = i[6]
          , u = i[7]
          , i = i[8]
          , p = i * c - h * u
          , d = h * l - i * s
          , f = u * s - c * l
          , E = r * p + a * d + o * f;
        if (0 === E) {
            if (t)
                throw Error("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");
            return this.identity()
        }
        return E = 1 / E,
        n[0] = p * E,
        n[1] = (o * u - i * a) * E,
        n[2] = (h * a - o * c) * E,
        n[3] = d * E,
        n[4] = (i * r - o * l) * E,
        n[5] = (o * s - h * r) * E,
        n[6] = f * E,
        n[7] = (a * l - u * r) * E,
        n[8] = (c * r - a * s) * E,
        this
    },
    transpose: function() {
        var e, t = this.elements;
        return e = t[1],
        t[1] = t[3],
        t[3] = e,
        e = t[2],
        t[2] = t[6],
        t[6] = e,
        e = t[5],
        t[5] = t[7],
        t[7] = e,
        this
    },
    flattenToArrayOffset: function(e, t) {
        return this.toArray(e, t)
    },
    getNormalMatrix: function(e) {
        return this.setFromMatrix4(e).getInverse(this).transpose()
    },
    transposeIntoArray: function(e) {
        var t = this.elements;
        return e[0] = t[0],
        e[1] = t[3],
        e[2] = t[6],
        e[3] = t[1],
        e[4] = t[4],
        e[5] = t[7],
        e[6] = t[2],
        e[7] = t[5],
        e[8] = t[8],
        this
    },
    fromArray: function(e) {
        return this.elements.set(e),
        this
    },
    toArray: function(e, t) {
        void 0 === e && (e = []),
        void 0 === t && (t = 0);
        var i = this.elements;
        return e[t] = i[0],
        e[t + 1] = i[1],
        e[t + 2] = i[2],
        e[t + 3] = i[3],
        e[t + 4] = i[4],
        e[t + 5] = i[5],
        e[t + 6] = i[6],
        e[t + 7] = i[7],
        e[t + 8] = i[8],
        e
    }
},
THREE.Matrix4 = function() {
    this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
    0 < arguments.length && void 0
}
,
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function(e, t, i, n, r, a, o, s, c, h, l, u, p, d, f, E) {
        var m = this.elements;
        return m[0] = e,
        m[4] = t,
        m[8] = i,
        m[12] = n,
        m[1] = r,
        m[5] = a,
        m[9] = o,
        m[13] = s,
        m[2] = c,
        m[6] = h,
        m[10] = l,
        m[14] = u,
        m[3] = p,
        m[7] = d,
        m[11] = f,
        m[15] = E,
        this
    },
    identity: function() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    },
    clone: function() {
        return (new THREE.Matrix4).fromArray(this.elements)
    },
    copy: function(e) {
        return this.elements.set(e.elements),
        this
    },
    copyPosition: function(e) {
        var t = this.elements;
        return e = e.elements,
        t[12] = e[12],
        t[13] = e[13],
        t[14] = e[14],
        this
    },
    extractBasis: function(e, t, i) {
        return e.setFromMatrixColumn(this, 0),
        t.setFromMatrixColumn(this, 1),
        i.setFromMatrixColumn(this, 2),
        this
    },
    makeBasis: function(e, t, i) {
        return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1),
        this
    },
    extractRotation: function() {
        var e;
        return function(t) {
            void 0 === e && (e = new THREE.Vector3);
            var i = this.elements
              , n = t.elements
              , r = 1 / e.setFromMatrixColumn(t, 0).length()
              , a = 1 / e.setFromMatrixColumn(t, 1).length();
            return t = 1 / e.setFromMatrixColumn(t, 2).length(),
            i[0] = n[0] * r,
            i[1] = n[1] * r,
            i[2] = n[2] * r,
            i[4] = n[4] * a,
            i[5] = n[5] * a,
            i[6] = n[6] * a,
            i[8] = n[8] * t,
            i[9] = n[9] * t,
            i[10] = n[10] * t,
            this
        }
    }(),
    makeRotationFromEuler: function(e) {
        !1 == e instanceof THREE.Euler && void 0;
        var t = this.elements
          , i = e.x
          , n = e.y
          , r = e.z
          , a = Math.cos(i)
          , i = Math.sin(i)
          , o = Math.cos(n)
          , n = Math.sin(n)
          , s = Math.cos(r)
          , r = Math.sin(r);
        if ("XYZ" === e.order) {
            e = a * s;
            var c = a * r
              , h = i * s
              , l = i * r;
            t[0] = o * s,
            t[4] = -o * r,
            t[8] = n,
            t[1] = c + h * n,
            t[5] = e - l * n,
            t[9] = -i * o,
            t[2] = l - e * n,
            t[6] = h + c * n,
            t[10] = a * o
        } else
            "YXZ" === e.order ? (e = o * s,
            c = o * r,
            h = n * s,
            l = n * r,
            t[0] = e + l * i,
            t[4] = h * i - c,
            t[8] = a * n,
            t[1] = a * r,
            t[5] = a * s,
            t[9] = -i,
            t[2] = c * i - h,
            t[6] = l + e * i,
            t[10] = a * o) : "ZXY" === e.order ? (e = o * s,
            c = o * r,
            h = n * s,
            l = n * r,
            t[0] = e - l * i,
            t[4] = -a * r,
            t[8] = h + c * i,
            t[1] = c + h * i,
            t[5] = a * s,
            t[9] = l - e * i,
            t[2] = -a * n,
            t[6] = i,
            t[10] = a * o) : "ZYX" === e.order ? (e = a * s,
            c = a * r,
            h = i * s,
            l = i * r,
            t[0] = o * s,
            t[4] = h * n - c,
            t[8] = e * n + l,
            t[1] = o * r,
            t[5] = l * n + e,
            t[9] = c * n - h,
            t[2] = -n,
            t[6] = i * o,
            t[10] = a * o) : "YZX" === e.order ? (e = a * o,
            c = a * n,
            h = i * o,
            l = i * n,
            t[0] = o * s,
            t[4] = l - e * r,
            t[8] = h * r + c,
            t[1] = r,
            t[5] = a * s,
            t[9] = -i * s,
            t[2] = -n * s,
            t[6] = c * r + h,
            t[10] = e - l * r) : "XZY" === e.order && (e = a * o,
            c = a * n,
            h = i * o,
            l = i * n,
            t[0] = o * s,
            t[4] = -r,
            t[8] = n * s,
            t[1] = e * r + l,
            t[5] = a * s,
            t[9] = c * r - h,
            t[2] = h * r - c,
            t[6] = i * s,
            t[10] = l * r + e);
        return t[3] = 0,
        t[7] = 0,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        this
    },
    makeRotationFromQuaternion: function(e) {
        var t = this.elements
          , i = e.x
          , n = e.y
          , r = e.z
          , a = e.w
          , o = i + i
          , s = n + n
          , c = r + r;
        e = i * o;
        var h = i * s
          , i = i * c
          , l = n * s
          , n = n * c
          , r = r * c
          , o = a * o
          , s = a * s
          , a = a * c;
        return t[0] = 1 - (l + r),
        t[4] = h - a,
        t[8] = i + s,
        t[1] = h + a,
        t[5] = 1 - (e + r),
        t[9] = n - o,
        t[2] = i - s,
        t[6] = n + o,
        t[10] = 1 - (e + l),
        t[3] = 0,
        t[7] = 0,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        this
    },
    lookAt: function() {
        var e, t, i;
        return function(n, r, a) {
            void 0 === e && (e = new THREE.Vector3,
            t = new THREE.Vector3,
            i = new THREE.Vector3);
            var o = this.elements;
            return i.subVectors(n, r).normalize(),
            0 === i.lengthSq() && (i.z = 1),
            e.crossVectors(a, i).normalize(),
            0 === e.lengthSq() && (i.z += 1e-4,
            e.crossVectors(a, i).normalize()),
            t.crossVectors(i, e),
            o[0] = e.x,
            o[4] = t.x,
            o[8] = i.x,
            o[1] = e.y,
            o[5] = t.y,
            o[9] = i.y,
            o[2] = e.z,
            o[6] = t.z,
            o[10] = i.z,
            this
        }
    }(),
    multiply: function(e, t) {
        return void 0 !== t ? this.multiplyMatrices(e, t) : this.multiplyMatrices(this, e)
    },
    premultiply: function(e) {
        return this.multiplyMatrices(e, this)
    },
    multiplyMatrices: function(e, t) {
        var i = e.elements
          , n = t.elements
          , r = this.elements
          , a = i[0]
          , o = i[4]
          , s = i[8]
          , c = i[12]
          , h = i[1]
          , l = i[5]
          , u = i[9]
          , p = i[13]
          , d = i[2]
          , f = i[6]
          , E = i[10]
          , m = i[14]
          , g = i[3]
          , v = i[7]
          , T = i[11]
          , i = i[15]
          , y = n[0]
          , R = n[4]
          , x = n[8]
          , H = n[12]
          , b = n[1]
          , M = n[5]
          , _ = n[9]
          , w = n[13]
          , S = n[2]
          , A = n[6]
          , L = n[10]
          , C = n[14]
          , P = n[3]
          , I = n[7]
          , B = n[11]
          , n = n[15];
        return r[0] = a * y + o * b + s * S + c * P,
        r[4] = a * R + o * M + s * A + c * I,
        r[8] = a * x + o * _ + s * L + c * B,
        r[12] = a * H + o * w + s * C + c * n,
        r[1] = h * y + l * b + u * S + p * P,
        r[5] = h * R + l * M + u * A + p * I,
        r[9] = h * x + l * _ + u * L + p * B,
        r[13] = h * H + l * w + u * C + p * n,
        r[2] = d * y + f * b + E * S + m * P,
        r[6] = d * R + f * M + E * A + m * I,
        r[10] = d * x + f * _ + E * L + m * B,
        r[14] = d * H + f * w + E * C + m * n,
        r[3] = g * y + v * b + T * S + i * P,
        r[7] = g * R + v * M + T * A + i * I,
        r[11] = g * x + v * _ + T * L + i * B,
        r[15] = g * H + v * w + T * C + i * n,
        this
    },
    multiplyToArray: function(e, t, i) {
        var n = this.elements;
        return this.multiplyMatrices(e, t),
        i[0] = n[0],
        i[1] = n[1],
        i[2] = n[2],
        i[3] = n[3],
        i[4] = n[4],
        i[5] = n[5],
        i[6] = n[6],
        i[7] = n[7],
        i[8] = n[8],
        i[9] = n[9],
        i[10] = n[10],
        i[11] = n[11],
        i[12] = n[12],
        i[13] = n[13],
        i[14] = n[14],
        i[15] = n[15],
        this
    },
    multiplyScalar: function(e) {
        var t = this.elements;
        return t[0] *= e,
        t[4] *= e,
        t[8] *= e,
        t[12] *= e,
        t[1] *= e,
        t[5] *= e,
        t[9] *= e,
        t[13] *= e,
        t[2] *= e,
        t[6] *= e,
        t[10] *= e,
        t[14] *= e,
        t[3] *= e,
        t[7] *= e,
        t[11] *= e,
        t[15] *= e,
        this
    },
    applyToVector3Array: function() {
        var e;
        return function(t, i, n) {
            void 0 === e && (e = new THREE.Vector3),
            void 0 === i && (i = 0),
            void 0 === n && (n = t.length);
            for (var r = 0; n > r; r += 3,
            i += 3)
                e.fromArray(t, i),
                e.applyMatrix4(this),
                e.toArray(t, i);
            return t
        }
    }(),
    applyToBuffer: function() {
        var e;
        return function(t, i, n) {
            void 0 === e && (e = new THREE.Vector3),
            void 0 === i && (i = 0),
            void 0 === n && (n = t.length / t.itemSize);
            for (var r = 0; n > r; r++,
            i++)
                e.x = t.getX(i),
                e.y = t.getY(i),
                e.z = t.getZ(i),
                e.applyMatrix4(this),
                t.setXYZ(e.x, e.y, e.z);
            return t
        }
    }(),
    determinant: function() {
        var e = this.elements
          , t = e[0]
          , i = e[4]
          , n = e[8]
          , r = e[12]
          , a = e[1]
          , o = e[5]
          , s = e[9]
          , c = e[13]
          , h = e[2]
          , l = e[6]
          , u = e[10]
          , p = e[14];
        return e[3] * (+r * s * l - n * c * l - r * o * u + i * c * u + n * o * p - i * s * p) + e[7] * (+t * s * p - t * c * u + r * a * u - n * a * p + n * c * h - r * s * h) + e[11] * (+t * c * l - t * o * p - r * a * l + i * a * p + r * o * h - i * c * h) + e[15] * (-n * o * h - t * s * l + t * o * u + n * a * l - i * a * u + i * s * h)
    },
    transpose: function() {
        var e, t = this.elements;
        return e = t[1],
        t[1] = t[4],
        t[4] = e,
        e = t[2],
        t[2] = t[8],
        t[8] = e,
        e = t[6],
        t[6] = t[9],
        t[9] = e,
        e = t[3],
        t[3] = t[12],
        t[12] = e,
        e = t[7],
        t[7] = t[13],
        t[13] = e,
        e = t[11],
        t[11] = t[14],
        t[14] = e,
        this
    },
    flattenToArrayOffset: function(e, t) {
        return this.toArray(e, t)
    },
    getPosition: function() {
        var e;
        return function() {
            return void 0 === e && (e = new THREE.Vector3),
            e.setFromMatrixColumn(this, 3)
        }
    }(),
    setPosition: function(e) {
        var t = this.elements;
        return t[12] = e.x,
        t[13] = e.y,
        t[14] = e.z,
        this
    },
    getInverse: function(e, t) {
        var i = this.elements
          , n = e.elements
          , r = n[0]
          , a = n[1]
          , o = n[2]
          , s = n[3]
          , c = n[4]
          , h = n[5]
          , l = n[6]
          , u = n[7]
          , p = n[8]
          , d = n[9]
          , f = n[10]
          , E = n[11]
          , m = n[12]
          , g = n[13]
          , v = n[14]
          , n = n[15]
          , T = d * v * u - g * f * u + g * l * E - h * v * E - d * l * n + h * f * n
          , y = m * f * u - p * v * u - m * l * E + c * v * E + p * l * n - c * f * n
          , R = p * g * u - m * d * u + m * h * E - c * g * E - p * h * n + c * d * n
          , x = m * d * l - p * g * l - m * h * f + c * g * f + p * h * v - c * d * v
          , H = r * T + a * y + o * R + s * x;
        if (0 === H) {
            if (t)
                throw Error("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
            return this.identity()
        }
        return H = 1 / H,
        i[0] = T * H,
        i[1] = (g * f * s - d * v * s - g * o * E + a * v * E + d * o * n - a * f * n) * H,
        i[2] = (h * v * s - g * l * s + g * o * u - a * v * u - h * o * n + a * l * n) * H,
        i[3] = (d * l * s - h * f * s - d * o * u + a * f * u + h * o * E - a * l * E) * H,
        i[4] = y * H,
        i[5] = (p * v * s - m * f * s + m * o * E - r * v * E - p * o * n + r * f * n) * H,
        i[6] = (m * l * s - c * v * s - m * o * u + r * v * u + c * o * n - r * l * n) * H,
        i[7] = (c * f * s - p * l * s + p * o * u - r * f * u - c * o * E + r * l * E) * H,
        i[8] = R * H,
        i[9] = (m * d * s - p * g * s - m * a * E + r * g * E + p * a * n - r * d * n) * H,
        i[10] = (c * g * s - m * h * s + m * a * u - r * g * u - c * a * n + r * h * n) * H,
        i[11] = (p * h * s - c * d * s - p * a * u + r * d * u + c * a * E - r * h * E) * H,
        i[12] = x * H,
        i[13] = (p * g * o - m * d * o + m * a * f - r * g * f - p * a * v + r * d * v) * H,
        i[14] = (m * h * o - c * g * o - m * a * l + r * g * l + c * a * v - r * h * v) * H,
        i[15] = (c * d * o - p * h * o + p * a * l - r * d * l - c * a * f + r * h * f) * H,
        this
    },
    scale: function(e) {
        var t = this.elements
          , i = e.x
          , n = e.y;
        return e = e.z,
        t[0] *= i,
        t[4] *= n,
        t[8] *= e,
        t[1] *= i,
        t[5] *= n,
        t[9] *= e,
        t[2] *= i,
        t[6] *= n,
        t[10] *= e,
        t[3] *= i,
        t[7] *= n,
        t[11] *= e,
        this
    },
    getMaxScaleOnAxis: function() {
        var e = this.elements;
        return Math.sqrt(Math.max(e[0] * e[0] + e[1] * e[1] + e[2] * e[2], e[4] * e[4] + e[5] * e[5] + e[6] * e[6], e[8] * e[8] + e[9] * e[9] + e[10] * e[10]))
    },
    makeTranslation: function(e, t, i) {
        return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1),
        this
    },
    makeRotationX: function(e) {
        var t = Math.cos(e);
        return e = Math.sin(e),
        this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1),
        this
    },
    makeRotationY: function(e) {
        var t = Math.cos(e);
        return e = Math.sin(e),
        this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1),
        this
    },
    makeRotationZ: function(e) {
        var t = Math.cos(e);
        return e = Math.sin(e),
        this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    },
    makeRotationAxis: function(e, t) {
        var i = Math.cos(t)
          , n = Math.sin(t)
          , r = 1 - i
          , a = e.x
          , o = e.y
          , s = e.z
          , c = r * a
          , h = r * o;
        return this.set(c * a + i, c * o - n * s, c * s + n * o, 0, c * o + n * s, h * o + i, h * s - n * a, 0, c * s - n * o, h * s + n * a, r * s * s + i, 0, 0, 0, 0, 1),
        this
    },
    makeScale: function(e, t, i) {
        return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1),
        this
    },
    compose: function(e, t, i) {
        return this.makeRotationFromQuaternion(t),
        this.scale(i),
        this.setPosition(e),
        this
    },
    decompose: function() {
        var e, t;
        return function(i, n, r) {
            void 0 === e && (e = new THREE.Vector3,
            t = new THREE.Matrix4);
            var a = this.elements
              , o = e.set(a[0], a[1], a[2]).length()
              , s = e.set(a[4], a[5], a[6]).length()
              , c = e.set(a[8], a[9], a[10]).length();
            0 > this.determinant() && (o = -o),
            i.x = a[12],
            i.y = a[13],
            i.z = a[14],
            t.elements.set(this.elements),
            i = 1 / o;
            var a = 1 / s
              , h = 1 / c;
            return t.elements[0] *= i,
            t.elements[1] *= i,
            t.elements[2] *= i,
            t.elements[4] *= a,
            t.elements[5] *= a,
            t.elements[6] *= a,
            t.elements[8] *= h,
            t.elements[9] *= h,
            t.elements[10] *= h,
            n.setFromRotationMatrix(t),
            r.x = o,
            r.y = s,
            r.z = c,
            this
        }
    }(),
    makeFrustum: function(e, t, i, n, r, a) {
        var o = this.elements;
        return o[0] = 2 * r / (t - e),
        o[4] = 0,
        o[8] = (t + e) / (t - e),
        o[12] = 0,
        o[1] = 0,
        o[5] = 2 * r / (n - i),
        o[9] = (n + i) / (n - i),
        o[13] = 0,
        o[2] = 0,
        o[6] = 0,
        o[10] = -(a + r) / (a - r),
        o[14] = -2 * a * r / (a - r),
        o[3] = 0,
        o[7] = 0,
        o[11] = -1,
        o[15] = 0,
        this
    },
    makePerspective: function(e, t, i, n) {
        e = i * Math.tan(THREE.Math.DEG2RAD * e * .5);
        var r = -e;
        return this.makeFrustum(r * t, e * t, r, e, i, n)
    },
    makeOrthographic: function(e, t, i, n, r, a) {
        var o = this.elements
          , s = 1 / (t - e)
          , c = 1 / (i - n)
          , h = 1 / (a - r);
        return o[0] = 2 * s,
        o[4] = 0,
        o[8] = 0,
        o[12] = -((t + e) * s),
        o[1] = 0,
        o[5] = 2 * c,
        o[9] = 0,
        o[13] = -((i + n) * c),
        o[2] = 0,
        o[6] = 0,
        o[10] = -2 * h,
        o[14] = -((a + r) * h),
        o[3] = 0,
        o[7] = 0,
        o[11] = 0,
        o[15] = 1,
        this
    },
    equals: function(e) {
        var t = this.elements;
        e = e.elements;
        for (var i = 0; 16 > i; i++)
            if (t[i] !== e[i])
                return !1;
        return !0
    },
    fromArray: function(e) {
        return this.elements.set(e),
        this
    },
    toArray: function(e, t) {
        void 0 === e && (e = []),
        void 0 === t && (t = 0);
        var i = this.elements;
        return e[t] = i[0],
        e[t + 1] = i[1],
        e[t + 2] = i[2],
        e[t + 3] = i[3],
        e[t + 4] = i[4],
        e[t + 5] = i[5],
        e[t + 6] = i[6],
        e[t + 7] = i[7],
        e[t + 8] = i[8],
        e[t + 9] = i[9],
        e[t + 10] = i[10],
        e[t + 11] = i[11],
        e[t + 12] = i[12],
        e[t + 13] = i[13],
        e[t + 14] = i[14],
        e[t + 15] = i[15],
        e
    }
},
THREE.Ray = function(e, t) {
    this.origin = void 0 !== e ? e : new THREE.Vector3,
    this.direction = void 0 !== t ? t : new THREE.Vector3
}
,
THREE.Ray.prototype = {
    constructor: THREE.Ray,
    set: function(e, t) {
        return this.origin.copy(e),
        this.direction.copy(t),
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.origin.copy(e.origin),
        this.direction.copy(e.direction),
        this
    },
    at: function(e, t) {
        return (t || new THREE.Vector3).copy(this.direction).multiplyScalar(e).add(this.origin)
    },
    lookAt: function(e) {
        return this.direction.copy(e).sub(this.origin).normalize(),
        this
    },
    recast: function() {
        var e = new THREE.Vector3;
        return function(t) {
            return this.origin.copy(this.at(t, e)),
            this
        }
    }(),
    closestPointToPoint: function(e, t) {
        var i = t || new THREE.Vector3;
        i.subVectors(e, this.origin);
        var n = i.dot(this.direction);
        return 0 > n ? i.copy(this.origin) : i.copy(this.direction).multiplyScalar(n).add(this.origin)
    },
    distanceToPoint: function(e) {
        return Math.sqrt(this.distanceSqToPoint(e))
    },
    distanceSqToPoint: function() {
        var e = new THREE.Vector3;
        return function(t) {
            var i = e.subVectors(t, this.origin).dot(this.direction);
            return 0 > i ? this.origin.distanceToSquared(t) : (e.copy(this.direction).multiplyScalar(i).add(this.origin),
            e.distanceToSquared(t))
        }
    }(),
    distanceSqToSegment: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3
          , i = new THREE.Vector3;
        return function(n, r, a, o) {
            e.copy(n).add(r).multiplyScalar(.5),
            t.copy(r).sub(n).normalize(),
            i.copy(this.origin).sub(e);
            var s, c = .5 * n.distanceTo(r), h = -this.direction.dot(t), l = i.dot(this.direction), u = -i.dot(t), p = i.lengthSq(), d = Math.abs(1 - h * h);
            return d > 0 ? (n = h * u - l,
            r = h * l - u,
            s = c * d,
            n >= 0 ? r >= -s ? s >= r ? (c = 1 / d,
            n *= c,
            r *= c,
            h = n * (n + h * r + 2 * l) + r * (h * n + r + 2 * u) + p) : (r = c,
            n = Math.max(0, -(h * r + l)),
            h = -n * n + r * (r + 2 * u) + p) : (r = -c,
            n = Math.max(0, -(h * r + l)),
            h = -n * n + r * (r + 2 * u) + p) : -s >= r ? (n = Math.max(0, -(-h * c + l)),
            r = n > 0 ? -c : Math.min(Math.max(-c, -u), c),
            h = -n * n + r * (r + 2 * u) + p) : s >= r ? (n = 0,
            r = Math.min(Math.max(-c, -u), c),
            h = r * (r + 2 * u) + p) : (n = Math.max(0, -(h * c + l)),
            r = n > 0 ? c : Math.min(Math.max(-c, -u), c),
            h = -n * n + r * (r + 2 * u) + p)) : (r = h > 0 ? -c : c,
            n = Math.max(0, -(h * r + l)),
            h = -n * n + r * (r + 2 * u) + p),
            a && a.copy(this.direction).multiplyScalar(n).add(this.origin),
            o && o.copy(t).multiplyScalar(r).add(e),
            h
        }
    }(),
    intersectSphere: function() {
        var e = new THREE.Vector3;
        return function(t, i) {
            e.subVectors(t.center, this.origin);
            var n = e.dot(this.direction)
              , r = e.dot(e) - n * n
              , a = t.radius * t.radius;
            return r > a ? null : (a = Math.sqrt(a - r),
            r = n - a,
            n += a,
            0 > r && 0 > n ? null : 0 > r ? this.at(n, i) : this.at(r, i))
        }
    }(),
    intersectsSphere: function(e) {
        return this.distanceToPoint(e.center) <= e.radius
    },
    distanceToPlane: function(e) {
        var t = e.normal.dot(this.direction);
        return 0 === t ? 0 === e.distanceToPoint(this.origin) ? 0 : null : (e = -(this.origin.dot(e.normal) + e.constant) / t,
        e >= 0 ? e : null )
    },
    intersectPlane: function(e, t) {
        var i = this.distanceToPlane(e);
        return null === i ? null : this.at(i, t)
    },
    intersectsPlane: function(e) {
        var t = e.distanceToPoint(this.origin);
        return 0 === t || 0 > e.normal.dot(this.direction) * t
    },
    intersectBox: function(e, t) {
        var i, n, r, a, o;
        n = 1 / this.direction.x,
        a = 1 / this.direction.y,
        o = 1 / this.direction.z;
        var s = this.origin;
        return n >= 0 ? (i = (e.min.x - s.x) * n,
        n *= e.max.x - s.x) : (i = (e.max.x - s.x) * n,
        n *= e.min.x - s.x),
        a >= 0 ? (r = (e.min.y - s.y) * a,
        a *= e.max.y - s.y) : (r = (e.max.y - s.y) * a,
        a *= e.min.y - s.y),
        i > a || r > n ? null : ((r > i || i !== i) && (i = r),
        (n > a || n !== n) && (n = a),
        o >= 0 ? (r = (e.min.z - s.z) * o,
        o *= e.max.z - s.z) : (r = (e.max.z - s.z) * o,
        o *= e.min.z - s.z),
        i > o || r > n ? null : ((r > i || i !== i) && (i = r),
        (n > o || n !== n) && (n = o),
        0 > n ? null : this.at(i >= 0 ? i : n, t)))
    },
    intersectsBox: function() {
        var e = new THREE.Vector3;
        return function(t) {
            return null !== this.intersectBox(t, e)
        }
    }(),
    intersectTriangle: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3
          , i = new THREE.Vector3
          , n = new THREE.Vector3;
        return function(r, a, o, s, c) {
            if (t.subVectors(a, r),
            i.subVectors(o, r),
            n.crossVectors(t, i),
            a = this.direction.dot(n),
            a > 0) {
                if (s)
                    return null ;
                s = 1
            } else {
                if (!(0 > a))
                    return null ;
                s = -1,
                a = -a
            }
            return e.subVectors(this.origin, r),
            r = s * this.direction.dot(i.crossVectors(e, i)),
            0 > r ? null : (o = s * this.direction.dot(t.cross(e)),
            0 > o || r + o > a ? null : (r = -s * e.dot(n),
            0 > r ? null : this.at(r / a, c)))
        }
    }(),
    applyMatrix4: function(e) {
        return this.direction.add(this.origin).applyMatrix4(e),
        this.origin.applyMatrix4(e),
        this.direction.sub(this.origin),
        this.direction.normalize(),
        this
    },
    equals: function(e) {
        return e.origin.equals(this.origin) && e.direction.equals(this.direction)
    }
},
THREE.Sphere = function(e, t) {
    this.center = void 0 !== e ? e : new THREE.Vector3,
    this.radius = void 0 !== t ? t : 0
}
,
THREE.Sphere.prototype = {
    constructor: THREE.Sphere,
    set: function(e, t) {
        return this.center.copy(e),
        this.radius = t,
        this
    },
    setFromPoints: function() {
        var e = new THREE.Box3;
        return function(t, i) {
            var n = this.center;
            void 0 !== i ? n.copy(i) : e.setFromPoints(t).center(n);
            for (var r = 0, a = 0, o = t.length; o > a; a++)
                r = Math.max(r, n.distanceToSquared(t[a]));
            return this.radius = Math.sqrt(r),
            this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.center.copy(e.center),
        this.radius = e.radius,
        this
    },
    empty: function() {
        return 0 >= this.radius
    },
    containsPoint: function(e) {
        return e.distanceToSquared(this.center) <= this.radius * this.radius
    },
    distanceToPoint: function(e) {
        return e.distanceTo(this.center) - this.radius
    },
    intersectsSphere: function(e) {
        var t = this.radius + e.radius;
        return e.center.distanceToSquared(this.center) <= t * t
    },
    intersectsBox: function(e) {
        return e.intersectsSphere(this)
    },
    intersectsPlane: function(e) {
        return Math.abs(this.center.dot(e.normal) - e.constant) <= this.radius
    },
    clampPoint: function(e, t) {
        var i = this.center.distanceToSquared(e)
          , n = t || new THREE.Vector3;
        return n.copy(e),
        i > this.radius * this.radius && (n.sub(this.center).normalize(),
        n.multiplyScalar(this.radius).add(this.center)),
        n
    },
    getBoundingBox: function(e) {
        return e = e || new THREE.Box3,
        e.set(this.center, this.center),
        e.expandByScalar(this.radius),
        e
    },
    applyMatrix4: function(e) {
        return this.center.applyMatrix4(e),
        this.radius *= e.getMaxScaleOnAxis(),
        this
    },
    translate: function(e) {
        return this.center.add(e),
        this
    },
    equals: function(e) {
        return e.center.equals(this.center) && e.radius === this.radius
    }
},
THREE.Frustum = function(e, t, i, n, r, a) {
    this.planes = [void 0 !== e ? e : new THREE.Plane, void 0 !== t ? t : new THREE.Plane, void 0 !== i ? i : new THREE.Plane, void 0 !== n ? n : new THREE.Plane, void 0 !== r ? r : new THREE.Plane, void 0 !== a ? a : new THREE.Plane]
}
,
THREE.Frustum.prototype = {
    constructor: THREE.Frustum,
    set: function(e, t, i, n, r, a) {
        var o = this.planes;
        return o[0].copy(e),
        o[1].copy(t),
        o[2].copy(i),
        o[3].copy(n),
        o[4].copy(r),
        o[5].copy(a),
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        for (var t = this.planes, i = 0; 6 > i; i++)
            t[i].copy(e.planes[i]);
        return this
    },
    setFromMatrix: function(e) {
        var t = this.planes
          , i = e.elements;
        e = i[0];
        var n = i[1]
          , r = i[2]
          , a = i[3]
          , o = i[4]
          , s = i[5]
          , c = i[6]
          , h = i[7]
          , l = i[8]
          , u = i[9]
          , p = i[10]
          , d = i[11]
          , f = i[12]
          , E = i[13]
          , m = i[14]
          , i = i[15];
        return t[0].setComponents(a - e, h - o, d - l, i - f).normalize(),
        t[1].setComponents(a + e, h + o, d + l, i + f).normalize(),
        t[2].setComponents(a + n, h + s, d + u, i + E).normalize(),
        t[3].setComponents(a - n, h - s, d - u, i - E).normalize(),
        t[4].setComponents(a - r, h - c, d - p, i - m).normalize(),
        t[5].setComponents(a + r, h + c, d + p, i + m).normalize(),
        this
    },
    intersectsObject: function() {
        var e = new THREE.Sphere;
        return function(t) {
            var i = t.geometry;
            return null === i.boundingSphere && i.computeBoundingSphere(),
            e.copy(i.boundingSphere).applyMatrix4(t.matrixWorld),
            this.intersectsSphere(e)
        }
    }(),
    intersectsSprite: function() {
        var e = new THREE.Sphere;
        return function(t) {
            return e.center.set(0, 0, 0),
            e.radius = .7071067811865476,
            e.applyMatrix4(t.matrixWorld),
            this.intersectsSphere(e)
        }
    }(),
    intersectsSphere: function(e) {
        var t = this.planes
          , i = e.center;
        e = -e.radius;
        for (var n = 0; 6 > n; n++)
            if (t[n].distanceToPoint(i) < e)
                return !1;
        return !0
    },
    intersectsBox: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3;
        return function(i) {
            for (var n = this.planes, r = 0; 6 > r; r++) {
                var a = n[r];
                e.x = 0 < a.normal.x ? i.min.x : i.max.x,
                t.x = 0 < a.normal.x ? i.max.x : i.min.x,
                e.y = 0 < a.normal.y ? i.min.y : i.max.y,
                t.y = 0 < a.normal.y ? i.max.y : i.min.y,
                e.z = 0 < a.normal.z ? i.min.z : i.max.z,
                t.z = 0 < a.normal.z ? i.max.z : i.min.z;
                var o = a.distanceToPoint(e)
                  , a = a.distanceToPoint(t);
                if (0 > o && 0 > a)
                    return !1
            }
            return !0
        }
    }(),
    containsPoint: function(e) {
        for (var t = this.planes, i = 0; 6 > i; i++)
            if (0 > t[i].distanceToPoint(e))
                return !1;
        return !0
    }
},
THREE.Plane = function(e, t) {
    this.normal = void 0 !== e ? e : new THREE.Vector3(1,0,0),
    this.constant = void 0 !== t ? t : 0
}
,
THREE.Plane.prototype = {
    constructor: THREE.Plane,
    set: function(e, t) {
        return this.normal.copy(e),
        this.constant = t,
        this
    },
    setComponents: function(e, t, i, n) {
        return this.normal.set(e, t, i),
        this.constant = n,
        this
    },
    setFromNormalAndCoplanarPoint: function(e, t) {
        return this.normal.copy(e),
        this.constant = -t.dot(this.normal),
        this
    },
    setFromCoplanarPoints: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3;
        return function(i, n, r) {
            return n = e.subVectors(r, n).cross(t.subVectors(i, n)).normalize(),
            this.setFromNormalAndCoplanarPoint(n, i),
            this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.normal.copy(e.normal),
        this.constant = e.constant,
        this
    },
    normalize: function() {
        var e = 1 / this.normal.length();
        return this.normal.multiplyScalar(e),
        this.constant *= e,
        this
    },
    negate: function() {
        return this.constant *= -1,
        this.normal.negate(),
        this
    },
    distanceToPoint: function(e) {
        return this.normal.dot(e) + this.constant
    },
    distanceToSphere: function(e) {
        return this.distanceToPoint(e.center) - e.radius
    },
    projectPoint: function(e, t) {
        return this.orthoPoint(e, t).sub(e).negate()
    },
    orthoPoint: function(e, t) {
        var i = this.distanceToPoint(e);
        return (t || new THREE.Vector3).copy(this.normal).multiplyScalar(i)
    },
    intersectLine: function() {
        var e = new THREE.Vector3;
        return function(t, i) {
            var n = i || new THREE.Vector3
              , r = t.delta(e)
              , a = this.normal.dot(r);
            return 0 !== a ? (a = -(t.start.dot(this.normal) + this.constant) / a,
            0 > a || a > 1 ? void 0 : n.copy(r).multiplyScalar(a).add(t.start)) : 0 === this.distanceToPoint(t.start) ? n.copy(t.start) : void 0
        }
    }(),
    intersectsLine: function(e) {
        var t = this.distanceToPoint(e.start);
        return e = this.distanceToPoint(e.end),
        0 > t && e > 0 || 0 > e && t > 0
    },
    intersectsBox: function(e) {
        return e.intersectsPlane(this)
    },
    intersectsSphere: function(e) {
        return e.intersectsPlane(this)
    },
    coplanarPoint: function(e) {
        return (e || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
    },
    applyMatrix4: function() {
        var e = new THREE.Vector3
          , t = new THREE.Matrix3;
        return function(i, n) {
            var r = this.coplanarPoint(e).applyMatrix4(i)
              , a = n || t.getNormalMatrix(i)
              , a = this.normal.applyMatrix3(a).normalize();
            return this.constant = -r.dot(a),
            this
        }
    }(),
    translate: function(e) {
        return this.constant -= e.dot(this.normal),
        this
    },
    equals: function(e) {
        return e.normal.equals(this.normal) && e.constant === this.constant
    }
},
THREE.Spherical = function(e, t, i) {
    return this.radius = void 0 !== e ? e : 1,
    this.phi = void 0 !== t ? t : 0,
    this.theta = void 0 !== i ? i : 0,
    this
}
,
THREE.Spherical.prototype = {
    constructor: THREE.Spherical,
    set: function(e, t, i) {
        return this.radius = e,
        this.phi = t,
        this.theta = i,
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.radius.copy(e.radius),
        this.phi.copy(e.phi),
        this.theta.copy(e.theta),
        this
    },
    makeSafe: function() {
        return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)),
        this
    },
    setFromVector3: function(e) {
        return this.radius = e.length(),
        0 === this.radius ? this.phi = this.theta = 0 : (this.theta = Math.atan2(e.x, e.z),
        this.phi = Math.acos(THREE.Math.clamp(e.y / this.radius, -1, 1))),
        this
    }
},
THREE.Math = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function() {
        var e, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), i = Array(36), n = 0;
        return function() {
            for (var r = 0; 36 > r; r++)
                8 === r || 13 === r || 18 === r || 23 === r ? i[r] = "-" : 14 === r ? i[r] = "4" : (2 >= n && (n = 33554432 + 16777216 * Math.random() | 0),
                e = 15 & n,
                n >>= 4,
                i[r] = t[19 === r ? 3 & e | 8 : e]);
            return i.join("")
        }
    }(),
    clamp: function(e, t, i) {
        return Math.max(t, Math.min(i, e))
    },
    euclideanModulo: function(e, t) {
        return (e % t + t) % t
    },
    mapLinear: function(e, t, i, n, r) {
        return n + (e - t) * (r - n) / (i - t)
    },
    smoothstep: function(e, t, i) {
        return t >= e ? 0 : e >= i ? 1 : (e = (e - t) / (i - t),
        e * e * (3 - 2 * e))
    },
    smootherstep: function(e, t, i) {
        return t >= e ? 0 : e >= i ? 1 : (e = (e - t) / (i - t),
        e * e * e * (e * (6 * e - 15) + 10))
    },
    random16: function() {
        return Math.random()
    },
    randInt: function(e, t) {
        return e + Math.floor(Math.random() * (t - e + 1))
    },
    randFloat: function(e, t) {
        return e + Math.random() * (t - e)
    },
    randFloatSpread: function(e) {
        return e * (.5 - Math.random())
    },
    degToRad: function(e) {
        return e * THREE.Math.DEG2RAD
    },
    radToDeg: function(e) {
        return e * THREE.Math.RAD2DEG
    },
    isPowerOfTwo: function(e) {
        return 0 === (e & e - 1) && 0 !== e
    },
    nearestPowerOfTwo: function(e) {
        return Math.pow(2, Math.round(Math.log(e) / Math.LN2))
    },
    nextPowerOfTwo: function(e) {
        return e--,
        e |= e >> 1,
        e |= e >> 2,
        e |= e >> 4,
        e |= e >> 8,
        e |= e >> 16,
        e++,
        e
    }
},
THREE.Spline = function(e) {
    function t(e, t, i, n, r, a, o) {
        return e = .5 * (i - e),
        n = .5 * (n - t),
        (2 * (t - i) + e + n) * o + (-3 * (t - i) - 2 * e - n) * a + e * r + t
    }
    this.points = e;
    var i, n, r, a, o, s, c, h, l, u = [], p = {
        x: 0,
        y: 0,
        z: 0
    };
    this.initFromArray = function(e) {
        this.points = [];
        for (var t = 0; t < e.length; t++)
            this.points[t] = {
                x: e[t][0],
                y: e[t][1],
                z: e[t][2]
            }
    }
    ,
    this.getPoint = function(e) {
        return i = (this.points.length - 1) * e,
        n = Math.floor(i),
        r = i - n,
        u[0] = 0 === n ? n : n - 1,
        u[1] = n,
        u[2] = n > this.points.length - 2 ? this.points.length - 1 : n + 1,
        u[3] = n > this.points.length - 3 ? this.points.length - 1 : n + 2,
        s = this.points[u[0]],
        c = this.points[u[1]],
        h = this.points[u[2]],
        l = this.points[u[3]],
        a = r * r,
        o = r * a,
        p.x = t(s.x, c.x, h.x, l.x, r, a, o),
        p.y = t(s.y, c.y, h.y, l.y, r, a, o),
        p.z = t(s.z, c.z, h.z, l.z, r, a, o),
        p
    }
    ,
    this.getControlPointsArray = function() {
        var e, t, i = this.points.length, n = [];
        for (e = 0; i > e; e++)
            t = this.points[e],
            n[e] = [t.x, t.y, t.z];
        return n
    }
    ,
    this.getLength = function(e) {
        var t, i, n, r = t = t = 0, a = new THREE.Vector3, o = new THREE.Vector3, s = [], c = 0;
        for (s[0] = 0,
        e || (e = 100),
        i = this.points.length * e,
        a.copy(this.points[0]),
        e = 1; i > e; e++)
            t = e / i,
            n = this.getPoint(t),
            o.copy(n),
            c += o.distanceTo(a),
            a.copy(n),
            t *= this.points.length - 1,
            t = Math.floor(t),
            t !== r && (s[t] = c,
            r = t);
        return s[s.length] = c,
        {
            chunks: s,
            total: c
        }
    }
    ,
    this.reparametrizeByArcLength = function(e) {
        var t, i, n, r, a, o, s = [], c = new THREE.Vector3, h = this.getLength();
        for (s.push(c.copy(this.points[0]).clone()),
        t = 1; t < this.points.length; t++) {
            for (i = h.chunks[t] - h.chunks[t - 1],
            o = Math.ceil(e * i / h.total),
            r = (t - 1) / (this.points.length - 1),
            a = t / (this.points.length - 1),
            i = 1; o - 1 > i; i++)
                n = r + 1 / o * i * (a - r),
                n = this.getPoint(n),
                s.push(c.copy(n).clone());
            s.push(c.copy(this.points[t]).clone())
        }
        this.points = s
    }
}
,
THREE.Triangle = function(e, t, i) {
    this.a = void 0 !== e ? e : new THREE.Vector3,
    this.b = void 0 !== t ? t : new THREE.Vector3,
    this.c = void 0 !== i ? i : new THREE.Vector3
}
,
THREE.Triangle.normal = function() {
    var e = new THREE.Vector3;
    return function(t, i, n, r) {
        return r = r || new THREE.Vector3,
        r.subVectors(n, i),
        e.subVectors(t, i),
        r.cross(e),
        t = r.lengthSq(),
        t > 0 ? r.multiplyScalar(1 / Math.sqrt(t)) : r.set(0, 0, 0)
    }
}(),
THREE.Triangle.barycoordFromPoint = function() {
    var e = new THREE.Vector3
      , t = new THREE.Vector3
      , i = new THREE.Vector3;
    return function(n, r, a, o, s) {
        e.subVectors(o, r),
        t.subVectors(a, r),
        i.subVectors(n, r),
        n = e.dot(e),
        r = e.dot(t),
        a = e.dot(i);
        var c = t.dot(t);
        o = t.dot(i);
        var h = n * c - r * r;
        return s = s || new THREE.Vector3,
        0 === h ? s.set(-2, -1, -1) : (h = 1 / h,
        c = (c * a - r * o) * h,
        n = (n * o - r * a) * h,
        s.set(1 - c - n, n, c))
    }
}(),
THREE.Triangle.containsPoint = function() {
    var e = new THREE.Vector3;
    return function(t, i, n, r) {
        return t = THREE.Triangle.barycoordFromPoint(t, i, n, r, e),
        0 <= t.x && 0 <= t.y && 1 >= t.x + t.y
    }
}(),
THREE.Triangle.prototype = {
    constructor: THREE.Triangle,
    set: function(e, t, i) {
        return this.a.copy(e),
        this.b.copy(t),
        this.c.copy(i),
        this
    },
    setFromPointsAndIndices: function(e, t, i, n) {
        return this.a.copy(e[t]),
        this.b.copy(e[i]),
        this.c.copy(e[n]),
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.a.copy(e.a),
        this.b.copy(e.b),
        this.c.copy(e.c),
        this
    },
    area: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3;
        return function() {
            return e.subVectors(this.c, this.b),
            t.subVectors(this.a, this.b),
            .5 * e.cross(t).length()
        }
    }(),
    midpoint: function(e) {
        return (e || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    },
    normal: function(e) {
        return THREE.Triangle.normal(this.a, this.b, this.c, e)
    },
    plane: function(e) {
        return (e || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
    },
    barycoordFromPoint: function(e, t) {
        return THREE.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t)
    },
    containsPoint: function(e) {
        return THREE.Triangle.containsPoint(e, this.a, this.b, this.c)
    },
    closestPointToPoint: function() {
        var e, t, i, n;
        return function(r, a) {
            void 0 === e && (e = new THREE.Plane,
            t = [new THREE.Line3, new THREE.Line3, new THREE.Line3],
            i = new THREE.Vector3,
            n = new THREE.Vector3);
            var o = a || new THREE.Vector3
              , s = 1 / 0;
            if (e.setFromCoplanarPoints(this.a, this.b, this.c),
            e.projectPoint(r, i),
            !0 === this.containsPoint(i))
                o.copy(i);
            else {
                t[0].set(this.a, this.b),
                t[1].set(this.b, this.c),
                t[2].set(this.c, this.a);
                for (var c = 0; c < t.length; c++) {
                    t[c].closestPointToPoint(i, !0, n);
                    var h = i.distanceToSquared(n);
                    s > h && (s = h,
                    o.copy(n))
                }
            }
            return o
        }
    }(),
    equals: function(e) {
        return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
    }
},
THREE.Interpolant = function(e, t, i, n) {
    this.parameterPositions = e,
    this._cachedIndex = 0,
    this.resultBuffer = void 0 !== n ? n : new t.constructor(i),
    this.sampleValues = t,
    this.valueSize = i
}
,
THREE.Interpolant.prototype = {
    constructor: THREE.Interpolant,
    evaluate: function(e) {
        var t = this.parameterPositions
          , i = this._cachedIndex
          , n = t[i]
          , r = t[i - 1];
        e: {
            t: {
                i: {
                    n: if (!(n > e)) {
                        for (var a = i + 2; ; ) {
                            if (void 0 === n) {
                                if (r > e)
                                    break n;
                                return this._cachedIndex = i = t.length,
                                this.afterEnd_(i - 1, e, r)
                            }
                            if (i === a)
                                break;
                            if (r = n,
                            n = t[++i],
                            n > e)
                                break t
                        }
                        n = t.length;
                        break i
                    }
                    if (e >= r)
                        break e;
                    for (a = t[1],
                    a > e && (i = 2,
                    r = a),
                    a = i - 2; ; ) {
                        if (void 0 === r)
                            return this._cachedIndex = 0,
                            this.beforeStart_(0, e, n);
                        if (i === a)
                            break;
                        if (n = r,
                        r = t[--i - 1],
                        e >= r)
                            break t
                    }
                    n = i,
                    i = 0
                }
                for (; n > i; )
                    r = i + n >>> 1,
                    e < t[r] ? n = r : i = r + 1;
                if (n = t[i],
                r = t[i - 1],
                void 0 === r)
                    return this._cachedIndex = 0,
                    this.beforeStart_(0, e, n);
                if (void 0 === n)
                    return this._cachedIndex = i = t.length,
                    this.afterEnd_(i - 1, r, e)
            }
            this._cachedIndex = i,
            this.intervalChanged_(i, r, n)
        }
        return this.interpolate_(i, r, e, n)
    },
    settings: null ,
    DefaultSettings_: {},
    getSettings_: function() {
        return this.settings || this.DefaultSettings_
    },
    copySampleValue_: function(e) {
        var t = this.resultBuffer
          , i = this.sampleValues
          , n = this.valueSize;
        e *= n;
        for (var r = 0; r !== n; ++r)
            t[r] = i[e + r];
        return t
    },
    interpolate_: function(e, t, i, n) {
        throw Error("call to abstract method")
    },
    intervalChanged_: function(e, t, i) {}
},
Object.assign(THREE.Interpolant.prototype, {
    beforeStart_: THREE.Interpolant.prototype.copySampleValue_,
    afterEnd_: THREE.Interpolant.prototype.copySampleValue_
}),
THREE.CubicInterpolant = function(e, t, i, n) {
    THREE.Interpolant.call(this, e, t, i, n),
    this._offsetNext = this._weightNext = this._offsetPrev = this._weightPrev = -0
}
,
THREE.CubicInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.CubicInterpolant,
    DefaultSettings_: {
        endingStart: THREE.ZeroCurvatureEnding,
        endingEnd: THREE.ZeroCurvatureEnding
    },
    intervalChanged_: function(e, t, i) {
        var n = this.parameterPositions
          , r = e - 2
          , a = e + 1
          , o = n[r]
          , s = n[a];
        if (void 0 === o)
            switch (this.getSettings_().endingStart) {
            case THREE.ZeroSlopeEnding:
                r = e,
                o = 2 * t - i;
                break;
            case THREE.WrapAroundEnding:
                r = n.length - 2,
                o = t + n[r] - n[r + 1];
                break;
            default:
                r = e,
                o = i
            }
        if (void 0 === s)
            switch (this.getSettings_().endingEnd) {
            case THREE.ZeroSlopeEnding:
                a = e,
                s = 2 * i - t;
                break;
            case THREE.WrapAroundEnding:
                a = 1,
                s = i + n[1] - n[0];
                break;
            default:
                a = e - 1,
                s = t
            }
        e = .5 * (i - t),
        n = this.valueSize,
        this._weightPrev = e / (t - o),
        this._weightNext = e / (s - i),
        this._offsetPrev = r * n,
        this._offsetNext = a * n
    },
    interpolate_: function(e, t, i, n) {
        var r = this.resultBuffer
          , a = this.sampleValues
          , o = this.valueSize;
        e *= o;
        var s = e - o
          , c = this._offsetPrev
          , h = this._offsetNext
          , l = this._weightPrev
          , u = this._weightNext
          , p = (i - t) / (n - t);
        for (i = p * p,
        n = i * p,
        t = -l * n + 2 * l * i - l * p,
        l = (1 + l) * n + (-1.5 - 2 * l) * i + (-.5 + l) * p + 1,
        p = (-1 - u) * n + (1.5 + u) * i + .5 * p,
        u = u * n - u * i,
        i = 0; i !== o; ++i)
            r[i] = t * a[c + i] + l * a[s + i] + p * a[e + i] + u * a[h + i];
        return r
    }
}),
THREE.DiscreteInterpolant = function(e, t, i, n) {
    THREE.Interpolant.call(this, e, t, i, n)
}
,
THREE.DiscreteInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.DiscreteInterpolant,
    interpolate_: function(e, t, i, n) {
        return this.copySampleValue_(e - 1)
    }
}),
THREE.LinearInterpolant = function(e, t, i, n) {
    THREE.Interpolant.call(this, e, t, i, n)
}
,
THREE.LinearInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.LinearInterpolant,
    interpolate_: function(e, t, i, n) {
        var r = this.resultBuffer
          , a = this.sampleValues
          , o = this.valueSize;
        e *= o;
        var s = e - o;
        for (t = (i - t) / (n - t),
        i = 1 - t,
        n = 0; n !== o; ++n)
            r[n] = a[s + n] * i + a[e + n] * t;
        return r
    }
}),
THREE.QuaternionLinearInterpolant = function(e, t, i, n) {
    THREE.Interpolant.call(this, e, t, i, n)
}
,
THREE.QuaternionLinearInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.QuaternionLinearInterpolant,
    interpolate_: function(e, t, i, n) {
        var r = this.resultBuffer
          , a = this.sampleValues
          , o = this.valueSize;
        for (e *= o,
        t = (i - t) / (n - t),
        i = e + o; e !== i; e += 4)
            THREE.Quaternion.slerpFlat(r, 0, a, e - o, a, e, t);
        return r
    }
}),
THREE.Clock = function(e) {
    this.autoStart = void 0 !== e ? e : !0,
    this.elapsedTime = this.oldTime = this.startTime = 0,
    this.running = !1
}
,
THREE.Clock.prototype = {
    constructor: THREE.Clock,
    start: function() {
        this.oldTime = this.startTime = (performance || Date).now(),
        this.running = !0
    },
    stop: function() {
        this.getElapsedTime(),
        this.running = !1
    },
    getElapsedTime: function() {
        return this.getDelta(),
        this.elapsedTime
    },
    getDelta: function() {
        var e = 0;
        if (this.autoStart && !this.running && this.start(),
        this.running) {
            var t = (performance || Date).now()
              , e = (t - this.oldTime) / 1e3;
            this.oldTime = t,
            this.elapsedTime += e
        }
        return e
    }
},
THREE.EventDispatcher = function() {}
,
Object.assign(THREE.EventDispatcher.prototype, {
    addEventListener: function(e, t) {
        void 0 === this._listeners && (this._listeners = {});
        var i = this._listeners;
        void 0 === i[e] && (i[e] = []),
        -1 === i[e].indexOf(t) && i[e].push(t)
    },
    hasEventListener: function(e, t) {
        if (void 0 === this._listeners)
            return !1;
        var i = this._listeners;
        return void 0 !== i[e] && -1 !== i[e].indexOf(t)
    },
    removeEventListener: function(e, t) {
        if (void 0 !== this._listeners) {
            var i = this._listeners[e];
            if (void 0 !== i) {
                var n = i.indexOf(t);
                -1 !== n && i.splice(n, 1)
            }
        }
    },
    dispatchEvent: function(e) {
        if (void 0 !== this._listeners) {
            var t = this._listeners[e.type];
            if (void 0 !== t) {
                e.target = this;
                for (var i = [], n = 0, r = t.length, n = 0; r > n; n++)
                    i[n] = t[n];
                for (n = 0; r > n; n++)
                    i[n].call(this, e)
            }
        }
    }
}),
THREE.Layers = function() {
    this.mask = 1
}
,
THREE.Layers.prototype = {
    constructor: THREE.Layers,
    set: function(e) {
        this.mask = 1 << e
    },
    enable: function(e) {
        this.mask |= 1 << e
    },
    toggle: function(e) {
        this.mask ^= 1 << e
    },
    disable: function(e) {
        this.mask &= ~(1 << e)
    },
    test: function(e) {
        return 0 !== (this.mask & e.mask)
    }
},
function(e) {
    function t(e, t) {
        return e.distance - t.distance
    }
    function i(e, t, n, r) {
        if (!1 !== e.visible && (e.raycast(t, n),
        !0 === r)) {
            e = e.children,
            r = 0;
            for (var a = e.length; a > r; r++)
                i(e[r], t, n, !0)
        }
    }
    e.Raycaster = function(t, i, n, r) {
        this.ray = new e.Ray(t,i),
        this.near = n || 0,
        this.far = r || 1 / 0,
        this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: {
                threshold: 1
            },
            Sprite: {}
        },
        Object.defineProperties(this.params, {
            PointCloud: {
                get: function() {
                    return this.Points
                }
            }
        })
    }
    ,
    e.Raycaster.prototype = {
        constructor: e.Raycaster,
        linePrecision: 1,
        set: function(e, t) {
            this.ray.set(e, t)
        },
        setFromCamera: function(t, i) {
            i instanceof e.PerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(i.matrixWorld),
            this.ray.direction.set(t.x, t.y, .5).unproject(i).sub(this.ray.origin).normalize()) : i instanceof e.OrthographicCamera ? (this.ray.origin.set(t.x, t.y, -1).unproject(i),
            this.ray.direction.set(0, 0, -1).transformDirection(i.matrixWorld)) : void 0
        },
        intersectObject: function(e, n) {
            var r = [];
            return i(e, this, r, n),
            r.sort(t),
            r
        },
        intersectObjects: function(e, n) {
            var r = [];
            if (!1 === Array.isArray(e))
                return r;
            for (var a = 0, o = e.length; o > a; a++)
                i(e[a], this, r, n);
            return r.sort(t),
            r
        }
    }
}(THREE),
THREE.Object3D = function() {
    Object.defineProperty(this, "id", {
        value: THREE.Object3DIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "Object3D",
    this.parent = null ,
    this.children = [],
    this.up = THREE.Object3D.DefaultUp.clone();
    var e = new THREE.Vector3
      , t = new THREE.Euler
      , i = new THREE.Quaternion
      , n = new THREE.Vector3(1,1,1);
    t.onChange(function() {
        i.setFromEuler(t, !1)
    }),
    i.onChange(function() {
        t.setFromQuaternion(i, void 0, !1)
    }),
    Object.defineProperties(this, {
        position: {
            enumerable: !0,
            value: e
        },
        rotation: {
            enumerable: !0,
            value: t
        },
        quaternion: {
            enumerable: !0,
            value: i
        },
        scale: {
            enumerable: !0,
            value: n
        },
        modelViewMatrix: {
            value: new THREE.Matrix4
        },
        normalMatrix: {
            value: new THREE.Matrix3
        }
    }),
    this.matrix = new THREE.Matrix4,
    this.matrixWorld = new THREE.Matrix4,
    this.matrixAutoUpdate = THREE.Object3D.DefaultMatrixAutoUpdate,
    this.matrixWorldNeedsUpdate = !1,
    this.layers = new THREE.Layers,
    this.visible = !0,
    this.receiveShadow = this.castShadow = !1,
    this.frustumCulled = !0,
    this.renderOrder = 0,
    this.userData = {}
}
,
THREE.Object3D.DefaultUp = new THREE.Vector3(0,1,0),
THREE.Object3D.DefaultMatrixAutoUpdate = !0,
Object.assign(THREE.Object3D.prototype, THREE.EventDispatcher.prototype, {
    applyMatrix: function(e) {
        this.matrix.multiplyMatrices(e, this.matrix),
        this.matrix.decompose(this.position, this.quaternion, this.scale)
    },
    setRotationFromAxisAngle: function(e, t) {
        this.quaternion.setFromAxisAngle(e, t)
    },
    setRotationFromEuler: function(e) {
        this.quaternion.setFromEuler(e, !0)
    },
    setRotationFromMatrix: function(e) {
        this.quaternion.setFromRotationMatrix(e)
    },
    setRotationFromQuaternion: function(e) {
        this.quaternion.copy(e)
    },
    rotateOnAxis: function() {
        var e = new THREE.Quaternion;
        return function(t, i) {
            return e.setFromAxisAngle(t, i),
            this.quaternion.multiply(e),
            this
        }
    }(),
    rotateX: function() {
        var e = new THREE.Vector3(1,0,0);
        return function(t) {
            return this.rotateOnAxis(e, t)
        }
    }(),
    rotateY: function() {
        var e = new THREE.Vector3(0,1,0);
        return function(t) {
            return this.rotateOnAxis(e, t)
        }
    }(),
    rotateZ: function() {
        var e = new THREE.Vector3(0,0,1);
        return function(t) {
            return this.rotateOnAxis(e, t)
        }
    }(),
    translateOnAxis: function() {
        var e = new THREE.Vector3;
        return function(t, i) {
            return e.copy(t).applyQuaternion(this.quaternion),
            this.position.add(e.multiplyScalar(i)),
            this
        }
    }(),
    translateX: function() {
        var e = new THREE.Vector3(1,0,0);
        return function(t) {
            return this.translateOnAxis(e, t)
        }
    }(),
    translateY: function() {
        var e = new THREE.Vector3(0,1,0);
        return function(t) {
            return this.translateOnAxis(e, t)
        }
    }(),
    translateZ: function() {
        var e = new THREE.Vector3(0,0,1);
        return function(t) {
            return this.translateOnAxis(e, t)
        }
    }(),
    localToWorld: function(e) {
        return e.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function() {
        var e = new THREE.Matrix4;
        return function(t) {
            return t.applyMatrix4(e.getInverse(this.matrixWorld))
        }
    }(),
    lookAt: function() {
        var e = new THREE.Matrix4;
        return function(t) {
            e.lookAt(t, this.position, this.up),
            this.quaternion.setFromRotationMatrix(e)
        }
    }(),
    add: function(e) {
        if (1 < arguments.length) {
            for (var t = 0; t < arguments.length; t++)
                this.add(arguments[t]);
            return this
        }
        return e === this ? this : (e instanceof THREE.Object3D ? (null !== e.parent && e.parent.remove(e),
        e.parent = this,
        e.dispatchEvent({
            type: "added"
        }),
        this.children.push(e)) : void 0,
        this)
    },
    remove: function(e) {
        if (1 < arguments.length)
            for (var t = 0; t < arguments.length; t++)
                this.remove(arguments[t]);
        t = this.children.indexOf(e),
        -1 !== t && (e.parent = null ,
        e.dispatchEvent({
            type: "removed"
        }),
        this.children.splice(t, 1))
    },
    getObjectById: function(e) {
        return this.getObjectByProperty("id", e)
    },
    getObjectByName: function(e) {
        return this.getObjectByProperty("name", e)
    },
    getObjectByProperty: function(e, t) {
        if (this[e] === t)
            return this;
        for (var i = 0, n = this.children.length; n > i; i++) {
            var r = this.children[i].getObjectByProperty(e, t);
            if (void 0 !== r)
                return r
        }
    },
    getWorldPosition: function(e) {
        return e = e || new THREE.Vector3,
        this.updateMatrixWorld(!0),
        e.setFromMatrixPosition(this.matrixWorld)
    },
    getWorldQuaternion: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3;
        return function(i) {
            return i = i || new THREE.Quaternion,
            this.updateMatrixWorld(!0),
            this.matrixWorld.decompose(e, i, t),
            i
        }
    }(),
    getWorldRotation: function() {
        var e = new THREE.Quaternion;
        return function(t) {
            return t = t || new THREE.Euler,
            this.getWorldQuaternion(e),
            t.setFromQuaternion(e, this.rotation.order, !1)
        }
    }(),
    getWorldScale: function() {
        var e = new THREE.Vector3
          , t = new THREE.Quaternion;
        return function(i) {
            return i = i || new THREE.Vector3,
            this.updateMatrixWorld(!0),
            this.matrixWorld.decompose(e, t, i),
            i
        }
    }(),
    getWorldDirection: function() {
        var e = new THREE.Quaternion;
        return function(t) {
            return t = t || new THREE.Vector3,
            this.getWorldQuaternion(e),
            t.set(0, 0, 1).applyQuaternion(e)
        }
    }(),
    raycast: function() {},
    traverse: function(e) {
        e(this);
        for (var t = this.children, i = 0, n = t.length; n > i; i++)
            t[i].traverse(e)
    },
    traverseVisible: function(e) {
        if (!1 !== this.visible) {
            e(this);
            for (var t = this.children, i = 0, n = t.length; n > i; i++)
                t[i].traverseVisible(e)
        }
    },
    traverseAncestors: function(e) {
        var t = this.parent;
        null !== t && (e(t),
        t.traverseAncestors(e))
    },
    updateMatrix: function() {
        this.matrix.compose(this.position, this.quaternion, this.scale),
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(e) {
        !0 === this.matrixAutoUpdate && this.updateMatrix(),
        !0 !== this.matrixWorldNeedsUpdate && !0 !== e || (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        this.matrixWorldNeedsUpdate = !1,
        e = !0);
        for (var t = 0, i = this.children.length; i > t; t++)
            this.children[t].updateMatrixWorld(e)
    },
    toJSON: function(e) {
        function t(e) {
            var t, i = [];
            for (t in e) {
                var n = e[t];
                delete n.metadata,
                i.push(n)
            }
            return i
        }
        var i = void 0 === e || "" === e
          , n = {};
        i && (e = {
            geometries: {},
            materials: {},
            textures: {},
            images: {}
        },
        n.metadata = {
            version: 4.4,
            type: "Object",
            generator: "Object3D.toJSON"
        });
        var r = {};
        if (r.uuid = this.uuid,
        r.type = this.type,
        "" !== this.name && (r.name = this.name),
        "{}" !== JSON.stringify(this.userData) && (r.userData = this.userData),
        !0 === this.castShadow && (r.castShadow = !0),
        !0 === this.receiveShadow && (r.receiveShadow = !0),
        !1 === this.visible && (r.visible = !1),
        r.matrix = this.matrix.toArray(),
        void 0 !== this.geometry && (void 0 === e.geometries[this.geometry.uuid] && (e.geometries[this.geometry.uuid] = this.geometry.toJSON(e)),
        r.geometry = this.geometry.uuid),
        void 0 !== this.material && (void 0 === e.materials[this.material.uuid] && (e.materials[this.material.uuid] = this.material.toJSON(e)),
        r.material = this.material.uuid),
        0 < this.children.length) {
            r.children = [];
            for (var a = 0; a < this.children.length; a++)
                r.children.push(this.children[a].toJSON(e).object)
        }
        if (i) {
            var i = t(e.geometries)
              , a = t(e.materials)
              , o = t(e.textures);
            e = t(e.images),
            0 < i.length && (n.geometries = i),
            0 < a.length && (n.materials = a),
            0 < o.length && (n.textures = o),
            0 < e.length && (n.images = e)
        }
        return n.object = r,
        n
    },
    clone: function(e) {
        return (new this.constructor).copy(this, e)
    },
    copy: function(e, t) {
        if (void 0 === t && (t = !0),
        this.name = e.name,
        this.up.copy(e.up),
        this.position.copy(e.position),
        this.quaternion.copy(e.quaternion),
        this.scale.copy(e.scale),
        this.matrix.copy(e.matrix),
        this.matrixWorld.copy(e.matrixWorld),
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate,
        this.visible = e.visible,
        this.castShadow = e.castShadow,
        this.receiveShadow = e.receiveShadow,
        this.frustumCulled = e.frustumCulled,
        this.renderOrder = e.renderOrder,
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        !0 === t)
            for (var i = 0; i < e.children.length; i++)
                this.add(e.children[i].clone());
        return this
    }
}),
THREE.Object3DIdCount = 0,
THREE.Face3 = function(e, t, i, n, r, a) {
    this.a = e,
    this.b = t,
    this.c = i,
    this.normal = n instanceof THREE.Vector3 ? n : new THREE.Vector3,
    this.vertexNormals = Array.isArray(n) ? n : [],
    this.color = r instanceof THREE.Color ? r : new THREE.Color,
    this.vertexColors = Array.isArray(r) ? r : [],
    this.materialIndex = void 0 !== a ? a : 0
}
,
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        this.a = e.a,
        this.b = e.b,
        this.c = e.c,
        this.normal.copy(e.normal),
        this.color.copy(e.color),
        this.materialIndex = e.materialIndex;
        for (var t = 0, i = e.vertexNormals.length; i > t; t++)
            this.vertexNormals[t] = e.vertexNormals[t].clone();
        for (t = 0,
        i = e.vertexColors.length; i > t; t++)
            this.vertexColors[t] = e.vertexColors[t].clone();
        return this
    }
},
THREE.BufferAttribute = function(e, t, i) {
    this.uuid = THREE.Math.generateUUID(),
    this.array = e,
    this.itemSize = t,
    this.dynamic = !1,
    this.updateRange = {
        offset: 0,
        count: -1
    },
    this.version = 0,
    this.normalized = !0 === i
}
,
THREE.BufferAttribute.prototype = {
    constructor: THREE.BufferAttribute,
    get count() {
        return this.array.length / this.itemSize
    },
    set needsUpdate(e) {
        !0 === e && this.version++
    },
    setDynamic: function(e) {
        return this.dynamic = e,
        this
    },
    copy: function(e) {
        return this.array = new e.array.constructor(e.array),
        this.itemSize = e.itemSize,
        this.dynamic = e.dynamic,
        this
    },
    copyAt: function(e, t, i) {
        e *= this.itemSize,
        i *= t.itemSize;
        for (var n = 0, r = this.itemSize; r > n; n++)
            this.array[e + n] = t.array[i + n];
        return this
    },
    copyArray: function(e) {
        return this.array.set(e),
        this
    },
    copyColorsArray: function(e) {
        for (var t = this.array, i = 0, n = 0, r = e.length; r > n; n++) {
            var a = e[n];
            void 0 === a && (a = new THREE.Color),
            t[i++] = a.r,
            t[i++] = a.g,
            t[i++] = a.b
        }
        return this
    },
    copyIndicesArray: function(e) {
        for (var t = this.array, i = 0, n = 0, r = e.length; r > n; n++) {
            var a = e[n];
            t[i++] = a.a,
            t[i++] = a.b,
            t[i++] = a.c
        }
        return this
    },
    copyVector2sArray: function(e) {
        for (var t = this.array, i = 0, n = 0, r = e.length; r > n; n++) {
            var a = e[n];
            void 0 === a && (a = new THREE.Vector2),
            t[i++] = a.x,
            t[i++] = a.y
        }
        return this
    },
    copyVector3sArray: function(e) {
        for (var t = this.array, i = 0, n = 0, r = e.length; r > n; n++) {
            var a = e[n];
            void 0 === a && (a = new THREE.Vector3),
            t[i++] = a.x,
            t[i++] = a.y,
            t[i++] = a.z
        }
        return this
    },
    copyVector4sArray: function(e) {
        for (var t = this.array, i = 0, n = 0, r = e.length; r > n; n++) {
            var a = e[n];
            void 0 === a && (a = new THREE.Vector4),
            t[i++] = a.x,
            t[i++] = a.y,
            t[i++] = a.z,
            t[i++] = a.w
        }
        return this
    },
    set: function(e, t) {
        return void 0 === t && (t = 0),
        this.array.set(e, t),
        this
    },
    getX: function(e) {
        return this.array[e * this.itemSize]
    },
    setX: function(e, t) {
        return this.array[e * this.itemSize] = t,
        this
    },
    getY: function(e) {
        return this.array[e * this.itemSize + 1]
    },
    setY: function(e, t) {
        return this.array[e * this.itemSize + 1] = t,
        this
    },
    getZ: function(e) {
        return this.array[e * this.itemSize + 2]
    },
    setZ: function(e, t) {
        return this.array[e * this.itemSize + 2] = t,
        this
    },
    getW: function(e) {
        return this.array[e * this.itemSize + 3]
    },
    setW: function(e, t) {
        return this.array[e * this.itemSize + 3] = t,
        this
    },
    setXY: function(e, t, i) {
        return e *= this.itemSize,
        this.array[e + 0] = t,
        this.array[e + 1] = i,
        this
    },
    setXYZ: function(e, t, i, n) {
        return e *= this.itemSize,
        this.array[e + 0] = t,
        this.array[e + 1] = i,
        this.array[e + 2] = n,
        this
    },
    setXYZW: function(e, t, i, n, r) {
        return e *= this.itemSize,
        this.array[e + 0] = t,
        this.array[e + 1] = i,
        this.array[e + 2] = n,
        this.array[e + 3] = r,
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    }
},
THREE.Int8Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Int8Array(e),t)
}
,
THREE.Uint8Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Uint8Array(e),t)
}
,
THREE.Uint8ClampedAttribute = function(e, t) {
    return new THREE.BufferAttribute(new Uint8ClampedArray(e),t)
}
,
THREE.Int16Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Int16Array(e),t)
}
,
THREE.Uint16Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Uint16Array(e),t)
}
,
THREE.Int32Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Int32Array(e),t)
}
,
THREE.Uint32Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Uint32Array(e),t)
}
,
THREE.Float32Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Float32Array(e),t)
}
,
THREE.Float64Attribute = function(e, t) {
    return new THREE.BufferAttribute(new Float64Array(e),t)
}
,
THREE.DynamicBufferAttribute = function(e, t) {
    return new THREE.BufferAttribute(e,t).setDynamic(!0)
}
,
THREE.InstancedBufferAttribute = function(e, t, i) {
    THREE.BufferAttribute.call(this, e, t),
    this.meshPerAttribute = i || 1
}
,
THREE.InstancedBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype),
THREE.InstancedBufferAttribute.prototype.constructor = THREE.InstancedBufferAttribute,
THREE.InstancedBufferAttribute.prototype.copy = function(e) {
    return THREE.BufferAttribute.prototype.copy.call(this, e),
    this.meshPerAttribute = e.meshPerAttribute,
    this
}
,
THREE.InterleavedBuffer = function(e, t) {
    this.uuid = THREE.Math.generateUUID(),
    this.array = e,
    this.stride = t,
    this.dynamic = !1,
    this.updateRange = {
        offset: 0,
        count: -1
    },
    this.version = 0
}
,
THREE.InterleavedBuffer.prototype = {
    constructor: THREE.InterleavedBuffer,
    get length() {
        return this.array.length
    },
    get count() {
        return this.array.length / this.stride
    },
    set needsUpdate(e) {
        !0 === e && this.version++
    },
    setDynamic: function(e) {
        return this.dynamic = e,
        this
    },
    copy: function(e) {
        return this.array = new e.array.constructor(e.array),
        this.stride = e.stride,
        this.dynamic = e.dynamic,
        this
    },
    copyAt: function(e, t, i) {
        e *= this.stride,
        i *= t.stride;
        for (var n = 0, r = this.stride; r > n; n++)
            this.array[e + n] = t.array[i + n];
        return this
    },
    set: function(e, t) {
        return void 0 === t && (t = 0),
        this.array.set(e, t),
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    }
},
THREE.InstancedInterleavedBuffer = function(e, t, i) {
    THREE.InterleavedBuffer.call(this, e, t),
    this.meshPerAttribute = i || 1
}
,
THREE.InstancedInterleavedBuffer.prototype = Object.create(THREE.InterleavedBuffer.prototype),
THREE.InstancedInterleavedBuffer.prototype.constructor = THREE.InstancedInterleavedBuffer,
THREE.InstancedInterleavedBuffer.prototype.copy = function(e) {
    return THREE.InterleavedBuffer.prototype.copy.call(this, e),
    this.meshPerAttribute = e.meshPerAttribute,
    this
}
,
THREE.InterleavedBufferAttribute = function(e, t, i) {
    this.uuid = THREE.Math.generateUUID(),
    this.data = e,
    this.itemSize = t,
    this.offset = i
}
,
THREE.InterleavedBufferAttribute.prototype = {
    constructor: THREE.InterleavedBufferAttribute,
    get length() {
        return this.array.length
    },
    get count() {
        return this.data.count
    },
    setX: function(e, t) {
        return this.data.array[e * this.data.stride + this.offset] = t,
        this
    },
    setY: function(e, t) {
        return this.data.array[e * this.data.stride + this.offset + 1] = t,
        this
    },
    setZ: function(e, t) {
        return this.data.array[e * this.data.stride + this.offset + 2] = t,
        this
    },
    setW: function(e, t) {
        return this.data.array[e * this.data.stride + this.offset + 3] = t,
        this
    },
    getX: function(e) {
        return this.data.array[e * this.data.stride + this.offset]
    },
    getY: function(e) {
        return this.data.array[e * this.data.stride + this.offset + 1]
    },
    getZ: function(e) {
        return this.data.array[e * this.data.stride + this.offset + 2]
    },
    getW: function(e) {
        return this.data.array[e * this.data.stride + this.offset + 3]
    },
    setXY: function(e, t, i) {
        return e = e * this.data.stride + this.offset,
        this.data.array[e + 0] = t,
        this.data.array[e + 1] = i,
        this
    },
    setXYZ: function(e, t, i, n) {
        return e = e * this.data.stride + this.offset,
        this.data.array[e + 0] = t,
        this.data.array[e + 1] = i,
        this.data.array[e + 2] = n,
        this
    },
    setXYZW: function(e, t, i, n, r) {
        return e = e * this.data.stride + this.offset,
        this.data.array[e + 0] = t,
        this.data.array[e + 1] = i,
        this.data.array[e + 2] = n,
        this.data.array[e + 3] = r,
        this
    }
},
THREE.Geometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "Geometry",
    this.vertices = [],
    this.colors = [],
    this.faces = [],
    this.faceVertexUvs = [[]],
    this.morphTargets = [],
    this.morphNormals = [],
    this.skinWeights = [],
    this.skinIndices = [],
    this.lineDistances = [],
    this.boundingSphere = this.boundingBox = null ,
    this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
}
,
Object.assign(THREE.Geometry.prototype, THREE.EventDispatcher.prototype, {
    applyMatrix: function(e) {
        for (var t = (new THREE.Matrix3).getNormalMatrix(e), i = 0, n = this.vertices.length; n > i; i++)
            this.vertices[i].applyMatrix4(e);
        for (i = 0,
        n = this.faces.length; n > i; i++) {
            e = this.faces[i],
            e.normal.applyMatrix3(t).normalize();
            for (var r = 0, a = e.vertexNormals.length; a > r; r++)
                e.vertexNormals[r].applyMatrix3(t).normalize()
        }
        return null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this.normalsNeedUpdate = this.verticesNeedUpdate = !0,
        this
    },
    rotateX: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationX(t),
            this.applyMatrix(e),
            this
        }
    }(),
    rotateY: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationY(t),
            this.applyMatrix(e),
            this
        }
    }(),
    rotateZ: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationZ(t),
            this.applyMatrix(e),
            this
        }
    }(),
    translate: function() {
        var e;
        return function(t, i, n) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeTranslation(t, i, n),
            this.applyMatrix(e),
            this
        }
    }(),
    scale: function() {
        var e;
        return function(t, i, n) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeScale(t, i, n),
            this.applyMatrix(e),
            this
        }
    }(),
    lookAt: function() {
        var e;
        return function(t) {
            void 0 === e && (e = new THREE.Object3D),
            e.lookAt(t),
            e.updateMatrix(),
            this.applyMatrix(e.matrix)
        }
    }(),
    fromBufferGeometry: function(e) {
        function t(e, t, n, r) {
            var a = void 0 !== o ? [l[e].clone(), l[t].clone(), l[n].clone()] : []
              , d = void 0 !== s ? [i.colors[e].clone(), i.colors[t].clone(), i.colors[n].clone()] : [];
            r = new THREE.Face3(e,t,n,a,d,r),
            i.faces.push(r),
            void 0 !== c && i.faceVertexUvs[0].push([u[e].clone(), u[t].clone(), u[n].clone()]),
            void 0 !== h && i.faceVertexUvs[1].push([p[e].clone(), p[t].clone(), p[n].clone()])
        }
        var i = this
          , n = null !== e.index ? e.index.array : void 0
          , r = e.attributes
          , a = r.position.array
          , o = void 0 !== r.normal ? r.normal.array : void 0
          , s = void 0 !== r.color ? r.color.array : void 0
          , c = void 0 !== r.uv ? r.uv.array : void 0
          , h = void 0 !== r.uv2 ? r.uv2.array : void 0;
        void 0 !== h && (this.faceVertexUvs[1] = []);
        for (var l = [], u = [], p = [], d = r = 0; r < a.length; r += 3,
        d += 2)
            i.vertices.push(new THREE.Vector3(a[r],a[r + 1],a[r + 2])),
            void 0 !== o && l.push(new THREE.Vector3(o[r],o[r + 1],o[r + 2])),
            void 0 !== s && i.colors.push(new THREE.Color(s[r],s[r + 1],s[r + 2])),
            void 0 !== c && u.push(new THREE.Vector2(c[d],c[d + 1])),
            void 0 !== h && p.push(new THREE.Vector2(h[d],h[d + 1]));
        if (void 0 !== n)
            if (a = e.groups,
            0 < a.length)
                for (r = 0; r < a.length; r++)
                    for (var f = a[r], E = f.start, m = f.count, d = E, E = E + m; E > d; d += 3)
                        t(n[d], n[d + 1], n[d + 2], f.materialIndex);
            else
                for (r = 0; r < n.length; r += 3)
                    t(n[r], n[r + 1], n[r + 2]);
        else
            for (r = 0; r < a.length / 3; r += 3)
                t(r, r + 1, r + 2);
        return this.computeFaceNormals(),
        null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()),
        null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()),
        this
    },
    center: function() {
        this.computeBoundingBox();
        var e = this.boundingBox.center().negate();
        return this.translate(e.x, e.y, e.z),
        e
    },
    normalize: function() {
        this.computeBoundingSphere();
        var e = this.boundingSphere.center
          , t = this.boundingSphere.radius
          , t = 0 === t ? 1 : 1 / t
          , i = new THREE.Matrix4;
        return i.set(t, 0, 0, -t * e.x, 0, t, 0, -t * e.y, 0, 0, t, -t * e.z, 0, 0, 0, 1),
        this.applyMatrix(i),
        this
    },
    computeFaceNormals: function() {
        for (var e = new THREE.Vector3, t = new THREE.Vector3, i = 0, n = this.faces.length; n > i; i++) {
            var r = this.faces[i]
              , a = this.vertices[r.a]
              , o = this.vertices[r.b];
            e.subVectors(this.vertices[r.c], o),
            t.subVectors(a, o),
            e.cross(t),
            e.normalize(),
            r.normal.copy(e)
        }
    },
    computeVertexNormals: function(e) {
        void 0 === e && (e = !0);
        var t, i, n;
        for (n = Array(this.vertices.length),
        t = 0,
        i = this.vertices.length; i > t; t++)
            n[t] = new THREE.Vector3;
        if (e) {
            var r, a, o, s = new THREE.Vector3, c = new THREE.Vector3;
            for (e = 0,
            t = this.faces.length; t > e; e++)
                i = this.faces[e],
                r = this.vertices[i.a],
                a = this.vertices[i.b],
                o = this.vertices[i.c],
                s.subVectors(o, a),
                c.subVectors(r, a),
                s.cross(c),
                n[i.a].add(s),
                n[i.b].add(s),
                n[i.c].add(s)
        } else
            for (e = 0,
            t = this.faces.length; t > e; e++)
                i = this.faces[e],
                n[i.a].add(i.normal),
                n[i.b].add(i.normal),
                n[i.c].add(i.normal);
        for (t = 0,
        i = this.vertices.length; i > t; t++)
            n[t].normalize();
        for (e = 0,
        t = this.faces.length; t > e; e++)
            i = this.faces[e],
            r = i.vertexNormals,
            3 === r.length ? (r[0].copy(n[i.a]),
            r[1].copy(n[i.b]),
            r[2].copy(n[i.c])) : (r[0] = n[i.a].clone(),
            r[1] = n[i.b].clone(),
            r[2] = n[i.c].clone());
        0 < this.faces.length && (this.normalsNeedUpdate = !0)
    },
    computeMorphNormals: function() {
        var e, t, i, n, r;
        for (i = 0,
        n = this.faces.length; n > i; i++)
            for (r = this.faces[i],
            r.__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(),
            r.__originalVertexNormals || (r.__originalVertexNormals = []),
            e = 0,
            t = r.vertexNormals.length; t > e; e++)
                r.__originalVertexNormals[e] ? r.__originalVertexNormals[e].copy(r.vertexNormals[e]) : r.__originalVertexNormals[e] = r.vertexNormals[e].clone();
        var a = new THREE.Geometry;
        for (a.faces = this.faces,
        e = 0,
        t = this.morphTargets.length; t > e; e++) {
            if (!this.morphNormals[e]) {
                this.morphNormals[e] = {},
                this.morphNormals[e].faceNormals = [],
                this.morphNormals[e].vertexNormals = [],
                r = this.morphNormals[e].faceNormals;
                var o, s, c = this.morphNormals[e].vertexNormals;
                for (i = 0,
                n = this.faces.length; n > i; i++)
                    o = new THREE.Vector3,
                    s = {
                        a: new THREE.Vector3,
                        b: new THREE.Vector3,
                        c: new THREE.Vector3
                    },
                    r.push(o),
                    c.push(s)
            }
            for (c = this.morphNormals[e],
            a.vertices = this.morphTargets[e].vertices,
            a.computeFaceNormals(),
            a.computeVertexNormals(),
            i = 0,
            n = this.faces.length; n > i; i++)
                r = this.faces[i],
                o = c.faceNormals[i],
                s = c.vertexNormals[i],
                o.copy(r.normal),
                s.a.copy(r.vertexNormals[0]),
                s.b.copy(r.vertexNormals[1]),
                s.c.copy(r.vertexNormals[2])
        }
        for (i = 0,
        n = this.faces.length; n > i; i++)
            r = this.faces[i],
            r.normal = r.__originalFaceNormal,
            r.vertexNormals = r.__originalVertexNormals
    },
    computeTangents: function() {},
    computeLineDistances: function() {
        for (var e = 0, t = this.vertices, i = 0, n = t.length; n > i; i++)
            i > 0 && (e += t[i].distanceTo(t[i - 1])),
            this.lineDistances[i] = e
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3),
        this.boundingBox.setFromPoints(this.vertices)
    },
    computeBoundingSphere: function() {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere),
        this.boundingSphere.setFromPoints(this.vertices)
    },
    merge: function(e, t, i) {
        if (!1 == e instanceof THREE.Geometry)
            ;
        else {
            var n, r = this.vertices.length, a = this.vertices, o = e.vertices, s = this.faces, c = e.faces, h = this.faceVertexUvs[0];
            e = e.faceVertexUvs[0],
            void 0 === i && (i = 0),
            void 0 !== t && (n = (new THREE.Matrix3).getNormalMatrix(t));
            for (var l = 0, u = o.length; u > l; l++) {
                var p = o[l].clone();
                void 0 !== t && p.applyMatrix4(t),
                a.push(p)
            }
            for (l = 0,
            u = c.length; u > l; l++) {
                var d, o = c[l], f = o.vertexNormals, E = o.vertexColors, p = new THREE.Face3(o.a + r,o.b + r,o.c + r);
                for (p.normal.copy(o.normal),
                void 0 !== n && p.normal.applyMatrix3(n).normalize(),
                t = 0,
                a = f.length; a > t; t++)
                    d = f[t].clone(),
                    void 0 !== n && d.applyMatrix3(n).normalize(),
                    p.vertexNormals.push(d);
                for (p.color.copy(o.color),
                t = 0,
                a = E.length; a > t; t++)
                    d = E[t],
                    p.vertexColors.push(d.clone());
                p.materialIndex = o.materialIndex + i,
                s.push(p)
            }
            for (l = 0,
            u = e.length; u > l; l++)
                if (i = e[l],
                n = [],
                void 0 !== i) {
                    for (t = 0,
                    a = i.length; a > t; t++)
                        n.push(i[t].clone());
                    h.push(n)
                }
        }
    },
    mergeMesh: function(e) {
        !1 == e instanceof THREE.Mesh ? void 0 : (e.matrixAutoUpdate && e.updateMatrix(),
        this.merge(e.geometry, e.matrix))
    },
    mergeVertices: function() {
        var e, t, i, n = {}, r = [], a = [], o = Math.pow(10, 4);
        for (t = 0,
        i = this.vertices.length; i > t; t++)
            e = this.vertices[t],
            e = Math.round(e.x * o) + "_" + Math.round(e.y * o) + "_" + Math.round(e.z * o),
            void 0 === n[e] ? (n[e] = t,
            r.push(this.vertices[t]),
            a[t] = r.length - 1) : a[t] = a[n[e]];
        for (n = [],
        t = 0,
        i = this.faces.length; i > t; t++)
            for (o = this.faces[t],
            o.a = a[o.a],
            o.b = a[o.b],
            o.c = a[o.c],
            o = [o.a, o.b, o.c],
            e = 0; 3 > e; e++)
                if (o[e] === o[(e + 1) % 3]) {
                    n.push(t);
                    break
                }
        for (t = n.length - 1; t >= 0; t--)
            for (o = n[t],
            this.faces.splice(o, 1),
            a = 0,
            i = this.faceVertexUvs.length; i > a; a++)
                this.faceVertexUvs[a].splice(o, 1);
        return t = this.vertices.length - r.length,
        this.vertices = r,
        t
    },
    sortFacesByMaterialIndex: function() {
        for (var e = this.faces, t = e.length, i = 0; t > i; i++)
            e[i]._id = i;
        e.sort(function(e, t) {
            return e.materialIndex - t.materialIndex
        });
        var n, r, a = this.faceVertexUvs[0], o = this.faceVertexUvs[1];
        for (a && a.length === t && (n = []),
        o && o.length === t && (r = []),
        i = 0; t > i; i++) {
            var s = e[i]._id;
            n && n.push(a[s]),
            r && r.push(o[s])
        }
        n && (this.faceVertexUvs[0] = n),
        r && (this.faceVertexUvs[1] = r)
    },
    toJSON: function() {
        function e(e, t, i) {
            return i ? e | 1 << t : e & ~(1 << t)
        }
        function t(e) {
            var t = e.x.toString() + e.y.toString() + e.z.toString();
            return void 0 !== h[t] ? h[t] : (h[t] = c.length / 3,
            c.push(e.x, e.y, e.z),
            h[t])
        }
        function i(e) {
            var t = e.r.toString() + e.g.toString() + e.b.toString();
            return void 0 !== u[t] ? u[t] : (u[t] = l.length,
            l.push(e.getHex()),
            u[t])
        }
        function n(e) {
            var t = e.x.toString() + e.y.toString();
            return void 0 !== d[t] ? d[t] : (d[t] = p.length / 2,
            p.push(e.x, e.y),
            d[t])
        }
        var r = {
            metadata: {
                version: 4.4,
                type: "Geometry",
                generator: "Geometry.toJSON"
            }
        };
        if (r.uuid = this.uuid,
        r.type = this.type,
        "" !== this.name && (r.name = this.name),
        void 0 !== this.parameters) {
            var a, o = this.parameters;
            for (a in o)
                void 0 !== o[a] && (r[a] = o[a]);
            return r
        }
        for (o = [],
        a = 0; a < this.vertices.length; a++) {
            var s = this.vertices[a];
            o.push(s.x, s.y, s.z)
        }
        var s = []
          , c = []
          , h = {}
          , l = []
          , u = {}
          , p = []
          , d = {};
        for (a = 0; a < this.faces.length; a++) {
            var f = this.faces[a]
              , E = void 0 !== this.faceVertexUvs[0][a]
              , m = 0 < f.normal.length()
              , g = 0 < f.vertexNormals.length
              , v = 1 !== f.color.r || 1 !== f.color.g || 1 !== f.color.b
              , T = 0 < f.vertexColors.length
              , y = 0
              , y = e(y, 0, 0)
              , y = e(y, 1, !0)
              , y = e(y, 2, !1)
              , y = e(y, 3, E)
              , y = e(y, 4, m)
              , y = e(y, 5, g)
              , y = e(y, 6, v)
              , y = e(y, 7, T);
            s.push(y),
            s.push(f.a, f.b, f.c),
            s.push(f.materialIndex),
            E && (E = this.faceVertexUvs[0][a],
            s.push(n(E[0]), n(E[1]), n(E[2]))),
            m && s.push(t(f.normal)),
            g && (m = f.vertexNormals,
            s.push(t(m[0]), t(m[1]), t(m[2]))),
            v && s.push(i(f.color)),
            T && (f = f.vertexColors,
            s.push(i(f[0]), i(f[1]), i(f[2])))
        }
        return r.data = {},
        r.data.vertices = o,
        r.data.normals = c,
        0 < l.length && (r.data.colors = l),
        0 < p.length && (r.data.uvs = [p]),
        r.data.faces = s,
        r
    },
    clone: function() {
        return (new THREE.Geometry).copy(this)
    },
    copy: function(e) {
        this.vertices = [],
        this.faces = [],
        this.faceVertexUvs = [[]];
        for (var t = e.vertices, i = 0, n = t.length; n > i; i++)
            this.vertices.push(t[i].clone());
        for (t = e.faces,
        i = 0,
        n = t.length; n > i; i++)
            this.faces.push(t[i].clone());
        for (i = 0,
        n = e.faceVertexUvs.length; n > i; i++) {
            t = e.faceVertexUvs[i],
            void 0 === this.faceVertexUvs[i] && (this.faceVertexUvs[i] = []);
            for (var r = 0, a = t.length; a > r; r++) {
                for (var o = t[r], s = [], c = 0, h = o.length; h > c; c++)
                    s.push(o[c].clone());
                this.faceVertexUvs[i].push(s)
            }
        }
        return this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}),
THREE.GeometryIdCount = 0,
THREE.DirectGeometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "DirectGeometry",
    this.indices = [],
    this.vertices = [],
    this.normals = [],
    this.colors = [],
    this.uvs = [],
    this.uvs2 = [],
    this.groups = [],
    this.morphTargets = {},
    this.skinWeights = [],
    this.skinIndices = [],
    this.boundingSphere = this.boundingBox = null ,
    this.groupsNeedUpdate = this.uvsNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.verticesNeedUpdate = !1
}
,
Object.assign(THREE.DirectGeometry.prototype, THREE.EventDispatcher.prototype, {
    computeBoundingBox: THREE.Geometry.prototype.computeBoundingBox,
    computeBoundingSphere: THREE.Geometry.prototype.computeBoundingSphere,
    computeFaceNormals: function() {},
    computeVertexNormals: function() {},
    computeGroups: function(e) {
        var t, i, n = [];
        e = e.faces;
        for (var r = 0; r < e.length; r++) {
            var a = e[r];
            a.materialIndex !== i && (i = a.materialIndex,
            void 0 !== t && (t.count = 3 * r - t.start,
            n.push(t)),
            t = {
                start: 3 * r,
                materialIndex: i
            })
        }
        void 0 !== t && (t.count = 3 * r - t.start,
        n.push(t)),
        this.groups = n
    },
    fromGeometry: function(e) {
        var t, i = e.faces, n = e.vertices, r = e.faceVertexUvs, a = r[0] && 0 < r[0].length, o = r[1] && 0 < r[1].length, s = e.morphTargets, c = s.length;
        if (c > 0) {
            t = [];
            for (var h = 0; c > h; h++)
                t[h] = [];
            this.morphTargets.position = t
        }
        var l, u = e.morphNormals, p = u.length;
        if (p > 0) {
            for (l = [],
            h = 0; p > h; h++)
                l[h] = [];
            this.morphTargets.normal = l
        }
        for (var d = e.skinIndices, f = e.skinWeights, E = d.length === n.length, m = f.length === n.length, h = 0; h < i.length; h++) {
            var g = i[h];
            this.vertices.push(n[g.a], n[g.b], n[g.c]);
            var v = g.vertexNormals;
            for (3 === v.length ? this.normals.push(v[0], v[1], v[2]) : (v = g.normal,
            this.normals.push(v, v, v)),
            v = g.vertexColors,
            3 === v.length ? this.colors.push(v[0], v[1], v[2]) : (v = g.color,
            this.colors.push(v, v, v)),
            !0 === a && (v = r[0][h],
            void 0 !== v ? this.uvs.push(v[0], v[1], v[2]) : this.uvs.push(new THREE.Vector2, new THREE.Vector2, new THREE.Vector2)),
            !0 === o && (v = r[1][h],
            void 0 !== v ? this.uvs2.push(v[0], v[1], v[2]) : this.uvs2.push(new THREE.Vector2, new THREE.Vector2, new THREE.Vector2)),
            v = 0; c > v; v++) {
                var T = s[v].vertices;
                t[v].push(T[g.a], T[g.b], T[g.c])
            }
            for (v = 0; p > v; v++)
                T = u[v].vertexNormals[h],
                l[v].push(T.a, T.b, T.c);
            E && this.skinIndices.push(d[g.a], d[g.b], d[g.c]),
            m && this.skinWeights.push(f[g.a], f[g.b], f[g.c])
        }
        return this.computeGroups(e),
        this.verticesNeedUpdate = e.verticesNeedUpdate,
        this.normalsNeedUpdate = e.normalsNeedUpdate,
        this.colorsNeedUpdate = e.colorsNeedUpdate,
        this.uvsNeedUpdate = e.uvsNeedUpdate,
        this.groupsNeedUpdate = e.groupsNeedUpdate,
        this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}),
THREE.BufferGeometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "BufferGeometry",
    this.index = null ,
    this.attributes = {},
    this.morphAttributes = {},
    this.groups = [],
    this.boundingSphere = this.boundingBox = null ,
    this.drawRange = {
        start: 0,
        count: 1 / 0
    }
}
,
Object.assign(THREE.BufferGeometry.prototype, THREE.EventDispatcher.prototype, {
    getIndex: function() {
        return this.index
    },
    setIndex: function(e) {
        this.index = e
    },
    addAttribute: function(e, t, i) {
        if (!1 == t instanceof THREE.BufferAttribute && !1 == t instanceof THREE.InterleavedBufferAttribute)
            this.addAttribute(e, new THREE.BufferAttribute(t,i));
        else {
            if ("index" !== e)
                return this.attributes[e] = t,
                this;
            this.setIndex(t)
        }
    },
    getAttribute: function(e) {
        return this.attributes[e]
    },
    removeAttribute: function(e) {
        return delete this.attributes[e],
        this
    },
    addGroup: function(e, t, i) {
        this.groups.push({
            start: e,
            count: t,
            materialIndex: void 0 !== i ? i : 0
        })
    },
    clearGroups: function() {
        this.groups = []
    },
    setDrawRange: function(e, t) {
        this.drawRange.start = e,
        this.drawRange.count = t
    },
    applyMatrix: function(e) {
        var t = this.attributes.position;
        return void 0 !== t && (e.applyToVector3Array(t.array),
        t.needsUpdate = !0),
        t = this.attributes.normal,
        void 0 !== t && ((new THREE.Matrix3).getNormalMatrix(e).applyToVector3Array(t.array),
        t.needsUpdate = !0),
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this
    },
    rotateX: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationX(t),
            this.applyMatrix(e),
            this
        }
    }(),
    rotateY: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationY(t),
            this.applyMatrix(e),
            this
        }
    }(),
    rotateZ: function() {
        var e;
        return function(t) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeRotationZ(t),
            this.applyMatrix(e),
            this
        }
    }(),
    translate: function() {
        var e;
        return function(t, i, n) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeTranslation(t, i, n),
            this.applyMatrix(e),
            this
        }
    }(),
    scale: function() {
        var e;
        return function(t, i, n) {
            return void 0 === e && (e = new THREE.Matrix4),
            e.makeScale(t, i, n),
            this.applyMatrix(e),
            this
        }
    }(),
    lookAt: function() {
        var e;
        return function(t) {
            void 0 === e && (e = new THREE.Object3D),
            e.lookAt(t),
            e.updateMatrix(),
            this.applyMatrix(e.matrix)
        }
    }(),
    center: function() {
        this.computeBoundingBox();
        var e = this.boundingBox.center().negate();
        return this.translate(e.x, e.y, e.z),
        e
    },
    setFromObject: function(e) {
        var t = e.geometry;
        if (e instanceof THREE.Points || e instanceof THREE.Line) {
            e = new THREE.Float32Attribute(3 * t.vertices.length,3);
            var i = new THREE.Float32Attribute(3 * t.colors.length,3);
            this.addAttribute("position", e.copyVector3sArray(t.vertices)),
            this.addAttribute("color", i.copyColorsArray(t.colors)),
            t.lineDistances && t.lineDistances.length === t.vertices.length && (e = new THREE.Float32Attribute(t.lineDistances.length,1),
            this.addAttribute("lineDistance", e.copyArray(t.lineDistances))),
            null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()),
            null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone())
        } else
            e instanceof THREE.Mesh && t instanceof THREE.Geometry && this.fromGeometry(t);
        return this
    },
    updateFromObject: function(e) {
        var t = e.geometry;
        if (e instanceof THREE.Mesh) {
            var i = t.__directGeometry;
            if (void 0 === i)
                return this.fromGeometry(t);
            i.verticesNeedUpdate = t.verticesNeedUpdate,
            i.normalsNeedUpdate = t.normalsNeedUpdate,
            i.colorsNeedUpdate = t.colorsNeedUpdate,
            i.uvsNeedUpdate = t.uvsNeedUpdate,
            i.groupsNeedUpdate = t.groupsNeedUpdate,
            t.verticesNeedUpdate = !1,
            t.normalsNeedUpdate = !1,
            t.colorsNeedUpdate = !1,
            t.uvsNeedUpdate = !1,
            t.groupsNeedUpdate = !1,
            t = i
        }
        return !0 === t.verticesNeedUpdate && (i = this.attributes.position,
        void 0 !== i && (i.copyVector3sArray(t.vertices),
        i.needsUpdate = !0),
        t.verticesNeedUpdate = !1),
        !0 === t.normalsNeedUpdate && (i = this.attributes.normal,
        void 0 !== i && (i.copyVector3sArray(t.normals),
        i.needsUpdate = !0),
        t.normalsNeedUpdate = !1),
        !0 === t.colorsNeedUpdate && (i = this.attributes.color,
        void 0 !== i && (i.copyColorsArray(t.colors),
        i.needsUpdate = !0),
        t.colorsNeedUpdate = !1),
        t.uvsNeedUpdate && (i = this.attributes.uv,
        void 0 !== i && (i.copyVector2sArray(t.uvs),
        i.needsUpdate = !0),
        t.uvsNeedUpdate = !1),
        t.lineDistancesNeedUpdate && (i = this.attributes.lineDistance,
        void 0 !== i && (i.copyArray(t.lineDistances),
        i.needsUpdate = !0),
        t.lineDistancesNeedUpdate = !1),
        t.groupsNeedUpdate && (t.computeGroups(e.geometry),
        this.groups = t.groups,
        t.groupsNeedUpdate = !1),
        this
    },
    fromGeometry: function(e) {
        return e.__directGeometry = (new THREE.DirectGeometry).fromGeometry(e),
        this.fromDirectGeometry(e.__directGeometry)
    },
    fromDirectGeometry: function(e) {
        var t = new Float32Array(3 * e.vertices.length);
        this.addAttribute("position", new THREE.BufferAttribute(t,3).copyVector3sArray(e.vertices)),
        0 < e.normals.length && (t = new Float32Array(3 * e.normals.length),
        this.addAttribute("normal", new THREE.BufferAttribute(t,3).copyVector3sArray(e.normals))),
        0 < e.colors.length && (t = new Float32Array(3 * e.colors.length),
        this.addAttribute("color", new THREE.BufferAttribute(t,3).copyColorsArray(e.colors))),
        0 < e.uvs.length && (t = new Float32Array(2 * e.uvs.length),
        this.addAttribute("uv", new THREE.BufferAttribute(t,2).copyVector2sArray(e.uvs))),
        0 < e.uvs2.length && (t = new Float32Array(2 * e.uvs2.length),
        this.addAttribute("uv2", new THREE.BufferAttribute(t,2).copyVector2sArray(e.uvs2))),
        0 < e.indices.length && (t = new (65535 < e.vertices.length ? Uint32Array : Uint16Array)(3 * e.indices.length),
        this.setIndex(new THREE.BufferAttribute(t,1).copyIndicesArray(e.indices))),
        this.groups = e.groups;
        for (var i in e.morphTargets) {
            for (var t = [], n = e.morphTargets[i], r = 0, a = n.length; a > r; r++) {
                var o = n[r]
                  , s = new THREE.Float32Attribute(3 * o.length,3);
                t.push(s.copyVector3sArray(o))
            }
            this.morphAttributes[i] = t
        }
        return 0 < e.skinIndices.length && (i = new THREE.Float32Attribute(4 * e.skinIndices.length,4),
        this.addAttribute("skinIndex", i.copyVector4sArray(e.skinIndices))),
        0 < e.skinWeights.length && (i = new THREE.Float32Attribute(4 * e.skinWeights.length,4),
        this.addAttribute("skinWeight", i.copyVector4sArray(e.skinWeights))),
        null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()),
        null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()),
        this
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3);
        var e = this.attributes.position.array;
        void 0 !== e ? this.boundingBox.setFromArray(e) : this.boundingBox.makeEmpty(),
        (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && void 0
    },
    computeBoundingSphere: function() {
        var e = new THREE.Box3
          , t = new THREE.Vector3;
        return function() {
            null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
            var i = this.attributes.position.array;
            if (i) {
                var n = this.boundingSphere.center;
                e.setFromArray(i),
                e.center(n);
                for (var r = 0, a = 0, o = i.length; o > a; a += 3)
                    t.fromArray(i, a),
                    r = Math.max(r, n.distanceToSquared(t));
                this.boundingSphere.radius = Math.sqrt(r),
                isNaN(this.boundingSphere.radius) && void 0
            }
        }
    }(),
    computeFaceNormals: function() {},
    computeVertexNormals: function() {
        var e = this.index
          , t = this.attributes
          , i = this.groups;
        if (t.position) {
            var n = t.position.array;
            if (void 0 === t.normal)
                this.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(n.length),3));
            else
                for (var r = t.normal.array, a = 0, o = r.length; o > a; a++)
                    r[a] = 0;
            var s, c, h, r = t.normal.array, l = new THREE.Vector3, u = new THREE.Vector3, p = new THREE.Vector3, d = new THREE.Vector3, f = new THREE.Vector3;
            if (e) {
                e = e.array,
                0 === i.length && this.addGroup(0, e.length);
                for (var E = 0, m = i.length; m > E; ++E)
                    for (a = i[E],
                    o = a.start,
                    s = a.count,
                    a = o,
                    o += s; o > a; a += 3)
                        s = 3 * e[a + 0],
                        c = 3 * e[a + 1],
                        h = 3 * e[a + 2],
                        l.fromArray(n, s),
                        u.fromArray(n, c),
                        p.fromArray(n, h),
                        d.subVectors(p, u),
                        f.subVectors(l, u),
                        d.cross(f),
                        r[s] += d.x,
                        r[s + 1] += d.y,
                        r[s + 2] += d.z,
                        r[c] += d.x,
                        r[c + 1] += d.y,
                        r[c + 2] += d.z,
                        r[h] += d.x,
                        r[h + 1] += d.y,
                        r[h + 2] += d.z
            } else
                for (a = 0,
                o = n.length; o > a; a += 9)
                    l.fromArray(n, a),
                    u.fromArray(n, a + 3),
                    p.fromArray(n, a + 6),
                    d.subVectors(p, u),
                    f.subVectors(l, u),
                    d.cross(f),
                    r[a] = d.x,
                    r[a + 1] = d.y,
                    r[a + 2] = d.z,
                    r[a + 3] = d.x,
                    r[a + 4] = d.y,
                    r[a + 5] = d.z,
                    r[a + 6] = d.x,
                    r[a + 7] = d.y,
                    r[a + 8] = d.z;
            this.normalizeNormals(),
            t.normal.needsUpdate = !0
        }
    },
    merge: function(e, t) {
        if (!1 != e instanceof THREE.BufferGeometry) {
            void 0 === t && (t = 0);
            var i, n = this.attributes;
            for (i in n)
                if (void 0 !== e.attributes[i])
                    for (var r = n[i].array, a = e.attributes[i], o = a.array, s = 0, a = a.itemSize * t; s < o.length; s++,
                    a++)
                        r[a] = o[s];
            return this
        }
    },
    normalizeNormals: function() {
        for (var e, t, i, n = this.attributes.normal.array, r = 0, a = n.length; a > r; r += 3)
            e = n[r],
            t = n[r + 1],
            i = n[r + 2],
            e = 1 / Math.sqrt(e * e + t * t + i * i),
            n[r] *= e,
            n[r + 1] *= e,
            n[r + 2] *= e
    },
    toNonIndexed: function() {
        if (null === this.index)
            return this;
        var e, t = new THREE.BufferGeometry, i = this.index.array, n = this.attributes;
        for (e in n) {
            for (var r = n[e], a = r.array, r = r.itemSize, o = new a.constructor(i.length * r), s = 0, c = 0, h = 0, l = i.length; l > h; h++)
                for (var s = i[h] * r, u = 0; r > u; u++)
                    o[c++] = a[s++];
            t.addAttribute(e, new THREE.BufferAttribute(o,r))
        }
        return t
    },
    toJSON: function() {
        var e = {
            metadata: {
                version: 4.4,
                type: "BufferGeometry",
                generator: "BufferGeometry.toJSON"
            }
        };
        if (e.uuid = this.uuid,
        e.type = this.type,
        "" !== this.name && (e.name = this.name),
        void 0 !== this.parameters) {
            var t, i = this.parameters;
            for (t in i)
                void 0 !== i[t] && (e[t] = i[t]);
            return e
        }
        e.data = {
            attributes: {}
        };
        var n = this.index;
        null !== n && (i = Array.prototype.slice.call(n.array),
        e.data.index = {
            type: n.array.constructor.name,
            array: i
        }),
        n = this.attributes;
        for (t in n) {
            var r = n[t]
              , i = Array.prototype.slice.call(r.array);
            e.data.attributes[t] = {
                itemSize: r.itemSize,
                type: r.array.constructor.name,
                array: i,
                normalized: r.normalized
            }
        }
        return t = this.groups,
        0 < t.length && (e.data.groups = JSON.parse(JSON.stringify(t))),
        t = this.boundingSphere,
        null !== t && (e.data.boundingSphere = {
            center: t.center.toArray(),
            radius: t.radius
        }),
        e
    },
    clone: function() {
        return (new THREE.BufferGeometry).copy(this)
    },
    copy: function(e) {
        var t = e.index;
        null !== t && this.setIndex(t.clone());
        var i, t = e.attributes;
        for (i in t)
            this.addAttribute(i, t[i].clone());
        for (e = e.groups,
        i = 0,
        t = e.length; t > i; i++) {
            var n = e[i];
            this.addGroup(n.start, n.count, n.materialIndex)
        }
        return this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}),
THREE.BufferGeometry.MaxIndex = 65535,
THREE.InstancedBufferGeometry = function() {
    THREE.BufferGeometry.call(this),
    this.type = "InstancedBufferGeometry",
    this.maxInstancedCount = void 0
}
,
THREE.InstancedBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.InstancedBufferGeometry.prototype.constructor = THREE.InstancedBufferGeometry,
THREE.InstancedBufferGeometry.prototype.addGroup = function(e, t, i) {
    this.groups.push({
        start: e,
        count: t,
        instances: i
    })
}
,
THREE.InstancedBufferGeometry.prototype.copy = function(e) {
    var t = e.index;
    null !== t && this.setIndex(t.clone());
    var i, t = e.attributes;
    for (i in t)
        this.addAttribute(i, t[i].clone());
    for (e = e.groups,
    i = 0,
    t = e.length; t > i; i++) {
        var n = e[i];
        this.addGroup(n.start, n.count, n.instances)
    }
    return this
}
,
THREE.Uniform = function(e, t) {
    "string" == typeof e && (e = t),
    this.value = e,
    this.dynamic = !1
}
,
THREE.Uniform.prototype = {
    constructor: THREE.Uniform,
    onUpdate: function(e) {
        return this.dynamic = !0,
        this.onUpdateCallback = e,
        this
    }
},
THREE.AnimationAction = function() {
    throw Error("THREE.AnimationAction: Use mixer.clipAction for construction.")
}
,
THREE.AnimationAction._new = function(e, t, i) {
    this._mixer = e,
    this._clip = t,
    this._localRoot = i || null ,
    e = t.tracks,
    t = e.length,
    i = Array(t);
    for (var n = {
        endingStart: THREE.ZeroCurvatureEnding,
        endingEnd: THREE.ZeroCurvatureEnding
    }, r = 0; r !== t; ++r) {
        var a = e[r].createInterpolant(null );
        i[r] = a,
        a.settings = n
    }
    this._interpolantSettings = n,
    this._interpolants = i,
    this._propertyBindings = Array(t),
    this._weightInterpolant = this._timeScaleInterpolant = this._byClipCacheIndex = this._cacheIndex = null ,
    this.loop = THREE.LoopRepeat,
    this._loopCount = -1,
    this._startTime = null ,
    this.time = 0,
    this._effectiveWeight = this.weight = this._effectiveTimeScale = this.timeScale = 1,
    this.repetitions = 1 / 0,
    this.paused = !1,
    this.enabled = !0,
    this.clampWhenFinished = !1,
    this.zeroSlopeAtEnd = this.zeroSlopeAtStart = !0
}
,
THREE.AnimationAction._new.prototype = {
    constructor: THREE.AnimationAction._new,
    play: function() {
        return this._mixer._activateAction(this),
        this
    },
    stop: function() {
        return this._mixer._deactivateAction(this),
        this.reset()
    },
    reset: function() {
        return this.paused = !1,
        this.enabled = !0,
        this.time = 0,
        this._loopCount = -1,
        this._startTime = null ,
        this.stopFading().stopWarping()
    },
    isRunning: function() {
        return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
    },
    isScheduled: function() {
        return this._mixer._isActiveAction(this)
    },
    startAt: function(e) {
        return this._startTime = e,
        this
    },
    setLoop: function(e, t) {
        return this.loop = e,
        this.repetitions = t,
        this
    },
    setEffectiveWeight: function(e) {
        return this.weight = e,
        this._effectiveWeight = this.enabled ? e : 0,
        this.stopFading()
    },
    getEffectiveWeight: function() {
        return this._effectiveWeight
    },
    fadeIn: function(e) {
        return this._scheduleFading(e, 0, 1)
    },
    fadeOut: function(e) {
        return this._scheduleFading(e, 1, 0)
    },
    crossFadeFrom: function(e, t, i) {
        if (e.fadeOut(t),
        this.fadeIn(t),
        i) {
            i = this._clip.duration;
            var n = e._clip.duration
              , r = i / n;
            e.warp(1, n / i, t),
            this.warp(r, 1, t)
        }
        return this
    },
    crossFadeTo: function(e, t, i) {
        return e.crossFadeFrom(this, t, i)
    },
    stopFading: function() {
        var e = this._weightInterpolant;
        return null !== e && (this._weightInterpolant = null ,
        this._mixer._takeBackControlInterpolant(e)),
        this
    },
    setEffectiveTimeScale: function(e) {
        return this.timeScale = e,
        this._effectiveTimeScale = this.paused ? 0 : e,
        this.stopWarping()
    },
    getEffectiveTimeScale: function() {
        return this._effectiveTimeScale
    },
    setDuration: function(e) {
        return this.timeScale = this._clip.duration / e,
        this.stopWarping()
    },
    syncWith: function(e) {
        return this.time = e.time,
        this.timeScale = e.timeScale,
        this.stopWarping()
    },
    halt: function(e) {
        return this.warp(this._effectiveTimeScale, 0, e)
    },
    warp: function(e, t, i) {
        var n = this._mixer
          , r = n.time
          , a = this._timeScaleInterpolant
          , o = this.timeScale;
        return null === a && (this._timeScaleInterpolant = a = n._lendControlInterpolant()),
        n = a.parameterPositions,
        a = a.sampleValues,
        n[0] = r,
        n[1] = r + i,
        a[0] = e / o,
        a[1] = t / o,
        this
    },
    stopWarping: function() {
        var e = this._timeScaleInterpolant;
        return null !== e && (this._timeScaleInterpolant = null ,
        this._mixer._takeBackControlInterpolant(e)),
        this
    },
    getMixer: function() {
        return this._mixer
    },
    getClip: function() {
        return this._clip
    },
    getRoot: function() {
        return this._localRoot || this._mixer._root
    },
    _update: function(e, t, i, n) {
        var r = this._startTime;
        if (null !== r) {
            if (t = (e - r) * i,
            0 > t || 0 === i)
                return;
            this._startTime = null ,
            t *= i
        }
        if (t *= this._updateTimeScale(e),
        i = this._updateTime(t),
        e = this._updateWeight(e),
        e > 0) {
            t = this._interpolants;
            for (var r = this._propertyBindings, a = 0, o = t.length; a !== o; ++a)
                t[a].evaluate(i),
                r[a].accumulate(n, e)
        }
    },
    _updateWeight: function(e) {
        var t = 0;
        if (this.enabled) {
            var t = this.weight
              , i = this._weightInterpolant;
            if (null !== i) {
                var n = i.evaluate(e)[0]
                  , t = t * n;
                e > i.parameterPositions[1] && (this.stopFading(),
                0 === n && (this.enabled = !1))
            }
        }
        return this._effectiveWeight = t
    },
    _updateTimeScale: function(e) {
        var t = 0;
        if (!this.paused) {
            var t = this.timeScale
              , i = this._timeScaleInterpolant;
            if (null !== i) {
                var n = i.evaluate(e)[0]
                  , t = t * n;
                e > i.parameterPositions[1] && (this.stopWarping(),
                0 === t ? this.paused = !0 : this.timeScale = t)
            }
        }
        return this._effectiveTimeScale = t
    },
    _updateTime: function(e) {
        var t = this.time + e;
        if (0 === e)
            return t;
        var i = this._clip.duration
          , n = this.loop
          , r = this._loopCount;
        if (n === THREE.LoopOnce)
            e: {
                if (-1 === r && (this.loopCount = 0,
                this._setEndings(!0, !0, !1)),
                t >= i)
                    t = i;
                else {
                    if (!(0 > t))
                        break e;
                    t = 0
                }
                this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
                this._mixer.dispatchEvent({
                    type: "finished",
                    action: this,
                    direction: 0 > e ? -1 : 1
                })
            }
        else {
            if (n = n === THREE.LoopPingPong,
            -1 === r && (e >= 0 ? (r = 0,
            this._setEndings(!0, 0 === this.repetitions, n)) : this._setEndings(0 === this.repetitions, !0, n)),
            t >= i || 0 > t) {
                var a = Math.floor(t / i)
                  , t = t - i * a
                  , r = r + Math.abs(a)
                  , o = this.repetitions - r;
                0 > o ? (this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
                t = e > 0 ? i : 0,
                this._mixer.dispatchEvent({
                    type: "finished",
                    action: this,
                    direction: e > 0 ? 1 : -1
                })) : (0 === o ? (e = 0 > e,
                this._setEndings(e, !e, n)) : this._setEndings(!1, !1, n),
                this._loopCount = r,
                this._mixer.dispatchEvent({
                    type: "loop",
                    action: this,
                    loopDelta: a
                }))
            }
            if (n && 1 === (1 & r))
                return this.time = t,
                i - t
        }
        return this.time = t
    },
    _setEndings: function(e, t, i) {
        var n = this._interpolantSettings;
        i ? (n.endingStart = THREE.ZeroSlopeEnding,
        n.endingEnd = THREE.ZeroSlopeEnding) : (n.endingStart = e ? this.zeroSlopeAtStart ? THREE.ZeroSlopeEnding : THREE.ZeroCurvatureEnding : THREE.WrapAroundEnding,
        n.endingEnd = t ? this.zeroSlopeAtEnd ? THREE.ZeroSlopeEnding : THREE.ZeroCurvatureEnding : THREE.WrapAroundEnding)
    },
    _scheduleFading: function(e, t, i) {
        var n = this._mixer
          , r = n.time
          , a = this._weightInterpolant;
        return null === a && (this._weightInterpolant = a = n._lendControlInterpolant()),
        n = a.parameterPositions,
        a = a.sampleValues,
        n[0] = r,
        a[0] = t,
        n[1] = r + e,
        a[1] = i,
        this
    }
},
THREE.AnimationClip = function(e, t, i) {
    this.name = e,
    this.tracks = i,
    this.duration = void 0 !== t ? t : -1,
    this.uuid = THREE.Math.generateUUID(),
    0 > this.duration && this.resetDuration(),
    this.trim(),
    this.optimize()
}
,
THREE.AnimationClip.prototype = {
    constructor: THREE.AnimationClip,
    resetDuration: function() {
        for (var e = 0, t = 0, i = this.tracks.length; t !== i; ++t)
            var n = this.tracks[t]
              , e = Math.max(e, n.times[n.times.length - 1]);
        this.duration = e
    },
    trim: function() {
        for (var e = 0; e < this.tracks.length; e++)
            this.tracks[e].trim(0, this.duration);
        return this
    },
    optimize: function() {
        for (var e = 0; e < this.tracks.length; e++)
            this.tracks[e].optimize();
        return this
    }
},
Object.assign(THREE.AnimationClip, {
    parse: function(e) {
        for (var t = [], i = e.tracks, n = 1 / (e.fps || 1), r = 0, a = i.length; r !== a; ++r)
            t.push(THREE.KeyframeTrack.parse(i[r]).scale(n));
        return new THREE.AnimationClip(e.name,e.duration,t)
    },
    toJSON: function(e) {
        var t = []
          , i = e.tracks;
        e = {
            name: e.name,
            duration: e.duration,
            tracks: t
        };
        for (var n = 0, r = i.length; n !== r; ++n)
            t.push(THREE.KeyframeTrack.toJSON(i[n]));
        return e
    },
    CreateFromMorphTargetSequence: function(e, t, i, n) {
        for (var r = t.length, a = [], o = 0; r > o; o++) {
            var s = []
              , c = [];
            s.push((o + r - 1) % r, o, (o + 1) % r),
            c.push(0, 1, 0);
            var h = THREE.AnimationUtils.getKeyframeOrder(s)
              , s = THREE.AnimationUtils.sortedArray(s, 1, h)
              , c = THREE.AnimationUtils.sortedArray(c, 1, h);
            n || 0 !== s[0] || (s.push(r),
            c.push(c[0])),
            a.push(new THREE.NumberKeyframeTrack(".morphTargetInfluences[" + t[o].name + "]",s,c).scale(1 / i))
        }
        return new THREE.AnimationClip(e,-1,a)
    },
    findByName: function(e, t) {
        var i = e;
        Array.isArray(e) || (i = e.geometry && e.geometry.animations || e.animations);
        for (var n = 0; n < i.length; n++)
            if (i[n].name === t)
                return i[n];
        return null
    },
    CreateClipsFromMorphTargetSequences: function(e, t, i) {
        for (var n = {}, r = /^([\w-]*?)([\d]+)$/, a = 0, o = e.length; o > a; a++) {
            var s = e[a]
              , c = s.name.match(r);
            if (c && 1 < c.length) {
                var h = c[1];
                (c = n[h]) || (n[h] = c = []),
                c.push(s)
            }
        }
        e = [];
        for (h in n)
            e.push(THREE.AnimationClip.CreateFromMorphTargetSequence(h, n[h], t, i));
        return e
    },
    parseAnimation: function(e, t, i) {
        if (!e)
            return null ;
        i = function(e, t, i, n, r) {
            if (0 !== i.length) {
                var a = []
                  , o = [];
                THREE.AnimationUtils.flattenJSON(i, a, o, n),
                0 !== a.length && r.push(new e(t,a,o))
            }
        }
        ;
        var n = []
          , r = e.name || "default"
          , a = e.length || -1
          , o = e.fps || 30;
        e = e.hierarchy || [];
        for (var s = 0; s < e.length; s++) {
            var c = e[s].keys;
            if (c && 0 !== c.length)
                if (c[0].morphTargets) {
                    for (var a = {}, h = 0; h < c.length; h++)
                        if (c[h].morphTargets)
                            for (var l = 0; l < c[h].morphTargets.length; l++)
                                a[c[h].morphTargets[l]] = -1;
                    for (var u in a) {
                        for (var p = [], d = [], l = 0; l !== c[h].morphTargets.length; ++l) {
                            var f = c[h];
                            p.push(f.time),
                            d.push(f.morphTarget === u ? 1 : 0)
                        }
                        n.push(new THREE.NumberKeyframeTrack(".morphTargetInfluence[" + u + "]",p,d))
                    }
                    a = a.length * (o || 1)
                } else
                    h = ".bones[" + t[s].name + "]",
                    i(THREE.VectorKeyframeTrack, h + ".position", c, "pos", n),
                    i(THREE.QuaternionKeyframeTrack, h + ".quaternion", c, "rot", n),
                    i(THREE.VectorKeyframeTrack, h + ".scale", c, "scl", n)
        }
        return 0 === n.length ? null : new THREE.AnimationClip(r,a,n)
    }
}),
THREE.AnimationMixer = function(e) {
    this._root = e,
    this._initMemoryManager(),
    this.time = this._accuIndex = 0,
    this.timeScale = 1
}
,
Object.assign(THREE.AnimationMixer.prototype, THREE.EventDispatcher.prototype, {
    clipAction: function(e, t) {
        var i = t || this._root
          , n = i.uuid
          , r = "string" == typeof e ? THREE.AnimationClip.findByName(i, e) : e
          , i = null !== r ? r.uuid : e
          , a = this._actionsByClip[i]
          , o = null ;
        if (void 0 !== a) {
            if (o = a.actionByRoot[n],
            void 0 !== o)
                return o;
            o = a.knownActions[0],
            null === r && (r = o._clip)
        }
        return null === r ? null : (r = new THREE.AnimationMixer._Action(this,r,t),
        this._bindAction(r, o),
        this._addInactiveAction(r, i, n),
        r)
    },
    existingAction: function(e, t) {
        var i = t || this._root
          , n = i.uuid
          , i = "string" == typeof e ? THREE.AnimationClip.findByName(i, e) : e
          , i = this._actionsByClip[i ? i.uuid : e];
        return void 0 !== i ? i.actionByRoot[n] || null : null
    },
    stopAllAction: function() {
        for (var e = this._actions, t = this._nActiveActions, i = this._bindings, n = this._nActiveBindings, r = this._nActiveBindings = this._nActiveActions = 0; r !== t; ++r)
            e[r].reset();
        for (r = 0; r !== n; ++r)
            i[r].useCount = 0;
        return this
    },
    update: function(e) {
        e *= this.timeScale;
        for (var t = this._actions, i = this._nActiveActions, n = this.time += e, r = Math.sign(e), a = this._accuIndex ^= 1, o = 0; o !== i; ++o) {
            var s = t[o];
            s.enabled && s._update(n, e, r, a)
        }
        for (e = this._bindings,
        t = this._nActiveBindings,
        o = 0; o !== t; ++o)
            e[o].apply(a);
        return this
    },
    getRoot: function() {
        return this._root
    },
    uncacheClip: function(e) {
        var t = this._actions;
        e = e.uuid;
        var i = this._actionsByClip
          , n = i[e];
        if (void 0 !== n) {
            for (var n = n.knownActions, r = 0, a = n.length; r !== a; ++r) {
                var o = n[r];
                this._deactivateAction(o);
                var s = o._cacheIndex
                  , c = t[t.length - 1];
                o._cacheIndex = null ,
                o._byClipCacheIndex = null ,
                c._cacheIndex = s,
                t[s] = c,
                t.pop(),
                this._removeInactiveBindingsForAction(o)
            }
            delete i[e]
        }
    },
    uncacheRoot: function(e) {
        e = e.uuid;
        var t, i = this._actionsByClip;
        for (t in i) {
            var n = i[t].actionByRoot[e];
            void 0 !== n && (this._deactivateAction(n),
            this._removeInactiveAction(n))
        }
        if (t = this._bindingsByRootAndName[e],
        void 0 !== t)
            for (var r in t)
                e = t[r],
                e.restoreOriginalState(),
                this._removeInactiveBinding(e)
    },
    uncacheAction: function(e, t) {
        var i = this.existingAction(e, t);
        null !== i && (this._deactivateAction(i),
        this._removeInactiveAction(i))
    }
}),
THREE.AnimationMixer._Action = THREE.AnimationAction._new,
Object.assign(THREE.AnimationMixer.prototype, {
    _bindAction: function(e, t) {
        var i = e._localRoot || this._root
          , n = e._clip.tracks
          , r = n.length
          , a = e._propertyBindings
          , o = e._interpolants
          , s = i.uuid
          , c = this._bindingsByRootAndName
          , h = c[s];
        for (void 0 === h && (h = {},
        c[s] = h),
        c = 0; c !== r; ++c) {
            var l = n[c]
              , u = l.name
              , p = h[u];
            if (void 0 === p) {
                if (p = a[c],
                void 0 !== p) {
                    null === p._cacheIndex && (++p.referenceCount,
                    this._addInactiveBinding(p, s, u));
                    continue
                }
                p = new THREE.PropertyMixer(THREE.PropertyBinding.create(i, u, t && t._propertyBindings[c].binding.parsedPath),l.ValueTypeName,l.getValueSize()),
                ++p.referenceCount,
                this._addInactiveBinding(p, s, u)
            }
            a[c] = p,
            o[c].resultBuffer = p.buffer
        }
    },
    _activateAction: function(e) {
        if (!this._isActiveAction(e)) {
            if (null === e._cacheIndex) {
                var t = (e._localRoot || this._root).uuid
                  , i = e._clip.uuid
                  , n = this._actionsByClip[i];
                this._bindAction(e, n && n.knownActions[0]),
                this._addInactiveAction(e, i, t)
            }
            for (t = e._propertyBindings,
            i = 0,
            n = t.length; i !== n; ++i) {
                var r = t[i];
                0 === r.useCount++ && (this._lendBinding(r),
                r.saveOriginalState())
            }
            this._lendAction(e)
        }
    },
    _deactivateAction: function(e) {
        if (this._isActiveAction(e)) {
            for (var t = e._propertyBindings, i = 0, n = t.length; i !== n; ++i) {
                var r = t[i];
                0 === --r.useCount && (r.restoreOriginalState(),
                this._takeBackBinding(r))
            }
            this._takeBackAction(e)
        }
    },
    _initMemoryManager: function() {
        this._actions = [],
        this._nActiveActions = 0,
        this._actionsByClip = {},
        this._bindings = [],
        this._nActiveBindings = 0,
        this._bindingsByRootAndName = {},
        this._controlInterpolants = [],
        this._nActiveControlInterpolants = 0;
        var e = this;
        this.stats = {
            actions: {
                get total() {
                    return e._actions.length
                },
                get inUse() {
                    return e._nActiveActions
                }
            },
            bindings: {
                get total() {
                    return e._bindings.length
                },
                get inUse() {
                    return e._nActiveBindings
                }
            },
            controlInterpolants: {
                get total() {
                    return e._controlInterpolants.length
                },
                get inUse() {
                    return e._nActiveControlInterpolants
                }
            }
        }
    },
    _isActiveAction: function(e) {
        return e = e._cacheIndex,
        null !== e && e < this._nActiveActions
    },
    _addInactiveAction: function(e, t, i) {
        var n = this._actions
          , r = this._actionsByClip
          , a = r[t];
        void 0 === a ? (a = {
            knownActions: [e],
            actionByRoot: {}
        },
        e._byClipCacheIndex = 0,
        r[t] = a) : (t = a.knownActions,
        e._byClipCacheIndex = t.length,
        t.push(e)),
        e._cacheIndex = n.length,
        n.push(e),
        a.actionByRoot[i] = e
    },
    _removeInactiveAction: function(e) {
        var t = this._actions
          , i = t[t.length - 1]
          , n = e._cacheIndex;
        i._cacheIndex = n,
        t[n] = i,
        t.pop(),
        e._cacheIndex = null ;
        var i = e._clip.uuid
          , n = this._actionsByClip
          , r = n[i]
          , a = r.knownActions
          , o = a[a.length - 1]
          , s = e._byClipCacheIndex;
        o._byClipCacheIndex = s,
        a[s] = o,
        a.pop(),
        e._byClipCacheIndex = null ,
        delete r.actionByRoot[(t._localRoot || this._root).uuid],
        0 === a.length && delete n[i],
        this._removeInactiveBindingsForAction(e)
    },
    _removeInactiveBindingsForAction: function(e) {
        e = e._propertyBindings;
        for (var t = 0, i = e.length; t !== i; ++t) {
            var n = e[t];
            0 === --n.referenceCount && this._removeInactiveBinding(n)
        }
    },
    _lendAction: function(e) {
        var t = this._actions
          , i = e._cacheIndex
          , n = this._nActiveActions++
          , r = t[n];
        e._cacheIndex = n,
        t[n] = e,
        r._cacheIndex = i,
        t[i] = r
    },
    _takeBackAction: function(e) {
        var t = this._actions
          , i = e._cacheIndex
          , n = --this._nActiveActions
          , r = t[n];
        e._cacheIndex = n,
        t[n] = e,
        r._cacheIndex = i,
        t[i] = r
    },
    _addInactiveBinding: function(e, t, i) {
        var n = this._bindingsByRootAndName
          , r = n[t]
          , a = this._bindings;
        void 0 === r && (r = {},
        n[t] = r),
        r[i] = e,
        e._cacheIndex = a.length,
        a.push(e)
    },
    _removeInactiveBinding: function(e) {
        var t = this._bindings
          , i = e.binding
          , n = i.rootNode.uuid
          , i = i.path
          , r = this._bindingsByRootAndName
          , a = r[n]
          , o = t[t.length - 1];
        e = e._cacheIndex,
        o._cacheIndex = e,
        t[e] = o,
        t.pop(),
        delete a[i];
        e: {
            for (var s in a)
                break e;
            delete r[n]
        }
    },
    _lendBinding: function(e) {
        var t = this._bindings
          , i = e._cacheIndex
          , n = this._nActiveBindings++
          , r = t[n];
        e._cacheIndex = n,
        t[n] = e,
        r._cacheIndex = i,
        t[i] = r
    },
    _takeBackBinding: function(e) {
        var t = this._bindings
          , i = e._cacheIndex
          , n = --this._nActiveBindings
          , r = t[n];
        e._cacheIndex = n,
        t[n] = e,
        r._cacheIndex = i,
        t[i] = r
    },
    _lendControlInterpolant: function() {
        var e = this._controlInterpolants
          , t = this._nActiveControlInterpolants++
          , i = e[t];
        return void 0 === i && (i = new THREE.LinearInterpolant(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),
        i.__cacheIndex = t,
        e[t] = i),
        i
    },
    _takeBackControlInterpolant: function(e) {
        var t = this._controlInterpolants
          , i = e.__cacheIndex
          , n = --this._nActiveControlInterpolants
          , r = t[n];
        e.__cacheIndex = n,
        t[n] = e,
        r.__cacheIndex = i,
        t[i] = r
    },
    _controlInterpolantsResultBuffer: new Float32Array(1)
}),
THREE.AnimationObjectGroup = function(e) {
    this.uuid = THREE.Math.generateUUID(),
    this._objects = Array.prototype.slice.call(arguments),
    this.nCachedObjects_ = 0;
    var t = {};
    this._indicesByUUID = t;
    for (var i = 0, n = arguments.length; i !== n; ++i)
        t[arguments[i].uuid] = i;
    this._paths = [],
    this._parsedPaths = [],
    this._bindings = [],
    this._bindingsIndicesByPath = {};
    var r = this;
    this.stats = {
        objects: {
            get total() {
                return r._objects.length
            },
            get inUse() {
                return this.total - r.nCachedObjects_
            }
        },
        get bindingsPerObject() {
            return r._bindings.length
        }
    }
}
,
THREE.AnimationObjectGroup.prototype = {
    constructor: THREE.AnimationObjectGroup,
    add: function(e) {
        for (var t = this._objects, i = t.length, n = this.nCachedObjects_, r = this._indicesByUUID, a = this._paths, o = this._parsedPaths, s = this._bindings, c = s.length, h = 0, l = arguments.length; h !== l; ++h) {
            var u = arguments[h]
              , p = u.uuid
              , d = r[p];
            if (void 0 === d) {
                d = i++,
                r[p] = d,
                t.push(u);
                for (var p = 0, f = c; p !== f; ++p)
                    s[p].push(new THREE.PropertyBinding(u,a[p],o[p]))
            } else if (n > d) {
                var E = t[d]
                  , m = --n
                  , f = t[m];
                for (r[f.uuid] = d,
                t[d] = f,
                r[p] = m,
                t[m] = u,
                p = 0,
                f = c; p !== f; ++p) {
                    var g = s[p]
                      , v = g[d];
                    g[d] = g[m],
                    void 0 === v && (v = new THREE.PropertyBinding(u,a[p],o[p])),
                    g[m] = v
                }
            } else
                t[d] !== E && void 0
        }
        this.nCachedObjects_ = n
    },
    remove: function(e) {
        for (var t = this._objects, i = this.nCachedObjects_, n = this._indicesByUUID, r = this._bindings, a = r.length, o = 0, s = arguments.length; o !== s; ++o) {
            var c = arguments[o]
              , h = c.uuid
              , l = n[h];
            if (void 0 !== l && l >= i) {
                var u = i++
                  , p = t[u];
                for (n[p.uuid] = l,
                t[l] = p,
                n[h] = u,
                t[u] = c,
                c = 0,
                h = a; c !== h; ++c) {
                    var p = r[c]
                      , d = p[l];
                    p[l] = p[u],
                    p[u] = d
                }
            }
        }
        this.nCachedObjects_ = i
    },
    uncache: function(e) {
        for (var t = this._objects, i = t.length, n = this.nCachedObjects_, r = this._indicesByUUID, a = this._bindings, o = a.length, s = 0, c = arguments.length; s !== c; ++s) {
            var h = arguments[s].uuid
              , l = r[h];
            if (void 0 !== l)
                if (delete r[h],
                n > l) {
                    var h = --n
                      , u = t[h]
                      , p = --i
                      , d = t[p];
                    for (r[u.uuid] = l,
                    t[l] = u,
                    r[d.uuid] = h,
                    t[h] = d,
                    t.pop(),
                    u = 0,
                    d = o; u !== d; ++u) {
                        var f = a[u]
                          , E = f[p];
                        f[l] = f[h],
                        f[h] = E,
                        f.pop()
                    }
                } else
                    for (p = --i,
                    d = t[p],
                    r[d.uuid] = l,
                    t[l] = d,
                    t.pop(),
                    u = 0,
                    d = o; u !== d; ++u)
                        f = a[u],
                        f[l] = f[p],
                        f.pop()
        }
        this.nCachedObjects_ = n
    },
    subscribe_: function(e, t) {
        var i = this._bindingsIndicesByPath
          , n = i[e]
          , r = this._bindings;
        if (void 0 !== n)
            return r[n];
        var a = this._paths
          , o = this._parsedPaths
          , s = this._objects
          , c = this.nCachedObjects_
          , h = Array(s.length)
          , n = r.length;
        for (i[e] = n,
        a.push(e),
        o.push(t),
        r.push(h),
        i = c,
        n = s.length; i !== n; ++i)
            h[i] = new THREE.PropertyBinding(s[i],e,t);
        return h
    },
    unsubscribe_: function(e) {
        var t = this._bindingsIndicesByPath
          , i = t[e];
        if (void 0 !== i) {
            var n = this._paths
              , r = this._parsedPaths
              , a = this._bindings
              , o = a.length - 1
              , s = a[o];
            t[e[o]] = i,
            a[i] = s,
            a.pop(),
            r[i] = r[o],
            r.pop(),
            n[i] = n[o],
            n.pop()
        }
    }
},
THREE.AnimationUtils = {
    arraySlice: function(e, t, i) {
        return THREE.AnimationUtils.isTypedArray(e) ? new e.constructor(e.subarray(t, i)) : e.slice(t, i)
    },
    convertArray: function(e, t, i) {
        return !e || !i && e.constructor === t ? e : "number" == typeof t.BYTES_PER_ELEMENT ? new t(e) : Array.prototype.slice.call(e)
    },
    isTypedArray: function(e) {
        return ArrayBuffer.isView(e) && !(e instanceof DataView)
    },
    getKeyframeOrder: function(e) {
        for (var t = e.length, i = Array(t), n = 0; n !== t; ++n)
            i[n] = n;
        return i.sort(function(t, i) {
            return e[t] - e[i]
        }),
        i
    },
    sortedArray: function(e, t, i) {
        for (var n = e.length, r = new e.constructor(n), a = 0, o = 0; o !== n; ++a)
            for (var s = i[a] * t, c = 0; c !== t; ++c)
                r[o++] = e[s + c];
        return r
    },
    flattenJSON: function(e, t, i, n) {
        for (var r = 1, a = e[0]; void 0 !== a && void 0 === a[n]; )
            a = e[r++];
        if (void 0 !== a) {
            var o = a[n];
            if (void 0 !== o)
                if (Array.isArray(o)) {
                    do
                        o = a[n],
                        void 0 !== o && (t.push(a.time),
                        i.push.apply(i, o)),
                        a = e[r++];
                    while (void 0 !== a)
                } else if (void 0 !== o.toArray) {
                    do
                        o = a[n],
                        void 0 !== o && (t.push(a.time),
                        o.toArray(i, i.length)),
                        a = e[r++];
                    while (void 0 !== a)
                } else
                    do
                        o = a[n],
                        void 0 !== o && (t.push(a.time),
                        i.push(o)),
                        a = e[r++];
                    while (void 0 !== a)
        }
    }
},
THREE.KeyframeTrack = function(e, t, i, n) {
    if (void 0 === e)
        throw Error("track name is undefined");
    if (void 0 === t || 0 === t.length)
        throw Error("no keyframes in track named " + e);
    this.name = e,
    this.times = THREE.AnimationUtils.convertArray(t, this.TimeBufferType),
    this.values = THREE.AnimationUtils.convertArray(i, this.ValueBufferType),
    this.setInterpolation(n || this.DefaultInterpolation),
    this.validate(),
    this.optimize()
}
,
THREE.KeyframeTrack.prototype = {
    constructor: THREE.KeyframeTrack,
    TimeBufferType: Float32Array,
    ValueBufferType: Float32Array,
    DefaultInterpolation: THREE.InterpolateLinear,
    InterpolantFactoryMethodDiscrete: function(e) {
        return new THREE.DiscreteInterpolant(this.times,this.values,this.getValueSize(),e)
    },
    InterpolantFactoryMethodLinear: function(e) {
        return new THREE.LinearInterpolant(this.times,this.values,this.getValueSize(),e)
    },
    InterpolantFactoryMethodSmooth: function(e) {
        return new THREE.CubicInterpolant(this.times,this.values,this.getValueSize(),e)
    },
    setInterpolation: function(e) {
        var t;
        switch (e) {
        case THREE.InterpolateDiscrete:
            t = this.InterpolantFactoryMethodDiscrete;
            break;
        case THREE.InterpolateLinear:
            t = this.InterpolantFactoryMethodLinear;
            break;
        case THREE.InterpolateSmooth:
            t = this.InterpolantFactoryMethodSmooth
        }
        if (void 0 === t) {
            if (t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name,
            void 0 === this.createInterpolant) {
                if (e === this.DefaultInterpolation)
                    throw Error(t);
                this.setInterpolation(this.DefaultInterpolation)
            }
        } else
            this.createInterpolant = t
    },
    getInterpolation: function() {
        switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
            return THREE.InterpolateDiscrete;
        case this.InterpolantFactoryMethodLinear:
            return THREE.InterpolateLinear;
        case this.InterpolantFactoryMethodSmooth:
            return THREE.InterpolateSmooth
        }
    },
    getValueSize: function() {
        return this.values.length / this.times.length
    },
    shift: function(e) {
        if (0 !== e)
            for (var t = this.times, i = 0, n = t.length; i !== n; ++i)
                t[i] += e;
        return this
    },
    scale: function(e) {
        if (1 !== e)
            for (var t = this.times, i = 0, n = t.length; i !== n; ++i)
                t[i] *= e;
        return this
    },
    trim: function(e, t) {
        for (var i = this.times, n = i.length, r = 0, a = n - 1; r !== n && i[r] < e; )
            ++r;
        for (; -1 !== a && i[a] > t; )
            --a;
        return ++a,
        0 === r && a === n || (r >= a && (a = Math.max(a, 1),
        r = a - 1),
        n = this.getValueSize(),
        this.times = THREE.AnimationUtils.arraySlice(i, r, a),
        this.values = THREE.AnimationUtils.arraySlice(this.values, r * n, a * n)),
        this
    },
    validate: function() {
        var e = !0
          , t = this.getValueSize();
        0 !== t - Math.floor(t) && (e = !1);
        var i = this.times
          , t = this.values
          , n = i.length;
        0 === n && (e = !1);
        for (var r = null , a = 0; a !== n; a++) {
            var o = i[a];
            if ("number" == typeof o && isNaN(o)) {
                e = !1;
                break
            }
            if (null !== r && r > o) {
                e = !1;
                break
            }
            r = o
        }
        if (void 0 !== t && THREE.AnimationUtils.isTypedArray(t))
            for (a = 0,
            i = t.length; a !== i; ++a)
                if (n = t[a],
                isNaN(n)) {
                    e = !1;
                    break
                }
        return e
    },
    optimize: function() {
        for (var e = this.times, t = this.values, i = this.getValueSize(), n = 1, r = 1, a = e.length - 1; a >= r; ++r) {
            var o = !1
              , s = e[r];
            if (s !== e[r + 1] && (1 !== r || s !== s[0]))
                for (var c = r * i, h = c - i, l = c + i, s = 0; s !== i; ++s) {
                    var u = t[c + s];
                    if (u !== t[h + s] || u !== t[l + s]) {
                        o = !0;
                        break
                    }
                }
            if (o) {
                if (r !== n)
                    for (e[n] = e[r],
                    o = r * i,
                    c = n * i,
                    s = 0; s !== i; ++s)
                        t[c + s] = t[o + s];
                ++n
            }
        }
        return n !== e.length && (this.times = THREE.AnimationUtils.arraySlice(e, 0, n),
        this.values = THREE.AnimationUtils.arraySlice(t, 0, n * i)),
        this
    }
},
Object.assign(THREE.KeyframeTrack, {
    parse: function(e) {
        if (void 0 === e.type)
            throw Error("track type undefined, can not parse");
        var t = THREE.KeyframeTrack._getTrackTypeForValueTypeName(e.type);
        if (void 0 === e.times) {
            var i = []
              , n = [];
            THREE.AnimationUtils.flattenJSON(e.keys, i, n, "value"),
            e.times = i,
            e.values = n
        }
        return void 0 !== t.parse ? t.parse(e) : new t(e.name,e.times,e.values,e.interpolation)
    },
    toJSON: function(e) {
        var t = e.constructor;
        if (void 0 !== t.toJSON)
            t = t.toJSON(e);
        else {
            var t = {
                name: e.name,
                times: THREE.AnimationUtils.convertArray(e.times, Array),
                values: THREE.AnimationUtils.convertArray(e.values, Array)
            }
              , i = e.getInterpolation();
            i !== e.DefaultInterpolation && (t.interpolation = i)
        }
        return t.type = e.ValueTypeName,
        t
    },
    _getTrackTypeForValueTypeName: function(e) {
        switch (e.toLowerCase()) {
        case "scalar":
        case "double":
        case "float":
        case "number":
        case "integer":
            return THREE.NumberKeyframeTrack;
        case "vector":
        case "vector2":
        case "vector3":
        case "vector4":
            return THREE.VectorKeyframeTrack;
        case "color":
            return THREE.ColorKeyframeTrack;
        case "quaternion":
            return THREE.QuaternionKeyframeTrack;
        case "bool":
        case "boolean":
            return THREE.BooleanKeyframeTrack;
        case "string":
            return THREE.StringKeyframeTrack
        }
        throw Error("Unsupported typeName: " + e)
    }
}),
THREE.PropertyBinding = function(e, t, i) {
    this.path = t,
    this.parsedPath = i || THREE.PropertyBinding.parseTrackName(t),
    this.node = THREE.PropertyBinding.findNode(e, this.parsedPath.nodeName) || e,
    this.rootNode = e
}
,
THREE.PropertyBinding.prototype = {
    constructor: THREE.PropertyBinding,
    getValue: function(e, t) {
        this.bind(),
        this.getValue(e, t)
    },
    setValue: function(e, t) {
        this.bind(),
        this.setValue(e, t)
    },
    bind: function() {
        var e = this.node
          , t = this.parsedPath
          , i = t.objectName
          , n = t.propertyName
          , r = t.propertyIndex;
        if (e || (this.node = e = THREE.PropertyBinding.findNode(this.rootNode, t.nodeName) || this.rootNode),
        this.getValue = this._getValue_unavailable,
        this.setValue = this._setValue_unavailable,
        e) {
            if (i) {
                var a = t.objectIndex;
                switch (i) {
                case "materials":
                    if (!e.material)
                        return;
                    if (!e.material.materials)
                        return;
                    e = e.material.materials;
                    break;
                case "bones":
                    if (!e.skeleton)
                        return;
                    for (e = e.skeleton.bones,
                    i = 0; i < e.length; i++)
                        if (e[i].name === a) {
                            a = i;
                            break
                        }
                    break;
                default:
                    if (void 0 === e[i])
                        return;
                    e = e[i]
                }
                if (void 0 !== a) {
                    if (void 0 === e[a])
                        return;
                    e = e[a]
                }
            }
            if (a = e[n]) {
                if (t = this.Versioning.None,
                void 0 !== e.needsUpdate ? (t = this.Versioning.NeedsUpdate,
                this.targetObject = e) : void 0 !== e.matrixWorldNeedsUpdate && (t = this.Versioning.MatrixWorldNeedsUpdate,
                this.targetObject = e),
                i = this.BindingType.Direct,
                void 0 !== r) {
                    if ("morphTargetInfluences" === n) {
                        if (!e.geometry)
                            return;
                        if (!e.geometry.morphTargets)
                            return;
                        for (i = 0; i < this.node.geometry.morphTargets.length; i++)
                            if (e.geometry.morphTargets[i].name === r) {
                                r = i;
                                break
                            }
                    }
                    i = this.BindingType.ArrayElement,
                    this.resolvedProperty = a,
                    this.propertyIndex = r
                } else
                    void 0 !== a.fromArray && void 0 !== a.toArray ? (i = this.BindingType.HasFromToArray,
                    this.resolvedProperty = a) : void 0 !== a.length ? (i = this.BindingType.EntireArray,
                    this.resolvedProperty = a) : this.propertyName = n;
                this.getValue = this.GetterByBindingType[i],
                this.setValue = this.SetterByBindingTypeAndVersioning[i][t]
            }
        }
    },
    unbind: function() {
        this.node = null ,
        this.getValue = this._getValue_unbound,
        this.setValue = this._setValue_unbound
    }
},
Object.assign(THREE.PropertyBinding.prototype, {
    _getValue_unavailable: function() {},
    _setValue_unavailable: function() {},
    _getValue_unbound: THREE.PropertyBinding.prototype.getValue,
    _setValue_unbound: THREE.PropertyBinding.prototype.setValue,
    BindingType: {
        Direct: 0,
        EntireArray: 1,
        ArrayElement: 2,
        HasFromToArray: 3
    },
    Versioning: {
        None: 0,
        NeedsUpdate: 1,
        MatrixWorldNeedsUpdate: 2
    },
    GetterByBindingType: [function(e, t) {
        e[t] = this.node[this.propertyName]
    }
    , function(e, t) {
        for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n)
            e[t++] = i[n]
    }
    , function(e, t) {
        e[t] = this.resolvedProperty[this.propertyIndex]
    }
    , function(e, t) {
        this.resolvedProperty.toArray(e, t)
    }
    ],
    SetterByBindingTypeAndVersioning: [[function(e, t) {
        this.node[this.propertyName] = e[t]
    }
    , function(e, t) {
        this.node[this.propertyName] = e[t],
        this.targetObject.needsUpdate = !0
    }
    , function(e, t) {
        this.node[this.propertyName] = e[t],
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ], [function(e, t) {
        for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n)
            i[n] = e[t++]
    }
    , function(e, t) {
        for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n)
            i[n] = e[t++];
        this.targetObject.needsUpdate = !0
    }
    , function(e, t) {
        for (var i = this.resolvedProperty, n = 0, r = i.length; n !== r; ++n)
            i[n] = e[t++];
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ], [function(e, t) {
        this.resolvedProperty[this.propertyIndex] = e[t]
    }
    , function(e, t) {
        this.resolvedProperty[this.propertyIndex] = e[t],
        this.targetObject.needsUpdate = !0
    }
    , function(e, t) {
        this.resolvedProperty[this.propertyIndex] = e[t],
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ], [function(e, t) {
        this.resolvedProperty.fromArray(e, t)
    }
    , function(e, t) {
        this.resolvedProperty.fromArray(e, t),
        this.targetObject.needsUpdate = !0
    }
    , function(e, t) {
        this.resolvedProperty.fromArray(e, t),
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ]]
}),
THREE.PropertyBinding.Composite = function(e, t, i) {
    i = i || THREE.PropertyBinding.parseTrackName(t),
    this._targetGroup = e,
    this._bindings = e.subscribe_(t, i)
}
,
THREE.PropertyBinding.Composite.prototype = {
    constructor: THREE.PropertyBinding.Composite,
    getValue: function(e, t) {
        this.bind();
        var i = this._bindings[this._targetGroup.nCachedObjects_];
        void 0 !== i && i.getValue(e, t)
    },
    setValue: function(e, t) {
        for (var i = this._bindings, n = this._targetGroup.nCachedObjects_, r = i.length; n !== r; ++n)
            i[n].setValue(e, t)
    },
    bind: function() {
        for (var e = this._bindings, t = this._targetGroup.nCachedObjects_, i = e.length; t !== i; ++t)
            e[t].bind()
    },
    unbind: function() {
        for (var e = this._bindings, t = this._targetGroup.nCachedObjects_, i = e.length; t !== i; ++t)
            e[t].unbind()
    }
},
THREE.PropertyBinding.create = function(e, t, i) {
    return e instanceof THREE.AnimationObjectGroup ? new THREE.PropertyBinding.Composite(e,t,i) : new THREE.PropertyBinding(e,t,i)
}
,
THREE.PropertyBinding.parseTrackName = function(e) {
    var t = /^(([\w]+\/)*)([\w-\d]+)?(\.([\w]+)(\[([\w\d\[\]\_.:\- ]+)\])?)?(\.([\w.]+)(\[([\w\d\[\]\_. ]+)\])?)$/
      , i = t.exec(e);
    if (!i)
        throw Error("cannot parse trackName at all: " + e);
    if (i.index === t.lastIndex && t.lastIndex++,
    t = {
        nodeName: i[3],
        objectName: i[5],
        objectIndex: i[7],
        propertyName: i[9],
        propertyIndex: i[11]
    },
    null === t.propertyName || 0 === t.propertyName.length)
        throw Error("can not parse propertyName from trackName: " + e);
    return t
}
,
THREE.PropertyBinding.findNode = function(e, t) {
    if (!t || "" === t || "root" === t || "." === t || -1 === t || t === e.name || t === e.uuid)
        return e;
    if (e.skeleton) {
        var i = function(e) {
            for (var i = 0; i < e.bones.length; i++) {
                var n = e.bones[i];
                if (n.name === t)
                    return n
            }
            return null
        }(e.skeleton);
        if (i)
            return i
    }
    if (e.children) {
        var n = function(e) {
            for (var i = 0; i < e.length; i++) {
                var r = e[i];
                if (r.name === t || r.uuid === t || (r = n(r.children)))
                    return r
            }
            return null
        }
        ;
        if (i = n(e.children))
            return i
    }
    return null
}
,
THREE.PropertyMixer = function(e, t, i) {
    switch (this.binding = e,
    this.valueSize = i,
    e = Float64Array,
    t) {
    case "quaternion":
        t = this._slerp;
        break;
    case "string":
    case "bool":
        e = Array,
        t = this._select;
        break;
    default:
        t = this._lerp
    }
    this.buffer = new e(4 * i),
    this._mixBufferRegion = t,
    this.referenceCount = this.useCount = this.cumulativeWeight = 0
}
,
THREE.PropertyMixer.prototype = {
    constructor: THREE.PropertyMixer,
    accumulate: function(e, t) {
        var i = this.buffer
          , n = this.valueSize
          , r = e * n + n
          , a = this.cumulativeWeight;
        if (0 === a) {
            for (a = 0; a !== n; ++a)
                i[r + a] = i[a];
            a = t
        } else
            a += t,
            this._mixBufferRegion(i, r, 0, t / a, n);
        this.cumulativeWeight = a
    },
    apply: function(e) {
        var t = this.valueSize
          , i = this.buffer;
        e = e * t + t;
        var n = this.cumulativeWeight
          , r = this.binding;
        this.cumulativeWeight = 0,
        1 > n && this._mixBufferRegion(i, e, 3 * t, 1 - n, t);
        for (var n = t, a = t + t; n !== a; ++n)
            if (i[n] !== i[n + t]) {
                r.setValue(i, e);
                break
            }
    },
    saveOriginalState: function() {
        var e = this.buffer
          , t = this.valueSize
          , i = 3 * t;
        this.binding.getValue(e, i);
        for (var n = t; n !== i; ++n)
            e[n] = e[i + n % t];
        this.cumulativeWeight = 0
    },
    restoreOriginalState: function() {
        this.binding.setValue(this.buffer, 3 * this.valueSize)
    },
    _select: function(e, t, i, n, r) {
        if (n >= .5)
            for (n = 0; n !== r; ++n)
                e[t + n] = e[i + n]
    },
    _slerp: function(e, t, i, n, r) {
        THREE.Quaternion.slerpFlat(e, t, e, t, e, i, n)
    },
    _lerp: function(e, t, i, n, r) {
        for (var a = 1 - n, o = 0; o !== r; ++o) {
            var s = t + o;
            e[s] = e[s] * a + e[i + o] * n
        }
    }
},
THREE.BooleanKeyframeTrack = function(e, t, i) {
    THREE.KeyframeTrack.call(this, e, t, i)
}
,
THREE.BooleanKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.BooleanKeyframeTrack,
    ValueTypeName: "bool",
    ValueBufferType: Array,
    DefaultInterpolation: THREE.InterpolateDiscrete,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0
}),
THREE.ColorKeyframeTrack = function(e, t, i, n) {
    THREE.KeyframeTrack.call(this, e, t, i, n)
}
,
THREE.ColorKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.ColorKeyframeTrack,
    ValueTypeName: "color"
}),
THREE.NumberKeyframeTrack = function(e, t, i, n) {
    THREE.KeyframeTrack.call(this, e, t, i, n)
}
,
THREE.NumberKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.NumberKeyframeTrack,
    ValueTypeName: "number"
}),
THREE.QuaternionKeyframeTrack = function(e, t, i, n) {
    THREE.KeyframeTrack.call(this, e, t, i, n)
}
,
THREE.QuaternionKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.QuaternionKeyframeTrack,
    ValueTypeName: "quaternion",
    DefaultInterpolation: THREE.InterpolateLinear,
    InterpolantFactoryMethodLinear: function(e) {
        return new THREE.QuaternionLinearInterpolant(this.times,this.values,this.getValueSize(),e);
    },
    InterpolantFactoryMethodSmooth: void 0
}),
THREE.StringKeyframeTrack = function(e, t, i, n) {
    THREE.KeyframeTrack.call(this, e, t, i, n)
}
,
THREE.StringKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.StringKeyframeTrack,
    ValueTypeName: "string",
    ValueBufferType: Array,
    DefaultInterpolation: THREE.InterpolateDiscrete,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0
}),
THREE.VectorKeyframeTrack = function(e, t, i, n) {
    THREE.KeyframeTrack.call(this, e, t, i, n)
}
,
THREE.VectorKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.VectorKeyframeTrack,
    ValueTypeName: "vector"
}),
THREE.Audio = function(e) {
    THREE.Object3D.call(this),
    this.type = "Audio",
    this.context = e.context,
    this.source = this.context.createBufferSource(),
    this.source.onended = this.onEnded.bind(this),
    this.gain = this.context.createGain(),
    this.gain.connect(e.getInput()),
    this.autoplay = !1,
    this.startTime = 0,
    this.playbackRate = 1,
    this.isPlaying = !1,
    this.hasPlaybackControl = !0,
    this.sourceType = "empty",
    this.filters = []
}
,
THREE.Audio.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Audio,
    getOutput: function() {
        return this.gain
    },
    setNodeSource: function(e) {
        return this.hasPlaybackControl = !1,
        this.sourceType = "audioNode",
        this.source = e,
        this.connect(),
        this
    },
    setBuffer: function(e) {
        return this.source.buffer = e,
        this.sourceType = "buffer",
        this.autoplay && this.play(),
        this
    },
    play: function() {
        if (!0 === this.isPlaying)
            ;
        else if (!1 !== this.hasPlaybackControl) {
            var e = this.context.createBufferSource();
            return e.buffer = this.source.buffer,
            e.loop = this.source.loop,
            e.onended = this.source.onended,
            e.start(0, this.startTime),
            e.playbackRate.value = this.playbackRate,
            this.isPlaying = !0,
            this.source = e,
            this.connect()
        }
    },
    pause: function() {
        return !1 !== this.hasPlaybackControl ? (this.source.stop(),
        this.startTime = this.context.currentTime,
        this) : void 0
    },
    stop: function() {
        return !1 !== this.hasPlaybackControl ? (this.source.stop(),
        this.startTime = 0,
        this) : void 0
    },
    connect: function() {
        if (0 < this.filters.length) {
            this.source.connect(this.filters[0]);
            for (var e = 1, t = this.filters.length; t > e; e++)
                this.filters[e - 1].connect(this.filters[e]);
            this.filters[this.filters.length - 1].connect(this.getOutput())
        } else
            this.source.connect(this.getOutput());
        return this
    },
    disconnect: function() {
        if (0 < this.filters.length) {
            this.source.disconnect(this.filters[0]);
            for (var e = 1, t = this.filters.length; t > e; e++)
                this.filters[e - 1].disconnect(this.filters[e]);
            this.filters[this.filters.length - 1].disconnect(this.getOutput())
        } else
            this.source.disconnect(this.getOutput());
        return this
    },
    getFilters: function() {
        return this.filters
    },
    setFilters: function(e) {
        return e || (e = []),
        !0 === this.isPlaying ? (this.disconnect(),
        this.filters = e,
        this.connect()) : this.filters = e,
        this
    },
    getFilter: function() {
        return this.getFilters()[0]
    },
    setFilter: function(e) {
        return this.setFilters(e ? [e] : [])
    },
    setPlaybackRate: function(e) {
        return !1 !== this.hasPlaybackControl ? (this.playbackRate = e,
        !0 === this.isPlaying && (this.source.playbackRate.value = this.playbackRate),
        this) : void 0
    },
    getPlaybackRate: function() {
        return this.playbackRate
    },
    onEnded: function() {
        this.isPlaying = !1
    },
    getLoop: function() {
        return !1 === this.hasPlaybackControl ? !1 : this.source.loop
    },
    setLoop: function(e) {
        !1 === this.hasPlaybackControl ? void 0 : this.source.loop = e
    },
    getVolume: function() {
        return this.gain.gain.value
    },
    setVolume: function(e) {
        return this.gain.gain.value = e,
        this
    }
}),
THREE.AudioAnalyser = function(e, t) {
    this.analyser = e.context.createAnalyser(),
    this.analyser.fftSize = void 0 !== t ? t : 2048,
    this.data = new Uint8Array(this.analyser.frequencyBinCount),
    e.getOutput().connect(this.analyser)
}
,
Object.assign(THREE.AudioAnalyser.prototype, {
    getFrequencyData: function() {
        return this.analyser.getByteFrequencyData(this.data),
        this.data
    },
    getAverageFrequency: function() {
        for (var e = 0, t = this.getFrequencyData(), i = 0; i < t.length; i++)
            e += t[i];
        return e / t.length
    }
}),
Object.defineProperty(THREE, "AudioContext", {
    get: function() {
        var e;
        return function() {
            return void 0 === e && (e = new (window.AudioContext || window.webkitAudioContext)),
            e
        }
    }()
}),
THREE.PositionalAudio = function(e) {
    THREE.Audio.call(this, e),
    this.panner = this.context.createPanner(),
    this.panner.connect(this.gain)
}
,
THREE.PositionalAudio.prototype = Object.assign(Object.create(THREE.Audio.prototype), {
    constructor: THREE.PositionalAudio,
    getOutput: function() {
        return this.panner
    },
    getRefDistance: function() {
        return this.panner.refDistance
    },
    setRefDistance: function(e) {
        this.panner.refDistance = e
    },
    getRolloffFactor: function() {
        return this.panner.rolloffFactor
    },
    setRolloffFactor: function(e) {
        this.panner.rolloffFactor = e
    },
    getDistanceModel: function() {
        return this.panner.distanceModel
    },
    setDistanceModel: function(e) {
        this.panner.distanceModel = e
    },
    getMaxDistance: function() {
        return this.panner.maxDistance
    },
    setMaxDistance: function(e) {
        this.panner.maxDistance = e
    },
    updateMatrixWorld: function() {
        var e = new THREE.Vector3;
        return function(t) {
            THREE.Object3D.prototype.updateMatrixWorld.call(this, t),
            e.setFromMatrixPosition(this.matrixWorld),
            this.panner.setPosition(e.x, e.y, e.z)
        }
    }()
}),
THREE.AudioListener = function() {
    THREE.Object3D.call(this),
    this.type = "AudioListener",
    this.context = THREE.AudioContext,
    this.gain = this.context.createGain(),
    this.gain.connect(this.context.destination),
    this.filter = null
}
,
THREE.AudioListener.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.AudioListener,
    getInput: function() {
        return this.gain
    },
    removeFilter: function() {
        null !== this.filter && (this.gain.disconnect(this.filter),
        this.filter.disconnect(this.context.destination),
        this.gain.connect(this.context.destination),
        this.filter = null )
    },
    getFilter: function() {
        return this.filter
    },
    setFilter: function(e) {
        null !== this.filter ? (this.gain.disconnect(this.filter),
        this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination),
        this.filter = e,
        this.gain.connect(this.filter),
        this.filter.connect(this.context.destination)
    },
    getMasterVolume: function() {
        return this.gain.gain.value
    },
    setMasterVolume: function(e) {
        this.gain.gain.value = e
    },
    updateMatrixWorld: function() {
        var e = new THREE.Vector3
          , t = new THREE.Quaternion
          , i = new THREE.Vector3
          , n = new THREE.Vector3;
        return function(r) {
            THREE.Object3D.prototype.updateMatrixWorld.call(this, r),
            r = this.context.listener;
            var a = this.up;
            this.matrixWorld.decompose(e, t, i),
            n.set(0, 0, -1).applyQuaternion(t),
            r.setPosition(e.x, e.y, e.z),
            r.setOrientation(n.x, n.y, n.z, a.x, a.y, a.z)
        }
    }()
}),
THREE.Camera = function() {
    THREE.Object3D.call(this),
    this.type = "Camera",
    this.matrixWorldInverse = new THREE.Matrix4,
    this.projectionMatrix = new THREE.Matrix4
}
,
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype),
THREE.Camera.prototype.constructor = THREE.Camera,
THREE.Camera.prototype.getWorldDirection = function() {
    var e = new THREE.Quaternion;
    return function(t) {
        return t = t || new THREE.Vector3,
        this.getWorldQuaternion(e),
        t.set(0, 0, -1).applyQuaternion(e)
    }
}(),
THREE.Camera.prototype.lookAt = function() {
    var e = new THREE.Matrix4;
    return function(t) {
        e.lookAt(this.position, t, this.up),
        this.quaternion.setFromRotationMatrix(e)
    }
}(),
THREE.Camera.prototype.clone = function() {
    return (new this.constructor).copy(this)
}
,
THREE.Camera.prototype.copy = function(e) {
    return THREE.Object3D.prototype.copy.call(this, e),
    this.matrixWorldInverse.copy(e.matrixWorldInverse),
    this.projectionMatrix.copy(e.projectionMatrix),
    this
}
,
THREE.CubeCamera = function(e, t, i) {
    THREE.Object3D.call(this),
    this.type = "CubeCamera";
    var n = new THREE.PerspectiveCamera(90,1,e,t);
    n.up.set(0, -1, 0),
    n.lookAt(new THREE.Vector3(1,0,0)),
    this.add(n);
    var r = new THREE.PerspectiveCamera(90,1,e,t);
    r.up.set(0, -1, 0),
    r.lookAt(new THREE.Vector3(-1,0,0)),
    this.add(r);
    var a = new THREE.PerspectiveCamera(90,1,e,t);
    a.up.set(0, 0, 1),
    a.lookAt(new THREE.Vector3(0,1,0)),
    this.add(a);
    var o = new THREE.PerspectiveCamera(90,1,e,t);
    o.up.set(0, 0, -1),
    o.lookAt(new THREE.Vector3(0,-1,0)),
    this.add(o);
    var s = new THREE.PerspectiveCamera(90,1,e,t);
    s.up.set(0, -1, 0),
    s.lookAt(new THREE.Vector3(0,0,1)),
    this.add(s);
    var c = new THREE.PerspectiveCamera(90,1,e,t);
    c.up.set(0, -1, 0),
    c.lookAt(new THREE.Vector3(0,0,-1)),
    this.add(c),
    this.renderTarget = new THREE.WebGLRenderTargetCube(i,i,{
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    }),
    this.updateCubeMap = function(e, t) {
        null === this.parent && this.updateMatrixWorld();
        var i = this.renderTarget
          , h = i.texture.generateMipmaps;
        i.texture.generateMipmaps = !1,
        i.activeCubeFace = 0,
        e.render(t, n, i),
        i.activeCubeFace = 1,
        e.render(t, r, i),
        i.activeCubeFace = 2,
        e.render(t, a, i),
        i.activeCubeFace = 3,
        e.render(t, o, i),
        i.activeCubeFace = 4,
        e.render(t, s, i),
        i.texture.generateMipmaps = h,
        i.activeCubeFace = 5,
        e.render(t, c, i),
        e.setRenderTarget(null )
    }
}
,
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype),
THREE.CubeCamera.prototype.constructor = THREE.CubeCamera,
THREE.OrthographicCamera = function(e, t, i, n, r, a) {
    THREE.Camera.call(this),
    this.type = "OrthographicCamera",
    this.zoom = 1,
    this.left = e,
    this.right = t,
    this.top = i,
    this.bottom = n,
    this.near = void 0 !== r ? r : .1,
    this.far = void 0 !== a ? a : 2e3,
    this.updateProjectionMatrix()
}
,
THREE.OrthographicCamera.prototype = Object.assign(Object.create(THREE.Camera.prototype), {
    constructor: THREE.OrthographicCamera,
    copy: function(e) {
        return THREE.Camera.prototype.copy.call(this, e),
        this.left = e.left,
        this.right = e.right,
        this.top = e.top,
        this.bottom = e.bottom,
        this.near = e.near,
        this.far = e.far,
        this.zoom = e.zoom,
        this
    },
    updateProjectionMatrix: function() {
        var e = (this.right - this.left) / (2 * this.zoom)
          , t = (this.top - this.bottom) / (2 * this.zoom)
          , i = (this.right + this.left) / 2
          , n = (this.top + this.bottom) / 2;
        this.projectionMatrix.makeOrthographic(i - e, i + e, n + t, n - t, this.near, this.far)
    },
    toJSON: function(e) {
        return e = THREE.Object3D.prototype.toJSON.call(this, e),
        e.object.zoom = this.zoom,
        e.object.left = this.left,
        e.object.right = this.right,
        e.object.top = this.top,
        e.object.bottom = this.bottom,
        e.object.near = this.near,
        e.object.far = this.far,
        e
    }
}),
THREE.PerspectiveCamera = function(e, t, i, n) {
    THREE.Camera.call(this),
    this.type = "PerspectiveCamera",
    this.fov = void 0 !== e ? e : 50,
    this.zoom = 1,
    this.near = void 0 !== i ? i : .1,
    this.far = void 0 !== n ? n : 2e3,
    this.focus = 10,
    this.aspect = void 0 !== t ? t : 1,
    this.view = null ,
    this.filmGauge = 35,
    this.filmOffset = 0,
    this.updateProjectionMatrix()
}
,
THREE.PerspectiveCamera.prototype = Object.assign(Object.create(THREE.Camera.prototype), {
    constructor: THREE.PerspectiveCamera,
    copy: function(e) {
        return THREE.Camera.prototype.copy.call(this, e),
        this.fov = e.fov,
        this.zoom = e.zoom,
        this.near = e.near,
        this.far = e.far,
        this.focus = e.focus,
        this.aspect = e.aspect,
        this.view = null === e.view ? null : Object.assign({}, e.view),
        this.filmGauge = e.filmGauge,
        this.filmOffset = e.filmOffset,
        this
    },
    setFocalLength: function(e) {
        e = .5 * this.getFilmHeight() / e,
        this.fov = 2 * THREE.Math.RAD2DEG * Math.atan(e),
        this.updateProjectionMatrix()
    },
    getFocalLength: function() {
        var e = Math.tan(.5 * THREE.Math.DEG2RAD * this.fov);
        return .5 * this.getFilmHeight() / e
    },
    getEffectiveFOV: function() {
        return 2 * THREE.Math.RAD2DEG * Math.atan(Math.tan(.5 * THREE.Math.DEG2RAD * this.fov) / this.zoom)
    },
    getFilmWidth: function() {
        return this.filmGauge * Math.min(this.aspect, 1)
    },
    getFilmHeight: function() {
        return this.filmGauge / Math.max(this.aspect, 1)
    },
    setViewOffset: function(e, t, i, n, r, a) {
        this.aspect = e / t,
        this.view = {
            fullWidth: e,
            fullHeight: t,
            offsetX: i,
            offsetY: n,
            width: r,
            height: a
        },
        this.updateProjectionMatrix()
    },
    clearViewOffset: function() {
        this.view = null ,
        this.updateProjectionMatrix()
    },
    updateProjectionMatrix: function() {
        var e = this.near
          , t = e * Math.tan(.5 * THREE.Math.DEG2RAD * this.fov) / this.zoom
          , i = 2 * t
          , n = this.aspect * i
          , r = -.5 * n
          , a = this.view;
        if (null !== a)
            var o = a.fullWidth
              , s = a.fullHeight
              , r = r + a.offsetX * n / o
              , t = t - a.offsetY * i / s
              , n = a.width / o * n
              , i = a.height / s * i;
        a = this.filmOffset,
        0 !== a && (r += e * a / this.getFilmWidth()),
        this.projectionMatrix.makeFrustum(r, r + n, t - i, t, e, this.far)
    },
    toJSON: function(e) {
        return e = THREE.Object3D.prototype.toJSON.call(this, e),
        e.object.fov = this.fov,
        e.object.zoom = this.zoom,
        e.object.near = this.near,
        e.object.far = this.far,
        e.object.focus = this.focus,
        e.object.aspect = this.aspect,
        null !== this.view && (e.object.view = Object.assign({}, this.view)),
        e.object.filmGauge = this.filmGauge,
        e.object.filmOffset = this.filmOffset,
        e
    }
}),
THREE.StereoCamera = function() {
    this.type = "StereoCamera",
    this.aspect = 1,
    this.cameraL = new THREE.PerspectiveCamera,
    this.cameraL.layers.enable(1),
    this.cameraL.matrixAutoUpdate = !1,
    this.cameraR = new THREE.PerspectiveCamera,
    this.cameraR.layers.enable(2),
    this.cameraR.matrixAutoUpdate = !1
}
,
Object.assign(THREE.StereoCamera.prototype, {
    update: function() {
        var e, t, i, n, r, a = new THREE.Matrix4, o = new THREE.Matrix4;
        return function(s) {
            if (e !== s.focus || t !== s.fov || i !== s.aspect * this.aspect || n !== s.near || r !== s.far) {
                e = s.focus,
                t = s.fov,
                i = s.aspect * this.aspect,
                n = s.near,
                r = s.far;
                var c, h, l = s.projectionMatrix.clone(), u = .032 * n / e, p = n * Math.tan(THREE.Math.DEG2RAD * t * .5);
                o.elements[12] = -.032,
                a.elements[12] = .032,
                c = -p * i + u,
                h = p * i + u,
                l.elements[0] = 2 * n / (h - c),
                l.elements[8] = (h + c) / (h - c),
                this.cameraL.projectionMatrix.copy(l),
                c = -p * i - u,
                h = p * i - u,
                l.elements[0] = 2 * n / (h - c),
                l.elements[8] = (h + c) / (h - c),
                this.cameraR.projectionMatrix.copy(l)
            }
            this.cameraL.matrixWorld.copy(s.matrixWorld).multiply(o),
            this.cameraR.matrixWorld.copy(s.matrixWorld).multiply(a)
        }
    }()
}),
THREE.Light = function(e, t) {
    THREE.Object3D.call(this),
    this.type = "Light",
    this.color = new THREE.Color(e),
    this.intensity = void 0 !== t ? t : 1,
    this.receiveShadow = void 0
}
,
THREE.Light.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Light,
    copy: function(e) {
        return THREE.Object3D.prototype.copy.call(this, e),
        this.color.copy(e.color),
        this.intensity = e.intensity,
        this
    },
    toJSON: function(e) {
        return e = THREE.Object3D.prototype.toJSON.call(this, e),
        e.object.color = this.color.getHex(),
        e.object.intensity = this.intensity,
        void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()),
        void 0 !== this.distance && (e.object.distance = this.distance),
        void 0 !== this.angle && (e.object.angle = this.angle),
        void 0 !== this.decay && (e.object.decay = this.decay),
        void 0 !== this.penumbra && (e.object.penumbra = this.penumbra),
        e
    }
}),
THREE.LightShadow = function(e) {
    this.camera = e,
    this.bias = 0,
    this.radius = 1,
    this.mapSize = new THREE.Vector2(512,512),
    this.map = null ,
    this.matrix = new THREE.Matrix4
}
,
Object.assign(THREE.LightShadow.prototype, {
    copy: function(e) {
        return this.camera = e.camera.clone(),
        this.bias = e.bias,
        this.radius = e.radius,
        this.mapSize.copy(e.mapSize),
        this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    }
}),
THREE.AmbientLight = function(e, t) {
    THREE.Light.call(this, e, t),
    this.type = "AmbientLight",
    this.castShadow = void 0
}
,
THREE.AmbientLight.prototype = Object.assign(Object.create(THREE.Light.prototype), {
    constructor: THREE.AmbientLight
}),
THREE.DirectionalLight = function(e, t) {
    THREE.Light.call(this, e, t),
    this.type = "DirectionalLight",
    this.position.set(0, 1, 0),
    this.updateMatrix(),
    this.target = new THREE.Object3D,
    this.shadow = new THREE.DirectionalLightShadow
}
,
THREE.DirectionalLight.prototype = Object.assign(Object.create(THREE.Light.prototype), {
    constructor: THREE.DirectionalLight,
    copy: function(e) {
        return THREE.Light.prototype.copy.call(this, e),
        this.target = e.target.clone(),
        this.shadow = e.shadow.clone(),
        this
    }
}),
THREE.DirectionalLightShadow = function(e) {
    THREE.LightShadow.call(this, new THREE.OrthographicCamera(-5,5,5,-5,.5,500))
}
,
THREE.DirectionalLightShadow.prototype = Object.assign(Object.create(THREE.LightShadow.prototype), {
    constructor: THREE.DirectionalLightShadow
}),
THREE.HemisphereLight = function(e, t, i) {
    THREE.Light.call(this, e, i),
    this.type = "HemisphereLight",
    this.castShadow = void 0,
    this.position.set(0, 1, 0),
    this.updateMatrix(),
    this.groundColor = new THREE.Color(t)
}
,
THREE.HemisphereLight.prototype = Object.assign(Object.create(THREE.Light.prototype), {
    constructor: THREE.HemisphereLight,
    copy: function(e) {
        return THREE.Light.prototype.copy.call(this, e),
        this.groundColor.copy(e.groundColor),
        this
    }
}),
THREE.PointLight = function(e, t, i, n) {
    THREE.Light.call(this, e, t),
    this.type = "PointLight",
    Object.defineProperty(this, "power", {
        get: function() {
            return 4 * this.intensity * Math.PI
        },
        set: function(e) {
            this.intensity = e / (4 * Math.PI)
        }
    }),
    this.distance = void 0 !== i ? i : 0,
    this.decay = void 0 !== n ? n : 1,
    this.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(90,1,.5,500))
}
,
THREE.PointLight.prototype = Object.assign(Object.create(THREE.Light.prototype), {
    constructor: THREE.PointLight,
    copy: function(e) {
        return THREE.Light.prototype.copy.call(this, e),
        this.distance = e.distance,
        this.decay = e.decay,
        this.shadow = e.shadow.clone(),
        this
    }
}),
THREE.SpotLight = function(e, t, i, n, r, a) {
    THREE.Light.call(this, e, t),
    this.type = "SpotLight",
    this.position.set(0, 1, 0),
    this.updateMatrix(),
    this.target = new THREE.Object3D,
    Object.defineProperty(this, "power", {
        get: function() {
            return this.intensity * Math.PI
        },
        set: function(e) {
            this.intensity = e / Math.PI
        }
    }),
    this.distance = void 0 !== i ? i : 0,
    this.angle = void 0 !== n ? n : Math.PI / 3,
    this.penumbra = void 0 !== r ? r : 0,
    this.decay = void 0 !== a ? a : 1,
    this.shadow = new THREE.SpotLightShadow
}
,
THREE.SpotLight.prototype = Object.assign(Object.create(THREE.Light.prototype), {
    constructor: THREE.SpotLight,
    copy: function(e) {
        return THREE.Light.prototype.copy.call(this, e),
        this.distance = e.distance,
        this.angle = e.angle,
        this.penumbra = e.penumbra,
        this.decay = e.decay,
        this.target = e.target.clone(),
        this.shadow = e.shadow.clone(),
        this
    }
}),
THREE.SpotLightShadow = function() {
    THREE.LightShadow.call(this, new THREE.PerspectiveCamera(50,1,.5,500))
}
,
THREE.SpotLightShadow.prototype = Object.assign(Object.create(THREE.LightShadow.prototype), {
    constructor: THREE.SpotLightShadow,
    update: function(e) {
        var t = 2 * THREE.Math.RAD2DEG * e.angle
          , i = this.mapSize.width / this.mapSize.height;
        e = e.distance || 500;
        var n = this.camera;
        t === n.fov && i === n.aspect && e === n.far || (n.fov = t,
        n.aspect = i,
        n.far = e,
        n.updateProjectionMatrix())
    }
}),
THREE.AudioLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.AudioLoader.prototype = {
    constructor: THREE.AudioLoader,
    load: function(e, t, i, n) {
        var r = new THREE.XHRLoader(this.manager);
        r.setResponseType("arraybuffer"),
        r.load(e, function(e) {
            THREE.AudioContext.decodeAudioData(e, function(e) {
                t(e)
            })
        }, i, n)
    }
},
THREE.Cache = {
    enabled: !1,
    files: {},
    add: function(e, t) {
        !1 !== this.enabled && (this.files[e] = t)
    },
    get: function(e) {
        return !1 !== this.enabled ? this.files[e] : void 0
    },
    remove: function(e) {
        delete this.files[e]
    },
    clear: function() {
        this.files = {}
    }
},
THREE.Loader = function() {
    this.onLoadStart = function() {}
    ,
    this.onLoadProgress = function() {}
    ,
    this.onLoadComplete = function() {}
}
,
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: void 0,
    extractUrlBase: function(e) {
        return e = e.split("/"),
        1 === e.length ? "./" : (e.pop(),
        e.join("/") + "/")
    },
    initMaterials: function(e, t, i) {
        for (var n = [], r = 0; r < e.length; ++r)
            n[r] = this.createMaterial(e[r], t, i);
        return n
    },
    createMaterial: function() {
        var e, t, i;
        return function(n, r, a) {
            function o(e, i, n, o, s) {
                e = r + e;
                var h = THREE.Loader.Handlers.get(e);
                return null !== h ? e = h.load(e) : (t.setCrossOrigin(a),
                e = t.load(e)),
                void 0 !== i && (e.repeat.fromArray(i),
                1 !== i[0] && (e.wrapS = THREE.RepeatWrapping),
                1 !== i[1] && (e.wrapT = THREE.RepeatWrapping)),
                void 0 !== n && e.offset.fromArray(n),
                void 0 !== o && ("repeat" === o[0] && (e.wrapS = THREE.RepeatWrapping),
                "mirror" === o[0] && (e.wrapS = THREE.MirroredRepeatWrapping),
                "repeat" === o[1] && (e.wrapT = THREE.RepeatWrapping),
                "mirror" === o[1] && (e.wrapT = THREE.MirroredRepeatWrapping)),
                void 0 !== s && (e.anisotropy = s),
                i = THREE.Math.generateUUID(),
                c[i] = e,
                i
            }
            void 0 === e && (e = new THREE.Color),
            void 0 === t && (t = new THREE.TextureLoader),
            void 0 === i && (i = new THREE.MaterialLoader);
            var s, c = {}, h = {
                uuid: THREE.Math.generateUUID(),
                type: "MeshLambertMaterial"
            };
            for (s in n) {
                var l = n[s];
                switch (s) {
                case "DbgColor":
                case "DbgIndex":
                case "opticalDensity":
                case "illumination":
                    break;
                case "DbgName":
                    h.name = l;
                    break;
                case "blending":
                    h.blending = THREE[l];
                    break;
                case "colorAmbient":
                case "mapAmbient":
                    break;
                case "colorDiffuse":
                    h.color = e.fromArray(l).getHex();
                    break;
                case "colorSpecular":
                    h.specular = e.fromArray(l).getHex();
                    break;
                case "colorEmissive":
                    h.emissive = e.fromArray(l).getHex();
                    break;
                case "specularCoef":
                    h.shininess = l;
                    break;
                case "shading":
                    "basic" === l.toLowerCase() && (h.type = "MeshBasicMaterial"),
                    "phong" === l.toLowerCase() && (h.type = "MeshPhongMaterial");
                    break;
                case "mapDiffuse":
                    h.map = o(l, n.mapDiffuseRepeat, n.mapDiffuseOffset, n.mapDiffuseWrap, n.mapDiffuseAnisotropy);
                    break;
                case "mapDiffuseRepeat":
                case "mapDiffuseOffset":
                case "mapDiffuseWrap":
                case "mapDiffuseAnisotropy":
                    break;
                case "mapLight":
                    h.lightMap = o(l, n.mapLightRepeat, n.mapLightOffset, n.mapLightWrap, n.mapLightAnisotropy);
                    break;
                case "mapLightRepeat":
                case "mapLightOffset":
                case "mapLightWrap":
                case "mapLightAnisotropy":
                    break;
                case "mapAO":
                    h.aoMap = o(l, n.mapAORepeat, n.mapAOOffset, n.mapAOWrap, n.mapAOAnisotropy);
                    break;
                case "mapAORepeat":
                case "mapAOOffset":
                case "mapAOWrap":
                case "mapAOAnisotropy":
                    break;
                case "mapBump":
                    h.bumpMap = o(l, n.mapBumpRepeat, n.mapBumpOffset, n.mapBumpWrap, n.mapBumpAnisotropy);
                    break;
                case "mapBumpScale":
                    h.bumpScale = l;
                    break;
                case "mapBumpRepeat":
                case "mapBumpOffset":
                case "mapBumpWrap":
                case "mapBumpAnisotropy":
                    break;
                case "mapNormal":
                    h.normalMap = o(l, n.mapNormalRepeat, n.mapNormalOffset, n.mapNormalWrap, n.mapNormalAnisotropy);
                    break;
                case "mapNormalFactor":
                    h.normalScale = [l, l];
                    break;
                case "mapNormalRepeat":
                case "mapNormalOffset":
                case "mapNormalWrap":
                case "mapNormalAnisotropy":
                    break;
                case "mapSpecular":
                    h.specularMap = o(l, n.mapSpecularRepeat, n.mapSpecularOffset, n.mapSpecularWrap, n.mapSpecularAnisotropy);
                    break;
                case "mapSpecularRepeat":
                case "mapSpecularOffset":
                case "mapSpecularWrap":
                case "mapSpecularAnisotropy":
                    break;
                case "mapAlpha":
                    h.alphaMap = o(l, n.mapAlphaRepeat, n.mapAlphaOffset, n.mapAlphaWrap, n.mapAlphaAnisotropy);
                    break;
                case "mapAlphaRepeat":
                case "mapAlphaOffset":
                case "mapAlphaWrap":
                case "mapAlphaAnisotropy":
                    break;
                case "flipSided":
                    h.side = THREE.BackSide;
                    break;
                case "doubleSided":
                    h.side = THREE.DoubleSide;
                    break;
                case "transparency":
                    h.opacity = l;
                    break;
                case "depthTest":
                case "depthWrite":
                case "colorWrite":
                case "opacity":
                case "reflectivity":
                case "transparent":
                case "visible":
                case "wireframe":
                    h[s] = l;
                    break;
                case "vertexColors":
                    !0 === l && (h.vertexColors = THREE.VertexColors),
                    "face" === l && (h.vertexColors = THREE.FaceColors)
                }
            }
            return "MeshBasicMaterial" === h.type && delete h.emissive,
            "MeshPhongMaterial" !== h.type && delete h.specular,
            1 > h.opacity && (h.transparent = !0),
            i.setTextures(c),
            i.parse(h)
        }
    }()
},
THREE.Loader.Handlers = {
    handlers: [],
    add: function(e, t) {
        this.handlers.push(e, t)
    },
    get: function(e) {
        for (var t = this.handlers, i = 0, n = t.length; n > i; i += 2) {
            var r = t[i + 1];
            if (t[i].test(e))
                return r
        }
        return null
    }
},
THREE.XHRLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.XHRLoader.prototype = {
    constructor: THREE.XHRLoader,
    load: function(e, t, i, n) {
        void 0 !== this.path && (e = this.path + e);
        var r = this
          , a = THREE.Cache.get(e);
        if (void 0 !== a)
            return t && setTimeout(function() {
                t(a)
            }, 0),
            a;
        var o = new XMLHttpRequest;
        return o.overrideMimeType("text/plain"),
        o.open("GET", e, !0),
        o.addEventListener("load", function(i) {
            var a = i.target.response;
            THREE.Cache.add(e, a),
            200 === this.status ? (t && t(a),
            r.manager.itemEnd(e)) : 0 === this.status ? (t && t(a),
            r.manager.itemEnd(e)) : (n && n(i),
            r.manager.itemError(e))
        }, !1),
        void 0 !== i && o.addEventListener("progress", function(e) {
            i(e)
        }, !1),
        o.addEventListener("error", function(t) {
            n && n(t),
            r.manager.itemError(e)
        }, !1),
        void 0 !== this.responseType && (o.responseType = this.responseType),
        void 0 !== this.withCredentials && (o.withCredentials = this.withCredentials),
        o.send(null ),
        r.manager.itemStart(e),
        o
    },
    setPath: function(e) {
        this.path = e
    },
    setResponseType: function(e) {
        this.responseType = e
    },
    setWithCredentials: function(e) {
        this.withCredentials = e
    }
},
THREE.FontLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.FontLoader.prototype = {
    constructor: THREE.FontLoader,
    load: function(e, t, i, n) {
        var r = this;
        new THREE.XHRLoader(this.manager).load(e, function(e) {
            var i;
            try {
                i = JSON.parse(e)
            } catch (n) {
                i = JSON.parse(e.substring(65, e.length - 2))
            }
            e = r.parse(i),
            t && t(e)
        }, i, n)
    },
    parse: function(e) {
        return new THREE.Font(e)
    }
},
THREE.ImageLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    load: function(e, t, i, n) {
        void 0 !== this.path && (e = this.path + e);
        var r = this
          , a = THREE.Cache.get(e);
        if (void 0 !== a)
            return r.manager.itemStart(e),
            t ? setTimeout(function() {
                t(a),
                r.manager.itemEnd(e)
            }, 0) : r.manager.itemEnd(e),
            a;
        var o = document.createElement("img");
        return o.addEventListener("load", function(i) {
            THREE.Cache.add(e, this),
            t && t(this),
            r.manager.itemEnd(e)
        }, !1),
        void 0 !== i && o.addEventListener("progress", function(e) {
            i(e)
        }, !1),
        o.addEventListener("error", function(t) {
            n && n(t),
            r.manager.itemError(e)
        }, !1),
        void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin),
        r.manager.itemStart(e),
        o.src = e,
        o
    },
    setCrossOrigin: function(e) {
        this.crossOrigin = e
    },
    setPath: function(e) {
        this.path = e
    }
},
THREE.JSONLoader = function(e) {
    "boolean" == typeof e && (e = void 0),
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this.withCredentials = !1
}
,
THREE.JSONLoader.prototype = {
    constructor: THREE.JSONLoader,
    get statusDomElement() {
        return void 0 === this._statusDomElement && (this._statusDomElement = document.createElement("div")),
        this._statusDomElement
    },
    load: function(e, t, i, n) {
        var r = this
          , a = this.texturePath && "string" == typeof this.texturePath ? this.texturePath : THREE.Loader.prototype.extractUrlBase(e)
          , o = new THREE.XHRLoader(this.manager);
        o.setWithCredentials(this.withCredentials),
        o.load(e, function(e) {
            e = JSON.parse(e);
            var i = e.metadata;
            if (void 0 !== i && (i = i.type,
            void 0 !== i)) {
                if ("object" === i.toLowerCase())
                    return;
                if ("scene" === i.toLowerCase())
                    return
            }
            e = r.parse(e, a),
            t(e.geometry, e.materials)
        }, i, n)
    },
    setTexturePath: function(e) {
        this.texturePath = e
    },
    parse: function(e, t) {
        var i = new THREE.Geometry
          , n = void 0 !== e.scale ? 1 / e.scale : 1;
        return function(t) {
            var n, r, a, o, s, c, h, l, u, p, d, f, E, m = e.faces;
            c = e.vertices;
            var g = e.normals
              , v = e.colors
              , T = 0;
            if (void 0 !== e.uvs) {
                for (n = 0; n < e.uvs.length; n++)
                    e.uvs[n].length && T++;
                for (n = 0; T > n; n++)
                    i.faceVertexUvs[n] = []
            }
            for (o = 0,
            s = c.length; s > o; )
                n = new THREE.Vector3,
                n.x = c[o++] * t,
                n.y = c[o++] * t,
                n.z = c[o++] * t,
                i.vertices.push(n);
            for (o = 0,
            s = m.length; s > o; )
                if (t = m[o++],
                u = 1 & t,
                a = 2 & t,
                n = 8 & t,
                h = 16 & t,
                p = 32 & t,
                c = 64 & t,
                t &= 128,
                u) {
                    if (u = new THREE.Face3,
                    u.a = m[o],
                    u.b = m[o + 1],
                    u.c = m[o + 3],
                    d = new THREE.Face3,
                    d.a = m[o + 1],
                    d.b = m[o + 2],
                    d.c = m[o + 3],
                    o += 4,
                    a && (a = m[o++],
                    u.materialIndex = a,
                    d.materialIndex = a),
                    a = i.faces.length,
                    n)
                        for (n = 0; T > n; n++)
                            for (f = e.uvs[n],
                            i.faceVertexUvs[n][a] = [],
                            i.faceVertexUvs[n][a + 1] = [],
                            r = 0; 4 > r; r++)
                                l = m[o++],
                                E = f[2 * l],
                                l = f[2 * l + 1],
                                E = new THREE.Vector2(E,l),
                                2 !== r && i.faceVertexUvs[n][a].push(E),
                                0 !== r && i.faceVertexUvs[n][a + 1].push(E);
                    if (h && (h = 3 * m[o++],
                    u.normal.set(g[h++], g[h++], g[h]),
                    d.normal.copy(u.normal)),
                    p)
                        for (n = 0; 4 > n; n++)
                            h = 3 * m[o++],
                            p = new THREE.Vector3(g[h++],g[h++],g[h]),
                            2 !== n && u.vertexNormals.push(p),
                            0 !== n && d.vertexNormals.push(p);
                    if (c && (c = m[o++],
                    c = v[c],
                    u.color.setHex(c),
                    d.color.setHex(c)),
                    t)
                        for (n = 0; 4 > n; n++)
                            c = m[o++],
                            c = v[c],
                            2 !== n && u.vertexColors.push(new THREE.Color(c)),
                            0 !== n && d.vertexColors.push(new THREE.Color(c));
                    i.faces.push(u),
                    i.faces.push(d)
                } else {
                    if (u = new THREE.Face3,
                    u.a = m[o++],
                    u.b = m[o++],
                    u.c = m[o++],
                    a && (a = m[o++],
                    u.materialIndex = a),
                    a = i.faces.length,
                    n)
                        for (n = 0; T > n; n++)
                            for (f = e.uvs[n],
                            i.faceVertexUvs[n][a] = [],
                            r = 0; 3 > r; r++)
                                l = m[o++],
                                E = f[2 * l],
                                l = f[2 * l + 1],
                                E = new THREE.Vector2(E,l),
                                i.faceVertexUvs[n][a].push(E);
                    if (h && (h = 3 * m[o++],
                    u.normal.set(g[h++], g[h++], g[h])),
                    p)
                        for (n = 0; 3 > n; n++)
                            h = 3 * m[o++],
                            p = new THREE.Vector3(g[h++],g[h++],g[h]),
                            u.vertexNormals.push(p);
                    if (c && (c = m[o++],
                    u.color.setHex(v[c])),
                    t)
                        for (n = 0; 3 > n; n++)
                            c = m[o++],
                            u.vertexColors.push(new THREE.Color(v[c]));
                    i.faces.push(u)
                }
        }(n),
        function() {
            var t = void 0 !== e.influencesPerVertex ? e.influencesPerVertex : 2;
            if (e.skinWeights)
                for (var n = 0, r = e.skinWeights.length; r > n; n += t)
                    i.skinWeights.push(new THREE.Vector4(e.skinWeights[n],t > 1 ? e.skinWeights[n + 1] : 0,t > 2 ? e.skinWeights[n + 2] : 0,t > 3 ? e.skinWeights[n + 3] : 0));
            if (e.skinIndices)
                for (n = 0,
                r = e.skinIndices.length; r > n; n += t)
                    i.skinIndices.push(new THREE.Vector4(e.skinIndices[n],t > 1 ? e.skinIndices[n + 1] : 0,t > 2 ? e.skinIndices[n + 2] : 0,t > 3 ? e.skinIndices[n + 3] : 0));
            i.bones = e.bones,
            i.bones && 0 < i.bones.length && (i.skinWeights.length !== i.skinIndices.length || i.skinIndices.length !== i.vertices.length) && void 0
        }(),
        function(t) {
            if (void 0 !== e.morphTargets)
                for (var n = 0, r = e.morphTargets.length; r > n; n++) {
                    i.morphTargets[n] = {},
                    i.morphTargets[n].name = e.morphTargets[n].name,
                    i.morphTargets[n].vertices = [];
                    for (var a = i.morphTargets[n].vertices, o = e.morphTargets[n].vertices, s = 0, c = o.length; c > s; s += 3) {
                        var h = new THREE.Vector3;
                        h.x = o[s] * t,
                        h.y = o[s + 1] * t,
                        h.z = o[s + 2] * t,
                        a.push(h)
                    }
                }
            if (void 0 !== e.morphColors && 0 < e.morphColors.length)
                for (t = i.faces,
                a = e.morphColors[0].colors,
                n = 0,
                r = t.length; r > n; n++)
                    t[n].color.fromArray(a, 3 * n)
        }(n),
        function() {
            var t = []
              , n = [];
            void 0 !== e.animation && n.push(e.animation),
            void 0 !== e.animations && (e.animations.length ? n = n.concat(e.animations) : n.push(e.animations));
            for (var r = 0; r < n.length; r++) {
                var a = THREE.AnimationClip.parseAnimation(n[r], i.bones);
                a && t.push(a)
            }
            i.morphTargets && (n = THREE.AnimationClip.CreateClipsFromMorphTargetSequences(i.morphTargets, 10),
            t = t.concat(n)),
            0 < t.length && (i.animations = t)
        }(),
        i.computeFaceNormals(),
        i.computeBoundingSphere(),
        void 0 === e.materials || 0 === e.materials.length ? {
            geometry: i
        } : (n = THREE.Loader.prototype.initMaterials(e.materials, t, this.crossOrigin),
        {
            geometry: i,
            materials: n
        })
    }
},
THREE.LoadingManager = function(e, t, i) {
    var n = this
      , r = !1
      , a = 0
      , o = 0;
    this.onStart = void 0,
    this.onLoad = e,
    this.onProgress = t,
    this.onError = i,
    this.itemStart = function(e) {
        o++,
        !1 === r && void 0 !== n.onStart && n.onStart(e, a, o),
        r = !0
    }
    ,
    this.itemEnd = function(e) {
        a++,
        void 0 !== n.onProgress && n.onProgress(e, a, o),
        a === o && (r = !1,
        void 0 !== n.onLoad) && n.onLoad()
    }
    ,
    this.itemError = function(e) {
        void 0 !== n.onError && n.onError(e)
    }
}
,
THREE.DefaultLoadingManager = new THREE.LoadingManager,
THREE.BufferGeometryLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.BufferGeometryLoader.prototype = {
    constructor: THREE.BufferGeometryLoader,
    load: function(e, t, i, n) {
        var r = this;
        new THREE.XHRLoader(r.manager).load(e, function(e) {
            t(r.parse(JSON.parse(e)))
        }, i, n)
    },
    parse: function(e) {
        var t = new THREE.BufferGeometry
          , i = e.data.index
          , n = {
            Int8Array: Int8Array,
            Uint8Array: Uint8Array,
            Uint8ClampedArray: Uint8ClampedArray,
            Int16Array: Int16Array,
            Uint16Array: Uint16Array,
            Int32Array: Int32Array,
            Uint32Array: Uint32Array,
            Float32Array: Float32Array,
            Float64Array: Float64Array
        };
        void 0 !== i && (i = new n[i.type](i.array),
        t.setIndex(new THREE.BufferAttribute(i,1)));
        var r, a = e.data.attributes;
        for (r in a) {
            var o = a[r]
              , i = new n[o.type](o.array);
            t.addAttribute(r, new THREE.BufferAttribute(i,o.itemSize,o.normalized))
        }
        if (n = e.data.groups || e.data.drawcalls || e.data.offsets,
        void 0 !== n)
            for (r = 0,
            i = n.length; r !== i; ++r)
                a = n[r],
                t.addGroup(a.start, a.count, a.materialIndex);
        return e = e.data.boundingSphere,
        void 0 !== e && (n = new THREE.Vector3,
        void 0 !== e.center && n.fromArray(e.center),
        t.boundingSphere = new THREE.Sphere(n,e.radius)),
        t
    }
},
THREE.MaterialLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this.textures = {}
}
,
THREE.MaterialLoader.prototype = {
    constructor: THREE.MaterialLoader,
    load: function(e, t, i, n) {
        var r = this;
        new THREE.XHRLoader(r.manager).load(e, function(e) {
            t(r.parse(JSON.parse(e)))
        }, i, n)
    },
    setTextures: function(e) {
        this.textures = e
    },
    getTexture: function(e) {
        var t = this.textures;
        return void 0 === t[e] && void 0,
        t[e]
    },
    parse: function(e) {
        var t = new THREE[e.type];
        if (void 0 !== e.uuid && (t.uuid = e.uuid),
        void 0 !== e.name && (t.name = e.name),
        void 0 !== e.color && t.color.setHex(e.color),
        void 0 !== e.roughness && (t.roughness = e.roughness),
        void 0 !== e.metalness && (t.metalness = e.metalness),
        void 0 !== e.emissive && t.emissive.setHex(e.emissive),
        void 0 !== e.specular && t.specular.setHex(e.specular),
        void 0 !== e.shininess && (t.shininess = e.shininess),
        void 0 !== e.uniforms && (t.uniforms = e.uniforms),
        void 0 !== e.vertexShader && (t.vertexShader = e.vertexShader),
        void 0 !== e.fragmentShader && (t.fragmentShader = e.fragmentShader),
        void 0 !== e.vertexColors && (t.vertexColors = e.vertexColors),
        void 0 !== e.shading && (t.shading = e.shading),
        void 0 !== e.blending && (t.blending = e.blending),
        void 0 !== e.side && (t.side = e.side),
        void 0 !== e.opacity && (t.opacity = e.opacity),
        void 0 !== e.transparent && (t.transparent = e.transparent),
        void 0 !== e.alphaTest && (t.alphaTest = e.alphaTest),
        void 0 !== e.depthTest && (t.depthTest = e.depthTest),
        void 0 !== e.depthWrite && (t.depthWrite = e.depthWrite),
        void 0 !== e.colorWrite && (t.colorWrite = e.colorWrite),
        void 0 !== e.wireframe && (t.wireframe = e.wireframe),
        void 0 !== e.wireframeLinewidth && (t.wireframeLinewidth = e.wireframeLinewidth),
        void 0 !== e.size && (t.size = e.size),
        void 0 !== e.sizeAttenuation && (t.sizeAttenuation = e.sizeAttenuation),
        void 0 !== e.map && (t.map = this.getTexture(e.map)),
        void 0 !== e.alphaMap && (t.alphaMap = this.getTexture(e.alphaMap),
        t.transparent = !0),
        void 0 !== e.bumpMap && (t.bumpMap = this.getTexture(e.bumpMap)),
        void 0 !== e.bumpScale && (t.bumpScale = e.bumpScale),
        void 0 !== e.normalMap && (t.normalMap = this.getTexture(e.normalMap)),
        void 0 !== e.normalScale) {
            var i = e.normalScale;
            !1 === Array.isArray(i) && (i = [i, i]),
            t.normalScale = (new THREE.Vector2).fromArray(i);
        }
        if (void 0 !== e.displacementMap && (t.displacementMap = this.getTexture(e.displacementMap)),
        void 0 !== e.displacementScale && (t.displacementScale = e.displacementScale),
        void 0 !== e.displacementBias && (t.displacementBias = e.displacementBias),
        void 0 !== e.roughnessMap && (t.roughnessMap = this.getTexture(e.roughnessMap)),
        void 0 !== e.metalnessMap && (t.metalnessMap = this.getTexture(e.metalnessMap)),
        void 0 !== e.emissiveMap && (t.emissiveMap = this.getTexture(e.emissiveMap)),
        void 0 !== e.emissiveIntensity && (t.emissiveIntensity = e.emissiveIntensity),
        void 0 !== e.specularMap && (t.specularMap = this.getTexture(e.specularMap)),
        void 0 !== e.envMap && (t.envMap = this.getTexture(e.envMap),
        t.combine = THREE.MultiplyOperation),
        e.reflectivity && (t.reflectivity = e.reflectivity),
        void 0 !== e.lightMap && (t.lightMap = this.getTexture(e.lightMap)),
        void 0 !== e.lightMapIntensity && (t.lightMapIntensity = e.lightMapIntensity),
        void 0 !== e.aoMap && (t.aoMap = this.getTexture(e.aoMap)),
        void 0 !== e.aoMapIntensity && (t.aoMapIntensity = e.aoMapIntensity),
        void 0 !== e.materials)
            for (var i = 0, n = e.materials.length; n > i; i++)
                t.materials.push(this.parse(e.materials[i]));
        return t
    }
},
THREE.ObjectLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this.texturePath = ""
}
,
THREE.ObjectLoader.prototype = {
    constructor: THREE.ObjectLoader,
    load: function(e, t, i, n) {
        "" === this.texturePath && (this.texturePath = e.substring(0, e.lastIndexOf("/") + 1));
        var r = this;
        new THREE.XHRLoader(r.manager).load(e, function(e) {
            r.parse(JSON.parse(e), t)
        }, i, n)
    },
    setTexturePath: function(e) {
        this.texturePath = e
    },
    setCrossOrigin: function(e) {
        this.crossOrigin = e
    },
    parse: function(e, t) {
        var i = this.parseGeometries(e.geometries)
          , n = this.parseImages(e.images, function() {
            void 0 !== t && t(r)
        })
          , n = this.parseTextures(e.textures, n)
          , n = this.parseMaterials(e.materials, n)
          , r = this.parseObject(e.object, i, n);
        return e.animations && (r.animations = this.parseAnimations(e.animations)),
        void 0 !== e.images && 0 !== e.images.length || void 0 === t || t(r),
        r
    },
    parseGeometries: function(e) {
        var t = {};
        if (void 0 !== e)
            for (var i = new THREE.JSONLoader, n = new THREE.BufferGeometryLoader, r = 0, a = e.length; a > r; r++) {
                var o, s = e[r];
                switch (s.type) {
                case "PlaneGeometry":
                case "PlaneBufferGeometry":
                    o = new THREE[s.type](s.width,s.height,s.widthSegments,s.heightSegments);
                    break;
                case "BoxGeometry":
                case "BoxBufferGeometry":
                case "CubeGeometry":
                    o = new THREE[s.type](s.width,s.height,s.depth,s.widthSegments,s.heightSegments,s.depthSegments);
                    break;
                case "CircleGeometry":
                case "CircleBufferGeometry":
                    o = new THREE[s.type](s.radius,s.segments,s.thetaStart,s.thetaLength);
                    break;
                case "CylinderGeometry":
                case "CylinderBufferGeometry":
                    o = new THREE[s.type](s.radiusTop,s.radiusBottom,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength);
                    break;
                case "ConeGeometry":
                case "ConeBufferGeometry":
                    o = new THREE[s.type](s.radius,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength);
                    break;
                case "SphereGeometry":
                case "SphereBufferGeometry":
                    o = new THREE[s.type](s.radius,s.widthSegments,s.heightSegments,s.phiStart,s.phiLength,s.thetaStart,s.thetaLength);
                    break;
                case "DodecahedronGeometry":
                case "IcosahedronGeometry":
                case "OctahedronGeometry":
                case "TetrahedronGeometry":
                    o = new THREE[s.type](s.radius,s.detail);
                    break;
                case "RingGeometry":
                case "RingBufferGeometry":
                    o = new THREE[s.type](s.innerRadius,s.outerRadius,s.thetaSegments,s.phiSegments,s.thetaStart,s.thetaLength);
                    break;
                case "TorusGeometry":
                case "TorusBufferGeometry":
                    o = new THREE[s.type](s.radius,s.tube,s.radialSegments,s.tubularSegments,s.arc);
                    break;
                case "TorusKnotGeometry":
                case "TorusKnotBufferGeometry":
                    o = new THREE[s.type](s.radius,s.tube,s.tubularSegments,s.radialSegments,s.p,s.q);
                    break;
                case "LatheGeometry":
                case "LatheBufferGeometry":
                    o = new THREE[s.type](s.points,s.segments,s.phiStart,s.phiLength);
                    break;
                case "BufferGeometry":
                    o = n.parse(s);
                    break;
                case "Geometry":
                    o = i.parse(s.data, this.texturePath).geometry;
                    break;
                default:
                    continue
                }
                o.uuid = s.uuid,
                void 0 !== s.name && (o.name = s.name),
                t[s.uuid] = o
            }
        return t
    },
    parseMaterials: function(e, t) {
        var i = {};
        if (void 0 !== e) {
            var n = new THREE.MaterialLoader;
            n.setTextures(t);
            for (var r = 0, a = e.length; a > r; r++) {
                var o = n.parse(e[r]);
                i[o.uuid] = o
            }
        }
        return i
    },
    parseAnimations: function(e) {
        for (var t = [], i = 0; i < e.length; i++) {
            var n = THREE.AnimationClip.parse(e[i]);
            t.push(n)
        }
        return t
    },
    parseImages: function(e, t) {
        function i(e) {
            return n.manager.itemStart(e),
            o.load(e, function() {
                n.manager.itemEnd(e)
            })
        }
        var n = this
          , r = {};
        if (void 0 !== e && 0 < e.length) {
            var a = new THREE.LoadingManager(t)
              , o = new THREE.ImageLoader(a);
            o.setCrossOrigin(this.crossOrigin);
            for (var a = 0, s = e.length; s > a; a++) {
                var c = e[a]
                  , h = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : n.texturePath + c.url;
                r[c.uuid] = i(h)
            }
        }
        return r
    },
    parseTextures: function(e, t) {
        function i(e) {
            return "number" == typeof e ? e : THREE[e]
        }
        var n = {};
        if (void 0 !== e)
            for (var r = 0, a = e.length; a > r; r++) {
                var o = e[r];
                void 0 === o.image && void 0,
                void 0 === t[o.image] && void 0;
                var s = new THREE.Texture(t[o.image]);
                s.needsUpdate = !0,
                s.uuid = o.uuid,
                void 0 !== o.name && (s.name = o.name),
                void 0 !== o.mapping && (s.mapping = i(o.mapping)),
                void 0 !== o.offset && (s.offset = new THREE.Vector2(o.offset[0],o.offset[1])),
                void 0 !== o.repeat && (s.repeat = new THREE.Vector2(o.repeat[0],o.repeat[1])),
                void 0 !== o.minFilter && (s.minFilter = i(o.minFilter)),
                void 0 !== o.magFilter && (s.magFilter = i(o.magFilter)),
                void 0 !== o.anisotropy && (s.anisotropy = o.anisotropy),
                Array.isArray(o.wrap) && (s.wrapS = i(o.wrap[0]),
                s.wrapT = i(o.wrap[1])),
                n[o.uuid] = s
            }
        return n
    },
    parseObject: function() {
        var e = new THREE.Matrix4;
        return function(t, i, n) {
            function r(e) {
                return void 0 === i[e] && void 0,
                i[e]
            }
            function a(e) {
                return void 0 !== e ? (void 0 === n[e] && void 0,
                n[e]) : void 0
            }
            var o;
            switch (t.type) {
            case "Scene":
                o = new THREE.Scene;
                break;
            case "PerspectiveCamera":
                o = new THREE.PerspectiveCamera(t.fov,t.aspect,t.near,t.far),
                void 0 !== t.focus && (o.focus = t.focus),
                void 0 !== t.zoom && (o.zoom = t.zoom),
                void 0 !== t.filmGauge && (o.filmGauge = t.filmGauge),
                void 0 !== t.filmOffset && (o.filmOffset = t.filmOffset),
                void 0 !== t.view && (o.view = Object.assign({}, t.view));
                break;
            case "OrthographicCamera":
                o = new THREE.OrthographicCamera(t.left,t.right,t.top,t.bottom,t.near,t.far);
                break;
            case "AmbientLight":
                o = new THREE.AmbientLight(t.color,t.intensity);
                break;
            case "DirectionalLight":
                o = new THREE.DirectionalLight(t.color,t.intensity);
                break;
            case "PointLight":
                o = new THREE.PointLight(t.color,t.intensity,t.distance,t.decay);
                break;
            case "SpotLight":
                o = new THREE.SpotLight(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay);
                break;
            case "HemisphereLight":
                o = new THREE.HemisphereLight(t.color,t.groundColor,t.intensity);
                break;
            case "Mesh":
                o = r(t.geometry);
                var s = a(t.material);
                o = o.bones && 0 < o.bones.length ? new THREE.SkinnedMesh(o,s) : new THREE.Mesh(o,s);
                break;
            case "LOD":
                o = new THREE.LOD;
                break;
            case "Line":
                o = new THREE.Line(r(t.geometry),a(t.material),t.mode);
                break;
            case "PointCloud":
            case "Points":
                o = new THREE.Points(r(t.geometry),a(t.material));
                break;
            case "Sprite":
                o = new THREE.Sprite(a(t.material));
                break;
            case "Group":
                o = new THREE.Group;
                break;
            default:
                o = new THREE.Object3D
            }
            if (o.uuid = t.uuid,
            void 0 !== t.name && (o.name = t.name),
            void 0 !== t.matrix ? (e.fromArray(t.matrix),
            e.decompose(o.position, o.quaternion, o.scale)) : (void 0 !== t.position && o.position.fromArray(t.position),
            void 0 !== t.rotation && o.rotation.fromArray(t.rotation),
            void 0 !== t.scale && o.scale.fromArray(t.scale)),
            void 0 !== t.castShadow && (o.castShadow = t.castShadow),
            void 0 !== t.receiveShadow && (o.receiveShadow = t.receiveShadow),
            void 0 !== t.visible && (o.visible = t.visible),
            void 0 !== t.userData && (o.userData = t.userData),
            void 0 !== t.children)
                for (var c in t.children)
                    o.add(this.parseObject(t.children[c], i, n));
            if ("LOD" === t.type)
                for (t = t.levels,
                s = 0; s < t.length; s++) {
                    var h = t[s];
                    c = o.getObjectByProperty("uuid", h.object),
                    void 0 !== c && o.addLevel(c, h.distance)
                }
            return o
        }
    }()
},
THREE.TextureLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    load: function(e, t, i, n) {
        var r = new THREE.Texture
          , a = new THREE.ImageLoader(this.manager);
        return a.setCrossOrigin(this.crossOrigin),
        a.setPath(this.path),
        a.load(e, function(e) {
            r.image = e,
            r.needsUpdate = !0,
            void 0 !== t && t(r)
        }, i, n),
        r
    },
    setCrossOrigin: function(e) {
        this.crossOrigin = e
    },
    setPath: function(e) {
        this.path = e
    }
},
THREE.CubeTextureLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}
,
THREE.CubeTextureLoader.prototype = {
    constructor: THREE.CubeTextureLoader,
    load: function(e, t, i, n) {
        function r(i) {
            o.load(e[i], function(e) {
                a.images[i] = e,
                s++,
                6 === s && (a.needsUpdate = !0,
                t && t(a))
            }, void 0, n)
        }
        var a = new THREE.CubeTexture
          , o = new THREE.ImageLoader(this.manager);
        o.setCrossOrigin(this.crossOrigin),
        o.setPath(this.path);
        var s = 0;
        for (i = 0; i < e.length; ++i)
            r(i);
        return a
    },
    setCrossOrigin: function(e) {
        this.crossOrigin = e
    },
    setPath: function(e) {
        this.path = e
    }
},
THREE.DataTextureLoader = THREE.BinaryTextureLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this._parser = null
}
,
THREE.BinaryTextureLoader.prototype = {
    constructor: THREE.BinaryTextureLoader,
    load: function(e, t, i, n) {
        var r = this
          , a = new THREE.DataTexture
          , o = new THREE.XHRLoader(this.manager);
        return o.setResponseType("arraybuffer"),
        o.load(e, function(e) {
            (e = r._parser(e)) && (void 0 !== e.image ? a.image = e.image : void 0 !== e.data && (a.image.width = e.width,
            a.image.height = e.height,
            a.image.data = e.data),
            a.wrapS = void 0 !== e.wrapS ? e.wrapS : THREE.ClampToEdgeWrapping,
            a.wrapT = void 0 !== e.wrapT ? e.wrapT : THREE.ClampToEdgeWrapping,
            a.magFilter = void 0 !== e.magFilter ? e.magFilter : THREE.LinearFilter,
            a.minFilter = void 0 !== e.minFilter ? e.minFilter : THREE.LinearMipMapLinearFilter,
            a.anisotropy = void 0 !== e.anisotropy ? e.anisotropy : 1,
            void 0 !== e.format && (a.format = e.format),
            void 0 !== e.type && (a.type = e.type),
            void 0 !== e.mipmaps && (a.mipmaps = e.mipmaps),
            1 === e.mipmapCount && (a.minFilter = THREE.LinearFilter),
            a.needsUpdate = !0,
            t && t(a, e))
        }, i, n),
        a
    }
},
THREE.CompressedTextureLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this._parser = null
}
,
THREE.CompressedTextureLoader.prototype = {
    constructor: THREE.CompressedTextureLoader,
    load: function(e, t, i, n) {
        function r(r) {
            c.load(e[r], function(e) {
                e = a._parser(e, !0),
                o[r] = {
                    width: e.width,
                    height: e.height,
                    format: e.format,
                    mipmaps: e.mipmaps
                },
                h += 1,
                6 === h && (1 === e.mipmapCount && (s.minFilter = THREE.LinearFilter),
                s.format = e.format,
                s.needsUpdate = !0,
                t && t(s))
            }, i, n)
        }
        var a = this
          , o = []
          , s = new THREE.CompressedTexture;
        s.image = o;
        var c = new THREE.XHRLoader(this.manager);
        if (c.setPath(this.path),
        c.setResponseType("arraybuffer"),
        Array.isArray(e))
            for (var h = 0, l = 0, u = e.length; u > l; ++l)
                r(l);
        else
            c.load(e, function(e) {
                if (e = a._parser(e, !0),
                e.isCubemap)
                    for (var i = e.mipmaps.length / e.mipmapCount, n = 0; i > n; n++) {
                        o[n] = {
                            mipmaps: []
                        };
                        for (var r = 0; r < e.mipmapCount; r++)
                            o[n].mipmaps.push(e.mipmaps[n * e.mipmapCount + r]),
                            o[n].format = e.format,
                            o[n].width = e.width,
                            o[n].height = e.height
                    }
                else
                    s.image.width = e.width,
                    s.image.height = e.height,
                    s.mipmaps = e.mipmaps;
                1 === e.mipmapCount && (s.minFilter = THREE.LinearFilter),
                s.format = e.format,
                s.needsUpdate = !0,
                t && t(s)
            }, i, n);
        return s
    },
    setPath: function(e) {
        this.path = e
    }
},
THREE.Material = function() {
    Object.defineProperty(this, "id", {
        value: THREE.MaterialIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "Material",
    this.lights = this.fog = !0,
    this.blending = THREE.NormalBlending,
    this.side = THREE.FrontSide,
    this.shading = THREE.SmoothShading,
    this.vertexColors = THREE.NoColors,
    this.opacity = 1,
    this.transparent = !1,
    this.blendSrc = THREE.SrcAlphaFactor,
    this.blendDst = THREE.OneMinusSrcAlphaFactor,
    this.blendEquation = THREE.AddEquation,
    this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null ,
    this.depthFunc = THREE.LessEqualDepth,
    this.depthWrite = this.depthTest = !0,
    this.clippingPlanes = null ,
    this.clipShadows = !1,
    this.colorWrite = !0,
    this.precision = null ,
    this.polygonOffset = !1,
    this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0,
    this.premultipliedAlpha = !1,
    this.overdraw = 0,
    this._needsUpdate = this.visible = !0
}
,
THREE.Material.prototype = {
    constructor: THREE.Material,
    get needsUpdate() {
        return this._needsUpdate
    },
    set needsUpdate(e) {
        !0 === e && this.update(),
        this._needsUpdate = e
    },
    setValues: function(e) {
        if (void 0 !== e)
            for (var t in e) {
                var i = e[t];
                if (void 0 === i)
                    ;
                else {
                    var n = this[t];
                    void 0 === n ? void 0 : n instanceof THREE.Color ? n.set(i) : n instanceof THREE.Vector3 && i instanceof THREE.Vector3 ? n.copy(i) : this[t] = "overdraw" === t ? Number(i) : i
                }
            }
    },
    toJSON: function(e) {
        function t(e) {
            var t, i = [];
            for (t in e) {
                var n = e[t];
                delete n.metadata,
                i.push(n)
            }
            return i
        }
        var i = void 0 === e;
        i && (e = {
            textures: {},
            images: {}
        });
        var n = {
            metadata: {
                version: 4.4,
                type: "Material",
                generator: "Material.toJSON"
            }
        };
        return n.uuid = this.uuid,
        n.type = this.type,
        "" !== this.name && (n.name = this.name),
        this.color instanceof THREE.Color && (n.color = this.color.getHex()),
        .5 !== this.roughness && (n.roughness = this.roughness),
        .5 !== this.metalness && (n.metalness = this.metalness),
        this.emissive instanceof THREE.Color && (n.emissive = this.emissive.getHex()),
        this.specular instanceof THREE.Color && (n.specular = this.specular.getHex()),
        void 0 !== this.shininess && (n.shininess = this.shininess),
        this.map instanceof THREE.Texture && (n.map = this.map.toJSON(e).uuid),
        this.alphaMap instanceof THREE.Texture && (n.alphaMap = this.alphaMap.toJSON(e).uuid),
        this.lightMap instanceof THREE.Texture && (n.lightMap = this.lightMap.toJSON(e).uuid),
        this.bumpMap instanceof THREE.Texture && (n.bumpMap = this.bumpMap.toJSON(e).uuid,
        n.bumpScale = this.bumpScale),
        this.normalMap instanceof THREE.Texture && (n.normalMap = this.normalMap.toJSON(e).uuid,
        n.normalScale = this.normalScale.toArray()),
        this.displacementMap instanceof THREE.Texture && (n.displacementMap = this.displacementMap.toJSON(e).uuid,
        n.displacementScale = this.displacementScale,
        n.displacementBias = this.displacementBias),
        this.roughnessMap instanceof THREE.Texture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid),
        this.metalnessMap instanceof THREE.Texture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid),
        this.emissiveMap instanceof THREE.Texture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid),
        this.specularMap instanceof THREE.Texture && (n.specularMap = this.specularMap.toJSON(e).uuid),
        this.envMap instanceof THREE.Texture && (n.envMap = this.envMap.toJSON(e).uuid,
        n.reflectivity = this.reflectivity),
        void 0 !== this.size && (n.size = this.size),
        void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation),
        this.blending !== THREE.NormalBlending && (n.blending = this.blending),
        this.shading !== THREE.SmoothShading && (n.shading = this.shading),
        this.side !== THREE.FrontSide && (n.side = this.side),
        this.vertexColors !== THREE.NoColors && (n.vertexColors = this.vertexColors),
        1 > this.opacity && (n.opacity = this.opacity),
        !0 === this.transparent && (n.transparent = this.transparent),
        0 < this.alphaTest && (n.alphaTest = this.alphaTest),
        !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha),
        !0 === this.wireframe && (n.wireframe = this.wireframe),
        1 < this.wireframeLinewidth && (n.wireframeLinewidth = this.wireframeLinewidth),
        i && (i = t(e.textures),
        e = t(e.images),
        0 < i.length && (n.textures = i),
        0 < e.length && (n.images = e)),
        n
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        this.name = e.name,
        this.fog = e.fog,
        this.lights = e.lights,
        this.blending = e.blending,
        this.side = e.side,
        this.vertexColors = e.vertexColors,
        this.opacity = e.opacity,
        this.transparent = e.transparent,
        this.blendSrc = e.blendSrc,
        this.blendDst = e.blendDst,
        this.blendEquation = e.blendEquation,
        this.blendSrcAlpha = e.blendSrcAlpha,
        this.blendDstAlpha = e.blendDstAlpha,
        this.blendEquationAlpha = e.blendEquationAlpha,
        this.depthFunc = e.depthFunc,
        this.depthTest = e.depthTest,
        this.depthWrite = e.depthWrite,
        this.colorWrite = e.colorWrite,
        this.precision = e.precision,
        this.polygonOffset = e.polygonOffset,
        this.polygonOffsetFactor = e.polygonOffsetFactor,
        this.polygonOffsetUnits = e.polygonOffsetUnits,
        this.alphaTest = e.alphaTest,
        this.premultipliedAlpha = e.premultipliedAlpha,
        this.overdraw = e.overdraw,
        this.visible = e.visible,
        this.clipShadows = e.clipShadows,
        e = e.clippingPlanes;
        var t = null ;
        if (null !== e)
            for (var i = e.length, t = Array(i), n = 0; n !== i; ++n)
                t[n] = e[n].clone();
        return this.clippingPlanes = t,
        this
    },
    update: function() {
        this.dispatchEvent({
            type: "update"
        })
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
},
Object.assign(THREE.Material.prototype, THREE.EventDispatcher.prototype),
THREE.MaterialIdCount = 0,
THREE.LineBasicMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "LineBasicMaterial",
    this.color = new THREE.Color(16777215),
    this.linewidth = 1,
    this.linejoin = this.linecap = "round",
    this.lights = !1,
    this.setValues(e)
}
,
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial,
THREE.LineBasicMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.linewidth = e.linewidth,
    this.linecap = e.linecap,
    this.linejoin = e.linejoin,
    this
}
,
THREE.LineDashedMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "LineDashedMaterial",
    this.color = new THREE.Color(16777215),
    this.scale = this.linewidth = 1,
    this.dashSize = 3,
    this.gapSize = 1,
    this.lights = !1,
    this.setValues(e)
}
,
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial,
THREE.LineDashedMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.linewidth = e.linewidth,
    this.scale = e.scale,
    this.dashSize = e.dashSize,
    this.gapSize = e.gapSize,
    this
}
,
THREE.MeshBasicMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "MeshBasicMaterial",
    this.color = new THREE.Color(16777215),
    this.aoMap = this.map = null ,
    this.aoMapIntensity = 1,
    this.envMap = this.alphaMap = this.specularMap = null ,
    this.combine = THREE.MultiplyOperation,
    this.reflectivity = 1,
    this.refractionRatio = .98,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinejoin = this.wireframeLinecap = "round",
    this.lights = this.morphTargets = this.skinning = !1,
    this.setValues(e)
}
,
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial,
THREE.MeshBasicMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.map = e.map,
    this.aoMap = e.aoMap,
    this.aoMapIntensity = e.aoMapIntensity,
    this.specularMap = e.specularMap,
    this.alphaMap = e.alphaMap,
    this.envMap = e.envMap,
    this.combine = e.combine,
    this.reflectivity = e.reflectivity,
    this.refractionRatio = e.refractionRatio,
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this.wireframeLinecap = e.wireframeLinecap,
    this.wireframeLinejoin = e.wireframeLinejoin,
    this.skinning = e.skinning,
    this.morphTargets = e.morphTargets,
    this
}
,
THREE.MeshDepthMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "MeshDepthMaterial",
    this.depthPacking = THREE.BasicDepthPacking,
    this.morphTargets = this.skinning = !1,
    this.displacementMap = this.alphaMap = this.map = null ,
    this.displacementScale = 1,
    this.displacementBias = 0,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.lights = this.fog = !1,
    this.setValues(e)
}
,
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial,
THREE.MeshDepthMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.depthPacking = e.depthPacking,
    this.skinning = e.skinning,
    this.morphTargets = e.morphTargets,
    this.map = e.map,
    this.alphaMap = e.alphaMap,
    this.displacementMap = e.displacementMap,
    this.displacementScale = e.displacementScale,
    this.displacementBias = e.displacementBias,
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this
}
,
THREE.MeshLambertMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "MeshLambertMaterial",
    this.color = new THREE.Color(16777215),
    this.lightMap = this.map = null ,
    this.lightMapIntensity = 1,
    this.aoMap = null ,
    this.aoMapIntensity = 1,
    this.emissive = new THREE.Color(0),
    this.emissiveIntensity = 1,
    this.envMap = this.alphaMap = this.specularMap = this.emissiveMap = null ,
    this.combine = THREE.MultiplyOperation,
    this.reflectivity = 1,
    this.refractionRatio = .98,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinejoin = this.wireframeLinecap = "round",
    this.morphNormals = this.morphTargets = this.skinning = !1,
    this.setValues(e)
}
,
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial,
THREE.MeshLambertMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.map = e.map,
    this.lightMap = e.lightMap,
    this.lightMapIntensity = e.lightMapIntensity,
    this.aoMap = e.aoMap,
    this.aoMapIntensity = e.aoMapIntensity,
    this.emissive.copy(e.emissive),
    this.emissiveMap = e.emissiveMap,
    this.emissiveIntensity = e.emissiveIntensity,
    this.specularMap = e.specularMap,
    this.alphaMap = e.alphaMap,
    this.envMap = e.envMap,
    this.combine = e.combine,
    this.reflectivity = e.reflectivity,
    this.refractionRatio = e.refractionRatio,
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this.wireframeLinecap = e.wireframeLinecap,
    this.wireframeLinejoin = e.wireframeLinejoin,
    this.skinning = e.skinning,
    this.morphTargets = e.morphTargets,
    this.morphNormals = e.morphNormals,
    this
}
,
THREE.MeshNormalMaterial = function(e) {
    THREE.Material.call(this, e),
    this.type = "MeshNormalMaterial",
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.morphTargets = this.lights = this.fog = !1,
    this.setValues(e)
}
,
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial,
THREE.MeshNormalMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this
}
,
THREE.MeshPhongMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "MeshPhongMaterial",
    this.color = new THREE.Color(16777215),
    this.specular = new THREE.Color(1118481),
    this.shininess = 30,
    this.lightMap = this.map = null ,
    this.lightMapIntensity = 1,
    this.aoMap = null ,
    this.aoMapIntensity = 1,
    this.emissive = new THREE.Color(0),
    this.emissiveIntensity = 1,
    this.bumpMap = this.emissiveMap = null ,
    this.bumpScale = 1,
    this.normalMap = null ,
    this.normalScale = new THREE.Vector2(1,1),
    this.displacementMap = null ,
    this.displacementScale = 1,
    this.displacementBias = 0,
    this.envMap = this.alphaMap = this.specularMap = null ,
    this.combine = THREE.MultiplyOperation,
    this.reflectivity = 1,
    this.refractionRatio = .98,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinejoin = this.wireframeLinecap = "round",
    this.morphNormals = this.morphTargets = this.skinning = !1,
    this.setValues(e)
}
,
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial,
THREE.MeshPhongMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.specular.copy(e.specular),
    this.shininess = e.shininess,
    this.map = e.map,
    this.lightMap = e.lightMap,
    this.lightMapIntensity = e.lightMapIntensity,
    this.aoMap = e.aoMap,
    this.aoMapIntensity = e.aoMapIntensity,
    this.emissive.copy(e.emissive),
    this.emissiveMap = e.emissiveMap,
    this.emissiveIntensity = e.emissiveIntensity,
    this.bumpMap = e.bumpMap,
    this.bumpScale = e.bumpScale,
    this.normalMap = e.normalMap,
    this.normalScale.copy(e.normalScale),
    this.displacementMap = e.displacementMap,
    this.displacementScale = e.displacementScale,
    this.displacementBias = e.displacementBias,
    this.specularMap = e.specularMap,
    this.alphaMap = e.alphaMap,
    this.envMap = e.envMap,
    this.combine = e.combine,
    this.reflectivity = e.reflectivity,
    this.refractionRatio = e.refractionRatio,
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this.wireframeLinecap = e.wireframeLinecap,
    this.wireframeLinejoin = e.wireframeLinejoin,
    this.skinning = e.skinning,
    this.morphTargets = e.morphTargets,
    this.morphNormals = e.morphNormals,
    this
}
,
THREE.MeshStandardMaterial = function(e) {
    THREE.Material.call(this),
    this.defines = {
        STANDARD: ""
    },
    this.type = "MeshStandardMaterial",
    this.color = new THREE.Color(16777215),
    this.metalness = this.roughness = .5,
    this.lightMap = this.map = null ,
    this.lightMapIntensity = 1,
    this.aoMap = null ,
    this.aoMapIntensity = 1,
    this.emissive = new THREE.Color(0),
    this.emissiveIntensity = 1,
    this.bumpMap = this.emissiveMap = null ,
    this.bumpScale = 1,
    this.normalMap = null ,
    this.normalScale = new THREE.Vector2(1,1),
    this.displacementMap = null ,
    this.displacementScale = 1,
    this.displacementBias = 0,
    this.envMap = this.alphaMap = this.metalnessMap = this.roughnessMap = null ,
    this.envMapIntensity = 1,
    this.refractionRatio = .98,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinejoin = this.wireframeLinecap = "round",
    this.morphNormals = this.morphTargets = this.skinning = !1,
    this.setValues(e)
}
,
THREE.MeshStandardMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshStandardMaterial.prototype.constructor = THREE.MeshStandardMaterial,
THREE.MeshStandardMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.defines = {
        STANDARD: ""
    },
    this.color.copy(e.color),
    this.roughness = e.roughness,
    this.metalness = e.metalness,
    this.map = e.map,
    this.lightMap = e.lightMap,
    this.lightMapIntensity = e.lightMapIntensity,
    this.aoMap = e.aoMap,
    this.aoMapIntensity = e.aoMapIntensity,
    this.emissive.copy(e.emissive),
    this.emissiveMap = e.emissiveMap,
    this.emissiveIntensity = e.emissiveIntensity,
    this.bumpMap = e.bumpMap,
    this.bumpScale = e.bumpScale,
    this.normalMap = e.normalMap,
    this.normalScale.copy(e.normalScale),
    this.displacementMap = e.displacementMap,
    this.displacementScale = e.displacementScale,
    this.displacementBias = e.displacementBias,
    this.roughnessMap = e.roughnessMap,
    this.metalnessMap = e.metalnessMap,
    this.alphaMap = e.alphaMap,
    this.envMap = e.envMap,
    this.envMapIntensity = e.envMapIntensity,
    this.refractionRatio = e.refractionRatio,
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this.wireframeLinecap = e.wireframeLinecap,
    this.wireframeLinejoin = e.wireframeLinejoin,
    this.skinning = e.skinning,
    this.morphTargets = e.morphTargets,
    this.morphNormals = e.morphNormals,
    this
}
,
THREE.MeshPhysicalMaterial = function(e) {
    THREE.MeshStandardMaterial.call(this),
    this.defines = {
        PHYSICAL: ""
    },
    this.type = "MeshPhysicalMaterial",
    this.reflectivity = .5,
    this.setValues(e)
}
,
THREE.MeshPhysicalMaterial.prototype = Object.create(THREE.MeshStandardMaterial.prototype),
THREE.MeshPhysicalMaterial.prototype.constructor = THREE.MeshPhysicalMaterial,
THREE.MeshPhysicalMaterial.prototype.copy = function(e) {
    return THREE.MeshStandardMaterial.prototype.copy.call(this, e),
    this.defines = {
        PHYSICAL: ""
    },
    this.reflectivity = e.reflectivity,
    this
}
,
THREE.MultiMaterial = function(e) {
    this.uuid = THREE.Math.generateUUID(),
    this.type = "MultiMaterial",
    this.materials = e instanceof Array ? e : [],
    this.visible = !0
}
,
THREE.MultiMaterial.prototype = {
    constructor: THREE.MultiMaterial,
    toJSON: function(e) {
        for (var t = {
            metadata: {
                version: 4.2,
                type: "material",
                generator: "MaterialExporter"
            },
            uuid: this.uuid,
            type: this.type,
            materials: []
        }, i = this.materials, n = 0, r = i.length; r > n; n++) {
            var a = i[n].toJSON(e);
            delete a.metadata,
            t.materials.push(a)
        }
        return t.visible = this.visible,
        t
    },
    clone: function() {
        for (var e = new this.constructor, t = 0; t < this.materials.length; t++)
            e.materials.push(this.materials[t].clone());
        return e.visible = this.visible,
        e
    }
},
THREE.PointsMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "PointsMaterial",
    this.color = new THREE.Color(16777215),
    this.map = null ,
    this.size = 1,
    this.sizeAttenuation = !0,
    this.lights = !1,
    this.setValues(e)
}
,
THREE.PointsMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.PointsMaterial.prototype.constructor = THREE.PointsMaterial,
THREE.PointsMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.map = e.map,
    this.size = e.size,
    this.sizeAttenuation = e.sizeAttenuation,
    this
}
,
THREE.ShaderMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "ShaderMaterial",
    this.defines = {},
    this.uniforms = {},
    this.vertexShader = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    this.fragmentShader = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",
    this.linewidth = 1,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.morphNormals = this.morphTargets = this.skinning = this.clipping = this.lights = this.fog = !1,
    this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1
    },
    this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0]
    },
    this.index0AttributeName = void 0,
    void 0 !== e && (void 0 !== e.attributes && void 0,
    this.setValues(e))
}
,
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial,
THREE.ShaderMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.fragmentShader = e.fragmentShader,
    this.vertexShader = e.vertexShader,
    this.uniforms = THREE.UniformsUtils.clone(e.uniforms),
    this.defines = e.defines,
    this.wireframe = e.wireframe,
    this.wireframeLinewidth = e.wireframeLinewidth,
    this.lights = e.lights,
    this.clipping = e.clipping,
    this.skinning = e.skinning,
    this.morphTargets = e.morphTargets,
    this.morphNormals = e.morphNormals,
    this.extensions = e.extensions,
    this
}
,
THREE.ShaderMaterial.prototype.toJSON = function(e) {
    return e = THREE.Material.prototype.toJSON.call(this, e),
    e.uniforms = this.uniforms,
    e.vertexShader = this.vertexShader,
    e.fragmentShader = this.fragmentShader,
    e
}
,
THREE.RawShaderMaterial = function(e) {
    THREE.ShaderMaterial.call(this, e),
    this.type = "RawShaderMaterial"
}
,
THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype),
THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial,
THREE.SpriteMaterial = function(e) {
    THREE.Material.call(this),
    this.type = "SpriteMaterial",
    this.color = new THREE.Color(16777215),
    this.map = null ,
    this.rotation = 0,
    this.lights = this.fog = !1,
    this.setValues(e)
}
,
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial,
THREE.SpriteMaterial.prototype.copy = function(e) {
    return THREE.Material.prototype.copy.call(this, e),
    this.color.copy(e.color),
    this.map = e.map,
    this.rotation = e.rotation,
    this
}
,
THREE.ShadowMaterial = function() {
    THREE.ShaderMaterial.call(this, {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.lights, {
            opacity: {
                value: 1
            }
        }]),
        vertexShader: THREE.ShaderChunk.shadow_vert,
        fragmentShader: THREE.ShaderChunk.shadow_frag
    }),
    this.transparent = this.lights = !0,
    Object.defineProperties(this, {
        opacity: {
            enumerable: !0,
            get: function() {
                return this.uniforms.opacity.value
            },
            set: function(e) {
                this.uniforms.opacity.value = e
            }
        }
    })
}
,
THREE.ShadowMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype),
THREE.ShadowMaterial.prototype.constructor = THREE.ShadowMaterial,
THREE.Texture = function(e, t, i, n, r, a, o, s, c, h) {
    Object.defineProperty(this, "id", {
        value: THREE.TextureIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.sourceFile = this.name = "",
    this.image = void 0 !== e ? e : THREE.Texture.DEFAULT_IMAGE,
    this.mipmaps = [],
    this.mapping = void 0 !== t ? t : THREE.Texture.DEFAULT_MAPPING,
    this.wrapS = void 0 !== i ? i : THREE.ClampToEdgeWrapping,
    this.wrapT = void 0 !== n ? n : THREE.ClampToEdgeWrapping,
    this.magFilter = void 0 !== r ? r : THREE.LinearFilter,
    this.minFilter = void 0 !== a ? a : THREE.LinearMipMapLinearFilter,
    this.anisotropy = void 0 !== c ? c : 1,
    this.format = void 0 !== o ? o : THREE.RGBAFormat,
    this.type = void 0 !== s ? s : THREE.UnsignedByteType,
    this.offset = new THREE.Vector2(0,0),
    this.repeat = new THREE.Vector2(1,1),
    this.generateMipmaps = !0,
    this.premultiplyAlpha = !1,
    this.flipY = !0,
    this.unpackAlignment = 4,
    this.encoding = void 0 !== h ? h : THREE.LinearEncoding,
    this.version = 0,
    this.onUpdate = null
}
,
THREE.Texture.DEFAULT_IMAGE = void 0,
THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping,
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    set needsUpdate(e) {
        !0 === e && this.version++
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.image = e.image,
        this.mipmaps = e.mipmaps.slice(0),
        this.mapping = e.mapping,
        this.wrapS = e.wrapS,
        this.wrapT = e.wrapT,
        this.magFilter = e.magFilter,
        this.minFilter = e.minFilter,
        this.anisotropy = e.anisotropy,
        this.format = e.format,
        this.type = e.type,
        this.offset.copy(e.offset),
        this.repeat.copy(e.repeat),
        this.generateMipmaps = e.generateMipmaps,
        this.premultiplyAlpha = e.premultiplyAlpha,
        this.flipY = e.flipY,
        this.unpackAlignment = e.unpackAlignment,
        this.encoding = e.encoding,
        this
    },
    toJSON: function(e) {
        if (void 0 !== e.textures[this.uuid])
            return e.textures[this.uuid];
        var t = {
            metadata: {
                version: 4.4,
                type: "Texture",
                generator: "Texture.toJSON"
            },
            uuid: this.uuid,
            name: this.name,
            mapping: this.mapping,
            repeat: [this.repeat.x, this.repeat.y],
            offset: [this.offset.x, this.offset.y],
            wrap: [this.wrapS, this.wrapT],
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy
        };
        if (void 0 !== this.image) {
            var i = this.image;
            if (void 0 === i.uuid && (i.uuid = THREE.Math.generateUUID()),
            void 0 === e.images[i.uuid]) {
                var n, r = e.images, a = i.uuid, o = i.uuid;
                void 0 !== i.toDataURL ? n = i : (n = document.createElement("canvas"),
                n.width = i.width,
                n.height = i.height,
                n.getContext("2d").drawImage(i, 0, 0, i.width, i.height)),
                n = 2048 < n.width || 2048 < n.height ? n.toDataURL("image/jpeg", .6) : n.toDataURL("image/png"),
                r[a] = {
                    uuid: o,
                    url: n
                }
            }
            t.image = i.uuid
        }
        return e.textures[this.uuid] = t
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    },
    transformUv: function(e) {
        if (this.mapping === THREE.UVMapping) {
            if (e.multiply(this.repeat),
            e.add(this.offset),
            0 > e.x || 1 < e.x)
                switch (this.wrapS) {
                case THREE.RepeatWrapping:
                    e.x -= Math.floor(e.x);
                    break;
                case THREE.ClampToEdgeWrapping:
                    e.x = 0 > e.x ? 0 : 1;
                    break;
                case THREE.MirroredRepeatWrapping:
                    1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x -= Math.floor(e.x)
                }
            if (0 > e.y || 1 < e.y)
                switch (this.wrapT) {
                case THREE.RepeatWrapping:
                    e.y -= Math.floor(e.y);
                    break;
                case THREE.ClampToEdgeWrapping:
                    e.y = 0 > e.y ? 0 : 1;
                    break;
                case THREE.MirroredRepeatWrapping:
                    1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y -= Math.floor(e.y)
                }
            this.flipY && (e.y = 1 - e.y)
        }
    }
},
Object.assign(THREE.Texture.prototype, THREE.EventDispatcher.prototype),
THREE.TextureIdCount = 0,
THREE.DepthTexture = function(e, t, i, n, r, a, o, s, c) {
    THREE.Texture.call(this, null , n, r, a, o, s, THREE.DepthFormat, i, c),
    this.image = {
        width: e,
        height: t
    },
    this.type = void 0 !== i ? i : THREE.UnsignedShortType,
    this.magFilter = void 0 !== o ? o : THREE.NearestFilter,
    this.minFilter = void 0 !== s ? s : THREE.NearestFilter,
    this.generateMipmaps = this.flipY = !1
}
,
THREE.DepthTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.DepthTexture.prototype.constructor = THREE.DepthTexture,
THREE.CanvasTexture = function(e, t, i, n, r, a, o, s, c) {
    THREE.Texture.call(this, e, t, i, n, r, a, o, s, c),
    this.needsUpdate = !0
}
,
THREE.CanvasTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.CanvasTexture.prototype.constructor = THREE.CanvasTexture,
THREE.CubeTexture = function(e, t, i, n, r, a, o, s, c, h) {
    e = void 0 !== e ? e : [],
    t = void 0 !== t ? t : THREE.CubeReflectionMapping,
    THREE.Texture.call(this, e, t, i, n, r, a, o, s, c, h),
    this.flipY = !1
}
,
THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.CubeTexture.prototype.constructor = THREE.CubeTexture,
Object.defineProperty(THREE.CubeTexture.prototype, "images", {
    get: function() {
        return this.image
    },
    set: function(e) {
        this.image = e
    }
}),
THREE.CompressedTexture = function(e, t, i, n, r, a, o, s, c, h, l, u) {
    THREE.Texture.call(this, null , a, o, s, c, h, n, r, l, u),
    this.image = {
        width: t,
        height: i
    },
    this.mipmaps = e,
    this.generateMipmaps = this.flipY = !1
}
,
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture,
THREE.DataTexture = function(e, t, i, n, r, a, o, s, c, h, l, u) {
    THREE.Texture.call(this, null , a, o, s, c, h, n, r, l, u),
    this.image = {
        data: e,
        width: t,
        height: i
    },
    this.magFilter = void 0 !== c ? c : THREE.NearestFilter,
    this.minFilter = void 0 !== h ? h : THREE.NearestFilter,
    this.generateMipmaps = this.flipY = !1
}
,
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.DataTexture.prototype.constructor = THREE.DataTexture,
THREE.VideoTexture = function(e, t, i, n, r, a, o, s, c) {
    function h() {
        requestAnimationFrame(h),
        e.readyState >= e.HAVE_CURRENT_DATA && (l.needsUpdate = !0)
    }
    THREE.Texture.call(this, e, t, i, n, r, a, o, s, c),
    this.generateMipmaps = !1;
    var l = this;
    h()
}
,
THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.VideoTexture.prototype.constructor = THREE.VideoTexture,
THREE.Group = function() {
    THREE.Object3D.call(this),
    this.type = "Group"
}
,
THREE.Group.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Group
}),
THREE.Points = function(e, t) {
    THREE.Object3D.call(this),
    this.type = "Points",
    this.geometry = void 0 !== e ? e : new THREE.BufferGeometry,
    this.material = void 0 !== t ? t : new THREE.PointsMaterial({
        color: 16777215 * Math.random()
    })
}
,
THREE.Points.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Points,
    raycast: function() {
        var e = new THREE.Matrix4
          , t = new THREE.Ray
          , i = new THREE.Sphere;
        return function(n, r) {
            function a(e, i) {
                var a = t.distanceSqToPoint(e);
                if (l > a) {
                    var s = t.closestPointToPoint(e);
                    s.applyMatrix4(c);
                    var h = n.ray.origin.distanceTo(s);
                    h < n.near || h > n.far || r.push({
                        distance: h,
                        distanceToRay: Math.sqrt(a),
                        point: s.clone(),
                        index: i,
                        face: null ,
                        object: o
                    })
                }
            }
            var o = this
              , s = this.geometry
              , c = this.matrixWorld
              , h = n.params.Points.threshold;
            if (null === s.boundingSphere && s.computeBoundingSphere(),
            i.copy(s.boundingSphere),
            i.applyMatrix4(c),
            !1 !== n.ray.intersectsSphere(i)) {
                e.getInverse(c),
                t.copy(n.ray).applyMatrix4(e);
                var h = h / ((this.scale.x + this.scale.y + this.scale.z) / 3)
                  , l = h * h
                  , h = new THREE.Vector3;
                if (s instanceof THREE.BufferGeometry) {
                    var u = s.index
                      , s = s.attributes.position.array;
                    if (null !== u)
                        for (var p = u.array, u = 0, d = p.length; d > u; u++) {
                            var f = p[u];
                            h.fromArray(s, 3 * f),
                            a(h, f)
                        }
                    else
                        for (u = 0,
                        p = s.length / 3; p > u; u++)
                            h.fromArray(s, 3 * u),
                            a(h, u)
                } else
                    for (h = s.vertices,
                    u = 0,
                    p = h.length; p > u; u++)
                        a(h[u], u)
            }
        }
    }(),
    clone: function() {
        return new this.constructor(this.geometry,this.material).copy(this)
    }
}),
THREE.Line = function(e, t, i) {
    return 1 === i ? new THREE.LineSegments(e,t) : (THREE.Object3D.call(this),
    this.type = "Line",
    this.geometry = void 0 !== e ? e : new THREE.BufferGeometry,
    void (this.material = void 0 !== t ? t : new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    })))
}
,
THREE.Line.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Line,
    raycast: function() {
        var e = new THREE.Matrix4
          , t = new THREE.Ray
          , i = new THREE.Sphere;
        return function(n, r) {
            var a = n.linePrecision
              , a = a * a
              , o = this.geometry
              , s = this.matrixWorld;
            if (null === o.boundingSphere && o.computeBoundingSphere(),
            i.copy(o.boundingSphere),
            i.applyMatrix4(s),
            !1 !== n.ray.intersectsSphere(i)) {
                e.getInverse(s),
                t.copy(n.ray).applyMatrix4(e);
                var c = new THREE.Vector3
                  , h = new THREE.Vector3
                  , s = new THREE.Vector3
                  , l = new THREE.Vector3
                  , u = this instanceof THREE.LineSegments ? 2 : 1;
                if (o instanceof THREE.BufferGeometry) {
                    var p = o.index
                      , d = o.attributes.position.array;
                    if (null !== p)
                        for (var p = p.array, o = 0, f = p.length - 1; f > o; o += u) {
                            var E = p[o + 1];
                            c.fromArray(d, 3 * p[o]),
                            h.fromArray(d, 3 * E),
                            E = t.distanceSqToSegment(c, h, l, s),
                            E > a || (l.applyMatrix4(this.matrixWorld),
                            E = n.ray.origin.distanceTo(l),
                            E < n.near || E > n.far || r.push({
                                distance: E,
                                point: s.clone().applyMatrix4(this.matrixWorld),
                                index: o,
                                face: null ,
                                faceIndex: null ,
                                object: this
                            }))
                        }
                    else
                        for (o = 0,
                        f = d.length / 3 - 1; f > o; o += u)
                            c.fromArray(d, 3 * o),
                            h.fromArray(d, 3 * o + 3),
                            E = t.distanceSqToSegment(c, h, l, s),
                            E > a || (l.applyMatrix4(this.matrixWorld),
                            E = n.ray.origin.distanceTo(l),
                            E < n.near || E > n.far || r.push({
                                distance: E,
                                point: s.clone().applyMatrix4(this.matrixWorld),
                                index: o,
                                face: null ,
                                faceIndex: null ,
                                object: this
                            }))
                } else if (o instanceof THREE.Geometry)
                    for (c = o.vertices,
                    h = c.length,
                    o = 0; h - 1 > o; o += u)
                        E = t.distanceSqToSegment(c[o], c[o + 1], l, s),
                        E > a || (l.applyMatrix4(this.matrixWorld),
                        E = n.ray.origin.distanceTo(l),
                        E < n.near || E > n.far || r.push({
                            distance: E,
                            point: s.clone().applyMatrix4(this.matrixWorld),
                            index: o,
                            face: null ,
                            faceIndex: null ,
                            object: this
                        }))
            }
        }
    }(),
    clone: function() {
        return new this.constructor(this.geometry,this.material).copy(this)
    }
}),
THREE.LineSegments = function(e, t) {
    THREE.Line.call(this, e, t),
    this.type = "LineSegments"
}
,
THREE.LineSegments.prototype = Object.assign(Object.create(THREE.Line.prototype), {
    constructor: THREE.LineSegments
}),
THREE.Mesh = function(e, t) {
    THREE.Object3D.call(this),
    this.type = "Mesh",
    this.geometry = void 0 !== e ? e : new THREE.BufferGeometry,
    this.material = void 0 !== t ? t : new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random()
    }),
    this.drawMode = THREE.TrianglesDrawMode,
    this.updateMorphTargets()
}
,
THREE.Mesh.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Mesh,
    setDrawMode: function(e) {
        this.drawMode = e
    },
    updateMorphTargets: function() {
        if (void 0 !== this.geometry.morphTargets && 0 < this.geometry.morphTargets.length) {
            this.morphTargetBase = -1,
            this.morphTargetInfluences = [],
            this.morphTargetDictionary = {};
            for (var e = 0, t = this.geometry.morphTargets.length; t > e; e++)
                this.morphTargetInfluences.push(0),
                this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
        }
    },
    getMorphTargetIndexByName: function(e) {
        return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : 0
    },
    raycast: function() {
        function e(e, t, i, n, r, a, o) {
            return THREE.Triangle.barycoordFromPoint(e, t, i, n, E),
            r.multiplyScalar(E.x),
            a.multiplyScalar(E.y),
            o.multiplyScalar(E.z),
            r.add(a).add(o),
            r.clone()
        }
        function t(e, t, i, n, r, a, o) {
            var s = e.material;
            return null === (s.side === THREE.BackSide ? i.intersectTriangle(a, r, n, !0, o) : i.intersectTriangle(n, r, a, s.side !== THREE.DoubleSide, o)) ? null : (g.copy(o),
            g.applyMatrix4(e.matrixWorld),
            i = t.ray.origin.distanceTo(g),
            i < t.near || i > t.far ? null : {
                distance: i,
                point: g.clone(),
                object: e
            })
        }
        function i(i, n, r, a, h, l, u, E) {
            return o.fromArray(a, 3 * l),
            s.fromArray(a, 3 * u),
            c.fromArray(a, 3 * E),
            (i = t(i, n, r, o, s, c, m)) && (h && (p.fromArray(h, 2 * l),
            d.fromArray(h, 2 * u),
            f.fromArray(h, 2 * E),
            i.uv = e(m, o, s, c, p, d, f)),
            i.face = new THREE.Face3(l,u,E,THREE.Triangle.normal(o, s, c)),
            i.faceIndex = l),
            i
        }
        var n = new THREE.Matrix4
          , r = new THREE.Ray
          , a = new THREE.Sphere
          , o = new THREE.Vector3
          , s = new THREE.Vector3
          , c = new THREE.Vector3
          , h = new THREE.Vector3
          , l = new THREE.Vector3
          , u = new THREE.Vector3
          , p = new THREE.Vector2
          , d = new THREE.Vector2
          , f = new THREE.Vector2
          , E = new THREE.Vector3
          , m = new THREE.Vector3
          , g = new THREE.Vector3;
        return function(E, g) {
            var v = this.geometry
              , T = this.material
              , y = this.matrixWorld;
            if (void 0 !== T && (null === v.boundingSphere && v.computeBoundingSphere(),
            a.copy(v.boundingSphere),
            a.applyMatrix4(y),
            !1 !== E.ray.intersectsSphere(a) && (n.getInverse(y),
            r.copy(E.ray).applyMatrix4(n),
            null === v.boundingBox || !1 !== r.intersectsBox(v.boundingBox)))) {
                var R, x;
                if (v instanceof THREE.BufferGeometry) {
                    var H, b, T = v.index, y = v.attributes, v = y.position.array;
                    if (void 0 !== y.uv && (R = y.uv.array),
                    null !== T)
                        for (var y = T.array, M = 0, _ = y.length; _ > M; M += 3)
                            T = y[M],
                            H = y[M + 1],
                            b = y[M + 2],
                            (x = i(this, E, r, v, R, T, H, b)) && (x.faceIndex = Math.floor(M / 3),
                            g.push(x));
                    else
                        for (M = 0,
                        _ = v.length; _ > M; M += 9)
                            T = M / 3,
                            H = T + 1,
                            b = T + 2,
                            (x = i(this, E, r, v, R, T, H, b)) && (x.index = T,
                            g.push(x))
                } else if (v instanceof THREE.Geometry) {
                    var w, S, y = T instanceof THREE.MultiMaterial, M = !0 === y ? T.materials : null , _ = v.vertices;
                    H = v.faces,
                    b = v.faceVertexUvs[0],
                    0 < b.length && (R = b);
                    for (var A = 0, L = H.length; L > A; A++) {
                        var C = H[A];
                        if (x = !0 === y ? M[C.materialIndex] : T,
                        void 0 !== x) {
                            if (b = _[C.a],
                            w = _[C.b],
                            S = _[C.c],
                            !0 === x.morphTargets) {
                                x = v.morphTargets;
                                var P = this.morphTargetInfluences;
                                o.set(0, 0, 0),
                                s.set(0, 0, 0),
                                c.set(0, 0, 0);
                                for (var I = 0, B = x.length; B > I; I++) {
                                    var D = P[I];
                                    if (0 !== D) {
                                        var F = x[I].vertices;
                                        o.addScaledVector(h.subVectors(F[C.a], b), D),
                                        s.addScaledVector(l.subVectors(F[C.b], w), D),
                                        c.addScaledVector(u.subVectors(F[C.c], S), D)
                                    }
                                }
                                o.add(b),
                                s.add(w),
                                c.add(S),
                                b = o,
                                w = s,
                                S = c
                            }
                            (x = t(this, E, r, b, w, S, m)) && (R && (P = R[A],
                            p.copy(P[0]),
                            d.copy(P[1]),
                            f.copy(P[2]),
                            x.uv = e(m, b, w, S, p, d, f)),
                            x.face = C,
                            x.faceIndex = A,
                            g.push(x))
                        }
                    }
                }
            }
        }
    }(),
    clone: function() {
        return new this.constructor(this.geometry,this.material).copy(this)
    }
}),
THREE.Bone = function(e) {
    THREE.Object3D.call(this),
    this.type = "Bone",
    this.skin = e
}
,
THREE.Bone.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Bone,
    copy: function(e) {
        return THREE.Object3D.prototype.copy.call(this, e),
        this.skin = e.skin,
        this
    }
}),
THREE.Skeleton = function(e, t, i) {
    if (this.useVertexTexture = void 0 !== i ? i : !0,
    this.identityMatrix = new THREE.Matrix4,
    e = e || [],
    this.bones = e.slice(0),
    this.useVertexTexture ? (e = Math.sqrt(4 * this.bones.length),
    e = THREE.Math.nextPowerOfTwo(Math.ceil(e)),
    this.boneTextureHeight = this.boneTextureWidth = e = Math.max(e, 4),
    this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4),
    this.boneTexture = new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType)) : this.boneMatrices = new Float32Array(16 * this.bones.length),
    void 0 === t)
        this.calculateInverses();
    else if (this.bones.length === t.length)
        this.boneInverses = t.slice(0);
    else
        for (this.boneInverses = [],
        t = 0,
        e = this.bones.length; e > t; t++)
            this.boneInverses.push(new THREE.Matrix4)
}
,
Object.assign(THREE.Skeleton.prototype, {
    calculateInverses: function() {
        this.boneInverses = [];
        for (var e = 0, t = this.bones.length; t > e; e++) {
            var i = new THREE.Matrix4;
            this.bones[e] && i.getInverse(this.bones[e].matrixWorld),
            this.boneInverses.push(i)
        }
    },
    pose: function() {
        for (var e, t = 0, i = this.bones.length; i > t; t++)
            (e = this.bones[t]) && e.matrixWorld.getInverse(this.boneInverses[t]);
        for (t = 0,
        i = this.bones.length; i > t; t++)
            (e = this.bones[t]) && (e.parent ? (e.matrix.getInverse(e.parent.matrixWorld),
            e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld),
            e.matrix.decompose(e.position, e.quaternion, e.scale))
    },
    update: function() {
        var e = new THREE.Matrix4;
        return function() {
            for (var t = 0, i = this.bones.length; i > t; t++)
                e.multiplyMatrices(this.bones[t] ? this.bones[t].matrixWorld : this.identityMatrix, this.boneInverses[t]),
                e.toArray(this.boneMatrices, 16 * t);
            this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
        }
    }(),
    clone: function() {
        return new THREE.Skeleton(this.bones,this.boneInverses,this.useVertexTexture)
    }
}),
THREE.SkinnedMesh = function(e, t, i) {
    if (THREE.Mesh.call(this, e, t),
    this.type = "SkinnedMesh",
    this.bindMode = "attached",
    this.bindMatrix = new THREE.Matrix4,
    this.bindMatrixInverse = new THREE.Matrix4,
    e = [],
    this.geometry && void 0 !== this.geometry.bones) {
        for (var n, r = 0, a = this.geometry.bones.length; a > r; ++r)
            n = this.geometry.bones[r],
            t = new THREE.Bone(this),
            e.push(t),
            t.name = n.name,
            t.position.fromArray(n.pos),
            t.quaternion.fromArray(n.rotq),
            void 0 !== n.scl && t.scale.fromArray(n.scl);
        for (r = 0,
        a = this.geometry.bones.length; a > r; ++r)
            n = this.geometry.bones[r],
            -1 !== n.parent && null !== n.parent && void 0 !== e[n.parent] ? e[n.parent].add(e[r]) : this.add(e[r])
    }
    this.normalizeSkinWeights(),
    this.updateMatrixWorld(!0),
    this.bind(new THREE.Skeleton(e,void 0,i), this.matrixWorld)
}
,
THREE.SkinnedMesh.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: THREE.SkinnedMesh,
    bind: function(e, t) {
        this.skeleton = e,
        void 0 === t && (this.updateMatrixWorld(!0),
        this.skeleton.calculateInverses(),
        t = this.matrixWorld),
        this.bindMatrix.copy(t),
        this.bindMatrixInverse.getInverse(t)
    },
    pose: function() {
        this.skeleton.pose()
    },
    normalizeSkinWeights: function() {
        if (this.geometry instanceof THREE.Geometry)
            for (var e = 0; e < this.geometry.skinWeights.length; e++) {
                var t = this.geometry.skinWeights[e]
                  , i = 1 / t.lengthManhattan();
                1 / 0 !== i ? t.multiplyScalar(i) : t.set(1, 0, 0, 0)
            }
        else if (this.geometry instanceof THREE.BufferGeometry)
            for (var t = new THREE.Vector4, n = this.geometry.attributes.skinWeight, e = 0; e < n.count; e++)
                t.x = n.getX(e),
                t.y = n.getY(e),
                t.z = n.getZ(e),
                t.w = n.getW(e),
                i = 1 / t.lengthManhattan(),
                1 / 0 !== i ? t.multiplyScalar(i) : t.set(1, 0, 0, 0),
                n.setXYZW(e, t.x, t.y, t.z, t.w)
    },
    updateMatrixWorld: function(e) {
        THREE.Mesh.prototype.updateMatrixWorld.call(this, !0),
        "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : void 0
    },
    clone: function() {
        return new this.constructor(this.geometry,this.material,this.useVertexTexture).copy(this)
    }
}),
THREE.LOD = function() {
    THREE.Object3D.call(this),
    this.type = "LOD",
    Object.defineProperties(this, {
        levels: {
            enumerable: !0,
            value: []
        }
    })
}
,
THREE.LOD.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.LOD,
    copy: function(e) {
        THREE.Object3D.prototype.copy.call(this, e, !1),
        e = e.levels;
        for (var t = 0, i = e.length; i > t; t++) {
            var n = e[t];
            this.addLevel(n.object.clone(), n.distance)
        }
        return this
    },
    addLevel: function(e, t) {
        void 0 === t && (t = 0),
        t = Math.abs(t);
        for (var i = this.levels, n = 0; n < i.length && !(t < i[n].distance); n++)
            ;
        i.splice(n, 0, {
            distance: t,
            object: e
        }),
        this.add(e)
    },
    getObjectForDistance: function(e) {
        for (var t = this.levels, i = 1, n = t.length; n > i && !(e < t[i].distance); i++)
            ;
        return t[i - 1].object
    },
    raycast: function() {
        var e = new THREE.Vector3;
        return function(t, i) {
            e.setFromMatrixPosition(this.matrixWorld);
            var n = t.ray.origin.distanceTo(e);
            this.getObjectForDistance(n).raycast(t, i)
        }
    }(),
    update: function() {
        var e = new THREE.Vector3
          , t = new THREE.Vector3;
        return function(i) {
            var n = this.levels;
            if (1 < n.length) {
                e.setFromMatrixPosition(i.matrixWorld),
                t.setFromMatrixPosition(this.matrixWorld),
                i = e.distanceTo(t),
                n[0].object.visible = !0;
                for (var r = 1, a = n.length; a > r && i >= n[r].distance; r++)
                    n[r - 1].object.visible = !1,
                    n[r].object.visible = !0;
                for (; a > r; r++)
                    n[r].object.visible = !1
            }
        }
    }(),
    toJSON: function(e) {
        e = THREE.Object3D.prototype.toJSON.call(this, e),
        e.object.levels = [];
        for (var t = this.levels, i = 0, n = t.length; n > i; i++) {
            var r = t[i];
            e.object.levels.push({
                object: r.object.uuid,
                distance: r.distance
            })
        }
        return e
    }
}),
THREE.Sprite = function(e) {
    THREE.Object3D.call(this),
    this.type = "Sprite",
    this.material = void 0 !== e ? e : new THREE.SpriteMaterial
}
,
THREE.Sprite.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.Sprite,
    raycast: function() {
        var e = new THREE.Vector3;
        return function(t, i) {
            e.setFromMatrixPosition(this.matrixWorld);
            var n = t.ray.distanceSqToPoint(e);
            n > this.scale.x * this.scale.y / 4 || i.push({
                distance: Math.sqrt(n),
                point: this.position,
                face: null ,
                object: this
            })
        }
    }(),
    clone: function() {
        return new this.constructor(this.material).copy(this)
    }
}),
THREE.LensFlare = function(e, t, i, n, r) {
    THREE.Object3D.call(this),
    this.lensFlares = [],
    this.positionScreen = new THREE.Vector3,
    this.customUpdateCallback = void 0,
    void 0 !== e && this.add(e, t, i, n, r)
}
,
THREE.LensFlare.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: THREE.LensFlare,
    copy: function(e) {
        THREE.Object3D.prototype.copy.call(this, e),
        this.positionScreen.copy(e.positionScreen),
        this.customUpdateCallback = e.customUpdateCallback;
        for (var t = 0, i = e.lensFlares.length; i > t; t++)
            this.lensFlares.push(e.lensFlares[t]);
        return this
    },
    add: function(e, t, i, n, r, a) {
        void 0 === t && (t = -1),
        void 0 === i && (i = 0),
        void 0 === a && (a = 1),
        void 0 === r && (r = new THREE.Color(16777215)),
        void 0 === n && (n = THREE.NormalBlending),
        i = Math.min(i, Math.max(0, i)),
        this.lensFlares.push({
            texture: e,
            size: t,
            distance: i,
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            rotation: 0,
            opacity: a,
            color: r,
            blending: n
        })
    },
    updateLensFlares: function() {
        var e, t, i = this.lensFlares.length, n = 2 * -this.positionScreen.x, r = 2 * -this.positionScreen.y;
        for (e = 0; i > e; e++)
            t = this.lensFlares[e],
            t.x = this.positionScreen.x + n * t.distance,
            t.y = this.positionScreen.y + r * t.distance,
            t.wantedRotation = t.x * Math.PI * .25,
            t.rotation += .25 * (t.wantedRotation - t.rotation)
    }
}),
THREE.Scene = function() {
    THREE.Object3D.call(this),
    this.type = "Scene",
    this.overrideMaterial = this.fog = null ,
    this.autoUpdate = !0
}
,
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype),
THREE.Scene.prototype.constructor = THREE.Scene,
THREE.Scene.prototype.copy = function(e, t) {
    return THREE.Object3D.prototype.copy.call(this, e, t),
    null !== e.fog && (this.fog = e.fog.clone()),
    null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()),
    this.autoUpdate = e.autoUpdate,
    this.matrixAutoUpdate = e.matrixAutoUpdate,
    this
}
,
THREE.Fog = function(e, t, i) {
    this.name = "",
    this.color = new THREE.Color(e),
    this.near = void 0 !== t ? t : 1,
    this.far = void 0 !== i ? i : 1e3
}
,
THREE.Fog.prototype.clone = function() {
    return new THREE.Fog(this.color.getHex(),this.near,this.far)
}
,
THREE.FogExp2 = function(e, t) {
    this.name = "",
    this.color = new THREE.Color(e),
    this.density = void 0 !== t ? t : 25e-5
}
,
THREE.FogExp2.prototype.clone = function() {
    return new THREE.FogExp2(this.color.getHex(),this.density)
}
,
THREE.ShaderChunk = {},
THREE.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
THREE.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif\n",
THREE.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n	if ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
THREE.ShaderChunk.aomap_fragment = "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n	#endif\n#endif\n",
THREE.ShaderChunk.aomap_pars_fragment = "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
THREE.ShaderChunk.begin_vertex = "\nvec3 transformed = vec3( position );\n",
THREE.ShaderChunk.beginnormal_vertex = "\nvec3 objectNormal = vec3( normal );\n",
THREE.ShaderChunk.bsdfs = "bool testLightInRange( const in float lightDistance, const in float cutoffDistance ) {\n	return any( bvec2( cutoffDistance == 0.0, lightDistance < cutoffDistance ) );\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n		if( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n			float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n			float maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n			return distanceFalloff * maxDistanceCutoffFactor;\n#else\n			return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n		}\n		return 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n	return ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	return 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n	float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n	float dotNH = saturate( dot( geometry.normal, halfDir ) );\n	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n	vec3 F = F_Schlick( specularColor, dotLH );\n	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n	float D = D_GGX( alpha, dotNH );\n	return F * ( G * D );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n	vec4 r = roughness * c0 + c1;\n	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n	vec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n	return specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n	float dotNH = saturate( dot( geometry.normal, halfDir ) );\n	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n	vec3 F = F_Schlick( specularColor, dotLH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
THREE.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 );\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif\n",
THREE.ShaderChunk.clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n	for ( int i = 0; i < NUM_CLIPPING_PLANES; ++ i ) {\n		vec4 plane = clippingPlanes[ i ];\n		if ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n	}\n#endif\n",
THREE.ShaderChunk.clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n	#if ! defined( PHYSICAL ) && ! defined( PHONG )\n		varying vec3 vViewPosition;\n	#endif\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
THREE.ShaderChunk.clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n	varying vec3 vViewPosition;\n#endif\n",
THREE.ShaderChunk.clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n	vViewPosition = - mvPosition.xyz;\n#endif\n",
THREE.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n	diffuseColor.rgb *= vColor;\n#endif",
THREE.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n	varying vec3 vColor;\n#endif\n",
THREE.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n	varying vec3 vColor;\n#endif",
THREE.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n	vColor.xyz = color.xyz;\n#endif",
THREE.ShaderChunk.common = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract(sin(sn) * c);\n}\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\nstruct GeometricContext {\n	vec3 position;\n	vec3 normal;\n	vec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	float distance = dot( planeNormal, point - pointOnPlane );\n	return - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\n",
THREE.ShaderChunk.cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n	vec3 absDirection = abs(direction);\n	int face = -1;\n	if( absDirection.x > absDirection.z ) {\n		if(absDirection.x > absDirection.y )\n			face = direction.x > 0.0 ? 0 : 3;\n		else\n			face = direction.y > 0.0 ? 1 : 4;\n	}\n	else {\n		if(absDirection.z > absDirection.y )\n			face = direction.z > 0.0 ? 2 : 5;\n		else\n			face = direction.y > 0.0 ? 1 : 4;\n	}\n	return face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n	float scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n	float dxRoughness = dFdx(roughness);\n	float dyRoughness = dFdy(roughness);\n	vec3 dx = dFdx( vec * scale * dxRoughness );\n	vec3 dy = dFdy( vec * scale * dyRoughness );\n	float d = max( dot( dx, dx ), dot( dy, dy ) );\n	d = clamp(d, 1.0, cubeUV_rangeClamp);\n	float mipLevel = 0.5 * log2(d);\n	return vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n	mipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n	float a = 16.0 * cubeUV_rcpTextureSize;\n	vec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n	vec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n	float powScale = exp2_packed.x * exp2_packed.y;\n	float scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n	float mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n	bool bRes = mipLevel == 0.0;\n	scale =  bRes && (scale < a) ? a : scale;\n	vec3 r;\n	vec2 offset;\n	int face = getFaceFromDirection(direction);\n	float rcpPowScale = 1.0 / powScale;\n	if( face == 0) {\n		r = vec3(direction.x, -direction.z, direction.y);\n		offset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n		offset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n	}\n	else if( face == 1) {\n		r = vec3(direction.y, direction.x, direction.z);\n		offset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n		offset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n	}\n	else if( face == 2) {\n		r = vec3(direction.z, direction.x, direction.y);\n		offset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n		offset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n	}\n	else if( face == 3) {\n		r = vec3(direction.x, direction.z, direction.y);\n		offset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n		offset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n	}\n	else if( face == 4) {\n		r = vec3(direction.y, direction.x, -direction.z);\n		offset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n		offset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n	}\n	else {\n		r = vec3(direction.z, -direction.x, direction.y);\n		offset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n		offset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n	}\n	r = normalize(r);\n	float texelOffset = 0.5 * cubeUV_rcpTextureSize;\n	vec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n	vec2 base = offset + vec2( texelOffset );\n	return base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n	float roughnessVal = roughness* cubeUV_maxLods3;\n	float r1 = floor(roughnessVal);\n	float r2 = r1 + 1.0;\n	float t = fract(roughnessVal);\n	vec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n	float s = mipInfo.y;\n	float level0 = mipInfo.x;\n	float level1 = level0 + 1.0;\n	level1 = level1 > 5.0 ? 5.0 : level1;\n	level0 += min( floor( s + 0.5 ), 5.0 );\n	vec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n	vec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n	vec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n	vec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n	vec4 result = mix(color10, color20, t);\n	return vec4(result.rgb, 1.0);\n}\n#endif\n",
THREE.ShaderChunk.defaultnormal_vertex = "#ifdef FLIP_SIDED\n	objectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n",
THREE.ShaderChunk.displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n	transformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
THREE.ShaderChunk.displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif\n",
THREE.ShaderChunk.emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vUv );\n	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
THREE.ShaderChunk.emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif\n",
THREE.ShaderChunk.encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n  return value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n  return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n  return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n  float maxComponent = max( max( value.r, value.g ), value.b );\n  float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n  return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n  return vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n  float maxRGB = max( value.x, max( value.g, value.b ) );\n  float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n  M            = ceil( M * 255.0 ) / 255.0;\n  return vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n    return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n    float maxRGB = max( value.x, max( value.g, value.b ) );\n    float D      = max( maxRange / maxRGB, 1.0 );\n    D            = min( floor( D ) / 255.0, 1.0 );\n    return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n  vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n  Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n  vec4 vResult;\n  vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n  float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n  vResult.w = fract(Le);\n  vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n  return vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n  float Le = value.z * 255.0 + value.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n  Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n  vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n  return vec4( max(vRGB, 0.0), 1.0 );\n}\n",
THREE.ShaderChunk.encodings_fragment = "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
THREE.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n	#else\n		float flipNormal = 1.0;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#elif defined( ENVMAP_TYPE_EQUIREC )\n		vec2 sampleUV;\n		sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n		sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n		vec4 envColor = texture2D( envMap, sampleUV );\n	#elif defined( ENVMAP_TYPE_SPHERE )\n		vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n	#endif\n	envColor = envMapTexelToLinear( envColor );\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_MIX )\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_ADD )\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n	#endif\n#endif\n",
THREE.ShaderChunk.envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n	uniform float reflectivity;\n	uniform float envMapIntenstiy;\n#endif\n#ifdef USE_ENVMAP\n	#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n		varying vec3 vWorldPosition;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	uniform float flipEnvMap;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif\n",
THREE.ShaderChunk.envmap_pars_vertex = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif\n",
THREE.ShaderChunk.envmap_vertex = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif\n",
THREE.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n	#ifdef USE_LOGDEPTHBUF_EXT\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n	#else\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n	#endif\n	#ifdef FOG_EXP2\n		float fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
THREE.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
THREE.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n	reflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
THREE.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
THREE.ShaderChunk.lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n	vLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n		dotNL = dot( geometry.normal, directLight.direction );\n		directLightColor_Diffuse = PI * directLight.color;\n		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n		#ifdef DOUBLE_SIDED\n			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n		#endif\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n		dotNL = dot( geometry.normal, directLight.direction );\n		directLightColor_Diffuse = PI * directLight.color;\n		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n		#ifdef DOUBLE_SIDED\n			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n		#endif\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n		dotNL = dot( geometry.normal, directLight.direction );\n		directLightColor_Diffuse = PI * directLight.color;\n		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n		#ifdef DOUBLE_SIDED\n			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n		#endif\n	}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n		vLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n		#ifdef DOUBLE_SIDED\n			vLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n		#endif\n	}\n#endif\n",
THREE.ShaderChunk.lights_pars = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	#ifndef PHYSICALLY_CORRECT_LIGHTS\n		irradiance *= PI;\n	#endif\n	return irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n		int shadow;\n		float shadowBias;\n		float shadowRadius;\n		vec2 shadowMapSize;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n		directLight.color = directionalLight.color;\n		directLight.direction = directionalLight.direction;\n		directLight.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n		int shadow;\n		float shadowBias;\n		float shadowRadius;\n		vec2 shadowMapSize;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n		vec3 lVector = pointLight.position - geometry.position;\n		directLight.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		if ( testLightInRange( lightDistance, pointLight.distance ) ) {\n			directLight.color = pointLight.color;\n			directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n			directLight.visible = true;\n		} else {\n			directLight.color = vec3( 0.0 );\n			directLight.visible = false;\n		}\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n		int shadow;\n		float shadowBias;\n		float shadowRadius;\n		vec2 shadowMapSize;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n		vec3 lVector = spotLight.position - geometry.position;\n		directLight.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		float angleCos = dot( directLight.direction, spotLight.direction );\n		if ( all( bvec2( angleCos > spotLight.coneCos, testLightInRange( lightDistance, spotLight.distance ) ) ) ) {\n			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n			directLight.color = spotLight.color;\n			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n			directLight.visible = true;\n		} else {\n			directLight.color = vec3( 0.0 );\n			directLight.visible = false;\n		}\n	}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n		float dotNL = dot( geometry.normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		#ifndef PHYSICALLY_CORRECT_LIGHTS\n			irradiance *= PI;\n		#endif\n		return irradiance;\n	}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n		#ifdef DOUBLE_SIDED\n			float flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n		#else\n			float flipNormal = 1.0;\n		#endif\n		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n		#ifdef ENVMAP_TYPE_CUBE\n			vec3 queryVec = flipNormal * vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n			#ifdef TEXTURE_LOD_EXT\n				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n			#else\n				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n			#endif\n			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n		#elif defined( ENVMAP_TYPE_CUBE_UV )\n			vec3 queryVec = flipNormal * vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n			vec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n		#else\n			vec4 envMapColor = vec4( 0.0 );\n		#endif\n		return PI * envMapColor.rgb * envMapIntensity;\n	}\n	float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n		float maxMIPLevelScalar = float( maxMIPLevel );\n		float desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n	}\n	vec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n		#else\n			vec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n		#endif\n		#ifdef DOUBLE_SIDED\n			float flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n		#else\n			float flipNormal = 1.0;\n		#endif\n		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n		float specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n		#ifdef ENVMAP_TYPE_CUBE\n			vec3 queryReflectVec = flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n			#ifdef TEXTURE_LOD_EXT\n				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n			#else\n				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n			#endif\n			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n		#elif defined( ENVMAP_TYPE_CUBE_UV )\n			vec3 queryReflectVec = flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n			vec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n		#elif defined( ENVMAP_TYPE_EQUIREC )\n			vec2 sampleUV;\n			sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n			sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n			#ifdef TEXTURE_LOD_EXT\n				vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n			#else\n				vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n			#endif\n			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n		#elif defined( ENVMAP_TYPE_SPHERE )\n			vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n			#ifdef TEXTURE_LOD_EXT\n				vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n			#else\n				vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n			#endif\n			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n		#endif\n		return envMapColor.rgb * envMapIntensity;\n	}\n#endif\n",
THREE.ShaderChunk.lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
THREE.ShaderChunk.lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n	vec3	diffuseColor;\n	vec3	specularColor;\n	float	specularShininess;\n	float	specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifndef PHYSICALLY_CORRECT_LIGHTS\n		irradiance *= PI;\n	#endif\n	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )	(0)\n",
THREE.ShaderChunk.lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = mix( vec3( 0.16 * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#endif\n",
THREE.ShaderChunk.lights_physical_pars_fragment = "struct PhysicalMaterial {\n	vec3	diffuseColor;\n	float	specularRoughness;\n	vec3	specularColor;\n	#ifndef STANDARD\n	#endif\n};\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifndef PHYSICALLY_CORRECT_LIGHTS\n		irradiance *= PI;\n	#endif\n	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectSpecular += radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
THREE.ShaderChunk.lights_template = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointDirectLightIrradiance( pointLight, geometry, directLight );\n		#ifdef USE_SHADOWMAP\n		directLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometry, material, reflectedLight );\n	}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n		#ifdef USE_SHADOWMAP\n		directLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometry, material, reflectedLight );\n	}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n		#ifdef USE_SHADOWMAP\n		directLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometry, material, reflectedLight );\n	}\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#ifdef USE_LIGHTMAP\n		vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n		#ifndef PHYSICALLY_CORRECT_LIGHTS\n			lightMapIrradiance *= PI;\n		#endif\n		irradiance += lightMapIrradiance;\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n		}\n	#endif\n	#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n	 	irradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n	#endif\n	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	vec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n	RE_IndirectSpecular( radiance, geometry, material, reflectedLight );\n#endif\n",
THREE.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",
THREE.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n	uniform float logDepthBufFC;\n	#ifdef USE_LOGDEPTHBUF_EXT\n		varying float vFragDepth;\n	#endif\n#endif\n",
THREE.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n	#ifdef USE_LOGDEPTHBUF_EXT\n		varying float vFragDepth;\n	#endif\n	uniform float logDepthBufFC;\n#endif",
THREE.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n	gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n	#ifdef USE_LOGDEPTHBUF_EXT\n		vFragDepth = 1.0 + gl_Position.w;\n	#else\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n	#endif\n#endif\n",
THREE.ShaderChunk.map_fragment = "#ifdef USE_MAP\n	vec4 texelColor = texture2D( map, vUv );\n	texelColor = mapTexelToLinear( texelColor );\n	diffuseColor *= texelColor;\n#endif\n",
THREE.ShaderChunk.map_pars_fragment = "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n",
THREE.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n	vec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n	diffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
THREE.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n	uniform vec4 offsetRepeat;\n	uniform sampler2D map;\n#endif\n",
THREE.ShaderChunk.metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vUv );\n	metalnessFactor *= texelMetalness.r;\n#endif\n",
THREE.ShaderChunk.metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
THREE.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n	objectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	objectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	objectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	objectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
THREE.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n	#ifndef USE_MORPHNORMALS\n	uniform float morphTargetInfluences[ 8 ];\n	#else\n	uniform float morphTargetInfluences[ 4 ];\n	#endif\n#endif",
THREE.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n	transformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	transformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	transformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	transformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n	#ifndef USE_MORPHNORMALS\n	transformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	transformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	transformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	transformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n	#endif\n#endif\n",
THREE.ShaderChunk.normal_fragment = "#ifdef FLAT_SHADED\n	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n	#endif\n#endif\n#ifdef USE_NORMALMAP\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
THREE.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n	}\n#endif\n",
THREE.ShaderChunk.packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n  return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n  return 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n	vec4 r = vec4( fract( v * PackFactors ), v );\n	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors );\n}\nfloat viewZToOrthoDepth( const in float viewZ, const in float near, const in float far ) {\n  return ( viewZ + near ) / ( near - far );\n}\nfloat OrthoDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n  return linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n  return (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n  return ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
THREE.ShaderChunk.premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
THREE.ShaderChunk.project_vertex = "#ifdef USE_SKINNING\n	vec4 mvPosition = modelViewMatrix * skinned;\n#else\n	vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n",
THREE.ShaderChunk.roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vUv );\n	roughnessFactor *= texelRoughness.r;\n#endif\n",
THREE.ShaderChunk.roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
THREE.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHTS > 0\n		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n	#endif\n	#if NUM_SPOT_LIGHTS > 0\n		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n	#endif\n	#if NUM_POINT_LIGHTS > 0\n		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n	#endif\n	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n	}\n	float texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n		const vec2 offset = vec2( 0.0, 1.0 );\n		vec2 texelSize = vec2( 1.0 ) / size;\n		vec2 centroidUV = floor( uv * size + 0.5 ) / size;\n		float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n		float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n		float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n		float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n		vec2 f = fract( uv * size + 0.5 );\n		float a = mix( lb, lt, f.y );\n		float b = mix( rb, rt, f.y );\n		float c = mix( a, b, f.x );\n		return c;\n	}\n	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n		shadowCoord.xyz /= shadowCoord.w;\n		shadowCoord.z += shadowBias;\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n		bool frustumTest = all( frustumTestVec );\n		if ( frustumTest ) {\n		#if defined( SHADOWMAP_TYPE_PCF )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx0 = - texelSize.x * shadowRadius;\n			float dy0 = - texelSize.y * shadowRadius;\n			float dx1 = + texelSize.x * shadowRadius;\n			float dy1 = + texelSize.y * shadowRadius;\n			return (\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n			) * ( 1.0 / 9.0 );\n		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx0 = - texelSize.x * shadowRadius;\n			float dy0 = - texelSize.y * shadowRadius;\n			float dx1 = + texelSize.x * shadowRadius;\n			float dy1 = + texelSize.y * shadowRadius;\n			return (\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n			) * ( 1.0 / 9.0 );\n		#else\n			return texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#endif\n		}\n		return 1.0;\n	}\n	vec2 cubeToUV( vec3 v, float texelSizeY ) {\n		vec3 absV = abs( v );\n		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n		absV *= scaleToCube;\n		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n		vec2 planar = v.xy;\n		float almostATexel = 1.5 * texelSizeY;\n		float almostOne = 1.0 - almostATexel;\n		if ( absV.z >= almostOne ) {\n			if ( v.z > 0.0 )\n				planar.x = 4.0 - v.x;\n		} else if ( absV.x >= almostOne ) {\n			float signX = sign( v.x );\n			planar.x = v.z * signX + 2.0 * signX;\n		} else if ( absV.y >= almostOne ) {\n			float signY = sign( v.y );\n			planar.x = v.x + 2.0 * signY + 2.0;\n			planar.y = v.z * signY - 2.0;\n		}\n		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n	}\n	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		float dp = ( length( lightToPosition ) - shadowBias ) / 1000.0;\n		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n			return (\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n			) * ( 1.0 / 9.0 );\n		#else\n			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n		#endif\n	}\n#endif\n",
THREE.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHTS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n	#endif\n	#if NUM_SPOT_LIGHTS > 0\n		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n	#endif\n	#if NUM_POINT_LIGHTS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n	#endif\n#endif\n",
THREE.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHTS > 0\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n	}\n	#endif\n	#if NUM_SPOT_LIGHTS > 0\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n	}\n	#endif\n	#if NUM_POINT_LIGHTS > 0\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n	}\n	#endif\n#endif\n",
THREE.ShaderChunk.shadowmask_pars_fragment = "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHTS > 0\n	DirectionalLight directionalLight;\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		shadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#endif\n	#if NUM_SPOT_LIGHTS > 0\n	SpotLight spotLight;\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		shadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n	}\n	#endif\n	#if NUM_POINT_LIGHTS > 0\n	PointLight pointLight;\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		shadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n	}\n	#endif\n	#endif\n	return shadow;\n}\n",
THREE.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
THREE.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	#ifdef BONE_TEXTURE\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n		mat4 getBoneMatrix( const in float i ) {\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n			y = dy * ( y + 0.5 );\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n			mat4 bone = mat4( v1, v2, v3, v4 );\n			return bone;\n		}\n	#else\n		uniform mat4 boneMatrices[ MAX_BONES ];\n		mat4 getBoneMatrix( const in float i ) {\n			mat4 bone = boneMatrices[ int(i) ];\n			return bone;\n		}\n	#endif\n#endif\n",
THREE.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n#endif\n",
THREE.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
THREE.ShaderChunk.specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
THREE.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
THREE.ShaderChunk.tonemapping_fragment = "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
THREE.ShaderChunk.tonemapping_pars_fragment = "#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n  return toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  color = max( vec3( 0.0 ), color - 0.004 );\n  return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
THREE.ShaderChunk.uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n	varying vec2 vUv2;\n#endif",
THREE.ShaderChunk.uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n	attribute vec2 uv2;\n	varying vec2 vUv2;\n#endif",
THREE.ShaderChunk.uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n	vUv2 = uv2;\n#endif",
THREE.ShaderChunk.uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n	varying vec2 vUv;\n#endif",
THREE.ShaderChunk.uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n#endif\n",
THREE.ShaderChunk.uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
THREE.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n	#ifdef USE_SKINNING\n		vec4 worldPosition = modelMatrix * skinned;\n	#else\n		vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n	#endif\n#endif\n",
THREE.UniformsUtils = {
    merge: function(e) {
        for (var t = {}, i = 0; i < e.length; i++) {
            var n, r = this.clone(e[i]);
            for (n in r)
                t[n] = r[n]
        }
        return t
    },
    clone: function(e) {
        var t, i = {};
        for (t in e) {
            i[t] = {};
            for (var n in e[t]) {
                var r = e[t][n];
                r instanceof THREE.Color || r instanceof THREE.Vector2 || r instanceof THREE.Vector3 || r instanceof THREE.Vector4 || r instanceof THREE.Matrix3 || r instanceof THREE.Matrix4 || r instanceof THREE.Texture ? i[t][n] = r.clone() : Array.isArray(r) ? i[t][n] = r.slice() : i[t][n] = r
            }
        }
        return i
    }
},
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "1f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0,0,1,1)
        },
        specularMap: {
            type: "t",
            value: null
        },
        alphaMap: {
            type: "t",
            value: null
        },
        envMap: {
            type: "t",
            value: null
        },
        flipEnvMap: {
            type: "1f",
            value: -1
        },
        reflectivity: {
            type: "1f",
            value: 1
        },
        refractionRatio: {
            type: "1f",
            value: .98
        }
    },
    aomap: {
        aoMap: {
            type: "t",
            value: null
        },
        aoMapIntensity: {
            type: "1f",
            value: 1
        }
    },
    lightmap: {
        lightMap: {
            type: "t",
            value: null
        },
        lightMapIntensity: {
            type: "1f",
            value: 1
        }
    },
    emissivemap: {
        emissiveMap: {
            type: "t",
            value: null
        }
    },
    bumpmap: {
        bumpMap: {
            type: "t",
            value: null
        },
        bumpScale: {
            type: "1f",
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            type: "t",
            value: null
        },
        normalScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        }
    },
    displacementmap: {
        displacementMap: {
            type: "t",
            value: null
        },
        displacementScale: {
            type: "1f",
            value: 1
        },
        displacementBias: {
            type: "1f",
            value: 0
        }
    },
    roughnessmap: {
        roughnessMap: {
            type: "t",
            value: null
        }
    },
    metalnessmap: {
        metalnessMap: {
            type: "t",
            value: null
        }
    },
    fog: {
        fogDensity: {
            type: "1f",
            value: 25e-5
        },
        fogNear: {
            type: "1f",
            value: 1
        },
        fogFar: {
            type: "1f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "3fv",
            value: []
        },
        directionalLights: {
            type: "sa",
            value: [],
            properties: {
                direction: {
                    type: "v3"
                },
                color: {
                    type: "c"
                },
                shadow: {
                    type: "1i"
                },
                shadowBias: {
                    type: "1f"
                },
                shadowRadius: {
                    type: "1f"
                },
                shadowMapSize: {
                    type: "v2"
                }
            }
        },
        directionalShadowMap: {
            type: "tv",
            value: []
        },
        directionalShadowMatrix: {
            type: "m4v",
            value: []
        },
        spotLights: {
            type: "sa",
            value: [],
            properties: {
                color: {
                    type: "c"
                },
                position: {
                    type: "v3"
                },
                direction: {
                    type: "v3"
                },
                distance: {
                    type: "1f"
                },
                coneCos: {
                    type: "1f"
                },
                penumbraCos: {
                    type: "1f"
                },
                decay: {
                    type: "1f"
                },
                shadow: {
                    type: "1i"
                },
                shadowBias: {
                    type: "1f"
                },
                shadowRadius: {
                    type: "1f"
                },
                shadowMapSize: {
                    type: "v2"
                }
            }
        },
        spotShadowMap: {
            type: "tv",
            value: []
        },
        spotShadowMatrix: {
            type: "m4v",
            value: []
        },
        pointLights: {
            type: "sa",
            value: [],
            properties: {
                color: {
                    type: "c"
                },
                position: {
                    type: "v3"
                },
                decay: {
                    type: "1f"
                },
                distance: {
                    type: "1f"
                },
                shadow: {
                    type: "1i"
                },
                shadowBias: {
                    type: "1f"
                },
                shadowRadius: {
                    type: "1f"
                },
                shadowMapSize: {
                    type: "v2"
                }
            }
        },
        pointShadowMap: {
            type: "tv",
            value: []
        },
        pointShadowMatrix: {
            type: "m4v",
            value: []
        },
        hemisphereLights: {
            type: "sa",
            value: [],
            properties: {
                direction: {
                    type: "v3"
                },
                skyColor: {
                    type: "c"
                },
                groundColor: {
                    type: "c"
                }
            }
        }
    },
    points: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "1f",
            value: 1
        },
        size: {
            type: "1f",
            value: 1
        },
        scale: {
            type: "1f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0,0,1,1)
        }
    }
},
THREE.ShaderChunk.cube_frag = "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n	#include <logdepthbuf_fragment>\n}\n",
THREE.ShaderChunk.cube_vert = "varying vec3 vWorldPosition;\n#include <common>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vWorldPosition = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n}\n",
THREE.ShaderChunk.depth_frag = "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( 1.0 );\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <logdepthbuf_fragment>\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n	#endif\n}\n",
THREE.ShaderChunk.depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <skinbase_vertex>\n	#include <begin_vertex>\n	#include <displacementmap_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n}\n",
THREE.ShaderChunk.distanceRGBA_frag = "uniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n#include <common>\n#include <packing>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	#include <clipping_planes_fragment>\n	gl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );\n}\n",
THREE.ShaderChunk.distanceRGBA_vert = "varying vec4 vWorldPosition;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <skinbase_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition;\n}\n",
THREE.ShaderChunk.equirect_frag = "uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec3 direction = normalize( vWorldPosition );\n	vec2 sampleUV;\n	sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\n	sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <logdepthbuf_fragment>\n}\n",
THREE.ShaderChunk.equirect_vert = "varying vec3 vWorldPosition;\n#include <common>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vWorldPosition = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n}\n",
THREE.ShaderChunk.linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n	#include <premultiplied_alpha_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n}\n",
THREE.ShaderChunk.linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <color_vertex>\n	vLineDistance = scale * lineDistance;\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n}\n",
THREE.ShaderChunk.meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight;\n	reflectedLight.directDiffuse = vec3( 0.0 );\n	reflectedLight.directSpecular = vec3( 0.0 );\n	reflectedLight.indirectDiffuse = diffuseColor.rgb;\n	reflectedLight.indirectSpecular = vec3( 0.0 );\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n	#include <premultiplied_alpha_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n}\n",
THREE.ShaderChunk.meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <uv2_vertex>\n	#include <color_vertex>\n	#include <skinbase_vertex>\n	#ifdef USE_ENVMAP\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	#include <envmap_vertex>\n}\n",
THREE.ShaderChunk.meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n	varying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <specularmap_fragment>\n	#include <emissivemap_fragment>\n	reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n	#include <lightmap_fragment>\n	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n	#ifdef DOUBLE_SIDED\n		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n	#else\n		reflectedLight.directDiffuse = vLightFront;\n	#endif\n	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n	#include <premultiplied_alpha_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n}\n",
THREE.ShaderChunk.meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n	varying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <uv2_vertex>\n	#include <color_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <lights_lambert_vertex>\n	#include <shadowmap_vertex>\n}\n",
THREE.ShaderChunk.meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_template>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n	#include <premultiplied_alpha_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n}\n",
THREE.ShaderChunk.meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <uv2_vertex>\n	#include <color_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n#endif\n	#include <begin_vertex>\n	#include <displacementmap_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n}\n",
THREE.ShaderChunk.meshphysical_frag = "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\nuniform float envMapIntensity;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <specularmap_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_template>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n	#include <premultiplied_alpha_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n}\n",
THREE.ShaderChunk.meshphysical_vert = "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <uv2_vertex>\n	#include <color_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n#endif\n	#include <begin_vertex>\n	#include <displacementmap_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n}\n",
THREE.ShaderChunk.normal_frag = "uniform float opacity;\nvarying vec3 vNormal;\n#include <common>\n#include <packing>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	gl_FragColor = vec4( packNormalToRGB( vNormal ), opacity );\n	#include <logdepthbuf_fragment>\n}\n",
THREE.ShaderChunk.normal_vert = "varying vec3 vNormal;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vNormal = normalize( normalMatrix * normal );\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n}\n",
THREE.ShaderChunk.points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	outgoingLight = diffuseColor.rgb;\n	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n	#include <premultiplied_alpha_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n}\n",
THREE.ShaderChunk.points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <color_vertex>\n	#include <begin_vertex>\n	#include <project_vertex>\n	#ifdef USE_SIZEATTENUATION\n		gl_PointSize = size * ( scale / - mvPosition.z );\n	#else\n		gl_PointSize = size;\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n}\n",
THREE.ShaderChunk.shadow_frag = "uniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	gl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * ( 1.0  - getShadowMask() ) );\n}\n",
THREE.ShaderChunk.shadow_vert = "#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <begin_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n}\n",
THREE.ShaderLib = {
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.fog]),
        vertexShader: THREE.ShaderChunk.meshbasic_vert,
        fragmentShader: THREE.ShaderChunk.meshbasic_frag
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.emissivemap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            }
        }]),
        vertexShader: THREE.ShaderChunk.meshlambert_vert,
        fragmentShader: THREE.ShaderChunk.meshlambert_frag
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.emissivemap, THREE.UniformsLib.bumpmap, THREE.UniformsLib.normalmap, THREE.UniformsLib.displacementmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "1f",
                value: 30
            }
        }]),
        vertexShader: THREE.ShaderChunk.meshphong_vert,
        fragmentShader: THREE.ShaderChunk.meshphong_frag
    },
    standard: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.emissivemap, THREE.UniformsLib.bumpmap, THREE.UniformsLib.normalmap, THREE.UniformsLib.displacementmap, THREE.UniformsLib.roughnessmap, THREE.UniformsLib.metalnessmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            roughness: {
                type: "1f",
                value: .5
            },
            metalness: {
                type: "1f",
                value: 0
            },
            envMapIntensity: {
                type: "1f",
                value: 1
            }
        }]),
        vertexShader: THREE.ShaderChunk.meshphysical_vert,
        fragmentShader: THREE.ShaderChunk.meshphysical_frag
    },
    points: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.points, THREE.UniformsLib.fog]),
        vertexShader: THREE.ShaderChunk.points_vert,
        fragmentShader: THREE.ShaderChunk.points_frag
    },
    dashed: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
            scale: {
                type: "1f",
                value: 1
            },
            dashSize: {
                type: "1f",
                value: 1
            },
            totalSize: {
                type: "1f",
                value: 2
            }
        }]),
        vertexShader: THREE.ShaderChunk.linedashed_vert,
        fragmentShader: THREE.ShaderChunk.linedashed_frag
    },
    depth: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.displacementmap]),
        vertexShader: THREE.ShaderChunk.depth_vert,
        fragmentShader: THREE.ShaderChunk.depth_frag
    },
    normal: {
        uniforms: {
            opacity: {
                type: "1f",
                value: 1
            }
        },
        vertexShader: THREE.ShaderChunk.normal_vert,
        fragmentShader: THREE.ShaderChunk.normal_frag
    },
    cube: {
        uniforms: {
            tCube: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "1f",
                value: -1
            }
        },
        vertexShader: THREE.ShaderChunk.cube_vert,
        fragmentShader: THREE.ShaderChunk.cube_frag
    },
    equirect: {
        uniforms: {
            tEquirect: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "1f",
                value: -1
            }
        },
        vertexShader: THREE.ShaderChunk.equirect_vert,
        fragmentShader: THREE.ShaderChunk.equirect_frag
    },
    distanceRGBA: {
        uniforms: {
            lightPos: {
                type: "v3",
                value: new THREE.Vector3
            }
        },
        vertexShader: THREE.ShaderChunk.distanceRGBA_vert,
        fragmentShader: THREE.ShaderChunk.distanceRGBA_frag
    }
},
THREE.ShaderLib.physical = {
    uniforms: THREE.UniformsUtils.merge([THREE.ShaderLib.standard.uniforms, {}]),
    vertexShader: THREE.ShaderChunk.meshphysical_vert,
    fragmentShader: THREE.ShaderChunk.meshphysical_frag
},
THREE.WebGLRenderer = function(e) {
    function t(e, t, i, n) {
        !0 === P && (e *= n,
        t *= n,
        i *= n),
        xe.clearColor(e, t, i, n)
    }
    function i() {
        xe.init(),
        xe.scissor(Z.copy(re).multiplyScalar(ne)),
        xe.viewport(K.copy(oe).multiplyScalar(ne)),
        t($.r, $.g, $.b, ee)
    }
    function n() {
        q = k = null ,
        Y = "",
        X = -1,
        xe.reset()
    }
    function r(e) {
        e.preventDefault(),
        n(),
        i(),
        He.clear()
    }
    function a(e) {
        e = e.target,
        e.removeEventListener("dispose", a);
        e: {
            var t = He.get(e);
            if (e.image && t.__image__webglTextureCube)
                ge.deleteTexture(t.__image__webglTextureCube);
            else {
                if (void 0 === t.__webglInit)
                    break e;
                ge.deleteTexture(t.__webglTexture)
            }
            He["delete"](e)
        }
        Ee.textures--
    }
    function o(e) {
        e = e.target,
        e.removeEventListener("dispose", o);
        var t = He.get(e)
          , i = He.get(e.texture);
        if (e) {
            if (void 0 !== i.__webglTexture && ge.deleteTexture(i.__webglTexture),
            e.depthTexture && e.depthTexture.dispose(),
            e instanceof THREE.WebGLRenderTargetCube)
                for (i = 0; 6 > i; i++)
                    ge.deleteFramebuffer(t.__webglFramebuffer[i]),
                    t.__webglDepthbuffer && ge.deleteRenderbuffer(t.__webglDepthbuffer[i]);
            else
                ge.deleteFramebuffer(t.__webglFramebuffer),
                t.__webglDepthbuffer && ge.deleteRenderbuffer(t.__webglDepthbuffer);
            He["delete"](e.texture),
            He["delete"](e)
        }
        Ee.textures--
    }
    function s(e) {
        e = e.target,
        e.removeEventListener("dispose", s),
        c(e),
        He["delete"](e)
    }
    function c(e) {
        var t = He.get(e).program;
        e.program = void 0,
        void 0 !== t && Me.releaseProgram(t)
    }
    function h(e, t) {
        return Math.abs(t[0]) - Math.abs(e[0])
    }
    function l(e, t) {
        return e.object.renderOrder !== t.object.renderOrder ? e.object.renderOrder - t.object.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
    }
    function u(e, t) {
        return e.object.renderOrder !== t.object.renderOrder ? e.object.renderOrder - t.object.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
    }
    function p(e, t, i, n, r) {
        var a;
        i.transparent ? (n = U,
        a = ++O) : (n = D,
        a = ++F),
        a = n[a],
        void 0 !== a ? (a.id = e.id,
        a.object = e,
        a.geometry = t,
        a.material = i,
        a.z = de.z,
        a.group = r) : (a = {
            id: e.id,
            object: e,
            geometry: t,
            material: i,
            z: de.z,
            group: r
        },
        n.push(a))
    }
    function d(e) {
        if (!se.intersectsSphere(e))
            return !1;
        var t = ce.numPlanes;
        if (0 === t)
            return !0;
        var i = G.clippingPlanes
          , n = e.center;
        e = -e.radius;
        var r = 0;
        do
            if (i[r].distanceToPoint(n) < e)
                return !1;
        while (++r !== t);return !0
    }
    function f(e, t) {
        if (!1 !== e.visible) {
            if (e.layers.test(t.layers))
                if (e instanceof THREE.Light)
                    B.push(e);
                else if (e instanceof THREE.Sprite) {
                    var i;
                    (i = !1 === e.frustumCulled) || (ue.center.set(0, 0, 0),
                    ue.radius = .7071067811865476,
                    ue.applyMatrix4(e.matrixWorld),
                    i = !0 === d(ue)),
                    i && V.push(e)
                } else if (e instanceof THREE.LensFlare)
                    z.push(e);
                else if (e instanceof THREE.ImmediateRenderObject)
                    !0 === G.sortObjects && (de.setFromMatrixPosition(e.matrixWorld),
                    de.applyProjection(pe)),
                    p(e, null , e.material, de.z, null );
                else if ((e instanceof THREE.Mesh || e instanceof THREE.Line || e instanceof THREE.Points) && (e instanceof THREE.SkinnedMesh && e.skeleton.update(),
                (i = !1 === e.frustumCulled) || (i = e.geometry,
                null === i.boundingSphere && i.computeBoundingSphere(),
                ue.copy(i.boundingSphere).applyMatrix4(e.matrixWorld),
                i = !0 === d(ue)),
                i)) {
                    var n = e.material;
                    if (!0 === n.visible)
                        if (!0 === G.sortObjects && (de.setFromMatrixPosition(e.matrixWorld),
                        de.applyProjection(pe)),
                        i = be.update(e),
                        n instanceof THREE.MultiMaterial)
                            for (var r = i.groups, a = n.materials, n = 0, o = r.length; o > n; n++) {
                                var s = r[n]
                                  , c = a[s.materialIndex];
                                !0 === c.visible && p(e, i, c, de.z, s)
                            }
                        else
                            p(e, i, n, de.z, null )
                }
            for (i = e.children,
            n = 0,
            o = i.length; o > n; n++)
                f(i[n], t)
        }
    }
    function E(e, t, i, n) {
        for (var r = 0, a = e.length; a > r; r++) {
            var o = e[r]
              , s = o.object
              , c = o.geometry
              , h = void 0 === n ? o.material : n
              , o = o.group;
            if (s.modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, s.matrixWorld),
            s.normalMatrix.getNormalMatrix(s.modelViewMatrix),
            s instanceof THREE.ImmediateRenderObject) {
                m(h);
                var l = g(t, i, h, s);
                Y = "",
                s.render(function(e) {
                    G.renderBufferImmediate(e, l, h)
                })
            } else
                G.renderBufferDirect(t, i, c, h, s, o)
        }
    }
    function m(e) {
        e.side !== THREE.DoubleSide ? xe.enable(ge.CULL_FACE) : xe.disable(ge.CULL_FACE),
        xe.setFlipSided(e.side === THREE.BackSide),
        !0 === e.transparent ? xe.setBlending(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha) : xe.setBlending(THREE.NoBlending),
        xe.setDepthFunc(e.depthFunc),
        xe.setDepthTest(e.depthTest),
        xe.setDepthWrite(e.depthWrite),
        xe.setColorWrite(e.colorWrite),
        xe.setPolygonOffset(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits)
    }
    function g(e, t, i, n) {
        J = 0;
        var r = He.get(i);
        if (he && ((le || e !== q) && ce.setState(i.clippingPlanes, i.clipShadows, e, r, e === q && i.id === X),
        void 0 !== r.numClippingPlanes && r.numClippingPlanes !== ce.numPlanes && (i.needsUpdate = !0)),
        void 0 === r.program && (i.needsUpdate = !0),
        void 0 !== r.lightsHash && r.lightsHash !== fe.hash && (i.needsUpdate = !0),
        i.needsUpdate) {
            e: {
                var a = He.get(i)
                  , o = Me.getParameters(i, fe, t, ce.numPlanes, n)
                  , h = Me.getProgramCode(i, o)
                  , l = a.program
                  , u = !0;
                if (void 0 === l)
                    i.addEventListener("dispose", s);
                else if (l.code !== h)
                    c(i);
                else {
                    if (void 0 !== o.shaderID)
                        break e;
                    u = !1
                }
                if (u && (o.shaderID ? (l = THREE.ShaderLib[o.shaderID],
                a.__webglShader = {
                    name: i.type,
                    uniforms: THREE.UniformsUtils.clone(l.uniforms),
                    vertexShader: l.vertexShader,
                    fragmentShader: l.fragmentShader
                }) : a.__webglShader = {
                    name: i.type,
                    uniforms: i.uniforms,
                    vertexShader: i.vertexShader,
                    fragmentShader: i.fragmentShader
                },
                i.__webglShader = a.__webglShader,
                l = Me.acquireProgram(i, o, h),
                a.program = l,
                i.program = l),
                o = l.getAttributes(),
                i.morphTargets)
                    for (h = i.numSupportedMorphTargets = 0; h < G.maxMorphTargets; h++)
                        0 <= o["morphTarget" + h] && i.numSupportedMorphTargets++;
                if (i.morphNormals)
                    for (h = i.numSupportedMorphNormals = 0; h < G.maxMorphNormals; h++)
                        0 <= o["morphNormal" + h] && i.numSupportedMorphNormals++;
                o = a.__webglShader.uniforms,
                (i instanceof THREE.ShaderMaterial || i instanceof THREE.RawShaderMaterial) && !0 !== i.clipping || (a.numClippingPlanes = ce.numPlanes,
                o.clippingPlanes = ce.uniform),
                i.lights && (a.lightsHash = fe.hash,
                o.ambientLightColor.value = fe.ambient,
                o.directionalLights.value = fe.directional,
                o.spotLights.value = fe.spot,
                o.pointLights.value = fe.point,
                o.hemisphereLights.value = fe.hemi,
                o.directionalShadowMap.value = fe.directionalShadowMap,
                o.directionalShadowMatrix.value = fe.directionalShadowMatrix,
                o.spotShadowMap.value = fe.spotShadowMap,
                o.spotShadowMatrix.value = fe.spotShadowMatrix,
                o.pointShadowMap.value = fe.pointShadowMap,
                o.pointShadowMatrix.value = fe.pointShadowMatrix),
                h = a.program.getUniforms(),
                h = THREE.WebGLUniforms.seqWithValue(h.seq, o),
                a.uniformsList = h,
                a.dynamicUniforms = THREE.WebGLUniforms.splitDynamic(h, o)
            }
            i.needsUpdate = !1
        }
        var p = !1
          , u = l = !1
          , a = r.program
          , h = a.getUniforms()
          , o = r.__webglShader.uniforms;
        if (a.id !== k && (ge.useProgram(a.program),
        k = a.id,
        u = l = p = !0),
        i.id !== X && (X = i.id,
        l = !0),
        (p || e !== q) && (h.set(ge, e, "projectionMatrix"),
        Re.logarithmicDepthBuffer && h.setValue(ge, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)),
        e !== q && (q = e,
        u = l = !0),
        (i instanceof THREE.ShaderMaterial || i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshStandardMaterial || i.envMap) && (p = h.map.cameraPosition,
        void 0 !== p && p.setValue(ge, de.setFromMatrixPosition(e.matrixWorld))),
        (i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshStandardMaterial || i instanceof THREE.ShaderMaterial || i.skinning) && h.setValue(ge, "viewMatrix", e.matrixWorldInverse),
        h.set(ge, G, "toneMappingExposure"),
        h.set(ge, G, "toneMappingWhitePoint")),
        i.skinning && (h.setOptional(ge, n, "bindMatrix"),
        h.setOptional(ge, n, "bindMatrixInverse"),
        p = n.skeleton) && (Re.floatVertexTextures && p.useVertexTexture ? (h.set(ge, p, "boneTexture"),
        h.set(ge, p, "boneTextureWidth"),
        h.set(ge, p, "boneTextureHeight")) : h.setOptional(ge, p, "boneMatrices")),
        l) {
            if (i.lights && (l = u,
            o.ambientLightColor.needsUpdate = l,
            o.directionalLights.needsUpdate = l,
            o.pointLights.needsUpdate = l,
            o.spotLights.needsUpdate = l,
            o.hemisphereLights.needsUpdate = l),
            t && i.fog && (o.fogColor.value = t.color,
            t instanceof THREE.Fog ? (o.fogNear.value = t.near,
            o.fogFar.value = t.far) : t instanceof THREE.FogExp2 && (o.fogDensity.value = t.density)),
            i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshStandardMaterial || i instanceof THREE.MeshDepthMaterial) {
                o.opacity.value = i.opacity,
                o.diffuse.value = i.color,
                i.emissive && o.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),
                o.map.value = i.map,
                o.specularMap.value = i.specularMap,
                o.alphaMap.value = i.alphaMap,
                i.aoMap && (o.aoMap.value = i.aoMap,
                o.aoMapIntensity.value = i.aoMapIntensity);
                var d;
                i.map ? d = i.map : i.specularMap ? d = i.specularMap : i.displacementMap ? d = i.displacementMap : i.normalMap ? d = i.normalMap : i.bumpMap ? d = i.bumpMap : i.roughnessMap ? d = i.roughnessMap : i.metalnessMap ? d = i.metalnessMap : i.alphaMap ? d = i.alphaMap : i.emissiveMap && (d = i.emissiveMap),
                void 0 !== d && (d instanceof THREE.WebGLRenderTarget && (d = d.texture),
                t = d.offset,
                d = d.repeat,
                o.offsetRepeat.value.set(t.x, t.y, d.x, d.y)),
                o.envMap.value = i.envMap,
                o.flipEnvMap.value = i.envMap instanceof THREE.CubeTexture ? -1 : 1,
                o.reflectivity.value = i.reflectivity,
                o.refractionRatio.value = i.refractionRatio
            }
            i instanceof THREE.LineBasicMaterial ? (o.diffuse.value = i.color,
            o.opacity.value = i.opacity) : i instanceof THREE.LineDashedMaterial ? (o.diffuse.value = i.color,
            o.opacity.value = i.opacity,
            o.dashSize.value = i.dashSize,
            o.totalSize.value = i.dashSize + i.gapSize,
            o.scale.value = i.scale) : i instanceof THREE.PointsMaterial ? (o.diffuse.value = i.color,
            o.opacity.value = i.opacity,
            o.size.value = i.size * ne,
            o.scale.value = .5 * _.clientHeight,
            o.map.value = i.map,
            null !== i.map && (d = i.map.offset,
            i = i.map.repeat,
            o.offsetRepeat.value.set(d.x, d.y, i.x, i.y))) : i instanceof THREE.MeshLambertMaterial ? (i.lightMap && (o.lightMap.value = i.lightMap,
            o.lightMapIntensity.value = i.lightMapIntensity),
            i.emissiveMap && (o.emissiveMap.value = i.emissiveMap)) : i instanceof THREE.MeshPhongMaterial ? (o.specular.value = i.specular,
            o.shininess.value = Math.max(i.shininess, 1e-4),
            i.lightMap && (o.lightMap.value = i.lightMap,
            o.lightMapIntensity.value = i.lightMapIntensity),
            i.emissiveMap && (o.emissiveMap.value = i.emissiveMap),
            i.bumpMap && (o.bumpMap.value = i.bumpMap,
            o.bumpScale.value = i.bumpScale),
            i.normalMap && (o.normalMap.value = i.normalMap,
            o.normalScale.value.copy(i.normalScale)),
            i.displacementMap && (o.displacementMap.value = i.displacementMap,
            o.displacementScale.value = i.displacementScale,
            o.displacementBias.value = i.displacementBias)) : i instanceof THREE.MeshPhysicalMaterial ? v(o, i) : i instanceof THREE.MeshStandardMaterial ? v(o, i) : i instanceof THREE.MeshDepthMaterial ? i.displacementMap && (o.displacementMap.value = i.displacementMap,
            o.displacementScale.value = i.displacementScale,
            o.displacementBias.value = i.displacementBias) : i instanceof THREE.MeshNormalMaterial && (o.opacity.value = i.opacity),
            THREE.WebGLUniforms.upload(ge, r.uniformsList, o, G)
        }
        return h.set(ge, n, "modelViewMatrix"),
        h.set(ge, n, "normalMatrix"),
        h.setValue(ge, "modelMatrix", n.matrixWorld),
        r = r.dynamicUniforms,
        null !== r && (THREE.WebGLUniforms.evalDynamic(r, o, n, e),
        THREE.WebGLUniforms.upload(ge, r, o, G)),
        a
    }
    function v(e, t) {
        e.roughness.value = t.roughness,
        e.metalness.value = t.metalness,
        t.roughnessMap && (e.roughnessMap.value = t.roughnessMap),
        t.metalnessMap && (e.metalnessMap.value = t.metalnessMap),
        t.lightMap && (e.lightMap.value = t.lightMap,
        e.lightMapIntensity.value = t.lightMapIntensity),
        t.emissiveMap && (e.emissiveMap.value = t.emissiveMap),
        t.bumpMap && (e.bumpMap.value = t.bumpMap,
        e.bumpScale.value = t.bumpScale),
        t.normalMap && (e.normalMap.value = t.normalMap,
        e.normalScale.value.copy(t.normalScale)),
        t.displacementMap && (e.displacementMap.value = t.displacementMap,
        e.displacementScale.value = t.displacementScale,
        e.displacementBias.value = t.displacementBias),
        t.envMap && (e.envMapIntensity.value = t.envMapIntensity)
    }
    function T(e, t, i) {
        i ? (ge.texParameteri(e, ge.TEXTURE_WRAP_S, M(t.wrapS)),
        ge.texParameteri(e, ge.TEXTURE_WRAP_T, M(t.wrapT)),
        ge.texParameteri(e, ge.TEXTURE_MAG_FILTER, M(t.magFilter)),
        ge.texParameteri(e, ge.TEXTURE_MIN_FILTER, M(t.minFilter))) : (ge.texParameteri(e, ge.TEXTURE_WRAP_S, ge.CLAMP_TO_EDGE),
        ge.texParameteri(e, ge.TEXTURE_WRAP_T, ge.CLAMP_TO_EDGE),
        t.wrapS === THREE.ClampToEdgeWrapping && t.wrapT === THREE.ClampToEdgeWrapping || void 0,
        ge.texParameteri(e, ge.TEXTURE_MAG_FILTER, b(t.magFilter)),
        ge.texParameteri(e, ge.TEXTURE_MIN_FILTER, b(t.minFilter)),
        t.minFilter !== THREE.NearestFilter && t.minFilter !== THREE.LinearFilter && void 0),
        !(i = ye.get("EXT_texture_filter_anisotropic")) || t.type === THREE.FloatType && null === ye.get("OES_texture_float_linear") || t.type === THREE.HalfFloatType && null === ye.get("OES_texture_half_float_linear") || !(1 < t.anisotropy || He.get(t).__currentAnisotropy) || (ge.texParameterf(e, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, G.getMaxAnisotropy())),
        He.get(t).__currentAnisotropy = t.anisotropy)
    }
    function y(e, t) {
        if (e.width > t || e.height > t) {
            var i = t / Math.max(e.width, e.height)
              , n = document.createElement("canvas");
            return n.width = Math.floor(e.width * i),
            n.height = Math.floor(e.height * i),
            n.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, n.width, n.height),
            n
        }
        return e
    }
    function R(e) {
        return THREE.Math.isPowerOfTwo(e.width) && THREE.Math.isPowerOfTwo(e.height)
    }
    function x(e, t, i, n) {
        var r = M(t.texture.format)
          , a = M(t.texture.type);
        xe.texImage2D(n, 0, r, t.width, t.height, 0, r, a, null ),
        ge.bindFramebuffer(ge.FRAMEBUFFER, e),
        ge.framebufferTexture2D(ge.FRAMEBUFFER, i, n, He.get(t.texture).__webglTexture, 0),
        ge.bindFramebuffer(ge.FRAMEBUFFER, null )
    }
    function H(e, t) {
        ge.bindRenderbuffer(ge.RENDERBUFFER, e),
        t.depthBuffer && !t.stencilBuffer ? (ge.renderbufferStorage(ge.RENDERBUFFER, ge.DEPTH_COMPONENT16, t.width, t.height),
        ge.framebufferRenderbuffer(ge.FRAMEBUFFER, ge.DEPTH_ATTACHMENT, ge.RENDERBUFFER, e)) : t.depthBuffer && t.stencilBuffer ? (ge.renderbufferStorage(ge.RENDERBUFFER, ge.DEPTH_STENCIL, t.width, t.height),
        ge.framebufferRenderbuffer(ge.FRAMEBUFFER, ge.DEPTH_STENCIL_ATTACHMENT, ge.RENDERBUFFER, e)) : ge.renderbufferStorage(ge.RENDERBUFFER, ge.RGBA4, t.width, t.height),
        ge.bindRenderbuffer(ge.RENDERBUFFER, null )
    }
    function b(e) {
        return e === THREE.NearestFilter || e === THREE.NearestMipMapNearestFilter || e === THREE.NearestMipMapLinearFilter ? ge.NEAREST : ge.LINEAR
    }
    function M(e) {
        var t;
        if (e === THREE.RepeatWrapping)
            return ge.REPEAT;
        if (e === THREE.ClampToEdgeWrapping)
            return ge.CLAMP_TO_EDGE;
        if (e === THREE.MirroredRepeatWrapping)
            return ge.MIRRORED_REPEAT;
        if (e === THREE.NearestFilter)
            return ge.NEAREST;
        if (e === THREE.NearestMipMapNearestFilter)
            return ge.NEAREST_MIPMAP_NEAREST;
        if (e === THREE.NearestMipMapLinearFilter)
            return ge.NEAREST_MIPMAP_LINEAR;
        if (e === THREE.LinearFilter)
            return ge.LINEAR;
        if (e === THREE.LinearMipMapNearestFilter)
            return ge.LINEAR_MIPMAP_NEAREST;
        if (e === THREE.LinearMipMapLinearFilter)
            return ge.LINEAR_MIPMAP_LINEAR;
        if (e === THREE.UnsignedByteType)
            return ge.UNSIGNED_BYTE;
        if (e === THREE.UnsignedShort4444Type)
            return ge.UNSIGNED_SHORT_4_4_4_4;
        if (e === THREE.UnsignedShort5551Type)
            return ge.UNSIGNED_SHORT_5_5_5_1;
        if (e === THREE.UnsignedShort565Type)
            return ge.UNSIGNED_SHORT_5_6_5;
        if (e === THREE.ByteType)
            return ge.BYTE;
        if (e === THREE.ShortType)
            return ge.SHORT;
        if (e === THREE.UnsignedShortType)
            return ge.UNSIGNED_SHORT;
        if (e === THREE.IntType)
            return ge.INT;
        if (e === THREE.UnsignedIntType)
            return ge.UNSIGNED_INT;
        if (e === THREE.FloatType)
            return ge.FLOAT;
        if (t = ye.get("OES_texture_half_float"),
        null !== t && e === THREE.HalfFloatType)
            return t.HALF_FLOAT_OES;
        if (e === THREE.AlphaFormat)
            return ge.ALPHA;
        if (e === THREE.RGBFormat)
            return ge.RGB;
        if (e === THREE.RGBAFormat)
            return ge.RGBA;
        if (e === THREE.LuminanceFormat)
            return ge.LUMINANCE;
        if (e === THREE.LuminanceAlphaFormat)
            return ge.LUMINANCE_ALPHA;
        if (e === THREE.DepthFormat)
            return ge.DEPTH_COMPONENT;
        if (e === THREE.AddEquation)
            return ge.FUNC_ADD;
        if (e === THREE.SubtractEquation)
            return ge.FUNC_SUBTRACT;
        if (e === THREE.ReverseSubtractEquation)
            return ge.FUNC_REVERSE_SUBTRACT;
        if (e === THREE.ZeroFactor)
            return ge.ZERO;
        if (e === THREE.OneFactor)
            return ge.ONE;
        if (e === THREE.SrcColorFactor)
            return ge.SRC_COLOR;
        if (e === THREE.OneMinusSrcColorFactor)
            return ge.ONE_MINUS_SRC_COLOR;
        if (e === THREE.SrcAlphaFactor)
            return ge.SRC_ALPHA;
        if (e === THREE.OneMinusSrcAlphaFactor)
            return ge.ONE_MINUS_SRC_ALPHA;
        if (e === THREE.DstAlphaFactor)
            return ge.DST_ALPHA;
        if (e === THREE.OneMinusDstAlphaFactor)
            return ge.ONE_MINUS_DST_ALPHA;
        if (e === THREE.DstColorFactor)
            return ge.DST_COLOR;
        if (e === THREE.OneMinusDstColorFactor)
            return ge.ONE_MINUS_DST_COLOR;
        if (e === THREE.SrcAlphaSaturateFactor)
            return ge.SRC_ALPHA_SATURATE;
        if (t = ye.get("WEBGL_compressed_texture_s3tc"),
        null !== t) {
            if (e === THREE.RGB_S3TC_DXT1_Format)
                return t.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (e === THREE.RGBA_S3TC_DXT1_Format)
                return t.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (e === THREE.RGBA_S3TC_DXT3_Format)
                return t.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (e === THREE.RGBA_S3TC_DXT5_Format)
                return t.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        if (t = ye.get("WEBGL_compressed_texture_pvrtc"),
        null !== t) {
            if (e === THREE.RGB_PVRTC_4BPPV1_Format)
                return t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
            if (e === THREE.RGB_PVRTC_2BPPV1_Format)
                return t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
            if (e === THREE.RGBA_PVRTC_4BPPV1_Format)
                return t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
            if (e === THREE.RGBA_PVRTC_2BPPV1_Format)
                return t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        }
        if (t = ye.get("WEBGL_compressed_texture_etc1"),
        null !== t && e === THREE.RGB_ETC1_Format)
            return t.COMPRESSED_RGB_ETC1_WEBGL;
        if (t = ye.get("EXT_blend_minmax"),
        null !== t) {
            if (e === THREE.MinEquation)
                return t.MIN_EXT;
            if (e === THREE.MaxEquation)
                return t.MAX_EXT
        }
        return 0
    }
    e = e || {};
    var _ = void 0 !== e.canvas ? e.canvas : document.createElement("canvas")
      , w = void 0 !== e.context ? e.context : null
      , S = void 0 !== e.alpha ? e.alpha : !1
      , A = void 0 !== e.depth ? e.depth : !0
      , L = void 0 !== e.stencil ? e.stencil : !0
      , C = void 0 !== e.antialias ? e.antialias : !1
      , P = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0
      , I = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1
      , B = []
      , D = []
      , F = -1
      , U = []
      , O = -1
      , N = new Float32Array(8)
      , V = []
      , z = [];
    this.domElement = _,
    this.context = null ,
    this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0,
    this.clippingPlanes = [],
    this.localClippingEnabled = !1,
    this.gammaFactor = 2,
    this.physicallyCorrectLights = this.gammaOutput = this.gammaInput = !1,
    this.toneMapping = THREE.LinearToneMapping,
    this.toneMappingWhitePoint = this.toneMappingExposure = 1,
    this.maxMorphTargets = 8,
    this.maxMorphNormals = 4,
    this.autoScaleCubemaps = !0;
    var G = this
      , k = null
      , j = null
      , W = null
      , X = -1
      , Y = ""
      , q = null
      , Z = new THREE.Vector4
      , Q = null
      , K = new THREE.Vector4
      , J = 0
      , $ = new THREE.Color(0)
      , ee = 0
      , te = _.width
      , ie = _.height
      , ne = 1
      , re = new THREE.Vector4(0,0,te,ie)
      , ae = !1
      , oe = new THREE.Vector4(0,0,te,ie)
      , se = new THREE.Frustum
      , ce = new THREE.WebGLClipping
      , he = !1
      , le = !1
      , ue = new THREE.Sphere
      , pe = new THREE.Matrix4
      , de = new THREE.Vector3
      , fe = {
        hash: "",
        ambient: [0, 0, 0],
        directional: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotShadowMap: [],
        spotShadowMatrix: [],
        point: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
        shadows: []
    }
      , Ee = {
        geometries: 0,
        textures: 0
    }
      , me = {
        calls: 0,
        vertices: 0,
        faces: 0,
        points: 0
    };
    this.info = {
        render: me,
        memory: Ee,
        programs: null
    };
    var ge;
    try {
        if (S = {
            alpha: S,
            depth: A,
            stencil: L,
            antialias: C,
            premultipliedAlpha: P,
            preserveDrawingBuffer: I
        },
        ge = w || _.getContext("webgl", S) || _.getContext("experimental-webgl", S),
        null === ge) {
            if (null !== _.getContext("webgl"))
                throw "Error creating WebGL context with your selected attributes.";
            throw "Error creating WebGL context."
        }
        void 0 === ge.getShaderPrecisionFormat && (ge.getShaderPrecisionFormat = function() {
            return {
                rangeMin: 1,
                rangeMax: 1,
                precision: 1
            }
        }
        ),
        _.addEventListener("webglcontextlost", r, !1)
    } catch (ve) {}
    var Te = "undefined" != typeof WebGL2RenderingContext && ge instanceof WebGL2RenderingContext
      , ye = new THREE.WebGLExtensions(ge);
    ye.get("WEBGL_depth_texture"),
    ye.get("OES_texture_float"),
    ye.get("OES_texture_float_linear"),
    ye.get("OES_texture_half_float"),
    ye.get("OES_texture_half_float_linear"),
    ye.get("OES_standard_derivatives"),
    ye.get("ANGLE_instanced_arrays"),
    ye.get("OES_element_index_uint") && (THREE.BufferGeometry.MaxIndex = 4294967296);
    var Re = new THREE.WebGLCapabilities(ge,ye,e)
      , xe = new THREE.WebGLState(ge,ye,M)
      , He = new THREE.WebGLProperties
      , be = new THREE.WebGLObjects(ge,He,this.info)
      , Me = new THREE.WebGLPrograms(this,Re)
      , _e = new THREE.WebGLLights;
    this.info.programs = Me.programs;
    var we = new THREE.WebGLBufferRenderer(ge,ye,me)
      , Se = new THREE.WebGLIndexedBufferRenderer(ge,ye,me);
    i(),
    this.context = ge,
    this.capabilities = Re,
    this.extensions = ye,
    this.properties = He,
    this.state = xe;
    var Ae = new THREE.WebGLShadowMap(this,fe,be);
    this.shadowMap = Ae;
    var Le = new THREE.SpritePlugin(this,V)
      , Ce = new THREE.LensFlarePlugin(this,z);
    this.getContext = function() {
        return ge
    }
    ,
    this.getContextAttributes = function() {
        return ge.getContextAttributes()
    }
    ,
    this.forceContextLoss = function() {
        ye.get("WEBGL_lose_context").loseContext()
    }
    ,
    this.getMaxAnisotropy = function() {
        var e;
        return function() {
            if (void 0 !== e)
                return e;
            var t = ye.get("EXT_texture_filter_anisotropic");
            return e = null !== t ? ge.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
        }
    }(),
    this.getPrecision = function() {
        return Re.precision
    }
    ,
    this.getPixelRatio = function() {
        return ne
    }
    ,
    this.setPixelRatio = function(e) {
        void 0 !== e && (ne = e,
        this.setSize(oe.z, oe.w, !1))
    }
    ,
    this.getSize = function() {
        return {
            width: te,
            height: ie
        }
    }
    ,
    this.setSize = function(e, t, i) {
        te = e,
        ie = t,
        _.width = e * ne,
        _.height = t * ne,
        !1 !== i && (_.style.width = e + "px",
        _.style.height = t + "px"),
        this.setViewport(0, 0, e, t)
    }
    ,
    this.setViewport = function(e, t, i, n) {
        xe.viewport(oe.set(e, t, i, n))
    }
    ,
    this.setScissor = function(e, t, i, n) {
        xe.scissor(re.set(e, t, i, n))
    }
    ,
    this.setScissorTest = function(e) {
        xe.setScissorTest(ae = e)
    }
    ,
    this.getClearColor = function() {
        return $
    }
    ,
    this.setClearColor = function(e, i) {
        $.set(e),
        ee = void 0 !== i ? i : 1,
        t($.r, $.g, $.b, ee)
    }
    ,
    this.getClearAlpha = function() {
        return ee
    }
    ,
    this.setClearAlpha = function(e) {
        ee = e,
        t($.r, $.g, $.b, ee)
    }
    ,
    this.clear = function(e, t, i) {
        var n = 0;
        (void 0 === e || e) && (n |= ge.COLOR_BUFFER_BIT),
        (void 0 === t || t) && (n |= ge.DEPTH_BUFFER_BIT),
        (void 0 === i || i) && (n |= ge.STENCIL_BUFFER_BIT),
        ge.clear(n)
    }
    ,
    this.clearColor = function() {
        this.clear(!0, !1, !1)
    }
    ,
    this.clearDepth = function() {
        this.clear(!1, !0, !1)
    }
    ,
    this.clearStencil = function() {
        this.clear(!1, !1, !0)
    }
    ,
    this.clearTarget = function(e, t, i, n) {
        this.setRenderTarget(e),
        this.clear(t, i, n)
    }
    ,
    this.resetGLState = n,
    this.dispose = function() {
        _.removeEventListener("webglcontextlost", r, !1)
    }
    ,
    this.renderBufferImmediate = function(e, t, i) {
        xe.initAttributes();
        var n = He.get(e);
        if (e.hasPositions && !n.position && (n.position = ge.createBuffer()),
        e.hasNormals && !n.normal && (n.normal = ge.createBuffer()),
        e.hasUvs && !n.uv && (n.uv = ge.createBuffer()),
        e.hasColors && !n.color && (n.color = ge.createBuffer()),
        t = t.getAttributes(),
        e.hasPositions && (ge.bindBuffer(ge.ARRAY_BUFFER, n.position),
        ge.bufferData(ge.ARRAY_BUFFER, e.positionArray, ge.DYNAMIC_DRAW),
        xe.enableAttribute(t.position),
        ge.vertexAttribPointer(t.position, 3, ge.FLOAT, !1, 0, 0)),
        e.hasNormals) {
            if (ge.bindBuffer(ge.ARRAY_BUFFER, n.normal),
            "MeshPhongMaterial" !== i.type && "MeshStandardMaterial" !== i.type && "MeshPhysicalMaterial" !== i.type && i.shading === THREE.FlatShading)
                for (var r = 0, a = 3 * e.count; a > r; r += 9) {
                    var o = e.normalArray
                      , s = (o[r + 0] + o[r + 3] + o[r + 6]) / 3
                      , c = (o[r + 1] + o[r + 4] + o[r + 7]) / 3
                      , h = (o[r + 2] + o[r + 5] + o[r + 8]) / 3;
                    o[r + 0] = s,
                    o[r + 1] = c,
                    o[r + 2] = h,
                    o[r + 3] = s,
                    o[r + 4] = c,
                    o[r + 5] = h,
                    o[r + 6] = s,
                    o[r + 7] = c,
                    o[r + 8] = h
                }
            ge.bufferData(ge.ARRAY_BUFFER, e.normalArray, ge.DYNAMIC_DRAW),
            xe.enableAttribute(t.normal),
            ge.vertexAttribPointer(t.normal, 3, ge.FLOAT, !1, 0, 0)
        }
        e.hasUvs && i.map && (ge.bindBuffer(ge.ARRAY_BUFFER, n.uv),
        ge.bufferData(ge.ARRAY_BUFFER, e.uvArray, ge.DYNAMIC_DRAW),
        xe.enableAttribute(t.uv),
        ge.vertexAttribPointer(t.uv, 2, ge.FLOAT, !1, 0, 0)),
        e.hasColors && i.vertexColors !== THREE.NoColors && (ge.bindBuffer(ge.ARRAY_BUFFER, n.color),
        ge.bufferData(ge.ARRAY_BUFFER, e.colorArray, ge.DYNAMIC_DRAW),
        xe.enableAttribute(t.color),
        ge.vertexAttribPointer(t.color, 3, ge.FLOAT, !1, 0, 0)),
        xe.disableUnusedAttributes(),
        ge.drawArrays(ge.TRIANGLES, 0, e.count),
        e.count = 0
    }
    ,
    this.renderBufferDirect = function(e, t, i, n, r, a) {
        m(n);
        var o = g(e, t, n, r)
          , s = !1;
        if (e = i.id + "_" + o.id + "_" + n.wireframe,
        e !== Y && (Y = e,
        s = !0),
        t = r.morphTargetInfluences,
        void 0 !== t) {
            e = [];
            for (var c = 0, s = t.length; s > c; c++) {
                var l = t[c];
                e.push([l, c])
            }
            e.sort(h),
            8 < e.length && (e.length = 8);
            for (var u = i.morphAttributes, c = 0, s = e.length; s > c; c++)
                l = e[c],
                N[c] = l[0],
                0 !== l[0] ? (t = l[1],
                !0 === n.morphTargets && u.position && i.addAttribute("morphTarget" + c, u.position[t]),
                !0 === n.morphNormals && u.normal && i.addAttribute("morphNormal" + c, u.normal[t])) : (!0 === n.morphTargets && i.removeAttribute("morphTarget" + c),
                !0 === n.morphNormals && i.removeAttribute("morphNormal" + c));
            o.getUniforms().setValue(ge, "morphTargetInfluences", N),
            s = !0
        }
        if (t = i.index,
        c = i.attributes.position,
        !0 === n.wireframe && (t = be.getWireframeAttribute(i)),
        null !== t ? (e = Se,
        e.setIndex(t)) : e = we,
        s) {
            var p, s = void 0;
            if (!(i instanceof THREE.InstancedBufferGeometry && (p = ye.get("ANGLE_instanced_arrays"),
            null === p))) {
                void 0 === s && (s = 0),
                xe.initAttributes();
                var d, l = i.attributes, o = o.getAttributes(), u = n.defaultAttributeValues;
                for (d in o) {
                    var f = o[d];
                    if (f >= 0) {
                        var E = l[d];
                        if (void 0 !== E) {
                            var v = ge.FLOAT
                              , T = E.array
                              , y = E.normalized;
                            T instanceof Float32Array ? v = ge.FLOAT : T instanceof Float64Array ? void 0 : T instanceof Uint16Array ? v = ge.UNSIGNED_SHORT : T instanceof Int16Array ? v = ge.SHORT : T instanceof Uint32Array ? v = ge.UNSIGNED_INT : T instanceof Int32Array ? v = ge.INT : T instanceof Int8Array ? v = ge.BYTE : T instanceof Uint8Array && (v = ge.UNSIGNED_BYTE);
                            var T = E.itemSize
                              , R = be.getAttributeBuffer(E);
                            if (E instanceof THREE.InterleavedBufferAttribute) {
                                var x = E.data
                                  , H = x.stride
                                  , E = E.offset;
                                x instanceof THREE.InstancedInterleavedBuffer ? (xe.enableAttributeAndDivisor(f, x.meshPerAttribute, p),
                                void 0 === i.maxInstancedCount && (i.maxInstancedCount = x.meshPerAttribute * x.count)) : xe.enableAttribute(f),
                                ge.bindBuffer(ge.ARRAY_BUFFER, R),
                                ge.vertexAttribPointer(f, T, v, y, H * x.array.BYTES_PER_ELEMENT, (s * H + E) * x.array.BYTES_PER_ELEMENT)
                            } else
                                E instanceof THREE.InstancedBufferAttribute ? (xe.enableAttributeAndDivisor(f, E.meshPerAttribute, p),
                                void 0 === i.maxInstancedCount && (i.maxInstancedCount = E.meshPerAttribute * E.count)) : xe.enableAttribute(f),
                                ge.bindBuffer(ge.ARRAY_BUFFER, R),
                                ge.vertexAttribPointer(f, T, v, y, 0, s * T * E.array.BYTES_PER_ELEMENT)
                        } else if (void 0 !== u && (v = u[d],
                        void 0 !== v))
                            switch (v.length) {
                            case 2:
                                ge.vertexAttrib2fv(f, v);
                                break;
                            case 3:
                                ge.vertexAttrib3fv(f, v);
                                break;
                            case 4:
                                ge.vertexAttrib4fv(f, v);
                                break;
                            default:
                                ge.vertexAttrib1fv(f, v)
                            }
                    }
                }
                xe.disableUnusedAttributes()
            }
            null !== t && ge.bindBuffer(ge.ELEMENT_ARRAY_BUFFER, be.getAttributeBuffer(t))
        }
        if (p = 1 / 0,
        null !== t ? p = t.count : void 0 !== c && (p = c.count),
        d = i.drawRange.start,
        t = i.drawRange.count,
        c = null !== a ? a.start : 0,
        s = null !== a ? a.count : 1 / 0,
        a = Math.max(0, d, c),
        p = Math.min(0 + p, d + t, c + s) - 1,
        p = Math.max(0, p - a + 1),
        r instanceof THREE.Mesh)
            if (!0 === n.wireframe)
                xe.setLineWidth(n.wireframeLinewidth * (null === j ? ne : 1)),
                e.setMode(ge.LINES);
            else
                switch (r.drawMode) {
                case THREE.TrianglesDrawMode:
                    e.setMode(ge.TRIANGLES);
                    break;
                case THREE.TriangleStripDrawMode:
                    e.setMode(ge.TRIANGLE_STRIP);
                    break;
                case THREE.TriangleFanDrawMode:
                    e.setMode(ge.TRIANGLE_FAN)
                }
        else
            r instanceof THREE.Line ? (n = n.linewidth,
            void 0 === n && (n = 1),
            xe.setLineWidth(n * (null === j ? ne : 1)),
            r instanceof THREE.LineSegments ? e.setMode(ge.LINES) : e.setMode(ge.LINE_STRIP)) : r instanceof THREE.Points && e.setMode(ge.POINTS);
        i instanceof THREE.InstancedBufferGeometry ? 0 < i.maxInstancedCount && e.renderInstances(i, a, p) : e.render(a, p)
    }
    ,
    this.render = function(e, t, i, n) {
        if (!1 == t instanceof THREE.Camera)
            ;
        else {
            var r = e.fog;
            Y = "",
            X = -1,
            q = null ,
            !0 === e.autoUpdate && e.updateMatrixWorld(),
            null === t.parent && t.updateMatrixWorld(),
            t.matrixWorldInverse.getInverse(t.matrixWorld),
            pe.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
            se.setFromMatrix(pe),
            B.length = 0,
            O = F = -1,
            V.length = 0,
            z.length = 0,
            le = this.localClippingEnabled,
            he = ce.init(this.clippingPlanes, le, t),
            f(e, t),
            D.length = F + 1,
            U.length = O + 1,
            !0 === G.sortObjects && (D.sort(l),
            U.sort(u)),
            he && ce.beginShadows();
            for (var a = B, o = 0, s = 0, c = a.length; c > s; s++) {
                var h = a[s];
                h.castShadow && (fe.shadows[o++] = h)
            }
            fe.shadows.length = o,
            Ae.render(e, t);
            for (var p, d, m, g, a = B, v = h = 0, T = 0, y = t.matrixWorldInverse, x = 0, H = 0, b = 0, M = 0, o = 0, s = a.length; s > o; o++)
                if (c = a[o],
                p = c.color,
                d = c.intensity,
                m = c.distance,
                g = c.shadow && c.shadow.map ? c.shadow.map.texture : null ,
                c instanceof THREE.AmbientLight)
                    h += p.r * d,
                    v += p.g * d,
                    T += p.b * d;
                else if (c instanceof THREE.DirectionalLight) {
                    var _ = _e.get(c);
                    _.color.copy(c.color).multiplyScalar(c.intensity),
                    _.direction.setFromMatrixPosition(c.matrixWorld),
                    de.setFromMatrixPosition(c.target.matrixWorld),
                    _.direction.sub(de),
                    _.direction.transformDirection(y),
                    (_.shadow = c.castShadow) && (_.shadowBias = c.shadow.bias,
                    _.shadowRadius = c.shadow.radius,
                    _.shadowMapSize = c.shadow.mapSize),
                    fe.directionalShadowMap[x] = g,
                    fe.directionalShadowMatrix[x] = c.shadow.matrix,
                    fe.directional[x++] = _
                } else
                    c instanceof THREE.SpotLight ? (_ = _e.get(c),
                    _.position.setFromMatrixPosition(c.matrixWorld),
                    _.position.applyMatrix4(y),
                    _.color.copy(p).multiplyScalar(d),
                    _.distance = m,
                    _.direction.setFromMatrixPosition(c.matrixWorld),
                    de.setFromMatrixPosition(c.target.matrixWorld),
                    _.direction.sub(de),
                    _.direction.transformDirection(y),
                    _.coneCos = Math.cos(c.angle),
                    _.penumbraCos = Math.cos(c.angle * (1 - c.penumbra)),
                    _.decay = 0 === c.distance ? 0 : c.decay,
                    (_.shadow = c.castShadow) && (_.shadowBias = c.shadow.bias,
                    _.shadowRadius = c.shadow.radius,
                    _.shadowMapSize = c.shadow.mapSize),
                    fe.spotShadowMap[b] = g,
                    fe.spotShadowMatrix[b] = c.shadow.matrix,
                    fe.spot[b++] = _) : c instanceof THREE.PointLight ? (_ = _e.get(c),
                    _.position.setFromMatrixPosition(c.matrixWorld),
                    _.position.applyMatrix4(y),
                    _.color.copy(c.color).multiplyScalar(c.intensity),
                    _.distance = c.distance,
                    _.decay = 0 === c.distance ? 0 : c.decay,
                    (_.shadow = c.castShadow) && (_.shadowBias = c.shadow.bias,
                    _.shadowRadius = c.shadow.radius,
                    _.shadowMapSize = c.shadow.mapSize),
                    fe.pointShadowMap[H] = g,
                    void 0 === fe.pointShadowMatrix[H] && (fe.pointShadowMatrix[H] = new THREE.Matrix4),
                    de.setFromMatrixPosition(c.matrixWorld).negate(),
                    fe.pointShadowMatrix[H].identity().setPosition(de),
                    fe.point[H++] = _) : c instanceof THREE.HemisphereLight && (_ = _e.get(c),
                    _.direction.setFromMatrixPosition(c.matrixWorld),
                    _.direction.transformDirection(y),
                    _.direction.normalize(),
                    _.skyColor.copy(c.color).multiplyScalar(d),
                    _.groundColor.copy(c.groundColor).multiplyScalar(d),
                    fe.hemi[M++] = _);
            fe.ambient[0] = h,
            fe.ambient[1] = v,
            fe.ambient[2] = T,
            fe.directional.length = x,
            fe.spot.length = b,
            fe.point.length = H,
            fe.hemi.length = M,
            fe.hash = x + "," + H + "," + b + "," + M + "," + fe.shadows.length,
            he && ce.endShadows(),
            me.calls = 0,
            me.vertices = 0,
            me.faces = 0,
            me.points = 0,
            void 0 === i && (i = null ),
            this.setRenderTarget(i),
            (this.autoClear || n) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil),
            e.overrideMaterial ? (n = e.overrideMaterial,
            E(D, t, r, n),
            E(U, t, r, n)) : (xe.setBlending(THREE.NoBlending),
            E(D, t, r),
            E(U, t, r)),
            Le.render(e, t),
            Ce.render(e, t, K),
            i && (e = i.texture,
            e.generateMipmaps && R(i) && e.minFilter !== THREE.NearestFilter && e.minFilter !== THREE.LinearFilter && (e = i instanceof THREE.WebGLRenderTargetCube ? ge.TEXTURE_CUBE_MAP : ge.TEXTURE_2D,
            i = He.get(i.texture).__webglTexture,
            xe.bindTexture(e, i),
            ge.generateMipmap(e),
            xe.bindTexture(e, null ))),
            xe.setDepthTest(!0),
            xe.setDepthWrite(!0),
            xe.setColorWrite(!0)
        }
    }
    ,
    this.setFaceCulling = function(e, t) {
        xe.setCullFace(e),
        xe.setFlipSided(t === THREE.FrontFaceDirectionCW)
    }
    ,
    this.allocTextureUnit = function() {
        var e = J;
        return e >= Re.maxTextures && void 0,
        J += 1,
        e
    }
    ,
    this.setTexture2D = function() {
        var e = !1;
        return function(t, i) {
            t instanceof THREE.WebGLRenderTarget && (e || (e = !0),
            t = t.texture);
            var n = t
              , r = He.get(n);
            if (0 < n.version && r.__version !== n.version) {
                var o = n.image;
                if (void 0 === o)
                    ;
                else if (!1 === o.complete)
                    ;
                else {
                    void 0 === r.__webglInit && (r.__webglInit = !0,
                    n.addEventListener("dispose", a),
                    r.__webglTexture = ge.createTexture(),
                    Ee.textures++),
                    xe.activeTexture(ge.TEXTURE0 + i),
                    xe.bindTexture(ge.TEXTURE_2D, r.__webglTexture),
                    ge.pixelStorei(ge.UNPACK_FLIP_Y_WEBGL, n.flipY),
                    ge.pixelStorei(ge.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha),
                    ge.pixelStorei(ge.UNPACK_ALIGNMENT, n.unpackAlignment);
                    var s = y(n.image, Re.maxTextureSize);
                    if ((n.wrapS !== THREE.ClampToEdgeWrapping || n.wrapT !== THREE.ClampToEdgeWrapping || n.minFilter !== THREE.NearestFilter && n.minFilter !== THREE.LinearFilter) && !1 === R(s))
                        if (o = s,
                        o instanceof HTMLImageElement || o instanceof HTMLCanvasElement) {
                            var c = document.createElement("canvas");
                            c.width = THREE.Math.nearestPowerOfTwo(o.width),
                            c.height = THREE.Math.nearestPowerOfTwo(o.height),
                            c.getContext("2d").drawImage(o, 0, 0, c.width, c.height),
                            s = c
                        } else
                            s = o;
                    var o = R(s)
                      , c = M(n.format)
                      , h = M(n.type);
                    T(ge.TEXTURE_2D, n, o);
                    var l = n.mipmaps;
                    if (n instanceof THREE.DepthTexture) {
                        if (l = ge.DEPTH_COMPONENT,
                        n.type === THREE.FloatType) {
                            if (!Te)
                                throw Error("Float Depth Texture only supported in WebGL2.0");
                            l = ge.DEPTH_COMPONENT32F
                        } else
                            Te && (l = ge.DEPTH_COMPONENT16);
                        xe.texImage2D(ge.TEXTURE_2D, 0, l, s.width, s.height, 0, c, h, null )
                    } else if (n instanceof THREE.DataTexture)
                        if (0 < l.length && o) {
                            for (var u = 0, p = l.length; p > u; u++)
                                s = l[u],
                                xe.texImage2D(ge.TEXTURE_2D, u, c, s.width, s.height, 0, c, h, s.data);
                            n.generateMipmaps = !1
                        } else
                            xe.texImage2D(ge.TEXTURE_2D, 0, c, s.width, s.height, 0, c, h, s.data);
                    else if (n instanceof THREE.CompressedTexture)
                        for (u = 0,
                        p = l.length; p > u; u++)
                            s = l[u],
                            n.format !== THREE.RGBAFormat && n.format !== THREE.RGBFormat ? -1 < xe.getCompressedTextureFormats().indexOf(c) ? xe.compressedTexImage2D(ge.TEXTURE_2D, u, c, s.width, s.height, 0, s.data) : void 0 : xe.texImage2D(ge.TEXTURE_2D, u, c, s.width, s.height, 0, c, h, s.data);
                    else if (0 < l.length && o) {
                        for (u = 0,
                        p = l.length; p > u; u++)
                            s = l[u],
                            xe.texImage2D(ge.TEXTURE_2D, u, c, c, h, s);
                        n.generateMipmaps = !1
                    } else
                        xe.texImage2D(ge.TEXTURE_2D, 0, c, c, h, s);
                    n.generateMipmaps && o && ge.generateMipmap(ge.TEXTURE_2D),
                    r.__version = n.version,
                    n.onUpdate && n.onUpdate(n)
                }
            } else
                xe.activeTexture(ge.TEXTURE0 + i),
                xe.bindTexture(ge.TEXTURE_2D, r.__webglTexture)
        }
    }(),
    this.setTexture = function() {
        var e = !1;
        return function(t, i) {
            e || (e = !0),
            G.setTexture2D(t, i)
        }
    }(),
    this.setTextureCube = function() {
        var e = !1;
        return function(t, i) {
            if (t instanceof THREE.WebGLRenderTargetCube && (e || (e = !0),
            t = t.texture),
            t instanceof THREE.CubeTexture || Array.isArray(t.image) && 6 === t.image.length) {
                var n = t
                  , r = He.get(n);
                if (6 === n.image.length)
                    if (0 < n.version && r.__version !== n.version) {
                        r.__image__webglTextureCube || (n.addEventListener("dispose", a),
                        r.__image__webglTextureCube = ge.createTexture(),
                        Ee.textures++),
                        xe.activeTexture(ge.TEXTURE0 + i),
                        xe.bindTexture(ge.TEXTURE_CUBE_MAP, r.__image__webglTextureCube),
                        ge.pixelStorei(ge.UNPACK_FLIP_Y_WEBGL, n.flipY);
                        for (var o = n instanceof THREE.CompressedTexture, s = n.image[0]instanceof THREE.DataTexture, c = [], h = 0; 6 > h; h++)
                            c[h] = !G.autoScaleCubemaps || o || s ? s ? n.image[h].image : n.image[h] : y(n.image[h], Re.maxCubemapSize);
                        var l = R(c[0])
                          , u = M(n.format)
                          , p = M(n.type);
                        for (T(ge.TEXTURE_CUBE_MAP, n, l),
                        h = 0; 6 > h; h++)
                            if (o)
                                for (var d, f = c[h].mipmaps, E = 0, m = f.length; m > E; E++)
                                    d = f[E],
                                    n.format !== THREE.RGBAFormat && n.format !== THREE.RGBFormat ? -1 < xe.getCompressedTextureFormats().indexOf(u) ? xe.compressedTexImage2D(ge.TEXTURE_CUBE_MAP_POSITIVE_X + h, E, u, d.width, d.height, 0, d.data) : void 0 : xe.texImage2D(ge.TEXTURE_CUBE_MAP_POSITIVE_X + h, E, u, d.width, d.height, 0, u, p, d.data);
                            else
                                s ? xe.texImage2D(ge.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, u, c[h].width, c[h].height, 0, u, p, c[h].data) : xe.texImage2D(ge.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, u, u, p, c[h]);
                        n.generateMipmaps && l && ge.generateMipmap(ge.TEXTURE_CUBE_MAP),
                        r.__version = n.version,
                        n.onUpdate && n.onUpdate(n)
                    } else
                        xe.activeTexture(ge.TEXTURE0 + i),
                        xe.bindTexture(ge.TEXTURE_CUBE_MAP, r.__image__webglTextureCube)
            } else
                n = t,
                xe.activeTexture(ge.TEXTURE0 + i),
                xe.bindTexture(ge.TEXTURE_CUBE_MAP, He.get(n).__webglTexture)
        }
    }(),
    this.getCurrentRenderTarget = function() {
        return j
    }
    ,
    this.setRenderTarget = function(e) {
        if ((j = e) && void 0 === He.get(e).__webglFramebuffer) {
            var t = He.get(e)
              , i = He.get(e.texture);
            e.addEventListener("dispose", o),
            i.__webglTexture = ge.createTexture(),
            Ee.textures++;
            var n = e instanceof THREE.WebGLRenderTargetCube
              , r = THREE.Math.isPowerOfTwo(e.width) && THREE.Math.isPowerOfTwo(e.height);
            if (n) {
                t.__webglFramebuffer = [];
                for (var a = 0; 6 > a; a++)
                    t.__webglFramebuffer[a] = ge.createFramebuffer()
            } else
                t.__webglFramebuffer = ge.createFramebuffer();
            if (n) {
                for (xe.bindTexture(ge.TEXTURE_CUBE_MAP, i.__webglTexture),
                T(ge.TEXTURE_CUBE_MAP, e.texture, r),
                a = 0; 6 > a; a++)
                    x(t.__webglFramebuffer[a], e, ge.COLOR_ATTACHMENT0, ge.TEXTURE_CUBE_MAP_POSITIVE_X + a);
                e.texture.generateMipmaps && r && ge.generateMipmap(ge.TEXTURE_CUBE_MAP),
                xe.bindTexture(ge.TEXTURE_CUBE_MAP, null )
            } else
                xe.bindTexture(ge.TEXTURE_2D, i.__webglTexture),
                T(ge.TEXTURE_2D, e.texture, r),
                x(t.__webglFramebuffer, e, ge.COLOR_ATTACHMENT0, ge.TEXTURE_2D),
                e.texture.generateMipmaps && r && ge.generateMipmap(ge.TEXTURE_2D),
                xe.bindTexture(ge.TEXTURE_2D, null );
            if (e.depthBuffer) {
                if (t = He.get(e),
                i = e instanceof THREE.WebGLRenderTargetCube,
                e.depthTexture) {
                    if (i)
                        throw Error("target.depthTexture not supported in Cube render targets");
                    if (e instanceof THREE.WebGLRenderTargetCube)
                        throw Error("Depth Texture with cube render targets is not supported!");
                    if (ge.bindFramebuffer(ge.FRAMEBUFFER, t.__webglFramebuffer),
                    !(e.depthTexture instanceof THREE.DepthTexture))
                        throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    He.get(e.depthTexture).__webglTexture && e.depthTexture.image.width === e.width && e.depthTexture.image.height === e.height || (e.depthTexture.image.width = e.width,
                    e.depthTexture.image.height = e.height,
                    e.depthTexture.needsUpdate = !0),
                    G.setTexture2D(e.depthTexture, 0),
                    t = He.get(e.depthTexture).__webglTexture,
                    ge.framebufferTexture2D(ge.FRAMEBUFFER, ge.DEPTH_ATTACHMENT, ge.TEXTURE_2D, t, 0)
                } else if (i)
                    for (t.__webglDepthbuffer = [],
                    i = 0; 6 > i; i++)
                        ge.bindFramebuffer(ge.FRAMEBUFFER, t.__webglFramebuffer[i]),
                        t.__webglDepthbuffer[i] = ge.createRenderbuffer(),
                        H(t.__webglDepthbuffer[i], e);
                else
                    ge.bindFramebuffer(ge.FRAMEBUFFER, t.__webglFramebuffer),
                    t.__webglDepthbuffer = ge.createRenderbuffer(),
                    H(t.__webglDepthbuffer, e);
                ge.bindFramebuffer(ge.FRAMEBUFFER, null )
            }
        }
        t = e instanceof THREE.WebGLRenderTargetCube,
        e ? (i = He.get(e),
        i = t ? i.__webglFramebuffer[e.activeCubeFace] : i.__webglFramebuffer,
        Z.copy(e.scissor),
        Q = e.scissorTest,
        K.copy(e.viewport)) : (i = null ,
        Z.copy(re).multiplyScalar(ne),
        Q = ae,
        K.copy(oe).multiplyScalar(ne)),
        W !== i && (ge.bindFramebuffer(ge.FRAMEBUFFER, i),
        W = i),
        xe.scissor(Z),
        xe.setScissorTest(Q),
        xe.viewport(K),
        t && (t = He.get(e.texture),
        ge.framebufferTexture2D(ge.FRAMEBUFFER, ge.COLOR_ATTACHMENT0, ge.TEXTURE_CUBE_MAP_POSITIVE_X + e.activeCubeFace, t.__webglTexture, e.activeMipMapLevel))
    }
    ,
    this.readRenderTargetPixels = function(e, t, i, n, r, a) {
        if (!1 == e instanceof THREE.WebGLRenderTarget)
            ;
        else {
            var o = He.get(e).__webglFramebuffer;
            if (o) {
                var s = !1;
                o !== W && (ge.bindFramebuffer(ge.FRAMEBUFFER, o),
                s = !0);
                try {
                    var c = e.texture;
                    c.format !== THREE.RGBAFormat && M(c.format) !== ge.getParameter(ge.IMPLEMENTATION_COLOR_READ_FORMAT) ? void 0 : (c.type === THREE.UnsignedByteType || M(c.type) === ge.getParameter(ge.IMPLEMENTATION_COLOR_READ_TYPE) || c.type === THREE.FloatType && ye.get("WEBGL_color_buffer_float") || c.type === THREE.HalfFloatType && ye.get("EXT_color_buffer_half_float")) && ge.checkFramebufferStatus(ge.FRAMEBUFFER) === ge.FRAMEBUFFER_COMPLETE ? t >= 0 && t <= e.width - n && i >= 0 && i <= e.height - r && ge.readPixels(t, i, n, r, M(c.format), M(c.type), a) : void 0
                } finally {
                    s && ge.bindFramebuffer(ge.FRAMEBUFFER, W)
                }
            }
        }
    }
}
,
THREE.WebGLRenderTarget = function(e, t, i) {
    this.uuid = THREE.Math.generateUUID(),
    this.width = e,
    this.height = t,
    this.scissor = new THREE.Vector4(0,0,e,t),
    this.scissorTest = !1,
    this.viewport = new THREE.Vector4(0,0,e,t),
    i = i || {},
    void 0 === i.minFilter && (i.minFilter = THREE.LinearFilter),
    this.texture = new THREE.Texture(void 0,void 0,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),
    this.depthBuffer = void 0 !== i.depthBuffer ? i.depthBuffer : !0,
    this.stencilBuffer = void 0 !== i.stencilBuffer ? i.stencilBuffer : !0,
    this.depthTexture = null
}
,
Object.assign(THREE.WebGLRenderTarget.prototype, THREE.EventDispatcher.prototype, {
    setSize: function(e, t) {
        this.width === e && this.height === t || (this.width = e,
        this.height = t,
        this.dispose()),
        this.viewport.set(0, 0, e, t),
        this.scissor.set(0, 0, e, t)
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(e) {
        return this.width = e.width,
        this.height = e.height,
        this.viewport.copy(e.viewport),
        this.texture = e.texture.clone(),
        this.depthBuffer = e.depthBuffer,
        this.stencilBuffer = e.stencilBuffer,
        this.depthTexture = e.depthTexture,
        this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}),
THREE.WebGLRenderTargetCube = function(e, t, i) {
    THREE.WebGLRenderTarget.call(this, e, t, i),
    this.activeMipMapLevel = this.activeCubeFace = 0
}
,
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype),
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube,
THREE.WebGLBufferRenderer = function(e, t, i) {
    var n;
    this.setMode = function(e) {
        n = e
    }
    ,
    this.render = function(t, r) {
        e.drawArrays(n, t, r),
        i.calls++,
        i.vertices += r,
        n === e.TRIANGLES && (i.faces += r / 3)
    }
    ,
    this.renderInstances = function(r) {
        var a = t.get("ANGLE_instanced_arrays");
        if (null === a)
            ;
        else {
            var o = r.attributes.position
              , s = 0
              , s = o instanceof THREE.InterleavedBufferAttribute ? o.data.count : o.count;
            a.drawArraysInstancedANGLE(n, 0, s, r.maxInstancedCount),
            i.calls++,
            i.vertices += s * r.maxInstancedCount,
            n === e.TRIANGLES && (i.faces += r.maxInstancedCount * s / 3)
        }
    }
}
,
THREE.WebGLClipping = function() {
    function e() {
        h.value !== n && (h.value = n,
        h.needsUpdate = r > 0),
        i.numPlanes = r
    }
    function t(e, t, n, r) {
        var a = null !== e ? e.length : 0
          , o = null ;
        if (0 !== a) {
            if (o = h.value,
            !0 !== r || null === o)
                for (r = n + 4 * a,
                t = t.matrixWorldInverse,
                c.getNormalMatrix(t),
                (null === o || o.length < r) && (o = new Float32Array(r)),
                r = 0; r !== a; ++r,
                n += 4)
                    s.copy(e[r]).applyMatrix4(t, c),
                    s.normal.toArray(o, n),
                    o[n + 3] = s.constant;
            h.value = o,
            h.needsUpdate = !0
        }
        return i.numPlanes = a,
        o
    }
    var i = this
      , n = null
      , r = 0
      , a = !1
      , o = !1
      , s = new THREE.Plane
      , c = new THREE.Matrix3
      , h = {
        value: null ,
        needsUpdate: !1
    };
    this.uniform = h,
    this.numPlanes = 0,
    this.init = function(e, i, o) {
        var s = 0 !== e.length || i || 0 !== r || a;
        return a = i,
        n = t(e, o, 0),
        r = e.length,
        s
    }
    ,
    this.beginShadows = function() {
        o = !0,
        t(null )
    }
    ,
    this.endShadows = function() {
        o = !1,
        e()
    }
    ,
    this.setState = function(i, s, c, l, u) {
        if (!a || null === i || 0 === i.length || o && !s)
            o ? t(null ) : e();
        else {
            s = o ? 0 : r;
            var p = 4 * s
              , d = l.clippingState || null ;
            for (h.value = d,
            d = t(i, c, p, u),
            i = 0; i !== p; ++i)
                d[i] = n[i];
            l.clippingState = d,
            this.numPlanes += s
        }
    }
}
,
THREE.WebGLIndexedBufferRenderer = function(e, t, i) {
    var n, r, a;
    this.setMode = function(e) {
        n = e
    }
    ,
    this.setIndex = function(i) {
        i.array instanceof Uint32Array && t.get("OES_element_index_uint") ? (r = e.UNSIGNED_INT,
        a = 4) : (r = e.UNSIGNED_SHORT,
        a = 2)
    }
    ,
    this.render = function(t, o) {
        e.drawElements(n, o, r, t * a),
        i.calls++,
        i.vertices += o,
        n === e.TRIANGLES && (i.faces += o / 3)
    }
    ,
    this.renderInstances = function(o, s, c) {
        var h = t.get("ANGLE_instanced_arrays");
        null === h ? void 0 : (h.drawElementsInstancedANGLE(n, c, r, s * a, o.maxInstancedCount),
        i.calls++,
        i.vertices += c * o.maxInstancedCount,
        n === e.TRIANGLES && (i.faces += o.maxInstancedCount * c / 3))
    }
}
,
THREE.WebGLExtensions = function(e) {
    var t = {};
    this.get = function(i) {
        if (void 0 !== t[i])
            return t[i];
        var n;
        switch (i) {
        case "WEBGL_depth_texture":
            n = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
            break;
        case "EXT_texture_filter_anisotropic":
            n = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
        case "WEBGL_compressed_texture_s3tc":
            n = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
        case "WEBGL_compressed_texture_pvrtc":
            n = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
        case "WEBGL_compressed_texture_etc1":
            n = e.getExtension("WEBGL_compressed_texture_etc1");
            break;
        default:
            n = e.getExtension(i)
        }
        return t[i] = n
    }
}
,
THREE.WebGLCapabilities = function(e, t, i) {
    function n(t) {
        if ("highp" === t) {
            if (0 < e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision && 0 < e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision)
                return "highp";
            t = "mediump"
        }
        return "mediump" === t && 0 < e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision && 0 < e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision ? "mediump" : "lowp"
    }
    this.getMaxPrecision = n,
    this.precision = void 0 !== i.precision ? i.precision : "highp",
    this.logarithmicDepthBuffer = void 0 !== i.logarithmicDepthBuffer ? i.logarithmicDepthBuffer : !1,
    this.maxTextures = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
    this.maxVertexTextures = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    this.maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE),
    this.maxCubemapSize = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),
    this.maxAttributes = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    this.maxVertexUniforms = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),
    this.maxVaryings = e.getParameter(e.MAX_VARYING_VECTORS),
    this.maxFragmentUniforms = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
    this.vertexTextures = 0 < this.maxVertexTextures,
    this.floatFragmentTextures = !!t.get("OES_texture_float"),
    this.floatVertexTextures = this.vertexTextures && this.floatFragmentTextures,
    i = n(this.precision),
    i !== this.precision && (this.precision = i),
    this.logarithmicDepthBuffer && (this.logarithmicDepthBuffer = !!t.get("EXT_frag_depth"))
}
,
THREE.WebGLGeometries = function(e, t, i) {
    function n(e) {
        var o = e.target;
        e = a[o.id],
        null !== e.index && r(e.index);
        var s, c = e.attributes;
        for (s in c)
            r(c[s]);
        o.removeEventListener("dispose", n),
        delete a[o.id],
        s = t.get(o),
        s.wireframe && r(s.wireframe),
        t["delete"](o),
        o = t.get(e),
        o.wireframe && r(o.wireframe),
        t["delete"](e),
        i.memory.geometries--
    }
    function r(i) {
        var n;
        n = i instanceof THREE.InterleavedBufferAttribute ? t.get(i.data).__webglBuffer : t.get(i).__webglBuffer,
        void 0 !== n && (e.deleteBuffer(n),
        i instanceof THREE.InterleavedBufferAttribute ? t["delete"](i.data) : t["delete"](i))
    }
    var a = {};
    this.get = function(e) {
        var t = e.geometry;
        if (void 0 !== a[t.id])
            return a[t.id];
        t.addEventListener("dispose", n);
        var r;
        return t instanceof THREE.BufferGeometry ? r = t : t instanceof THREE.Geometry && (void 0 === t._bufferGeometry && (t._bufferGeometry = (new THREE.BufferGeometry).setFromObject(e)),
        r = t._bufferGeometry),
        a[t.id] = r,
        i.memory.geometries++,
        r
    }
}
,
THREE.WebGLLights = function() {
    var e = {};
    this.get = function(t) {
        if (void 0 !== e[t.id])
            return e[t.id];
        var i;
        switch (t.type) {
        case "DirectionalLight":
            i = {
                direction: new THREE.Vector3,
                color: new THREE.Color,
                shadow: !1,
                shadowBias: 0,
                shadowRadius: 1,
                shadowMapSize: new THREE.Vector2
            };
            break;
        case "SpotLight":
            i = {
                position: new THREE.Vector3,
                direction: new THREE.Vector3,
                color: new THREE.Color,
                distance: 0,
                coneCos: 0,
                penumbraCos: 0,
                decay: 0,
                shadow: !1,
                shadowBias: 0,
                shadowRadius: 1,
                shadowMapSize: new THREE.Vector2
            };
            break;
        case "PointLight":
            i = {
                position: new THREE.Vector3,
                color: new THREE.Color,
                distance: 0,
                decay: 0,
                shadow: !1,
                shadowBias: 0,
                shadowRadius: 1,
                shadowMapSize: new THREE.Vector2
            };
            break;
        case "HemisphereLight":
            i = {
                direction: new THREE.Vector3,
                skyColor: new THREE.Color,
                groundColor: new THREE.Color
            }
        }
        return e[t.id] = i
    }
}
,
THREE.WebGLObjects = function(e, t, i) {
    function n(i, n) {
        var r = i instanceof THREE.InterleavedBufferAttribute ? i.data : i
          , a = t.get(r);
        void 0 === a.__webglBuffer ? (a.__webglBuffer = e.createBuffer(),
        e.bindBuffer(n, a.__webglBuffer),
        e.bufferData(n, r.array, r.dynamic ? e.DYNAMIC_DRAW : e.STATIC_DRAW),
        a.version = r.version) : a.version !== r.version && (e.bindBuffer(n, a.__webglBuffer),
        !1 === r.dynamic || -1 === r.updateRange.count ? e.bufferSubData(n, 0, r.array) : 0 === r.updateRange.count ? void 0 : (e.bufferSubData(n, r.updateRange.offset * r.array.BYTES_PER_ELEMENT, r.array.subarray(r.updateRange.offset, r.updateRange.offset + r.updateRange.count)),
        r.updateRange.count = 0),
        a.version = r.version)
    }
    function r(e, t, i) {
        if (t > i) {
            var n = t;
            t = i,
            i = n
        }
        return n = e[t],
        void 0 === n ? (e[t] = [i],
        !0) : -1 === n.indexOf(i) ? (n.push(i),
        !0) : !1
    }
    var a = new THREE.WebGLGeometries(e,t,i);
    this.getAttributeBuffer = function(e) {
        return e instanceof THREE.InterleavedBufferAttribute ? t.get(e.data).__webglBuffer : t.get(e).__webglBuffer
    }
    ,
    this.getWireframeAttribute = function(i) {
        var a = t.get(i);
        if (void 0 !== a.wireframe)
            return a.wireframe;
        var o = []
          , s = i.index
          , c = i.attributes;
        if (i = c.position,
        null !== s)
            for (var c = {}, s = s.array, h = 0, l = s.length; l > h; h += 3) {
                var u = s[h + 0]
                  , p = s[h + 1]
                  , d = s[h + 2];
                r(c, u, p) && o.push(u, p),
                r(c, p, d) && o.push(p, d),
                r(c, d, u) && o.push(d, u)
            }
        else
            for (s = c.position.array,
            h = 0,
            l = s.length / 3 - 1; l > h; h += 3)
                u = h + 0,
                p = h + 1,
                d = h + 2,
                o.push(u, p, p, d, d, u);
        return o = new THREE.BufferAttribute(new (65535 < i.count ? Uint32Array : Uint16Array)(o),1),
        n(o, e.ELEMENT_ARRAY_BUFFER),
        a.wireframe = o
    }
    ,
    this.update = function(t) {
        var i = a.get(t);
        t.geometry instanceof THREE.Geometry && i.updateFromObject(t),
        t = i.index;
        var r = i.attributes;
        null !== t && n(t, e.ELEMENT_ARRAY_BUFFER);
        for (var o in r)
            n(r[o], e.ARRAY_BUFFER);
        t = i.morphAttributes;
        for (o in t)
            for (var r = t[o], s = 0, c = r.length; c > s; s++)
                n(r[s], e.ARRAY_BUFFER);
        return i
    }
}
,
THREE.WebGLProgram = function() {
    function e(e) {
        switch (e) {
        case THREE.LinearEncoding:
            return ["Linear", "( value )"];
        case THREE.sRGBEncoding:
            return ["sRGB", "( value )"];
        case THREE.RGBEEncoding:
            return ["RGBE", "( value )"];
        case THREE.RGBM7Encoding:
            return ["RGBM", "( value, 7.0 )"];
        case THREE.RGBM16Encoding:
            return ["RGBM", "( value, 16.0 )"];
        case THREE.RGBDEncoding:
            return ["RGBD", "( value, 256.0 )"];
        case THREE.GammaEncoding:
            return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
        default:
            throw Error("unsupported encoding: " + e)
        }
    }
    function t(t, i) {
        var n = e(i);
        return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }"
    }
    function i(t, i) {
        var n = e(i);
        return "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }"
    }
    function n(e, t) {
        var i;
        switch (t) {
        case THREE.LinearToneMapping:
            i = "Linear";
            break;
        case THREE.ReinhardToneMapping:
            i = "Reinhard";
            break;
        case THREE.Uncharted2ToneMapping:
            i = "Uncharted2";
            break;
        case THREE.CineonToneMapping:
            i = "OptimizedCineon";
            break;
        default:
            throw Error("unsupported toneMapping: " + t)
        }
        return "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }"
    }
    function r(e, t, i) {
        return e = e || {},
        [e.derivatives || t.envMapCubeUV || t.bumpMap || t.normalMap || t.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (e.fragDepth || t.logarithmicDepthBuffer) && i.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", e.drawBuffers && i.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (e.shaderTextureLOD || t.envMap) && i.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(o).join("\n")
    }
    function a(e) {
        var t, i = [];
        for (t in e) {
            var n = e[t];
            !1 !== n && i.push("#define " + t + " " + n)
        }
        return i.join("\n")
    }
    function o(e) {
        return "" !== e
    }
    function s(e, t) {
        return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    }
    function c(e) {
        return e.replace(/#include +<([\w\d.]+)>/g, function(e, t) {
            var i = THREE.ShaderChunk[t];
            if (void 0 === i)
                throw Error("Can not resolve #include <" + t + ">");
            return c(i)
        })
    }
    function h(e) {
        return e.replace(/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g, function(e, t, i, n) {
            for (e = "",
            t = parseInt(t); t < parseInt(i); t++)
                e += n.replace(/\[ i \]/g, "[ " + t + " ]");
            return e
        })
    }
    var l = 0;
    return function(e, u, p, d) {
        var f = e.context
          , E = p.extensions
          , m = p.defines
          , g = p.__webglShader.vertexShader
          , v = p.__webglShader.fragmentShader
          , T = "SHADOWMAP_TYPE_BASIC";
        d.shadowMapType === THREE.PCFShadowMap ? T = "SHADOWMAP_TYPE_PCF" : d.shadowMapType === THREE.PCFSoftShadowMap && (T = "SHADOWMAP_TYPE_PCF_SOFT");
        var y = "ENVMAP_TYPE_CUBE"
          , R = "ENVMAP_MODE_REFLECTION"
          , x = "ENVMAP_BLENDING_MULTIPLY";
        if (d.envMap) {
            switch (p.envMap.mapping) {
            case THREE.CubeReflectionMapping:
            case THREE.CubeRefractionMapping:
                y = "ENVMAP_TYPE_CUBE";
                break;
            case THREE.CubeUVReflectionMapping:
            case THREE.CubeUVRefractionMapping:
                y = "ENVMAP_TYPE_CUBE_UV";
                break;
            case THREE.EquirectangularReflectionMapping:
            case THREE.EquirectangularRefractionMapping:
                y = "ENVMAP_TYPE_EQUIREC";
                break;
            case THREE.SphericalReflectionMapping:
                y = "ENVMAP_TYPE_SPHERE"
            }
            switch (p.envMap.mapping) {
            case THREE.CubeRefractionMapping:
            case THREE.EquirectangularRefractionMapping:
                R = "ENVMAP_MODE_REFRACTION"
            }
            switch (p.combine) {
            case THREE.MultiplyOperation:
                x = "ENVMAP_BLENDING_MULTIPLY";
                break;
            case THREE.MixOperation:
                x = "ENVMAP_BLENDING_MIX";
                break;
            case THREE.AddOperation:
                x = "ENVMAP_BLENDING_ADD"
            }
        }
        var H = 0 < e.gammaFactor ? e.gammaFactor : 1
          , E = r(E, d, e.extensions)
          , b = a(m)
          , M = f.createProgram();
        p instanceof THREE.RawShaderMaterial ? T = m = "" : (m = ["precision " + d.precision + " float;", "precision " + d.precision + " int;", "#define SHADER_NAME " + p.__webglShader.name, b, d.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + H, "#define MAX_BONES " + d.maxBones, d.map ? "#define USE_MAP" : "", d.envMap ? "#define USE_ENVMAP" : "", d.envMap ? "#define " + R : "", d.lightMap ? "#define USE_LIGHTMAP" : "", d.aoMap ? "#define USE_AOMAP" : "", d.emissiveMap ? "#define USE_EMISSIVEMAP" : "", d.bumpMap ? "#define USE_BUMPMAP" : "", d.normalMap ? "#define USE_NORMALMAP" : "", d.displacementMap && d.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", d.specularMap ? "#define USE_SPECULARMAP" : "", d.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", d.metalnessMap ? "#define USE_METALNESSMAP" : "", d.alphaMap ? "#define USE_ALPHAMAP" : "", d.vertexColors ? "#define USE_COLOR" : "", d.flatShading ? "#define FLAT_SHADED" : "", d.skinning ? "#define USE_SKINNING" : "", d.useVertexTexture ? "#define BONE_TEXTURE" : "", d.morphTargets ? "#define USE_MORPHTARGETS" : "", d.morphNormals && !1 === d.flatShading ? "#define USE_MORPHNORMALS" : "", d.doubleSided ? "#define DOUBLE_SIDED" : "", d.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + d.numClippingPlanes, d.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", d.shadowMapEnabled ? "#define " + T : "", d.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", d.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", d.logarithmicDepthBuffer && e.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "	attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", "\n"].filter(o).join("\n"),
        T = [E, "precision " + d.precision + " float;", "precision " + d.precision + " int;", "#define SHADER_NAME " + p.__webglShader.name, b, d.alphaTest ? "#define ALPHATEST " + d.alphaTest : "", "#define GAMMA_FACTOR " + H, d.useFog && d.fog ? "#define USE_FOG" : "", d.useFog && d.fogExp ? "#define FOG_EXP2" : "", d.map ? "#define USE_MAP" : "", d.envMap ? "#define USE_ENVMAP" : "", d.envMap ? "#define " + y : "", d.envMap ? "#define " + R : "", d.envMap ? "#define " + x : "", d.lightMap ? "#define USE_LIGHTMAP" : "", d.aoMap ? "#define USE_AOMAP" : "", d.emissiveMap ? "#define USE_EMISSIVEMAP" : "", d.bumpMap ? "#define USE_BUMPMAP" : "", d.normalMap ? "#define USE_NORMALMAP" : "", d.specularMap ? "#define USE_SPECULARMAP" : "", d.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", d.metalnessMap ? "#define USE_METALNESSMAP" : "", d.alphaMap ? "#define USE_ALPHAMAP" : "", d.vertexColors ? "#define USE_COLOR" : "", d.flatShading ? "#define FLAT_SHADED" : "", d.doubleSided ? "#define DOUBLE_SIDED" : "", d.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + d.numClippingPlanes, d.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", d.shadowMapEnabled ? "#define " + T : "", d.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", d.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", d.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", d.logarithmicDepthBuffer && e.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", d.envMap && e.extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", d.toneMapping !== THREE.NoToneMapping ? "#define TONE_MAPPING" : "", d.toneMapping !== THREE.NoToneMapping ? THREE.ShaderChunk.tonemapping_pars_fragment : "", d.toneMapping !== THREE.NoToneMapping ? n("toneMapping", d.toneMapping) : "", d.outputEncoding || d.mapEncoding || d.envMapEncoding || d.emissiveMapEncoding ? THREE.ShaderChunk.encodings_pars_fragment : "", d.mapEncoding ? t("mapTexelToLinear", d.mapEncoding) : "", d.envMapEncoding ? t("envMapTexelToLinear", d.envMapEncoding) : "", d.emissiveMapEncoding ? t("emissiveMapTexelToLinear", d.emissiveMapEncoding) : "", d.outputEncoding ? i("linearToOutputTexel", d.outputEncoding) : "", d.depthPacking ? "#define DEPTH_PACKING " + p.depthPacking : "", "\n"].filter(o).join("\n")),
        g = c(g, d),
        g = s(g, d),
        v = c(v, d),
        v = s(v, d),
        !1 == p instanceof THREE.ShaderMaterial && (g = h(g),
        v = h(v)),
        v = T + v,
        g = THREE.WebGLShader(f, f.VERTEX_SHADER, m + g),
        v = THREE.WebGLShader(f, f.FRAGMENT_SHADER, v),
        f.attachShader(M, g),
        f.attachShader(M, v),
        void 0 !== p.index0AttributeName ? f.bindAttribLocation(M, 0, p.index0AttributeName) : !0 === d.morphTargets && f.bindAttribLocation(M, 0, "position"),
        f.linkProgram(M),
        d = f.getProgramInfoLog(M),
        y = f.getShaderInfoLog(g),
        R = f.getShaderInfoLog(v),
        H = x = !0,
        !1 === f.getProgramParameter(M, f.LINK_STATUS) ? void (x = !1) : "" !== d || "" !== y && "" !== R || (H = !1),
        H && (this.diagnostics = {
            runnable: x,
            material: p,
            programLog: d,
            vertexShader: {
                log: y,
                prefix: m
            },
            fragmentShader: {
                log: R,
                prefix: T
            }
        }),
        f.deleteShader(g),
        f.deleteShader(v);
        var _;
        this.getUniforms = function() {
            return void 0 === _ && (_ = new THREE.WebGLUniforms(f,M,e)),
            _
        }
        ;
        var w;
        return this.getAttributes = function() {
            if (void 0 === w) {
                for (var e = {}, t = f.getProgramParameter(M, f.ACTIVE_ATTRIBUTES), i = 0; t > i; i++) {
                    var n = f.getActiveAttrib(M, i).name;
                    e[n] = f.getAttribLocation(M, n)
                }
                w = e
            }
            return w
        }
        ,
        this.destroy = function() {
            f.deleteProgram(M),
            this.program = void 0
        }
        ,
        Object.defineProperties(this, {
            uniforms: {
                get: function() {
                    return this.getUniforms()
                }
            },
            attributes: {
                get: function() {
                    return this.getAttributes()
                }
            }
        }),
        this.id = l++,
        this.code = u,
        this.usedTimes = 1,
        this.program = M,
        this.vertexShader = g,
        this.fragmentShader = v,
        this
    }
}(),
THREE.WebGLPrograms = function(e, t) {
    function i(e, t) {
        var i;
        return e ? e instanceof THREE.Texture ? i = e.encoding : e instanceof THREE.WebGLRenderTarget && (i = e.texture.encoding) : i = THREE.LinearEncoding,
        i === THREE.LinearEncoding && t && (i = THREE.GammaEncoding),
        i
    }
    var n = []
      , r = {
        MeshDepthMaterial: "depth",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points"
    }
      , a = "precision supportsVertexTextures map mapEncoding envMap envMapMode envMapEncoding lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap displacementMap specularMap roughnessMap metalnessMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes depthPacking".split(" ");
    this.getParameters = function(n, a, o, s, c) {
        var h, l = r[n.type];
        t.floatVertexTextures && c && c.skeleton && c.skeleton.useVertexTexture ? h = 1024 : (h = Math.floor((t.maxVertexUniforms - 20) / 4),
        void 0 !== c && c instanceof THREE.SkinnedMesh && (h = Math.min(c.skeleton.bones.length, h),
        h < c.skeleton.bones.length && void 0));
        var u = e.getPrecision();
        null !== n.precision && (u = t.getMaxPrecision(n.precision),
        u !== n.precision && void 0);
        var p = e.getCurrentRenderTarget();
        return {
            shaderID: l,
            precision: u,
            supportsVertexTextures: t.vertexTextures,
            outputEncoding: i(p ? p.texture : null , e.gammaOutput),
            map: !!n.map,
            mapEncoding: i(n.map, e.gammaInput),
            envMap: !!n.envMap,
            envMapMode: n.envMap && n.envMap.mapping,
            envMapEncoding: i(n.envMap, e.gammaInput),
            envMapCubeUV: !!n.envMap && (n.envMap.mapping === THREE.CubeUVReflectionMapping || n.envMap.mapping === THREE.CubeUVRefractionMapping),
            lightMap: !!n.lightMap,
            aoMap: !!n.aoMap,
            emissiveMap: !!n.emissiveMap,
            emissiveMapEncoding: i(n.emissiveMap, e.gammaInput),
            bumpMap: !!n.bumpMap,
            normalMap: !!n.normalMap,
            displacementMap: !!n.displacementMap,
            roughnessMap: !!n.roughnessMap,
            metalnessMap: !!n.metalnessMap,
            specularMap: !!n.specularMap,
            alphaMap: !!n.alphaMap,
            combine: n.combine,
            vertexColors: n.vertexColors,
            fog: o,
            useFog: n.fog,
            fogExp: o instanceof THREE.FogExp2,
            flatShading: n.shading === THREE.FlatShading,
            sizeAttenuation: n.sizeAttenuation,
            logarithmicDepthBuffer: t.logarithmicDepthBuffer,
            skinning: n.skinning,
            maxBones: h,
            useVertexTexture: t.floatVertexTextures && c && c.skeleton && c.skeleton.useVertexTexture,
            morphTargets: n.morphTargets,
            morphNormals: n.morphNormals,
            maxMorphTargets: e.maxMorphTargets,
            maxMorphNormals: e.maxMorphNormals,
            numDirLights: a.directional.length,
            numPointLights: a.point.length,
            numSpotLights: a.spot.length,
            numHemiLights: a.hemi.length,
            numClippingPlanes: s,
            shadowMapEnabled: e.shadowMap.enabled && c.receiveShadow && 0 < a.shadows.length,
            shadowMapType: e.shadowMap.type,
            toneMapping: e.toneMapping,
            physicallyCorrectLights: e.physicallyCorrectLights,
            premultipliedAlpha: n.premultipliedAlpha,
            alphaTest: n.alphaTest,
            doubleSided: n.side === THREE.DoubleSide,
            flipSided: n.side === THREE.BackSide,
            depthPacking: void 0 !== n.depthPacking ? n.depthPacking : !1
        }
    }
    ,
    this.getProgramCode = function(e, t) {
        var i = [];
        if (t.shaderID ? i.push(t.shaderID) : (i.push(e.fragmentShader),
        i.push(e.vertexShader)),
        void 0 !== e.defines)
            for (var n in e.defines)
                i.push(n),
                i.push(e.defines[n]);
        for (n = 0; n < a.length; n++)
            i.push(t[a[n]]);
        return i.join()
    }
    ,
    this.acquireProgram = function(t, i, r) {
        for (var a, o = 0, s = n.length; s > o; o++) {
            var c = n[o];
            if (c.code === r) {
                a = c,
                ++a.usedTimes;
                break
            }
        }
        return void 0 === a && (a = new THREE.WebGLProgram(e,r,t,i),
        n.push(a)),
        a
    }
    ,
    this.releaseProgram = function(e) {
        if (0 === --e.usedTimes) {
            var t = n.indexOf(e);
            n[t] = n[n.length - 1],
            n.pop(),
            e.destroy()
        }
    }
    ,
    this.programs = n
}
,
THREE.WebGLProperties = function() {
    var e = {};
    this.get = function(t) {
        t = t.uuid;
        var i = e[t];
        return void 0 === i && (i = {},
        e[t] = i),
        i
    }
    ,
    this["delete"] = function(t) {
        delete e[t.uuid]
    }
    ,
    this.clear = function() {
        e = {}
    }
}
,
THREE.WebGLShader = function() {
    return function(e, t, i) {
        var n = e.createShader(t);
        return e.shaderSource(n, i),
        e.compileShader(n),
        !1 === e.getShaderParameter(n, e.COMPILE_STATUS) && void 0,
        "" !== e.getShaderInfoLog(n) && void 0,
        n
    }
}(),
THREE.WebGLShadowMap = function(e, t, i) {
    function n(t, i, n, r) {
        var a = t.geometry
          , o = null
          , o = f
          , s = t.customDepthMaterial;
        return n && (o = E,
        s = t.customDistanceMaterial),
        s ? o = s : (t = t instanceof THREE.SkinnedMesh && i.skinning,
        s = 0,
        void 0 !== a.morphTargets && 0 < a.morphTargets.length && i.morphTargets && (s |= 1),
        t && (s |= 2),
        o = o[s]),
        e.localClippingEnabled && !0 === i.clipShadows && 0 !== i.clippingPlanes.length && (s = o.uuid,
        a = i.uuid,
        t = m[s],
        void 0 === t && (t = {},
        m[s] = t),
        s = t[a],
        void 0 === s && (s = o.clone(),
        t[a] = s),
        o = s),
        o.visible = i.visible,
        o.wireframe = i.wireframe,
        a = i.side,
        _.renderSingleSided && a == THREE.DoubleSide && (a = THREE.FrontSide),
        _.renderReverseSided && (a === THREE.FrontSide ? a = THREE.BackSide : a === THREE.BackSide && (a = THREE.FrontSide)),
        o.side = a,
        o.clipShadows = i.clipShadows,
        o.clippingPlanes = i.clippingPlanes,
        o.wireframeLinewidth = i.wireframeLinewidth,
        o.linewidth = i.linewidth,
        n && void 0 !== o.uniforms.lightPos && o.uniforms.lightPos.value.copy(r),
        o
    }
    function r(e, t, i) {
        if (!1 !== e.visible) {
            e.layers.test(t.layers) && (e instanceof THREE.Mesh || e instanceof THREE.Line || e instanceof THREE.Points) && e.castShadow && (!1 === e.frustumCulled || !0 === s.intersectsObject(e)) && !0 === e.material.visible && (e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld),
            d.push(e)),
            e = e.children;
            for (var n = 0, a = e.length; a > n; n++)
                r(e[n], t, i)
        }
    }
    var a = e.context
      , o = e.state
      , s = new THREE.Frustum
      , c = new THREE.Matrix4
      , h = t.shadows
      , l = new THREE.Vector2
      , u = new THREE.Vector3
      , p = new THREE.Vector3
      , d = []
      , f = Array(4)
      , E = Array(4)
      , m = {}
      , g = [new THREE.Vector3(1,0,0), new THREE.Vector3(-1,0,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1), new THREE.Vector3(0,1,0), new THREE.Vector3(0,-1,0)]
      , v = [new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1)]
      , T = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4];
    t = new THREE.MeshDepthMaterial,
    t.depthPacking = THREE.RGBADepthPacking,
    t.clipping = !0;
    for (var y = THREE.ShaderLib.distanceRGBA, R = THREE.UniformsUtils.clone(y.uniforms), x = 0; 4 !== x; ++x) {
        var H = 0 !== (1 & x)
          , b = 0 !== (2 & x)
          , M = t.clone();
        M.morphTargets = H,
        M.skinning = b,
        f[x] = M,
        H = new THREE.ShaderMaterial({
            defines: {
                USE_SHADOWMAP: ""
            },
            uniforms: R,
            vertexShader: y.vertexShader,
            fragmentShader: y.fragmentShader,
            morphTargets: H,
            skinning: b,
            clipping: !0
        }),
        E[x] = H
    }
    var _ = this;
    this.enabled = !1,
    this.autoUpdate = !0,
    this.needsUpdate = !1,
    this.type = THREE.PCFShadowMap,
    this.renderSingleSided = this.renderReverseSided = !0,
    this.render = function(t, f) {
        if (!1 !== _.enabled && (!1 !== _.autoUpdate || !1 !== _.needsUpdate) && 0 !== h.length) {
            o.clearColor(1, 1, 1, 1),
            o.disable(a.BLEND),
            o.setDepthTest(!0),
            o.setScissorTest(!1);
            for (var E, m, y = 0, R = h.length; R > y; y++) {
                var x = h[y]
                  , H = x.shadow;
                if (void 0 === H)
                    ;
                else {
                    var b = H.camera;
                    if (l.copy(H.mapSize),
                    x instanceof THREE.PointLight) {
                        E = 6,
                        m = !0;
                        var M = l.x
                          , w = l.y;
                        T[0].set(2 * M, w, M, w),
                        T[1].set(0, w, M, w),
                        T[2].set(3 * M, w, M, w),
                        T[3].set(M, w, M, w),
                        T[4].set(3 * M, 0, M, w),
                        T[5].set(M, 0, M, w),
                        l.x *= 4,
                        l.y *= 2
                    } else
                        E = 1,
                        m = !1;
                    for (null === H.map && (H.map = new THREE.WebGLRenderTarget(l.x,l.y,{
                        minFilter: THREE.NearestFilter,
                        magFilter: THREE.NearestFilter,
                        format: THREE.RGBAFormat
                    }),
                    b.updateProjectionMatrix()),
                    H instanceof THREE.SpotLightShadow && H.update(x),
                    M = H.map,
                    H = H.matrix,
                    p.setFromMatrixPosition(x.matrixWorld),
                    b.position.copy(p),
                    e.setRenderTarget(M),
                    e.clear(),
                    M = 0; E > M; M++) {
                        m ? (u.copy(b.position),
                        u.add(g[M]),
                        b.up.copy(v[M]),
                        b.lookAt(u),
                        o.viewport(T[M])) : (u.setFromMatrixPosition(x.target.matrixWorld),
                        b.lookAt(u)),
                        b.updateMatrixWorld(),
                        b.matrixWorldInverse.getInverse(b.matrixWorld),
                        H.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
                        H.multiply(b.projectionMatrix),
                        H.multiply(b.matrixWorldInverse),
                        c.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse),
                        s.setFromMatrix(c),
                        d.length = 0,
                        r(t, f, b);
                        for (var w = 0, S = d.length; S > w; w++) {
                            var A = d[w]
                              , L = i.update(A)
                              , C = A.material;
                            if (C instanceof THREE.MultiMaterial)
                                for (var P = L.groups, C = C.materials, I = 0, B = P.length; B > I; I++) {
                                    var D = P[I]
                                      , F = C[D.materialIndex];
                                    !0 === F.visible && (F = n(A, F, m, p),
                                    e.renderBufferDirect(b, null , L, F, A, D))
                                }
                            else
                                F = n(A, C, m, p),
                                e.renderBufferDirect(b, null , L, F, A, null )
                        }
                    }
                }
            }
            E = e.getClearColor(),
            m = e.getClearAlpha(),
            e.setClearColor(E, m),
            _.needsUpdate = !1
        }
    }
}
,
THREE.WebGLState = function(e, t, i) {
    function n(t, i, n) {
        var r = new Uint8Array(3)
          , a = e.createTexture();
        for (e.bindTexture(t, a),
        e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST),
        e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST),
        t = 0; n > t; t++)
            e.texImage2D(i + t, 0, e.RGB, 1, 1, 0, e.RGB, e.UNSIGNED_BYTE, r);
        return a
    }
    var r = this;
    this.buffers = {
        color: new THREE.WebGLColorBuffer(e,this),
        depth: new THREE.WebGLDepthBuffer(e,this),
        stencil: new THREE.WebGLStencilBuffer(e,this)
    };
    var a = e.getParameter(e.MAX_VERTEX_ATTRIBS)
      , o = new Uint8Array(a)
      , s = new Uint8Array(a)
      , c = new Uint8Array(a)
      , h = {}
      , l = null
      , u = null
      , p = null
      , d = null
      , f = null
      , E = null
      , m = null
      , g = null
      , v = !1
      , T = null
      , y = null
      , R = null
      , x = null
      , H = null
      , b = null
      , M = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)
      , _ = null
      , w = {}
      , S = new THREE.Vector4
      , A = new THREE.Vector4
      , L = {};
    L[e.TEXTURE_2D] = n(e.TEXTURE_2D, e.TEXTURE_2D, 1),
    L[e.TEXTURE_CUBE_MAP] = n(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6),
    this.init = function() {
        this.clearColor(0, 0, 0, 1),
        this.clearDepth(1),
        this.clearStencil(0),
        this.enable(e.DEPTH_TEST),
        this.setDepthFunc(THREE.LessEqualDepth),
        this.setFlipSided(!1),
        this.setCullFace(THREE.CullFaceBack),
        this.enable(e.CULL_FACE),
        this.enable(e.BLEND),
        this.setBlending(THREE.NormalBlending)
    }
    ,
    this.initAttributes = function() {
        for (var e = 0, t = o.length; t > e; e++)
            o[e] = 0
    }
    ,
    this.enableAttribute = function(i) {
        o[i] = 1,
        0 === s[i] && (e.enableVertexAttribArray(i),
        s[i] = 1),
        0 !== c[i] && (t.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(i, 0),
        c[i] = 0)
    }
    ,
    this.enableAttributeAndDivisor = function(t, i, n) {
        o[t] = 1,
        0 === s[t] && (e.enableVertexAttribArray(t),
        s[t] = 1),
        c[t] !== i && (n.vertexAttribDivisorANGLE(t, i),
        c[t] = i)
    }
    ,
    this.disableUnusedAttributes = function() {
        for (var t = 0, i = s.length; t !== i; ++t)
            s[t] !== o[t] && (e.disableVertexAttribArray(t),
            s[t] = 0)
    }
    ,
    this.enable = function(t) {
        !0 !== h[t] && (e.enable(t),
        h[t] = !0)
    }
    ,
    this.disable = function(t) {
        !1 !== h[t] && (e.disable(t),
        h[t] = !1)
    }
    ,
    this.getCompressedTextureFormats = function() {
        if (null === l && (l = [],
        t.get("WEBGL_compressed_texture_pvrtc") || t.get("WEBGL_compressed_texture_s3tc") || t.get("WEBGL_compressed_texture_etc1")))
            for (var i = e.getParameter(e.COMPRESSED_TEXTURE_FORMATS), n = 0; n < i.length; n++)
                l.push(i[n]);
        return l
    }
    ,
    this.setBlending = function(t, n, r, a, o, s, c, h) {
        t !== THREE.NoBlending ? (this.enable(e.BLEND),
        t === u && h === v || (t === THREE.AdditiveBlending ? h ? (e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD),
        e.blendFuncSeparate(e.ONE, e.ONE, e.ONE, e.ONE)) : (e.blendEquation(e.FUNC_ADD),
        e.blendFunc(e.SRC_ALPHA, e.ONE)) : t === THREE.SubtractiveBlending ? h ? (e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD),
        e.blendFuncSeparate(e.ZERO, e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ONE_MINUS_SRC_ALPHA)) : (e.blendEquation(e.FUNC_ADD),
        e.blendFunc(e.ZERO, e.ONE_MINUS_SRC_COLOR)) : t === THREE.MultiplyBlending ? h ? (e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD),
        e.blendFuncSeparate(e.ZERO, e.SRC_COLOR, e.ZERO, e.SRC_ALPHA)) : (e.blendEquation(e.FUNC_ADD),
        e.blendFunc(e.ZERO, e.SRC_COLOR)) : h ? (e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD),
        e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)) : (e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD),
        e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)),
        u = t,
        v = h),
        t === THREE.CustomBlending ? (o = o || n,
        s = s || r,
        c = c || a,
        n === p && o === E || (e.blendEquationSeparate(i(n), i(o)),
        p = n,
        E = o),
        r === d && a === f && s === m && c === g || (e.blendFuncSeparate(i(r), i(a), i(s), i(c)),
        d = r,
        f = a,
        m = s,
        g = c)) : g = m = E = f = d = p = null ) : (this.disable(e.BLEND),
        u = t)
    }
    ,
    this.setColorWrite = function(e) {
        this.buffers.color.setMask(e)
    }
    ,
    this.setDepthTest = function(e) {
        this.buffers.depth.setTest(e)
    }
    ,
    this.setDepthWrite = function(e) {
        this.buffers.depth.setMask(e)
    }
    ,
    this.setDepthFunc = function(e) {
        this.buffers.depth.setFunc(e)
    }
    ,
    this.setStencilTest = function(e) {
        this.buffers.stencil.setTest(e)
    }
    ,
    this.setStencilWrite = function(e) {
        this.buffers.stencil.setMask(e)
    }
    ,
    this.setStencilFunc = function(e, t, i) {
        this.buffers.stencil.setFunc(e, t, i)
    }
    ,
    this.setStencilOp = function(e, t, i) {
        this.buffers.stencil.setOp(e, t, i)
    }
    ,
    this.setFlipSided = function(t) {
        T !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW),
        T = t)
    }
    ,
    this.setCullFace = function(t) {
        t !== THREE.CullFaceNone ? (this.enable(e.CULL_FACE),
        t !== y && (t === THREE.CullFaceBack ? e.cullFace(e.BACK) : t === THREE.CullFaceFront ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : this.disable(e.CULL_FACE),
        y = t
    }
    ,
    this.setLineWidth = function(t) {
        t !== R && (e.lineWidth(t),
        R = t)
    }
    ,
    this.setPolygonOffset = function(t, i, n) {
        t ? (this.enable(e.POLYGON_OFFSET_FILL),
        (x !== i || H !== n) && (e.polygonOffset(i, n),
        x = i,
        H = n)) : this.disable(e.POLYGON_OFFSET_FILL)
    }
    ,
    this.getScissorTest = function() {
        return b
    }
    ,
    this.setScissorTest = function(t) {
        (b = t) ? this.enable(e.SCISSOR_TEST) : this.disable(e.SCISSOR_TEST)
    }
    ,
    this.activeTexture = function(t) {
        void 0 === t && (t = e.TEXTURE0 + M - 1),
        _ !== t && (e.activeTexture(t),
        _ = t)
    }
    ,
    this.bindTexture = function(t, i) {
        null === _ && r.activeTexture();
        var n = w[_];
        void 0 === n && (n = {
            type: void 0,
            texture: void 0
        },
        w[_] = n),
        n.type === t && n.texture === i || (e.bindTexture(t, i || L[t]),
        n.type = t,
        n.texture = i)
    }
    ,
    this.compressedTexImage2D = function() {
        try {
            e.compressedTexImage2D.apply(e, arguments)
        } catch (t) {}
    }
    ,
    this.texImage2D = function() {
        try {
            e.texImage2D.apply(e, arguments)
        } catch (t) {}
    }
    ,
    this.clearColor = function(e, t, i, n) {
        this.buffers.color.setClear(e, t, i, n)
    }
    ,
    this.clearDepth = function(e) {
        this.buffers.depth.setClear(e)
    }
    ,
    this.clearStencil = function(e) {
        this.buffers.stencil.setClear(e)
    }
    ,
    this.scissor = function(t) {
        !1 === S.equals(t) && (e.scissor(t.x, t.y, t.z, t.w),
        S.copy(t))
    }
    ,
    this.viewport = function(t) {
        !1 === A.equals(t) && (e.viewport(t.x, t.y, t.z, t.w),
        A.copy(t))
    }
    ,
    this.reset = function() {
        for (var t = 0; t < s.length; t++)
            1 === s[t] && (e.disableVertexAttribArray(t),
            s[t] = 0);
        h = {},
        _ = l = null ,
        w = {},
        y = T = u = null ,
        this.buffers.color.reset(),
        this.buffers.depth.reset(),
        this.buffers.stencil.reset()
    }
}
,
THREE.WebGLColorBuffer = function(e, t) {
    var i = !1
      , n = new THREE.Vector4
      , r = null
      , a = new THREE.Vector4;
    this.setMask = function(t) {
        r === t || i || (e.colorMask(t, t, t, t),
        r = t)
    }
    ,
    this.setLocked = function(e) {
        i = e
    }
    ,
    this.setClear = function(t, i, r, o) {
        n.set(t, i, r, o),
        !1 === a.equals(n) && (e.clearColor(t, i, r, o),
        a.copy(n))
    }
    ,
    this.reset = function() {
        i = !1,
        r = null ,
        a = new THREE.Vector4
    }
}
,
THREE.WebGLDepthBuffer = function(e, t) {
    var i = !1
      , n = null
      , r = null
      , a = null ;
    this.setTest = function(i) {
        i ? t.enable(e.DEPTH_TEST) : t.disable(e.DEPTH_TEST)
    }
    ,
    this.setMask = function(t) {
        n === t || i || (e.depthMask(t),
        n = t)
    }
    ,
    this.setFunc = function(t) {
        if (r !== t) {
            if (t)
                switch (t) {
                case THREE.NeverDepth:
                    e.depthFunc(e.NEVER);
                    break;
                case THREE.AlwaysDepth:
                    e.depthFunc(e.ALWAYS);
                    break;
                case THREE.LessDepth:
                    e.depthFunc(e.LESS);
                    break;
                case THREE.LessEqualDepth:
                    e.depthFunc(e.LEQUAL);
                    break;
                case THREE.EqualDepth:
                    e.depthFunc(e.EQUAL);
                    break;
                case THREE.GreaterEqualDepth:
                    e.depthFunc(e.GEQUAL);
                    break;
                case THREE.GreaterDepth:
                    e.depthFunc(e.GREATER);
                    break;
                case THREE.NotEqualDepth:
                    e.depthFunc(e.NOTEQUAL);
                    break;
                default:
                    e.depthFunc(e.LEQUAL)
                }
            else
                e.depthFunc(e.LEQUAL);
            r = t
        }
    }
    ,
    this.setLocked = function(e) {
        i = e
    }
    ,
    this.setClear = function(t) {
        a !== t && (e.clearDepth(t),
        a = t)
    }
    ,
    this.reset = function() {
        i = !1,
        a = r = n = null
    }
}
,
THREE.WebGLStencilBuffer = function(e, t) {
    var i = !1
      , n = null
      , r = null
      , a = null
      , o = null
      , s = null
      , c = null
      , h = null
      , l = null ;
    this.setTest = function(i) {
        i ? t.enable(e.STENCIL_TEST) : t.disable(e.STENCIL_TEST)
    }
    ,
    this.setMask = function(t) {
        n === t || i || (e.stencilMask(t),
        n = t)
    }
    ,
    this.setFunc = function(t, i, n) {
        r === t && a === i && o === n || (e.stencilFunc(t, i, n),
        r = t,
        a = i,
        o = n)
    }
    ,
    this.setOp = function(t, i, n) {
        s === t && c === i && h === n || (e.stencilOp(t, i, n),
        s = t,
        c = i,
        h = n)
    }
    ,
    this.setLocked = function(e) {
        i = e
    }
    ,
    this.setClear = function(t) {
        l !== t && (e.clearStencil(t),
        l = t)
    }
    ,
    this.reset = function() {
        i = !1,
        l = h = c = s = o = a = r = n = null
    }
}
,
THREE.WebGLUniforms = function() {
    var e = []
      , t = []
      , i = function(t, i, n) {
        var r = t[0];
        if (0 >= r || r > 0)
            return t;
        var a = i * n
          , o = e[a];
        if (void 0 === o && (o = new Float32Array(a),
        e[a] = o),
        0 !== i)
            for (r.toArray(o, 0),
            r = 1,
            a = 0; r !== i; ++r)
                a += n,
                t[r].toArray(o, a);
        return o
    }
      , n = function(e, i) {
        var n = t[i];
        void 0 === n && (n = new Int32Array(i),
        t[i] = n);
        for (var r = 0; r !== i; ++r)
            n[r] = e.allocTextureUnit();
        return n
    }
      , r = function(e, t) {
        e.uniform1f(this.addr, t)
    }
      , a = function(e, t) {
        e.uniform1i(this.addr, t)
    }
      , o = function(e, t) {
        void 0 === t.x ? e.uniform2fv(this.addr, t) : e.uniform2f(this.addr, t.x, t.y)
    }
      , s = function(e, t) {
        void 0 !== t.x ? e.uniform3f(this.addr, t.x, t.y, t.z) : void 0 !== t.r ? e.uniform3f(this.addr, t.r, t.g, t.b) : e.uniform3fv(this.addr, t)
    }
      , c = function(e, t) {
        void 0 === t.x ? e.uniform4fv(this.addr, t) : e.uniform4f(this.addr, t.x, t.y, t.z, t.w)
    }
      , h = function(e, t) {
        e.uniformMatrix2fv(this.addr, !1, t.elements || t)
    }
      , l = function(e, t) {
        e.uniformMatrix3fv(this.addr, !1, t.elements || t)
    }
      , u = function(e, t) {
        e.uniformMatrix4fv(this.addr, !1, t.elements || t)
    }
      , p = function(e, t, i) {
        var n = i.allocTextureUnit();
        e.uniform1i(this.addr, n),
        t && i.setTexture2D(t, n)
    }
      , d = function(e, t, i) {
        var n = i.allocTextureUnit();
        e.uniform1i(this.addr, n),
        t && i.setTextureCube(t, n)
    }
      , f = function(e, t) {
        e.uniform2iv(this.addr, t)
    }
      , E = function(e, t) {
        e.uniform3iv(this.addr, t)
    }
      , m = function(e, t) {
        e.uniform4iv(this.addr, t)
    }
      , g = function(e) {
        switch (e) {
        case 5126:
            return r;
        case 35664:
            return o;
        case 35665:
            return s;
        case 35666:
            return c;
        case 35674:
            return h;
        case 35675:
            return l;
        case 35676:
            return u;
        case 35678:
            return p;
        case 35680:
            return d;
        case 5124:
        case 35670:
            return a;
        case 35667:
        case 35671:
            return f;
        case 35668:
        case 35672:
            return E;
        case 35669:
        case 35673:
            return m
        }
    }
      , v = function(e, t) {
        e.uniform1fv(this.addr, t)
    }
      , T = function(e, t) {
        e.uniform1iv(this.addr, t)
    }
      , y = function(e, t) {
        e.uniform2fv(this.addr, i(t, this.size, 2))
    }
      , R = function(e, t) {
        e.uniform3fv(this.addr, i(t, this.size, 3))
    }
      , x = function(e, t) {
        e.uniform4fv(this.addr, i(t, this.size, 4))
    }
      , H = function(e, t) {
        e.uniformMatrix2fv(this.addr, !1, i(t, this.size, 4))
    }
      , b = function(e, t) {
        e.uniformMatrix3fv(this.addr, !1, i(t, this.size, 9))
    }
      , M = function(e, t) {
        e.uniformMatrix4fv(this.addr, !1, i(t, this.size, 16))
    }
      , _ = function(e, t, i) {
        var r = t.length
          , a = n(i, r);
        for (e.uniform1iv(this.addr, a),
        e = 0; e !== r; ++e) {
            var o = t[e];
            o && i.setTexture2D(o, a[e])
        }
    }
      , w = function(e, t, i) {
        var r = t.length
          , a = n(i, r);
        for (e.uniform1iv(this.addr, a),
        e = 0; e !== r; ++e) {
            var o = t[e];
            o && i.setTextureCube(o, a[e])
        }
    }
      , S = function(e) {
        switch (e) {
        case 5126:
            return v;
        case 35664:
            return y;
        case 35665:
            return R;
        case 35666:
            return x;
        case 35674:
            return H;
        case 35675:
            return b;
        case 35676:
            return M;
        case 35678:
            return _;
        case 35680:
            return w;
        case 5124:
        case 35670:
            return T;
        case 35667:
        case 35671:
            return f;
        case 35668:
        case 35672:
            return E;
        case 35669:
        case 35673:
            return m
        }
    }
      , A = function(e, t, i) {
        this.id = e,
        this.addr = i,
        this.setValue = g(t.type)
    }
      , L = function(e, t, i) {
        this.id = e,
        this.addr = i,
        this.size = t.size,
        this.setValue = S(t.type)
    }
      , C = function(e) {
        this.id = e,
        this.seq = [],
        this.map = {}
    }
    ;
    C.prototype.setValue = function(e, t) {
        for (var i = this.seq, n = 0, r = i.length; n !== r; ++n) {
            var a = i[n];
            a.setValue(e, t[a.id])
        }
    }
    ;
    var P = /([\w\d_]+)(\])?(\[|\.)?/g
      , I = function(e, t, i) {
        this.seq = [],
        this.map = {},
        this.renderer = i,
        i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
        for (var n = 0; n !== i; ++n) {
            var r = e.getActiveUniform(t, n)
              , a = e.getUniformLocation(t, r.name)
              , o = this
              , s = r.name
              , c = s.length;
            for (P.lastIndex = 0; ; ) {
                var h = P.exec(s)
                  , l = P.lastIndex
                  , u = h[1]
                  , p = h[3];
                if ("]" === h[2] && (u |= 0),
                void 0 === p || "[" === p && l + 2 === c) {
                    s = o,
                    r = void 0 === p ? new A(u,r,a) : new L(u,r,a),
                    s.seq.push(r),
                    s.map[r.id] = r;
                    break
                }
                p = o.map[u],
                void 0 === p && (p = new C(u),
                u = o,
                o = p,
                u.seq.push(o),
                u.map[o.id] = o),
                o = p
            }
        }
    }
    ;
    return I.prototype.setValue = function(e, t, i) {
        t = this.map[t],
        void 0 !== t && t.setValue(e, i, this.renderer)
    }
    ,
    I.prototype.set = function(e, t, i) {
        var n = this.map[i];
        void 0 !== n && n.setValue(e, t[i], this.renderer)
    }
    ,
    I.prototype.setOptional = function(e, t, i) {
        t = t[i],
        void 0 !== t && this.setValue(e, i, t)
    }
    ,
    I.upload = function(e, t, i, n) {
        for (var r = 0, a = t.length; r !== a; ++r) {
            var o = t[r]
              , s = i[o.id];
            !1 !== s.needsUpdate && o.setValue(e, s.value, n)
        }
    }
    ,
    I.seqWithValue = function(e, t) {
        for (var i = [], n = 0, r = e.length; n !== r; ++n) {
            var a = e[n];
            a.id in t && i.push(a)
        }
        return i
    }
    ,
    I.splitDynamic = function(e, t) {
        for (var i = null , n = e.length, r = 0, a = 0; a !== n; ++a) {
            var o = e[a]
              , s = t[o.id];
            s && !0 === s.dynamic ? (null === i && (i = []),
            i.push(o)) : (a > r && (e[r] = o),
            ++r)
        }
        return n > r && (e.length = r),
        i
    }
    ,
    I.evalDynamic = function(e, t, i, n) {
        for (var r = 0, a = e.length; r !== a; ++r) {
            var o = t[e[r].id]
              , s = o.onUpdateCallback;
            void 0 !== s && s.call(o, i, n)
        }
    }
    ,
    I
}(),
THREE.LensFlarePlugin = function(e, t) {
    var i, n, r, a, o, s, c, h, l, u, p, d, f, E, m, g, v = e.context, T = e.state;
    this.render = function(y, R, x) {
        if (0 !== t.length) {
            y = new THREE.Vector3;
            var H = x.w / x.z
              , b = .5 * x.z
              , M = .5 * x.w
              , _ = 16 / x.w
              , w = new THREE.Vector2(_ * H,_)
              , S = new THREE.Vector3(1,1,0)
              , A = new THREE.Vector2(1,1)
              , L = new THREE.Box2;
            if (L.min.set(0, 0),
            L.max.set(x.z - 16, x.w - 16),
            void 0 === E) {
                var _ = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1])
                  , C = new Uint16Array([0, 1, 2, 0, 2, 3]);
                p = v.createBuffer(),
                d = v.createBuffer(),
                v.bindBuffer(v.ARRAY_BUFFER, p),
                v.bufferData(v.ARRAY_BUFFER, _, v.STATIC_DRAW),
                v.bindBuffer(v.ELEMENT_ARRAY_BUFFER, d),
                v.bufferData(v.ELEMENT_ARRAY_BUFFER, C, v.STATIC_DRAW),
                m = v.createTexture(),
                g = v.createTexture(),
                T.bindTexture(v.TEXTURE_2D, m),
                v.texImage2D(v.TEXTURE_2D, 0, v.RGB, 16, 16, 0, v.RGB, v.UNSIGNED_BYTE, null ),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, v.CLAMP_TO_EDGE),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, v.CLAMP_TO_EDGE),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, v.NEAREST),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, v.NEAREST),
                T.bindTexture(v.TEXTURE_2D, g),
                v.texImage2D(v.TEXTURE_2D, 0, v.RGBA, 16, 16, 0, v.RGBA, v.UNSIGNED_BYTE, null ),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, v.CLAMP_TO_EDGE),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, v.CLAMP_TO_EDGE),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, v.NEAREST),
                v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, v.NEAREST);
                var _ = f = {
                    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif ( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                    fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif ( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if ( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                }
                  , C = v.createProgram()
                  , P = v.createShader(v.FRAGMENT_SHADER)
                  , I = v.createShader(v.VERTEX_SHADER)
                  , B = "precision " + e.getPrecision() + " float;\n";
                v.shaderSource(P, B + _.fragmentShader),
                v.shaderSource(I, B + _.vertexShader),
                v.compileShader(P),
                v.compileShader(I),
                v.attachShader(C, P),
                v.attachShader(C, I),
                v.linkProgram(C),
                E = C,
                l = v.getAttribLocation(E, "position"),
                u = v.getAttribLocation(E, "uv"),
                i = v.getUniformLocation(E, "renderType"),
                n = v.getUniformLocation(E, "map"),
                r = v.getUniformLocation(E, "occlusionMap"),
                a = v.getUniformLocation(E, "opacity"),
                o = v.getUniformLocation(E, "color"),
                s = v.getUniformLocation(E, "scale"),
                c = v.getUniformLocation(E, "rotation"),
                h = v.getUniformLocation(E, "screenPosition")
            }
            for (v.useProgram(E),
            T.initAttributes(),
            T.enableAttribute(l),
            T.enableAttribute(u),
            T.disableUnusedAttributes(),
            v.uniform1i(r, 0),
            v.uniform1i(n, 1),
            v.bindBuffer(v.ARRAY_BUFFER, p),
            v.vertexAttribPointer(l, 2, v.FLOAT, !1, 16, 0),
            v.vertexAttribPointer(u, 2, v.FLOAT, !1, 16, 8),
            v.bindBuffer(v.ELEMENT_ARRAY_BUFFER, d),
            T.disable(v.CULL_FACE),
            T.setDepthWrite(!1),
            C = 0,
            P = t.length; P > C; C++)
                if (_ = 16 / x.w,
                w.set(_ * H, _),
                I = t[C],
                y.set(I.matrixWorld.elements[12], I.matrixWorld.elements[13], I.matrixWorld.elements[14]),
                y.applyMatrix4(R.matrixWorldInverse),
                y.applyProjection(R.projectionMatrix),
                S.copy(y),
                A.x = x.x + S.x * b + b - 8,
                A.y = x.y + S.y * M + M - 8,
                !0 === L.containsPoint(A)) {
                    T.activeTexture(v.TEXTURE0),
                    T.bindTexture(v.TEXTURE_2D, null ),
                    T.activeTexture(v.TEXTURE1),
                    T.bindTexture(v.TEXTURE_2D, m),
                    v.copyTexImage2D(v.TEXTURE_2D, 0, v.RGB, A.x, A.y, 16, 16, 0),
                    v.uniform1i(i, 0),
                    v.uniform2f(s, w.x, w.y),
                    v.uniform3f(h, S.x, S.y, S.z),
                    T.disable(v.BLEND),
                    T.enable(v.DEPTH_TEST),
                    v.drawElements(v.TRIANGLES, 6, v.UNSIGNED_SHORT, 0),
                    T.activeTexture(v.TEXTURE0),
                    T.bindTexture(v.TEXTURE_2D, g),
                    v.copyTexImage2D(v.TEXTURE_2D, 0, v.RGBA, A.x, A.y, 16, 16, 0),
                    v.uniform1i(i, 1),
                    T.disable(v.DEPTH_TEST),
                    T.activeTexture(v.TEXTURE1),
                    T.bindTexture(v.TEXTURE_2D, m),
                    v.drawElements(v.TRIANGLES, 6, v.UNSIGNED_SHORT, 0),
                    I.positionScreen.copy(S),
                    I.customUpdateCallback ? I.customUpdateCallback(I) : I.updateLensFlares(),
                    v.uniform1i(i, 2),
                    T.enable(v.BLEND);
                    for (var B = 0, D = I.lensFlares.length; D > B; B++) {
                        var F = I.lensFlares[B];
                        .001 < F.opacity && .001 < F.scale && (S.x = F.x,
                        S.y = F.y,
                        S.z = F.z,
                        _ = F.size * F.scale / x.w,
                        w.x = _ * H,
                        w.y = _,
                        v.uniform3f(h, S.x, S.y, S.z),
                        v.uniform2f(s, w.x, w.y),
                        v.uniform1f(c, F.rotation),
                        v.uniform1f(a, F.opacity),
                        v.uniform3f(o, F.color.r, F.color.g, F.color.b),
                        T.setBlending(F.blending, F.blendEquation, F.blendSrc, F.blendDst),
                        e.setTexture2D(F.texture, 1),
                        v.drawElements(v.TRIANGLES, 6, v.UNSIGNED_SHORT, 0))
                    }
                }
            T.enable(v.CULL_FACE),
            T.enable(v.DEPTH_TEST),
            T.setDepthWrite(!0),
            e.resetGLState()
        }
    }
}
,
THREE.SpritePlugin = function(e, t) {
    function i(e, t) {
        return e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : t.id - e.id
    }
    var n, r, a, o, s, c, h, l, u, p, d, f, E, m, g, v, T, y, R, x, H, b = e.context, M = e.state, _ = new THREE.Vector3, w = new THREE.Quaternion, S = new THREE.Vector3;
    this.render = function(A, L) {
        if (0 !== t.length) {
            if (void 0 === x) {
                var C = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1])
                  , P = new Uint16Array([0, 1, 2, 0, 2, 3]);
                y = b.createBuffer(),
                R = b.createBuffer(),
                b.bindBuffer(b.ARRAY_BUFFER, y),
                b.bufferData(b.ARRAY_BUFFER, C, b.STATIC_DRAW),
                b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, R),
                b.bufferData(b.ELEMENT_ARRAY_BUFFER, P, b.STATIC_DRAW);
                var C = b.createProgram()
                  , P = b.createShader(b.VERTEX_SHADER)
                  , I = b.createShader(b.FRAGMENT_SHADER);
                b.shaderSource(P, ["precision " + e.getPrecision() + " float;", "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n")),
                b.shaderSource(I, ["precision " + e.getPrecision() + " float;", "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n")),
                b.compileShader(P),
                b.compileShader(I),
                b.attachShader(C, P),
                b.attachShader(C, I),
                b.linkProgram(C),
                x = C,
                v = b.getAttribLocation(x, "position"),
                T = b.getAttribLocation(x, "uv"),
                n = b.getUniformLocation(x, "uvOffset"),
                r = b.getUniformLocation(x, "uvScale"),
                a = b.getUniformLocation(x, "rotation"),
                o = b.getUniformLocation(x, "scale"),
                s = b.getUniformLocation(x, "color"),
                c = b.getUniformLocation(x, "map"),
                h = b.getUniformLocation(x, "opacity"),
                l = b.getUniformLocation(x, "modelViewMatrix"),
                u = b.getUniformLocation(x, "projectionMatrix"),
                p = b.getUniformLocation(x, "fogType"),
                d = b.getUniformLocation(x, "fogDensity"),
                f = b.getUniformLocation(x, "fogNear"),
                E = b.getUniformLocation(x, "fogFar"),
                m = b.getUniformLocation(x, "fogColor"),
                g = b.getUniformLocation(x, "alphaTest"),
                C = document.createElement("canvas"),
                C.width = 8,
                C.height = 8,
                P = C.getContext("2d"),
                P.fillStyle = "white",
                P.fillRect(0, 0, 8, 8),
                H = new THREE.Texture(C),
                H.needsUpdate = !0
            }
            b.useProgram(x),
            M.initAttributes(),
            M.enableAttribute(v),
            M.enableAttribute(T),
            M.disableUnusedAttributes(),
            M.disable(b.CULL_FACE),
            M.enable(b.BLEND),
            b.bindBuffer(b.ARRAY_BUFFER, y),
            b.vertexAttribPointer(v, 2, b.FLOAT, !1, 16, 0),
            b.vertexAttribPointer(T, 2, b.FLOAT, !1, 16, 8),
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, R),
            b.uniformMatrix4fv(u, !1, L.projectionMatrix.elements),
            M.activeTexture(b.TEXTURE0),
            b.uniform1i(c, 0),
            P = C = 0,
            (I = A.fog) ? (b.uniform3f(m, I.color.r, I.color.g, I.color.b),
            I instanceof THREE.Fog ? (b.uniform1f(f, I.near),
            b.uniform1f(E, I.far),
            b.uniform1i(p, 1),
            P = C = 1) : I instanceof THREE.FogExp2 && (b.uniform1f(d, I.density),
            b.uniform1i(p, 2),
            P = C = 2)) : (b.uniform1i(p, 0),
            P = C = 0);
            for (var I = 0, B = t.length; B > I; I++) {
                var D = t[I];
                D.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, D.matrixWorld),
                D.z = -D.modelViewMatrix.elements[14]
            }
            t.sort(i);
            for (var F = [], I = 0, B = t.length; B > I; I++) {
                var D = t[I]
                  , U = D.material;
                b.uniform1f(g, U.alphaTest),
                b.uniformMatrix4fv(l, !1, D.modelViewMatrix.elements),
                D.matrixWorld.decompose(_, w, S),
                F[0] = S.x,
                F[1] = S.y,
                D = 0,
                A.fog && U.fog && (D = P),
                C !== D && (b.uniform1i(p, D),
                C = D),
                null !== U.map ? (b.uniform2f(n, U.map.offset.x, U.map.offset.y),
                b.uniform2f(r, U.map.repeat.x, U.map.repeat.y)) : (b.uniform2f(n, 0, 0),
                b.uniform2f(r, 1, 1)),
                b.uniform1f(h, U.opacity),
                b.uniform3f(s, U.color.r, U.color.g, U.color.b),
                b.uniform1f(a, U.rotation),
                b.uniform2fv(o, F),
                M.setBlending(U.blending, U.blendEquation, U.blendSrc, U.blendDst),
                M.setDepthTest(U.depthTest),
                M.setDepthWrite(U.depthWrite),
                U.map ? e.setTexture2D(U.map, 0) : e.setTexture2D(H, 0),
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0)
            }
            M.enable(b.CULL_FACE),
            e.resetGLState()
        }
    }
}
,
Object.assign(THREE, {
    Face4: function(e, t, i, n, r, a, o) {
        return new THREE.Face3(e,t,i,r,a,o)
    },
    LineStrip: 0,
    LinePieces: 1,
    MeshFaceMaterial: THREE.MultiMaterial,
    PointCloud: function(e, t) {
        return new THREE.Points(e,t)
    },
    Particle: THREE.Sprite,
    ParticleSystem: function(e, t) {
        return new THREE.Points(e,t)
    },
    PointCloudMaterial: function(e) {
        return new THREE.PointsMaterial(e)
    },
    ParticleBasicMaterial: function(e) {
        return new THREE.PointsMaterial(e)
    },
    ParticleSystemMaterial: function(e) {
        return new THREE.PointsMaterial(e)
    },
    Vertex: function(e, t, i) {
        return new THREE.Vector3(e,t,i)
    }
}),
Object.assign(THREE.Box2.prototype, {
    empty: function() {
        return this.isEmpty()
    },
    isIntersectionBox: function(e) {
        return this.intersectsBox(e)
    }
}),
Object.assign(THREE.Box3.prototype, {
    empty: function() {
        return this.isEmpty()
    },
    isIntersectionBox: function(e) {
        return this.intersectsBox(e)
    },
    isIntersectionSphere: function(e) {
        return this.intersectsSphere(e)
    }
}),
Object.assign(THREE.Matrix3.prototype, {
    multiplyVector3: function(e) {
        return e.applyMatrix3(this)
    },
    multiplyVector3Array: function(e) {
        return this.applyToVector3Array(e)
    }
}),
Object.assign(THREE.Matrix4.prototype, {
    extractPosition: function(e) {
        return this.copyPosition(e)
    },
    setRotationFromQuaternion: function(e) {
        return this.makeRotationFromQuaternion(e)
    },
    multiplyVector3: function(e) {
        return e.applyProjection(this)
    },
    multiplyVector4: function(e) {
        return e.applyMatrix4(this)
    },
    multiplyVector3Array: function(e) {
        return this.applyToVector3Array(e)
    },
    rotateAxis: function(e) {
        e.transformDirection(this)
    },
    crossVector: function(e) {
        return e.applyMatrix4(this)
    },
    translate: function(e) {},
    rotateX: function(e) {},
    rotateY: function(e) {},
    rotateZ: function(e) {},
    rotateByAxis: function(e, t) {}
}),
Object.assign(THREE.Plane.prototype, {
    isIntersectionLine: function(e) {
        return this.intersectsLine(e)
    }
}),
Object.assign(THREE.Quaternion.prototype, {
    multiplyVector3: function(e) {
        return e.applyQuaternion(this)
    }
}),
Object.assign(THREE.Ray.prototype, {
    isIntersectionBox: function(e) {
        return this.intersectsBox(e)
    },
    isIntersectionPlane: function(e) {
        return this.intersectsPlane(e)
    },
    isIntersectionSphere: function(e) {
        return this.intersectsSphere(e)
    }
}),
Object.assign(THREE.Vector3.prototype, {
    setEulerFromRotationMatrix: function() {},
    setEulerFromQuaternion: function() {},
    getPositionFromMatrix: function(e) {
        return this.setFromMatrixPosition(e)
    },
    getScaleFromMatrix: function(e) {
        return this.setFromMatrixScale(e)
    },
    getColumnFromMatrix: function(e, t) {
        return this.setFromMatrixColumn(t, e)
    }
}),
Object.assign(THREE.Object3D.prototype, {
    getChildByName: function(e) {
        return this.getObjectByName(e)
    },
    renderDepth: function(e) {},
    translate: function(e, t) {
        return this.translateOnAxis(t, e)
    }
}),
Object.defineProperties(THREE.Object3D.prototype, {
    eulerOrder: {
        get: function() {
            return this.rotation.order
        },
        set: function(e) {
            this.rotation.order = e
        }
    },
    useQuaternion: {
        get: function() {},
        set: function(e) {}
    }
}),
Object.defineProperties(THREE.LOD.prototype, {
    objects: {
        get: function() {
            return this.levels
        }
    }
}),
THREE.PerspectiveCamera.prototype.setLens = function(e, t) {
    void 0 !== t && (this.filmGauge = t),
    this.setFocalLength(e)
}
,
Object.defineProperties(THREE.Light.prototype, {
    onlyShadow: {
        set: function(e) {}
    },
    shadowCameraFov: {
        set: function(e) {
            this.shadow.camera.fov = e
        }
    },
    shadowCameraLeft: {
        set: function(e) {
            this.shadow.camera.left = e
        }
    },
    shadowCameraRight: {
        set: function(e) {
            this.shadow.camera.right = e
        }
    },
    shadowCameraTop: {
        set: function(e) {
            this.shadow.camera.top = e
        }
    },
    shadowCameraBottom: {
        set: function(e) {
            this.shadow.camera.bottom = e
        }
    },
    shadowCameraNear: {
        set: function(e) {
            this.shadow.camera.near = e
        }
    },
    shadowCameraFar: {
        set: function(e) {
            this.shadow.camera.far = e
        }
    },
    shadowCameraVisible: {
        set: function(e) {}
    },
    shadowBias: {
        set: function(e) {
            this.shadow.bias = e
        }
    },
    shadowDarkness: {
        set: function(e) {}
    },
    shadowMapWidth: {
        set: function(e) {
            this.shadow.mapSize.width = e
        }
    },
    shadowMapHeight: {
        set: function(e) {
            this.shadow.mapSize.height = e
        }
    }
}),
Object.defineProperties(THREE.BufferAttribute.prototype, {
    length: {
        get: function() {
            return this.array.length
        }
    }
}),
Object.assign(THREE.BufferGeometry.prototype, {
    addIndex: function(e) {
        this.setIndex(e)
    },
    addDrawCall: function(e, t, i) {
        this.addGroup(e, t)
    },
    clearDrawCalls: function() {
        this.clearGroups()
    },
    computeTangents: function() {},
    computeOffsets: function() {}
}),
Object.defineProperties(THREE.BufferGeometry.prototype, {
    drawcalls: {
        get: function() {
            return this.groups
        }
    },
    offsets: {
        get: function() {
            return this.groups
        }
    }
}),
Object.defineProperties(THREE.Material.prototype, {
    wrapAround: {
        get: function() {},
        set: function(e) {}
    },
    wrapRGB: {
        get: function() {
            return new THREE.Color
        }
    }
}),
Object.defineProperties(THREE.MeshPhongMaterial.prototype, {
    metal: {
        get: function() {
            return !1
        },
        set: function(e) {}
    }
}),
Object.defineProperties(THREE.ShaderMaterial.prototype, {
    derivatives: {
        get: function() {
            return this.extensions.derivatives
        },
        set: function(e) {
            this.extensions.derivatives = e
        }
    }
}),
THREE.EventDispatcher.prototype = Object.assign(Object.create({
    constructor: THREE.EventDispatcher,
    apply: function(e) {
        Object.assign(e, this)
    }
}), THREE.EventDispatcher.prototype),
Object.assign(THREE.WebGLRenderer.prototype, {
    supportsFloatTextures: function() {
        return this.extensions.get("OES_texture_float")
    },
    supportsHalfFloatTextures: function() {
        return this.extensions.get("OES_texture_half_float")
    },
    supportsStandardDerivatives: function() {
        return this.extensions.get("OES_standard_derivatives")
    },
    supportsCompressedTextureS3TC: function() {
        return this.extensions.get("WEBGL_compressed_texture_s3tc")
    },
    supportsCompressedTexturePVRTC: function() {
        return this.extensions.get("WEBGL_compressed_texture_pvrtc")
    },
    supportsBlendMinMax: function() {
        return this.extensions.get("EXT_blend_minmax")
    },
    supportsVertexTextures: function() {
        return this.capabilities.vertexTextures
    },
    supportsInstancedArrays: function() {
        return this.extensions.get("ANGLE_instanced_arrays")
    },
    enableScissorTest: function(e) {
        this.setScissorTest(e)
    },
    initMaterial: function() {},
    addPrePlugin: function() {},
    addPostPlugin: function() {},
    updateShadowMap: function() {}
}),
Object.defineProperties(THREE.WebGLRenderer.prototype, {
    shadowMapEnabled: {
        get: function() {
            return this.shadowMap.enabled
        },
        set: function(e) {
            this.shadowMap.enabled = e
        }
    },
    shadowMapType: {
        get: function() {
            return this.shadowMap.type
        },
        set: function(e) {
            this.shadowMap.type = e
        }
    },
    shadowMapCullFace: {
        get: function() {
            return this.shadowMap.cullFace
        },
        set: function(e) {
            this.shadowMap.cullFace = e
        }
    }
}),
Object.defineProperties(THREE.WebGLShadowMap.prototype, {
    cullFace: {
        get: function() {
            return this.renderReverseSided ? THREE.CullFaceFront : THREE.CullFaceBack
        },
        set: function(e) {
            e = e !== THREE.CullFaceBack,
            this.renderReverseSided = e
        }
    }
}),
Object.defineProperties(THREE.WebGLRenderTarget.prototype, {
    wrapS: {
        get: function() {
            return this.texture.wrapS
        },
        set: function(e) {
            this.texture.wrapS = e
        }
    },
    wrapT: {
        get: function() {
            return this.texture.wrapT
        },
        set: function(e) {
            this.texture.wrapT = e
        }
    },
    magFilter: {
        get: function() {
            return this.texture.magFilter
        },
        set: function(e) {
            this.texture.magFilter = e
        }
    },
    minFilter: {
        get: function() {
            return this.texture.minFilter
        },
        set: function(e) {
            this.texture.minFilter = e
        }
    },
    anisotropy: {
        get: function() {
            return this.texture.anisotropy
        },
        set: function(e) {
            this.texture.anisotropy = e
        }
    },
    offset: {
        get: function() {
            return this.texture.offset
        },
        set: function(e) {
            this.texture.offset = e
        }
    },
    repeat: {
        get: function() {
            return this.texture.repeat
        },
        set: function(e) {
            this.texture.repeat = e
        }
    },
    format: {
        get: function() {
            return this.texture.format
        },
        set: function(e) {
            this.texture.format = e
        }
    },
    type: {
        get: function() {
            return this.texture.type
        },
        set: function(e) {
            this.texture.type = e
        }
    },
    generateMipmaps: {
        get: function() {
            return this.texture.generateMipmaps
        },
        set: function(e) {
            this.texture.generateMipmaps = e
        }
    }
}),
Object.assign(THREE.Audio.prototype, {
    load: function(e) {
        var t = this;
        return (new THREE.AudioLoader).load(e, function(e) {
            t.setBuffer(e)
        }),
        this
    }
}),
Object.assign(THREE.AudioAnalyser.prototype, {
    getData: function(e) {
        return this.getFrequencyData()
    }
}),
THREE.GeometryUtils = {
    merge: function(e, t, i) {
        var n;
        t instanceof THREE.Mesh && (t.matrixAutoUpdate && t.updateMatrix(),
        n = t.matrix,
        t = t.geometry),
        e.merge(t, n, i)
    },
    center: function(e) {
        return e.center()
    }
},
THREE.ImageUtils = {
    crossOrigin: void 0,
    loadTexture: function(e, t, i, n) {
        var r = new THREE.TextureLoader;
        return r.setCrossOrigin(this.crossOrigin),
        e = r.load(e, i, void 0, n),
        t && (e.mapping = t),
        e
    },
    loadTextureCube: function(e, t, i, n) {
        var r = new THREE.CubeTextureLoader;
        return r.setCrossOrigin(this.crossOrigin),
        e = r.load(e, i, void 0, n),
        t && (e.mapping = t),
        e
    },
    loadCompressedTexture: function() {},
    loadCompressedTextureCube: function() {}
},
THREE.Projector = function() {
    this.projectVector = function(e, t) {
        e.project(t)
    }
    ,
    this.unprojectVector = function(e, t) {
        e.unproject(t)
    }
    ,
    this.pickingRay = function(e, t) {}
}
,
THREE.CanvasRenderer = function() {
    this.domElement = document.createElement("canvas"),
    this.clear = function() {}
    ,
    this.render = function() {}
    ,
    this.setClearColor = function() {}
    ,
    this.setSize = function() {}
}
,
THREE.CurveUtils = {
    tangentQuadraticBezier: function(e, t, i, n) {
        return 2 * (1 - e) * (i - t) + 2 * e * (n - i)
    },
    tangentCubicBezier: function(e, t, i, n, r) {
        return -3 * t * (1 - e) * (1 - e) + 3 * i * (1 - e) * (1 - e) - 6 * e * i * (1 - e) + 6 * e * n * (1 - e) - 3 * e * e * n + 3 * e * e * r
    },
    tangentSpline: function(e, t, i, n, r) {
        return 6 * e * e - 6 * e + (3 * e * e - 4 * e + 1) + (-6 * e * e + 6 * e) + (3 * e * e - 2 * e)
    },
    interpolate: function(e, t, i, n, r) {
        e = .5 * (i - e),
        n = .5 * (n - t);
        var a = r * r;
        return (2 * t - 2 * i + e + n) * r * a + (-3 * t + 3 * i - 2 * e - n) * a + e * r + t
    }
},
THREE.SceneUtils = {
    createMultiMaterialObject: function(e, t) {
        for (var i = new THREE.Group, n = 0, r = t.length; r > n; n++)
            i.add(new THREE.Mesh(e,t[n]));
        return i
    },
    detach: function(e, t, i) {
        e.applyMatrix(t.matrixWorld),
        t.remove(e),
        i.add(e)
    },
    attach: function(e, t, i) {
        var n = new THREE.Matrix4;
        n.getInverse(i.matrixWorld),
        e.applyMatrix(n),
        t.remove(e),
        i.add(e)
    }
},
THREE.ShapeUtils = {
    area: function(e) {
        for (var t = e.length, i = 0, n = t - 1, r = 0; t > r; n = r++)
            i += e[n].x * e[r].y - e[r].x * e[n].y;
        return .5 * i
    },
    triangulate: function() {
        return function(e, t) {
            var i = e.length;
            if (3 > i)
                return null ;
            var n, r, a, o = [], s = [], c = [];
            if (0 < THREE.ShapeUtils.area(e))
                for (r = 0; i > r; r++)
                    s[r] = r;
            else
                for (r = 0; i > r; r++)
                    s[r] = i - 1 - r;
            var h = 2 * i;
            for (r = i - 1; i > 2 && !(0 >= h--); ) {
                n = r,
                n >= i && (n = 0),
                r = n + 1,
                r >= i && (r = 0),
                a = r + 1,
                a >= i && (a = 0);
                var l;
                e: {
                    var u = l = void 0
                      , p = void 0
                      , d = void 0
                      , f = void 0
                      , E = void 0
                      , m = void 0
                      , g = void 0
                      , v = void 0
                      , u = e[s[n]].x
                      , p = e[s[n]].y
                      , d = e[s[r]].x
                      , f = e[s[r]].y
                      , E = e[s[a]].x
                      , m = e[s[a]].y;
                    if (Number.EPSILON > (d - u) * (m - p) - (f - p) * (E - u))
                        l = !1;
                    else {
                        var T = void 0
                          , y = void 0
                          , R = void 0
                          , x = void 0
                          , H = void 0
                          , b = void 0
                          , M = void 0
                          , _ = void 0
                          , w = void 0
                          , S = void 0
                          , w = _ = M = v = g = void 0
                          , T = E - d
                          , y = m - f
                          , R = u - E
                          , x = p - m
                          , H = d - u
                          , b = f - p;
                        for (l = 0; i > l; l++)
                            if (g = e[s[l]].x,
                            v = e[s[l]].y,
                            !(g === u && v === p || g === d && v === f || g === E && v === m) && (M = g - u,
                            _ = v - p,
                            w = g - d,
                            S = v - f,
                            g -= E,
                            v -= m,
                            w = T * S - y * w,
                            M = H * _ - b * M,
                            _ = R * v - x * g,
                            w >= -Number.EPSILON && _ >= -Number.EPSILON && M >= -Number.EPSILON)) {
                                l = !1;
                                break e
                            }
                        l = !0
                    }
                }
                if (l) {
                    for (o.push([e[s[n]], e[s[r]], e[s[a]]]),
                    c.push([s[n], s[r], s[a]]),
                    n = r,
                    a = r + 1; i > a; n++,
                    a++)
                        s[n] = s[a];
                    i--,
                    h = 2 * i
                }
            }
            return t ? c : o
        }
    }(),
    triangulateShape: function(e, t) {
        function i(e, t, i) {
            return e.x !== t.x ? e.x < t.x ? e.x <= i.x && i.x <= t.x : t.x <= i.x && i.x <= e.x : e.y < t.y ? e.y <= i.y && i.y <= t.y : t.y <= i.y && i.y <= e.y
        }
        function n(e, t, n, r, a) {
            var o = t.x - e.x
              , s = t.y - e.y
              , c = r.x - n.x
              , h = r.y - n.y
              , l = e.x - n.x
              , u = e.y - n.y
              , p = s * c - o * h
              , d = s * l - o * u;
            if (Math.abs(p) > Number.EPSILON) {
                if (p > 0) {
                    if (0 > d || d > p)
                        return [];
                    if (c = h * l - c * u,
                    0 > c || c > p)
                        return []
                } else {
                    if (d > 0 || p > d)
                        return [];
                    if (c = h * l - c * u,
                    c > 0 || p > c)
                        return []
                }
                return 0 === c ? !a || 0 !== d && d !== p ? [e] : [] : c === p ? !a || 0 !== d && d !== p ? [t] : [] : 0 === d ? [n] : d === p ? [r] : (a = c / p,
                [{
                    x: e.x + a * o,
                    y: e.y + a * s
                }])
            }
            return 0 !== d || h * l !== c * u ? [] : (s = 0 === o && 0 === s,
            c = 0 === c && 0 === h,
            s && c ? e.x !== n.x || e.y !== n.y ? [] : [e] : s ? i(n, r, e) ? [e] : [] : c ? i(e, t, n) ? [n] : [] : (0 !== o ? (e.x < t.x ? (o = e,
            c = e.x,
            s = t,
            e = t.x) : (o = t,
            c = t.x,
            s = e,
            e = e.x),
            n.x < r.x ? (t = n,
            p = n.x,
            h = r,
            n = r.x) : (t = r,
            p = r.x,
            h = n,
            n = n.x)) : (e.y < t.y ? (o = e,
            c = e.y,
            s = t,
            e = t.y) : (o = t,
            c = t.y,
            s = e,
            e = e.y),
            n.y < r.y ? (t = n,
            p = n.y,
            h = r,
            n = r.y) : (t = r,
            p = r.y,
            h = n,
            n = n.y)),
            p >= c ? p > e ? [] : e === p ? a ? [] : [t] : n >= e ? [t, s] : [t, h] : c > n ? [] : c === n ? a ? [] : [o] : n >= e ? [o, s] : [o, h]))
        }
        function r(e, t, i, n) {
            var r = t.x - e.x
              , a = t.y - e.y;
            t = i.x - e.x,
            i = i.y - e.y;
            var o = n.x - e.x;
            return n = n.y - e.y,
            e = r * i - a * t,
            r = r * n - a * o,
            Math.abs(e) > Number.EPSILON ? (t = o * i - n * t,
            e > 0 ? r >= 0 && t >= 0 : r >= 0 || t >= 0) : r > 0
        }
        var a, o, s, c, h, l = {};
        for (s = e.concat(),
        a = 0,
        o = t.length; o > a; a++)
            Array.prototype.push.apply(s, t[a]);
        for (a = 0,
        o = s.length; o > a; a++)
            h = s[a].x + ":" + s[a].y,
            void 0 !== l[h] && void 0,
            l[h] = a;
        a = function(e, t) {
            function i(e, t) {
                var i = m.length - 1
                  , n = e - 1;
                0 > n && (n = i);
                var a = e + 1;
                return a > i && (a = 0),
                (i = r(m[e], m[n], m[a], s[t])) ? (i = s.length - 1,
                n = t - 1,
                0 > n && (n = i),
                a = t + 1,
                a > i && (a = 0),
                !!(i = r(s[t], s[n], s[a], m[e]))) : !1
            }
            function a(e, t) {
                var i, r;
                for (i = 0; i < m.length; i++)
                    if (r = i + 1,
                    r %= m.length,
                    r = n(e, t, m[i], m[r], !0),
                    0 < r.length)
                        return !0;
                return !1
            }
            function o(e, i) {
                var r, a, o, s;
                for (r = 0; r < g.length; r++)
                    for (a = t[g[r]],
                    o = 0; o < a.length; o++)
                        if (s = o + 1,
                        s %= a.length,
                        s = n(e, i, a[o], a[s], !0),
                        0 < s.length)
                            return !0;
                return !1
            }
            var s, c, h, l, u, p, d, f, E, m = e.concat(), g = [], v = [], T = 0;
            for (c = t.length; c > T; T++)
                g.push(T);
            d = 0;
            for (var y = 2 * g.length; 0 < g.length && (y--,
            !(0 > y)); )
                for (h = d; h < m.length; h++) {
                    for (l = m[h],
                    c = -1,
                    T = 0; T < g.length; T++)
                        if (u = g[T],
                        p = l.x + ":" + l.y + ":" + u,
                        void 0 === v[p]) {
                            for (s = t[u],
                            f = 0; f < s.length; f++)
                                if (u = s[f],
                                i(h, f) && !a(l, u) && !o(l, u)) {
                                    c = f,
                                    g.splice(T, 1),
                                    d = m.slice(0, h + 1),
                                    u = m.slice(h),
                                    f = s.slice(c),
                                    E = s.slice(0, c + 1),
                                    m = d.concat(f).concat(E).concat(u),
                                    d = h;
                                    break
                                }
                            if (c >= 0)
                                break;
                            v[p] = !0
                        }
                    if (c >= 0)
                        break
                }
            return m
        }(e, t);
        var u = THREE.ShapeUtils.triangulate(a, !1);
        for (a = 0,
        o = u.length; o > a; a++)
            for (c = u[a],
            s = 0; 3 > s; s++)
                h = c[s].x + ":" + c[s].y,
                h = l[h],
                void 0 !== h && (c[s] = h);
        return u.concat()
    },
    isClockWise: function(e) {
        return 0 > THREE.ShapeUtils.area(e)
    },
    b2: function() {
        return function(e, t, i, n) {
            var r = 1 - e;
            return r * r * t + 2 * (1 - e) * e * i + e * e * n
        }
    }(),
    b3: function() {
        return function(e, t, i, n, r) {
            var a = 1 - e
              , o = 1 - e;
            return a * a * a * t + 3 * o * o * e * i + 3 * (1 - e) * e * e * n + e * e * e * r
        }
    }()
},
THREE.Curve = function() {}
,
THREE.Curve.prototype = {
    constructor: THREE.Curve,
    getPoint: function(e) {
        return null
    },
    getPointAt: function(e) {
        return e = this.getUtoTmapping(e),
        this.getPoint(e)
    },
    getPoints: function(e) {
        e || (e = 5);
        var t, i = [];
        for (t = 0; e >= t; t++)
            i.push(this.getPoint(t / e));
        return i
    },
    getSpacedPoints: function(e) {
        e || (e = 5);
        var t, i = [];
        for (t = 0; e >= t; t++)
            i.push(this.getPointAt(t / e));
        return i
    },
    getLength: function() {
        var e = this.getLengths();
        return e[e.length - 1]
    },
    getLengths: function(e) {
        if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200),
        this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
            return this.cacheArcLengths;
        this.needsUpdate = !1;
        var t, i, n = [], r = this.getPoint(0), a = 0;
        for (n.push(0),
        i = 1; e >= i; i++)
            t = this.getPoint(i / e),
            a += t.distanceTo(r),
            n.push(a),
            r = t;
        return this.cacheArcLengths = n
    },
    updateArcLengths: function() {
        this.needsUpdate = !0,
        this.getLengths()
    },
    getUtoTmapping: function(e, t) {
        var i, n = this.getLengths(), r = 0, a = n.length;
        i = t ? t : e * n[a - 1];
        for (var o, s = 0, c = a - 1; c >= s; )
            if (r = Math.floor(s + (c - s) / 2),
            o = n[r] - i,
            0 > o)
                s = r + 1;
            else {
                if (!(o > 0)) {
                    c = r;
                    break
                }
                c = r - 1
            }
        return r = c,
        n[r] === i ? r / (a - 1) : (s = n[r],
        n = (r + (i - s) / (n[r + 1] - s)) / (a - 1))
    },
    getTangent: function(e) {
        var t = e - 1e-4;
        return e += 1e-4,
        0 > t && (t = 0),
        e > 1 && (e = 1),
        t = this.getPoint(t),
        this.getPoint(e).clone().sub(t).normalize()
    },
    getTangentAt: function(e) {
        return e = this.getUtoTmapping(e),
        this.getTangent(e)
    }
},
THREE.Curve.create = function(e, t) {
    return e.prototype = Object.create(THREE.Curve.prototype),
    e.prototype.constructor = e,
    e.prototype.getPoint = t,
    e
}
,
THREE.CurvePath = function() {
    this.curves = [],
    this.autoClose = !1
}
,
THREE.CurvePath.prototype = Object.assign(Object.create(THREE.Curve.prototype), {
    constructor: THREE.CurvePath,
    add: function(e) {
        this.curves.push(e)
    },
    closePath: function() {
        var e = this.curves[0].getPoint(0)
          , t = this.curves[this.curves.length - 1].getPoint(1);
        e.equals(t) || this.curves.push(new THREE.LineCurve(t,e))
    },
    getPoint: function(e) {
        for (var t = e * this.getLength(), i = this.getCurveLengths(), n = 0; n < i.length; ) {
            if (i[n] >= t)
                return e = this.curves[n],
                t = 1 - (i[n] - t) / e.getLength(),
                e.getPointAt(t);
            n++
        }
        return null
    },
    getLength: function() {
        var e = this.getCurveLengths();
        return e[e.length - 1]
    },
    getCurveLengths: function() {
        if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
            return this.cacheLengths;
        for (var e = [], t = 0, i = 0, n = this.curves.length; n > i; i++)
            t += this.curves[i].getLength(),
            e.push(t);
        return this.cacheLengths = e
    },
    createPointsGeometry: function(e) {
        return e = this.getPoints(e),
        this.createGeometry(e)
    },
    createSpacedPointsGeometry: function(e) {
        return e = this.getSpacedPoints(e),
        this.createGeometry(e)
    },
    createGeometry: function(e) {
        for (var t = new THREE.Geometry, i = 0, n = e.length; n > i; i++) {
            var r = e[i];
            t.vertices.push(new THREE.Vector3(r.x,r.y,r.z || 0))
        }
        return t
    }
}),
THREE.Font = function(e) {
    this.data = e
}
,
Object.assign(THREE.Font.prototype, {
    generateShapes: function(e, t, i) {
        void 0 === t && (t = 100),
        void 0 === i && (i = 4);
        var n = this.data;
        e = String(e).split("");
        var r = t / n.resolution
          , a = 0;
        t = [];
        for (var o = 0; o < e.length; o++) {
            var s;
            s = r;
            var c = a
              , h = n.glyphs[e[o]] || n.glyphs["?"];
            if (h) {
                var l = new THREE.Path
                  , u = []
                  , p = THREE.ShapeUtils.b2
                  , d = THREE.ShapeUtils.b3
                  , f = void 0
                  , E = void 0
                  , m = E = f = void 0
                  , g = void 0
                  , v = void 0
                  , T = void 0
                  , y = void 0
                  , R = void 0
                  , g = void 0;
                if (h.o)
                    for (var x = h._cachedOutline || (h._cachedOutline = h.o.split(" ")), H = 0, b = x.length; b > H; )
                        switch (x[H++]) {
                        case "m":
                            f = x[H++] * s + c,
                            E = x[H++] * s,
                            l.moveTo(f, E);
                            break;
                        case "l":
                            f = x[H++] * s + c,
                            E = x[H++] * s,
                            l.lineTo(f, E);
                            break;
                        case "q":
                            if (f = x[H++] * s + c,
                            E = x[H++] * s,
                            v = x[H++] * s + c,
                            T = x[H++] * s,
                            l.quadraticCurveTo(v, T, f, E),
                            g = u[u.length - 1])
                                for (var m = g.x, g = g.y, M = 1; i >= M; M++) {
                                    var _ = M / i;
                                    p(_, m, v, f),
                                    p(_, g, T, E)
                                }
                            break;
                        case "b":
                            if (f = x[H++] * s + c,
                            E = x[H++] * s,
                            v = x[H++] * s + c,
                            T = x[H++] * s,
                            y = x[H++] * s + c,
                            R = x[H++] * s,
                            l.bezierCurveTo(v, T, y, R, f, E),
                            g = u[u.length - 1])
                                for (m = g.x,
                                g = g.y,
                                M = 1; i >= M; M++)
                                    _ = M / i,
                                    d(_, m, v, y, f),
                                    d(_, g, T, R, E)
                        }
                s = {
                    offset: h.ha * s,
                    path: l
                }
            } else
                s = void 0;
            a += s.offset,
            t.push(s.path)
        }
        for (i = [],
        n = 0,
        e = t.length; e > n; n++)
            Array.prototype.push.apply(i, t[n].toShapes());
        return i
    }
}),
THREE.Path = function(e) {
    THREE.CurvePath.call(this),
    this.actions = [],
    e && this.fromPoints(e)
}
,
THREE.Path.prototype = Object.assign(Object.create(THREE.CurvePath.prototype), {
    constructor: THREE.Path,
    fromPoints: function(e) {
        this.moveTo(e[0].x, e[0].y);
        for (var t = 1, i = e.length; i > t; t++)
            this.lineTo(e[t].x, e[t].y)
    },
    moveTo: function(e, t) {
        this.actions.push({
            action: "moveTo",
            args: [e, t]
        })
    },
    lineTo: function(e, t) {
        var i = this.actions[this.actions.length - 1].args
          , i = new THREE.LineCurve(new THREE.Vector2(i[i.length - 2],i[i.length - 1]),new THREE.Vector2(e,t));
        this.curves.push(i),
        this.actions.push({
            action: "lineTo",
            args: [e, t]
        })
    },
    quadraticCurveTo: function(e, t, i, n) {
        var r = this.actions[this.actions.length - 1].args
          , r = new THREE.QuadraticBezierCurve(new THREE.Vector2(r[r.length - 2],r[r.length - 1]),new THREE.Vector2(e,t),new THREE.Vector2(i,n));
        this.curves.push(r),
        this.actions.push({
            action: "quadraticCurveTo",
            args: [e, t, i, n]
        })
    },
    bezierCurveTo: function(e, t, i, n, r, a) {
        var o = this.actions[this.actions.length - 1].args
          , o = new THREE.CubicBezierCurve(new THREE.Vector2(o[o.length - 2],o[o.length - 1]),new THREE.Vector2(e,t),new THREE.Vector2(i,n),new THREE.Vector2(r,a));
        this.curves.push(o),
        this.actions.push({
            action: "bezierCurveTo",
            args: [e, t, i, n, r, a]
        })
    },
    splineThru: function(e) {
        var t = Array.prototype.slice.call(arguments)
          , i = this.actions[this.actions.length - 1].args
          , i = [new THREE.Vector2(i[i.length - 2],i[i.length - 1])];
        Array.prototype.push.apply(i, e),
        i = new THREE.SplineCurve(i),
        this.curves.push(i),
        this.actions.push({
            action: "splineThru",
            args: t
        })
    },
    arc: function(e, t, i, n, r, a) {
        var o = this.actions[this.actions.length - 1].args;
        this.absarc(e + o[o.length - 2], t + o[o.length - 1], i, n, r, a)
    },
    absarc: function(e, t, i, n, r, a) {
        this.absellipse(e, t, i, i, n, r, a)
    },
    ellipse: function(e, t, i, n, r, a, o, s) {
        var c = this.actions[this.actions.length - 1].args;
        this.absellipse(e + c[c.length - 2], t + c[c.length - 1], i, n, r, a, o, s)
    },
    absellipse: function(e, t, i, n, r, a, o, s) {
        var c = [e, t, i, n, r, a, o, s || 0];
        e = new THREE.EllipseCurve(e,t,i,n,r,a,o,s),
        this.curves.push(e),
        e = e.getPoint(1),
        c.push(e.x),
        c.push(e.y),
        this.actions.push({
            action: "ellipse",
            args: c
        })
    },
    getSpacedPoints: function(e) {
        e || (e = 40);
        for (var t = [], i = 0; e > i; i++)
            t.push(this.getPoint(i / e));
        return this.autoClose && t.push(t[0]),
        t
    },
    getPoints: function(e) {
        e = e || 12;
        for (var t, i, n, r, a, o, s, c, h, l, u = THREE.ShapeUtils.b2, p = THREE.ShapeUtils.b3, d = [], f = 0, E = this.actions.length; E > f; f++) {
            h = this.actions[f];
            var m = h.args;
            switch (h.action) {
            case "moveTo":
                d.push(new THREE.Vector2(m[0],m[1]));
                break;
            case "lineTo":
                d.push(new THREE.Vector2(m[0],m[1]));
                break;
            case "quadraticCurveTo":
                for (t = m[2],
                i = m[3],
                a = m[0],
                o = m[1],
                0 < d.length ? (h = d[d.length - 1],
                s = h.x,
                c = h.y) : (h = this.actions[f - 1].args,
                s = h[h.length - 2],
                c = h[h.length - 1]),
                m = 1; e >= m; m++)
                    l = m / e,
                    h = u(l, s, a, t),
                    l = u(l, c, o, i),
                    d.push(new THREE.Vector2(h,l));
                break;
            case "bezierCurveTo":
                for (t = m[4],
                i = m[5],
                a = m[0],
                o = m[1],
                n = m[2],
                r = m[3],
                0 < d.length ? (h = d[d.length - 1],
                s = h.x,
                c = h.y) : (h = this.actions[f - 1].args,
                s = h[h.length - 2],
                c = h[h.length - 1]),
                m = 1; e >= m; m++)
                    l = m / e,
                    h = p(l, s, a, n, t),
                    l = p(l, c, o, r, i),
                    d.push(new THREE.Vector2(h,l));
                break;
            case "splineThru":
                for (h = this.actions[f - 1].args,
                l = [new THREE.Vector2(h[h.length - 2],h[h.length - 1])],
                h = e * m[0].length,
                l = l.concat(m[0]),
                l = new THREE.SplineCurve(l),
                m = 1; h >= m; m++)
                    d.push(l.getPointAt(m / h));
                break;
            case "arc":
                for (t = m[0],
                i = m[1],
                o = m[2],
                n = m[3],
                h = m[4],
                a = !!m[5],
                s = h - n,
                c = 2 * e,
                m = 1; c >= m; m++)
                    l = m / c,
                    a || (l = 1 - l),
                    l = n + l * s,
                    h = t + o * Math.cos(l),
                    l = i + o * Math.sin(l),
                    d.push(new THREE.Vector2(h,l));
                break;
            case "ellipse":
                t = m[0],
                i = m[1],
                o = m[2],
                r = m[3],
                n = m[4],
                h = m[5],
                a = !!m[6];
                var g = m[7];
                s = h - n,
                c = 2 * e;
                var v, T;
                for (0 !== g && (v = Math.cos(g),
                T = Math.sin(g)),
                m = 1; c >= m; m++) {
                    if (l = m / c,
                    a || (l = 1 - l),
                    l = n + l * s,
                    h = t + o * Math.cos(l),
                    l = i + r * Math.sin(l),
                    0 !== g) {
                        var y = h;
                        h = (y - t) * v - (l - i) * T + t,
                        l = (y - t) * T + (l - i) * v + i
                    }
                    d.push(new THREE.Vector2(h,l))
                }
            }
        }
        return e = d[d.length - 1],
        Math.abs(e.x - d[0].x) < Number.EPSILON && Math.abs(e.y - d[0].y) < Number.EPSILON && d.splice(d.length - 1, 1),
        this.autoClose && d.push(d[0]),
        d
    },
    toShapes: function(e, t) {
        function i(e) {
            for (var t = [], i = 0, n = e.length; n > i; i++) {
                var r = e[i]
                  , a = new THREE.Shape;
                a.actions = r.actions,
                a.curves = r.curves,
                t.push(a)
            }
            return t
        }
        function n(e, t) {
            for (var i = t.length, n = !1, r = i - 1, a = 0; i > a; r = a++) {
                var o = t[r]
                  , s = t[a]
                  , c = s.x - o.x
                  , h = s.y - o.y;
                if (Math.abs(h) > Number.EPSILON) {
                    if (0 > h && (o = t[a],
                    c = -c,
                    s = t[r],
                    h = -h),
                    !(e.y < o.y || e.y > s.y))
                        if (e.y === o.y) {
                            if (e.x === o.x)
                                return !0
                        } else {
                            if (r = h * (e.x - o.x) - c * (e.y - o.y),
                            0 === r)
                                return !0;
                            0 > r || (n = !n)
                        }
                } else if (e.y === o.y && (s.x <= e.x && e.x <= o.x || o.x <= e.x && e.x <= s.x))
                    return !0
            }
            return n
        }
        var r = THREE.ShapeUtils.isClockWise
          , a = function(e) {
            for (var t = [], i = new THREE.Path, n = 0, r = e.length; r > n; n++) {
                var a = e[n]
                  , o = a.args
                  , a = a.action;
                "moveTo" === a && 0 !== i.actions.length && (t.push(i),
                i = new THREE.Path),
                i[a].apply(i, o)
            }
            return 0 !== i.actions.length && t.push(i),
            t
        }(this.actions);
        if (0 === a.length)
            return [];
        if (!0 === t)
            return i(a);
        var o, s, c, h = [];
        if (1 === a.length)
            return s = a[0],
            c = new THREE.Shape,
            c.actions = s.actions,
            c.curves = s.curves,
            h.push(c),
            h;
        var l = !r(a[0].getPoints())
          , l = e ? !l : l;
        c = [];
        var u, p = [], d = [], f = 0;
        p[f] = void 0,
        d[f] = [];
        for (var E = 0, m = a.length; m > E; E++)
            s = a[E],
            u = s.getPoints(),
            o = r(u),
            (o = e ? !o : o) ? (!l && p[f] && f++,
            p[f] = {
                s: new THREE.Shape,
                p: u
            },
            p[f].s.actions = s.actions,
            p[f].s.curves = s.curves,
            l && f++,
            d[f] = []) : d[f].push({
                h: s,
                p: u[0]
            });
        if (!p[0])
            return i(a);
        if (1 < p.length) {
            for (E = !1,
            s = [],
            r = 0,
            a = p.length; a > r; r++)
                c[r] = [];
            for (r = 0,
            a = p.length; a > r; r++)
                for (o = d[r],
                l = 0; l < o.length; l++) {
                    for (f = o[l],
                    u = !0,
                    m = 0; m < p.length; m++)
                        n(f.p, p[m].p) && (r !== m && s.push({
                            froms: r,
                            tos: m,
                            hole: l
                        }),
                        u ? (u = !1,
                        c[m].push(f)) : E = !0);
                    u && c[r].push(f)
                }
            0 < s.length && (E || (d = c))
        }
        for (E = 0,
        r = p.length; r > E; E++)
            for (c = p[E].s,
            h.push(c),
            s = d[E],
            a = 0,
            o = s.length; o > a; a++)
                c.holes.push(s[a].h);
        return h
    }
}),
THREE.Shape = function() {
    THREE.Path.apply(this, arguments),
    this.holes = []
}
,
THREE.Shape.prototype = Object.assign(Object.create(THREE.Path.prototype), {
    constructor: THREE.Shape,
    extrude: function(e) {
        return new THREE.ExtrudeGeometry(this,e)
    },
    makeGeometry: function(e) {
        return new THREE.ShapeGeometry(this,e)
    },
    getPointsHoles: function(e) {
        for (var t = [], i = 0, n = this.holes.length; n > i; i++)
            t[i] = this.holes[i].getPoints(e);
        return t
    },
    extractAllPoints: function(e) {
        return {
            shape: this.getPoints(e),
            holes: this.getPointsHoles(e)
        }
    },
    extractPoints: function(e) {
        return this.extractAllPoints(e)
    }
}),
THREE.LineCurve = function(e, t) {
    this.v1 = e,
    this.v2 = t
}
,
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.LineCurve.prototype.constructor = THREE.LineCurve,
THREE.LineCurve.prototype.getPoint = function(e) {
    var t = this.v2.clone().sub(this.v1);
    return t.multiplyScalar(e).add(this.v1),
    t
}
,
THREE.LineCurve.prototype.getPointAt = function(e) {
    return this.getPoint(e)
}
,
THREE.LineCurve.prototype.getTangent = function(e) {
    return this.v2.clone().sub(this.v1).normalize()
}
,
THREE.QuadraticBezierCurve = function(e, t, i) {
    this.v0 = e,
    this.v1 = t,
    this.v2 = i
}
,
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve,
THREE.QuadraticBezierCurve.prototype.getPoint = function(e) {
    var t = THREE.ShapeUtils.b2;
    return new THREE.Vector2(t(e, this.v0.x, this.v1.x, this.v2.x),t(e, this.v0.y, this.v1.y, this.v2.y))
}
,
THREE.QuadraticBezierCurve.prototype.getTangent = function(e) {
    var t = THREE.CurveUtils.tangentQuadraticBezier;
    return new THREE.Vector2(t(e, this.v0.x, this.v1.x, this.v2.x),t(e, this.v0.y, this.v1.y, this.v2.y)).normalize()
}
,
THREE.CubicBezierCurve = function(e, t, i, n) {
    this.v0 = e,
    this.v1 = t,
    this.v2 = i,
    this.v3 = n
}
,
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve,
THREE.CubicBezierCurve.prototype.getPoint = function(e) {
    var t = THREE.ShapeUtils.b3;
    return new THREE.Vector2(t(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x),t(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y))
}
,
THREE.CubicBezierCurve.prototype.getTangent = function(e) {
    var t = THREE.CurveUtils.tangentCubicBezier;
    return new THREE.Vector2(t(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x),t(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y)).normalize()
}
,
THREE.SplineCurve = function(e) {
    this.points = void 0 == e ? [] : e
}
,
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve,
THREE.SplineCurve.prototype.getPoint = function(e) {
    var t = this.points;
    e *= t.length - 1;
    var i = Math.floor(e);
    e -= i;
    var n = t[0 === i ? i : i - 1]
      , r = t[i]
      , a = t[i > t.length - 2 ? t.length - 1 : i + 1]
      , t = t[i > t.length - 3 ? t.length - 1 : i + 2]
      , i = THREE.CurveUtils.interpolate;
    return new THREE.Vector2(i(n.x, r.x, a.x, t.x, e),i(n.y, r.y, a.y, t.y, e))
}
,
THREE.EllipseCurve = function(e, t, i, n, r, a, o, s) {
    this.aX = e,
    this.aY = t,
    this.xRadius = i,
    this.yRadius = n,
    this.aStartAngle = r,
    this.aEndAngle = a,
    this.aClockwise = o,
    this.aRotation = s || 0
}
,
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve,
THREE.EllipseCurve.prototype.getPoint = function(e) {
    var t = this.aEndAngle - this.aStartAngle;
    0 > t && (t += 2 * Math.PI),
    t > 2 * Math.PI && (t -= 2 * Math.PI),
    t = !0 === this.aClockwise ? this.aEndAngle + (1 - e) * (2 * Math.PI - t) : this.aStartAngle + e * t,
    e = this.aX + this.xRadius * Math.cos(t);
    var i = this.aY + this.yRadius * Math.sin(t);
    if (0 !== this.aRotation) {
        var t = Math.cos(this.aRotation)
          , n = Math.sin(this.aRotation)
          , r = e;
        e = (r - this.aX) * t - (i - this.aY) * n + this.aX,
        i = (r - this.aX) * n + (i - this.aY) * t + this.aY
    }
    return new THREE.Vector2(e,i)
}
,
THREE.ArcCurve = function(e, t, i, n, r, a) {
    THREE.EllipseCurve.call(this, e, t, i, i, n, r, a)
}
,
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype),
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve,
THREE.LineCurve3 = THREE.Curve.create(function(e, t) {
    this.v1 = e,
    this.v2 = t
}, function(e) {
    var t = new THREE.Vector3;
    return t.subVectors(this.v2, this.v1),
    t.multiplyScalar(e),
    t.add(this.v1),
    t
}),
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(e, t, i) {
    this.v0 = e,
    this.v1 = t,
    this.v2 = i
}, function(e) {
    var t = THREE.ShapeUtils.b2;
    return new THREE.Vector3(t(e, this.v0.x, this.v1.x, this.v2.x),t(e, this.v0.y, this.v1.y, this.v2.y),t(e, this.v0.z, this.v1.z, this.v2.z))
}),
THREE.CubicBezierCurve3 = THREE.Curve.create(function(e, t, i, n) {
    this.v0 = e,
    this.v1 = t,
    this.v2 = i,
    this.v3 = n
}, function(e) {
    var t = THREE.ShapeUtils.b3;
    return new THREE.Vector3(t(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x),t(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y),t(e, this.v0.z, this.v1.z, this.v2.z, this.v3.z))
}),
THREE.SplineCurve3 = THREE.Curve.create(function(e) {
    this.points = void 0 == e ? [] : e
}, function(e) {
    var t = this.points;
    e *= t.length - 1;
    var i = Math.floor(e);
    e -= i;
    var n = t[0 == i ? i : i - 1]
      , r = t[i]
      , a = t[i > t.length - 2 ? t.length - 1 : i + 1]
      , t = t[i > t.length - 3 ? t.length - 1 : i + 2]
      , i = THREE.CurveUtils.interpolate;
    return new THREE.Vector3(i(n.x, r.x, a.x, t.x, e),i(n.y, r.y, a.y, t.y, e),i(n.z, r.z, a.z, t.z, e))
}),
THREE.CatmullRomCurve3 = function() {
    function e() {}
    var t = new THREE.Vector3
      , i = new e
      , n = new e
      , r = new e;
    return e.prototype.init = function(e, t, i, n) {
        this.c0 = e,
        this.c1 = i,
        this.c2 = -3 * e + 3 * t - 2 * i - n,
        this.c3 = 2 * e - 2 * t + i + n
    }
    ,
    e.prototype.initNonuniformCatmullRom = function(e, t, i, n, r, a, o) {
        e = ((t - e) / r - (i - e) / (r + a) + (i - t) / a) * a,
        n = ((i - t) / a - (n - t) / (a + o) + (n - i) / o) * a,
        this.init(t, i, e, n)
    }
    ,
    e.prototype.initCatmullRom = function(e, t, i, n, r) {
        this.init(t, i, r * (i - e), r * (n - t))
    }
    ,
    e.prototype.calc = function(e) {
        var t = e * e;
        return this.c0 + this.c1 * e + this.c2 * t + this.c3 * t * e
    }
    ,
    THREE.Curve.create(function(e) {
        this.points = e || [],
        this.closed = !1
    }, function(e) {
        var a, o, s = this.points;
        o = s.length,
        e *= o - (this.closed ? 0 : 1),
        a = Math.floor(e),
        e -= a,
        this.closed ? a += a > 0 ? 0 : (Math.floor(Math.abs(a) / s.length) + 1) * s.length : 0 === e && a === o - 1 && (a = o - 2,
        e = 1);
        var c, h, l;
        if (this.closed || a > 0 ? c = s[(a - 1) % o] : (t.subVectors(s[0], s[1]).add(s[0]),
        c = t),
        h = s[a % o],
        l = s[(a + 1) % o],
        this.closed || o > a + 2 ? s = s[(a + 2) % o] : (t.subVectors(s[o - 1], s[o - 2]).add(s[o - 1]),
        s = t),
        void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
            var u = "chordal" === this.type ? .5 : .25;
            o = Math.pow(c.distanceToSquared(h), u),
            a = Math.pow(h.distanceToSquared(l), u),
            u = Math.pow(l.distanceToSquared(s), u),
            1e-4 > a && (a = 1),
            1e-4 > o && (o = a),
            1e-4 > u && (u = a),
            i.initNonuniformCatmullRom(c.x, h.x, l.x, s.x, o, a, u),
            n.initNonuniformCatmullRom(c.y, h.y, l.y, s.y, o, a, u),
            r.initNonuniformCatmullRom(c.z, h.z, l.z, s.z, o, a, u)
        } else
            "catmullrom" === this.type && (o = void 0 !== this.tension ? this.tension : .5,
            i.initCatmullRom(c.x, h.x, l.x, s.x, o),
            n.initCatmullRom(c.y, h.y, l.y, s.y, o),
            r.initCatmullRom(c.z, h.z, l.z, s.z, o));
        return new THREE.Vector3(i.calc(e),n.calc(e),r.calc(e))
    })
}(),
THREE.ClosedSplineCurve3 = function(e) {
    THREE.CatmullRomCurve3.call(this, e),
    this.type = "catmullrom",
    this.closed = !0
}
,
THREE.ClosedSplineCurve3.prototype = Object.create(THREE.CatmullRomCurve3.prototype),
THREE.BoxGeometry = function(e, t, i, n, r, a) {
    THREE.Geometry.call(this),
    this.type = "BoxGeometry",
    this.parameters = {
        width: e,
        height: t,
        depth: i,
        widthSegments: n,
        heightSegments: r,
        depthSegments: a
    },
    this.fromBufferGeometry(new THREE.BoxBufferGeometry(e,t,i,n,r,a)),
    this.mergeVertices()
}
,
THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry,
THREE.CubeGeometry = THREE.BoxGeometry,
THREE.BoxBufferGeometry = function(e, t, i, n, r, a) {
    function o(e, t, i, n, r, a, o, c, h, T, y) {
        var R = a / h
          , x = o / T
          , H = a / 2
          , b = o / 2
          , M = c / 2;
        o = h + 1;
        for (var _ = T + 1, w = a = 0, S = new THREE.Vector3, A = 0; _ > A; A++)
            for (var L = A * x - b, C = 0; o > C; C++)
                S[e] = (C * R - H) * n,
                S[t] = L * r,
                S[i] = M,
                u[f] = S.x,
                u[f + 1] = S.y,
                u[f + 2] = S.z,
                S[e] = 0,
                S[t] = 0,
                S[i] = c > 0 ? 1 : -1,
                p[f] = S.x,
                p[f + 1] = S.y,
                p[f + 2] = S.z,
                d[E] = C / h,
                d[E + 1] = 1 - A / T,
                f += 3,
                E += 2,
                a += 1;
        for (A = 0; T > A; A++)
            for (C = 0; h > C; C++)
                e = g + C + o * (A + 1),
                t = g + (C + 1) + o * (A + 1),
                i = g + (C + 1) + o * A,
                l[m] = g + C + o * A,
                l[m + 1] = e,
                l[m + 2] = i,
                l[m + 3] = e,
                l[m + 4] = t,
                l[m + 5] = i,
                m += 6,
                w += 6;
        s.addGroup(v, w, y),
        v += w,
        g += a
    }
    THREE.BufferGeometry.call(this),
    this.type = "BoxBufferGeometry",
    this.parameters = {
        width: e,
        height: t,
        depth: i,
        widthSegments: n,
        heightSegments: r,
        depthSegments: a
    };
    var s = this;
    n = Math.floor(n) || 1,
    r = Math.floor(r) || 1,
    a = Math.floor(a) || 1;
    var c = function(e, t, i) {
        return e = 0 + (e + 1) * (t + 1) * 2 + (e + 1) * (i + 1) * 2,
        e += (i + 1) * (t + 1) * 2
    }(n, r, a)
      , h = function(e, t, i) {
        return e = 0 + e * t * 2 + e * i * 2,
        e += i * t * 2,
        6 * e
    }(n, r, a)
      , l = new (h > 65535 ? Uint32Array : Uint16Array)(h)
      , u = new Float32Array(3 * c)
      , p = new Float32Array(3 * c)
      , d = new Float32Array(2 * c)
      , f = 0
      , E = 0
      , m = 0
      , g = 0
      , v = 0;
    o("z", "y", "x", -1, -1, i, t, e, a, r, 0),
    o("z", "y", "x", 1, -1, i, t, -e, a, r, 1),
    o("x", "z", "y", 1, 1, e, i, t, n, a, 2),
    o("x", "z", "y", 1, -1, e, i, -t, n, a, 3),
    o("x", "y", "z", 1, -1, e, t, i, n, r, 4),
    o("x", "y", "z", -1, -1, e, t, -i, n, r, 5),
    this.setIndex(new THREE.BufferAttribute(l,1)),
    this.addAttribute("position", new THREE.BufferAttribute(u,3)),
    this.addAttribute("normal", new THREE.BufferAttribute(p,3)),
    this.addAttribute("uv", new THREE.BufferAttribute(d,2))
}
,
THREE.BoxBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.BoxBufferGeometry.prototype.constructor = THREE.BoxBufferGeometry,
THREE.CircleGeometry = function(e, t, i, n) {
    THREE.Geometry.call(this),
    this.type = "CircleGeometry",
    this.parameters = {
        radius: e,
        segments: t,
        thetaStart: i,
        thetaLength: n
    },
    this.fromBufferGeometry(new THREE.CircleBufferGeometry(e,t,i,n))
}
,
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry,
THREE.CircleBufferGeometry = function(e, t, i, n) {
    THREE.BufferGeometry.call(this),
    this.type = "CircleBufferGeometry",
    this.parameters = {
        radius: e,
        segments: t,
        thetaStart: i,
        thetaLength: n
    },
    e = e || 50,
    t = void 0 !== t ? Math.max(3, t) : 8,
    i = void 0 !== i ? i : 0,
    n = void 0 !== n ? n : 2 * Math.PI;
    var r = t + 2
      , a = new Float32Array(3 * r)
      , o = new Float32Array(3 * r)
      , r = new Float32Array(2 * r);
    o[2] = 1,
    r[0] = .5,
    r[1] = .5;
    for (var s = 0, c = 3, h = 2; t >= s; s++,
    c += 3,
    h += 2) {
        var l = i + s / t * n;
        a[c] = e * Math.cos(l),
        a[c + 1] = e * Math.sin(l),
        o[c + 2] = 1,
        r[h] = (a[c] / e + 1) / 2,
        r[h + 1] = (a[c + 1] / e + 1) / 2
    }
    for (i = [],
    c = 1; t >= c; c++)
        i.push(c, c + 1, 0);
    this.setIndex(new THREE.BufferAttribute(new Uint16Array(i),1)),
    this.addAttribute("position", new THREE.BufferAttribute(a,3)),
    this.addAttribute("normal", new THREE.BufferAttribute(o,3)),
    this.addAttribute("uv", new THREE.BufferAttribute(r,2)),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,e)
}
,
THREE.CircleBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.CircleBufferGeometry.prototype.constructor = THREE.CircleBufferGeometry,
THREE.CylinderBufferGeometry = function(e, t, i, n, r, a, o, s) {
    function c(i) {
        var r, a, c, l = new THREE.Vector2, u = new THREE.Vector3, p = 0, T = !0 === i ? e : t, x = !0 === i ? 1 : -1;
        for (a = g,
        r = 1; n >= r; r++)
            f.setXYZ(g, 0, y * x, 0),
            E.setXYZ(g, 0, x, 0),
            l.x = .5,
            l.y = .5,
            m.setXY(g, l.x, l.y),
            g++;
        for (c = g,
        r = 0; n >= r; r++) {
            var H = r / n * s + o
              , b = Math.cos(H)
              , H = Math.sin(H);
            u.x = T * H,
            u.y = y * x,
            u.z = T * b,
            f.setXYZ(g, u.x, u.y, u.z),
            E.setXYZ(g, 0, x, 0),
            l.x = .5 * b + .5,
            l.y = .5 * H * x + .5,
            m.setXY(g, l.x, l.y),
            g++
        }
        for (r = 0; n > r; r++)
            l = a + r,
            u = c + r,
            !0 === i ? (d.setX(v, u),
            v++,
            d.setX(v, u + 1)) : (d.setX(v, u + 1),
            v++,
            d.setX(v, u)),
            v++,
            d.setX(v, l),
            v++,
            p += 3;
        h.addGroup(R, p, !0 === i ? 1 : 2),
        R += p
    }
    THREE.BufferGeometry.call(this),
    this.type = "CylinderBufferGeometry",
    this.parameters = {
        radiusTop: e,
        radiusBottom: t,
        height: i,
        radialSegments: n,
        heightSegments: r,
        openEnded: a,
        thetaStart: o,
        thetaLength: s
    };
    var h = this;
    e = void 0 !== e ? e : 20,
    t = void 0 !== t ? t : 20,
    i = void 0 !== i ? i : 100,
    n = Math.floor(n) || 8,
    r = Math.floor(r) || 1,
    a = void 0 !== a ? a : !1,
    o = void 0 !== o ? o : 0,
    s = void 0 !== s ? s : 2 * Math.PI;
    var l = 0;
    !1 === a && (e > 0 && l++,
    t > 0 && l++);
    var u = function() {
        var e = (n + 1) * (r + 1);
        return !1 === a && (e += (n + 1) * l + n * l),
        e
    }()
      , p = function() {
        var e = n * r * 6;
        return !1 === a && (e += n * l * 3),
        e
    }()
      , d = new THREE.BufferAttribute(new (p > 65535 ? Uint32Array : Uint16Array)(p),1)
      , f = new THREE.BufferAttribute(new Float32Array(3 * u),3)
      , E = new THREE.BufferAttribute(new Float32Array(3 * u),3)
      , m = new THREE.BufferAttribute(new Float32Array(2 * u),2)
      , g = 0
      , v = 0
      , T = []
      , y = i / 2
      , R = 0;
    !function() {
        var a, c, l = new THREE.Vector3, u = new THREE.Vector3, p = 0, x = (t - e) / i;
        for (c = 0; r >= c; c++) {
            var H = []
              , b = c / r
              , M = b * (t - e) + e;
            for (a = 0; n >= a; a++) {
                var _ = a / n;
                u.x = M * Math.sin(_ * s + o),
                u.y = -b * i + y,
                u.z = M * Math.cos(_ * s + o),
                f.setXYZ(g, u.x, u.y, u.z),
                l.copy(u),
                (0 === e && 0 === c || 0 === t && c === r) && (l.x = Math.sin(_ * s + o),
                l.z = Math.cos(_ * s + o)),
                l.setY(Math.sqrt(l.x * l.x + l.z * l.z) * x).normalize(),
                E.setXYZ(g, l.x, l.y, l.z),
                m.setXY(g, _, 1 - b),
                H.push(g),
                g++
            }
            T.push(H)
        }
        for (a = 0; n > a; a++)
            for (c = 0; r > c; c++)
                l = T[c + 1][a],
                u = T[c + 1][a + 1],
                x = T[c][a + 1],
                d.setX(v, T[c][a]),
                v++,
                d.setX(v, l),
                v++,
                d.setX(v, x),
                v++,
                d.setX(v, l),
                v++,
                d.setX(v, u),
                v++,
                d.setX(v, x),
                v++,
                p += 6;
        h.addGroup(R, p, 0),
        R += p
    }(),
    !1 === a && (e > 0 && c(!0),
    t > 0 && c(!1)),
    this.setIndex(d),
    this.addAttribute("position", f),
    this.addAttribute("normal", E),
    this.addAttribute("uv", m)
}
,
THREE.CylinderBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.CylinderBufferGeometry.prototype.constructor = THREE.CylinderBufferGeometry,
THREE.CylinderGeometry = function(e, t, i, n, r, a, o, s) {
    THREE.Geometry.call(this),
    this.type = "CylinderGeometry",
    this.parameters = {
        radiusTop: e,
        radiusBottom: t,
        height: i,
        radialSegments: n,
        heightSegments: r,
        openEnded: a,
        thetaStart: o,
        thetaLength: s
    },
    this.fromBufferGeometry(new THREE.CylinderBufferGeometry(e,t,i,n,r,a,o,s)),
    this.mergeVertices()
}
,
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry,
THREE.ConeBufferGeometry = function(e, t, i, n, r, a, o) {
    THREE.CylinderBufferGeometry.call(this, 0, e, t, i, n, r, a, o),
    this.type = "ConeBufferGeometry",
    this.parameters = {
        radius: e,
        height: t,
        radialSegments: i,
        heightSegments: n,
        thetaStart: a,
        thetaLength: o
    }
}
,
THREE.ConeBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.ConeBufferGeometry.prototype.constructor = THREE.ConeBufferGeometry,
THREE.ConeGeometry = function(e, t, i, n, r, a, o) {
    THREE.CylinderGeometry.call(this, 0, e, t, i, n, r, a, o),
    this.type = "ConeGeometry",
    this.parameters = {
        radius: e,
        height: t,
        radialSegments: i,
        heightSegments: n,
        openEnded: r,
        thetaStart: a,
        thetaLength: o
    }
}
,
THREE.ConeGeometry.prototype = Object.create(THREE.CylinderGeometry.prototype),
THREE.ConeGeometry.prototype.constructor = THREE.ConeGeometry,
THREE.EdgesGeometry = function(e, t) {
    function i(e, t) {
        return e - t
    }
    THREE.BufferGeometry.call(this);
    var n, r = Math.cos(THREE.Math.DEG2RAD * (void 0 !== t ? t : 1)), a = [0, 0], o = {}, s = ["a", "b", "c"];
    e instanceof THREE.BufferGeometry ? (n = new THREE.Geometry,
    n.fromBufferGeometry(e)) : n = e.clone(),
    n.mergeVertices(),
    n.computeFaceNormals();
    var c = n.vertices;
    n = n.faces;
    for (var h = 0, l = n.length; l > h; h++)
        for (var u = n[h], p = 0; 3 > p; p++) {
            a[0] = u[s[p]],
            a[1] = u[s[(p + 1) % 3]],
            a.sort(i);
            var d = a.toString();
            void 0 === o[d] ? o[d] = {
                vert1: a[0],
                vert2: a[1],
                face1: h,
                face2: void 0
            } : o[d].face2 = h
        }
    a = [];
    for (d in o)
        s = o[d],
        (void 0 === s.face2 || n[s.face1].normal.dot(n[s.face2].normal) <= r) && (h = c[s.vert1],
        a.push(h.x),
        a.push(h.y),
        a.push(h.z),
        h = c[s.vert2],
        a.push(h.x),
        a.push(h.y),
        a.push(h.z));
    this.addAttribute("position", new THREE.BufferAttribute(new Float32Array(a),3))
}
,
THREE.EdgesGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.EdgesGeometry.prototype.constructor = THREE.EdgesGeometry,
THREE.ExtrudeGeometry = function(e, t) {
    "undefined" != typeof e && (THREE.Geometry.call(this),
    this.type = "ExtrudeGeometry",
    e = Array.isArray(e) ? e : [e],
    this.addShapeList(e, t),
    this.computeFaceNormals())
}
,
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry,
THREE.ExtrudeGeometry.prototype.addShapeList = function(e, t) {
    for (var i = e.length, n = 0; i > n; n++)
        this.addShape(e[n], t)
}
,
THREE.ExtrudeGeometry.prototype.addShape = function(e, t) {
    function i(e, t, i) {
        return t.clone().multiplyScalar(i).add(e)
    }
    function n(e, t, i) {
        var n = 1
          , n = e.x - t.x
          , r = e.y - t.y
          , a = i.x - e.x
          , o = i.y - e.y
          , s = n * n + r * r;
        if (Math.abs(n * o - r * a) > Number.EPSILON) {
            var c = Math.sqrt(s)
              , h = Math.sqrt(a * a + o * o)
              , s = t.x - r / c;
            if (t = t.y + n / c,
            a = ((i.x - o / h - s) * o - (i.y + a / h - t) * a) / (n * o - r * a),
            i = s + n * a - e.x,
            e = t + r * a - e.y,
            n = i * i + e * e,
            2 >= n)
                return new THREE.Vector2(i,e);
            n = Math.sqrt(n / 2)
        } else
            e = !1,
            n > Number.EPSILON ? a > Number.EPSILON && (e = !0) : n < -Number.EPSILON ? a < -Number.EPSILON && (e = !0) : Math.sign(r) === Math.sign(o) && (e = !0),
            e ? (i = -r,
            e = n,
            n = Math.sqrt(s)) : (i = n,
            e = r,
            n = Math.sqrt(s / 2));
        return new THREE.Vector2(i / n,e / n)
    }
    function r(e, t) {
        var i, n;
        for (O = e.length; 0 <= --O; ) {
            i = O,
            n = O - 1,
            0 > n && (n = e.length - 1);
            for (var r = 0, a = v + 2 * E, r = 0; a > r; r++) {
                var o = F * r
                  , s = F * (r + 1)
                  , c = t + i + o
                  , o = t + n + o
                  , h = t + n + s
                  , s = t + i + s
                  , c = c + _
                  , o = o + _
                  , h = h + _
                  , s = s + _;
                M.faces.push(new THREE.Face3(c,o,s,null ,null ,1)),
                M.faces.push(new THREE.Face3(o,h,s,null ,null ,1)),
                c = R.generateSideWallUV(M, c, o, h, s),
                M.faceVertexUvs[0].push([c[0], c[1], c[3]]),
                M.faceVertexUvs[0].push([c[1], c[2], c[3]])
            }
        }
    }
    function a(e, t, i) {
        M.vertices.push(new THREE.Vector3(e,t,i))
    }
    function o(e, t, i) {
        e += _,
        t += _,
        i += _,
        M.faces.push(new THREE.Face3(e,t,i,null ,null ,0)),
        e = R.generateTopUV(M, e, t, i),
        M.faceVertexUvs[0].push(e)
    }
    var s, c, h, l, u, p = void 0 !== t.amount ? t.amount : 100, d = void 0 !== t.bevelThickness ? t.bevelThickness : 6, f = void 0 !== t.bevelSize ? t.bevelSize : d - 2, E = void 0 !== t.bevelSegments ? t.bevelSegments : 3, m = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0, g = void 0 !== t.curveSegments ? t.curveSegments : 12, v = void 0 !== t.steps ? t.steps : 1, T = t.extrudePath, y = !1, R = void 0 !== t.UVGenerator ? t.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;
    T && (s = T.getSpacedPoints(v),
    y = !0,
    m = !1,
    c = void 0 !== t.frames ? t.frames : new THREE.TubeGeometry.FrenetFrames(T,v,!1),
    h = new THREE.Vector3,
    l = new THREE.Vector3,
    u = new THREE.Vector3),
    m || (f = d = E = 0);
    var x, H, b, M = this, _ = this.vertices.length, T = e.extractPoints(g), g = T.shape, w = T.holes;
    if (T = !THREE.ShapeUtils.isClockWise(g)) {
        for (g = g.reverse(),
        H = 0,
        b = w.length; b > H; H++)
            x = w[H],
            THREE.ShapeUtils.isClockWise(x) && (w[H] = x.reverse());
        T = !1
    }
    var S = THREE.ShapeUtils.triangulateShape(g, w)
      , A = g;
    for (H = 0,
    b = w.length; b > H; H++)
        x = w[H],
        g = g.concat(x);
    var L, C, P, I, B, D, F = g.length, U = S.length, T = [], O = 0;
    for (P = A.length,
    L = P - 1,
    C = O + 1; P > O; O++,
    L++,
    C++)
        L === P && (L = 0),
        C === P && (C = 0),
        T[O] = n(A[O], A[L], A[C]);
    var N, V = [], z = T.concat();
    for (H = 0,
    b = w.length; b > H; H++) {
        for (x = w[H],
        N = [],
        O = 0,
        P = x.length,
        L = P - 1,
        C = O + 1; P > O; O++,
        L++,
        C++)
            L === P && (L = 0),
            C === P && (C = 0),
            N[O] = n(x[O], x[L], x[C]);
        V.push(N),
        z = z.concat(N)
    }
    for (L = 0; E > L; L++) {
        for (P = L / E,
        I = d * (1 - P),
        C = f * Math.sin(P * Math.PI / 2),
        O = 0,
        P = A.length; P > O; O++)
            B = i(A[O], T[O], C),
            a(B.x, B.y, -I);
        for (H = 0,
        b = w.length; b > H; H++)
            for (x = w[H],
            N = V[H],
            O = 0,
            P = x.length; P > O; O++)
                B = i(x[O], N[O], C),
                a(B.x, B.y, -I)
    }
    for (C = f,
    O = 0; F > O; O++)
        B = m ? i(g[O], z[O], C) : g[O],
        y ? (l.copy(c.normals[0]).multiplyScalar(B.x),
        h.copy(c.binormals[0]).multiplyScalar(B.y),
        u.copy(s[0]).add(l).add(h),
        a(u.x, u.y, u.z)) : a(B.x, B.y, 0);
    for (P = 1; v >= P; P++)
        for (O = 0; F > O; O++)
            B = m ? i(g[O], z[O], C) : g[O],
            y ? (l.copy(c.normals[P]).multiplyScalar(B.x),
            h.copy(c.binormals[P]).multiplyScalar(B.y),
            u.copy(s[P]).add(l).add(h),
            a(u.x, u.y, u.z)) : a(B.x, B.y, p / v * P);
    for (L = E - 1; L >= 0; L--) {
        for (P = L / E,
        I = d * (1 - P),
        C = f * Math.sin(P * Math.PI / 2),
        O = 0,
        P = A.length; P > O; O++)
            B = i(A[O], T[O], C),
            a(B.x, B.y, p + I);
        for (H = 0,
        b = w.length; b > H; H++)
            for (x = w[H],
            N = V[H],
            O = 0,
            P = x.length; P > O; O++)
                B = i(x[O], N[O], C),
                y ? a(B.x, B.y + s[v - 1].y, s[v - 1].x + I) : a(B.x, B.y, p + I)
    }
    !function() {
        if (m) {
            var e;
            for (e = 0 * F,
            O = 0; U > O; O++)
                D = S[O],
                o(D[2] + e, D[1] + e, D[0] + e);
            for (e = v + 2 * E,
            e *= F,
            O = 0; U > O; O++)
                D = S[O],
                o(D[0] + e, D[1] + e, D[2] + e)
        } else {
            for (O = 0; U > O; O++)
                D = S[O],
                o(D[2], D[1], D[0]);
            for (O = 0; U > O; O++)
                D = S[O],
                o(D[0] + F * v, D[1] + F * v, D[2] + F * v)
        }
    }(),
    function() {
        var e = 0;
        for (r(A, e),
        e += A.length,
        H = 0,
        b = w.length; b > H; H++)
            x = w[H],
            r(x, e),
            e += x.length
    }()
}
,
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function(e, t, i, n) {
        return e = e.vertices,
        t = e[t],
        i = e[i],
        n = e[n],
        [new THREE.Vector2(t.x,t.y), new THREE.Vector2(i.x,i.y), new THREE.Vector2(n.x,n.y)]
    },
    generateSideWallUV: function(e, t, i, n, r) {
        return e = e.vertices,
        t = e[t],
        i = e[i],
        n = e[n],
        r = e[r],
        .01 > Math.abs(t.y - i.y) ? [new THREE.Vector2(t.x,1 - t.z), new THREE.Vector2(i.x,1 - i.z), new THREE.Vector2(n.x,1 - n.z), new THREE.Vector2(r.x,1 - r.z)] : [new THREE.Vector2(t.y,1 - t.z), new THREE.Vector2(i.y,1 - i.z), new THREE.Vector2(n.y,1 - n.z), new THREE.Vector2(r.y,1 - r.z)]
    }
},
THREE.ShapeGeometry = function(e, t) {
    THREE.Geometry.call(this),
    this.type = "ShapeGeometry",
    !1 === Array.isArray(e) && (e = [e]),
    this.addShapeList(e, t),
    this.computeFaceNormals()
}
,
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry,
THREE.ShapeGeometry.prototype.addShapeList = function(e, t) {
    for (var i = 0, n = e.length; n > i; i++)
        this.addShape(e[i], t);
    return this
}
,
THREE.ShapeGeometry.prototype.addShape = function(e, t) {
    void 0 === t && (t = {});
    var i, n, r, a = t.material, o = void 0 === t.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator, s = this.vertices.length;
    i = e.extractPoints(void 0 !== t.curveSegments ? t.curveSegments : 12);
    var c = i.shape
      , h = i.holes;
    if (!THREE.ShapeUtils.isClockWise(c))
        for (c = c.reverse(),
        i = 0,
        n = h.length; n > i; i++)
            r = h[i],
            THREE.ShapeUtils.isClockWise(r) && (h[i] = r.reverse());
    var l = THREE.ShapeUtils.triangulateShape(c, h);
    for (i = 0,
    n = h.length; n > i; i++)
        r = h[i],
        c = c.concat(r);
    for (h = c.length,
    n = l.length,
    i = 0; h > i; i++)
        r = c[i],
        this.vertices.push(new THREE.Vector3(r.x,r.y,0));
    for (i = 0; n > i; i++)
        h = l[i],
        c = h[0] + s,
        r = h[1] + s,
        h = h[2] + s,
        this.faces.push(new THREE.Face3(c,r,h,null ,null ,a)),
        this.faceVertexUvs[0].push(o.generateTopUV(this, c, r, h))
}
,
THREE.LatheBufferGeometry = function(e, t, i, n) {
    THREE.BufferGeometry.call(this),
    this.type = "LatheBufferGeometry",
    this.parameters = {
        points: e,
        segments: t,
        phiStart: i,
        phiLength: n
    },
    t = Math.floor(t) || 12,
    i = i || 0,
    n = n || 2 * Math.PI,
    n = THREE.Math.clamp(n, 0, 2 * Math.PI);
    for (var r = (t + 1) * e.length, a = t * e.length * 6, o = new THREE.BufferAttribute(new (a > 65535 ? Uint32Array : Uint16Array)(a),1), s = new THREE.BufferAttribute(new Float32Array(3 * r),3), c = new THREE.BufferAttribute(new Float32Array(2 * r),2), h = 0, l = 0, u = 1 / t, p = new THREE.Vector3, d = new THREE.Vector2, r = 0; t >= r; r++)
        for (var a = i + r * u * n, f = Math.sin(a), E = Math.cos(a), a = 0; a <= e.length - 1; a++)
            p.x = e[a].x * f,
            p.y = e[a].y,
            p.z = e[a].x * E,
            s.setXYZ(h, p.x, p.y, p.z),
            d.x = r / t,
            d.y = a / (e.length - 1),
            c.setXY(h, d.x, d.y),
            h++;
    for (r = 0; t > r; r++)
        for (a = 0; a < e.length - 1; a++)
            i = a + r * e.length,
            h = i + e.length,
            u = i + e.length + 1,
            p = i + 1,
            o.setX(l, i),
            l++,
            o.setX(l, h),
            l++,
            o.setX(l, p),
            l++,
            o.setX(l, h),
            l++,
            o.setX(l, u),
            l++,
            o.setX(l, p),
            l++;
    if (this.setIndex(o),
    this.addAttribute("position", s),
    this.addAttribute("uv", c),
    this.computeVertexNormals(),
    n === 2 * Math.PI)
        for (n = this.attributes.normal.array,
        o = new THREE.Vector3,
        s = new THREE.Vector3,
        c = new THREE.Vector3,
        i = t * e.length * 3,
        a = r = 0; r < e.length; r++,
        a += 3)
            o.x = n[a + 0],
            o.y = n[a + 1],
            o.z = n[a + 2],
            s.x = n[i + a + 0],
            s.y = n[i + a + 1],
            s.z = n[i + a + 2],
            c.addVectors(o, s).normalize(),
            n[a + 0] = n[i + a + 0] = c.x,
            n[a + 1] = n[i + a + 1] = c.y,
            n[a + 2] = n[i + a + 2] = c.z
}
,
THREE.LatheBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.LatheBufferGeometry.prototype.constructor = THREE.LatheBufferGeometry,
THREE.LatheGeometry = function(e, t, i, n) {
    THREE.Geometry.call(this),
    this.type = "LatheGeometry",
    this.parameters = {
        points: e,
        segments: t,
        phiStart: i,
        phiLength: n
    },
    this.fromBufferGeometry(new THREE.LatheBufferGeometry(e,t,i,n)),
    this.mergeVertices()
}
,
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry,
THREE.PlaneGeometry = function(e, t, i, n) {
    THREE.Geometry.call(this),
    this.type = "PlaneGeometry",
    this.parameters = {
        width: e,
        height: t,
        widthSegments: i,
        heightSegments: n
    },
    this.fromBufferGeometry(new THREE.PlaneBufferGeometry(e,t,i,n))
}
,
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry,
THREE.PlaneBufferGeometry = function(e, t, i, n) {
    THREE.BufferGeometry.call(this),
    this.type = "PlaneBufferGeometry",
    this.parameters = {
        width: e,
        height: t,
        widthSegments: i,
        heightSegments: n
    };
    var r = e / 2
      , a = t / 2;
    i = Math.floor(i) || 1,
    n = Math.floor(n) || 1;
    var o = i + 1
      , s = n + 1
      , c = e / i
      , h = t / n;
    t = new Float32Array(o * s * 3),
    e = new Float32Array(o * s * 3);
    for (var l = new Float32Array(o * s * 2), u = 0, p = 0, d = 0; s > d; d++)
        for (var f = d * h - a, E = 0; o > E; E++)
            t[u] = E * c - r,
            t[u + 1] = -f,
            e[u + 2] = 1,
            l[p] = E / i,
            l[p + 1] = 1 - d / n,
            u += 3,
            p += 2;
    for (u = 0,
    r = new (65535 < t.length / 3 ? Uint32Array : Uint16Array)(i * n * 6),
    d = 0; n > d; d++)
        for (E = 0; i > E; E++)
            a = E + o * (d + 1),
            s = E + 1 + o * (d + 1),
            c = E + 1 + o * d,
            r[u] = E + o * d,
            r[u + 1] = a,
            r[u + 2] = c,
            r[u + 3] = a,
            r[u + 4] = s,
            r[u + 5] = c,
            u += 6;
    this.setIndex(new THREE.BufferAttribute(r,1)),
    this.addAttribute("position", new THREE.BufferAttribute(t,3)),
    this.addAttribute("normal", new THREE.BufferAttribute(e,3)),
    this.addAttribute("uv", new THREE.BufferAttribute(l,2))
}
,
THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry,
THREE.RingBufferGeometry = function(e, t, i, n, r, a) {
    THREE.BufferGeometry.call(this),
    this.type = "RingBufferGeometry",
    this.parameters = {
        innerRadius: e,
        outerRadius: t,
        thetaSegments: i,
        phiSegments: n,
        thetaStart: r,
        thetaLength: a
    },
    e = e || 20,
    t = t || 50,
    r = void 0 !== r ? r : 0,
    a = void 0 !== a ? a : 2 * Math.PI,
    i = void 0 !== i ? Math.max(3, i) : 8,
    n = void 0 !== n ? Math.max(1, n) : 1;
    var o, s, c = (i + 1) * (n + 1), h = i * n * 6, h = new THREE.BufferAttribute(new (h > 65535 ? Uint32Array : Uint16Array)(h),1), l = new THREE.BufferAttribute(new Float32Array(3 * c),3), u = new THREE.BufferAttribute(new Float32Array(3 * c),3), c = new THREE.BufferAttribute(new Float32Array(2 * c),2), p = 0, d = 0, f = e, E = (t - e) / n, m = new THREE.Vector3, g = new THREE.Vector2;
    for (e = 0; n >= e; e++) {
        for (s = 0; i >= s; s++)
            o = r + s / i * a,
            m.x = f * Math.cos(o),
            m.y = f * Math.sin(o),
            l.setXYZ(p, m.x, m.y, m.z),
            u.setXYZ(p, 0, 0, 1),
            g.x = (m.x / t + 1) / 2,
            g.y = (m.y / t + 1) / 2,
            c.setXY(p, g.x, g.y),
            p++;
        f += E
    }
    for (e = 0; n > e; e++)
        for (t = e * (i + 1),
        s = 0; i > s; s++)
            r = o = s + t,
            a = o + i + 1,
            p = o + i + 2,
            o += 1,
            h.setX(d, r),
            d++,
            h.setX(d, a),
            d++,
            h.setX(d, p),
            d++,
            h.setX(d, r),
            d++,
            h.setX(d, p),
            d++,
            h.setX(d, o),
            d++;
    this.setIndex(h),
    this.addAttribute("position", l),
    this.addAttribute("normal", u),
    this.addAttribute("uv", c)
}
,
THREE.RingBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.RingBufferGeometry.prototype.constructor = THREE.RingBufferGeometry,
THREE.RingGeometry = function(e, t, i, n, r, a) {
    THREE.Geometry.call(this),
    this.type = "RingGeometry",
    this.parameters = {
        innerRadius: e,
        outerRadius: t,
        thetaSegments: i,
        phiSegments: n,
        thetaStart: r,
        thetaLength: a
    },
    this.fromBufferGeometry(new THREE.RingBufferGeometry(e,t,i,n,r,a))
}
,
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.RingGeometry.prototype.constructor = THREE.RingGeometry,
THREE.SphereGeometry = function(e, t, i, n, r, a, o) {
    THREE.Geometry.call(this),
    this.type = "SphereGeometry",
    this.parameters = {
        radius: e,
        widthSegments: t,
        heightSegments: i,
        phiStart: n,
        phiLength: r,
        thetaStart: a,
        thetaLength: o
    },
    this.fromBufferGeometry(new THREE.SphereBufferGeometry(e,t,i,n,r,a,o))
}
,
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry,
THREE.SphereBufferGeometry = function(e, t, i, n, r, a, o) {
    THREE.BufferGeometry.call(this),
    this.type = "SphereBufferGeometry",
    this.parameters = {
        radius: e,
        widthSegments: t,
        heightSegments: i,
        phiStart: n,
        phiLength: r,
        thetaStart: a,
        thetaLength: o
    },
    e = e || 50,
    t = Math.max(3, Math.floor(t) || 8),
    i = Math.max(2, Math.floor(i) || 6),
    n = void 0 !== n ? n : 0,
    r = void 0 !== r ? r : 2 * Math.PI,
    a = void 0 !== a ? a : 0,
    o = void 0 !== o ? o : Math.PI;
    for (var s = a + o, c = (t + 1) * (i + 1), h = new THREE.BufferAttribute(new Float32Array(3 * c),3), l = new THREE.BufferAttribute(new Float32Array(3 * c),3), c = new THREE.BufferAttribute(new Float32Array(2 * c),2), u = 0, p = [], d = new THREE.Vector3, f = 0; i >= f; f++) {
        for (var E = [], m = f / i, g = 0; t >= g; g++) {
            var v = g / t
              , T = -e * Math.cos(n + v * r) * Math.sin(a + m * o)
              , y = e * Math.cos(a + m * o)
              , R = e * Math.sin(n + v * r) * Math.sin(a + m * o);
            d.set(T, y, R).normalize(),
            h.setXYZ(u, T, y, R),
            l.setXYZ(u, d.x, d.y, d.z),
            c.setXY(u, v, 1 - m),
            E.push(u),
            u++
        }
        p.push(E)
    }
    for (n = [],
    f = 0; i > f; f++)
        for (g = 0; t > g; g++)
            r = p[f][g + 1],
            o = p[f][g],
            u = p[f + 1][g],
            d = p[f + 1][g + 1],
            (0 !== f || a > 0) && n.push(r, o, d),
            (f !== i - 1 || s < Math.PI) && n.push(o, u, d);
    this.setIndex(new (65535 < h.count ? THREE.Uint32Attribute : THREE.Uint16Attribute)(n,1)),
    this.addAttribute("position", h),
    this.addAttribute("normal", l),
    this.addAttribute("uv", c),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,e)
}
,
THREE.SphereBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.SphereBufferGeometry.prototype.constructor = THREE.SphereBufferGeometry,
THREE.TextGeometry = function(e, t) {
    t = t || {};
    var i = t.font;
    return !1 == i instanceof THREE.Font ? new THREE.Geometry : (i = i.generateShapes(e, t.size, t.curveSegments),
    t.amount = void 0 !== t.height ? t.height : 50,
    void 0 === t.bevelThickness && (t.bevelThickness = 10),
    void 0 === t.bevelSize && (t.bevelSize = 8),
    void 0 === t.bevelEnabled && (t.bevelEnabled = !1),
    THREE.ExtrudeGeometry.call(this, i, t),
    void (this.type = "TextGeometry"))
}
,
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype),
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry,
THREE.TorusBufferGeometry = function(e, t, i, n, r) {
    THREE.BufferGeometry.call(this),
    this.type = "TorusBufferGeometry",
    this.parameters = {
        radius: e,
        tube: t,
        radialSegments: i,
        tubularSegments: n,
        arc: r
    },
    e = e || 100,
    t = t || 40,
    i = Math.floor(i) || 8,
    n = Math.floor(n) || 6,
    r = r || 2 * Math.PI;
    var a, o, s = (i + 1) * (n + 1), c = i * n * 6, c = new (c > 65535 ? Uint32Array : Uint16Array)(c), h = new Float32Array(3 * s), l = new Float32Array(3 * s), s = new Float32Array(2 * s), u = 0, p = 0, d = 0, f = new THREE.Vector3, E = new THREE.Vector3, m = new THREE.Vector3;
    for (a = 0; i >= a; a++)
        for (o = 0; n >= o; o++) {
            var g = o / n * r
              , v = a / i * Math.PI * 2;
            E.x = (e + t * Math.cos(v)) * Math.cos(g),
            E.y = (e + t * Math.cos(v)) * Math.sin(g),
            E.z = t * Math.sin(v),
            h[u] = E.x,
            h[u + 1] = E.y,
            h[u + 2] = E.z,
            f.x = e * Math.cos(g),
            f.y = e * Math.sin(g),
            m.subVectors(E, f).normalize(),
            l[u] = m.x,
            l[u + 1] = m.y,
            l[u + 2] = m.z,
            s[p] = o / n,
            s[p + 1] = a / i,
            u += 3,
            p += 2
        }
    for (a = 1; i >= a; a++)
        for (o = 1; n >= o; o++)
            e = (n + 1) * (a - 1) + o - 1,
            t = (n + 1) * (a - 1) + o,
            r = (n + 1) * a + o,
            c[d] = (n + 1) * a + o - 1,
            c[d + 1] = e,
            c[d + 2] = r,
            c[d + 3] = e,
            c[d + 4] = t,
            c[d + 5] = r,
            d += 6;
    this.setIndex(new THREE.BufferAttribute(c,1)),
    this.addAttribute("position", new THREE.BufferAttribute(h,3)),
    this.addAttribute("normal", new THREE.BufferAttribute(l,3)),
    this.addAttribute("uv", new THREE.BufferAttribute(s,2))
}
,
THREE.TorusBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.TorusBufferGeometry.prototype.constructor = THREE.TorusBufferGeometry,
THREE.TorusGeometry = function(e, t, i, n, r) {
    THREE.Geometry.call(this),
    this.type = "TorusGeometry",
    this.parameters = {
        radius: e,
        tube: t,
        radialSegments: i,
        tubularSegments: n,
        arc: r
    },
    this.fromBufferGeometry(new THREE.TorusBufferGeometry(e,t,i,n,r))
}
,
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry,
THREE.TorusKnotBufferGeometry = function(e, t, i, n, r, a) {
    function o(e, t, i, n, r) {
        var a = Math.cos(e)
          , o = Math.sin(e);
        e *= i / t,
        t = Math.cos(e),
        r.x = n * (2 + t) * .5 * a,
        r.y = n * (2 + t) * o * .5,
        r.z = n * Math.sin(e) * .5
    }
    THREE.BufferGeometry.call(this),
    this.type = "TorusKnotBufferGeometry",
    this.parameters = {
        radius: e,
        tube: t,
        tubularSegments: i,
        radialSegments: n,
        p: r,
        q: a
    },
    e = e || 100,
    t = t || 40,
    i = Math.floor(i) || 64,
    n = Math.floor(n) || 8,
    r = r || 2,
    a = a || 3;
    var s, c, h = (n + 1) * (i + 1), l = n * i * 6, l = new THREE.BufferAttribute(new (l > 65535 ? Uint32Array : Uint16Array)(l),1), u = new THREE.BufferAttribute(new Float32Array(3 * h),3), p = new THREE.BufferAttribute(new Float32Array(3 * h),3), h = new THREE.BufferAttribute(new Float32Array(2 * h),2), d = 0, f = 0, E = new THREE.Vector3, m = new THREE.Vector3, g = new THREE.Vector2, v = new THREE.Vector3, T = new THREE.Vector3, y = new THREE.Vector3, R = new THREE.Vector3, x = new THREE.Vector3;
    for (s = 0; i >= s; ++s)
        for (c = s / i * r * Math.PI * 2,
        o(c, r, a, e, v),
        o(c + .01, r, a, e, T),
        R.subVectors(T, v),
        x.addVectors(T, v),
        y.crossVectors(R, x),
        x.crossVectors(y, R),
        y.normalize(),
        x.normalize(),
        c = 0; n >= c; ++c) {
            var H = c / n * Math.PI * 2
              , b = -t * Math.cos(H)
              , H = t * Math.sin(H);
            E.x = v.x + (b * x.x + H * y.x),
            E.y = v.y + (b * x.y + H * y.y),
            E.z = v.z + (b * x.z + H * y.z),
            u.setXYZ(d, E.x, E.y, E.z),
            m.subVectors(E, v).normalize(),
            p.setXYZ(d, m.x, m.y, m.z),
            g.x = s / i,
            g.y = c / n,
            h.setXY(d, g.x, g.y),
            d++
        }
    for (c = 1; i >= c; c++)
        for (s = 1; n >= s; s++)
            e = (n + 1) * c + (s - 1),
            t = (n + 1) * c + s,
            r = (n + 1) * (c - 1) + s,
            l.setX(f, (n + 1) * (c - 1) + (s - 1)),
            f++,
            l.setX(f, e),
            f++,
            l.setX(f, r),
            f++,
            l.setX(f, e),
            f++,
            l.setX(f, t),
            f++,
            l.setX(f, r),
            f++;
    this.setIndex(l),
    this.addAttribute("position", u),
    this.addAttribute("normal", p),
    this.addAttribute("uv", h)
}
,
THREE.TorusKnotBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.TorusKnotBufferGeometry.prototype.constructor = THREE.TorusKnotBufferGeometry,
THREE.TorusKnotGeometry = function(e, t, i, n, r, a, o) {
    THREE.Geometry.call(this),
    this.type = "TorusKnotGeometry",
    this.parameters = {
        radius: e,
        tube: t,
        tubularSegments: i,
        radialSegments: n,
        p: r,
        q: a
    },
    this.fromBufferGeometry(new THREE.TorusKnotBufferGeometry(e,t,i,n,r,a)),
    this.mergeVertices()
}
,
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry,
THREE.TubeGeometry = function(e, t, i, n, r, a) {
    THREE.Geometry.call(this),
    this.type = "TubeGeometry",
    this.parameters = {
        path: e,
        segments: t,
        radius: i,
        radialSegments: n,
        closed: r,
        taper: a
    },
    t = t || 64,
    i = i || 1,
    n = n || 8,
    r = r || !1,
    a = a || THREE.TubeGeometry.NoTaper;
    var o, s, c, h, l, u, p, d, f, E, m = [], g = t + 1, v = new THREE.Vector3;
    for (d = new THREE.TubeGeometry.FrenetFrames(e,t,r),
    f = d.normals,
    E = d.binormals,
    this.tangents = d.tangents,
    this.normals = f,
    this.binormals = E,
    d = 0; g > d; d++)
        for (m[d] = [],
        c = d / (g - 1),
        p = e.getPointAt(c),
        o = f[d],
        s = E[d],
        l = i * a(c),
        c = 0; n > c; c++)
            h = c / n * 2 * Math.PI,
            u = -l * Math.cos(h),
            h = l * Math.sin(h),
            v.copy(p),
            v.x += u * o.x + h * s.x,
            v.y += u * o.y + h * s.y,
            v.z += u * o.z + h * s.z,
            m[d][c] = this.vertices.push(new THREE.Vector3(v.x,v.y,v.z)) - 1;
    for (d = 0; t > d; d++)
        for (c = 0; n > c; c++)
            a = r ? (d + 1) % t : d + 1,
            g = (c + 1) % n,
            e = m[d][c],
            i = m[a][c],
            a = m[a][g],
            g = m[d][g],
            v = new THREE.Vector2(d / t,c / n),
            f = new THREE.Vector2((d + 1) / t,c / n),
            E = new THREE.Vector2((d + 1) / t,(c + 1) / n),
            o = new THREE.Vector2(d / t,(c + 1) / n),
            this.faces.push(new THREE.Face3(e,i,g)),
            this.faceVertexUvs[0].push([v, f, o]),
            this.faces.push(new THREE.Face3(i,a,g)),
            this.faceVertexUvs[0].push([f.clone(), E, o.clone()]);
    this.computeFaceNormals(),
    this.computeVertexNormals()
}
,
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry,
THREE.TubeGeometry.NoTaper = function(e) {
    return 1
}
,
THREE.TubeGeometry.SinusoidalTaper = function(e) {
    return Math.sin(Math.PI * e)
}
,
THREE.TubeGeometry.FrenetFrames = function(e, t, i) {
    var n = new THREE.Vector3
      , r = []
      , a = []
      , o = []
      , s = new THREE.Vector3
      , c = new THREE.Matrix4;
    t += 1;
    var h, l, u;
    for (this.tangents = r,
    this.normals = a,
    this.binormals = o,
    h = 0; t > h; h++)
        l = h / (t - 1),
        r[h] = e.getTangentAt(l),
        r[h].normalize();
    for (a[0] = new THREE.Vector3,
    o[0] = new THREE.Vector3,
    e = Number.MAX_VALUE,
    h = Math.abs(r[0].x),
    l = Math.abs(r[0].y),
    u = Math.abs(r[0].z),
    e >= h && (e = h,
    n.set(1, 0, 0)),
    e >= l && (e = l,
    n.set(0, 1, 0)),
    e >= u && n.set(0, 0, 1),
    s.crossVectors(r[0], n).normalize(),
    a[0].crossVectors(r[0], s),
    o[0].crossVectors(r[0], a[0]),
    h = 1; t > h; h++)
        a[h] = a[h - 1].clone(),
        o[h] = o[h - 1].clone(),
        s.crossVectors(r[h - 1], r[h]),
        s.length() > Number.EPSILON && (s.normalize(),
        n = Math.acos(THREE.Math.clamp(r[h - 1].dot(r[h]), -1, 1)),
        a[h].applyMatrix4(c.makeRotationAxis(s, n))),
        o[h].crossVectors(r[h], a[h]);
    if (i)
        for (n = Math.acos(THREE.Math.clamp(a[0].dot(a[t - 1]), -1, 1)),
        n /= t - 1,
        0 < r[0].dot(s.crossVectors(a[0], a[t - 1])) && (n = -n),
        h = 1; t > h; h++)
            a[h].applyMatrix4(c.makeRotationAxis(r[h], n * h)),
            o[h].crossVectors(r[h], a[h])
}
,
THREE.PolyhedronGeometry = function(e, t, i, n) {
    function r(e) {
        var t = e.normalize().clone();
        t.index = c.vertices.push(t) - 1;
        var i = Math.atan2(e.z, -e.x) / 2 / Math.PI + .5;
        return e = Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z)) / Math.PI + .5,
        t.uv = new THREE.Vector2(i,1 - e),
        t
    }
    function a(e, t, i, n) {
        n = new THREE.Face3(e.index,t.index,i.index,[e.clone(), t.clone(), i.clone()],void 0,n),
        c.faces.push(n),
        m.copy(e).add(t).add(i).divideScalar(3),
        n = Math.atan2(m.z, -m.x),
        c.faceVertexUvs[0].push([s(e.uv, e, n), s(t.uv, t, n), s(i.uv, i, n)])
    }
    function o(e, t) {
        for (var i = Math.pow(2, t), n = r(c.vertices[e.a]), o = r(c.vertices[e.b]), s = r(c.vertices[e.c]), h = [], l = e.materialIndex, u = 0; i >= u; u++) {
            h[u] = [];
            for (var p = r(n.clone().lerp(s, u / i)), d = r(o.clone().lerp(s, u / i)), f = i - u, E = 0; f >= E; E++)
                h[u][E] = 0 === E && u === i ? p : r(p.clone().lerp(d, E / f))
        }
        for (u = 0; i > u; u++)
            for (E = 0; 2 * (i - u) - 1 > E; E++)
                n = Math.floor(E / 2),
                0 === E % 2 ? a(h[u][n + 1], h[u + 1][n], h[u][n], l) : a(h[u][n + 1], h[u + 1][n + 1], h[u + 1][n], l)
    }
    function s(e, t, i) {
        return 0 > i && 1 === e.x && (e = new THREE.Vector2(e.x - 1,e.y)),
        0 === t.x && 0 === t.z && (e = new THREE.Vector2(i / 2 / Math.PI + .5,e.y)),
        e.clone()
    }
    THREE.Geometry.call(this),
    this.type = "PolyhedronGeometry",
    this.parameters = {
        vertices: e,
        indices: t,
        radius: i,
        detail: n
    },
    i = i || 1,
    n = n || 0;
    for (var c = this, h = 0, l = e.length; l > h; h += 3)
        r(new THREE.Vector3(e[h],e[h + 1],e[h + 2]));
    e = this.vertices;
    for (var u = [], p = h = 0, l = t.length; l > h; h += 3,
    p++) {
        var d = e[t[h]]
          , f = e[t[h + 1]]
          , E = e[t[h + 2]];
        u[p] = new THREE.Face3(d.index,f.index,E.index,[d.clone(), f.clone(), E.clone()],void 0,p)
    }
    for (var m = new THREE.Vector3, h = 0, l = u.length; l > h; h++)
        o(u[h], n);
    for (h = 0,
    l = this.faceVertexUvs[0].length; l > h; h++)
        t = this.faceVertexUvs[0][h],
        n = t[0].x,
        e = t[1].x,
        u = t[2].x,
        p = Math.max(n, e, u),
        d = Math.min(n, e, u),
        p > .9 && .1 > d && (.2 > n && (t[0].x += 1),
        .2 > e && (t[1].x += 1),
        .2 > u && (t[2].x += 1));
    for (h = 0,
    l = this.vertices.length; l > h; h++)
        this.vertices[h].multiplyScalar(i);
    this.mergeVertices(),
    this.computeFaceNormals(),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,i)
}
,
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry,
THREE.DodecahedronGeometry = function(e, t) {
    var i = (1 + Math.sqrt(5)) / 2
      , n = 1 / i;
    THREE.PolyhedronGeometry.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -n, -i, 0, -n, i, 0, n, -i, 0, n, i, -n, -i, 0, -n, i, 0, n, -i, 0, n, i, 0, -i, 0, -n, i, 0, -n, -i, 0, n, i, 0, n], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t),
    this.type = "DodecahedronGeometry",
    this.parameters = {
        radius: e,
        detail: t
    }
}
,
THREE.DodecahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype),
THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry,
THREE.IcosahedronGeometry = function(e, t) {
    var i = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [-1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, 0, 0, -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, i, 0, -1, i, 0, 1, -i, 0, -1, -i, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t),
    this.type = "IcosahedronGeometry",
    this.parameters = {
        radius: e,
        detail: t
    }
}
,
THREE.IcosahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype),
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry,
THREE.OctahedronGeometry = function(e, t) {
    THREE.PolyhedronGeometry.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t),
    this.type = "OctahedronGeometry",
    this.parameters = {
        radius: e,
        detail: t
    }
}
,
THREE.OctahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype),
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry,
THREE.TetrahedronGeometry = function(e, t) {
    THREE.PolyhedronGeometry.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t),
    this.type = "TetrahedronGeometry",
    this.parameters = {
        radius: e,
        detail: t
    }
}
,
THREE.TetrahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype),
THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry,
THREE.ParametricGeometry = function(e, t, i) {
    THREE.Geometry.call(this),
    this.type = "ParametricGeometry",
    this.parameters = {
        func: e,
        slices: t,
        stacks: i
    };
    var n, r, a, o, s = this.vertices, c = this.faces, h = this.faceVertexUvs[0], l = t + 1;
    for (n = 0; i >= n; n++)
        for (o = n / i,
        r = 0; t >= r; r++)
            a = r / t,
            a = e(a, o),
            s.push(a);
    var u, p, d, f;
    for (n = 0; i > n; n++)
        for (r = 0; t > r; r++)
            e = n * l + r,
            s = n * l + r + 1,
            o = (n + 1) * l + r + 1,
            a = (n + 1) * l + r,
            u = new THREE.Vector2(r / t,n / i),
            p = new THREE.Vector2((r + 1) / t,n / i),
            d = new THREE.Vector2((r + 1) / t,(n + 1) / i),
            f = new THREE.Vector2(r / t,(n + 1) / i),
            c.push(new THREE.Face3(e,s,a)),
            h.push([u, p, f]),
            c.push(new THREE.Face3(s,o,a)),
            h.push([p.clone(), d, f.clone()]);
    this.computeFaceNormals(),
    this.computeVertexNormals()
}
,
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry,
THREE.WireframeGeometry = function(e) {
    function t(e, t) {
        return e - t
    }
    THREE.BufferGeometry.call(this);
    var i = [0, 0]
      , n = {}
      , r = ["a", "b", "c"];
    if (e instanceof THREE.Geometry) {
        var a = e.vertices
          , o = e.faces
          , s = 0
          , c = new Uint32Array(6 * o.length);
        e = 0;
        for (var h = o.length; h > e; e++)
            for (var l = o[e], u = 0; 3 > u; u++) {
                i[0] = l[r[u]],
                i[1] = l[r[(u + 1) % 3]],
                i.sort(t);
                var p = i.toString();
                void 0 === n[p] && (c[2 * s] = i[0],
                c[2 * s + 1] = i[1],
                n[p] = !0,
                s++)
            }
        for (i = new Float32Array(6 * s),
        e = 0,
        h = s; h > e; e++)
            for (u = 0; 2 > u; u++)
                n = a[c[2 * e + u]],
                s = 6 * e + 3 * u,
                i[s + 0] = n.x,
                i[s + 1] = n.y,
                i[s + 2] = n.z;
        this.addAttribute("position", new THREE.BufferAttribute(i,3))
    } else if (e instanceof THREE.BufferGeometry) {
        if (null !== e.index) {
            for (h = e.index.array,
            a = e.attributes.position,
            r = e.groups,
            s = 0,
            0 === r.length && e.addGroup(0, h.length),
            c = new Uint32Array(2 * h.length),
            o = 0,
            l = r.length; l > o; ++o) {
                e = r[o],
                u = e.start,
                p = e.count,
                e = u;
                for (var d = u + p; d > e; e += 3)
                    for (u = 0; 3 > u; u++)
                        i[0] = h[e + u],
                        i[1] = h[e + (u + 1) % 3],
                        i.sort(t),
                        p = i.toString(),
                        void 0 === n[p] && (c[2 * s] = i[0],
                        c[2 * s + 1] = i[1],
                        n[p] = !0,
                        s++)
            }
            for (i = new Float32Array(6 * s),
            e = 0,
            h = s; h > e; e++)
                for (u = 0; 2 > u; u++)
                    s = 6 * e + 3 * u,
                    n = c[2 * e + u],
                    i[s + 0] = a.getX(n),
                    i[s + 1] = a.getY(n),
                    i[s + 2] = a.getZ(n)
        } else
            for (a = e.attributes.position.array,
            s = a.length / 3,
            c = s / 3,
            i = new Float32Array(6 * s),
            e = 0,
            h = c; h > e; e++)
                for (u = 0; 3 > u; u++)
                    s = 18 * e + 6 * u,
                    c = 9 * e + 3 * u,
                    i[s + 0] = a[c],
                    i[s + 1] = a[c + 1],
                    i[s + 2] = a[c + 2],
                    n = 9 * e + (u + 1) % 3 * 3,
                    i[s + 3] = a[n],
                    i[s + 4] = a[n + 1],
                    i[s + 5] = a[n + 2];
        this.addAttribute("position", new THREE.BufferAttribute(i,3))
    }
}
,
THREE.WireframeGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.WireframeGeometry.prototype.constructor = THREE.WireframeGeometry,
THREE.AxisHelper = function(e) {
    e = e || 1;
    var t = new Float32Array([0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e])
      , i = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]);
    e = new THREE.BufferGeometry,
    e.addAttribute("position", new THREE.BufferAttribute(t,3)),
    e.addAttribute("color", new THREE.BufferAttribute(i,3)),
    t = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    }),
    THREE.LineSegments.call(this, e, t)
}
,
THREE.AxisHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.AxisHelper.prototype.constructor = THREE.AxisHelper,
THREE.ArrowHelper = function() {
    var e = new THREE.BufferGeometry;
    e.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 1, 0],3));
    var t = new THREE.CylinderBufferGeometry(0,.5,1,5,1);
    return t.translate(0, -.5, 0),
    function(i, n, r, a, o, s) {
        THREE.Object3D.call(this),
        void 0 === a && (a = 16776960),
        void 0 === r && (r = 1),
        void 0 === o && (o = .2 * r),
        void 0 === s && (s = .2 * o),
        this.position.copy(n),
        this.line = new THREE.Line(e,new THREE.LineBasicMaterial({
            color: a
        })),
        this.line.matrixAutoUpdate = !1,
        this.add(this.line),
        this.cone = new THREE.Mesh(t,new THREE.MeshBasicMaterial({
            color: a
        })),
        this.cone.matrixAutoUpdate = !1,
        this.add(this.cone),
        this.setDirection(i),
        this.setLength(r, o, s)
    }
}(),
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper,
THREE.ArrowHelper.prototype.setDirection = function() {
    var e, t = new THREE.Vector3;
    return function(i) {
        .99999 < i.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > i.y ? this.quaternion.set(1, 0, 0, 0) : (t.set(i.z, 0, -i.x).normalize(),
        e = Math.acos(i.y),
        this.quaternion.setFromAxisAngle(t, e))
    }
}(),
THREE.ArrowHelper.prototype.setLength = function(e, t, i) {
    void 0 === t && (t = .2 * e),
    void 0 === i && (i = .2 * t),
    this.line.scale.set(1, Math.max(0, e - t), 1),
    this.line.updateMatrix(),
    this.cone.scale.set(i, t, i),
    this.cone.position.y = e,
    this.cone.updateMatrix()
}
,
THREE.ArrowHelper.prototype.setColor = function(e) {
    this.line.material.color.copy(e),
    this.cone.material.color.copy(e)
}
,
THREE.BoxHelper = function(e) {
    var t = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7])
      , i = new Float32Array(24)
      , n = new THREE.BufferGeometry;
    n.setIndex(new THREE.BufferAttribute(t,1)),
    n.addAttribute("position", new THREE.BufferAttribute(i,3)),
    THREE.LineSegments.call(this, n, new THREE.LineBasicMaterial({
        color: 16776960
    })),
    void 0 !== e && this.update(e)
}
,
THREE.BoxHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.BoxHelper.prototype.constructor = THREE.BoxHelper,
THREE.BoxHelper.prototype.update = function() {
    var e = new THREE.Box3;
    return function(t) {
        if (t instanceof THREE.Box3 ? e.copy(t) : e.setFromObject(t),
        !e.isEmpty()) {
            t = e.min;
            var i = e.max
              , n = this.geometry.attributes.position
              , r = n.array;
            r[0] = i.x,
            r[1] = i.y,
            r[2] = i.z,
            r[3] = t.x,
            r[4] = i.y,
            r[5] = i.z,
            r[6] = t.x,
            r[7] = t.y,
            r[8] = i.z,
            r[9] = i.x,
            r[10] = t.y,
            r[11] = i.z,
            r[12] = i.x,
            r[13] = i.y,
            r[14] = t.z,
            r[15] = t.x,
            r[16] = i.y,
            r[17] = t.z,
            r[18] = t.x,
            r[19] = t.y,
            r[20] = t.z,
            r[21] = i.x,
            r[22] = t.y,
            r[23] = t.z,
            n.needsUpdate = !0,
            this.geometry.computeBoundingSphere()
        }
    }
}(),
THREE.BoundingBoxHelper = function(e, t) {
    var i = void 0 !== t ? t : 8947848;
    this.object = e,
    this.box = new THREE.Box3,
    THREE.Mesh.call(this, new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({
        color: i,
        wireframe: !0
    }))
}
,
THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype),
THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper,
THREE.BoundingBoxHelper.prototype.update = function() {
    this.box.setFromObject(this.object),
    this.box.size(this.scale),
    this.box.center(this.position)
}
,
THREE.CameraHelper = function(e) {
    function t(e, t, n) {
        i(e, n),
        i(t, n)
    }
    function i(e, t) {
        n.vertices.push(new THREE.Vector3),
        n.colors.push(new THREE.Color(t)),
        void 0 === a[e] && (a[e] = []),
        a[e].push(n.vertices.length - 1)
    }
    var n = new THREE.Geometry
      , r = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    })
      , a = {};
    t("n1", "n2", 16755200),
    t("n2", "n4", 16755200),
    t("n4", "n3", 16755200),
    t("n3", "n1", 16755200),
    t("f1", "f2", 16755200),
    t("f2", "f4", 16755200),
    t("f4", "f3", 16755200),
    t("f3", "f1", 16755200),
    t("n1", "f1", 16755200),
    t("n2", "f2", 16755200),
    t("n3", "f3", 16755200),
    t("n4", "f4", 16755200),
    t("p", "n1", 16711680),
    t("p", "n2", 16711680),
    t("p", "n3", 16711680),
    t("p", "n4", 16711680),
    t("u1", "u2", 43775),
    t("u2", "u3", 43775),
    t("u3", "u1", 43775),
    t("c", "t", 16777215),
    t("p", "c", 3355443),
    t("cn1", "cn2", 3355443),
    t("cn3", "cn4", 3355443),
    t("cf1", "cf2", 3355443),
    t("cf3", "cf4", 3355443),
    THREE.LineSegments.call(this, n, r),
    this.camera = e,
    this.camera.updateProjectionMatrix(),
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1,
    this.pointMap = a,
    this.update()
}
,
THREE.CameraHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper,
THREE.CameraHelper.prototype.update = function() {
    function e(e, a, o, s) {
        if (n.set(a, o, s).unproject(r),
        e = i[e],
        void 0 !== e)
            for (a = 0,
            o = e.length; o > a; a++)
                t.vertices[e[a]].copy(n)
    }
    var t, i, n = new THREE.Vector3, r = new THREE.Camera;
    return function() {
        t = this.geometry,
        i = this.pointMap,
        r.projectionMatrix.copy(this.camera.projectionMatrix),
        e("c", 0, 0, -1),
        e("t", 0, 0, 1),
        e("n1", -1, -1, -1),
        e("n2", 1, -1, -1),
        e("n3", -1, 1, -1),
        e("n4", 1, 1, -1),
        e("f1", -1, -1, 1),
        e("f2", 1, -1, 1),
        e("f3", -1, 1, 1),
        e("f4", 1, 1, 1),
        e("u1", .7, 1.1, -1),
        e("u2", -.7, 1.1, -1),
        e("u3", 0, 2, -1),
        e("cf1", -1, 0, 1),
        e("cf2", 1, 0, 1),
        e("cf3", 0, -1, 1),
        e("cf4", 0, 1, 1),
        e("cn1", -1, 0, -1),
        e("cn2", 1, 0, -1),
        e("cn3", 0, -1, -1),
        e("cn4", 0, 1, -1),
        t.verticesNeedUpdate = !0
    }
}(),
THREE.DirectionalLightHelper = function(e, t) {
    THREE.Object3D.call(this),
    this.light = e,
    this.light.updateMatrixWorld(),
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1,
    void 0 === t && (t = 1);
    var i = new THREE.BufferGeometry;
    i.addAttribute("position", new THREE.Float32Attribute([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0],3));
    var n = new THREE.LineBasicMaterial({
        fog: !1
    });
    this.add(new THREE.Line(i,n)),
    i = new THREE.BufferGeometry,
    i.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 0, 1],3)),
    this.add(new THREE.Line(i,n)),
    this.update()
}
,
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper,
THREE.DirectionalLightHelper.prototype.dispose = function() {
    var e = this.children[0]
      , t = this.children[1];
    e.geometry.dispose(),
    e.material.dispose(),
    t.geometry.dispose(),
    t.material.dispose()
}
,
THREE.DirectionalLightHelper.prototype.update = function() {
    var e = new THREE.Vector3
      , t = new THREE.Vector3
      , i = new THREE.Vector3;
    return function() {
        e.setFromMatrixPosition(this.light.matrixWorld),
        t.setFromMatrixPosition(this.light.target.matrixWorld),
        i.subVectors(t, e);
        var n = this.children[0]
          , r = this.children[1];
        n.lookAt(i),
        n.material.color.copy(this.light.color).multiplyScalar(this.light.intensity),
        r.lookAt(i),
        r.scale.z = i.length()
    }
}(),
THREE.EdgesHelper = function(e, t, i) {
    t = void 0 !== t ? t : 16777215,
    THREE.LineSegments.call(this, new THREE.EdgesGeometry(e.geometry,i), new THREE.LineBasicMaterial({
        color: t
    })),
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.EdgesHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper,
THREE.FaceNormalsHelper = function(e, t, i, n) {
    this.object = e,
    this.size = void 0 !== t ? t : 1,
    e = void 0 !== i ? i : 16776960,
    n = void 0 !== n ? n : 1,
    t = 0,
    i = this.object.geometry,
    i instanceof THREE.Geometry ? t = i.faces.length : void 0,
    i = new THREE.BufferGeometry,
    t = new THREE.Float32Attribute(6 * t,3),
    i.addAttribute("position", t),
    THREE.LineSegments.call(this, i, new THREE.LineBasicMaterial({
        color: e,
        linewidth: n
    })),
    this.matrixAutoUpdate = !1,
    this.update()
}
,
THREE.FaceNormalsHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper,
THREE.FaceNormalsHelper.prototype.update = function() {
    var e = new THREE.Vector3
      , t = new THREE.Vector3
      , i = new THREE.Matrix3;
    return function() {
        this.object.updateMatrixWorld(!0),
        i.getNormalMatrix(this.object.matrixWorld);
        for (var n = this.object.matrixWorld, r = this.geometry.attributes.position, a = this.object.geometry, o = a.vertices, a = a.faces, s = 0, c = 0, h = a.length; h > c; c++) {
            var l = a[c]
              , u = l.normal;
            e.copy(o[l.a]).add(o[l.b]).add(o[l.c]).divideScalar(3).applyMatrix4(n),
            t.copy(u).applyMatrix3(i).normalize().multiplyScalar(this.size).add(e),
            r.setXYZ(s, e.x, e.y, e.z),
            s += 1,
            r.setXYZ(s, t.x, t.y, t.z),
            s += 1
        }
        return r.needsUpdate = !0,
        this
    }
}(),
THREE.GridHelper = function(e, t, i, n) {
    i = new THREE.Color(void 0 !== i ? i : 4473924),
    n = new THREE.Color(void 0 !== n ? n : 8947848);
    for (var r = [], a = [], o = -e, s = 0; e >= o; o += t) {
        r.push(-e, 0, o, e, 0, o),
        r.push(o, 0, -e, o, 0, e);
        var c = 0 === o ? i : n;
        c.toArray(a, s),
        s += 3,
        c.toArray(a, s),
        s += 3,
        c.toArray(a, s),
        s += 3,
        c.toArray(a, s),
        s += 3
    }
    e = new THREE.BufferGeometry,
    e.addAttribute("position", new THREE.Float32Attribute(r,3)),
    e.addAttribute("color", new THREE.Float32Attribute(a,3)),
    r = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    }),
    THREE.LineSegments.call(this, e, r)
}
,
THREE.GridHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.GridHelper.prototype.constructor = THREE.GridHelper,
THREE.GridHelper.prototype.setColors = function() {}
,
THREE.HemisphereLightHelper = function(e, t) {
    THREE.Object3D.call(this),
    this.light = e,
    this.light.updateMatrixWorld(),
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1,
    this.colors = [new THREE.Color, new THREE.Color];
    var i = new THREE.SphereGeometry(t,4,2);
    i.rotateX(-Math.PI / 2);
    for (var n = 0; 8 > n; n++)
        i.faces[n].color = this.colors[4 > n ? 0 : 1];
    n = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        wireframe: !0
    }),
    this.lightSphere = new THREE.Mesh(i,n),
    this.add(this.lightSphere),
    this.update()
}
,
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper,
THREE.HemisphereLightHelper.prototype.dispose = function() {
    this.lightSphere.geometry.dispose(),
    this.lightSphere.material.dispose()
}
,
THREE.HemisphereLightHelper.prototype.update = function() {
    var e = new THREE.Vector3;
    return function() {
        this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity),
        this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity),
        this.lightSphere.lookAt(e.setFromMatrixPosition(this.light.matrixWorld).negate()),
        this.lightSphere.geometry.colorsNeedUpdate = !0
    }
}(),
THREE.PointLightHelper = function(e, t) {
    this.light = e,
    this.light.updateMatrixWorld();
    var i = new THREE.SphereBufferGeometry(t,4,2)
      , n = new THREE.MeshBasicMaterial({
        wireframe: !0,
        fog: !1
    });
    n.color.copy(this.light.color).multiplyScalar(this.light.intensity),
    THREE.Mesh.call(this, i, n),
    this.matrix = this.light.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype),
THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper,
THREE.PointLightHelper.prototype.dispose = function() {
    this.geometry.dispose(),
    this.material.dispose()
}
,
THREE.PointLightHelper.prototype.update = function() {
    this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}
,
THREE.SkeletonHelper = function(e) {
    this.bones = this.getBoneList(e);
    for (var t = new THREE.Geometry, i = 0; i < this.bones.length; i++)
        this.bones[i].parent instanceof THREE.Bone && (t.vertices.push(new THREE.Vector3),
        t.vertices.push(new THREE.Vector3),
        t.colors.push(new THREE.Color(0,0,1)),
        t.colors.push(new THREE.Color(0,1,0)));
    t.dynamic = !0,
    i = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
    }),
    THREE.LineSegments.call(this, t, i),
    this.root = e,
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1,
    this.update()
}
,
THREE.SkeletonHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper,
THREE.SkeletonHelper.prototype.getBoneList = function(e) {
    var t = [];
    e instanceof THREE.Bone && t.push(e);
    for (var i = 0; i < e.children.length; i++)
        t.push.apply(t, this.getBoneList(e.children[i]));
    return t
}
,
THREE.SkeletonHelper.prototype.update = function() {
    for (var e = this.geometry, t = (new THREE.Matrix4).getInverse(this.root.matrixWorld), i = new THREE.Matrix4, n = 0, r = 0; r < this.bones.length; r++) {
        var a = this.bones[r];
        a.parent instanceof THREE.Bone && (i.multiplyMatrices(t, a.matrixWorld),
        e.vertices[n].setFromMatrixPosition(i),
        i.multiplyMatrices(t, a.parent.matrixWorld),
        e.vertices[n + 1].setFromMatrixPosition(i),
        n += 2)
    }
    e.verticesNeedUpdate = !0,
    e.computeBoundingSphere()
}
,
THREE.SpotLightHelper = function(e) {
    THREE.Object3D.call(this),
    this.light = e,
    this.light.updateMatrixWorld(),
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1,
    e = new THREE.BufferGeometry;
    for (var t = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], i = 0, n = 1; 32 > i; i++,
    n++) {
        var r = i / 32 * Math.PI * 2
          , a = n / 32 * Math.PI * 2;
        t.push(Math.cos(r), Math.sin(r), 1, Math.cos(a), Math.sin(a), 1)
    }
    e.addAttribute("position", new THREE.Float32Attribute(t,3)),
    t = new THREE.LineBasicMaterial({
        fog: !1
    }),
    this.cone = new THREE.LineSegments(e,t),
    this.add(this.cone),
    this.update()
}
,
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper,
THREE.SpotLightHelper.prototype.dispose = function() {
    this.cone.geometry.dispose(),
    this.cone.material.dispose()
}
,
THREE.SpotLightHelper.prototype.update = function() {
    var e = new THREE.Vector3
      , t = new THREE.Vector3;
    return function() {
        var i = this.light.distance ? this.light.distance : 1e3
          , n = i * Math.tan(this.light.angle);
        this.cone.scale.set(n, n, i),
        e.setFromMatrixPosition(this.light.matrixWorld),
        t.setFromMatrixPosition(this.light.target.matrixWorld),
        this.cone.lookAt(t.sub(e)),
        this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
    }
}(),
THREE.VertexNormalsHelper = function(e, t, i, n) {
    this.object = e,
    this.size = void 0 !== t ? t : 1,
    e = void 0 !== i ? i : 16711680,
    n = void 0 !== n ? n : 1,
    t = 0,
    i = this.object.geometry,
    i instanceof THREE.Geometry ? t = 3 * i.faces.length : i instanceof THREE.BufferGeometry && (t = i.attributes.normal.count),
    i = new THREE.BufferGeometry,
    t = new THREE.Float32Attribute(6 * t,3),
    i.addAttribute("position", t),
    THREE.LineSegments.call(this, i, new THREE.LineBasicMaterial({
        color: e,
        linewidth: n
    })),
    this.matrixAutoUpdate = !1,
    this.update()
}
,
THREE.VertexNormalsHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper,
THREE.VertexNormalsHelper.prototype.update = function() {
    var e = new THREE.Vector3
      , t = new THREE.Vector3
      , i = new THREE.Matrix3;
    return function() {
        var n = ["a", "b", "c"];
        this.object.updateMatrixWorld(!0),
        i.getNormalMatrix(this.object.matrixWorld);
        var r = this.object.matrixWorld
          , a = this.geometry.attributes.position
          , o = this.object.geometry;
        if (o instanceof THREE.Geometry)
            for (var s = o.vertices, c = o.faces, h = o = 0, l = c.length; l > h; h++)
                for (var u = c[h], p = 0, d = u.vertexNormals.length; d > p; p++) {
                    var f = u.vertexNormals[p];
                    e.copy(s[u[n[p]]]).applyMatrix4(r),
                    t.copy(f).applyMatrix3(i).normalize().multiplyScalar(this.size).add(e),
                    a.setXYZ(o, e.x, e.y, e.z),
                    o += 1,
                    a.setXYZ(o, t.x, t.y, t.z),
                    o += 1
                }
        else if (o instanceof THREE.BufferGeometry)
            for (n = o.attributes.position,
            s = o.attributes.normal,
            p = o = 0,
            d = n.count; d > p; p++)
                e.set(n.getX(p), n.getY(p), n.getZ(p)).applyMatrix4(r),
                t.set(s.getX(p), s.getY(p), s.getZ(p)),
                t.applyMatrix3(i).normalize().multiplyScalar(this.size).add(e),
                a.setXYZ(o, e.x, e.y, e.z),
                o += 1,
                a.setXYZ(o, t.x, t.y, t.z),
                o += 1;
        return a.needsUpdate = !0,
        this
    }
}(),
THREE.WireframeHelper = function(e, t) {
    var i = void 0 !== t ? t : 16777215;
    THREE.LineSegments.call(this, new THREE.WireframeGeometry(e.geometry), new THREE.LineBasicMaterial({
        color: i
    })),
    this.matrix = e.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.WireframeHelper.prototype = Object.create(THREE.LineSegments.prototype),
THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper,
THREE.ImmediateRenderObject = function(e) {
    THREE.Object3D.call(this),
    this.material = e,
    this.render = function(e) {}
}
,
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype),
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject,
THREE.MorphBlendMesh = function(e, t) {
    THREE.Mesh.call(this, e, t),
    this.animationsMap = {},
    this.animationsList = [];
    var i = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, i - 1, i / 1),
    this.setAnimationWeight("__default", 1)
}
,
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype),
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh,
THREE.MorphBlendMesh.prototype.createAnimation = function(e, t, i, n) {
    t = {
        start: t,
        end: i,
        length: i - t + 1,
        fps: n,
        duration: (i - t) / n,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    },
    this.animationsMap[e] = t,
    this.animationsList.push(t)
}
,
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(e) {
    for (var t, i = /([a-z]+)_?(\d+)/i, n = {}, r = this.geometry, a = 0, o = r.morphTargets.length; o > a; a++) {
        var s = r.morphTargets[a].name.match(i);
        if (s && 1 < s.length) {
            var c = s[1];
            n[c] || (n[c] = {
                start: 1 / 0,
                end: -(1 / 0)
            }),
            s = n[c],
            a < s.start && (s.start = a),
            a > s.end && (s.end = a),
            t || (t = c)
        }
    }
    for (c in n)
        s = n[c],
        this.createAnimation(c, s.start, s.end, e);
    this.firstAnimation = t
}
,
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(e) {
    (e = this.animationsMap[e]) && (e.direction = 1,
    e.directionBackwards = !1)
}
,
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(e) {
    (e = this.animationsMap[e]) && (e.direction = -1,
    e.directionBackwards = !0)
}
,
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(e, t) {
    var i = this.animationsMap[e];
    i && (i.fps = t,
    i.duration = (i.end - i.start) / i.fps)
}
,
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(e, t) {
    var i = this.animationsMap[e];
    i && (i.duration = t,
    i.fps = (i.end - i.start) / i.duration)
}
,
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(e, t) {
    var i = this.animationsMap[e];
    i && (i.weight = t)
}
,
THREE.MorphBlendMesh.prototype.setAnimationTime = function(e, t) {
    var i = this.animationsMap[e];
    i && (i.time = t)
}
,
THREE.MorphBlendMesh.prototype.getAnimationTime = function(e) {
    var t = 0;
    return (e = this.animationsMap[e]) && (t = e.time),
    t
}
,
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(e) {
    var t = -1;
    return (e = this.animationsMap[e]) && (t = e.duration),
    t
}
,
THREE.MorphBlendMesh.prototype.playAnimation = function(e) {
    var t = this.animationsMap[e];
    t ? (t.time = 0,
    t.active = !0) : void 0
}
,
THREE.MorphBlendMesh.prototype.stopAnimation = function(e) {
    (e = this.animationsMap[e]) && (e.active = !1)
}
,
THREE.MorphBlendMesh.prototype.update = function(e) {
    for (var t = 0, i = this.animationsList.length; i > t; t++) {
        var n = this.animationsList[t];
        if (n.active) {
            var r = n.duration / n.length;
            n.time += n.direction * e,
            n.mirroredLoop ? (n.time > n.duration || 0 > n.time) && (n.direction *= -1,
            n.time > n.duration && (n.time = n.duration,
            n.directionBackwards = !0),
            0 > n.time && (n.time = 0,
            n.directionBackwards = !1)) : (n.time %= n.duration,
            0 > n.time && (n.time += n.duration));
            var a = n.start + THREE.Math.clamp(Math.floor(n.time / r), 0, n.length - 1)
              , o = n.weight;
            a !== n.currentFrame && (this.morphTargetInfluences[n.lastFrame] = 0,
            this.morphTargetInfluences[n.currentFrame] = 1 * o,
            this.morphTargetInfluences[a] = 0,
            n.lastFrame = n.currentFrame,
            n.currentFrame = a),
            r = n.time % r / r,
            n.directionBackwards && (r = 1 - r),
            n.currentFrame !== n.lastFrame ? (this.morphTargetInfluences[n.currentFrame] = r * o,
            this.morphTargetInfluences[n.lastFrame] = (1 - r) * o) : this.morphTargetInfluences[n.currentFrame] = o
        }
    }
}
,
THREE.RenderableObject = function() {
    this.id = 0,
    this.object = null ,
    this.z = 0,
    this.renderOrder = 0
}
,
THREE.RenderableFace = function() {
    this.id = 0,
    this.v1 = new THREE.RenderableVertex,
    this.v2 = new THREE.RenderableVertex,
    this.v3 = new THREE.RenderableVertex,
    this.normalModel = new THREE.Vector3,
    this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3],
    this.vertexNormalsLength = 0,
    this.color = new THREE.Color,
    this.material = null ,
    this.uvs = [new THREE.Vector2, new THREE.Vector2, new THREE.Vector2],
    this.z = 0,
    this.renderOrder = 0
}
,
THREE.RenderableVertex = function() {
    this.position = new THREE.Vector3,
    this.positionWorld = new THREE.Vector3,
    this.positionScreen = new THREE.Vector4,
    this.visible = !0
}
,
THREE.RenderableVertex.prototype.copy = function(e) {
    this.positionWorld.copy(e.positionWorld),
    this.positionScreen.copy(e.positionScreen)
}
,
THREE.RenderableLine = function() {
    this.id = 0,
    this.v1 = new THREE.RenderableVertex,
    this.v2 = new THREE.RenderableVertex,
    this.vertexColors = [new THREE.Color, new THREE.Color],
    this.material = null ,
    this.z = 0,
    this.renderOrder = 0
}
,
THREE.RenderableSprite = function() {
    this.id = 0,
    this.object = null ,
    this.x = 0,
    this.y = 0,
    this.z = 0,
    this.rotation = 0,
    this.scale = new THREE.Vector2,
    this.material = null ,
    this.renderOrder = 0
}
,
THREE.Projector = function() {
    function e() {
        if (c === T) {
            var e = new THREE.RenderableObject;
            return v.push(e),
            T++,
            c++,
            e
        }
        return v[c++]
    }
    function t() {
        if (l === R) {
            var e = new THREE.RenderableVertex;
            return y.push(e),
            R++,
            l++,
            e
        }
        return y[l++]
    }
    function i() {
        if (p === H) {
            var e = new THREE.RenderableFace;
            return x.push(e),
            H++,
            p++,
            e
        }
        return x[p++]
    }
    function n() {
        if (f === M) {
            var e = new THREE.RenderableLine;
            return b.push(e),
            M++,
            f++,
            e
        }
        return b[f++]
    }
    function r() {
        if (m === w) {
            var e = new THREE.RenderableSprite;
            return _.push(e),
            w++,
            m++,
            e
        }
        return _[m++]
    }
    function a(e, t) {
        return e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id !== t.id ? e.id - t.id : 0
    }
    function o(e, t) {
        var i = 0
          , n = 1
          , r = e.z + e.w
          , a = t.z + t.w
          , o = -e.z + e.w
          , s = -t.z + t.w;
        return r >= 0 && a >= 0 && o >= 0 && s >= 0 ? !0 : 0 > r && 0 > a || 0 > o && 0 > s ? !1 : (0 > r ? i = Math.max(i, r / (r - a)) : 0 > a && (n = Math.min(n, r / (r - a))),
        0 > o ? i = Math.max(i, o / (o - s)) : 0 > s && (n = Math.min(n, o / (o - s))),
        i > n ? !1 : (e.lerp(t, i),
        t.lerp(e, 1 - n),
        !0))
    }
    var s, c, h, l, u, p, d, f, E, m, g, v = [], T = 0, y = [], R = 0, x = [], H = 0, b = [], M = 0, _ = [], w = 0, S = {
        objects: [],
        lights: [],
        elements: []
    }, A = new THREE.Vector3, L = new THREE.Vector4, C = new THREE.Box3(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)), P = new THREE.Box3, I = new Array(3), B = (new Array(4),
    new THREE.Matrix4), D = new THREE.Matrix4, F = new THREE.Matrix4, U = new THREE.Matrix3, O = new THREE.Frustum, N = new THREE.Vector4, V = new THREE.Vector4;
    this.projectVector = function(e, t) {
        e.project(t)
    }
    ,
    this.unprojectVector = function(e, t) {
        e.unproject(t)
    }
    ,
    this.pickingRay = function(e, t) {}
    ;
    var z = function() {
        function e(e) {
            v = e,
            T = v.material,
            R.getNormalMatrix(v.matrixWorld),
            E.length = 0,
            m.length = 0
        }
        function r(e) {
            var t = e.position
              , i = e.positionWorld
              , n = e.positionScreen;
            i.copy(t).applyMatrix4(g),
            n.copy(i).applyMatrix4(D);
            var r = 1 / n.w;
            n.x *= r,
            n.y *= r,
            n.z *= r,
            e.visible = n.x >= -1 && n.x <= 1 && n.y >= -1 && n.y <= 1 && n.z >= -1 && n.z <= 1
        }
        function a(e, i, n) {
            h = t(),
            h.position.set(e, i, n),
            r(h)
        }
        function o(e, t, i) {
            E.push(e, t, i)
        }
        function s(e, t) {
            m.push(e, t)
        }
        function c(e, t, i) {
            return e.visible === !0 || t.visible === !0 || i.visible === !0 ? !0 : (I[0] = e.positionScreen,
            I[1] = t.positionScreen,
            I[2] = i.positionScreen,
            C.intersectsBox(P.setFromPoints(I)))
        }
        function l(e, t, i) {
            return (i.positionScreen.x - e.positionScreen.x) * (t.positionScreen.y - e.positionScreen.y) - (i.positionScreen.y - e.positionScreen.y) * (t.positionScreen.x - e.positionScreen.x) < 0
        }
        function p(e, t) {
            var i = y[e]
              , r = y[t];
            d = n(),
            d.id = v.id,
            d.v1.copy(i),
            d.v2.copy(r),
            d.z = (i.positionScreen.z + r.positionScreen.z) / 2,
            d.renderOrder = v.renderOrder,
            d.material = v.material,
            S.elements.push(d)
        }
        function f(e, t, n) {
            var r = y[e]
              , a = y[t]
              , o = y[n];
            if (c(r, a, o) !== !1 && (T.side === THREE.DoubleSide || l(r, a, o) === !0)) {
                u = i(),
                u.id = v.id,
                u.v1.copy(r),
                u.v2.copy(a),
                u.v3.copy(o),
                u.z = (r.positionScreen.z + a.positionScreen.z + o.positionScreen.z) / 3,
                u.renderOrder = v.renderOrder,
                u.normalModel.fromArray(E, 3 * e),
                u.normalModel.applyMatrix3(R).normalize();
                for (var s = 0; 3 > s; s++) {
                    var h = u.vertexNormalsModel[s];
                    h.fromArray(E, 3 * arguments[s]),
                    h.applyMatrix3(R).normalize();
                    var p = u.uvs[s];
                    p.fromArray(m, 2 * arguments[s])
                }
                u.vertexNormalsLength = 3,
                u.material = v.material,
                S.elements.push(u)
            }
        }
        var E = []
          , m = []
          , v = null
          , T = null
          , R = new THREE.Matrix3;
        return {
            setObject: e,
            projectVertex: r,
            checkTriangleVisibility: c,
            checkBackfaceCulling: l,
            pushVertex: a,
            pushNormal: o,
            pushUv: s,
            pushLine: p,
            pushTriangle: f
        }
    }
      , G = new z;
    this.projectScene = function(h, v, T, R) {
        function x(t) {
            s = e(),
            s.id = t.id,
            s.object = t,
            A.setFromMatrixPosition(t.matrixWorld),
            A.applyProjection(D),
            s.z = A.z,
            s.renderOrder = t.renderOrder,
            S.objects.push(s)
        }
        p = 0,
        f = 0,
        m = 0,
        S.elements.length = 0,
        h.autoUpdate === !0 && h.updateMatrixWorld(),
        null === v.parent && v.updateMatrixWorld(),
        B.copy(v.matrixWorldInverse.getInverse(v.matrixWorld)),
        D.multiplyMatrices(v.projectionMatrix, B),
        O.setFromMatrix(D),
        c = 0,
        S.objects.length = 0,
        S.lights.length = 0,
        h.traverseVisible(function(e) {
            if (e instanceof THREE.Light)
                S.lights.push(e);
            else if (e instanceof THREE.Mesh || e instanceof THREE.Line) {
                if (e.material.visible === !1)
                    return;
                if (e.frustumCulled === !0 && O.intersectsObject(e) === !1)
                    return;
                x(e)
            } else if (e instanceof THREE.Sprite) {
                if (e.material.visible === !1)
                    return;
                if (e.frustumCulled === !0 && O.intersectsSprite(e) === !1)
                    return;
                x(e)
            }
        }),
        T === !0 && S.objects.sort(a);
        for (var H = 0, b = S.objects.length; b > H; H++) {
            var M = S.objects[H].object
              , _ = M.geometry;
            if (G.setObject(M),
            g = M.matrixWorld,
            l = 0,
            M instanceof THREE.Mesh) {
                if (_ instanceof THREE.BufferGeometry) {
                    var w = _.attributes
                      , C = _.groups;
                    if (void 0 === w.position)
                        continue;for (var P = w.position.array, I = 0, z = P.length; z > I; I += 3)
                        G.pushVertex(P[I], P[I + 1], P[I + 2]);
                    if (void 0 !== w.normal)
                        for (var k = w.normal.array, I = 0, z = k.length; z > I; I += 3)
                            G.pushNormal(k[I], k[I + 1], k[I + 2]);
                    if (void 0 !== w.uv)
                        for (var j = w.uv.array, I = 0, z = j.length; z > I; I += 2)
                            G.pushUv(j[I], j[I + 1]);
                    if (null !== _.index) {
                        var W = _.index.array;
                        if (C.length > 0)
                            for (var H = 0; H < C.length; H++)
                                for (var X = C[H], I = X.start, z = X.start + X.count; z > I; I += 3)
                                    G.pushTriangle(W[I], W[I + 1], W[I + 2]);
                        else
                            for (var I = 0, z = W.length; z > I; I += 3)
                                G.pushTriangle(W[I], W[I + 1], W[I + 2])
                    } else
                        for (var I = 0, z = P.length / 3; z > I; I += 3)
                            G.pushTriangle(I, I + 1, I + 2)
                } else if (_ instanceof THREE.Geometry) {
                    var Y = _.vertices
                      , q = _.faces
                      , Z = _.faceVertexUvs[0];
                    U.getNormalMatrix(g);
                    for (var Q = M.material, K = Q instanceof THREE.MultiMaterial, J = K === !0 ? M.material : null , $ = 0, ee = Y.length; ee > $; $++) {
                        var te = Y[$];
                        if (A.copy(te),
                        Q.morphTargets === !0)
                            for (var ie = _.morphTargets, ne = M.morphTargetInfluences, re = 0, ae = ie.length; ae > re; re++) {
                                var oe = ne[re];
                                if (0 !== oe) {
                                    var se = ie[re]
                                      , ce = se.vertices[$];
                                    A.x += (ce.x - te.x) * oe,
                                    A.y += (ce.y - te.y) * oe,
                                    A.z += (ce.z - te.z) * oe
                                }
                            }
                        G.pushVertex(A.x, A.y, A.z)
                    }
                    for (var he = 0, le = q.length; le > he; he++) {
                        var ue = q[he];
                        if (Q = K === !0 ? J.materials[ue.materialIndex] : M.material,
                        void 0 !== Q) {
                            var pe = Q.side
                              , de = y[ue.a]
                              , fe = y[ue.b]
                              , Ee = y[ue.c];
                            if (G.checkTriangleVisibility(de, fe, Ee) !== !1) {
                                var me = G.checkBackfaceCulling(de, fe, Ee);
                                if (pe !== THREE.DoubleSide) {
                                    if (pe === THREE.FrontSide && me === !1)
                                        continue;if (pe === THREE.BackSide && me === !0)
                                        continue
                                }
                                u = i(),
                                u.id = M.id,
                                u.v1.copy(de),
                                u.v2.copy(fe),
                                u.v3.copy(Ee),
                                u.normalModel.copy(ue.normal),
                                me !== !1 || pe !== THREE.BackSide && pe !== THREE.DoubleSide || u.normalModel.negate(),
                                u.normalModel.applyMatrix3(U).normalize();
                                for (var ge = ue.vertexNormals, ve = 0, Te = Math.min(ge.length, 3); Te > ve; ve++) {
                                    var ye = u.vertexNormalsModel[ve];
                                    ye.copy(ge[ve]),
                                    me !== !1 || pe !== THREE.BackSide && pe !== THREE.DoubleSide || ye.negate(),
                                    ye.applyMatrix3(U).normalize()
                                }
                                u.vertexNormalsLength = ge.length;
                                var Re = Z[he];
                                if (void 0 !== Re)
                                    for (var xe = 0; 3 > xe; xe++)
                                        u.uvs[xe].copy(Re[xe]);
                                u.color = ue.color,
                                u.material = Q,
                                u.z = (de.positionScreen.z + fe.positionScreen.z + Ee.positionScreen.z) / 3,
                                u.renderOrder = M.renderOrder,
                                S.elements.push(u)
                            }
                        }
                    }
                }
            } else if (M instanceof THREE.Line) {
                if (_ instanceof THREE.BufferGeometry) {
                    var w = _.attributes;
                    if (void 0 !== w.position) {
                        for (var P = w.position.array, I = 0, z = P.length; z > I; I += 3)
                            G.pushVertex(P[I], P[I + 1], P[I + 2]);
                        if (null !== _.index)
                            for (var W = _.index.array, I = 0, z = W.length; z > I; I += 2)
                                G.pushLine(W[I], W[I + 1]);
                        else
                            for (var He = M instanceof THREE.LineSegments ? 2 : 1, I = 0, z = P.length / 3 - 1; z > I; I += He)
                                G.pushLine(I, I + 1)
                    }
                } else if (_ instanceof THREE.Geometry) {
                    F.multiplyMatrices(D, g);
                    var Y = M.geometry.vertices;
                    if (0 === Y.length)
                        continue;de = t(),
                    de.positionScreen.copy(Y[0]).applyMatrix4(F);
                    for (var He = M instanceof THREE.LineSegments ? 2 : 1, $ = 1, ee = Y.length; ee > $; $++)
                        de = t(),
                        de.positionScreen.copy(Y[$]).applyMatrix4(F),
                        ($ + 1) % He > 0 || (fe = y[l - 2],
                        N.copy(de.positionScreen),
                        V.copy(fe.positionScreen),
                        o(N, V) === !0 && (N.multiplyScalar(1 / N.w),
                        V.multiplyScalar(1 / V.w),
                        d = n(),
                        d.id = M.id,
                        d.v1.positionScreen.copy(N),
                        d.v2.positionScreen.copy(V),
                        d.z = Math.max(N.z, V.z),
                        d.renderOrder = M.renderOrder,
                        d.material = M.material,
                        M.material.vertexColors === THREE.VertexColors && (d.vertexColors[0].copy(M.geometry.colors[$]),
                        d.vertexColors[1].copy(M.geometry.colors[$ - 1])),
                        S.elements.push(d)))
                }
            } else if (M instanceof THREE.Sprite) {
                L.set(g.elements[12], g.elements[13], g.elements[14], 1),
                L.applyMatrix4(D);
                var be = 1 / L.w;
                L.z *= be,
                L.z >= -1 && L.z <= 1 && (E = r(),
                E.id = M.id,
                E.x = L.x * be,
                E.y = L.y * be,
                E.z = L.z,
                E.renderOrder = M.renderOrder,
                E.object = M,
                E.rotation = M.rotation,
                E.scale.x = M.scale.x * Math.abs(E.x - (L.x + v.projectionMatrix.elements[0]) / (L.w + v.projectionMatrix.elements[12])),
                E.scale.y = M.scale.y * Math.abs(E.y - (L.y + v.projectionMatrix.elements[5]) / (L.w + v.projectionMatrix.elements[13])),
                E.material = M.material,
                S.elements.push(E))
            }
        }
        return R === !0 && S.elements.sort(a),
        S
    }
}
;
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
        return null !== t && (n = t),
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
            if (null !== e[o]) {
                if (i[o]instanceof Array) {
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
            if (void 0 !== e && null !== e && "" !== e)
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
                null != e.completeFunction && e.completeFunction()) : null != e.progressFunction && e.progressFunction(n)))
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
                null != i.completeFunction && i.completeFunction()
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
}(jQuery),
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
    app.showPage = function(e, t) {
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
            app.currentPage = e,
            window._hmt && _hmt.push(["_trackEvent", "进入页面", "进入第" + e + "页"])
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
        1 == c && e.beta - f > 5 && (c = 0,
		
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
        window.DeviceOrientationEvent && window.addEventListener("deviceorientation", t, !1)
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
              , i = (new THREE.TextureLoader).load("img/coffeebean.png")
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
        for (var e = 0; 14 > e; e++) {
            e > 6 ? j = e - 7 : j = e;
            var t = (new THREE.TextureLoader).load("img/" + (j + 1) + ".png")
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
            src: "rose2",
            type: "logo"
        },
        img2: {
            scale: 3.5,
            angle: 110,
            y: -3,
            src: "animal",
            type: "logo"
        },
        img3: {
            scale: 3.5,
            angle: 210,
            y: 2.5,
            src: "rose8",
            type: "logo"
        },
        img4: {
            scale: 3.5,
            angle: 290,
            y: -2.5,
            src: "rose3",
            type: "logo"
        },
        img5: {
            scale: 1.5,
            angle: 9,
            y: 2,
            src: "rose1",
            type: "coffeebean"
        },
        img6: {
            scale: 1.5,
            angle: 64,
            y: 2.3,
            src: "animal",
            type: "coffeebean"
        },
        img7: {
            scale: 1.5,
            angle: 140,
            y: 3,
            src: "rose5",
            type: "coffeebean"
        },
        img8: {
            scale: 1.5,
            angle: 189,
            y: 2,
            src: "rose6",
            type: "coffeebean"
        },
        img9: {
            scale: 1.5,
            angle: 244,
            y: -2.3,
            src: "rose7",
            type: "coffeebean"
        },
        img10: {
            scale: 1.5,
            angle: 320,
            y: 3,
            src: "rose4",
            type: "coffeebean"
        },
        img11: {
            scale: 4,
            angle: 350,
            y: -2.9,
            src: "rose1",
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
                imgs: ["img/5.jpg"]
            }, {
                id: "p2",
                selector: ".p2 img",
                imgs: ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/5.png", "img/bottle1.png", "img/bottle2.png", "img/bottle3.png", "img/coffeebean.png", "img/sky_logo.png"]
            }, {
                id: "p3",
                selector: ".p3 img",
                imgs: ["img/pic1.gif?v=" + app.firstRandom, "img/pic2.gif?v=" + app.firstRandom, "img/pic3.gif?v=" + app.firstRandom, "img/pic4.gif?v=" + app.firstRandom, "img/pic5.gif?v=" + app.firstRandom, "img/pic6.gif?v=" + app.firstRandom, "img/pic7.gif?v=" + app.firstRandom, "img/pic8.gif?v=" + app.firstRandom]
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
window.wxshare = function() {
    function e(e) {
        if ($.extend(i, e),
        !n)
            return void t();
        if (window.wx) {
            var r = window.wx;
            r.onMenuShareTimeline({
                title: i.timelineText || i.desc,
                link: i.timelineLink || i.link,
                imgUrl: i.timelineImgUrl || i.imgUrl,
                success: function() {
                    window._hmt && window._hmt.push(["_trackEvent", "wxshare", "Timeline", "分享到朋友圈成功"]),
                    i.onSuccess && i.onSuccess()
                },
                cancel: function() {
                    window._hmt && window._hmt.push(["_trackEvent", "wxshare", "Timeline", "分享到朋友圈取消"]),
                    i.onCancel && i.onCancel()
                }
            }),
            r.onMenuShareAppMessage({
                title: i.friendTitle || i.title,
                desc: i.friendDesc || i.desc,
                link: i.friendLink || i.link,
                imgUrl: i.friendImgUrl || i.imgUrl,
                type: "",
                dataUrl: "",
                success: function() {
                    window._hmt && window._hmt.push(["_trackEvent", "wxshare", "AppMessage", "分享给好友成功"]),
                    i.onSuccess && i.onSuccess()
                },
                cancel: function() {
                    window._hmt && window._hmt.push(["_trackEvent", "wxshare", "AppMessage", "分享给好友取消"]),
                    i.onCancel && i.onCancel()
                }
            }),
            r.onMenuShareQQ(i),
            r.onMenuShareWeibo(i),
            r.onMenuShareQZone(i)
        }
    }
    function t() {
        var t = this;
        if (!t.success && !t.running) {
            t.running = !0;
            var r = location.href.split("#")[0];
            r = encodeURIComponent(r),
            $.ajax({
                url: "http://bdaladdin.duapp.com/wxshare/api/",
                data: {
                    url: r
                },
                dataType: "jsonp",
                success: function(r) {
                    if ("ok" == r.status && window.wx) {
                        var a = window.wx
                          , o = -1 !== window.location.search.indexOf("__wxdebug__=1");
                        a.config({
                            debug: o,
                            appId: r.appId,
                            timestamp: r.timestamp,
                            nonceStr: r.nonceStr,
                            signature: r.signature,
                            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
                        }),
                        a.ready(function() {
                            n = !0,
                            e(i)
                        }),
                        t.success = !0
                    }
                },
                complete: function() {
                    t.running = !1
                }
            })
        }
    }
    var i = {
        title: "微信分享标题",
        desc: "微信分享描述",
        link: "微信分享链接",
        imgUrl: "微信分享图片",
        timelineText: null ,
        timelineLink: null ,
        timelineImgUrl: null ,
        friendTitle: null ,
        friendDesc: null ,
        friendLink: null ,
        friendImgUrl: null ,
        onSuccess: null ,
        onCancel: null
    }
      , n = !1;
    return {
        config: e
    }
}(),
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
