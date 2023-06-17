async function deleteMemo(event){
    const id = event.target.dataset.id;
    const res = await fetch(`/memos/${id}`,{
        method: "DELETE",
    });
    readMemo(); 
}


async function editMemo(event){
    const id = event.target.dataset.id;
    const editInput = prompt("수정할 값을 입력하세요~!");
    const res = await fetch(`/memos/${id}`,{
        method: "PUT", //PUT을 넣는 이유는 이전의 서버에 있던 데이터와 바꾸기 때문이다
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id,
            content: editInput, // prompt 실행시키면 입력값이 있을텐데 그 값이 prompt라는 것 자체에 저장이 되나 봅니다!
        }),
    });
    readMemo(); 
}

 // 화면에 보여주는거지욤! 
 function displayMemo(memo) {
    const ul = document.querySelector('#memo-ul');
    const li = document.createElement("li"); // html에 li 생성
    const editBtn = document.createElement("button"); // 버튼 생성
    li.innerText = `${memo.content}`;
    editBtn.innerText = "수정하기";
    editBtn.addEventListener("click", editMemo); // 버튼 클릭시 editMemo함수 실행
    editBtn.dataset.id = memo.id;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "삭제";
    delBtn.addEventListener("click", deleteMemo);
    delBtn.dataset.id = memo.id;

    ul.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
 }

 
// 서버에 저장되어 있는 memos들을 읽어온 후 
async function readMemo(){
    const res = await fetch("/memos"); //fetch는 기본적으로 get요청을 함 
    const jsonRes = await res.json();
    const ul = document.querySelector('#memo-ul');
    ul.innerHTML = "" ;
    jsonRes.forEach(displayMemo); 

}

//입력된 값을 서버 memo=[]에 전달하는거지 
async function createMemo(value){
    const res = await fetch("/memos",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id : new Date().getTime(),
            content: value,
        }),
    });
    const jsonRes = await res.json();
    readMemo();
}


function handleSubmit(event){
    event.preventDefault();
    const input = document.querySelector('#memo-input');
    createMemo(input.value);
    input.value=""; // 인풋 비우기

}

const form = document.querySelector('#memo-form');
form.addEventListener("submit", handleSubmit); 

readMemo();