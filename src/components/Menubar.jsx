import { Link } from "react-router-dom";

function Menubar() {
  return (
    <div className="menubar-container">
      <nav className="menubar">
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/publishers">Publishers</Link>
          </li>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li className="active">
            <Link to="/myarea">Personal Area</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menubar;
