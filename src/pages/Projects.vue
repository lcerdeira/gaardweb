<template>
  <q-page
    class="my-bg"
    :class="$q.screen.width < 1550 ? 'column' : 'row'"
  >
    <div v-if="$q.screen.width < 1550">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        control-color="white"
        autoplay
        infinite
        padding
        arrows
        class="my-carousel rounded-borders"
        :style="{height: $q.platform.is.mobile ? '180px' : '220px'}"
      >
      <q-carousel-slide
        v-for="(slide, index) in $q.platform.is.mobile ? allMosaicos : $q.screen.width < 920 ? mosaicos : mosaicosH"
        :key="index+slide.toString()"
        :name="$q.platform.is.mobile ? (index+1).toString() : slide.name"
        class="no-wrap row">
        <div
          v-if="!$q.platform.is.mobile"
          class="no-wrap justify-center row q-gutter-x-md col-grow"
          style="height: 100%"
        >
          <q-img spinner-color="white" contain v-for="(img, i) in $q.screen.width < 920 ? slide.imagesS : slide.imagesH" :key="i+img.toString()" class="rounded-borders" :src="'galery/' + img" />
        </div>
        <q-img v-else contain class="rounded-borders" :src="'galery/' + slide"></q-img>
      </q-carousel-slide>
      </q-carousel>
    </div>
    <div
      class="column items-center justify-end"
      :class="$q.screen.width < 1550 ? 'col-grow' : 'col-10'"
    >
      <carousel-3d
        :animationSpeed="800"
        :controls-prev-html="'&#10092; '"
        :controls-next-html="'&#10093;'"
        ref="mycarousel"
        :controls-visible="true"
        :width="$q.screen.width < 1550 ? '490%' :'600%'"
        :height="$q.screen.width < 1550 ? '490%' :'600%'"
        :space="$q.platform.is.mobile ? 500 : 800"
        :perspective="5"
        class="column col-grow"
        :class="$q.platform.is.mobile ? 'justify-center' : $q.screen.width < 1550 ? 'justify-start' : 'justify-center'"
        @before-slide-change="onBeforeSlideChange"
      >
        <slide class="my-slide column" :index="index" v-for="(slide, index) in slides" :key="slide.toString()+index">
          <div class="full-height full-width column justify-center items-center" style="position: absolute">
            <q-card class="my-circle column justify-center text-center q-pa-xl cursor-pointer items-center no-wrap">
              <h5 class="q-my-md" >{{slide.title}}</h5>
              <p v-if="!$q.platform.is.mobile" >{{slide.content}}</p>
              <p v-if="index == 0 && $q.screen.width > 1550">{{slide.content2}}</p>
              <q-btn v-if="$q.platform.is.mobile" style="width:90px" flat class="btn-more-mobile" label="More" @click="showDialog = true"/>
            </q-card>
          </div>
          <div style="position:absolute" class="q-pl-md">
            <div
              class="image-circle column justify-center shadow-2"
              :class="$q.platform.is.mobile ? 'q-ml-md' : 'q-ml-xl'"
              :style="{
                width: $q.platform.is.mobile ? '100px' : $q.screen.width < 1550 ? '150px' :'180px',
                height: $q.platform.is.mobile ? '100px' : $q.screen.width < 1550 ? '150px' :'180px'}"
            >
              <q-img
                :src="'projects/' + slide.image"
                spinner-color="white"
                style="borderRadius: 50%"
              />
            </div>
          </div>
        </slide>
      </carousel-3d>
      <div
        class="justify-end column items-center"
        :class="$q.screen.width < 1550 ? 'q-pt-xl' :'full-height q-py-xl'"
        style="position: absolute"
      >
        <q-btn v-if="!$q.platform.is.mobile" flat class="btn-more" label="More" @click="showDialog = true"/>
        <div
          class="row justify-around q-pt-lg"
          :class="$q.platform.is.mobile ? '' : 'q-pb-sm'"
          style="width: 100px"
        >
          <q-btn
            class="q-mb-md"
            :class="currentIndex == index ? 'btn-current': 'btn-not'"
            round
            v-for="(btn, index) in slides.length"
            :key="btn+index" size="5px"
            @click="goToSlide(index)"
          />
        </div>
      </div>
    </div>
    <div class="col-grow column no-shadow" v-if="$q.screen.width > 1550">
      <q-carousel
        v-model="slide"
        transition-prev="slide-down"
        transition-next="slide-up"
        swipeable
        animated
        control-color="white"
        autoplay
        infinite
        padding
        vertical
        arrows
        class="my-carousel shadow-2 rounded-borders col-grow"
      >
      <q-carousel-slide
        v-for="(slide, index) in mosaicosA"
        :key="index+slide.toString()"
        :name="slide.name"
        class="no-wrap column">
        <div
          class="no-wrap col-grow justify-center column q-gutter-y-md"
        >
          <q-img v-for="(img, i) in slide.images" :key="i+img.toString()" class="rounded-borders" :src="'galery/' + img" />
        </div>
      </q-carousel-slide>
      </q-carousel>
    </div>

    <q-dialog v-model="showDialog" class="scroll">
      <div class="column items-center my-more justify-between no-wrap" style="width: 500px">
        <p class="q-ma-none q-px-md q-pt-lg text-white text-center" v-if="$q.platform.is.mobile">{{slides[currentIndex].content}}</p>
        <p class="q-ma-none q-px-md q-py-lg text-white text-center" v-if="$q.screen.width < 1550">{{slides[currentIndex].content2}}</p>
        <div
          class="full-width"
          :style="{height: $q.screen.width > 1550 ? '90%' : ''}"
        >
          <q-img class="full-width" :src="'projects/' + slides[currentIndex].moreImg"></q-img>
        </div>
        <div style="height: 70px">
          <q-btn flat class="btn-close q-ma-md" label="Close" @click="showDialog = false"/>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>

const slides = [
  {
    image: 'project1.png',
    title: 'GAARDian',
    content: 'The GAARDian project leverages the resources t developed in part by the GAARD project to develop a supported network of sub-Saharan African vector biologists, who work closely with their respective ministries of health. The aim is to enable these to design, implement and analyse genomic studies of malaria vectors to understand the evolution of insecticide resistance and its impact on control.',
    content2: 'This Global Challenges Research Fund foundation award (http://www.rcuk.ac.uk/funding/gcrf/) is designed to draw together these two groups with support from a world-leading spatial statistics group around the key issue of insecticide resistance evolution.',
    moreImg: 'more1.jpg'
  }
  // {
  //   image: 'project2.jpeg',
  //   title: 'Project 2',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum urna, mollis id rhoncus eget, consequat id purus. Vestibulum non condimentum massa. Donec pharetra vitae risus nec ultricies. Vivamus id scelerisque sem. Aenean eleifend dictum massa, ac pharetra lectus blandit ac.',
  //   content2: '',
  //   moreImg: 'more1.jpg'
  // },
  // {
  //   image: 'project3.jpeg',
  //   title: 'Project 3',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum urna, mollis id rhoncus eget, consequat id purus. Vestibulum non condimentum massa. Donec pharetra vitae risus nec ultricies. Vivamus id scelerisque sem. Aenean eleifend dictum massa, ac pharetra lectus blandit ac.',
  //   content2: '',
  //   moreImg: 'more1.jpg'
  // }
]

const allMosaicos = ['galery1.jpeg', 'galery2.jpeg', 'galery3.jpeg', 'galery4.jpeg', 'galery5.jpeg', 'galery6.jpeg', 'galery7.jpeg', 'galery8.jpeg', 'galery9.jpeg', 'galery10.jpeg', 'galery11.jpeg', 'galery12.jpeg', 'galery13.jpeg', 'galery14.jpeg', 'galery15.jpeg', 'galery16.jpeg', 'galery17.jpeg']

const mosaicos = [
  {
    name: '1',
    images: ['galery5.jpeg', 'galery13.jpeg', 'galery14.jpeg'],
    imagesH: ['galery5.jpeg', 'galery13.jpeg', 'galery14.jpeg', 'galery1.jpeg'],
    imagesS: ['galery5.jpeg', 'galery13.jpeg']
  },
  {
    name: '2',
    images: ['galery1.jpeg', 'galery2.jpeg', 'galery3.jpeg'],
    imagesH: ['galery2.jpeg', 'galery3.jpeg', 'galery16.jpeg', 'galery17.jpeg'],
    imagesS: ['galery14.jpeg', 'galery1.jpeg']
  },
  {
    name: '3',
    images: ['galery16.jpeg', 'galery17.jpeg', 'galery4.jpeg'],
    imagesH: ['galery4.jpeg', 'galery15.jpeg', 'galery12.jpeg', 'galery11.jpeg'],
    imagesS: ['galery2.jpeg', 'galery3.jpeg']
  },
  {
    name: '4',
    images: ['galery8.jpeg', 'galery9.jpeg'],
    imagesH: ['galery8.jpeg', 'galery9.jpeg', 'galery10.jpeg', 'galery6.jpeg', 'galery7.jpeg'],
    imagesS: ['galery16.jpeg', 'galery17.jpeg']
  },
  {
    name: '5',
    images: ['galery10.jpeg', 'galery6.jpeg'],
    imagesS: ['galery4.jpeg', 'galery15.jpeg']
  },
  {
    name: '6',
    images: ['galery11.jpeg', 'galery12.jpeg'],
    imagesS: ['galery12.jpeg', 'galery11.jpeg']
  },
  {
    name: '7',
    images: ['galery15.jpeg', 'galery7.jpeg'],
    imagesS: ['galery8.jpeg', 'galery9.jpeg']
  },
  {
    name: '8',
    imagesS: ['galery10.jpeg', 'galery6.jpeg']
  },
  {
    name: '9',
    imagesS: ['galery7.jpeg']
  }
]

import { Carousel3d, Slide } from 'vue-carousel-3d'
import { openURL } from 'quasar'

export default {
  name: 'Projects',
  components: { Carousel3d, Slide },
  data () {
    return {
      slides,
      mosaicos,
      currentIndex: 0,
      slide: '1',
      showDialog: false,
      allMosaicos
    }
  },
  computed: {
    mosaicosH () {
      return this.mosaicos.slice(0, this.mosaicos.length - 5)
    },
    mosaicosA () {
      return this.mosaicos.slice(0, this.mosaicos.length - 2)
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
  .btn-current{
    background-color: white;
    border: 1px solid white;
  }
  .btn-not{
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid white;
  }
  .btn-more{
    width: 200px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    color: white;
  }
  .btn-close{
    width: 200px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    color: white;
  }
  .btn-more-mobile{
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    color: white;
  }
  .image-circle{
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.7);
  }
  .my-carousel{
    background-color: transparent;
  }
  .my-more{
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
