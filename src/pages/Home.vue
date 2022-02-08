<template>
  <q-page class="column">
    <div
      class="my-bg col-grow column items-center justify-end"
      :class="$q.platform.is.mobile ? 'q-py-md' : 'q-py-xl'"
    >
      <carousel-3d :animationSpeed="800" :controls-prev-html="'&#10092; '" :controls-next-html="'&#10093;'" display="3" ref="mycarousel" :controls-visible="true" :width="$q.screen.lt.md ? '450%' : '600%'" :height="$q.screen.lt.md ? '450%' : '600%'" :space="$q.platform.is.mobile ? 500 : 800" :perspective="5" class="column justify-center col-grow" @before-slide-change="onBeforeSlideChange">
        <slide class="my-slide column" :index="index" v-for="(slide, index) in slides" :key="'slide'+index">
          <div class="full-height full-width column justify-center items-center">
            <q-card class="my-circle column justify-center text-center q-pa-xl cursor-pointer no-wrap">
              <div
                class="column justify-center"
                :style="{fontSize: !$q.platform.is.mobile ? '17px' : $q.screen.width <= 320 ? '13px' : '14.5px'}"
              >
                {{slide.content}}
              </div>
            </q-card>
          </div>
        </slide>
      </carousel-3d>
      <div class="q-py-xl justify-end column" style="position: absolute">
        <div class="row justify-around q-py-xl" style="width: 100px">
          <q-btn class="q-my-xl" :class="currentIndex == index ? 'btn-current': 'btn-not'" round v-for="(btn, index) in slides.length" :key="btn+index" size="5px" @click="goToSlide(index)"></q-btn>
        </div>
      </div>
      <div class="row full-width justify-center q-gutter-x-md q-px-md q-py-lg">
        <q-btn class="my-btn" v-for="(link, index) in links" :key="'link'+index" @click="openURL(link.link)">
          <img :height="'70px'" :src="'about/' + link.img">
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>

const slides = [
  {
    content: 'The GAARD project brings together a consortium of researchers from institutes in SSA and Europe.'
  },
  {
    content: 'The unifying theme of this project is to exploit the power of whole genome sequencing to identify genes/regulatory regions that are associated with insecticide resistance.'
  },
  {
    content: 'All these studies will be underpinned by extensive whole genome sequencing performed by the Wellcome Sanger.'
  },
  {
    content: 'We use a combination of approaches including computer-based searches of existing genome data bases; large scale collections and resistance screening of malaria mosquitoes in both East and West Africa, and laboratory crossing experiments to identify rare, resistance-associated variants.'
  }
]

const links = [
  {
    img: 'lstm.png',
    link: 'https://www.lstmed.ac.uk/'
  }
]

import { Carousel3d, Slide } from 'vue-carousel-3d'
import { openURL } from 'quasar'

export default {
  name: 'About',
  components: { Carousel3d, Slide },
  data () {
    return {
      slides,
      links,
      currentIndex: 0
    }
  },
  methods: {
    openURL,
    onBeforeSlideChange (index) {
      this.currentIndex = index
    },
    goToSlide (index) {
      this.$refs.mycarousel.goSlide(index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-bg{
    background-color: rgba(0, 0, 0, 0.3);
  }
  .my-slide{
    border: none;
    background-color: transparent;
  }
  .my-circle{
    border-radius: 50%;
    height: 85%;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .my-btn{
    background-color: rgba(255, 255, 255, 0.3);
  }
  .btn-current{
    background-color: white;
    border: 1px solid white;
  }
  .btn-not{
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid white;
  }
</style>
