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

        function createDate() {
            let date = new Date()
            let day = document.querySelector('#day')
            let month = document.querySelector('#mounth')
            let year = document.querySelector('#year')

            day.innerHTML = date.getDate();

            let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
            month.innerHTML = monthArray[date.getMonth()];
            year.innerHTML = date.getFullYear();
        }
        createDate() 


        function clockStart() {
            createClock()
            setInterval(()=>createClock(), 1000)

        }
        clockStart()

        function createClock() {
            let date = new Date()
            

            let hours = document.querySelector('#hour')
            let minutes = document.querySelector('#minutes')
            let seconds = document.querySelector('#second')

            hour.innerHTML = date.getHours() ;
            if(hour.innerHTML < 10){
                hour.innerHTML = '0' + hour.innerHTML; 
            }
            minutes.innerHTML = date.getMinutes();
            if(minutes.innerHTML < 10){
                minutes.innerHTML = '0' + minutes.innerHTML; 
            }
            seconds.innerHTML = date.getSeconds();
            if(seconds.innerHTML < 10){
                seconds.innerHTML = '0' + seconds.innerHTML; 
            }
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