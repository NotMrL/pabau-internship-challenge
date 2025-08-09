import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import imglogo from "../assets/img-logo.png";
import './BrandInfo.css';
import { Link } from "react-router-dom";
import { GET_BRAND_MODELS } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_MODELS } from "../GraphQl/Queries";
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaTwitter } from "react-icons/fa";

function BrandInfo() {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const logo = location.state?.logo;
  const brandId = location.state?.id ? parseInt(location.state.id) : 1;

  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [types, setTypes] = useState<string[]>([]);

  const { loading, error, data } = useQuery(GET_BRAND_MODELS, {
    variables: {
      id: brandId,
      sortBy: { field: "name", order: "ASC" }
    }
  });

  useEffect(() => {
    if (data?.findBrandModels) {
      const uniqueTypes = Array.from(
        new Set(data.findBrandModels.map((model: any) => model.type).filter(Boolean))
      );
      setTypes(["ALL", ...uniqueTypes.map(type => String(type))]);
    }
  }, [data]);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: refetchSearch,
  } = useQuery(

    searchTerm ? GET_SEARCH_MODELS : GET_BRAND_MODELS,
    {
      skip: !searchTerm,
      variables: searchTerm
        ? { brandId: String(brandId), name: searchTerm }
        : {
            id: brandId,
            sortBy: { field: "name", order: "ASC" },
          },
    }
  );

  let models: any[] = [];
  if (searchTerm && searchData?.searchModels) {
    models = searchData.searchModels;
  } else if (data?.findBrandModels) {
    models = data.findBrandModels;
  }

  if (selectedType !== "ALL") {
    models = models.filter((model) => model.type === selectedType);
  }

   useEffect(() => {
  console.log(models);
  }, [models]);

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
            <h1> Play like a <span className="orange">Rock star</span></h1>
            <p>
                With a legacy dating back to the 1950s, Ibanez blends expert<br />
                craftsmanship with cutting-edge innovation to deliver guitars that<br />
                inspire creativity and elevate your performance. Trusted by top <br />
                artists worldwide, Ibanez guitars are built to play fast, sound bold,<br />
                and stand out on any stage.<br />
                Ask ChatGPT
            </p>
          </div>
        </div>
        <div className="hero-right-new">
          {logo && (
            <img src={logo} alt={name} className="brandinfo-logo"/>
          )}
        </div>
      </div>
      <section className="brand-products-section">
        <div className="brand-products-header">
          <select
            className="brand-products-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            className="brand-products-search"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") refetchSearch();
            }}
          />
        </div>
        {(loading || searchLoading) && (
          <div className="brand-products-loading">Loading...</div>
        )}
        {(error || searchError) && (
          <div className="brand-products-error">Error loading models.</div>
        )}
        <div className="brand-products-grid">
          {models.map((model: any) => (
            <Link
              key={model.id}
              to={`/guitar/${model.id}`}
              state={{
                id: model.id,
                name: model.name,
                type: model.type,
                image: model.image,
                description: model.description,
                price: model.price,
                specs: model.specs,
                musicians: model.musicians
              }}
              className="brand-product-card"
              style={{ textDecoration: "none" }}
            >
              <img src={model.image} alt={model.name} className="brand-product-image" />
              <div className="brand-product-name">{model.name}</div>
              <div className="brand-product-price">${model.price}</div>
            </Link>
          ))}
        </div>
      </section>
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

export default BrandInfo;