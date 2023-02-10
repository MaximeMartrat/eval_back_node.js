const app = require('./app');
const port = 3200;

app.listen(port, ()=>{
    console.log('L\'application est sur le port ' + port)
})