//after page load we can get location
window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

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
      //shorthand way to pull out info from our response data
      const{ temperature, summary, icon } = data.currently;
      //set DOM Elements from the API
      temperatureDegree.textContent = temperature;
      temperatureDescription.textContent = summary;
      locationTimezone.textContent = data.timezone.replace(/_/g, " ");

      //formula for celsius
      let celsius = (temperature - 32) * (5 / 9);

      //set icon
      setIcons(icon, document.querySelector('.icon'));

      //convert temp
      temperatureSection.addEventListener('click', () =>{
        if(temperatureSpan.textContent === "F"){
          temperatureSpan.textContent = "C";
          temperatureDegree.textContent = Math.floor(celsius);
        } else {
          temperatureSpan.textContent = "F";
          temperatureDegree.textContent = temperature;
        }
      });
    });
    }); 
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});