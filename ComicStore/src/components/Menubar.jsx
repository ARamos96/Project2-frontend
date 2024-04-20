import { Link } from 'react-router-dom'


function Menubar() {
  return (
    <div>
        <nav>
          <Link to ="/">Home</Link>
          <Link to ="/comics">Comics</Link>
          <Link to ="/authors">Authors</Link>
          <Link to ="/publishers">Publishers</Link>
          <Link to ="/characters">Characters</Link>
          <Link to ="/myeare">Personal Area</Link>      

        </nav>
    </div>

  )
}

export default Menubar