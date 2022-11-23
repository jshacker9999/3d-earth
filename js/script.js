var camera, scene, renderer;
var earth, cloud;
var pointLight, ambientLight;
var mouseDown = false, mouseX = 0, mouseY = 0;
var stats;

init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 160;
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    var earthTexture = new THREE.TextureLoader().load("images/earth.jpeg");
    var earthBump = new THREE.TextureLoader().load("images/bump.jpeg");
    var earthSpecular = new THREE.TextureLoader().load("images/spec.jpeg");
    var earthGeometry = new THREE.SphereGeometry(30, 32, 32);
    var earthMaterial = new THREE.MeshPhongMaterial({
        shininess: 40,
        bumpScale: 1,
        map: earthTexture,
        bumpMap: earthBump,
        specularMap: earthSpecular
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);


    var cloudTexture = new THREE.TextureLoader().load('images/cloud.png');
    var cloudGeometry = new THREE.SphereGeometry(31, 32, 32);
    var cloudMaterial = new THREE.MeshBasicMaterial({
        shininess: 10,
        map: cloudTexture,
        transparent: true,
        opacity: 0.8
    });
    cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloud);


    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-400, 100, 150);
    scene.add(pointLight);


    ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);


    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', function (e) { onMouseMove(e); }, false);
    document.addEventListener('mousedown', function (e) { onMouseDown(e); }, false);
    document.addEventListener('mouseup', function (e) { onMouseUp(e); }, false);
}

function animate() {
    requestAnimationFrame(animate);
    stats.begin();
    earth.rotation.y += 0.001;
    cloud.rotation.y += 0.001;
    stats.end();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(evt) {
    if (!mouseDown) return;
    evt.preventDefault();
    var deltaX = evt.clientX - mouseX, deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
}

function rotateScene(deltaX, deltaY) {
    earth.rotation.y += deltaX / 300;
    earth.rotation.x += deltaY / 300;
    cloud.rotation.y += deltaX / 300;
    cloud.rotation.x += deltaY / 300;
}
