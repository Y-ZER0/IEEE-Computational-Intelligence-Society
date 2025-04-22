import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ComponentsStyling/FAQ.css';
import Header from './Header';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function FAQ({ onToggleTheme, isDarkMode }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const navigate = useNavigate();
  
  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'What is IEEE CIS?',
      answer: 'IEEE Computational Intelligence Society (CIS) is a professional society of IEEE focusing on the theory, design, application, and development of biologically and linguistically motivated computational paradigms.'
    },
    {
      id: 2,
      category: 'general',
      question: 'What are the benefits of being involved with IEEE CIS?',
      answer: 'Benefits include networking opportunities with professionals and researchers, access to cutting-edge research, learning resources, workshops, conferences, and the chance to develop leadership and technical skills relevant to computational intelligence.'
    },
    {
      id: 3,
      category: 'membership',
      question: 'How can I become a member of IEEE CIS?',
      answer: 'To become a member, you need to first join IEEE as a regular or student member, then add the CIS membership. You can register through the IEEE website and select CIS as one of your technical societies.'
    },
    {
      id: 4,
      category: 'membership',
      question: 'What are the membership fees?',
      answer: 'Membership fees vary depending on your status (student, regular member, etc.) and location. Student membership is significantly discounted. Please check the IEEE membership portal for the most current fee structure.'
    },
    {
      id: 5,
      category: 'events',
      question: 'How can I participate in IEEE CIS events?',
      answer: 'Most IEEE CIS events are open to both members and non-members. You can find upcoming events on our website and register through the provided links. Members often receive discounted or free access to events.'
    },
    {
      id: 6,
      category: 'events',
      question: 'Does IEEE CIS offer virtual events?',
      answer: 'Yes, IEEE CIS regularly hosts virtual workshops, webinars, and conferences, especially since the COVID-19 pandemic. These are announced on our website and social media channels.'
    },
    {
      id: 7,
      category: 'technical',
      question: 'What areas of research does IEEE CIS cover?',
      answer: 'IEEE CIS covers various areas including neural networks, fuzzy systems, evolutionary computation, deep learning, reinforcement learning, explainable AI, and other computational intelligence paradigms.'
    }
  ];
  
  const handleNavigation = (sectionId) => {
    if (sectionId.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId.substring(1));
        if (element) {
          const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
          const topOffset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: topOffset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };
  
  const toggleFaq = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  useEffect(() => {
    const filtered = faqData.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    setFilteredFaqs(filtered);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animated-element');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [filteredFaqs]);

  return (
    <div className="faq-page">
      <Header 
        onToggleTheme={onToggleTheme} 
        isDarkMode={isDarkMode} 
        onNavigation={handleNavigation}
        currentPage="faq"
      />
      
      <main>
        <section className="faq-hero">
          <div className="faq-hero-content animated-element">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about IEEE CIS and our activities</p>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-search animated-element">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for questions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="faq-categories animated-element">
            <button 
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Questions
            </button>
            <button 
              className={`category-btn ${activeCategory === 'general' ? 'active' : ''}`}
              onClick={() => setActiveCategory('general')}
            >
              General
            </button>
            <button 
              className={`category-btn ${activeCategory === 'membership' ? 'active' : ''}`}
              onClick={() => setActiveCategory('membership')}
            >
              Membership
            </button>
            <button 
              className={`category-btn ${activeCategory === 'events' ? 'active' : ''}`}
              onClick={() => setActiveCategory('events')}
            >
              Events
            </button>
            <button 
              className={`category-btn ${activeCategory === 'technical' ? 'active' : ''}`}
              onClick={() => setActiveCategory('technical')}
            >
              Technical
            </button>
          </div>

          <div className="faq-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`faq-item animated-element`}
                  data-category={faq.category}
                >
                  <div 
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h3>{faq.question}</h3>
                    <div className="faq-icon">
                      {expandedItems[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  <div className={`faq-answer ${expandedItems[faq.id] ? 'expanded' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No matching questions found. Try a different search term or category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default FAQ;