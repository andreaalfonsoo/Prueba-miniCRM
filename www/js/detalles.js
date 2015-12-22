var id="";
var nombre="";
var edad=0;
var cargo="";
var departamento="";
var responsabilidades="";
var gmail="";
var twitter="";
var ultimos="";
var db="";

//Paso 5 detalles

var detalle = {
    initialize: function(){
        //generamos el conector
        db = window.openDatabase("localDB","1.0","Base de datos mini CRM",2*1024*1024);
        this.createDB();
    },
    createDB:function(){
        console.log("Cargar la base de datos");
        //transaccion
        db.transaction(this.mostrarDB,this.mostrarDBError);
    },
    mostrarDB:function(tx){
        id=window.localStorage.getItem("idusuario");
        var sql="SELECT * FROM localDB where id = '"+id+"';";
        console.log("Lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            function(tx,result){
                console.log("Se ha producido la consulta con exito");

                if(result.rows.length>0){
                    for(var i=0;i<result.rows.length;i++){
                        var fila=result.rows.item(i);
                        nombre=fila.nombre;
                        edad=fila.edad;
                        cargo=fila.cargo;
                        departamento=fila.departamento;
                        responsabilidades=fila.responsabilidades;
                        gmail=fila.gmail;
                        twitter=fila.twitter;
                        ultimos=fila.ultimos;

                        $("#nombre").append(nombre);
                        $("#edad").append(edad);
                        $("#cargo").append(cargo);
                        $("#departamento").append(departamento);
                        $("#responsabilidades").append(responsabilidades);
                        $("#gmail").append(gmail);
                        $("#twitter").append(twitter);
                        $("#ultimos").append(ultimos);

                        //Paso 5 compruebo en el monitor que funciona
                        console.log("caracteristico");
                     }
                }

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
detalle.initialize();
