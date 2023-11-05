import TodoList from "./pages/list/TodoList.js";
import TodoRegist from "./pages/regist/TodoRegist.js";
import TodoInfo from "./pages/info/TodoInfo.js";

async function NotFound(): Promise<HTMLElement> {
  const element = document.createElement('div');
  element.innerText = '404 Not Found';
  return element;
}


async function getPage(): Promise<HTMLElement>  {
  let page: HTMLElement | null = null;

  switch (location.pathname) {
    case "/":
      page = await TodoList();
      break;
    case "/regist":
      page = TodoRegist();
      break;
    case "/info":
      page = await TodoInfo({ _id: location.search.split("=")[1] });
      break;
      default:
        page = await NotFound();
        break;
  
      
  }
  if (!page) {
    throw new Error('Page not found');
  }

  return page;
}

async function render(): Promise<void> {
  const page = await getPage();
  const pageContainer = document.querySelector("#page");
  if (pageContainer) {
    pageContainer.replaceWith(page);
  } else {
    throw new Error("#page element not found");
  }
}


window.addEventListener("popstate", render);

export function linkTo(url: string):void {
  history.pushState({}, "todo", url);
  render();
}

const Router = async function (): Promise<HTMLElement> {
  return await getPage();
};

export default Router;
