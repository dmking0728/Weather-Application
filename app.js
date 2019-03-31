//after page load we can get location
window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //workaround for making a get request from localhost. usually cant do this wehn wroking with localhost
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/e69b2a372009fdc543b502398d058b81/${lat},${long}`;

      //make get request of info from the api url
    fetch(api)
    //once data arrives THEN do somethign with data can be named anything not response 
    .then(response =>{
      return response.json();
    })
    .then(data => {
      console.log(data);
      //shorthand way to pull out info from our response data
      const{ temperature, summary } = data.currently;
      //set DOM Elements from the API
      temperatureDegree.textContent = temperature;
    });
    });
  }
});