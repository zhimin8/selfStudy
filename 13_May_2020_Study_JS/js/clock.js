const clockContainer = document.querySelector(".clock");
    clockText = clockContainer.querySelector(".clock_text");

    //현재시간을 알아내자
    function getTime(){
        const time = new Date();
        // hour
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        //문자열과 변수명을 결합 : 백틱
        const now = `${hours<10 ? `0${hours}` : hours } : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`; 

        clockText.innerHTML = now;
    }

function init(){
    getTime();
    setInterval(getTime,1000); //1초마다 한번씩 새로고침
}
init(); //즉시 실행 함수랑은 다르다. init 메소드 안에 순서를 컨트롤 할 수 있다. 나만의 signiture 함수