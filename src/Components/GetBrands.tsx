import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../GraphQl/Queries';
import imglogo from '../assets/img-logo.png';
import appMockup from '../assets/screenshots.png';
import Badges from '../assets/badges.jpg';
import './GetBrands.css';
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaThLarge, FaTruck, FaTwitter, FaWallet } from "react-icons/fa";
import { Link } from 'react-router-dom';
import heroImg from '../assets/img-1.png';

function GetBrands() {
    const { loading, error, data } = useQuery(GET_BRANDS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

        return (
         <div className="main-bg">
            <div className="hero-container">
                <div className="hero-left">
                    <div className="hero-title">
                        <img src={imglogo} alt="VibeStrings Logo" className="hero-logo" />
                        <span className="hero-brand">VibeStrings</span>
                    </div>
                    <div className="hero-text">
                        <h1>
                            Browse top quality <br />
                            <span className="orange">Guitars</span> online
                        </h1>
                        <p>
                            Explore 50k+ latest collections of branded guitars<br />
                            online with VibeStrings.
                        </p>
                    </div>
                </div>
                    <div className="hero-right"
                        style={{
                            backgroundImage: `url(${heroImg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                </div>
            </div>
            <section className="brands-section">
                <h2>
                    Featuring the <span className="orange">Best Brands</span>
                </h2>
                <p className="brands-subtext">
                    Select your preferred brand and explore our exquisite collection.
                </p>
                <div className="brands-logos">
                    {data.findAllBrands.map((brand: { id: string; name: string; image: string }) => (
                        <Link
                            key={brand.id}
                            to={`/brand/${encodeURIComponent(brand.name)}`}
                            className="brand-logo"
                            style={{ textDecoration: "none" }}
                            state={{ logo: brand.image, id: brand.id }}
                            >
                            <img src={brand.image} alt={brand.name} title={brand.name} />
                        </Link>
                    ))}
                </div>
            </section>
            <section className="why-section">
                <h2 className="why-title">
                    Why try <span className="orange">VibeStrings</span>?
                </h2>
                <div className="why-features">
                    <div className="why-feature">
                        <div className="why-icon"><FaThLarge /></div>
                        <div className="why-label">SMOOTH BROWSING</div>
                        <div className="why-desc">Lorem Ipsum Dolor Sit Amet,<br />Consectetur Adipiscing Elit.</div>
                    </div>
                    <div className="why-feature">
                        <div className="why-icon"><FaTruck /></div>
                        <div className="why-label">EASY DELIVERY</div>
                        <div className="why-desc">Lorem Ipsum Dolor Sit Amet,<br />Consectetur Adipiscing Elit.</div>
                    </div>
                    <div className="why-feature">
                        <div className="why-icon"><FaWallet /></div>
                        <div className="why-label">SWIFT PAYMENTS</div>
                        <div className="why-desc">Lorem Ipsum Dolor Sit Amet,<br />Consectetur Adipiscing Elit.</div>
                    </div>
                </div>
            </section>
            <div className="app-promo-section">
                <div className="app-promo-left">
                    <h1>
                    Browse and buy your<br />
                    <span className="app-promo-orange">favorite guitars</span> with<br />
                    VibeStrings.
                    </h1>
                    <img className="app-promo-badges" src={Badges} alt="Download on the App Store" />
                </div>
                <div className="app-promo-right">
                    <img src={appMockup} alt="App Mockup" className="app-promo-image" />
                </div>
            </div>
            <footer className="footer">
                <div className="footer-col footer-brand">
                    <div className="footer-logo-row">
                        <img src={imglogo} alt="VibeStrings Logo" className="footer-logo" />
                        <span className="footer-brand-name">VibeStrings</span>
                    </div>
                    <div className="footer-contact">
                        <div className="footer-contact-row">
                            <FaEnvelope className="footer-icon" />
                            <span>Enquiry@VibeStrings.com</span>
                        </div>
                        <div className="footer-contact-row">
                            <FaMapMarkerAlt className="footer-icon" />
                            <span>San Francisco</span>
                        </div>
                    </div>
                </div>
                <div className="footer-col">
                    <div className="footer-heading">PAGES</div>
                    <div className="footer-link">Store</div>
                    <div className="footer-link">Collections</div>
                    <div className="footer-link">Support</div>
                </div>
                <div className="footer-col">
                    <div className="footer-heading">PRODUCT</div>
                    <div className="footer-link">Terms</div>
                    <div className="footer-link">Privacy Policy</div>
                    <div className="footer-link">Copyright</div>
                </div>
                <div className="footer-col">
                    <div className="footer-heading">FOLLOW US</div>
                    <div className="footer-social-row">
                        <FaFacebookF className="footer-social-icon" />
                        <FaTwitter className="footer-social-icon" />
                        <FaInstagram className="footer-social-icon" />
                    </div>
                </div>
                <div className="footer-copyright">
                    © 2022 Copyright.VibeStrings
                </div>
            </footer>
        </div>
    );
}

export default GetBrands