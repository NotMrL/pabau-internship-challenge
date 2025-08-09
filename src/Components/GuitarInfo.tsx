import { useLocation } from "react-router-dom";
import imglogo from '../assets/img-logo.png';
import { Link } from 'react-router-dom';
import './GuitarInfo.css';
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function GuitarInfo() {
  const location = useLocation();
  const guitar = location.state;

  const [activeTab, setActiveTab] = useState<"spec" | "who">("spec");

  if (!guitar) return <div>No guitar data found.</div>;

  useEffect(() => {
    console.log(guitar);
  }, [guitar]);

  return (
    <div className="main-bg">
      <div className="back-home-row">
        <Link to="/" className="back-home-link">
          <span className="back-arrow">&#8592;</span>   Back To Home
        </Link>
      </div>
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-title">
            <img src={imglogo} alt="VibeStrings Logo" className="hero-logo" />
            <span className="hero-brand">VibeStrings</span>
          </div>
          <div className="hero-text-new">
            <h1>{guitar.name}</h1>
          </div>
        </div>
        <div className="hero-right-new">
          {guitar.image && (
            <img src={guitar.image} alt={guitar.name} className="brandinfo-logo"/>
          )}
        </div>
      </div>
      <div className="guitar-tabs-section">
        <div className="guitar-tabs-header">
          <button
            className={`guitar-tab-btn${activeTab === "spec" ? " active" : ""}`}
            onClick={() => setActiveTab("spec")}
          >
            Specification
          </button>
          <button
            className={`guitar-tab-btn${activeTab === "who" ? " active" : ""}`}
            onClick={() => setActiveTab("who")}
          >
            Who plays it?
          </button>
        </div>
        <div className="guitar-tabs-content">
          {activeTab === "spec" && (
            <div>
              <div className="guitar-description">{guitar.description}</div>
                  <ul className="guitar-spec-list">
                  <li>Body Wood: "{guitar.specs?.bodyWood}"</li>
                  <li>Neck Wood: "{guitar.specs?.neckWood}"</li>
                  <li>Fingerboard: "{guitar.specs?.fingerboardWood}"</li>
                  <li>Pickups: "{guitar.specs?.pickups}"</li>
                  <li>Tuners: "{guitar.specs?.tuners}"</li>
                  <li>Scale Length: "{guitar.specs?.scaleLength}"</li>
                  <li>Bridge: "{guitar.specs?.bridge}"</li>
            </ul>
            </div>
          )}
          {activeTab === "who" && (
            <div>
              {guitar.musicians && guitar.musicians.length > 0 ? (
                  <div className="guitar-musicians-grid">
                       {guitar.musicians.map((musician: any) => (
                          <div className="musician-card" key={musician.name}>
                              {musician.musicianImage && (
                                  <img
                                      src={musician.musicianImage}
                                      alt={musician.name}
                                      className="musician-image"
                                  />
                              )}
                              <div className="musician-name">{musician.name}</div>
                          </div>
                      ))}
                  </div>
              ) : (
                <p className="guitar-no-musicians">No famous musicians listed for this model.</p>
              )}
            </div>
          )}
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

export default GuitarInfo;