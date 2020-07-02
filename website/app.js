/* Acquire API credentials from OpenWeatherMap website. 
Use your credentials and the base url to create global variables */
const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=3d6b60394e438c89dfe398a1c31ef7d9&units=imperial';

// Create a new date instance dynamically with JS
const d = new Date();
let userResponse;
const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
document.querySelector('#generate').addEventListener("click",performAction);

function performAction(e){                              
    const zipcode=document.getElementById("zip").value;
    userResponse = document.getElementById("feelings").value;
    const finalURL=baseURL+zipcode+apiKey;
    getWeatherData(finalURL)        //Step1: fetch() to make a GET request to the OpenWeatherMap API
    .then((postWeatherData)=>{      //Step2: send data to the server.js file using POST route '/myPostRoute'
        postData('http://localhost:3000/myPostRoute',{temperature:postWeatherData.main['temp'], date:newDate, userResponse: userResponse});
        })
    .then(updateUI)                 //Step3: Update UI receiving data from Server.
}

//Step1: fetch() to make a GET request to the OpenWeatherMap API
const getWeatherData = async(finalURL)=>{
    const request=await fetch(finalURL);
    try{
        const weatherData = await request.json(); 
        return weatherData;
        console.log(weatherData.main['temp']); //gets the temperature 
        }catch(error){
        console.log("Betty Error From GET:", error);
    }
}

//Step2: A function to post data to the POST route '/myPostRoute' in the server.js file
const postData = async(url='',data={})=>{
    const response = await fetch(url, {
        method: 'POST',                         
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json', 
        },      
        body: JSON.stringify(data), 
      });
    try{
            const postDataToServer = await response.json();
            return postDataToServer;
    }catch(error){
        console.log("Betty Error From POST:", error);
    }
}

//Step3: Update UI requesting data from Server.
const updateUI=async()=>{
    const request=await fetch('http://localhost:3000/myGetRoute')
    try{
            const dataFromServer=await request.json();
            document.getElementById('date').innerHTML="Date:"+dataFromServer.date;
            document.getElementById('temp').innerHTML="Temperature:"+dataFromServer.temp;
            document.getElementById('content').innerHTML="Feeling:"+dataFromServer.feeling;
    }catch(error){
        console.log(error);
    }
}
