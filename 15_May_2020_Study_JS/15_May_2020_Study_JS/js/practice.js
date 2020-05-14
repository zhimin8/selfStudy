//부가적인 function
const body = document.querySelector(".bodyWrapper");

// API를 요청하는 메소드! -> 우리는 지금 자격증명이 필요한 비동기 방식을 할거야.
function requestAPI() {
    const URL = "https://dapi.kakao.com/v3/search/book";
    const target = "target=title";
    const query = "query='JAVA'"
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "KakaoAK 43455bc9b9cf4b496c09a1716c4afc01");

    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    const myRequest = new Request(`${URL}?${target}&${query}`, myInit);

    // 기본 함수
    //     fetch(myRequest).then(function(response) {
    //         return response.json();
    //     }).then(function(myJson) {
    //         const finalData = JSON.stringify(myJson);
    //         localStorage.setItem("myData", finalData); //string화 해서 저장해야 나중에 가져다 쓸수 있다 마!
    //         drawOnBody(finalData);
    //     });

    // 화살표함수 적용한것
    fetch(myRequest)
        .then(response => response.json())
        .then(json => {
            const finalData = JSON.stringify(myJson);
            localStorage.setItem("myData", finalData); //string화 해서 저장해야 나중에 가져다 쓸수 있다 마!
            drawOnBody(finalData);
        })



}

function drawOnBody(data) {
    //    body.innerHTML = data.document[0].price; //이렇게 key값으로 부르려면 못가져와.
    const finalJsonData = JSON.parse(data); //이렇게 Sringg화 된 것을 다시 json화 시켜줘야 불러올수 있다.
    for (var i = 0; i < finalJsonData.documents.length; i++) {
        body.innerHTML += finalJsonData.documents[i].title + "<br>";
    }

}

// 주기능을 하는 function()
function loadSearch() {
    const myData = localStorage.getItem("myData");

    if (myData === null) {
        //값이 없으면 api요청
        console.log("값 없어");
        requestAPI();
    } else {
        drawOnBody(myData);
        console.log("값 있어.");

    }
};

function init() {
    //   옛날버전
    var arr = [1, 2, 3];
    var pw = arr.map(function (x) {
        return x * 3;
    });

    console.log(pw);

    //   최근버전(화살표함수)
    const arr2 = [1, 2, 3];
    const pow2 = arr2.map((x) => x * 3);
    console.log(pow2);

    const student = {
        name: "bora",
        age: 22,
    };

    const student2 = {
        name: "jimin",
        age: 20,
    };

    function test() {
        console.log("test");
    }
    Object.prototype.sayHello = function () {
        console.log(`Hello, My name is ${this.name}. I am ${this.age} years old`);
    };
    sayHello();
    //   function sayHello() {
    //     console.log(`hello my name is ${this.name}, I am ${this.age} years old`);
    //   }
    student.sayHello();
    student2.sayHello();

    body.addEventListener("click", function (event) {
        console.log(event.target);
    });
    //   사용할수 있는 함수가 prototype에 들어간다.

    const date = new Date();
    const seconds = date.getSeconds();

    function getSeconds() {
        body.innerHTML = seconds;
    }
    setInterval(getSeconds, 1000);
}

function getSeconds() {
    const date = new Date();
    const seconds = date.getSeconds();
    body.innerHTML = `${seconds < 10 ? `0${seconds}` : seconds}`;
}


init();