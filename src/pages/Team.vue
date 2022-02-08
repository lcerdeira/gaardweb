<template>
  <q-page class="column">
    <div class="column col-grow my-bg">
      <div
        class="col-grow column col-grow"
        :class="$q.platform.is.mobile ? 'q-py-md' : 'q-py-xl'"
      >
        <div class="column col-grow no-wrap col-grow">
          <div class="full-height col-grow column justify-around items-center">
            <div class="full-width justify-center row">
              <div class="my-alumni text-center column justify-center q-my-md">Team</div>
            </div>
            <carousel-3d :controls-prev-html="'&#10092; '" :controls-next-html="'&#10093;'" :clickable="false" :bias="'right'" :disable3d="true" ref="mycarousel" :controls-visible="true" :width="'275px'" :height="'350px'" :space="350" class="column justify-center col-grow" @before-slide-change="onBeforeSlideChange">
              <slide class="my-slide bg-transparent" :index="index" v-for="(member, index) in teamMembers[0]" :key="member.toString()+index">
                <q-card class="my-card full-height">
                  <q-card-section class="full-height column justify-center no-wrap">
                    <q-card-section class="text-center column items-center q-pt-none" :style="{width: '220px'}" :class="'full-width'">
                      <q-avatar :size="'120px'" class="my-avatar">
                        <img :src="'teamIcons/' + member.image">
                      </q-avatar>
                      <div class="full-width column justify-center content-center">
                        <p class="member-name text-black">{{member.name}}</p>
                      </div>
                      <a class="row no-wrap items-center q-pt-md cursor-pointer my-link full-width" :href='member.link' target="_blank">
                        <div class="column justify-center">
                          <q-img :src="'teamIcons/' + member.logo1" :height="'30px'" :width="'30px'" />
                        </div>
                        <p class="member-info q-pl-sm text-left">{{member.info}}</p>
                      </a>
                      <a v-if="member.info2 != ''" class="row no-wrap items-center q-pt-md cursor-pointer my-link full-width" :href='member.link' target="_blank">
                        <div class="column justify-center">
                          <q-img :src="'teamIcons/' + member.logo2" :height="'30px'" :width="'30px'" />
                        </div>
                        <p class="member-info q-pl-sm text-left">{{member.info2}}</p>
                      </a>
                    </q-card-section>
                    <div class="row q-pt-xs col-grow items-end justify-around">
                      <div v-for="(social, b) in showGithub(member.social)" :key="social+b">
                        <q-btn @click="member.social[b] != '' ? openURL(member.social[b]) : ''" class="my-social-btn" unelevated round size="13px">
                          <q-icon style="width: 22px; height: 22px" :name="socialIcons[b]"></q-icon>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </slide>
            </carousel-3d>
            <div class="row justify-around" style="width: 140px">
              <q-btn class="q-my-md" :class="currentIndex == b ? 'btn-current': 'btn-not'" round v-for="(btn, b) in teamMembers[0].length" :key="btn+b" size="4px" @click="goToSlide(b, 0)"></q-btn>
            </div>
            <q-separator dark class="full-width q-my-md my-sep"/>
            <carousel-3d :controls-prev-html="'&#10092; '" :controls-next-html="'&#10093;'" :clickable="false" :bias="'right'" :disable3d="true" ref="mycarousel2" :controls-visible="true" :width="'275px'" :height="'350px'" :space="350" class="column justify-center col-grow" @before-slide-change="onBeforeSlideChange2">
              <slide class="my-slide bg-transparent" :index="index" v-for="(member, index) in teamMembers[1]" :key="member.toString()+index">
                <q-card v-if="member.name != ''" class="my-card full-height">
                  <q-card-section class="full-height column justify-center no-wrap">
                    <q-card-section class="text-center column items-center q-pt-none" :style="{width: '220px'}" :class="'full-width'">
                      <q-avatar :size="'120px'" class="my-avatar">
                        <img :src="'teamIcons/' + member.image">
                      </q-avatar>
                      <div class="full-width column justify-center content-center">
                        <p class="member-name text-black">{{member.name}}</p>
                      </div>
                      <a class="row no-wrap items-center q-pt-md cursor-pointer my-link full-width" :href='member.link' target="_blank">
                        <div class="column justify-center">
                          <q-img :src="'teamIcons/' + member.logo1" :height="'30px'" :width="'30px'" />
                        </div>
                        <p class="member-info q-pl-sm text-left">{{member.info}}</p>
                      </a>
                      <a v-if="member.info2 != ''" class="row no-wrap items-center q-pt-md cursor-pointer my-link full-width" :href='member.link' target="_blank">
                        <div class="column justify-center">
                          <q-img :src="'teamIcons/' + member.logo2" :height="'30px'" :width="'30px'" />
                        </div>
                        <p class="member-info q-pl-sm text-left">{{member.info2}}</p>
                      </a>
                    </q-card-section>
                    <div class="row q-pt-xs col-grow items-end justify-around">
                      <div v-for="(social, b) in showGithub(member.social)" :key="social+b">
                        <q-btn @click="member.social[b] != '' ? openURL(member.social[b]) : ''" class="my-social-btn" unelevated round size="13px">
                          <q-icon style="width: 22px; height: 22px" :name="socialIcons[b]"></q-icon>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </slide>
            </carousel-3d>
            <div class="row justify-around" style="width: 140px">
              <q-btn class="q-my-md" :class="currentIndex2 == b ? 'btn-current': 'btn-not'" round v-for="(btn, b) in teamMembers[1].length" :key="btn+b" size="4px" @click="goToSlide(b, 1)"></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

const socialIcons = [
  'img:teamIcons/social3.png',
  'img:teamIcons/social4.png',
  'img:teamIcons/social5.png',
  'img:teamIcons/social1.png'
]

const teamMembers = [
  [
    { name: 'Amy Lynd', info: 'Liverpool School of Tropical Medicine', info2: '', social: ['https://orcid.org/0000-0001-6054-0525', 'https://scholar.google.nl/citations?hl=pt-BR&user=SOMqxUoAAAAJ', '', ''], link: 'https://www.lstmed.ac.uk/about/people/dr-amy-lynd', link2: '', image: 'member4.jpg', logo1: 'lstm.png', logo2: '' },
    { name: 'David Weetman', info: 'Liverpool School of Tropical Medicine', info2: '', social: ['https://orcid.org/0000-0002-5820-1388', 'https://scholar.google.nl/citations?hl=pt-BR&user=lS24F7sAAAAJ', 'https://twitter.com/DaveW43883848', ''], link: 'https://www.lstmed.ac.uk/about/people/dr-david-weetman', link2: '', image: 'member3.jpg', logo1: 'lstm.png', logo2: '' },
    { name: 'Eric Lucas', info: 'Liverpool School of Tropical Medicine', info2: '', social: ['https://orcid.org/0000-0003-3892-1668', '', 'https://twitter.com/EricRLucas', ''], link: 'https://www.lstmed.ac.uk/about/people/dr-eric-lucas', link2: '', image: 'member5.jpeg', logo1: 'lstm.png', logo2: '' },
    { name: 'Louise Cerdeira', info: 'Liverpool School of Tropical Medicine', info2: '', social: ['https://orcid.org/0000-0002-4495-2615', 'https://scholar.google.nl/citations?user=O2dcz5MAAAAJ&hl=pt-BR', 'https://twitter.com/lcerdeira', 'https://github.com/lcerdeira'], link: 'https://www.lstmed.ac.uk/', link2: '', image: 'member1.jpg', logo1: 'lstm.png', logo2: '' },
    { name: 'Martin Donnelly', info: 'Liverpool School of Tropical Medicine', info2: '', social: ['https://orcid.org/0000-0001-5218-1497', '', 'https://twitter.com/MartinDonnelly8', ''], link: 'https://www.lstmed.ac.uk/about/people/professor-martin-james-donnelly', link2: '', image: 'member2.jpg', logo1: 'lstm.png', logo2: '' },
    { name: 'Sanjay Nagi', info: 'Liverpool School of Tropical Medicine', info2: '', social: ['https://orcid.org/0000-0003-1214-8523', 'https://scholar.google.nl/citations?hl=pt-BR&user=P-ImwEcAAAAJ', 'https://twitter.com/Sanjay_C_Nagi', 'https://github.com/sanjaynagi'], link: 'https://www.lstmed.ac.uk/about/people/sanjay-nagi', link2: '', image: 'member7.jpeg', logo1: 'lstm.png', logo2: '' }
  ],
  [
    { name: 'Arjen Van \'T Hof', info: 'University of Liverpool', info2: '', social: ['https://orcid.org/0000-0002-8813-4227', '', '', ''], link: 'https://www.liverpool.ac.uk/integrative-biology/staff/arjen-van-t-hof/', link2: '', image: '', logo1: 'uol.png', logo2: '' },
    { name: 'Xavier Grau-Bové', info: 'Centre de Regulació Genòmica', info2: '', social: ['https://orcid.org/0000-0003-1978-5824', 'https://scholar.google.com/citations?user=wV8yidYAAAAJ&hl=ca', 'https://twitter.com/xgraubove', 'https://github.com/xgrau/'], link: 'https://www.crg.eu/', link2: '', image: 'alumni2.jpg', logo1: 'crg.png', logo2: '' },
    { name: 'Alexander Egyir-Yawson', info: 'University of Cape Coast', info2: '', social: ['https://orcid.org/0000-0002-4447-4027', 'https://scholar.google.nl/citations?hl=pt-BR&user=Tb4DISUAAAAJ', ''], link: 'https://directory.ucc.edu.gh/p/alexander-egyir-yawson', link2: '', image: 'partner1.jpg', logo1: 'ucc.gif', logo2: '' },
    { name: 'Bilali Kabula', info: 'National Institute for Medical Research', info2: '', social: ['https://orcid.org/0000-0002-7374-169X', 'https://scholar.google.com/citations?user=0zlp3mcAAAAJ&hl=en', 'https://twitter.com/AndyBilali'], link: 'https://www.nimr.or.tz/', link2: '', image: 'partner2.jpg', logo1: 'nimr.png', logo2: '' },
    { name: 'Catherine Moyes', info: 'Big Data Institute', info2: 'University of Oxford', social: ['https://orcid.org/0000-0002-8028-4079', 'https://scholar.google.co.uk/citations?user=yGF4kAoAAAAJ&hl=en', 'https://twitter.com/gmivvectormaps'], link: 'https://www.bdi.ox.ac.uk/Team/catherine-moyes', link2: 'https://www.ndm.ox.ac.uk/team/catherine-moyes', image: 'partner3.jpg', logo1: 'bdi.jpg', logo2: 'oxford.jpg' },
    { name: 'Constant Edi', info: 'Centre Suisse de Recherche Scientifique', info2: '', social: ['https://orcid.org/0000-0003-1564-4354', '', 'https://mobile.twitter.com/CSRS_CIV'], link: 'http://csrs.ch/', link2: '', image: 'partner4.jpg', logo1: 'csrs.jpg', logo2: '' },
    { name: 'Eric Ochomo', info: 'Kenya Medical Research Institute', info2: '', social: ['https://orcid.org/0000-0002-4042-4970', 'https://scholar.google.com/citations?user=QaIxYmgAAAAJ&hl=en', 'https://twitter.com/eochomo'], link: 'https://www.kemri.org/unm/', link2: '', image: 'partner5.jpg', logo1: 'kemri.png', logo2: '' },
    { name: 'Janet Midega', info: 'Imperial College London', info2: 'Wellcome Centre Human Genetics', social: ['https://orcid.org/0000-0003-4998-8040', 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AJsN-F68FIbVEAxn2NcK2_mERT1tKiO-QR4y_Zn2BripoNnLdHFwLfkQ-eDspQF8-u1pmRw11cHmZrsi5KTQ4u1_SZ5F_LOX3Q&user=xfdFVOgAAAAJ', 'https://twitter.com/tjmidega'], link: 'https://www.imperial.ac.uk/people/j.midega', link2: 'https://www.well.ox.ac.uk/people/jmidega', image: 'partner6.jpg', logo1: 'icl.jpg', logo2: 'wchg.png' },
    { name: 'Luc Djogbénou', info: 'Liverpool School of Tropical Medicine', info2: 'Universite D\'Abomey-Calavi', social: ['https://orcid.org/0000-0002-7381-6321', '', 'https://twitter.com/LDjogbenou'], link: 'https://www.lstmed.ac.uk/about/people/dr-luc-salako-djogbenou', link2: 'https://uac.bj/', image: 'partner7.jpg', logo1: 'lstm.png', logo2: 'uadc2.png' },
    { name: 'Penny Hancock', info: 'Big Data Institute', info2: '', social: ['https://orcid.org/0000-0001-5531-1082', 'https://scholar.google.com/citations?user=0XIJSXQAAAAJ&hl=en', 'https://twitter.com/PennyHa94902454', 'https://github.com/pahanc'], link: 'https://www.bdi.ox.ac.uk/Team/penny-hancock', link2: '', image: 'partner8.jpeg', logo1: 'bdi.jpg', logo2: '' }
  ]
]

import { Carousel3d, Slide } from 'vue-carousel-3d'
import { openURL } from 'quasar'

export default {
  name: 'Team',
  components: { Carousel3d, Slide },
  data () {
    return {
      teamMembers: teamMembers,
      socialIcons,
      currentSocial: 0,
      currentIndex: 0,
      currentIndex2: 0
    }
  },
  methods: {
    openURL,
    filterEmpty (socials) {
      const findEmpty = arr => arr.filter((item, index) => item === '')
      const result = findEmpty(socials)
      return result.length === this.socialIcons.length - 1
    },
    onBeforeSlideChange (index) {
      this.currentIndex = index
    },
    onBeforeSlideChange2 (index) {
      this.currentIndex2 = index
    },
    goToSlide (index, carousel) {
      if (carousel === 0) {
        this.$refs.mycarousel.goSlide(index)
      } else {
        this.$refs.mycarousel2.goSlide(index)
      }
    },
    showGithub (socials) {
      if (socials[3] === '') {
        return socials.slice(0, socials.length - 1)
      }
      return socials
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    position: absolute;
    height: inherit;
    display: flex;
    flex-flow: column;
  }
  .my-card{
    background-color: rgba(255, 255, 255, 0.8);
    border: 0;
  }
  .member-name{
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 3px;
    font-size: 16px;
    margin: 0;
    padding-top: 10px;
  }
  .member-info{
    color: black;
    margin: 0;
  }
  .my-link{
    color: black;
  }
  .my-social-btn{
    background-color: rgba(0, 0, 0, 0.3);
  }
  .my-member-btn{
    position: absolute;
  }
  .my-bg{
    background-color: rgba(0, 0, 0, 0.3);
  }
  .my-slide{
    border: none;
    background-color: transparent;
  }
  .my-link{
    color: black;
  }
  .member-info{
    color: black;
    margin: 0;
  }
  .my-social-btn{
    background-color: rgba(0, 0, 0, 0.2);
  }
  .btn-current{
    background-color: white;
    border: 1px solid white;
  }
  .btn-not{
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid white;
  }
  .my-alumni{
    background-color: rgba(0, 0, 0, 0.5);
    width: 200px;
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
    font-size: 16px;
  }
</style>
