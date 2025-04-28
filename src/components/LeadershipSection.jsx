// LeadershipSection.jsx with Intersection Observer
import React, { useEffect, useRef } from 'react';
import '../ComponentsStyling/LeadershipSection.css';
import { Mail, Linkedin } from 'lucide-react';

const LeadershipSection = () => {
    const sectionRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const leaders = [
        {
            name: "Laith Antar",
            title: "Chairman, IEEE CIS Society",
            image: `${process.env.PUBLIC_URL}/images/Laith.jpg`,
            bio: "Emerging AI researcher with a solid foundation in machine learning, neural networks, and artificial intelligence. Currently advancing research in ethical AI development.",
            linkedin: "https://www.linkedin.com/in/laith-antar-278925251?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BQAeD4zsLQMaxWSIRONwaew%3D%3D",
            email: "laithantar2003@gmail.com"
        },
        {
            name: "Bayan Hmlan",
            title: "Vice Chairman, IEEE CIS Society",
            image: `${process.env.PUBLIC_URL}/images/Bayan.jpg`,
            bio: "Expert in computational intelligence and machine learning, with significant contributions to AI applications in healthcare and sustainable technologies.",
            linkedin: "https://www.linkedin.com/in/bayan-hmlan/",
            email: "bayanhmlan786@gmail.com"
        },
        {
            name: "Albara Samer",
            title: "Secretary, IEEE CIS Society",
            image: `${process.env.PUBLIC_URL}/images/Albara.jpg`,
            bio: "Dedicated secretary ensuring smooth operations and effective communication across all IEEE CIS Society activities and initiatives.",
            linkedin: "https://www.linkedin.com/in/bara-samer-0ba39a324?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bfe2sYaNtShm58dz%2FMvxlvg%3D%3D",
            email: "barasamer15@gmail.com"
        },
        {
            name: "Qusai Abu Ghannam",
            title: "Treasurer, IEEE CIS Society",
            image: `${process.env.PUBLIC_URL}/images/Qusai.jpg`,
            bio: "Financial expert managing the society's resources with precision and transparency to support our technical and educational initiatives.",
            linkedin: "https://www.linkedin.com/in/qusai-abu-ghannam-aba05b296?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BnakFUq%2BkSQycRqBSG9fbkw%3D%3D",
            email: "qusaiabughannam44@gmail.com"
        },
        {
            name: "Khaled Raed",
            title: "Web Master, IEEE CIS Society",
            image: `${process.env.PUBLIC_URL}/images/Khaled.jpeg`,
            bio: "Skilled web developer leading the design and development of the IEEE CIS Society website. Optimized site functionality and user experience to effectively showcase events, programs, and research initiatives.",
            linkedin: "https://www.linkedin.com/in/khaled-al-khateeb-0a92412a7?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIv4Lt2HETyW0TCV7UWurzA%3D%3D",
            email: "khaledraedkhateeb@gmail.com"
        },
    ];

    return (
        <section className="leadership-section animate-section" id="committees" ref={sectionRef}>
            <div className="leadership-container">
                <h2 className="leadership-title">Our Committees</h2>
                <div className="leadership-grid">
                    {leaders.map((leader, index) => (
                        <div key={index} className="leadership-card">
                            <div className="leader-image-container">
                                <img 
                                    src={leader.image} 
                                    alt={leader.name} 
                                    className="leader-image"
                                />
                                <div className="leader-overlay">
                                    <div className="leader-name">{leader.name}</div>
                                    <div className="leader-title">{leader.title}</div>
                                </div>
                            </div>
                            <div className="leader-details">
                                <p className="leader-bio">{leader.bio}</p>
                                <div className="leader-contact">
                                    <a 
                                        href={leader.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="leader-contact-icon"
                                    >
                                        <Linkedin />
                                    </a>
                                    <a 
                                        href={`mailto:${leader.email}`}
                                        className="leader-contact-icon"
                                    >
                                        <Mail />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;