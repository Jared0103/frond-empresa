<template>
  <v-alert v-if="mensaje" :type="type" :color="color" shaped>
    <span>
      {{ mensaje }}
    </span>
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      type: state => state.ShowAlert.type,
      color: state => state.ShowAlert.color,
      mensaje: state => state.ShowAlert.mensaje
    })
  }
}
</script>

<style scoped>
</style>
