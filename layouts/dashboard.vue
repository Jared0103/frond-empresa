<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer permanent absolute right>
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/lego/6.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jared Ochoa</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
        { title: 'Empleados', icon: 'mdi-account-group', path: '/dashboard' },
        { title: 'Products', icon: 'mdi-cube' },
        { title: 'Orders', icon: 'mdi-cart' },
        { title: 'Settings', icon: 'mdi-cog' }
      ]
    }
  }
}
</script>

<style scoped></style>
