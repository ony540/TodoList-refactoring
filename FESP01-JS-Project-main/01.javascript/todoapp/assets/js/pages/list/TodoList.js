// // 할일 목록
import Header from "../../layout/Header.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";
import {
  getTodo,
  updateChecked,
  getTodoList,
  getTotalNum,
} from "./TodoListApi.js";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  const content = document.createElement("div");
  content.setAttribute("id", "content");

  let limit = 4;
  let todoListData = await getTodoList();
  let totalNum = await getTotalNum();

  const ul = document.createElement("ul");
  ul.setAttribute("class", "todolist");

  //---------
  const getListData = (limit) => {
    // 할일 목록 데이터
    todoListData?.splice(0, limit).forEach((item) => {
      /////// DOM 생성 ///////
      const li = document.createElement("li");
      const todoInfoLink = document.createElement("a");
      const todoContent = document.createElement("p");
      const styleContainer = document.createElement("div");
      const viewBtn = document.createElement("button");

      // 할일 제목
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      const title = document.createTextNode(item.title);
      todoInfoLink.appendChild(title);
      // 상세보기 버튼
      viewBtn.textContent = "VIEW";
      viewBtn.classList.add("view-btn");

      // 체크박스
      const checkBoxContainer = document.createElement("div");
      const label = document.createElement("label");
      label.setAttribute("for", `checkbox-${item._id}`);
      checkBoxContainer.classList.add("round");
      styleContainer.classList.add("title-content-container");

      const checkBox = document.createElement("input");
      checkBox.value = item.done ? item.done : false;
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("id", `checkbox-${item._id}`);

      checkBoxContainer.appendChild(checkBox);
      checkBoxContainer.appendChild(label);

      // 체크박스 기능 구현
      checkBox.addEventListener("click", (event) => {
        event.stopPropagation();

        if (event.target.hasAttribute("checked")) {
          event.target.setAttribute("checked", "");
          updateChecked(item._id, item.title, item.content, false);
          return;
        }
        event.target.removeAttribute("checked");
        updateChecked(item._id, item.title, item.content, true);
      });

      if (checkBox.value === "true") {
        checkBox.setAttribute("checked", "");
      }

      // 페이지 이동 버튼 기능 구현
      const handleMoveToDetail = (btn) => {
        btn.addEventListener("click", async (event) => {
          event.preventDefault();
          const infoPage = await TodoInfo({ _id: item._id });
          document.querySelector("#page").replaceWith(infoPage);
        });
      };
      handleMoveToDetail(todoInfoLink);
      handleMoveToDetail(viewBtn);

      // 본문 데이터 뿌리기 기능구현
      const getContentData = () => {
        return getTodo(item._id).then((i) => {
          const content = document.createTextNode(i);
          todoContent.appendChild(content);
          li.appendChild(todoContent);
          li.classList.add("todo-content");
          styleContainer.appendChild(todoInfoLink);
          styleContainer.appendChild(todoContent);
        });
      };
      getContentData();

      li.append(checkBoxContainer, styleContainer, viewBtn);
      ul.appendChild(li);
    });
  };
  getListData(limit);
  content.appendChild(ul);
  // ---------

  // 더보기버튼
  const viewMoreBtn = document.createElement("button");
  viewMoreBtn.textContent = "View More...";
  viewMoreBtn.classList.add("viewMore-btn");

  // 등록 버튼
  const btnRegist = document.createElement("button");
  const btnTitle = document.createTextNode("Add Todo");
  btnRegist.classList.add("regist-btn");

  btnRegist.appendChild(btnTitle);
  content.append(viewMoreBtn, btnRegist);

  // 더보기 버튼 기능구현
  viewMoreBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    limit += 4;
    getListData(limit);
    if (limit > totalNum) {
      viewMoreBtn.setAttribute("disabled", "");
    }
  });

  // 등록 버튼 기능구현
  btnRegist.addEventListener("click", () => {
    const registPage = TodoRegist();
    document.querySelector("#page").replaceWith(registPage);
  });

  page.appendChild(Header("TODO LIST"));
  page.appendChild(content);

  return page;
};

export default TodoList;
