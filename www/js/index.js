/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var cargarDB = {
     db:"",
     initialize: function(){
         //generamos el conector
         this.db = window.openDatabase("localDB","1.0","Base de datos mini CRM",2*1024*1024);
         this.createDB();
     },
     createDB:function(){
         console.log("Cargar la base de datos");
         //transaccion
         this.db.transaction(this.mostrarDB,this.mostrarDBError);
     },
     mostrarDB:function(tx){
         var sql="SELECT * FROM localDB;";
         console.log("Lanzamos la consulta");
         tx.executeSql(
             sql,
             [],
             function(tx,result){
                 console.log("Se ha producido la consulta con exito");

                 if(result.rows.length>0){
                     for(var i=0;i<result.rows.length;i++){
                         var fila=result.rows.item(i);
                         console.log("ROW"+i+"nombre: "+fila.nombre);
                         $("#lista ul").append("<li id='"+fila.id+"' class='listausers'><a href='detalles.html' data-ajax = 'false'><div class='nombreLista'>"+fila.nombre+"</div><div class='profesion'>"+fila.cargo+"</div></li>").listview('refresh');
                        console.log("No da error");
                      }
                 }

                 $(document).ready(
                  function(){
                      $('.listausers').click(
                          function(){
                              var id=$(this).attr("id");
                              window.localStorage.setItem("idusuario",id);
                          }
                      );
                  }
              );
             },
             function(tx,error){
                 this.mostrarDBError(error);
             }
         );
     },
     mostrarDBError:function(err){
         console.log("Se ha producido un error en la creacion de la base de datos"+err.code);
         console.log("MENSAGE DE ERROR: "+err.message);
     }
 };

 var confDB = {
     existe_db:"",
     db:"",
     initialize: function(){
         //variable existe db
         this.existe_db=window.localStorage.getItem("existe_db");
         //Crearemos un enlace con la base de datos
         this.db = window.openDatabase("localDB","1.0","Base de datos mini CRM",2*1024*1024);

         //Preguntamos si es necesario crear la base de datos
         if(this.existe_db==null){
             console.log("No existe Base de datos");
             this.createDB();
         }else{
             //Base de datos creada
             cargarDB.initialize();
         }
     },
     createDB:function(){
         console.log("Creamos la base de datos");
         //transaccion
         this.db.transaction(this.createLocaDB,this.createDBError,this.createDBSucc);
     },
     createLocaDB:function(tx){
         var sql="CREATE TABLE IF NOT EXISTS localDB("+
             "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
             "nombre VARCHAR(50),"+
             "edad INT(3),"+
             "cargo VARCHAR(128),"+
             "departamento VARCHAR(256),"+
             "responsabilidades VARCHAR(256),"+
             "gmail VARCHAR(300),"+
             "twitter VARCHAR(50));";
         tx.executeSql(sql);

         //Insertamos valores
         sql = "INSERT INTO localDB(nombre,edad,cargo,departamento,responsabilidades,gmail,twitter,ultimos)"+
               "VALUES('Andrea Alfonso', '23', 'Profesora','Informatica','Encargada de departamento','andreaalfonsoo@gmail.com','andreaalfonsoo',0)";
         tx.executeSql(sql);

     },
     createDBError:function(err){
         console.log("Se ha producido un error en la creacion de la base de datos"+error.code);
     },
     createDBSucc:function(){
         console.log("Se ha generado la base de datos con exito");
         window.localStorage.setItem("existe_db",1);
         cargarDB.initialize();
     }
 };

 var app = {
     // Application Constructor
     initialize: function() {
         this.bindEvents();
     },
     // Bind Event Listeners
     //
     // Bind any events that are required on startup. Common events are:
     // 'load', 'deviceready', 'offline', and 'online'.
     bindEvents: function() {
         document.addEventListener('deviceready', this.onDeviceReady, false);
     },
     // deviceready Event Handler
     //
     // The scope of 'this' is the event. In order to call the 'receivedEvent'
     // function, we must explicitly call 'app.receivedEvent(...);'
     onDeviceReady: function() {
         app.receivedEvent('deviceready');
     },
     // Update DOM on a Received Event
     receivedEvent: function(id) {
         //Lanzaremos la configuración de la base de datos
         confDB.initialize();
     }
 };

 app.initialize();
