import { Link } from "react-router-dom";
import libroComico from "../assets/Images/libro-comico.png";
import escritor from "../assets/Images/escritor.png";
import cultura from "../assets/Images/cultura-corporativa.png";
import capa from "../assets/Images/capa.png";
import leer from "../assets/Images/leer.png";
import headerPicture from "../assets/Images/Free Vector _ Comic style background.jpg"

function HomePage() {
  return (
    <div className="homepage">
      <div className="header-container">
        <h1>Comic Keeper</h1>

      </div>
      <section className="pages-container">
        <div className="page-block">
          <Link to="/comics">
            <img src={libroComico} alt="Comic cover" />
            <button>Comics</button>
          </Link>
        </div>

        <div className="page-block">
          <Link to="/authors">
            <img src={escritor} alt="Author cover" />

            <button>Authors</button>
          </Link>
        </div>

        <div className="page-block">
          <Link to="/publishers">
            <img src={cultura} alt="Publisher cover" />

            <button>Publishers</button>
          </Link>
        </div>

        <div className="page-block">
          <Link to="/characters">
            <img src={capa} alt="Characters cover" />

            <button>Characters</button>
          </Link>
        </div>

        <div className="page-block">
          <Link to="/myarea">
            <img src={leer} alt="Personal Area" />

            <button>Personal Area</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
