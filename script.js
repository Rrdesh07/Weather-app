
window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let temperatureSection=document.querySelector(".temperature");
    let temperatureSpan=document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
           
            function getIcon(icon) {
                switch (icon) {
                  case "01d":
                    return "CLEAR_DAY";
                  case "01n":
                    return "CLEAR_NIGHT";
                  case "02d":
                    return "PARTLY_CLOUDY_DAY";
                  case "02n":
                    return "PARTLY_CLOUDY_NIGHT";
                  case "03d":
                    return "CLOUDY";
                  case "03n":
                    return "CLOUDY";
                  case "04d":
                    return "CLOUDY";
                  case "04n":
                    return "CLOUDY";
                  case "09d":
                    return "RAIN";
                  case "09n":
                    return "RAIN";
                  case "10d":
                    return "RAIN";
                  case "10n":
                    return "RAIN";
                  case "11d":
                    return "WIND";
                  case "11n":
                    return "WIND";
                  case "13d":
                    return "SNOW";
                  case "13n":
                    return "SNOW";
                  case "50d":
                    return "FOG";
                  case "50n":
                    return "FOG";
                }
            }
    const proxy =`https://cors-anywhere.herokuapp.com/`;
    const api=`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=faa2830fd870dfd6e75225ff93f04c0f`;

    fetch(api)
        .then(response=>{
            return response.json();
        })
        .then (data=>{
            console.log(data);
            const {temp}= data.main;
            const {name}=data;
            const {description,icon}=data.weather[0];
            //set DOM Elements from the API
            temperatureDegree.textContent=parseFloat(temp - 273.15).toFixed(1);
            temperatureDescription.textContent=description;
            locationTimezone.textContent=name;
            // console.log(icon);

            //set icon
            // setIcons(icon,document.querySelector('.icon'));
             const skycons = new Skycons({color:"white"});
             const currentIcon = getIcon(icon);
             skycons.play();
             skycons.set("icon1",Skycons[currentIcon]);

            //temperature conversion
            temperatureSection.addEventListener('click',()=>{
                if(temperatureSpan.textContent==='F'){
                    temperatureSpan.textContent='C';
                    temperatureDegree.textContent = parseFloat(temp - 273.15).toFixed(1);
                }else{
                    temperatureSpan.textContent='F';
                    temperatureDegree.textContent = parseFloat(
                        ((temp - 273.15) * 9) / 5 + 32
                      ).toFixed(1);
                }
            });
        });
     });  
 }

});
