import gmail from '../../images/icons/gmail.png';
import linkedin from '../../images/icons/linkedin.png';
import github from '../../images/icons/github.png';
import wellfound from '../../images/icons/wellfound.png';
import './About.css';

const Contact = () => {
    return (
        <div id='about'>
            <h1 className="about-title">
                About Me
            </h1>
            <p className="about-text">
                Hello there! My name is Allen Huang and "Hero's Conquest" is a solo project I have developed. If you wish to connect, reach me at the links below!
            </p>
            <div className="about-links">
                <a href="mailto:huanglallen@gmail.com" target="_blank" >
                    <img src={gmail} alt="huanglallen@gmail.com" />
                </a>
                <a href="https://www.linkedin.com/in/huanglallen/" target="_blank" >
                    <img src={linkedin} alt="linkedin" />
                </a>
                <a href="https://github.com/huanglallen" target="_blank" >
                    <img src={github} alt="github" />
                </a>
                <a href="https://wellfound.com/u/huanglallen" target="_blank" >
                    <img src={wellfound} alt="wellfound" />
                </a>
            </div>
        </div>
    )
};

export default Contact;
