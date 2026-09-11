function Header() {
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">
            William E. Pritchard Jr. | Family History
          </a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="index.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="photos.html">
                Photo Gallery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="contact.html">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
