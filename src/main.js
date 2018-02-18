export function initFlexControl (L) {
  L.FlexControl = L.Class.extend({
    options: {
      position: { corner: 'topright', grow: 'y' }
    },

    initialize: function (options) {
      L.Util.setOptions(this, options)
    },

    getPosition: function () {
        return this.options.position
    },

    setPosition: function (position) {
      const map = this._map

      if (map) {
        map.removeControl(this)
      }

      this.options.position = position

      if (map) {
        map.addControl(this)
      }

      return this
    },

    getContainer: function () {
      return this._container
    },

    addTo: function (map) {
      this.remove()
      this._map = map

      var container = this._container = this.onAdd(map),
          pos = this.getPosition(),
          corner = map._controlCorners[pos.corner ? (pos.corner + pos.grow) : pos]

      L.DomUtil.addClass(container, 'leaflet-control')

      if ((pos.corner || pos).indexOf('bottom') !== -1) {
        corner.insertBefore(container, corner.firstChild)
      } else {
        corner.appendChild(container)
      }

      return this
    },

    remove: function () {
      if (!this._map) {
        return this
      }

      L.DomUtil.remove(this._container)

      if (this.onRemove) {
        this.onRemove(this._map)
      }

      this._map = null

      return this
    },

    _refocusOnMap: function (e) {
      // if map exists and event is not a keyboard event
      if (this._map && e && e.screenX > 0 && e.screenY > 0) {
        this._map.getContainer().focus()
      }
    }
  })

  L.Map.include({
    _initControlPos: function () {
      const corners = this._controlCorners = {},
          l = 'leaflet-',
          container = this._controlContainer =
                  L.DomUtil.create('div', l + 'control-container', this._container)

      function createCorner (vSide, hSide, grow) {
        const className = l + vSide + ' ' + l + hSide
        const classNameX = l + 'grow-x'
        const classNameY = l + 'grow-y'
        const cornerDiv = L.DomUtil.create('div', className, container)

        if (hSide === 'left') {
          corners[vSide + hSide] = corners[vSide + hSide + 'y'] = L.DomUtil.create('div', classNameY, cornerDiv)
          corners[vSide + hSide + 'x'] = L.DomUtil.create('div', classNameX, cornerDiv)
        } else {
          corners[vSide + hSide + 'x'] = L.DomUtil.create('div', classNameX, cornerDiv)
          corners[vSide + hSide] = corners[vSide + hSide + 'y'] = L.DomUtil.create('div', classNameY, cornerDiv)
        }
      }

      createCorner('top', 'left')
      createCorner('top', 'right')
      createCorner('bottom', 'left')
      createCorner('bottom', 'right')
    },

    _clearControlPos: function () {
      for (var i in this._controlCorners) {
        L.DomUtil.remove(this._controlCorners[i])
      }
      L.DomUtil.remove(this._controlContainer)
      delete this._controlCorners
      delete this._controlContainer
    }
  })
}