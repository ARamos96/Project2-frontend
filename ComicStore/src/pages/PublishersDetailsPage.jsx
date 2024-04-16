import React from 'react'

function PublishersDetailsPage() {
  return (
    <section className="publisher-details">
    <div className="publisher-intro">
      <img />
      <h1>Publisher Details</h1>
      <p>Publisher Description</p>
    </div>
    {/* <table>Publisher Info Table</table> */}
    <div className="publisher-history">
      <h2>Origin</h2>
      <p>Brief origin</p>
      <div className="Timeline">
        <h3>Timeline</h3>
        {/* Bulletlist timeline */}
      </div>
    </div>
  </section>
  )
}

export default PublishersDetailsPage