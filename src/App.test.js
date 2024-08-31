import MainApp from "./App";
import {render, unmountComponentAtNode} from "react-dom";


test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MainApp />, div);
  unmountComponentAtNode(div);
});
