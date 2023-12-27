
import App from './App';
import { createRoot } from 'react-dom/client';
import './index.css';

const root = document.getElementById('root');

const render = (Component) => {
  createRoot(root).render(<Component />);
};

render(App);