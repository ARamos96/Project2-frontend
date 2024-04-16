

function HomePage() {
  return (
    <div>
      <div>
      <h1>Comic Keeper</h1>
      </div>
      <section className="pages-container">
          
          <div className="page-block">
          <img src="../assets/Images/libro-comico.png" alt="Comic cover" />
          <button>Comics</button>
          </div>
          
          <div className="page-block">
          <img src="../assets/Images/escritor.png" alt="Author cover" />
          <button>Authors</button>
          </div>

          <div className="page-block">
          <img src="../assets/Images/cultura-corporativa.png" alt="Publisher cover" />
          <button>Publishers</button>
          </div>

          <div className="page-block" >
          <img src="../assets/Images/capa.png" alt="Characters cover" />
          <button>Characters</button>
          </div>

          <div className="page-block">
          <img src="../assets/Images/leer.png" alt="Personal Area" />
          <button>Personal Area</button>
          </div>

      </section>


    </div>
  )
}

export default HomePage