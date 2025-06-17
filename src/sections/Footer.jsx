import { socialImgs } from "../constants";
import resume from '../assets/file/Resume.pdf';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <a href={resume} download='resume' className="resume_link">
            <p>Download My Resume</p>
          </a>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <a href={socialImg.link}>
                <img src={socialImg.imgPath} alt="social icon" />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Asthreeta Schaft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;