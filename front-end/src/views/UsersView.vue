<template>
  <v-container>

    <div class="titulo-pagina">
      Usuarios registrados
    </div>

    <!-- boton crear solo para admin -->
    <v-btn
      v-if="isAdmin"
      class="btn-nuevo"
      dark
      @click="abrirNuevo"
    >
      + nuevo usuario
    </v-btn>

    <v-simple-table class="tabla">
      <thead>
        <tr>
          <th>nombre</th>
          <th>email</th>
          <th>rol</th>
          <th v-if="isAdmin" width="170"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in usuarios" :key="u._id">
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role }}</td>

          <td v-if="isAdmin">
            <v-btn small color="info" @click="editar(u)">editar</v-btn>
            <v-btn small color="red"  @click="eliminar(u._id)">eliminar</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>


    <!-- modal nuevo -->
    <v-dialog v-model="modalNuevo" width="450">
      <v-card>

        <h3>nuevo usuario</h3>

        <v-text-field
          v-model="nuevo.name"
          label="nombre"
        />
        <v-text-field
          v-model="nuevo.userName"
          label="usuario"
        />
        <v-text-field
          v-model="nuevo.email"
          label="email"
        />
        <v-text-field
          v-model="nuevo.password"
          label="password"
          type="password"
        />

        <v-select
          v-model="nuevo.role"
          :items="['admin','user']"
          label="rol"
        />

        <div v-if="errorNuevo" style="color:#c62828;margin-bottom:10px;">
          {{ errorNuevo }}
        </div>

        <v-btn color="primary" dark @click="guardarNuevo">crear</v-btn>
        <v-btn class="ml-2" @click="modalNuevo=false">cancelar</v-btn>

      </v-card>
    </v-dialog>


    <!-- modal editar -->
    <v-dialog v-model="modalEditar" width="450">
      <v-card>

        <h3>editar usuario</h3>

        <v-text-field
          v-model="edit.name"
          label="nombre"
        />
        <v-text-field
          v-model="edit.email"
          label="email"
        />

        <v-select
          v-model="edit.role"
          :items="['admin','user']"
          label="rol"
        />

        <div v-if="errorEditar" style="color:#c62828;margin-bottom:10px;">
          {{ errorEditar }}
        </div>

        <v-btn color="green" dark @click="guardarCambios">guardar</v-btn>
        <v-btn color="grey"  class="ml-2" @click="modalEditar=false">cerrar</v-btn>

      </v-card>
    </v-dialog>

  </v-container>
</template>


<script>
import api from '../services/api'

export default {
  data(){
    return{
      usuarios:[],
      modalNuevo:false,
      modalEditar:false,
      nuevo:{
        name:"",
        userName:"",
        email:"",
        password:"",
        role:"user"
      },
      edit:{},
      isAdmin:false,
      errorNuevo:"",
      errorEditar:""
    }
  },

  async mounted(){
    await this.cargar()
    this.validarRol()
  },

  methods:{

    validarRol(){
      const token = localStorage.getItem('token')
      if(!token){
        return
      }

      try{
        const payload = JSON.parse(atob(token.split('.')[1]))
        if(payload.role === "admin"){
          this.isAdmin = true
        }
      }catch(e){
        console.log("token no valido")
      }
    },

    async cargar(){
      const r = await api.get('/users')
      this.usuarios = r.data
    },

    abrirNuevo(){
      this.modalNuevo = true
      this.errorNuevo = ""
      this.nuevo = {
        name:"",
        userName:"",
        email:"",
        password:"",
        role:"user"
      }
    },

    validarEmail(correo){
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(correo)
    },

    async guardarNuevo(){
      this.errorNuevo = ""

      if(!this.nuevo.name || !this.nuevo.userName || !this.nuevo.email || !this.nuevo.password){
        this.errorNuevo = "todos los campos son obligatorios"
        return
      }

      if(!this.validarEmail(this.nuevo.email)){
        this.errorNuevo = "formato de correo no valido"
        return
      }

      try{
        await api.post("/users",this.nuevo)
        this.modalNuevo = false
        this.cargar()
      }catch(e){
        if(e.response && e.response.status === 409){
          this.errorNuevo = "correo o usuario ya existe"
        }else{
          this.errorNuevo = "no se pudo crear el usuario"
        }
      }
    },

    editar(u){
      this.errorEditar = ""
      this.edit = {
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role
      }
      this.modalEditar = true
    },

    async guardarCambios(){
      this.errorEditar = ""

      if(!this.edit.name || !this.edit.email){
        this.errorEditar = "nombre y correo son requeridos"
        return
      }

      if(!this.validarEmail(this.edit.email)){
        this.errorEditar = "formato de correo no valido"
        return
      }

      const id = this.edit._id

      const body = {
        name: this.edit.name,
        email: this.edit.email,
        role: this.edit.role
      }

      try{
        await api.patch(`/users/${id}`,body)
        this.modalEditar = false
        this.cargar()
      }catch(e){
        this.errorEditar = "no se pudo actualizar el usuario"
      }
    },

    async eliminar(id){
      if(!confirm("eliminar usuario?")){
        return
      }
      await api.delete(`/users/${id}`)
      this.cargar()
    }

  }
}
</script>


<style scoped>
.titulo-pagina{
  font-size:22px;
  font-weight:600;
  margin-bottom:20px;
  background:#1e3358;
  color:white;
  padding:10px;
}

.btn-nuevo{
  background:#1e3358!important;
  font-weight:600;
  margin-bottom:20px;
}

.tabla{
  border:1px solid #e1e1e1;
  border-radius:6px;
  overflow:hidden;
}

.tabla td .v-btn{
  margin-right:6px;
}

.v-dialog .v-card{
  padding:25px !important;
  border-radius:12px;
}

.v-dialog .v-text-field,
.v-dialog .v-select{
  margin-bottom:14px;
}

.v-dialog h3{
  margin-bottom:18px;
  font-size:18px;
  font-weight:600;
}
</style>
