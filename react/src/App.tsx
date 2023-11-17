import './App.css';
import Router from './pages/Router';
import { Provider as MyProvider } from 'react-redux';
import { store } from './store/store';

function App() {
  // const store = useStore();
  return (
    <>
      <MyProvider store={store}>
        <Router />
      </MyProvider>
    </>
  );
}

export default App;
