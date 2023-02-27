import { BrowserRouter } from "react-router-dom";
import WrapperRoutes from "./route";

function App() {
  // mang chua cac route do vao layout

  return (
    <BrowserRouter>
      <div>
        <WrapperRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
