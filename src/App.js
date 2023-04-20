import { BrowserRouter } from "react-router-dom";
import WrapperRoutes from "./route";

function App() {
  // mang chua cac route do vao layout

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <WrapperRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
