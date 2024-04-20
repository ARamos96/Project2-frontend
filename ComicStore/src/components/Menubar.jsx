import { Link } from 'react-router-dom'


function Menubar() {
  return (
    <div>
        <nav>
          <a><Link to ="/">Home</Link></a>
          <a><Link to ="/comics">Comics</Link></a>
          <a><Link to ="/authors">Authors</Link></a>
          <a><Link to ="/publishers">Publishers</Link></a>
          <a><Link to ="/characters">Characters</Link></a>
          <a><Link to ="/myeare">Personal Area</Link></a>      

        </nav>
    </div>

  )
}

export default Menubar