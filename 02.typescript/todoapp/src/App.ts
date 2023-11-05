import Router from './Router.ts';

const App = async function(){
  const content = document.createElement('div');
  content.setAttribute('id', 'app');
  content.appendChild(await Router());
  return content;
};

export default App;