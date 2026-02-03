'use client';

import Navbar from './navBar';
import HeroSection from './heroSection';
import AboutSection from './aboutSection';
import FeaturedVideosSection from './FeaturedVideosSection';
import FeaturedCoursesSection from './FeaturedCourseSection';
import Footer from './Footer';

export default function LandingPage({ isLoggedIn = false }) {
  return (
    <div className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <HeroSection />
      <AboutSection />
      <FeaturedVideosSection />
      <FeaturedCoursesSection />
      <Footer />
    </div>
  );
}