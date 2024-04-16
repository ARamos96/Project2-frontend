function AuthorDetails() {
  return (
    <section className="author-details">
      <div className="author-intro">
        <img />
        <h1>Author Name</h1>
        <p>Author Intro</p>
      </div>
      {/* <table>Author general info table</table> */}
      <div className="author-career">
        <h2>Career</h2>
      </div>
      <div className="creators">
        <h3>Creators</h3>
        {/* List of creators */}
      </div>
      <div className="characters-created">
        <h3>Characters Created</h3>
        {/* List of characters created */}
      </div>
    </section>
  );
}

export default AuthorDetails;
