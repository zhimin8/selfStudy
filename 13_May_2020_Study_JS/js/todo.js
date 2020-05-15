const form = document.querySelector(".js-to-do"),
    input = document.querySelector(".js-add-to-do"),
    list = document.querySelector(".js-list");

function addToDo(inputValue){
    const toDo = document.createElement("li");
    toDo.className = "toDo";

    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = "❌";
    deleteBtn.className= "toDo__button";
    deleteBtn.addEventListener("click", clickDelete);

    const label = document.createElement("label");
    label.innerText = inputValue;

    // ul - li - label
    toDo.appendChild(label);
    toDo.appendChild(deleteBtn);
    list.appendChild(toDo);
}

function onSubmit(event){
    event.preventDefault(); //이벤트의 버블링을 막아줘서, 새로고침을 막는 것이야
    
    if(input.value === ""){
        // alert("엥? 아무것도 안썼는데?");
    } else {
        // 입력받은 텍스트를 할 일로 추가해줘
        addToDo(input.value);
        // 그 다음엔 input 공간을 다시 비워줘.
        input.value = "";
    }
    
}

function clickDelete(event){
    //  alert("삭제 눌렀네");
    

}

function loadToDos(){
    const loadToDos = localStorage.getItem("toDos");

    if(loadToDos !== null ){
        //  ul 태그 안에 그려줌

    } else {
        // 없으면 할 일이 없다고 ul태그안에 그려줘~
    }
}


function init(){
    // 저장된 할 일을 불러온다 (localStorage)
    loadToDos();
}
// 얘는 fucntion 안에 있으면, 특정 조건이 되어야만 호출이 되므로 function 밖에 작성한다.
// 그로므로, 변화가 있을때 마다 반응한다. 항상 귀를 열고 있는 오지라퍼.
// addEventListener(행동, 콜백함수(무명함수를 만들어서 alert를 띄워주는 것) )
form.addEventListener("submit", onSubmit); // submit이라는 행동이 일어날때만 반응할거야.


init();
