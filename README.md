# l-advanced-control

Leaflet controls with advanced positioning capabilities.

![l-advanced-control example](https://github.com/itanka9/l-advanced-control/blob/master/docs/example.png)

# Requirements

Leaflet 1.3.x.

# Demo

[Example](https://itanka9.github.io/l-advanced-control/)

# Usage

1. Include this plugin after Leaflet.js 

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/l-advanced-control@0.1.0/build/l-advanced-control.min.js"></script>
```

or install and use with npm:

```
npm i l-advanced-control --save
```

```
import 'l-advanced-control'
```

2. Extend `L.FlexControl` class, to define your control.

```js
const MyButton = L.FlexControl.extend({
    onAdd (map) {
        return L.DomUtil.create('div', 'my-button')
    }
})
```

3. Add it to map

```js
const button = new MyButton({ position: { corner: 'topleft', grow: 'x' } })
button.addTo(map)
```

# API

`L.FlexControl` adds to `L.Control` prop `grow`, which defined direction, in which it will "grow".

```js
type Grow = 'x' | 'y'
```