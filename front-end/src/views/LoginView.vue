<template>
  <div class="login-wrapper">     

    <v-card class="login-card" elevation="12">
      
      <h2 class="login-title">Iniciar sesión</h2>

      <v-text-field
        label="Email"
        v-model="email"
      />

      <v-text-field
        label="Contraseña"
        type="password"
        v-model="password"
      />

      <v-btn class="login-btn" block @click="login">
        Entrar
      </v-btn>

      <v-alert v-if="error" type="error" dense class="mt-3">
        {{ error }}
      </v-alert>

    </v-card>

  </div>
</template>


<script>
import api from '../services/api'

export default {
  data(){
    return{
      email:"",
      password:"",
      error:null
    }
  },
  methods:{
    async login(){
      if(!this.email || !this.password){
        this.error="Completa los campos"
        return
      }

      try{
        const r = await api.post("/auth/login",{ email:this.email, password:this.password })
        localStorage.setItem("token",r.data.token)
        this.$router.push("/catalogs")

      }catch(e){

        if(e.response && (e.response.status===401 || e.response.status===409)){
          this.error="Email o contraseña incorrectos"
          return
        }

        this.error = e.response
          ? "Error de servidor"
          : "Sin conexión al backend"
      }
    }
  }
}
</script>

<style>
  .login-wrapper{
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100vh;             
    padding:0;
    margin:0;
  }

  .login-card{
    width:100%;
    max-width:380px;          
    padding:35px;
    border-radius:10px;
    background:#fff;
    border-top:5px solid #3ea3af;
  }

  .login-title{
    color: #1e3358ff;
    text-align:center;
    margin-bottom:30px;
    font-weight:600;
  }

  .login-btn{
    background: #1e3358ff !important;
    color:white !important;
    text-transform:none;
    font-size:18px;
  }
  .login-btn:hover{
    background: #306aa0ff !important;
  }
</style>
