<template>
  <v-container fluid class="register-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card flat elevation="2" class="pa-5 card-background">
          <v-card-title class="text-center title-style">
            <h2>Crear una cuenta</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.nombre"
                    label="Nombre"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.apaterno"
                    label="Apellido Paterno"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.amaterno"
                    label="Apellido Materno"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.correo"
                    label="Correo Electrónico"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-email"
                    type="email"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.telefono"
                    label="Teléfono"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-phone"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.direccion"
                    label="Dirección"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-home"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.ciudad"
                    label="Ciudad"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-city"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.estado"
                    label="Estado"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-map-marker"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.usuario"
                    label="Nombre de Usuario"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-account-circle"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.password"
                    label="Contraseña"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.confirmarPassword"
                    label="Confirmar Contraseña"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-lock-check"
                    type="password"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-combobox
                    v-model="form.rol"
                    label="Rol"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-account-group"
                    :items="['Administrador', 'Compras']"
                  />
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="form.imagen"
                    label="Subir imagen"
                    outlined
                    dense
                    color="#1976D2"
                    prepend-icon="mdi-image"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" justify="center" class="mb-4">
              <v-col cols="12" md="6">
                <v-btn
                  color="#f44336"
                  block
                  @click="gotoLogin"
                >
                  <span style="text-transform: none; color: #FFFFFF">
                    Cancelar
                  </span>
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  color="#4CAF50"
                  block
                  @click="registrarUsuario"
                >
                  <span style="text-transform: none; color: #FFFFFF">
                    {{ inside && update ? 'Actualizar' : inside && !update ? 'Crear Nuevo' : 'Registrar' }}
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    inside: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    empleadoUpdate: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        id: null,
        imagen: null
      }
    }
  },
  mounted () {
    console.log('🚀 ~ mounted ~ this.update:', this.update, this.empleadoUpdate)
    if (this.update && this.empleadoUpdate) {
      this.form = this.empleadoUpdate
      this.form.password = ''
    }
  },
  methods: {
    gotoLogin () {
      if (this.inside) {
        this.$emit('click-cancel')
      } else {
        this.$router.push('/')
      }
    },
    async registrarUsuario () {
      // Verificar que el campo de usuario (o cualquier otro campo obligatorio) no esté vacío
      if (!this.form.usuario || !this.form.password || !this.form.confirmarPassword) {
        console.error('Debe llenar todos los campos obligatorios')
        alert('Por favor, llene todos los campos obligatorios.')
        return // Detener la ejecución si algún campo obligatorio está vacío
      }

      // Verificar que las contraseñas coincidan
      if (this.form.password !== this.form.confirmarPassword) {
        console.error('Las contraseñas no coinciden')
        alert('Las contraseñas no coinciden')
        return // Detener la ejecución si las contraseñas no coinciden
      }

      const formData = new FormData()

      // Recorrer los campos del formulario
      for (const key in this.form) {
        if (key === 'imagen') {
          if (this.form.imagen) {
            formData.append('imagen', this.form.imagen) // Subir imagen
          } else {
            console.warn('No se ha seleccionado ninguna imagen')
          }
        } else {
          formData.append(key, this.form[key]) // Agregar otros campos
        }
      }
      try {
        // Verificar si se trata de una actualización o una creación
        let response
        if (this.update) {
          response = await this.$axios.put(`/empleados/update/${this.form.id}`, formData)
        } else {
          response = await this.$axios.post('/empleados/create', formData)
        }

        console.log('🚀 ~ registrarUsuario ~ response:', response)

        // Verificar el estado de la respuesta
        if (response.data.success) {
          this.usuario = {}
          this.form = {} // Limpiar el formulario

          if (this.inside) {
            this.$emit('guardado') // Emitir el evento si está dentro
          } else {
            this.$router.push('/') // Redirigir si no está dentro
          }
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error)
        // Aquí podrías agregar un mensaje de error para el usuario, por ejemplo:
        this.$toast.error('Error al registrar el usuario')
      }
    }

  }
}
</script>

<style scoped>
.register-container {
  background-color: #F5F5F5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-background {
  background-color: #FFFFFF;
  border-radius: 12px;
}

.title-style {
  font-weight: bold;
  font-size: 24px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
