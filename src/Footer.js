import Emoji from "./Emoji.js";

function Footer() {
  const copyRightYear = new Date().getFullYear();

  return (
    <footer className="animated">
      <h6>
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
        <br />
        Copyright &#169; {copyRightYear}
      </h6>
    </footer>
  );
}

export default Footer;
