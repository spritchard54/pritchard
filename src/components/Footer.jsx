function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="d-flex align-items-center">
      <div className="container">
        <p className="mb-0">
          Copyright &copy; 2024–{currentYear} William E. Pritchard Jr.
        </p>
      </div>
    </footer>
  );
}

export default Footer;