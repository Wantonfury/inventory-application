import '../styles/Footer.css';
import IconGithub from "../images/github.png";

const Footer = () => {
  return (
    <div id="footer">
      <span>Made by Wantonfury @ </span>
      <a href="https://github.com/Wantonfury/inventory-application" target="_blank" rel="noreferrer noopener">
        <img src={IconGithub} alt="Link to GitHub" />
      </a>
    </div>
  );
}

export default Footer;