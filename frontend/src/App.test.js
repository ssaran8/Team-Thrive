import App from './App';
import { createRoot } from 'react-dom/client';

// it() and test() mean the same thing, "it" just reads better in English
it('renders without crashing', () => {
  // Create a new div
  const div = document.createElement('div');
  
  // Todo: don't know why the below line isn't working - should use this instead of creating a new div
  //const div = document.getElementById('root');

  // Create a root
  const root = createRoot(div);

  // Render the App
  root.render(<App />);

});

// Resources:
// * https://reactjs.org/docs/testing-recipes.html
// * https://jestjs.io/docs/tutorial-react