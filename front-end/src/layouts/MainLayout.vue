<template>
  <v-app>

    <v-app-bar app color="#1e3358" dark>
      <v-btn text @click="$router.push('/catalogs')">Catálogos</v-btn>
      <v-btn text @click="$router.push('/products')">Productos</v-btn>
      <v-btn text v-if="isAdmin" @click="$router.push('/users')">Usuarios</v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Cerrar Sesión</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data(){
    return{ isAdmin:false }
  },

  mounted(){
    const token = localStorage.getItem("token")
    if(token){
      const data = JSON.parse(atob(token.split('.')[1]))
      if(data.role === 'admin') this.isAdmin = true
    }
  },

  methods:{
    logout(){
      localStorage.removeItem("token")
      this.$router.push("/login")
    }
  }
}
</script>
