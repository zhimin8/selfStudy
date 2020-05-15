const nameContainer = document.querySelector(".js-name");

function drawName(name){
    nameContainer.innerHTML = "";
    const drawName = document.createElement("span");
    drawName.className = "name_text";
    drawName.innerHTML = `Hello ! ${name} !`;
    nameContainer.appendChild(drawName);

}

 
// 콜백함수를 밖으로 빼서 관리하는 게 좋음
function handleSubmit(event){
    event.preventDefault(); //이벤트버블링의 외출금지화. refresh 못하게 하는것.
    const form = event.target; // target : 현재 이벤트가 일어나는 장소
    const input = form.querySelector("input");
    const name = input.value;
    localStorage.setItem("username", name);
    drawName(name);

}

function drawInput(){
    const input = document.createElement("input"); //input태그 요소를 만들어
    // input의 요소를 저장해줘
    input.type = "text";
    input.className = "input_name";
    input.placeholder = "Type your name here!";
    
    const form = document.createElement("form");

    form.addEventListener("submit", handleSubmit);
    form.appendChild(input); // form에 input이 붙음 
    nameContainer.appendChild(form); // div에 form이 붙음
}

function checkName(){
    //너 로컬스토리지에 이름이 등록되어 잇니? 확인하자 key값 (string)으로 가져와
    const name = localStorage.getItem("username");
    if(name === null ){
        // 처음 온 사람
        // 이름을 물어보고
        drawInput();
        // username이라는 키값으로 받은 이름을 저장하고
        // innerHTML로 그 이름을 보여준다
    } else{
        // 왔던 사람
        drawName(name);
        // username 키값으로 저장된 이름을 가져와서 innerHTML로 보여준다.
    }
}

function init(){
    checkName();
}
init();