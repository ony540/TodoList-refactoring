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

// 작업용
import Header from "../../layout/Header.js";
import { todoRegister } from "./TodoRegistApi.js";
import TodoList from "../list/TodoList.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// 할일 추가 기능 구현
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

  // DOM 구성
  const formEl = document.createElement("form");
  formEl.classList.add("regist-form");
  // 제목
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("regist-title-container");
  const titleEl = document.createElement("input");
  const titleLabel = document.createElement("label");
  titleEl.setAttribute("id", "regist-title");
  titleEl.setAttribute("maxlength", 20);
  titleEl.setAttribute("placeholder", "20자 이내");

  titleLabel.setAttribute("for", "regist-title");
  titleLabel.textContent = "TITLE";

  // 내용
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("regist-content-container");
  const contentEl = document.createElement("textArea");
  contentEl.classList.add("regist-content");
  const contentLabel = document.createElement("label");
  contentEl.setAttribute("id", "regist-content");
  contentLabel.setAttribute("for", "regist-content");
  contentLabel.textContent = "CONENT";
  contentEl.setAttribute("placeholder", "내용을 작성해주세요.");

  // 등록 버튼
  const createBtn = document.createElement("button");
  createBtn.classList.add("create-btn");
  createBtn.textContent = "ADD";

  titleContainer.append(titleLabel, titleEl);
  contentContainer.append(contentLabel, contentEl);
  formEl.append(titleContainer);
  formEl.appendChild(contentContainer);
  formEl.appendChild(createBtn);

  registPage.appendChild(Header("TODO 등록"));
  registPage.appendChild(formEl);

  // 기능 등록
  createBtn.addEventListener("click", handleSubmit);
  return registPage;
};

export default TodoRegist;
