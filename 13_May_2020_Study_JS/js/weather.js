const WEATHER_API_KEY = "57be06fda5c6bfe5e452532b63dd0999";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const sunriseContainer = document.querySelector(".js-weather .sunrise__text"),
    weatherContainer = document.querySelector(".js-weather .weather__text");


function getWeather(crd){
    const WEATHER_API_URL = `${WEATHER_API}lat=${crd.latitude}&lon=${crd.longitude}&appid=${WEATHER_API_KEY}&units=metric`;
    
    fetch(WEATHER_API_URL)
    .then(response=>response.json())
    .then(json=>{
        // 일출시간과 temp를 표기하자
        const currentTemp = json.main.temp;
        const myCountry = json.sys.country;

        const sunriseTime = new Date(json.sys.sunrise*1000);
        const sunriseHour = sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes();
        const sunrise = `${sunriseHour}시 ${sunriseMinutes}분`;

        // 타임스탬프 ( 1970/01/01 00:00:00 부터 지금까지 흐른 시간 )
        // // 현재 시간을 -> time스탬프로 (api에서 밀리세컨즈로 반환되기 때문에 우리는 이걸 고려해야하나다,)
        // const practiceTimestamp = new Date().getTime() / 1000; 
        // console.log(Math.floor(practiceTimestamp));
        
        weatherContainer.innerText = `현재기온 : ${currentTemp}`;
        sunriseContainer.innerText= `${myCountry}, sunrise : ${sunrise}`;

    }

        );
}

function getPosition(){

    function success(pos) {
        const crd = {
            latitude : pos.coords.latitude,
            longitude : pos.coords.longitude
        };

        console.log(crd);
      
        // console.log('Your current position is:');
        // console.log('Latitude : ' + crd.latitude);
        // console.log('Longitude: ' + crd.longitude);

        //위치 조회에 성공했으면 저장하자.
         localStorage.setItem("coords",JSON.stringify(crd));

        //날씨정보를 불러와야 ( 새로고침 중복없이 바로 실행가능 )


      };
      
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };
      
      navigator.geolocation.getCurrentPosition(success, error);
}


function loadWeather(){
    const myLocation = localStorage.getItem("coords");
    if(myLocation !== null){
        const parsedMyLocation = JSON.parse(myLocation);
        // 날씨정보를 불러와라
        getWeather(parsedMyLocation);
    } else{
        // 정보가 없으면 위치 조회부터 하자
        getPosition();
    }
    

}

// 최종적으로 실행할 init 함수(국룰)
function init(){
    // 현재 날씨 호출.
    loadWeather();

}
init();