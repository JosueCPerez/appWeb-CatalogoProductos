<template>
<v-container>
  <div class="barra-superior">
    <p>Gestión de Catálogos</p>
  </div>
<div style="height:20px"></div>

  <v-tabs v-model="tab" background-color="#1e3358ff" dark>
    <v-tab>Lista de catálogos</v-tab>
    <v-tab>Crear catálogo</v-tab>
    <v-tab>Productos por catálogo</v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">


     <!-- lista de catalogos -->
    <v-tab-item>
      <v-card class="pa-4 mt-4">
        <h3>Listado de catálogos</h3>

        <v-simple-table class="mt-3">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th width="200"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in catalogos" :key="c._id">

              <td>{{ c.codigo }}</td>

              <td>
                <input v-if="editId===c._id" v-model="editName">
                <span v-else>{{ c.name }}</span>
              </td>

              <td>
                <input v-if="editId===c._id" v-model="editDescription">
                <span v-else>{{ c.description }}</span>
              </td>

              <td>
                <template v-if="editId===c._id">
                  <v-btn small color="success" @click="guardarCambios(c._id)">OK</v-btn>
                  <v-btn small color="grey" @click="cancelarEdicion">Cancelar</v-btn>
                </template>

                <template v-else>
                  <v-btn small color="info" @click="editar(c)">Editar</v-btn>
                  <v-btn small color="red" @click="eliminar(c._id)">Eliminar</v-btn>
                </template>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-tab-item>

    <!-- crear nuevo catalogo-->
    <v-tab-item>
      <v-card class="pa-5 mt-4">
        <h3>Nuevo catálogo</h3>

        <v-text-field v-model="catalogName" label="Nombre"/>
        <v-textarea v-model="catalogDescription" label="Descripción"/>

        <v-btn color="#1e3358ff" dark @click="crearCatalogo">Guardar</v-btn>
        <span style="color:red;margin-left:10px" v-if="errorMsg">{{errorMsg}}</span>
      </v-card>
    </v-tab-item>


   


    <!-- productos por catalogo  -->
<v-tab-item>
  <v-card class="pa-5 mt-4">
    <h3>Productos contenidos en catálogo</h3>

    <v-select
      :items="catalogos"
      item-text="name"
      item-value="_id"
      v-model="selectedCatalog"
      label="Selecciona un catálogo"
      @change="cargarProductosCatalogo"
    />

    <!-- solo aparece si hay productos -->
    <v-simple-table v-if="productos.length > 0" class="mt-3">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p._id">
          <td><img :src="p.image" width="55"></td>
          <td>{{ p.name }}</td>
          <td>Q{{ p.price }}</td>
          <td>{{ p.stock }}</td>
        </tr>
      </tbody>
    </v-simple-table>

  </v-card>
</v-tab-item>


  </v-tabs-items>

</v-container>
</template>


<script>
import api from '../services/api'

export default {
  data(){
    return{
      tab:0,
      catalogos:[],
      productos:[],

      catalogName:"",
      catalogDescription:"",
      errorMsg:"",

      selectedCatalog:null,
      editId:null,
      editName:"",
      editDescription:""
    }
  },

  mounted(){ this.cargarDatos() },

  methods:{
    async cargarDatos(){
      const r = await api.get("/catalogs")
      this.catalogos = r.data
    },

    async crearCatalogo(){
      if(!this.catalogName){
        this.errorMsg="Nombre requerido"; return
      }
      this.errorMsg=""

      await api.post("/catalogs",{name:this.catalogName,description:this.catalogDescription})
      this.catalogName=""; this.catalogDescription="";
      this.cargarDatos()
      this.tab=1
    },

    editar(c){ this.editId=c._id; this.editName=c.name; this.editDescription=c.description },
    cancelarEdicion(){ this.editId=null },

    async guardarCambios(id){
      await api.patch(`/catalogs/${id}`,{
        name:this.editName, description:this.editDescription
      })
      this.cancelarEdicion(); this.cargarDatos()
    },

    async eliminar(id){
      if(!confirm("Eliminar catálogo?")) return
      await api.delete(`/catalogs/${id}`)
      this.cargarDatos()
    },

    async cargarProductosCatalogo(){
      if(!this.selectedCatalog){
        this.productos = []      // limpia si no hay un catalogo seleccionado
        return
      }

      const r = await api.get(`/products/byCatalog/${this.selectedCatalog}`)
      this.productos = r.data
    }
  }
}
</script>

<style scoped>

.catalog-wrapper{
  width:100%;
  padding:25px;
}

.v-tabs{
  border-radius:6px 6px 0 0;
}



.catalog-card{
  background:#ffffff;
  border-radius:10px;
  padding:25px;
  border-left:6px solid #1e3358ff; 
  margin-top:20px;
}

.catalog-title{
  font-size:22px;
  font-weight:600;
  margin-bottom:15px;
  color:#184a4f;
}

.v-text-field,
.v-textarea{
  margin-bottom:12px;
}

.v-btn.primary-btn{
  background:#3ea3af!important;
  color:white!important;
  font-weight:500;
}

.v-simple-table{
  border-radius:8px;
  overflow:hidden;
  border:1px solid #d9e6e8;
  margin-top:18px;
}

.v-simple-table th{
  background:#3ea3af;
  color:white;
  font-weight:600;
  padding:10px;
}

.v-simple-table td{
  padding:10px;
  border-bottom:1px solid #eef4f5;
}

.btn-sm{
  padding:4px 10px!important;
  margin-right:4px;
}

.catalog-select{
  max-width:350px;
  margin-top:20px;
}

.product-list img{
  border-radius:5px;
  box-shadow:0 1px 3px rgba(0,0,0,.2);
}

.barra-superior {
  position: fixed;       
  top: 0;
  left: 0;
  width: 100%;          
  background-color: #3ea3af; 
  color: white;         
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;   
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
  z-index: 1000;        
}

.barra-superior {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1e3358ff;
  color: white;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}




</style>

