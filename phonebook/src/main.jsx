
import App from './App'
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

const render = (Component) => {
  createRoot(root).render(<Component />);
};

render(App);