const api={
    key: "bbf0318d8362b60a7684122124ab26cc",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}


const searchBar=document.getElementById('input-box');

searchBar.addEventListener('keypress', (e) => {
//    console.log('pooja')
    if(e.keyCode == 13){
        // console.log('po')
        console.log(searchBar.value);
        // console.log('oja')
        getWeatherReport(searchBar.value);
        document.querySelector('.location-details').style.display="block";
    }
});

function getWeatherReport(city){
    fetch(`${api.baseUrl}?q=${city}&appid=${api.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showweatherReport);
}

function showweatherReport(weather){
    console.log(weather);

    let city= document.getElementById('city');
    city.innerText =`${weather.name}, ${weather.sys.country}`;

    let temp=document.getElementById('temp');
    temp.innerHTML =`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    }
    else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }
    else if(weatherType.textContext == 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    else if(weatherType.textContent == 'Snow') { 
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";  
    } 
}

function dateManage(dateArg){

    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date =dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}