//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = [];

var Key = 1;

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

//Listar todo
app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});

//Agregar Tarea
app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = Key++;
    tasks.push(req.body);
    res.send("OK");
    console.log(req.body);
});

//Buscar por ID
app.get('/tasks/:taskId', function(req, res){
    found = tasks.find(element => element.id == Number(req.params.taskId))
    if(found==null){
        res.send("Tarea no encontrado");
    }
    else{
        res.json(found)
    }
});

//Borrar Tarea
app.delete('/tasks/:taskId', function(req, res){
    res.send("taskId is set to: "+req.params.taskId);
    found = tasks.find(element => element.id == Number(req.params.taskId))
    if(found==null){

    }
    else{
        posicion = tasks.findIndex(element => element.id == Number(req.params.taskId));
        tasks.splice(posicion,1);
        console.log(found)
    }
});


//Editar Tarea
app.put('/tasks/:taskId', jsonParser, function(req, res){
    found = tasks.find(element => element.id == Number(req.params.taskId))
    if(found==null){

    }
    else{
        if(req.body.state==undefined){

        }else{
            found.state=req.body.state
        }
        if(req.body.title==undefined){

        }else{
            found.title=req.body.title
        }
        if(req.body.detail==undefined){

        }else{
            found.detail=req.body.detail
        }
    }
});
