import axios from "axios"
import {useState,useEffect} from "react"
import { Link } from "react-router-dom"



function ComicsPage() {

  /*const [comics,setComics] = useState([]);

  const [searchComic,setSearchComic] = useState("")

  useEffect (()=>{
    axios.get("https://comicvine.gamespot.com/api/volumes/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json")
    .then((response)=>{
      setComics(response.data);

    })
  },[]);

  const filteredComics = comics.filter((comic) => comic.name.toLowerCase().includes(searComic.toLowerCase()));

  */


  
  return (
    <div>
      <div>
      <h2>Comics</h2>
      <input type="text" />
      </div>
      <div>
        <img src="" alt="comic-cover" />
        <p>Comic name</p>
        <button>$</button>
        <button>+</button>


      </div>
      


    </div>
  )
}

export default ComicsPage