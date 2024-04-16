import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import ComicsPage from "./pages/ComicsPage";
import PublishersPage from "./pages/PublishersPage";
import MyArea from "./pages/MyPage";
import ComicDetailsPage from "./pages/ComicsDetailsPage";
import PublisherDetailsPage from "./pages/PublishersDetailsPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";

function App() {
  return (

    <div className="App">
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/publishers" element={<PublishersPage />} />
        <Route path="/myarea" element={<MyArea />} />
        <Route path="*" element="Page not found" />
        <Route path="/beers/:issueId" element={<ComicDetailsPage />} />
        <Route path="/beers/:authorId" element={<AuthorDetailsPage />} />
        <Route path="/beers/:characterId" element={<CharacterDetailsPage />} />
        <Route path="/beers/:publisherId" element={<PublisherDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
