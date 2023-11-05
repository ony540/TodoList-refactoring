// 작업용
import Header from "../../layout/Header.js";
import { todoRegister } from "./TodoRegistApi.js";
import { linkTo } from "../../Router.ts";

const $ = document.querySelector.bind(document);
const handleSubmit = async (e) => {
  e.preventDefault();
  const titleInput = $("input").value;
  const contentInput = $("textarea").value;
  await todoRegister(titleInput, contentInput);
  linkTo("/");
};

const TodoRegist = function () {
  const registPage = document.createElement("div");
  registPage.setAttribute("id", "page");

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
  contentLabel.textContent = "CONTENT";
  contentEl.setAttribute("placeholder", "내용을 작성해주세요.");

  // 등록 버튼
  const createBtn = document.createElement("button");
  createBtn.classList.add("create-btn");
  createBtn.textContent = "ADD";

  titleContainer.append(titleLabel, titleEl);
  contentContainer.append(contentLabel, contentEl);
  formEl.append(titleContainer, contentContainer,createBtn);

  registPage.appendChild(Header("TODO 등록"));
  registPage.appendChild(formEl);

  // 기능 등록
  createBtn.addEventListener("click", handleSubmit);
  return registPage;
};

export default TodoRegist;
