const WEATHER_APIKEY = '73ed3971275436ae770f875b70207e7d'; //chulboong key
const COORDS = 'coords';

function showWeather(temperature, place, feels_like, windspeed, temp_max, temp_min, humidity){
    const weather = document.querySelector('.js-weather');
    weather.innerText = `풍속 : ${windspeed}m/s 습도: ${humidity}%
     최고 기온 : ${temp_max}°C 최저 기온 : ${temp_min}°C 체감 온도 : ${feels_like}°C



     현재 온도 : ${temperature}°C
@${place}`;
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log(`당신의 위치를 모르겠습니다!`);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_APIKEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) { //추후에 출력 내용 추가 예정 일단은 세개
        const temperature = json.main.temp;
				const feels_like = json.main.feels_like;
        const description = json.weather.description;
				const temp_max = json.main.temp_max;
				const temp_min = json.main.temp_min;
				const pressure = json.main.pressure;
				const humidity = json.main.humidity;
				const windspeed = json.wind.speed;
				const winddeg = json.wind.deg;
        const place = json.name;

        showWeather(temperature, place, feels_like, windspeed, temp_max, temp_min, humidity)
    });

}

function init() {
    loadCoords();
}

init();
