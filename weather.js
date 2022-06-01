 'user strict'


        const weatherBlock = document.querySelector('#weather')
        console.log(weatherBlock)

        async function loadWeather() {
            weatherBlock.innerHTML = `
                <div class="weather__loading">
                    <img src = 'img/loading.svg' alt="loading...">
                </div>`

            const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Batumi&appid=4a6c403b7f0af56cb97eb02e4b911803'
            const response = await fetch(server,{
                method: 'GET',
            });

            const responseResult = await response.json();

            if(response.ok){
                
                getWeather(responseResult)


            } else {
                weatherBlock.innerHTML = responseResult.message;
            }


        }

        if(weatherBlock) {
            loadWeather(); 
        }

        function getWeather(data) {

            weatherBlock.innerHTML = '';

            console.log(data)
            const location = data.name;
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like)
            const weatherStatus = data.weather[0].main;
            const weatherIcon = data.weather[0].icon;
            const humidity = data.main.humidity;
            console.log(humidity)


            createWeatherMain(weatherBlock);
            createWeatheCity(location);
            createWeatheStatus(weatherStatus);
            createWeatherInfo(weatherBlock)
            createImageWeather(weatherIcon);
            createWeatherTemp(temp);
            createWeatherFeels(feelsLike);
            createWeatherHumidity(humidity)
;
        }

        function createWeatherMain(weatherBlock) {

            let weatherMain = document.createElement('div');
            weatherMain.className = 'weather__main';
            weatherBlock.append(weatherMain);

        }

        function createWeatheCity(location){

            let weatheCity = document.createElement('p');
            let weatherMain = document.querySelector('.weather__main');
          
            weatheCity.className = 'weather__city';
            weatheCity.innerHTML = location;
            weatherMain.append(weatheCity)

        }

        function createWeatheStatus(weatherStatus){

            let weatheStatus = document.createElement('p');
            let weatherMain = document.querySelector('.weather__main');

            weatheStatus.className ='weather__status';
            weatheStatus.innerHTML = weatherStatus;
            weatherMain.append(weatheStatus);

        }

        function createWeatherInfo(weatherBlock){

            let weatherInfo = document.createElement('div')
            weatherInfo.className = 'weather__info'
            weatherBlock.append(weatherInfo);

        }

        function createImageWeather(weatherIcon) {
            let imageWeather = document.createElement('img')
            let weatherInfo = document.querySelector('.weather__info')
            imageWeather.src = `https://api.openweathermap.org/img/w/${weatherIcon}.png`
            weatherInfo.append(imageWeather) 
        }

        function createWeatherTemp(temp) {
            let weatherTemp = document.createElement('p');
            let weatherInfo = document.querySelector('.weather__info')
            weatherTemp.className = 'weather__temp';
            weatherTemp.innerHTML = temp + '&#176' + 'C';
            weatherInfo.append(weatherTemp);

        }

        function createWeatherFeels(feelsLike) {
            let weatherFeels = document.createElement('p');
            let weatherMain = document.querySelector('.weather__main');

            weatherFeels.className = 'weather__fells';
            weatherFeels.innerHTML = 'Feels like: ' + feelsLike + '&#176' + 'C';
            weatherMain.append(weatherFeels);

        }

        function createWeatherHumidity(humidity) {

            let weatherHumidity = document.createElement('p');
            let weatherMain = document.querySelector('.weather__main');

            weatherHumidity.className = 'weather__humidity';
            weatherHumidity.innerHTML = 'Humidity: '+humidity + ' %';
            weatherMain.append(weatherHumidity);
        }
