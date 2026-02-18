import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown && !dropdownRefs.current[openDropdown]?.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const navItems = [
    { path: '/', label: 'Home' },
    {
      label: 'About',
      dropdown: 'about',
      items: [
        { label: 'Company', path: '/about/company' },
        { label: 'Mission', path: '/about/mission' },
        { label: 'Leadership', path: '/about/leadership' },
        { label: 'Our Team', path: '/about/team' },
        { label: 'Portfolio', path: '/portfolio' },
      ],
    },
    {
      label: 'Services',
      dropdown: 'services',
      items: [
        { label: 'Custom Software', path: '/services/custom' },
        { label: 'Web Development', path: '/services/web' },
        { label: 'App Development', path: '/services/app' },
        { label: 'IT Consulting', path: '/services/consulting' },
        { label: 'Data & AI', path: '/services/ai' },
        { label: 'Cyber Security', path: '/services/security' },
      ],
    },
    {
      label: 'Industries',
      dropdown: 'industries',
      items: [
        { label: 'Healthcare', path: '/industries/healthcare' },
        { label: 'Finance', path: '/industries/finance' },
        { label: 'Insurance', path: '/industries/insurance' },
        { label: 'Manufacturing', path: '/industries/manufacturing' },
      ],
    },
    { path: '/solutions', label: 'Solutions' },
    { path: '/technologies', label: 'Technologies' },
    { path: '/portfolio', label: 'Portfolio' },
  ];

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const closeAll = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeAll}>
          Magnax
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navItems.map((item, idx: number) => (
            <li key={idx} className="nav-item">
              {item.path ? (
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`nav-link dropdown-toggle ${openDropdown === item.dropdown ? 'active' : ''}`}
                  onClick={() => toggleDropdown(item.dropdown!)}
                >
                  {item.label}
                  {openDropdown === item.dropdown ? (
                    <ChevronUp size={16} className="arrow-icon" />
                  ) : (
                    <ChevronDown size={16} className="arrow-icon" />
                  )}
                </button>
              )}

              {item.dropdown && openDropdown === item.dropdown && (
                <div
                  className="dropdown-menu"
                  ref={(el) => {
                    if (item.dropdown) dropdownRefs.current[item.dropdown] = el;
                  }}
                >
                  <div className="dropdown-grid">
                    {item.items?.map((sub, subIdx: number) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        className="dropdown-item"
                        onClick={closeAll}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="nav-controls">
          <button className="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link to="/contact" className="btn-contact" onClick={closeAll}>
            Contact Us
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeAll}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-close-btn" onClick={closeAll}>
            ✕
          </button>

          <ul className="mobile-nav-list">
            {navItems.map((item, idx: number) => (
              <li key={idx}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="mobile-dropdown-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.dropdown!);
                      }}
                    >
                      {item.label}
                      {openDropdown === item.dropdown ? (
                        <ChevronUp size={16} className="arrow-icon" />
                      ) : (
                        <ChevronDown size={16} className="arrow-icon" />
                      )}
                    </button>

                    {openDropdown === item.dropdown && (
                      <ul className="mobile-sub-list">
                        {item.items?.map((sub, subIdx: number) => (
                          <li key={subIdx}>
                            <Link
                              to={sub.path}
                              onClick={closeAll}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;