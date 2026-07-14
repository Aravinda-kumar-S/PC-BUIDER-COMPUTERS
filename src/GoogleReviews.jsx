import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';

// Real Google reviews from PCBUILDER Computers, Madurai
// Source: https://maps.app.goo.gl/PCBUILDER
const REVIEWS = [
  {
    author: "Rock Gamers",
    rating: 5,
    time: "1 month ago",
    text: "Great effort for this perfection!!! Such a perfect engineer I have found on Google for this monster setup. He gives the more ideas apart from the computer side. Actually, we contacted for the PC, but he created this dream setup which I had expected. The ultimate result is, he arranged and configured this height-adjustable table for this whole monitor setup including PC. All the items are fitted on a single table and the cable management is superb. I highly recommend this shop to anyone who wants their dream gaming machine.",
    avatar: "R",
    color: "#7B2FFF"
  },
  {
    author: "Abhishek",
    rating: 5,
    time: "3 weeks ago",
    text: "Great Gaming Pc Build And Great Price in this segment.Engineer Harish helped us very kindly And Service also very good. Trusted Pc Store in Tamilnadu to buy pc in affordable Prices 💯💯",
    avatar: "A",
    color: "#00C8FF"
  },
  {
    author: "Vishwa_MV _9901",
    rating: 5,
    time: "2 months ago",
    text: "The best computer shop for assembled pc build. They have lot of customisation options for pc build which is very suitable for customer needs. I am impressed with their work, response and knowledge. They understand our situation and provided quick service which I have expected. Thank you mr.harish.",
    avatar: "V",
    color: "#8DFF00"
  },
  {
    author: "Shalini",
    rating: 5,
    time: "4 months ago",
    text: "I had an amazing experience with this PC builders! From the initial consultation to the final build, everything was handled professionally and with great attention to detail. They understood exactly what I needed for my gaming setup and Ai uses, recommended the perfect components within my budget. The cable management is super clean, performance is outstanding, and the system runs smoothly even on high settings. They also took the time to explain the specs, future upgrade options, and provided excellent after-sales support. If you’re looking for someone reliable, knowledgeable, and passionate about building high-performance gaming PCs, I highly recommend them. Absolutely worth every penny! 💯🎮",
    avatar: "S",
    color: "#FF6B35"
  },
  {
    author: "Namma Shivan Kovil",
    rating: 5,
    time: "2 months ago",
    text: "Excellent place to buy a PC! I recently bought a new system for my content creation work. The staff was very knowledgeable and helped me choose the right components within my budget. The assembly was neat and the performance is top-notch. Highly recommended for gamers and professional editors!",
    avatar: "N",
    color: "#7B2FFF"
  },
  {
    author: "naga arjun",
    rating: 5,
    time: "4 months ago",
    text: "Awesome!!! A perfect gaming PC built from PC builder computers. He suggested more ideas according to my needs. From start to end, the whole process ran very smoothly. Door step delivery and installation are very helpful. The PC looks very professional because of excellent cable management. We also check the prices of other shops and he gives a very affordable range. He proves the results of work apart from the word.",
    avatar: "N",
    color: "#00C8FF"
  },
  {
    author: "Ramya ganapathi",
    rating: 5,
    time: "4 months ago",
    text: "Great deal. Best assembled pc from pcbuilder computers. They provided best service. Customers, if you looking for budget friendly pc build contact them.",
    avatar: "R",
    color: "#8DFF00"
  },
  {
    author: "Raj Kumar",
    rating: 5,
    time: "5 months ago",
    text: "We received excellent service and a high-quality build from PCBuilder. we originally planned to buy a branded desktop from a showroom, but PCBuilder suggested an assembled desktop at half the price. we are honestly surprised by this top-notch performance! we also appreciate the free door delivery and installation. Overall, it was a hassle-free process. Thank you, PCBuilder!!!",
    avatar: "R",
    color: "#FF6B35"
  },
  {
    author: "Karthick Raja",
    rating: 5,
    time: "4 months ago",
    text: "Thanks pcbuilder, We build a budget gaming pc build with the help of mr.harish. Very excellent service and response. Free home delivery and installation is very excellent.",
    avatar: "K",
    color: "#7B2FFF"
  },
  {
    author: "VIGNESH",
    rating: 5,
    time: "6 months ago",
    text: "Excellent Experience with PCBUILDER Computers. I recently purchased a laptop from PCBUILDER Computers, and the experience was outstanding from start to finish. Mr.Harish was knowledgeable, patient, and helped me choose the right laptop based on my needs and budget. He clearly explained the specifications, performance, and details, which made the decision easy and confident. The pricing was fair, the product was genuine, and the delivery/setup was quick and smooth. Overall, very professional service and great customer support. I highly recommend PC Builder to anyone looking to buy a laptop or computer accessories. Will definitely come back for future purchases!",
    avatar: "V",
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
          <SectionHeading>What Our Customers Say</SectionHeading>
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
              <span className="reviews-count">310+ reviews</span>
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
            See All 310+ Google Reviews
            <ExternalLink size={15} />
          </a>

          <a
            href="https://g.page/r/CbQf-vqo0NSeEAg/review"
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
