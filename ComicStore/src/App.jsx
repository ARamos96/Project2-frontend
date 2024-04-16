import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import ComicsPage from "./pages/ComicsPage";
import PublishersPage from "./pages/PublishersPage";
import MyArea from "./pages/MyPage";
import Menubar from "./components/Menubar"


function App() {
  return (

    <div className="App">
      
      <Menubar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/publishers" element={<PublishersPage />} />
        <Route path="/myarea" element={<MyArea />} />
        <Route path="*" element="Page not found" />
      </Routes>
    </div>
  );
}

export default App;
