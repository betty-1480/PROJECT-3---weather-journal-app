// Setup empty JS object to act as endpoint for all routes
//projectData = new Array();
projectData={};
// Require Express to run server and routes
const express=require('express');
const app=express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

const server=app.listen(port,listening);
function listening(){
    console.log(`running on localhost:${port}`);
};

/*Routes are the first parameter in the get and post methods and tkae string value.
Note: You use these exact same  route names in client side also.
GET route name : localhost:3000/myGetRoute
POST route name: localhost:3000/myPostRoute
*/

/*Step 2a: 
Add a GET route that returns the <---projectData object in your server code*/
app.get('/myGetRoute',getData);
function getData(req,res){
    console.log("I'm from here:")
    console.log(projectData);
    res.send(projectData);
}

/*Step 2b: Add a POST route
that adds incoming data to --->projectData.
The POST route should receive three pieces of data from the request body:temperature, date, user response
Make sure your POST route is setup to add each of these values with a key to projectData.*/
app.post('/myPostRoute',callBack);
function callBack(req,res){
    const dataFromClient={temp:req.body.temperature,date:req.body.date,feeling:req.body.userResponse};
    //projectData.push(dataFromClient);
    projectData = dataFromClient;
}