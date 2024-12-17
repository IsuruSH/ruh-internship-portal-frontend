// components/Footer.js
import '../styles/Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="left">
                    <img src="/public/uni-logo2.png" alt=" Ruhuna Logo" className="logo" />
                    <h2>UNIVERSITY OF RUHUNA</h2>
                    <p>Sri Lanka</p>
                    <address>
                        University of Ruhuna<br />
                        Wellamadama<br />
                        Matara<br />
                        81000<br />
                        Sri Lanka<br />
                        Telephone: 0412033253<br />
                        Fax: 0412227008
                    </address>
                </div>
                <div className="middle">
                    <h3>ABOUT THE CS DEPARTMENT</h3>
                    <p>
                        The Department of Computer Science commenced Bachelor of Computer Science (BCS) in 2010.
                        The main aim of the degree programme is to prepare the undergraduates for a career in
                        Computer Science and Information Technology.
                    </p>
                </div>
                <div className="right">
                    <h3>QUICK LINKS</h3>
                    <ul>
                        <li><a href="#">HOME</a></li>
                        <li><a href="#">ABOUT</a></li>
                        <li><a href="#">INTERNSHIPS</a></li>
                        <li><a href="#">ADMINISTRATION</a></li>
                        <li><a href="#">CONTACT US</a></li>
                    </ul>
                    <div className="social">
                        <a href="#"><img src="/facebook.png" alt="Facebook" /></a>
                        <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
                        <a href="#"><img src="/youtube.png" alt="YouTube" /></a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright 2024 @UOR SC DCS Batch. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
