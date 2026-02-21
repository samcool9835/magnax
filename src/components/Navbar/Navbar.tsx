import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, X, Menu } from 'lucide-react';
import type { NavItem } from '../../types';
import './Navbar.scss';

// // --- Types ---

// type SubItem = {
//   label: string;
//   path: string;
// };

// type Column = {
//   title: string;
//   items: SubItem[];
// };

// type NavItem = {
//   label: string;
//   path?: string;
//   dropdownKey?: string;
//   featured?: {
//     title: string;
//     description: string;
//     image: string;
//   };
//   columns?: Column[];
// };

// --- Data Configuration (Based on Screenshots) ---

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    dropdownKey: 'about',
    featured: {
      title: "ScienceSoft USA Corporation Is a 4-Year Champion",
      description: "For the fourth year in a row, ScienceSoft earns a place among The Americas' Fastest-Growing Companies.",
      image: "https://placehold.co/100x100/0a165e/ffffff?text=FT+2025"
    },
    columns: [
      {
        title: "Company",
        items: [
          { label: "About Company", path: "/about" },
          { label: "Mission", path: "/mission" },
          { label: "Leadership", path: "/leadership" },
          { label: "Our Team", path: "/team" },
          { label: "Portfolio", path: "/portfolio" },
          { label: "Partners", path: "/partners" },
          { label: "Locations", path: "/locations" },
        ]
      },
      {
        title: "Approach",
        items: [
          { label: "Where to Start", path: "/start" },
          { label: "Pricing Models", path: "/pricing" },
          { label: "Project Management Office", path: "/pmo" },
          { label: "Architecture CoE", path: "/architecture" },
          { label: "Technology Partnership", path: "/partnership" },
          { label: "Sustainability Policy", path: "/sustainability" },
        ]
      },
      {
        title: "Recognition",
        items: [
          { label: "Testimonials", path: "/testimonials" },
          { label: "Awards", path: "/awards" },
        ]
      },
      {
        title: "Join Us",
        items: [
          { label: "Careers", path: "/careers" },
          { label: "How We Hire", path: "/hiring" },
          { label: "Referral Program", path: "/referral" },
        ]
      }
    ]
  },
  {
    label: 'Services',
    dropdownKey: 'services',
    featured: {
      title: "Services Recognized by IAOP",
      description: "For the fourth year in a row, ScienceSoft is featured among the best outsourcing service providers.",
      image: "https://placehold.co/100x100/0a165e/ffffff?text=IAOP"
    },
    columns: [
      {
        title: "Software Engineering",
        items: [
          { label: "Software Development", path: "/services/dev" },
          { label: "MVP Development", path: "/services/mvp" },
          { label: "Web Development", path: "/services/web" },
          { label: "Mobile Development", path: "/services/mobile" },
          { label: "API Development", path: "/services/api" },
          { label: "IT Staff Augmentation", path: "/services/staffing" },
        ]
      },
      {
        title: "Strategy & Advisory",
        items: [
          { label: "IT Consulting", path: "/services/consulting" },
          { label: "Digital Transformation", path: "/services/digital" },
          { label: "Agile Consulting", path: "/services/agile" },
          { label: "DevOps Consulting", path: "/services/devops" },
        ]
      },
      {
        title: "Data & Intelligence",
        items: [
          { label: "Data Analytics", path: "/services/analytics" },
          { label: "Data Warehousing", path: "/services/warehouse" },
          { label: "Big Data", path: "/services/bigdata" },
          { label: "Machine Learning", path: "/services/ml" },
          { label: "Artificial Intelligence", path: "/services/ai" },
        ]
      },
      {
        title: "Security",
        items: [
          { label: "Cybersecurity", path: "/services/security" },
          { label: "Compliance Services", path: "/services/compliance" },
          { label: "Security Testing", path: "/services/testing" },
        ]
      }
    ]
  },
  {
    label: 'Industries',
    dropdownKey: 'industries',
    featured: {
      title: "ScienceSoft Named to CRN's 2025 Solution Provider 500",
      description: "ScienceSoft's inclusion is a testament to our success in delivering technology solutions.",
      image: "https://placehold.co/100x100/0a165e/ffffff?text=CRN"
    },
    columns: [
      {
        title: "Healthcare",
        items: [
          { label: "Healthcare IT Services", path: "/industries/healthcare" },
          { label: "Hospitals & Health Systems", path: "/industries/hospitals" },
          { label: "Medical Groups", path: "/industries/medical-groups" },
          { label: "Medical Devices", path: "/industries/devices" },
        ]
      },
      {
        title: "Finance",
        items: [
          { label: "Financial Services", path: "/industries/finance" },
          { label: "Banking", path: "/industries/banking" },
          { label: "Insurance", path: "/industries/insurance" },
          { label: "Investment", path: "/industries/investment" },
          { label: "Lending", path: "/industries/lending" },
          { label: "FinTech", path: "/industries/fintech" },
        ]
      },
      {
        title: "Other Industries",
        items: [
          { label: "Manufacturing", path: "/industries/manufacturing" },
          { label: "Retail", path: "/industries/retail" },
          { label: "Telecommunications", path: "/industries/telecom" },
          { label: "Real Estate", path: "/industries/realestate" },
          { label: "Oil & Gas", path: "/industries/oilgas" },
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    path: '/solutions',
  },
  {
    label: 'Technologies',
    dropdownKey: 'technologies',
    columns: [
      {
        title: "Frontend",
        items: [
          { label: "React", path: "/tech/react" },
          { label: "Vue.js", path: "/tech/vue" },
          { label: "Angular", path: "/tech/angular" },
          { label: "JavaScript", path: "/tech/javascript" },
          { label: "TypeScript", path: "/tech/typescript" },
        ]
      },
      {
        title: "Backend",
        items: [
          { label: ".NET", path: "/tech/dotnet" },
          { label: "Java", path: "/tech/java" },
          { label: "Python", path: "/tech/python" },
          { label: "Node.js", path: "/tech/nodejs" },
          { label: "React Native", path: "/tech/react-native" },
        ]
      },
      {
        title: "Mobile",
        items: [
          { label: "Flutter", path: "/tech/flutter" },
          { label: "iOS", path: "/tech/ios" },
          { label: "Android", path: "/tech/android" },
          { label: "React Native", path: "/tech/react-native" },
          { label: "Xamarin", path: "/tech/xamarin" },
        ]
      },
      {
        title: "Cloud & DevOps",
        items: [
          { label: "AWS", path: "/tech/aws" },
          { label: "Azure", path: "/tech/azure" },
          { label: "Google Cloud", path: "/tech/google-cloud" },
          { label: "Docker", path: "/tech/docker" },
          { label: "Kubernetes", path: "/tech/kubernetes" },
          // { label: "Jenkins", path: "/tech/jenkins" },
        ]
      },
      {
        title: "Databases",
        items: [
          { label: "SQL Server", path: "/tech/sql-server" },
          { label: "Oracle", path: "/tech/oracle" },
          { label: "MySQL", path: "/tech/mysql" },
          { label: "PostgreSQL", path: "/tech/postgresql" },
          { label: "MongoDB", path: "/tech/mongodb" },
        ]
      }
    ]
  },
  {
    label: 'Our Product',
    path: '/product',
  },
];

// --- Component ---

const Navbar: React.FC = () => {
  const location = useLocation();
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const activeItem = NAV_ITEMS.find(item => item.dropdownKey === openDropdown);

  return (
    <>
      {/* Top Bar
      <div className="navbar-top-bar">
        <div className="navbar-top-container">
          <div className="navbar-top-left">
            <Link to="/healthcare" className="navbar-top-link">
              ScienceSoft Healthcare
            </Link>
            <Link to="/finance" className="navbar-top-link">
              ScienceSoft Finance
            </Link>
          </div>
          <div className="navbar-top-right">
            <Link to="/careers" className="navbar-top-link">Careers</Link>
            <Link to="/contact" className="navbar-top-link">For journalists</Link>
            <span className="navbar-top-text">contact@scnsoft.com</span>
            <span className="navbar-top-text">+1 214 306 68 37</span>
          </div>
        </div>
      </div> */}

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
            <button className="navbar-search-btn">
              <Search size={22} strokeWidth={2.5} />
            </button>
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
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setOpenDropdown(null)}
                  className="navbar-mega-close"
                >
                  <X size={24} />
                </button>

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
                                <Link 
                                  to={sub.path} 
                                  className="navbar-mobile-submenu-link"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sub.label}
                                </Link>
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
            <Link to="/contact" className="navbar-mobile-contact">
              Get A Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;