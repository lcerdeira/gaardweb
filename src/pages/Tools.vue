<template>
  <q-page class="column">
    <div
      class="my-bg q-pb-md col-grow column"
      :class="$q.screen.width < 1200 ? 'q-pt-md' : 'q-pt-md q-px-xl'"
    >
      <div
        class="row justify-between items-center"
        :class="$q.platform.is.mobile ? 'q-px-xs' : 'q-px-lg'"
      >
        <div class="row items-center">
          <q-avatar class="shadow-1" size="lg">
            <img src="https://www.stepstherapy.com.au/wp-content/uploads/2018/10/Yazmin-profile-picture-square.jpg">
          </q-avatar>
          <div class="text-subtitle1 q-ma-none q-pl-sm text-white">Louise Cerdeiras</div>
        </div>
        <q-btn outline style="color: white; height: 35px" label="Log Out" />
      </div>
      <q-carousel
        arrows
        animated
        v-model="slide"
        class="col-grow full-width column bg-transparent justify-center"
        control-color="black"
      >
        <q-carousel-slide
          class="column col-grow full-height full-width"
          :class="$q.platform.is.mobile ? 'q-px-xs' : ''"
          v-for="(slide, index) in tabs"
          :key="slide.toString() + index"
          :name="slide.name"
        >
          <div class="col-grow my-col column full-width no-wrap">
            <q-tabs
              v-model="currentTab"
              dense
              class="text-white my-tabs"
              indicator-color="transparent"
              align="justify"
            >
              <q-tab
                :name="tab.name"
                :label="tab.label"
                v-for="(tab, i) in slide.tabs"
                :key="i + tab.toString()"
                :class="
                  tab.name == currentTab ? 'tab-active' : 'tab-inactive'
                "
              />
            </q-tabs>
            <q-tab-panels
              v-model="currentTab"
              animated
              class="col-grow my-panel full-width column"
              :style="{height: '750px'}"
            >

              <q-tab-panel
                :name="slide.tabs[0].name"
              >
                <div
                  class="column full-height q-py-md"
                  :class="$q.platform.is.mobile ? 'q-px-xs' : 'q-px-md'"
                >
                  <q-scroll-area class="full-height column" visible>
                    <div id="jbrowse_linear_view" class="q-pr-sm"></div>
                  </q-scroll-area>
                  <script type="module">
                  import assembly from './jbrowse/assembly.js'
                  import tracks from './jbrowse/tracks.js'
                  import ds from './jbrowse/default_session.js'
                  const genomeView = new JBrowseLinearView({
                    container: document.getElementById('jbrowse_linear_view'),
                    assembly,
                    tracks
                  })
                  </script>
                </div>
              </q-tab-panel>

              <q-tab-panel
                :name="slide.tabs[1].name"
                class="q-pa-none col-grow full-height"
              >
                <div class="full-height">
                  <div class="full-height full-width column items-center">
                    <q-map
                      class="full-height full-width"
                      :locked="false"
                      :markers="data"
                      >
                      <!-- <q-map-circle
                        v-for="(circle, index) in data" :key="index+'circle'"
                        :latitude="circle.lat"
                        :longitude="circle.lon"
                        :locked="true"
                        :showMarker="true"
                      /> -->
                    </q-map>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel
                :name="slide.tabs[2].name"
                class="q-py-none q-px-sm col-grow full-height"
              >
                <div class="q-px-lg full-height">
                  <div class="full-height full-width column items-center">
                    <q-table
                      :data="data"
                      :columns="columns"
                      row-key="name"
                      :filter="filter"
                      class="full-height my-sticky-header-table no-shadow"
                      separator="horizontal"
                      style="width: 80vw; border-radius: 0px"
                      :rows-per-page-options="[ 20, 50, 75, 100, 200, 500, 0 ]"
                    >
                      <template v-slot:top-right>
                        <q-btn
                          color="primary"
                          icon-right="archive"
                          label="Export to csv"
                          no-caps
                          @click="exportTable"
                        />
                      </template>
                      <template v-slot:top-left>
                        <div class="row">
                          <q-input
                          dense
                          debounce="300"
                          v-model="filter"
                          placeholder="Search"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                        </div>
                      </template>
                    </q-table>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel
                :name="slide.tabs[3].name"
              >
                <div class="row q-px-lg q-pt-lg full-height" :style="{paddingBottom: '35px'}">
                </div>
              </q-tab-panel>

            </q-tab-panels>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
const tabs = [
  {
    name: '0',
    tabs: [
      {
        name: 'jbrowser',
        label: 'JBrowser'
      },
      {
        name: 'map',
        label: 'Map'
      },
      {
        name: 'table',
        label: 'Table'
      },
      {
        name: 'charts',
        label: 'Charts'
      }
    ]
  }
]

const graphs = [
  {
    image: 'graph2.png'
  },
  {
    image: 'graph3.png'
  },
  {
    image: 'graph4.jpg'
  },
  {
    image: 'graph5.png'
  },
  {
    image: 'graph6.png'
  },
  {
    image: 'graph7.jpg'
  }
]

import { exportFile } from 'quasar'
import tableData from '../../documents/K13_surveyor_data.js'
import QMap from '../components/QMap.vue'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== undefined
    ? formatFn(val)
    : val

  formatted = formatted === undefined || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
  name: 'Tools',
  components: { QMap },
  data () {
    return {
      tabs,
      graphs,
      filter: '',
      columns: [],
      data: [],
      slide: '0',
      tableData,
      currentTab: 'jbrowser'
    }
  },
  watch: {
    currentTab (value) {
      if (value === 'charts') {
        this.getCharts()
      }
    }
  },
  methods: {
    getColumns () {
      this.columns = []
      for (const key in tableData[0]) {
        this.columns.push({
          name: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          field: key,
          sortable: true,
          headerStyle: 'font-weight: bolder; font-size: 14px',
          align: 'left'
        })
      }
    },
    getData () {
      this.data = []
      for (let i = 0; i < this.tableData.length; i++) {
        this.data.push({})
        for (const index in this.columns) {
          this.data[i][this.columns[index].name] = this.tableData[i][this.columns[index].name]
        }
      }
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.data.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === undefined ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    getCharts () {}
  },
  mounted () {
    this.getColumns()
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  .my-bg{
      background-color: rgba(0, 0, 0, 0.3);
    }
  .my-col {
    border-radius: 12px;
    border: 1px solid;
  }
  .my-tabs {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .tab-active {
    background-color: black;
  }
  .tab-inactive {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .my-panel {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .my-graph {
    width: 47%;
    height: 30.9%;
  }
  .my-img {
    border: 1px solid black;
  }
  .my-table{
    border-radius: 5px;
  }
</style>

<style lang="sass">
  .my-sticky-header-table
    /* height or max-height is important */
    height: 310px

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      /* bg color is important for th; just specify one */
      background-color: white

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0

    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
</style>
