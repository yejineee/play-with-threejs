

## 🖍 Creating Scene

```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

```

### PerspectiveCamera

**인간의 눈**으로 바라보는 시각을 표현한다.
```javascript
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )

```
- fov : field of view
    - 화면에 보여지는 extent of the scene 씬의 넓이...?
    - 각도 (in degrees)
- aspect ratio : 거의 항상 width / height 값
- near : Camera frustum near plane.
- far : Camera frustum far plane.

far보다 멀고, near보다 가까운건 렌더링 되지 않는다.

### WebGLRenderer

1. renderer instance를 만든다.
2. 렌더링하고자 앱의 사이즈를 지정한다.
    - renderer.setSize( window.innerWidth, window.innerHeight );
    - 더 낮은 해상도로 지정하고 싶으면, 세 번째 parameter인 updateStyle을 false로 지정한다.


여기까지 하면 까만 화면이 보인다.

```javascript
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

```

### BoxGeometry

```javascript
BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
```
이제 큐브를 만들어보자!
큐브의 모든 점(vertice)들과 면(face)들을 갖고 있는 object이다.


### MeshBasicMaterial

색을 칠해보자!
이 도형에 색을 칠하기 위해서는 Material이 필요하다. 
모든 Material은 속성 객체를 갖는다.
여기에 color 프로퍼티를 추가하여 색을 입혀보자.


### Mesh

geometry를 받아서 그것에 material을 적용시키는 것이다.

### scene.add()

scene.add()를 했을 때, 지금까지 했던 것이 좌표 (0,0,0)에 추가된다.



## 🖍 Rendering the scene


여기까지하면 여전히 까만 화면이다.
왜냐면 아직 아무것도 렌더링하지 않았기 때문이다. 
그래서 **render**나 **animate loop**이라고 불리는 것이 필요하다.

```javascript
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```

이 코드는 loop를 만들게 된다. 이 루프는 렌더러가 씬을 스크린이 리프레쉬 될 때마다 그리게 해준다. 일반적으로 초당 60번 렌더러가 씬을 그리게 된다.

setInterval로 해도 되지만, requestAnimationFrame이 더 많은 이점을 안겨준다. 가장 중요한 이점은 유저가 다른 브라우저 탭으로 이동했을 때, 멈추기 때문에 전력과 배터리 처리를 낭비하지 않는다는 것이다.

## Animating the cube

```javascript
function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
```

이 코드느 frame을 매 초마다 60번씩 동작하게 한다.
frame이 그려질 때마다 큐브의 x축과 y축이 0.01씩 증가하면서, 회전하게 된다. 