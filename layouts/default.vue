<template>
  <v-app dark>
    <v-app-bar class="flex-grow-0">
      <v-container>
        <v-row class="justify-space-between align-center">
          <v-col class="brands" cols="6">
            <Logo/>
          </v-col>
          <v-col class="brands text-right" cols="6">
            <Cart/>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main class="flex-grow-1">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <v-container>
        <v-row class="align-center text-center">
          <v-col class="brands" cols="12">&copy; {{ new Date().getFullYear() }}</v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from "~/components/Logo";
import Cart from "~/components/Cart";
export default {
  components: {
    Logo,
    Cart
  }
}
</script>
