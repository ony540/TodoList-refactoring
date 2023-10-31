import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { deleteTodo } from "./TodoInfoApi.js";
import { updateTodo } from "../update/TodoUpdate.js";
import { converter } from "../../utils/utils.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  let response;
  const dataBox = document.createElement("div");
  dataBox.classList.add("todo-detail-container");

  let deleteButton;
  let updateButton;

  try {
    response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);

    const { item } = response.data;
    const { content, createdAt, done, title, updatedAt } = item;

    const titleBox = document.createElement("h2");
    const contentBox = document.createElement("p");
    const btnsBox = document.createElement("div");
    const patchBox = document.createElement("div");

    const label = document.createElement("label");

    const doneBox = document.createElement("div");
    const dateBox = document.createElement("div");

    label.setAttribute("for", `checkbox-${_id}`);
    
    deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    updateButton = document.createElement("button");
    patchBox.className = 'patchBox'
    updateButton.className = "update-button"; // 클래스 추가
    deleteButton.className = "delete-button";
    btnsBox.className = 'btns-box'

    const checkBox = document.createElement("input");
    checkBox.value = done ? done : false;
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", `checkbox-${_id}`);

    
    btnsBox.append(updateButton, deleteButton);
    patchBox.append(doneBox, dateBox)
    titleBox.append(title);
    contentBox.append(content);

    // doneBox.append(`완료여부: ${done}`);
    doneBox.append(checkBox, label);
    doneBox.classList.add("round");



    dateBox.append(`작성: ${converter(createdAt)}`);
    dateBox.append(`수정: ${converter(updatedAt)}`);
    deleteButton.append("DELETE");
    updateButton.append("EDIT");

    dataBox.append(patchBox, titleBox, contentBox, btnsBox);
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    dataBox.appendChild(error);
  }

  page.appendChild(Header("TODO"));
  page.appendChild(dataBox);
  page.appendChild(Footer());

  // deleteButton와 updateButton에 이벤트 리스너를 할당
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await deleteTodo({ _id });
  });

  // updateButton 이벤트 리스너 추가
  updateButton.addEventListener("click", () => {
    if (updateButton.innerText === "EDIT") {
      // "수정일까요?" 버튼을 눌렀을 때
      const titleBox = document.querySelector("h2");
      const contentBox = document.querySelector("p");

      // 현재 제목과 내용을 가져옵니다.
      const titleText = titleBox.textContent;
      const contentText = contentBox.textContent;

      // 입력 폼으로 변경
      titleBox.innerHTML = `<input type="text" id="titleInput" value="${titleText}">`;
      contentBox.innerHTML = `<textarea id="contentInput" maxlength="600">${contentText}</textarea>`;

      
      
      // const test = document.createElement('input')
      // const test2 = document.createElement('div')
      
      // titleBox.replaceWith(test)
      // contentBox.replaceWith(test2)


      



      

      
      // "저장하기" 버튼으로 변경
      updateButton.innerText = "UPDATE";
    } else if (updateButton.innerText === "UPDATE") {
      // "저장하기" 버튼을 눌렀을 때
      const updatedTitle = document.getElementById("titleInput").value;
      const updatedContent = document.getElementById("contentInput").value;

      // 서버로 수정된 데이터를 전송
      updateTodo({ _id, title: updatedTitle, content: updatedContent });

      // 버튼 텍스트는 변경하지 않음
    }
  });

  return page;
};

export default TodoInfo;


/**
 * 1. 최상위 컨테이너 생성 => flx-col정렬 
 * 2. doenBox, dateBox 존재 => 상위 div로 통합
 */