<template>
  <q-page class="row justify-center">
    <div
      class="col-xl-3 col-lg-4 col-md-5 col-sm-8 col-xs-12 column justify-center"
      :class="$q.platform.is.mobile ? 'q-pa-md' : 'q-pa-xl'"
    >
      <div class="dark q-pa-xl" v-if="!showEmailLogin">
        <div class="text-center" style="color:white">
          <img src="~assets/logo_avatar.png" width="130em" />
          <p class="text-h5 q-pt-lg">GAARD Tools</p>
          <p class="text-subtitle1 q-ma-none" style="font-weight: 600">The future is here</p>
        </div>
        <div class="q-mt-lg">
          <q-btn
            push
            class="full-width text-black q-mt-md my-btn"
            dense
            label="Sign in with Microsoft"
            icon="img:login/microsoft.png"
            size="md"
            style="height: 40px">
          </q-btn>
          <q-btn
            push
            class="full-width text-black q-mt-lg my-btn"
            dense
            label="Sign in with Google"
            icon="img:login/google.webp"
            size="md"
            style="height: 40px">
          </q-btn>
          <q-btn
          @click="showEmailLogin = true"
            outline
            class="full-width text-white q-mt-lg my-btn"
            label="Sign in with E-mail"
            size="md">
          </q-btn>
        </div>
      </div>
      <div v-else class="dark q-pa-xl">
        <h6 class="q-mt-none text-white full-width text-center">Sign in to <b>GAARD Tools</b> </h6>
        <q-form
          ref="myForm"
          class="q-gutter-md"
        >
          <q-input
            bg-color="white"
            label-color="black"
            filled
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            bg-color="white"
            label-color="black"
            filled
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div class="row full-width justify-center q-gutter-x-md">
            <q-btn class="col-grow" label="Voltar" outline color="white" @click="showEmailLogin = false"/>
            <q-btn class="col-grow" label="Login" color="primary" @click="onSubmit()"/>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      showEmailLogin: false,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Form not Validated'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-bg{
    background-color: rgba(0, 0, 0, 0.3);
  }
  .dark{
    background: #1817309a;
  }
  .my-btn{
    text-transform: none;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.9);
  }
</style>
