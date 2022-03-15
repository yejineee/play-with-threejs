# Perspective Camera

- fov
  - field of view
  - 수직으로 75
- aspect
  - display aspect of the canvas
  - width / height
  - default : 300/150 or 2
- near & far
  - 카메라 앞의 space
  - near, far 바깥에 있는것은 렌더링되지 않거나, 클립됨.

- fov, aspect, near, far가 `frustum`을 구성하게 됨.