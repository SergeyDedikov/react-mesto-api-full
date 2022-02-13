function Footer() {
  const data = new Date();

  return (
    <footer className="footer">
      <p className="footer__copyright" lang="en">
        &copy; {data.getFullYear()} Mesto Russia & Sergey Dedikov
      </p>
    </footer>
  );
}

export default Footer;
