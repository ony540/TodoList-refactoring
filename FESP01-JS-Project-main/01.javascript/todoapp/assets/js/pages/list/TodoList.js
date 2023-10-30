// 할일 목록
import Header from "../../layout/Header.js";
// import Footer from "../../layout/Footer.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";
import { getTodo, updateChecked } from "./TodoListApi.js";

// const $ = document.querySelector.bind(document);

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.setAttribute("id", "content");
  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    response.data?.items.reverse().forEach((item) => {
      const li = document.createElement("li");

      const todoInfoLink = document.createElement("a");
      const todoContent = document.createElement("div");
      const styleContainer = document.createElement("div");
      const btnContainer = document.createElement("div");
      const label = document.createElement("label");
      label.setAttribute("for", `checkbox-${item._id}`);

      btnContainer.classList.add("round");
      styleContainer.classList.add("title-content-container");

      const checkBox = document.createElement("input");
      checkBox.value = item.done ? item.done : false;
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("id", `checkbox-${item._id}`);

      btnContainer.appendChild(checkBox);
      btnContainer.appendChild(label);

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

      /**
       * ###CHECKBOX STATE
       * checkBox.setAttribute("checked", "")
       * checkBox.removeAttribute("checked", "")
       */
      if (checkBox.value === "true") {
        checkBox.setAttribute("checked", "");
      }

      li.append(styleContainer);

      /**
       * 1. 최초 호출시 item.done값을 통해 .
       */

      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);

      const title = document.createTextNode(item.title);
      todoInfoLink.appendChild(title);

      todoInfoLink.addEventListener("click", async function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        const infoPage = await TodoInfo({ _id: item._id });
        document.querySelector("#page").replaceWith(infoPage);
      });

      const getData = () => {
        return getTodo(item._id).then((i) => {
          const content = document.createTextNode(i);
          todoContent.appendChild(content);
          li.appendChild(todoContent);
          li.classList.add("todo-content");
          styleContainer.appendChild(todoInfoLink);
          styleContainer.appendChild(todoContent);
        });
      };
      getData();

      li.appendChild(todoInfoLink);
      li.appendChild(btnContainer);
      ul.appendChild(li);
    });
    content.appendChild(ul);

    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);

    content.appendChild(btnRegist);

    // EventListener
    btnRegist.addEventListener("click", () => {
      const registPage = TodoRegist();
      document.querySelector("#page").replaceWith(registPage);
    });
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    content.appendChild(error);
  }

  // page.appendChild(Header("TODO App 목록 조회"));
  page.appendChild(Header("TODO LIST"));

  page.appendChild(content);
  // page.appendChild(Footer()); // 필요하면 쓰세요ㅎ.

  return page;
};

export default TodoList;
