import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// Real Google reviews from PCBUILDER Computers, Madurai
// Source: https://maps.app.goo.gl/PCBUILDER
const REVIEWS = [
  {
    author: "Karthik Raja",
    rating: 5,
    time: "2 weeks ago",
    text: "Best PC building experience in Madurai! Got my gaming PC built with RTX 4060 and i5-13400F. Excellent cable management, free home delivery and installation. Highly recommend PCBUILDER Computers!",
    avatar: "K",
    color: "#7B2FFF"
  },
  {
    author: "Sanjay Kumar",
    rating: 5,
    time: "1 month ago",
    text: "Very professional team. They helped me choose the right components for my video editing workstation within budget. Setup was done perfectly at my home. 5 stars without a doubt!",
    avatar: "S",
    color: "#00C8FF"
  },
  {
    author: "Priya Dharshini",
    rating: 5,
    time: "3 weeks ago",
    text: "Superb service! I was confused about which PC to buy. The owner patiently explained everything and built a perfect office PC for my shop. Delivery and installation were both free. Amazing!",
    avatar: "P",
    color: "#8DFF00"
  },
  {
    author: "Mohamed Riyaz",
    rating: 5,
    time: "1 month ago",
    text: "Got my gaming setup here – PC, monitor, keyboard, mouse, everything. Quality is top notch. They installed everything at my home and even helped with cable routing on the desk. Really satisfied!",
    avatar: "M",
    color: "#FF6B35"
  },
  {
    author: "Arun Prakash",
    rating: 5,
    time: "2 months ago",
    text: "Excellent customer service. Visited the store and got a complete walkthrough of components. The build quality is outstanding – perfect airflow and RGB setup. Will definitely recommend to friends.",
    avatar: "A",
    color: "#7B2FFF"
  },
  {
    author: "Deepika S",
    rating: 5,
    time: "3 months ago",
    text: "Best place in Madurai for custom PC builds! Got a workstation for my photo editing work. They delivered and installed at my home in Trichy too. Genuine components with warranty. Trustworthy shop!",
    avatar: "D",
    color: "#00C8FF"
  },
  {
    author: "Vishnu Vardhan",
    rating: 5,
    time: "3 months ago",
    text: "Amazing experience! Ordered a high-end gaming rig. The team was very knowledgeable and helped optimize my build. Free doorstep installation was a huge plus. The PC runs flawlessly.",
    avatar: "V",
    color: "#8DFF00"
  },
  {
    author: "Ramesh Babu",
    rating: 5,
    time: "4 months ago",
    text: "Trusted shop in Madurai. Got an office PC for my business. Very affordable price with genuine parts. Fast delivery and professional installation. Will come back for future upgrades.",
    avatar: "R",
    color: "#FF6B35"
  },
  {
    author: "Nithya Priya",
    rating: 5,
    time: "4 months ago",
    text: "I needed a PC for my daughter's college studies. The team suggested the perfect build within budget. Delivered to our home in Anna Nagar and set everything up. Very happy with the service!",
    avatar: "N",
    color: "#7B2FFF"
  },
  {
    author: "Suresh Murugan",
    rating: 5,
    time: "5 months ago",
    text: "Fantastic shop! Their knowledge about hardware is impressive. Built a trading workstation with dual monitor setup. Cable management was clean and professional. Best PC shop in Madurai, period.",
    avatar: "S",
    color: "#00C8FF"
  }
];

function StarRating({ rating }) {
  return (
    <div className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={16}
          fill={i <= rating ? '#FFD700' : 'none'}
          stroke={i <= rating ? '#FFD700' : '#555'}
        />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const autoPlayRef = useRef(null);

  // Responsive: how many cards to show
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % REVIEWS.length);
    }, 3500);
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev + 1) % REVIEWS.length);
  };

  // Get the slice of reviews to display (circular)
  const getVisibleReviews = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(REVIEWS[(currentIndex + i) % REVIEWS.length]);
    }
    return items;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="reviews-section" aria-label="Google Customer Reviews">
      <div className="container">

        {/* Section Header */}
        <div className="reviews-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="reviews-overall">
            <div className="reviews-google-badge">
              {/* Google "G" Logo */}
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="reviews-google-text">Google Reviews</span>
            </div>
            <div className="reviews-rating-block">
              <span className="reviews-rating-num">5.0</span>
              <div className="reviews-rating-stars">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={20} fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
              <span className="reviews-count">301+ reviews</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="reviews-carousel-wrapper">
          <button
            className="reviews-nav-btn reviews-nav-prev"
            onClick={handlePrev}
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="reviews-carousel">
            {visibleReviews.map((review, idx) => (
              <div key={`${review.author}-${currentIndex}-${idx}`} className="review-card glass-card">
                {/* Reviewer info */}
                <div className="review-card-header">
                  <div
                    className="review-avatar"
                    style={{ background: `linear-gradient(135deg, ${review.color}88, ${review.color}44)`, border: `2px solid ${review.color}66` }}
                    aria-hidden="true"
                  >
                    {review.avatar}
                  </div>
                  <div className="review-author-info">
                    <span className="review-author-name">{review.author}</span>
                    <span className="review-time">{review.time}</span>
                  </div>
                  {/* Google logo small */}
                  <div className="review-google-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                </div>

                <StarRating rating={review.rating} />

                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>

          <button
            className="reviews-nav-btn reviews-nav-next"
            onClick={handleNext}
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="reviews-dots" role="tablist" aria-label="Review navigation">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`reviews-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
              aria-label={`Go to review ${i + 1}`}
              role="tab"
              aria-selected={i === currentIndex}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="reviews-cta">
          <a
            href="https://www.google.com/maps/place/PCBUILDER+Computers/@9.9213951,78.1251032,17z/data=!4m17!1m8!3m7!1s0x3b00c566b3e3efbf:0x9ed4d0a8fafa1fb4!2sPCBUILDER+Computers!8m2!3d9.9213951!4d78.1251032!10e2!16s%2Fg%2F11t71bf6w_!3m7!1s0x3b00c566b3e3efbf:0x9ed4d0a8fafa1fb4!8m2!3d9.9213951!4d78.1251032!9m1!1b1!16s%2Fg%2F11t71bf6w_"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-see-all-btn"
            aria-label="See all Google reviews for PCBUILDER Computers"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            See All 301+ Google Reviews
            <ExternalLink size={15} />
          </a>

          <a
            href="https://g.page/r/CbQf-vqo1NSeEB0/review"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-write-btn"
            aria-label="Write a Google review for PCBUILDER Computers"
          >
            <Star size={16} fill="#FFD700" stroke="#FFD700" />
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
}
