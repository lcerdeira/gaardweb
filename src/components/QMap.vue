<template>
  <div class="full-height">
    <q-card class="full-height column">
      <q-card-section class='q-pa-none col-11'>
        <div class="full-height">
          <div id='map' style='top: 0; bottom: 0; height: 100%; width: 100%;'></div>
          <slot></slot>
        </div>
      </q-card-section>

      <q-card-actions align='around' class="col-grow">
        <!--<q-toggle-->
          <!--v-model='locked'-->
          <!--checked-icon='lock'-->
          <!--unchecked-icon='lock_open'-->
          <!--color='primary'-->
          <!--@input='render'-->
          <!--class='q-mr-md'-->
        <!--/>-->

        <q-btn-toggle
            v-model='mode'
            :options='modeOptions'
            toggle-color='primary'
            size='sm'
            @input='render'
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { MapboxGradientBoxControl } from 'mapbox-gl-infobox'
import './styles.css'

export default {
  name: 'Q-Map',
  props: [
    'defaultCentreToGeolocation',
    'centre-longitude',
    'centre-latitude',
    'locked',
    'id',
    'markers'
  ],
  data () {
    return {
      ready: false,
      map: null,
      mode: 'normal',
      modeOptions: [
        { label: 'Default', value: 'normal' },
        { label: 'Insecticide Resistance', value: 'ir' },
        { label: 'Heatmap', value: 'heat' }
      ]
    }
  }, // data
  async mounted () {
    const mapboxglCss = document.createElement('link')
    mapboxglCss.type = 'text/css'
    mapboxglCss.rel = 'stylesheet'
    mapboxglCss.href = `https://api.mapbox.com/mapbox-gl-js/v${mapboxgl.version}/mapbox-gl.css`

    const mapboxglJs = document.createElement('script')
    mapboxglJs.src = `https://api.mapbox.com/mapbox-gl-js/v${mapboxgl.version}/mapbox-gl.js`

    document.head.appendChild(mapboxglJs)
    document.head.appendChild(mapboxglCss)

    this.components = findComponents(this)

    this.ready = true
    await this.render()

    this.$root.$on('MAP_FLY_TO', ({ id, options }) => {
      if (this.id === id && this.map) {
        this.map.flyTo(options)
      }
    })
  }, // mounted
  beforeDestroy () {
    this.destroyMap()
  }, // beforeDestroy
  methods: {
    onLoad () {
      this.map.locked = this.locked
      this.components.forEach(s => {
        s.onLoad && s.onLoad(this.map)
      })
    }, // onLoad
    async mapOptions () {
      const [centre, bounds] = await findCentre(this, this.components)

      const options = {
        container: 'map', // container id
        center: centre,
        bounds: bounds,
        fitBoundsOptions: { padding: 20 },
        interactive: !this.locked,
        zoom: 1
      }

      // if (this.defaultCentreToGeolocation) {
      //   options.zoom = -200
      // }

      switch (this.mode) {
        case 'normal':
          options.style = 'mapbox://styles/lcerdeira/ckmmtykgx1n6e17qlo0rh68kg'
          break
        case 'ir':
          options.style = 'mapbox://styles/lcerdeira/ckmmlfh8k3uzw17poggps4qxc'
          break
        case 'heat':
          options.style = 'mapbox://styles/lcerdeira/ckmmnqvxg2iea17pj7hhrnmj8'
      }

      return options
    }, // mapOptions
    destroyMap () {
      if (!this.map) return

      if (this.navigationControl) this.map.removeControl(this.navigationControl)
      this.map.remove()
      this.map = null

      this.$root.$off('MAP_FLY_TO')
    }, // destroyMap
    async render () {
      if (this.ready) {
        this.destroyMap()

        // should be an env var
        mapboxgl.accessToken = 'pk.eyJ1IjoibGNlcmRlaXJhIiwiYSI6ImNraDZtY3ozMDA0YjQyenI3eXpiYW5tdDcifQ.un7LXthgJYv7RRgkarooDA'

        const options = await this.mapOptions()
        this.map = new mapboxgl.Map(options)

        this.navigationControl = new mapboxgl.NavigationControl({ showCompass: true })
        this.map.addControl(this.navigationControl)

        const layerId = 'features'
        const minMaxValues = { minValue: 0, maxValue: 100 }
        const weightGetter = properties => properties ? properties['Percent mortality'] : 0
        const gradientOptions = {
          layerId,
          minMaxValues,
          weightGetter
        }
        if (this.mode === 'heat') {
          this.map.addControl(new MapboxGradientBoxControl(gradientOptions))
        }

        this.map.on('load', () => this.onLoad())
      }
    }
  } // methods
} // ...

async function findCentre (qmap, components) {
  if (qmap.defaultCentreToGeolocation) {
    const position = await getCurrentPosition()
    const { latitude, longitude } = position.coords
    return [[longitude, latitude], null]
  }

  if (qmap.centreLongitude && qmap.centreLatitude) {
    return [[qmap.centreLongitude, qmap.centreLatitude], null]
  }

  const allPositions = components
    .filter(c => c.show)
    .map(c => c.position)
    .filter(p => p)

  if (allPositions.length) {
    if (allPositions.length === 1) {
      return [allPositions[0], null]
    }

    return [
      allPositions[0],
      bounds(allPositions)
    ]
  } // have components

  return [[0, 0], null]
} // findCentre

function findComponents (qmap) {
  if (!qmap.$slots || !qmap.$slots.default) return []

  return qmap.$slots.default
    .map(c => c.componentInstance)
    .filter(c => c)
} // findComponents

function bounds (allPositions) {
  return [
    minOf(allPositions, 0), minOf(allPositions, 1),
    maxOf(allPositions, 0), maxOf(allPositions, 1)
  ]
} // bounds

function minOf (allPositions, index) {
  return findOf(allPositions, index, Math.min)
} // minOf

function maxOf (allPositions, index) {
  return findOf(allPositions, index, Math.max)
} // maxOf

function findOf (allPositions, index, fn) {
  const p = allPositions
    .map(p => p[index])
    .map(p => Number(p))
  return fn(...p)
} // findOf

function getCurrentPosition (options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
</script>

<style lang='scss' scoped>

</style>
