<template>
<v-container>
  
  <div class="barra-superior">
    <p> Productos</p>
  </div>
<div style="height:10px"></div>

  <div style="max-width:430px;margin-bottom:25px;">
    <v-autocomplete
      v-model="filtros"
      :items="catalogos"
      item-text="name"
      item-value="_id"
      label="filtrar por catalogo"
      multiple chips clearable
      @change="filtrar"
    />
  </div>

  <v-btn class="btn-nuevo" dark @click="abrirCrear">+ nuevo producto</v-btn>

  <div class="grid">
    <div 
      v-for="p in productos" 
      :key="p._id" 
      class="card"
      @click="editar(p)"
    >
      <img :src="p.image" class="img">
      <h4>{{ p.name }}</h4>
      <p class="precio">Q {{ p.price }}</p>
    </div>
  </div>

  <!-- editar -->
  <v-dialog v-model="modalEditar" width="480">
    <v-card class="p-4">

      <h3>Editar</h3>

      <v-text-field label="nombre" v-model="edit.nombre" />
      <v-text-field label="precio" v-model.number="edit.precio" type="number" />
      <v-text-field label="stock"  v-model.number="edit.stock" type="number" />
      <v-textarea    label="descripcion" v-model="edit.descripcion" />
      <v-text-field  label="imagen" v-model="edit.imagen" />

      <v-select
        multiple chips
        :items="catalogos"
        v-model="edit.catalogos"
        item-text="name"
        item-value="_id"
        label="catalogos"
      />

      <v-btn color="green" dark @click="guardarCambios">guardar</v-btn>
      <v-btn color="red"   dark @click="eliminarProducto">eliminar</v-btn>
      <v-btn class="ml-2" @click="modalEditar=false">cerrar</v-btn>
    </v-card>
  </v-dialog>

  <!-- nuevo -->
  <v-dialog v-model="modalNuevo" width="480">
    <v-card class="p-4">

      <h3>Nuevo producto</h3>
      <v-text-field label="nombre" v-model="form.nombre"/>
      <v-text-field label="precio" v-model.number="form.precio" type="number"/>
      <v-text-field label="stock"  v-model.number="form.stock" type="number"/>
      <v-textarea    label="descripcion" v-model="form.descripcion"/>
      <v-text-field  label="imagen url" v-model="form.imagen"/>
      <v-select
        multiple chips
        :items="catalogos"
        item-text="name" item-value="_id"
        v-model="form.catalogos"
        label="catalogos"
      />
      <v-btn color="primary" dark @click="guardarNuevo">crear</v-btn>
      <v-btn class="ml-2" @click="modalNuevo=false">cancelar</v-btn>
    </v-card>
  </v-dialog>
</v-container>
</template>


<script>
import api from "../services/api"

export default {

  data(){
    return{
      productos:[],
      original:[],
      catalogos:[],
      filtros:[],
      modalNuevo:false,
      modalEditar:false,
      form:{ nombre:"", precio:null, stock:null, descripcion:"", imagen:"", catalogos:[] },

      edit:{}
    }
  },

  async mounted(){
    await this.cargar()
  },

  methods:{

    async cargar(){
      const r = await api.get("/products")
      this.productos = r.data
      this.original  = r.data.slice()

      this.catalogos = (await api.get("/catalogs")).data
    },

    abrirCrear(){
      this.modalNuevo = true
      this.form = { nombre:"", precio:null, stock:null, descripcion:"", imagen:"", catalogos:[] }
    },

    editar(p){
      this.edit = {
        _id:p._id,
        nombre:p.name,
        precio:p.price,
        stock:p.stock,
        descripcion:p.description,
        imagen:p.image,
        catalogos:p.catalogIds ? [...p.catalogIds] : []
      }

      this.modalEditar = true
    },

    async guardarNuevo(){
      if(!this.form.nombre){
        return
      }

      const body = {
        name:this.form.nombre,
        price:this.form.precio,
        stock:this.form.stock,
        description:this.form.descripcion,
        image:this.form.imagen,
        catalogIds:this.form.catalogos
      }

      await api.post("/products",body)
      this.modalNuevo=false
      this.cargar()
    },

    async guardarCambios(){
      const payload = {
        name:this.edit.nombre,
        price:this.edit.precio,
        stock:this.edit.stock,
        description:this.edit.descripcion,
        image:this.edit.imagen,
        catalogIds:this.edit.catalogos
      }

      await api.patch(`/products/${this.edit._id}`,payload)

      this.modalEditar=false
      this.cargar()
    },


    async eliminarProducto(){
      if(!confirm("eliminar?")){
        return
      }
      await api.delete(`/products/${this.edit._id}`)
      this.modalEditar=false

      this.cargar()
    },

    filtrar(){
      //si no hay filtros muestra todos los productos
      if(this.filtros.length === 0){
        this.productos = this.original
        return
      }

      // aaplica los filtros 
      this.productos = this.original.filter(p=>{
        if(!p.catalogIds || p.catalogIds.length===0){
          return false
        }

        return this.filtros.every(f => p.catalogIds.includes(f))
      })
    }

  }
}
</script>


<style scoped>
.titulo-pagina{
  font-size:22px;
  font-weight:600;
  margin-bottom:25px;
  background-color:#1e3358;
  color: white
}

.v-dialog .v-card{
  padding:25px !important;
  border-radius:12px !important;
  box-shadow:0 4px 18px rgba(0,0,0,.15);
}

.v-dialog{
  backdrop-filter: blur(2px);
}

.v-dialog .v-text-field,
.v-dialog .v-textarea,
.v-dialog .v-select{
  margin-bottom:14px;
}

.v-dialog h3{
  margin-bottom:15px;
  font-size:19px;
  font-weight:600;
}

.btn-nuevo{
  background:#1e3358!important;
  font-weight:600;
  margin-bottom:22px;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
  gap:18px;
}

.card{
  background:white;
  border-radius:10px;
  padding:14px;
  box-shadow:0 2px 7px rgba(0,0,0,.08);
  cursor:pointer;
  transition:.18s;
}


.card:hover{
  transform:scale(1.03);
}
.img{
  width:100%;
  height:150px;
  border-radius:6px;
  object-fit:cover;
  margin-bottom:8px;
}

.precio{
  color:#3ea3af;
  font-weight:700;
}

.barra-superior {
  top: 0;
  left: 0;
  width: 100%;          
  background-color: #3ea3af; 
  color: white;         
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;   
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
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
