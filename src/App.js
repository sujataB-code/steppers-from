
import './App.css';
import Stepper from './components/stepper';

import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <Stepper />
      </Provider>
    </>
  );
}

export default App;
