import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, X, Menu } from 'lucide-react';
import pcBuilderLogo from './assets/PCBUILDER.png';
import './App.css';

const galleryItems = [
  "IMG-20260625-WA0002.jpg", "IMG-20260625-WA0003.jpg", "IMG-20260625-WA0004.jpg",
  "IMG-20260625-WA0005.jpg", "IMG-20260625-WA0006.jpg", "IMG-20260625-WA0008.jpg",
  "IMG-20260625-WA0009.jpg", "IMG-20260625-WA0010.jpg", "IMG-20260625-WA0011.jpg",
  "IMG-20260625-WA0012.jpg", "IMG-20260625-WA0013.jpg", "IMG-20260625-WA0014.jpg",
  "IMG-20260625-WA0015.jpg", "IMG-20260625-WA0016.jpg", "IMG-20260625-WA0017.jpg",
  "IMG-20260625-WA0018.jpg", "IMG-20260625-WA0019.jpg", "IMG-20260625-WA0020.jpg",
  "IMG-20260625-WA0021.jpg", "IMG-20260625-WA0022.jpg", "IMG-20260625-WA0023.jpg",
  "IMG-20260625-WA0024.jpg", "IMG-20260625-WA0025.jpg", "IMG-20260625-WA0026.jpg",
  "IMG-20260625-WA0027.jpg", "IMG-20260625-WA0028.jpg", "IMG-20260625-WA0029.jpg",
  "IMG-20260625-WA0030.jpg", "IMG-20260625-WA0031.jpg", "IMG-20260625-WA0032.jpg",
  "IMG-20260625-WA0033.jpg", "IMG-20260625-WA0034.jpg", "IMG-20260625-WA0035.jpg",
  "IMG-20260625-WA0036.jpg", "IMG-20260625-WA0037.jpg", "IMG-20260625-WA0038.jpg",
  "IMG-20260625-WA0039.jpg", "IMG-20260625-WA0040.jpg", "IMG-20260625-WA0041.jpg",
  "IMG-20260625-WA0042.jpg", "IMG-20260625-WA0043.jpg", "IMG-20260625-WA0044.jpg",
  "IMG-20260625-WA0045.jpg", "IMG-20260625-WA0046.jpg", "IMG-20260625-WA0047.jpg",
  "IMG-20260625-WA0048.jpg", "IMG-20260625-WA0049.jpg", "IMG-20260625-WA0050.jpg",
  "IMG-20260625-WA0051.jpg", "IMG-20260625-WA0052.jpg", "IMG-20260625-WA0053.jpg",
  "IMG-20260625-WA0054.jpg", "IMG-20260625-WA0055.jpg", "IMG-20260625-WA0056.jpg",
  "IMG-20260625-WA0057.jpg", "IMG-20260625-WA0058.jpg", "IMG-20260625-WA0059.jpg"
].map(name => '/gallery/' + name);

export default function GalleryPage() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="navbar-brand">
            <img src={pcBuilderLogo} alt="PC Builder Computers" className="navbar-logo" />
          </Link>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </Link>
            </li>
          </ul>

          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <h1 className="section-title" style={{ marginBottom: '10px' }}>Our Gallery</h1>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--electric-blue)',
            marginBottom: '40px',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          <ChevronLeft size={20} style={{ marginRight: '4px' }} /> Back to Home
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '14px'
        }}>
          {galleryItems.map((imgSrc, index) => (
            <div
              key={index}
              onClick={() => setLightboxImg(imgSrc)}
              style={{
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '12px',
                aspectRatio: '4/3',
                background: '#111',
                border: '1px solid rgba(0,200,255,0.12)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={imgSrc}
                alt={`Gallery Image ${index + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>
              <X size={32} />
            </button>
            <img src={lightboxImg} alt="Gallery Fullsize" className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}
