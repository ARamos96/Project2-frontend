import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import ComicsPage from "./pages/ComicsPage";
import PublishersPage from "./pages/PublishersPage";
import CharactersPage from "./pages/CharactersPage";
import MyArea from "./pages/MyPage";
import Menubar from "./components/Menubar"
import CharactersPage from "./pages/CharactersPage";
import ComicDetailsPage from "./pages/ComicsDetailsPage";
import PublisherDetailsPage from "./pages/PublishersDetailsPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";


function App() {
  return (

    <div className="App">
      
      <Menubar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/publishers" element={<PublishersPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/myarea" element={<MyArea />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="*" element="Page not found" />
        <Route path="/comics/:issueId" element={<ComicDetailsPage />} />
        <Route path="/authors/:authorId" element={<AuthorDetailsPage />} />
        <Route path="/characters/:characterId" element={<CharacterDetailsPage />} />
        <Route path="/publishers/:publisherId" element={<PublisherDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
