import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { AppRedux } from "./app-redux";
import { store } from "./redux/app/store";
// import { AppContext } from "./app-context";
import "./assets/css/main.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <AppRedux />
  </Provider>
  // <AppContext />
);
