import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const deleteTodo = async function ({ _id } = {}) {
  try {
    await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    alert("정말 삭제하시겠습니까?");
  } catch (err) {
    console.error("삭제 오류 발생", err);
  }
};

// api 분리하기
const updateTodo = async function ({ _id, title, content } = {}) {
  try {
    // 서버로 수정된 데이터를 PATCH 요청으로 전송
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title,
      content,
    });

    alert("수정이 완료되었습니다.");

    // 수정 완료 후, h2와 p태그로 다시 변환
    const titleBox = document.querySelector("h2");
    const contentBox = document.querySelector("p");

    const updatedTitle = document.getElementById("titleInput").value;
    const updatedContent = document.getElementById("contentInput").value;

    titleBox.textContent = updatedTitle;
    contentBox.textContent = updatedContent;

    // 버튼 텍스트를 "Edit"로 변경
    const updateButton = document.querySelector(".update-button");
    updateButton.innerText = "Edit";
  } catch (err) {
    console.error("수정 오류 발생", err);
  }
};

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  let response;
  const dataBox = document.createElement("div");

  let deleteButton;
  let updateButton;

  try {
    response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);

    const { item } = response.data;
    const { content, createdAt, done, title, updatedAt } = item;

    const titleBox = document.createElement("h2");
    const contentBox = document.createElement("p");
    const doneBox = document.createElement("div");
    const dateBox = document.createElement("span");
    deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    updateButton = document.createElement("button");
    updateButton.className = "update-button"; // 클래스 추가

    titleBox.append(title);
    contentBox.append(content);
    doneBox.append(`완료여부: ${done}`);
    dateBox.append(`createdAt: ${createdAt} / updatedAt: ${updatedAt}`);
    deleteButton.append("Delete");
    updateButton.append("Edit");

    dataBox.append(titleBox, contentBox, doneBox, dateBox, deleteButton, updateButton);
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    dataBox.appendChild(error);
  }

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(dataBox);
  page.appendChild(Footer());

  // deleteButton와 updateButton에 이벤트 리스너를 할당
  deleteButton.addEventListener("click", async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteTodo({ _id });
    }
  });

  // updateButton 이벤트 리스너 추가
  updateButton.addEventListener("click", () => {
    if (updateButton.innerText === "Edit") {
      // "수정일까요?" 버튼을 눌렀을 때
      const titleBox = document.querySelector("h2");
      const contentBox = document.querySelector("p");

      // 현재 제목과 내용을 가져옵니다.
      const titleText = titleBox.textContent;
      const contentText = contentBox.textContent;

      // 입력 폼으로 변경
      titleBox.innerHTML = `<input type="text" id="titleInput" value="${titleText}">`;
      contentBox.innerHTML = `<textarea id="contentInput">${contentText}</textarea>`;

      // "저장하기" 버튼으로 변경
      updateButton.innerText = "Update";
    } else if (updateButton.innerText === "Update") {
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