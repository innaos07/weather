 'user strict'

    function onPageLoaded() {
        console.log('loaded')
 
        let buttonSearch = document.querySelector('.btn__serch')
        let searchInput = document.querySelector('.weather__form--search')
        const weatherBlock = document.querySelector('#weather')

        let weatherObj = {
            
        }

        buttonSearch.addEventListener('click', onClickButtonSearch)


         function onClickButtonSearch(event) {
            event.preventDefault()
            console.log('click search')

            let searchInput = document.querySelector('input[name="search"]')
            console.log(searchInput)

            let valueSearch = searchInput.value.trim();
            console.log(valueSearch)

           
            if(!valueSearch){

                weatherBlock.innerHTML = `
                <div class="weather__loading">
                    <img src = 'img/loading.svg' alt="loading...">
                </div>`
                return

            }
            
            loadWeather(valueSearch);
            makeWeatherObj(valueSearch);
            saveLocalStorage();

            valueSearch = '';

        }


        function makeWeatherObj(valueSearch) {
        
            weatherObj.city =  valueSearch;
            console.log(weatherObj)

        }

        function saveLocalStorage() {

            localStorage['weather'] = JSON.stringify(weatherObj);

        }

        function loadTodoListElem() {
           
            if(localStorage['weather']){
                console.log('yes localStorage');
                weatherObj = JSON.parse(localStorage['weather']);
                renderWeatherWidget(weatherObj)
                
            } else {
                console.log('not localStorage')
                loadWeather(`Batumi`)
            }
        }
        loadTodoListElem()

        function renderWeatherWidget(weatherObj){
            console.log('render' ,weatherObj.city)
            loadWeather(weatherObj.city)
        }

        async function loadWeather(value) {
            weatherBlock.innerHTML = `
                <div class="weather__loading">
                    <img src = 'img/loading.svg' alt="loading...">
                </div>`

            const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${value}&lang=ru_en&appid=4a6c403b7f0af56cb97eb02e4b911803`
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

        function getWeather(data) {

            weatherBlock.innerHTML = '';

            console.log(data)
            const location = data.name;
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like)
            const weatherStatus = data.weather[0].main;
            const weatherIcon = data.weather[0].icon;
            const humidity = data.main.humidity;


          
            
           

            createWeatherMain(weatherBlock);
            // createWatch()
            createWeatheCity(location);
           
            createWeatheStatus(weatherStatus);
            createWeatherInfo(weatherBlock)
            createImageWeather(weatherIcon);
            createWeatherTemp(temp);
            createWeatherFeels(feelsLike);
            createWeatherHumidity(humidity);

            



        }

        // function createClock() {
        //     let date = new Date()
        //     console.log(date)

        //     let hour = document.querySelector('#hour')
        //     console.log(hour)
        //     let minutes = document.querySelector('#minutes')
        //     let second = document.querySelector('#second')

        //       hour.innerHTML = date.getHours() +':';
        //       console.log(hour)
        //     // if(hour.innerHTML < 10){
        //     //     hour.innerHTML = '0' + hour.innerHTML +':'; 
        //     // }
        //       minutes.innerHTML = date.getMinutes() + ':';
        //     // if(minutes.innerHTML < 10){
        //     //     minutes.innerHTML = '0' + minutes.innerHTML  + ':'; 
        //     // }
        //       hour.innerHTML = date.getSeconds();
        //     // if(hour.innerHTML < 10){
        //     //     hour.innerHTML = '0' + hour.innerHTML; 
        //     // }
        // }

        // function createWatch(){
        //     let watch = document.createElement('div');
        //     let weatherMain = document.querySelector('.weather__main');
        //     watch.className = "weather__watch"
        //     weatherMain.append(watch)
        //     console.log(watch)

        //     let hour = document.createElement('span')
        //     hour.id = 'hour'
        //     watch.append(hour);
        //     let minutes = document.createElement('span')
        //     minutes.id = "minutes"
        //     watch.append(minutes)
        //     let second = document.createElement('span')
        //     second.id = "second"
        //     watch.append(second);
        //     createClock()
           
           
        
        // }


        function createWeatherMain(weatherBlock) {

            let weatherMain = document.createElement('div');
            weatherMain.className = 'weather__main';
            weatherBlock.append(weatherMain);

        }


        function createWeatheCity(location){

            let weatheCity = document.createElement('div');
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
    }

document.addEventListener( 'DOMContentLoaded',onPageLoaded )