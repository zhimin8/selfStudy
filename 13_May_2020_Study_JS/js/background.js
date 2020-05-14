// const / var / let 변수의 차이점


// http의 url + 우리가 그려줄 html의 태그를 쿼리 셀렉터로 받아 변수로 쓸것임
// 1)영역잡기 : 두 개의 변수를 하나의 영역에 저장해줌.
const body = document.querySelector("body"),
    locationText = document.querySelector(".location_text");

const API_KEY = "_C9tI3s4P1Um2YJJQ7SP-fBF1P_ld2t1TaJNyFcZDB8";

const IMAGEURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&orientation=landscape&query=landscape`;

// 저장하는 기능을 하는 function :하나의 json 형태로 저장해보자
function saveBackground(url, city, country, name){

    //기존 값을 지워준다. 그래야 새로운 값을 저장하지!
    const savedImage = localStorage.getItem("background");
    if(savedImage !== null ){
        localStorage.removeItem("backgournd");
    }

   const expireDate = new Date();
   expireDate.setDate(expireDate.getDate()+1);

    //  json 형태로 저장 : json 선언
    const imageObject = {
        url : url,
        expireDate : expireDate,
        city : city,
        country : country,
        name : name
    };
    localStorage.setItem("background", JSON.stringify(imageObject)); //json으로 변환해서 저장을 해줘야함 (String화가 된다.)
     // 저장했으니깐 불러와야지!!!!
    loadBackground();
}

function getBackGround(){
    // API URL로 요청하고, 반환받아서, localStorage에 저장하고
    // then은 fetch() 가 완료되기를 막아주는 역할. then!
 
    // fetch(IMAGEURL) 
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(myJson) {
    //     // 우리가 사용할 key
    //     console.log(JSON.stringify(myJson.urls.full));
    // });

    fetch(IMAGEURL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if(image.urls && image.urls.full && image.location.city && image.location.country && image.location.name){
            //키 값통해 value를 받아오는 거야.
            const full = image.urls.full;
            const city = image.location.city;
            const country = image.location.country;
            const name = image.location.name;
            // 불러온 사진 url과, 도시이름과, 나라이름과, name을 localStorage에 저장
            saveBackground(full, city, country, name);
            } else {
                // 만약에 실패하면 다시 요청한다.
                getBackGround();
            }
        });
}

function loadBackground(){
    // 저장된 key값은 변경될 일이 없고, 다신 선언되지 않아야하므로 상수인 const로 선언
    const savedImage = localStorage.getItem("background");
    //현재 로컬스토리지에 저장된 값이 없기 때문에 value가 있고 없고로 분기를 나눈다
    if(savedImage === null ){
        // 없는 조건 -> 얻어오자 (fuction saveBackground)
        getBackGround();
    } else{
        // 있다면, 그려준다.
        // String화가 되면서 하나의 문자열로 인식이 되기 때문에-> 다시 json형식으로 만들어줘야 값을 꺼내 쓸 수 있다.
        const parsedImageObject = JSON.parse(savedImage);
       
    // 하루에 하나씩만 뜨게 하고 싶어 -> 오늘 날짜를 불러오고
    const today = new Date();
        if( today > parsedImageObject.expireDate ){
            // 유통기한을 오늘 날짜 +1 저장해놓고
            // 불러올 때 유통기한이 오늘보다 작다면 다시 요청
            getBackGround();
        } else {
            // 불러올 때 유통기한이 남았으면, 그냥 그 값 사용
            body.style.background=`url(${parsedImageObject.url})`;
            locationText.innerHTML = `${parsedImageObject.name}, ${parsedImageObject.city}, ${parsedImageObject.country}`
        }
    }

}

function init(){
    loadBackground();
    
}
init();