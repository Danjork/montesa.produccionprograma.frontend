export default function Header() {
  return (
    <header className="navbar navbar-dark bg-dark px-4 py-2">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <strong>Company name</strong>
        </a>
        <div className="d-flex">
          <button className="btn btn-outline-light btn-sm me-2">Share</button>
          <button className="btn btn-outline-light btn-sm me-2">Export</button>
          <button className="btn btn-outline-light btn-sm">This week ▼</button>
        </div>
      </div>
    </header>
  );
}
