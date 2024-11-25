<template>
  <div class="pa-3 ma-3">
    <v-row align="center" justify="center">
      <h1>Administracion de Empleados</h1>
    </v-row>
    <v-row align="center" justify="end">
      <v-btn @click="dialogCreate = true">
        <v-icon>mdi-account</v-icon>
        <span style="text-transform: none">
          Agregar Nuevo
        </span>
      </v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-data-table
        :headers="headers"
        :items="empleados"
        :items-per-page="5"
        class="elevation-1"
      >
        <template #[`item.acciones`]="{ item }">
          <v-tooltip bottom color="green">
            <template #activator="{ on, attr }">
              <v-btn
                icon
                color="warning"
                v-bind="attr"
                v-on="on"
                @click="update(item)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Actualiza el empleado: {{ item.nombre }}</span>
          </v-tooltip>
          |
          <v-tooltip bottom color="red">
            <template #activator="{ on, attr }">
              <v-btn
                icon
                color="red"
                v-bind="attr"
                v-on="on"
                @click="deleteEmpleado(item.id)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Borrar el empleado: {{ item.nombre }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog v-model="dialogBorrar" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">
          Borrar Empleado
        </v-card-title>
        <v-card-text>
          ¿Estás seguro de que quieres borrar este empleado?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialogBorrar = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="borralo"
          >
            Sí
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogCreate"
      width="800"
      persistent
    >
      <signupForm
        :inside="true"
        @click-cancel="dialogCreate = false"
        @guardado="empleadoGuardado"
      />
    </v-dialog>
    <v-dialog
      v-model="dialogUpdate"
      width="800"
      persistent
    >
      <signupForm
        :inside="true"
        :update="true"
        :empleado-update="empleadoActualizar"
        @click-cancel="dialogUpdate = false"
        @guardado="empleadoGuardado"
      />
    </v-dialog>
  </div>
</template>

<script>
import signupForm from './signupForm.vue'
export default {
  components: {
    signupForm
  },
  data () {
    return {
      empleados: [],
      headers: [
        { text: 'Nombre', align: 'center', sortable: true, value: 'nombre' },
        { text: 'Apellido Paterno', align: 'center', sortable: true, value: 'apaterno' },
        { text: 'Apellido Materno', align: 'center', sortable: true, value: 'amaterno' },
        { text: 'Dirección', align: 'center', sortable: true, value: 'direccion' },
        { text: 'Teléfono', align: 'center', sortable: true, value: 'telefono' },
        { text: 'Ciudad', align: 'center', sortable: true, value: 'ciudad' },
        { text: 'Estado', align: 'center', sortable: true, value: 'estado' },
        { text: 'Usuario', align: 'center', sortable: true, value: 'usuario' },
        { text: 'Rol', align: 'center', sortable: true, value: 'rol' },
        { text: 'Imagen', align: 'center', sortable: false, value: 'imagen' },
        { text: 'Acciones', align: 'center', sortable: true, value: 'acciones' }
      ],
      idBorrar: null,
      dialogBorrar: false,
      dialogCreate: false,
      dialogUpdate: false,
      empleadoActualizar: {}
    }
  },
  mounted () {
    this.getEmpleados()
  },
  methods: {
    async getEmpleados () {
      try {
        const res = await this.$axios.get('/empleados')
        if (res && res.data && res.data.success) {
          this.empleados = res.data.empleados
        }
        console.log('🚀 ~ getEmpleados ~ res:', res)
      } catch (error) {
        console.error(error)
      }
    },
    deleteEmpleado (id) {
      this.idBorrar = id
      this.dialogBorrar = true
    },
    async borralo () {
      const borrado = await this.$axios.delete(`/empleados/delete/${this.idBorrar}`)
      if (borrado && borrado.data && borrado.data.success) {
        this.$store.commit('setShowAlert', {
          type: 'success',
          color: 'success',
          mensaje: 'Empleado borrado con éxito'
        })

        setTimeout(() => {
          this.$store.commit('setShowAlert', {
            type: '',
            color: '',
            mensaje: ''
          })
        }, 2000)

        await this.getEmpleados()
      }
      console.log('🚀 ~ borralo: ', borrado)
      this.dialogBorrar = false
    },
    empleadoGuardado () {
      this.getEmpleados()
      this.dialogCreate = false
      this.dialogUpdate = false
    },
    update (item) {
      this.empleadoActualizar = item
      console.log('🚀 ~ update ~ item:', item, this.empleadoActualizar)
      this.dialogUpdate = true
    }
  }
}
</script>

<style scoped>

</style>
