<template>
  <q-layout view="lHh Lpr lFf" class="column">
    <div class="col-grow column">

      <q-header class="bg-primary">
        <q-toolbar>

          <q-avatar size="100px">
            <img src="~assets/logo_avatar.png">
          </q-avatar>

          <q-toolbar-title>
            GAARD - Genomics for African Anopheles Resistance Diagnostics
          </q-toolbar-title>

          <q-btn v-if="$q.screen.width <= 925" flat @click="drawer = !drawer" round dense icon="menu" />

          <q-tabs
            v-if="$q.screen.width > 925"
            v-model="currentTab"
            indicator-color="transparent"
            :active-color="currentTab == 'login' ? 'black' : 'white'"
          >
            <q-route-tab
              :class="tab.name == 'login' ? 'my-tab-login' : currentTab == tab.name? 'my-tab' : ''"
              :to="tab.to"
              :name="tab.name"
              :label="tab.label"
              v-for="(tab, index) in tabs"
              :key="index.toString()+tab"/>
          </q-tabs>

          <q-drawer>

          </q-drawer>

        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="230"
        side="right"
        overlay
        content-class="my-drawer text-white"
      >
        <q-scroll-area class="fit my-scroll">
          <q-list padding class="menu-list q-pa-none">
            <template v-for="(tab, i) in tabs">
              <q-item clickable v-ripple :key="i+tab.toString()" @click="changeTab(tab.name)">
                <q-item-section avatar>
                  <q-icon :name="tab.icon" color="primary"/>
                </q-item-section>

                <q-item-section>
                  <div style="width: 110px">{{tab.label}}</div>
                </q-item-section>

                <q-item-section class="column items-end" v-if="tab.name == currentTab">
                  <div style="width: 12px; height: 12px; background-color: white; border-radius: 60%"></div>
                </q-item-section>

              </q-item>
              <q-separator :key="'sep'+i" dark/>
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container style="position:absolute" class="full-width column">
        <div class="col-grow my-image-bg">
          <router-view/>
        </div>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>

const tabs = [
  {
    name: 'home',
    label: 'Home',
    to: 'home',
    icon: 'home'
  },
  // {
  //   name: 'about',
  //   label: 'About',
  //   to: 'about',
  //   icon: 'info'
  // },
  {
    name: 'team',
    label: 'Team',
    to: 'team',
    icon: 'groups'
  },
  // {
  //   name: 'partners',
  //   label: 'Partners',
  //   to: 'partners',
  //   icon: 'people'
  // },
  {
    name: 'projects',
    label: 'Related Projects',
    to: 'projects',
    icon: 'extension'
  },
  {
    name: 'publications',
    label: 'Publications',
    to: 'publications',
    icon: 'library_books'
  },
  // {
  //   name: 'tools',
  //   label: 'Tools',
  //   to: 'tools',
  //   icon: 'dvr'
  // },
  {
    name: 'login',
    label: 'Login',
    to: 'login',
    icon: 'login'
  }
]

import { Screen } from 'quasar'
Screen.setSizes({ sm: 300, md: 610, lg: 1000, xl: 1550 })

export default {
  name: 'MainLayout',
  data () {
    return {
      currentTab: 'home',
      tabs,
      drawer: false
    }
  },
  methods: {
    changeTab (tab) {
      this.drawer = false
      this.currentTab = tab
      this.$router.push(tab)
    }
  }
}
</script>

<style lang="scss">
  body{
    font-family: 'Open Sans', sans-serif;
  }
  .my-tab{
    background-color: rgba(255, 255, 255, 0.1);
  }
  .my-tab-login{
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
  }
  .my-image-bg, .my-drawer{
    background-image: url("~assets/gaard_bg.jpeg");
    background-size: cover;
  }
  .my-drawer{
    background-position-x: 20%;
  }
  .my-scroll{
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
