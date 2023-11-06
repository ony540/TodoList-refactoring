import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { deleteTodo } from "./TodoInfoApi";
import { updateTodo } from "../update/TodoUpdate";
import { converter } from "../../utils/utils";
import { updateChecked } from "../list/TodoListApi";
import { linkTo } from "../../Router";
import axios from "axios";

const TodoInfo = async function ({ _id }: { _id?: string | number } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  let response;
  const dataBox = document.createElement("div");
  dataBox.classList.add("todo-detail-container");

  let deleteButton: HTMLButtonElement = document.createElement("button");
  let updateButton: HTMLButtonElement = document.createElement("button");

  try {
    response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);

    const { item } = response.data;
    const { content, createdAt, done, title, updatedAt } = item;

    const titleBox = document.createElement("h2");
    const contentBox = document.createElement("p");
    const btnsBox = document.createElement("div");
    const patchBox = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", `checkbox-${_id}`);

    const doneBox = document.createElement("div");
    const dateBox = document.createElement("div");


    deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    updateButton = document.createElement("button");
    patchBox.className = "patchBox";
    updateButton.className = "update-button";
    deleteButton.className = "delete-button";
    btnsBox.className = "btns-box";

    const checkBox = document.createElement("input");
    checkBox.value = done ? done : false;
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", `checkbox-${_id}`);
    btnsBox.append(updateButton, deleteButton);
    patchBox.append(doneBox, dateBox);
    titleBox.append(title);
    contentBox.append(content);

    // doneBox.append(`완료여부: ${done}`);
    doneBox.append(checkBox, label);
    doneBox.classList.add("round");

    const br = document.createElement("span");
    br.innerHTML = "<br/>";

    dateBox.append(`작성 : ${converter(createdAt)}`);
    dateBox.appendChild(br);
    dateBox.append(`수정 : ${converter(updatedAt)}`);
    deleteButton.append("DELETE");
    updateButton.append("EDIT");

    dataBox.append(patchBox, titleBox, contentBox, btnsBox);

    // 체크박스 기능 구현
    checkBox.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target.hasAttribute("checked")) {
        target.setAttribute("checked", "");
        updateChecked(item._id, item.title, item.content, false);
        return;
      }
      target.removeAttribute("checked");
      updateChecked(item._id, item.title, item.content, true);
    });
    if (checkBox.value === "true") {
      checkBox.setAttribute("checked", "");
    }
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    dataBox.appendChild(error);
  }

  page.appendChild(Header("TODO Detail"));
  page.appendChild(dataBox);
  page.appendChild(Footer());

  // deleteButton와 updateButton에 이벤트 리스너를 할당
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const res = confirm("정말 삭제하시겠습니까?");
    if (res) {
      await deleteTodo({ _id });
      // 삭제후 리스트 페이지로 이동
      await linkTo("/");
    }
  });

  // updateButton 이벤트 리스너 추가
  updateButton.addEventListener("click", () => {
    if (updateButton.innerText === "EDIT") {
      // "수정일까요?" 버튼을 눌렀을 때
      const titleBox = document.querySelector("h2");
      const contentBox = document.querySelector("p");

      // 현재 제목과 내용을 가져옵니다.
      const titleText = titleBox!.textContent;
      const contentText = contentBox!.textContent;

      // 입력 폼으로 변경
      titleBox!.innerHTML = `
      <label>TITLE</label>
      <input type="text" id="titleInput" value="${titleText}">
      `;
      contentBox!.innerHTML = `
      <label>CONTENT</label>
      <textarea id="contentInput" maxlength="600">${contentText}</textarea>`;

      // "저장하기" 버튼으로 변경
      updateButton.innerText = "UPDATE";
    } else if (updateButton.innerText === "UPDATE") {
      // "저장하기" 버튼을 눌렀을 때
      const updateTitleInput = document.getElementById("titleInput")as HTMLInputElement
      const updateContentInput = document.getElementById("contentInput")as HTMLInputElement
      
      const updatedTitle = updateTitleInput.value;
      const updatedContent = updateContentInput.value;

      // 서버로 수정된 데이터를 전송
      updateTodo({ _id: _id as string, title: updatedTitle, content: updatedContent });

      // 버튼 텍스트는 변경하지 않음
    }
  });

  return page;
};

export default TodoInfo;