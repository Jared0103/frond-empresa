<template>
  <v-card flat elevation="0" width="400" color="#F5F5F5">
    <v-card-title>
      <p class="text-center" style="width: 100% !important;">
        Welcome to the login page
      </p>
    </v-card-title>
    <v-card-text>
      <v-row style="width: 100% !important;">
        <v-col cols="4" align-self="center">
          <v-img
            :src="require('@/assets/imagenes/cod.png')"
            style="width: 100px; height: 100px;"
          />
        </v-col>
        <v-col>
          <form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.usuario"
                  label="Usuario"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  label="Contraseña"
                  type="password"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
            <v-row v-if="errorMessage" class="error">
              <v-col cols="12">
                {{ errorMessage }}
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row align="center" justify="center" class="ma-3">
        <v-col cols="12">
          <v-btn
            color="#2196F3"
            block
            @click="gotoSignup"
          >
            <span style="text-transform: none; color: #FFFFFF">
              Registrarse
            </span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="ma-3">
        <v-col cols="12">
          <v-btn
            color="#388E3C"
            block
            @click="login"
          >
            <span style="text-transform: none; color: #FFFFFF">
              Iniciar sesión
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        usuario: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.form
        })

        console.log('🚀 ~ login ~ response:', response)

        if (response && response.data && response.data.token) {
          // Almacenar el token manualmente si es necesario
          this.$auth.setUserToken(response.data.token)

          // Verificar el estado después de establecer el token
          console.log('Is user logged in?', this.$auth.loggedIn) // Esto debería ser true ahora

          // Redirigir
          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.errorMessage = error.message
      }
    },

    gotoSignup () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
.error {
  color: #FFCDD2;
}
</style>
