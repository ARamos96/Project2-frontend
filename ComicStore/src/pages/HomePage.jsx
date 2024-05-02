import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div className="homepage">
      <div className="header-container">
        <h1>Comic Keeper</h1>
      </div>
      <section className="pages-container ">
        <div className="page-block page-block-comics">
          <Link to="/comics">
            <button>Comics</button>
          </Link>
        </div>

        <div className="page-block page-block-author">
          <Link to="/authors">
            <button>Authors</button>
          </Link>
        </div>

        <div className="page-block page-block-publisher">
          <Link to="/publishers">
            <button>Publishers</button>
          </Link>
        </div>

        <div className="page-block page-block-character">
          <Link to="/characters">
            <button>Characters</button>
          </Link>
        </div>

        <div className="page-block page-block-mypage">
          <Link to="/myarea">
            <button>Personal Area</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
