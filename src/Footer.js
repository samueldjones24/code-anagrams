import Emoji from "./Emoji.js";

function Footer() {
  const copyRightYear = new Date().getFullYear();

  return (
    <footer className="animated">
      <div className="footer__text">
        built with <Emoji symbol="☕" label="coffee" /> by{" "}
        <a
          href="https://www.twitter.com/samueldjones"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Samuel Jones
        </a>{" "}
        <br />
        <div className="margin-top-sm">Copyright &#169; {copyRightYear}</div>
      </div>
    </footer>
  );
}

export default Footer;
