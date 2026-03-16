import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, X, Menu } from 'lucide-react';
import type { NavItem } from '../../types';
import './Navbar.scss';

const NAV_ITEMS: NavItem[] = [

  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About',
    dropdownKey: 'about',
    columns: [
      {
        title: "Company",
        items: [
          { label: "About Company", path: "/company" },
          { label: "Mission", path: "/company#mission" },
          { label: "Leadership", path: "/company#leadership" },
          { label: "Our Team", path: "/company#our-team" },
        ]
      },
      {
        title: "Approach",
        items: [
          { label: "Where to Start", path: "/approach" },
          { label: "Pricing Models", path: "/approach#pricing-models" },
          { label: "Project Management Office", path: "/approach#project-management" },
          { label: "Architecture CoE", path: "/approach#architecture" },
          { label: "Technology Partnership", path: "/approach#partnership" },
          { label: "Sustainability Policy", path: "/approach#sustainability" },
        ]
      },
      // {
      //   title: "Recognition",
      //   items: [
      //     { label: "Testimonials", path: "/recognition" },
      //     { label: "Awards", path: "/recognition#awards" },
      //   ]
      // },
      // {
      //   title: "Join Us",
      //   items: [
      //     { label: "Careers", path: "/join-us" },
      //     { label: "How We Hire", path: "/join-us#how-we-hire" },
      //     { label: "Referral Program", path: "/join-us#referral" },
      //   ]
      // }
    ]
  },
  {
    label: 'Services',
    dropdownKey: 'services',
    
    columns: [
      {
        title: "Software Engineering",
        items: [
          { label: "Software Development", path: "/services/software-development" },
          { label: "MVP Development", path: "/services/software-development#mvp-development" },
          { label: "Web Development", path: "/services/web-mobile-development" },
          { label: "Mobile Development", path: "/services/web-mobile-development#mobile-development" },
          { label: "API Development", path: "/services/api-development" },
        ]
      },
      {
        title: "Strategy & Advisory",
        items: [
          { label: "IT Consulting", path: "/services/it-consulting-digital" },
          { label: "Digital Transformation", path: "/services/it-consulting-digital#transformation" },
          { label: "Agile Consulting", path: "/services/agile-devops-consulting#agile" },
          { label: "DevOps Consulting", path: "/services/agile-devops-consulting#devops" },
        ]
      },
      {
        title: "Data & Intelligence",
        items: [
          { label: "Data Analytics", path: "/services/data-analytics-warehouse#analytics" },
          { label: "Data Warehousing", path: "/services/data-analytics-warehouse#warehouse" },
          { label: "Big Data", path: "/services/data-analytics-warehouse#bigdata" },
          { label: "Machine Learning", path: "/services/machine-learning-ai#machine-learning" },
          { label: "Artificial Intelligence", path: "/services/machine-learning-ai#ai" },
        ]
      },
    ]
  },
  {
    label: 'Industries',
    dropdownKey: 'industries',
    columns: [
      {
        title: "Healthcare",
        items: [
          { label: "Healthcare IT Services", path: "/industries/healthcare-fintech" },
          { label: "Hospitals & Health Systems", path: "/industries/healthcare-fintech" },
         
        ]
      },
      {
        title: "Finance",
        items: [
          { label: "Financial Services", path: "/industries/healthcare-fintech" },
          { label: "Retail & E-commerce", path: "/industries/retail-media" },
        ]
      },
      {
        title: "Other Industries",
        items: [
          { label: "Education", path: "/otherindustries#education" },
          { label: "Real Estate", path: "/otherindustries#realestate" },
          { label: "Politics", path: "/industries/politics" },
          { label: "Manufacturing", path: "/industries/politics" },
          
        ]
      },
      {
        title: "Emerging Industries",
        items: [
          { label: "Restaurants", path: "/industries/travel-restaurants" },
          { label: "Travel & Hospitality", path: "/industries/travel-restaurants" },
          { label: "Media & Entertainment", path: "/industries/retail-media" },
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    path: '/Key-Projects',
  },
  {
    label: 'Technologies',
    dropdownKey: 'technologies',
    columns: [
      {
        title: "Frontend",
        items: [
          { label: "React", path: "/technologies/frontend" },
          { label: "Vue.js", path: "/technologies/frontend" },
          { label: "Angular", path: "/technologies/frontend" },
          { label: "JavaScript", path: "/technologies/frontend" },
          { label: "TypeScript", path: "/technologies/frontend" },
        ]
      },
      {
        title: "Backend",
        items: [
          { label: ".NET", path: "/technologies/backend" },
          { label: "Java", path: "/technologies/backend" },
          { label: "Python", path: "/technologies/backend" },
          { label: "Node.js", path: "/technologies/backend" },
          { label: "React Native", path: "/technologies/backend" },
        ]
      },
      {
        title: "Mobile",
        items: [
          { label: "Flutter", path: "/technologies/mobile" },
          { label: "iOS", path: "/technologies/mobile" },
          { label: "Android", path: "/technologies/mobile" },
          { label: "React Native", path: "/technologies/mobile" },
          { label: "Xamarin", path: "/technologies/mobile" },
        ]
      },
      {
        title: "Cloud & DevOps",
        items: [
          { label: "AWS", path: "/technologies/cloud-devops" },
          { label: "Azure", path: "/technologies/cloud-devops" },
          { label: "Google Cloud", path: "/technologies/cloud-devops" },
          { label: "Docker", path: "/technologies/cloud-devops" },
          { label: "Kubernetes", path: "/technologies/cloud-devops" },
        ]
      },
      {
        title: "Databases",
        items: [
          { label: "SQL Server", path: "/technologies/database" },
          { label: "Oracle", path: "/technologies/database" },
          { label: "MySQL", path: "/technologies/database" },
          { label: "PostgreSQL", path: "/technologies/database" },
          { label: "MongoDB", path: "/technologies/database" },
        ]
      }
    ]
  },
  {
    label: 'Our Product',
    path: '/our-product',
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(e.target as Node)) {
      setOpenDropdown(null);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle hash scroll on page load
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleLinkClick = (path: string) => {
  setOpenDropdown(null);
  setIsMobileMenuOpen(false);

  const [route, hash] = path.split('#');

  if (location.pathname === route && hash) {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    navigate(path);
  }
};

  const activeItem = NAV_ITEMS.find(item => item.dropdownKey === openDropdown);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <div className="navbar-logo-spinner"></div>
            </div>
            <span className="navbar-logo-text">Magnax</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-desktop-menu" ref={dropdownRef}>
            <ul className="navbar-menu-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="navbar-menu-item">
                  {item.path ? (
                    <Link 
                      to={item.path} 
                      className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(item.dropdownKey!)}
                      className={`navbar-dropdown-toggle ${openDropdown === item.dropdownKey ? 'active' : ''}`}
                    >
                      {item.label}
                      {openDropdown === item.dropdownKey ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link to="/contact" className="navbar-contact-btn">
              Get A Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        <div className={`navbar-mega-menu ${openDropdown ? 'open' : ''}`}>
          <div className="navbar-mega-container">
            {activeItem && (
              <div className="navbar-mega-content">
                
                {/* Close Button */}
                <button 
                  onClick={() => setOpenDropdown(null)}
                  className="navbar-mega-close"
                >
                  <X size={24} />
                </button>

                {/* Featured Section */}
                {activeItem.featured && (
                  <div className="navbar-mega-featured">
                    <h3 className="navbar-mega-featured-title">
                      {activeItem.featured.title}
                    </h3>
                    <p className="navbar-mega-featured-desc">
                      {activeItem.featured.description}
                    </p>
                    <div className="navbar-mega-featured-image">
                      <img 
                        src={activeItem.featured.image} 
                        alt="Award"
                      />
                    </div>
                  </div>
                )}

                {/* Columns Section */}
                <div className={`navbar-mega-columns ${activeItem.featured ? 'with-featured' : 'full-width'}`}>
                  {activeItem.columns?.map((col, idx) => (
                    <div key={idx} className="navbar-mega-column">
                      <h4 className="navbar-mega-column-title">
                        {col.title}
                      </h4>
                      <ul className="navbar-mega-column-list">
                        {col.items.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className="navbar-mega-link"
                              onClick={() => setOpenDropdown(null)}
                             
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-content">
          <ul className="navbar-mobile-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="navbar-mobile-item">
                {item.path ? (
                  <Link 
                    to={item.path} 
                    className="navbar-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="navbar-mobile-dropdown">
                    <button 
                      onClick={() => toggleDropdown(item.dropdownKey!)}
                      className="navbar-mobile-dropdown-toggle"
                    >
                      {item.label}
                      {openDropdown === item.dropdownKey ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    
                    <div className={`navbar-mobile-submenu ${openDropdown === item.dropdownKey ? 'open' : ''}`}>
                      {item.columns?.map((col, idx) => (
                        <div key={idx} className="navbar-mobile-submenu-section">
                          <h4 className="navbar-mobile-submenu-title">{col.title}</h4>
                          <ul className="navbar-mobile-submenu-list">
                            {col.items.map((sub) => (
                              <li key={sub.path}>
                                <button 
                                  onClick={() => handleLinkClick(sub.path)}
                                  className="navbar-mobile-submenu-link"
                                >
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="navbar-mobile-footer">
            <button className="navbar-mobile-search">
              <Search size={20} /> Search
            </button>
            <Link to="/contact" className="navbar-mobile-contact" onClick={() => setIsMobileMenuOpen(false)}>
              Get A Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;