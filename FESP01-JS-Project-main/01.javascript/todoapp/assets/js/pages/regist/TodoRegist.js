// 할일 등록
// import Header from '../../layout/Header.js';
// import Footer from '../../layout/Footer.js';

// const TodoRegist = function(){
//   const page = document.createElement('div');
//   page.setAttribute('id', 'page');

//   const content = document.createElement('div');
//   const text = document.createTextNode('등록 화면');
//   content.appendChild(text);

//   page.appendChild(Header('TODO App 등록'));
//   page.appendChild(content);
//   page.appendChild(Footer());

//   return page;
// };

// export default TodoRegist;

// 작업용
// import Header from "../../layout/Header.js";
// import Footer from "../../layout/Footer.js";
// import { todoRegister } from "./TodoRegistAPI.js";

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const titleInput = $("input");
//   const contentInput = $("textarea");
//   todoRegister(titleInput.value, contentInput.value);
// };

// const TodoRegist = function () {
//   const page = document.createElement("div");
//   page.setAttribute("id", "page");

//   const formEl = document.createElement("form");
//   const titleContainer = document.createElement("div");
//   const contentContainer = document.createElement("div");
//   const createBtn = document.createElement("button");
//   const titleEl = document.createElement("input");
//   const contentEl = document.createElement("textArea");
//   createBtn.textContent = "등록";

//   createBtn.addEventListener("click", handleSubmit);

//   titleContainer.append(titleEl);
//   contentContainer.append(contentEl);
//   formEl.append(titleContainer);
//   formEl.appendChild(contentContainer);
//   formEl.appendChild(createBtn);

//   const content = document.createElement("div");
//   const text = document.createTextNode("등록 화면");
//   content.appendChild(text);

//   page.appendChild(Header("TODO App 등록"));
//   page.appendChild(content);
//   page.appendChild(Footer());

//   page.appendChild(formEl);

//   console.log(document.getElementById("page"));
//   return page;
// };

// export default TodoRegist;

import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { todoRegister } from "./TodoRegistApi.js";
import TodoList from "../list/TodoList.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const handleSubmit = async (e) => {
  e.preventDefault();
  const titleInput = $("input").value;
  const contentInput = $("textarea").value;
  await todoRegister(titleInput, contentInput);

  $("#registPage").replaceWith(await TodoList());
};

const TodoRegist = function () {
  const registPage = document.createElement("div");
  registPage.setAttribute("id", "registPage");

  const formEl = document.createElement("form");
  const titleContainer = document.createElement("div");
  const contentContainer = document.createElement("div");
  const createBtn = document.createElement("button");
  const titleEl = document.createElement("input");
  const contentEl = document.createElement("textArea");
  createBtn.textContent = "등록";

  createBtn.addEventListener("click", handleSubmit);

  titleContainer.append(titleEl);
  contentContainer.append(contentEl);
  formEl.append(titleContainer);
  formEl.appendChild(contentContainer);
  formEl.appendChild(createBtn);

  const content = document.createElement("div");
  const text = document.createTextNode("등록 화면");
  content.appendChild(text);

  registPage.appendChild(Header("TODO App 등록"));
  registPage.appendChild(content);
  registPage.appendChild(Footer());

  registPage.appendChild(formEl);

  return registPage;
};

export default TodoRegist;
