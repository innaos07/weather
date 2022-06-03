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

            searchInput.value = '';
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
            setInterval(()=>createClock(), 30000)

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
            // seconds.innerHTML = date.getSeconds();
            // if(seconds.innerHTML < 10){
            //     seconds.innerHTML = '0' + seconds.innerHTML; 
            // }
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
                weatherObj.city =  'Batumi'
                saveLocalStorage()
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
            const idWeather = data.weather[0].id;
            const humidity = data.main.humidity;

            createWeatherInfo();
            createImageWeather(weatherIcon);
            createWeatherTemp(temp);
            
            createWeatheCity(location);

            createWeatheStatus(weatherStatus, idWeather);
            
            createWeatherFeels(feelsLike);
            createWeatherHumidity(humidity);
        
        }

        function createWeatheCity(location){

            let weatheCity = document.createElement('div');
          
            weatheCity.className = 'weather__city';
            weatheCity.innerHTML = location;
            weatherBlock.append(weatheCity)

        }

        function createWeatherInfo(){

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

        function createWeatheStatus(status, id){

            let weatheStatus = document.createElement('p');

            weatheStatus.className ='weather__status';
            weatheStatus.innerHTML = status;
            weatheStatus.dataset.description = id;
            weatherBlock.append(weatheStatus);
            
            let idWeather  = weatheStatus.dataset.description;
            console.log('idWeather ',idWeather)
            setStatusImage(idWeather);

        }

        function setStatusImage(id){
              
            console.log(id)
            let weatherStatus = document.querySelector('.weather__status')

            if(id > 801 && id <= 804 ) {

                weatherStatus.classList.add('weather__status--cloudy');
                
            } else if(id == 800){

                weatherStatus.classList.add('weather__status--sunny');

            } else if(id == 801) {

                weatherStatus.classList.add('weather__status--few-cloudy')

            } else if ( (id >= 520 && id <= 531) || (id >= 300 && id <= 321)){

                weatherStatus.classList.add('weather__status--shower-rain');

            } else if (id >= 500 && id <=504){

                weatherStatus.classList.add('weather__status--rain-sunny');

            } else if(id >= 200 && id <= 232){

                weatherStatus.classList.add('weather__status--thunderstorm');

            } else if(id >= 600 && id <= 622){

                weatherStatus.classList.add('weather__status--snow');

            } else if(id >= 701 && id <= 781){

                weatherStatus.classList.add('weather__status--mist');
            }
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
            weatherHumidity.innerHTML = 'Humidity: '+humidity + ' %';
            weatherBlock.append(weatherHumidity);
        }
    }

document.addEventListener( 'DOMContentLoaded',onPageLoaded )