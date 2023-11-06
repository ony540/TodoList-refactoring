// 할일 수정
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  content: string;
}

export const updateTodo = async function ({ _id, title, content }: Todo = {}): Promise<void> {
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
    updateButton.innerText = "EDIT";
  } catch (err) {
    console.error("수정 오류 발생", err);
  }
};
