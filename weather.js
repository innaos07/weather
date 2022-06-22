 'user strict'

    function onPageLoaded() {

        // console.log('loaded')
 
        const buttonSearch = document.querySelector('.btn__serch');
        const searchInput = document.querySelector('.weather__form--search');
        const weatherBlock = document.querySelector('#weather');

        const weatherObj = {};

        buttonSearch.addEventListener('click', onClickButtonSearch);

        function onClickButtonSearch(event) {

            event.preventDefault();

            let searchInput = document.querySelector('input[name="search"]');
            let valueSearch = searchInput.value.trim();
           
            if(!valueSearch) {
                weatherBlock.innerHTML = `<div class="weather__loading"><img src = 'img/loading.svg' alt="loading..."></div>`;
                return;
            }
            
            loadWeather(valueSearch);
            makeWeatherObj(valueSearch);
            saveLocalStorage();

            searchInput.value = '';
        }

        function createDate() {

            let date = new Date();
            let day = document.querySelector('#day');
            let month = document.querySelector('#mounth');
            let year = document.querySelector('#year');

            day.innerHTML = date.getDate();

            let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
            month.innerHTML = monthArray[date.getMonth()];
            year.innerHTML = date.getFullYear();
        }

        createDate();

        function clockStart() {

            createClock();
            setInterval(()=>createClock(), 30000);
        }

        clockStart();

        function createClock() {

            let date = new Date();
            
            let hours = document.querySelector('#hour');
            let minutes = document.querySelector('#minutes');
            let seconds = document.querySelector('#second');

            hour.innerHTML = date.getHours();

            if(hour.innerHTML < 10) {
                hour.innerHTML = '0' + hour.innerHTML; 
            }

            minutes.innerHTML = date.getMinutes();

            if(minutes.innerHTML < 10) {
                minutes.innerHTML = '0' + minutes.innerHTML; 
            }
        }

        function makeWeatherObj(valueSearch) {

            weatherObj.city =  valueSearch;
        }

        function saveLocalStorage() {

            localStorage['weather'] = JSON.stringify(weatherObj);
        }

        function loadTodoListElem() {
           
            if(localStorage['weather']) {
                weatherObj = JSON.parse(localStorage['weather']);
                renderWeatherWidget(weatherObj);
                
            } else {
                console.log('not localStorage');
                loadWeather(`Batumi`);
            }
        }

        loadTodoListElem();

        function renderWeatherWidget(weatherObj){
            
            loadWeather(weatherObj.city);
        }

        async function loadWeather(value) {

            weatherBlock.innerHTML = `<div class="weather__loading"><img src = 'img/loading.svg' alt="loading..."></div>`;

            const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${value}&lang=ru_en&appid=4a6c403b7f0af56cb97eb02e4b911803`;
            const response = await fetch(server,{
                method: 'GET',
            });

            const responseResult = await response.json();

            if(response.ok) {
                getWeather(responseResult);
            } else {
                weatherBlock.innerHTML = responseResult.message;
                weatherObj.city =  'Batumi';
                saveLocalStorage();
            }
        }

        function getWeather(data) {

            weatherBlock.innerHTML = '';
            // console.log(data)
            const location = data.name;
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like)
            const weatherStatus = data.weather[0].main;
            const idWeather = data.weather[0].id;
            const humidity = data.main.humidity;

            createWeatheCity(location);
            createWeatheStatus(weatherStatus);
            createImageWeather(idWeather);
            createWeatherInfo();

            createWeatherTemp(temp);

            createWeatherFeels(feelsLike);
            createWeatherHumidity(humidity);
        }

        function createWeatheCity(location){

            let weatheCity = document.createElement('div');
          
            weatheCity.className = 'weather__city';
            weatheCity.innerHTML = location;
            weatherBlock.append(weatheCity);
        }

        function createWeatherInfo(){

            let weatherInfo = document.createElement('div');
         
            weatherInfo.className = 'weather__info';
            weatherBlock.append(weatherInfo);
        }

        function createImageWeather(id) {

            let imageWeather = document.createElement('div');

            imageWeather.className = 'weather__image';
            imageWeather.dataset.description = id;
            weatherBlock.append(imageWeather);

            let idWeather  = imageWeather.dataset.description;
            setStatusImage(idWeather);
        }

        function setStatusImage(id){
              
            let weatherImage = document.querySelector('.weather__image');

            if(id > 801 && id <= 804 ) {
                weatherImage.classList.add('weather__image--cloudy');
            } else if(id == 800) {
                weatherImage.classList.add('weather__image--sunny');
            } else if(id == 801) {
                weatherImage.classList.add('weather__image--few-cloudy');
            } else if ( (id >= 520 && id <= 531) || (id >= 300 && id <= 321)){
                weatherImage.classList.add('weather__image--shower-rain');
            } else if (id >= 500 && id <=504) {
                weatherImage.classList.add('weather__image--rain-sunny');
            } else if(id >= 200 && id <= 232) {
                weatherImage.classList.add('weather__image--thunderstorm');
            } else if(id >= 600 && id <= 622) {
                weatherImage.classList.add('weather__image--snow');
            } else if(id >= 701 && id <= 781) {
                weatherImage.classList.add('weather__image--mist');
            }
        }

        function createWeatherTemp(temp) {

            let weatherTemp = document.createElement('p');
            let weatherInfo = document.querySelector('.weather__info');

            weatherTemp.className = 'weather__temp';
            weatherTemp.innerHTML = temp + '&#176' + 'C';
            weatherInfo.append(weatherTemp);
        }

        function createWeatheStatus(status){

            let weatheStatus = document.createElement('p');

            weatheStatus.className ='weather__status';
            weatheStatus.innerHTML = status;
            weatherBlock.append(weatheStatus);   
        }

        function createWeatherFeels(feelsLike) {

            let weatherFeels = document.createElement('p');

            weatherFeels.className = 'weather__fells';
            weatherFeels.innerHTML = 'Feels like: ' + feelsLike + '&#176' + 'C';
            weatherBlock.append(weatherFeels);
        }

        function createWeatherHumidity(humidity) {

            let weatherHumidity = document.createElement('p');

            weatherHumidity.className = 'weather__humidity';
            weatherHumidity.innerHTML = 'Humidity: ' + humidity + '%';
            weatherBlock.append(weatherHumidity);
        }
    }

document.addEventListener( 'DOMContentLoaded', onPageLoaded);