import React, { useEffect, useRef, createRef, useState } from 'react';
import '../ComponentsStyling/EventsWorkshops.css'; 

const eventsData = [
  {
    id: 20,
    title: "IFTAR - COLLABORATION WITH IEEE CIS UJ AND IEEE CS UJ",
    date: "March 28, 2025",
    description: "Join us for a special Iftar gathering that brings together members of IEEE CIS UJ and IEEE CS UJ. This event combines networking, community building, and cultural celebration during the holy month of Ramadan.",
    fullDescription: "Join us for a special Iftar gathering that brings together members of IEEE CIS UJ and IEEE CS UJ. This collaborative event strengthens ties between our technical communities while celebrating the spirit of Ramadan. Enjoy meaningful conversations with peers and mentors in a relaxed setting, and discover potential collaboration opportunities across different technical fields. The event includes a traditional Iftar meal, networking sessions, and discussions about upcoming joint initiatives between the two student branches.",
    image: `${process.env.PUBLIC_URL}/images/IFTAR.PNG` 
  },
  {
    id: 19,
    title: "AI in Cybersecurity - Collaboration between IEEE CIS and IEEE ESPRIT SBC",
    date: "March 8, 2025",
    description: "Explore the intersection of AI and cybersecurity in this collaborative workshop between IEEE CIS and IEEE ESPRIT SBC, covering AI-powered security solutions, real-time threat detection, and machine learning for malware analysis.",
    fullDescription: "This collaborative workshop between IEEE CIS and IEEE ESPRIT SBC explores the cutting-edge intersection of artificial intelligence and cybersecurity. Industry experts demonstrate how AI is transforming traditional security approaches through real-time threat detection, automated response systems, and predictive analytics. Participants will learn about deep learning applications for malware detection, network anomaly identification, and vulnerability assessment. The workshop includes hands-on demonstrations of AI-powered security tools, case studies of successful implementations, and discussions about ethical considerations in AI-driven security solutions. Perfect for cybersecurity professionals, AI enthusiasts, and students interested in the future of digital security.",
    image: `${process.env.PUBLIC_URL}/images/AIinCyber.PNG` 
  },
  {
    id: 18,
    title: "AI Developer Essentials Workshop",
    date: "February 11, 2025",
    description: "Master the fundamental skills every AI developer needs with our comprehensive workshop led by Ahmad Stryin, covering data science fundamentals, machine learning algorithms, deep learning frameworks, and practical implementation techniques.",
    fullDescription: "This intensive workshop led by industry expert Ahmad Stryin provides a comprehensive introduction to the essential skills every AI developer needs in today's competitive landscape. Participants will explore data science fundamentals, including data preprocessing, visualization, and statistical analysis. The workshop covers key machine learning algorithms, model evaluation techniques, and best practices for dataset preparation. Dive into deep learning with hands-on experience using popular frameworks, and learn practical implementation strategies for real-world AI applications. Through interactive coding sessions and practical exercises, attendees will build confidence in developing AI solutions that address actual business challenges. Suitable for both beginners and those looking to strengthen their AI development foundation.",
    image: `${process.env.PUBLIC_URL}/images/AIDEVELOPER.PNG` 
  },
  {
    id: 17,
    title: "Microcontrollers Unleashed Workshop",
    date: "January 4, 2025",
    description: "Get hands-on experience with popular microcontroller platforms including Arduino, ESP, and Raspberry Pi in this practical workshop exploring hardware programming, sensor integration, and IoT applications.",
    fullDescription: "This hands-on workshop demystifies microcontroller programming and hardware integration across three popular platforms: Arduino, ESP32/8266, and Raspberry Pi. Participants will learn the unique capabilities of each system, from Arduino's accessibility to ESP's wireless capabilities and Raspberry Pi's computing power. Through practical exercises, attendees will program microcontrollers, connect various sensors, implement control systems, and develop simple IoT applications. The workshop covers fundamentals of circuit design, programming approaches for resource-constrained environments, and strategies for power management. Perfect for hobbyists, engineering students, and professionals looking to expand their skills in embedded systems and physical computing.",
    image: `${process.env.PUBLIC_URL}/images/Micro.jpg` 
  },
  {
    id: 16,
    title: "LinkedIn Mastery",
    date: "December 8, 2023",
    description: "Transform your professional online presence with LinkedIn expert Saleem Bustami, learning proven strategies for profile optimization, networking, content creation, and leveraging LinkedIn for career advancement.",
    fullDescription: "In this transformative workshop led by LinkedIn strategist Saleem Bustami, participants will learn how to maximize LinkedIn's potential as a career development platform. The session covers comprehensive profile optimization techniques that increase visibility to recruiters and industry peers, strategic networking approaches to connect with decision-makers, and content creation strategies that establish thought leadership. Attendees will discover how to leverage LinkedIn's algorithm, participate effectively in industry conversations, and use the platform's advanced features for job searching and professional growth. The workshop includes practical exercises, profile reviews, and personalized recommendations to help participants implement what they've learned immediately.",
    image: `${process.env.PUBLIC_URL}/images/LinkInMaster.PNG` 
  },
  {
    id: 15,
    title: "IEEE CIS AT UJ Hackathon",
    date: "November 23, 2024",
    description: "Celebrating our achievement of securing third place in both the Generative AI and Gaming Development tracks at the prestigious UJ Hackathon, showcasing innovative solutions and technical excellence.",
    fullDescription: "We're proud to announce that IEEE CIS members secured third place in both the Generative AI and Gaming Development tracks at the prestigious UJ Hackathon. Our teams demonstrated exceptional creativity, technical acumen, and collaborative problem-solving skills throughout the intensive competition. In the Generative AI track, our solution leveraged cutting-edge models to create innovative applications that impressed the judges with their practicality and technical implementation. Meanwhile, our Gaming Development team showcased impressive game mechanics, engaging user experiences, and polished execution. This dual achievement highlights our branch's versatility across different domains of computational intelligence and reinforces our commitment to fostering technical excellence among our members.",
    image: `${process.env.PUBLIC_URL}/images/UJHACK.PNG` 
  },
  {
    id: 14,
    title: "Building a successful career in AI Workshop",
    date: "November 14, 2024",
    description: "Prepare for the competitive AI job market with insider strategies for acing technical interviews, building an impressive portfolio, and positioning yourself as a standout candidate in artificial intelligence roles.",
    fullDescription: "This career development workshop provides actionable strategies for building a successful career in the competitive field of artificial intelligence. Participants will learn how to prepare for and excel in technical interviews through mock sessions covering common AI algorithms, data structures, and problem-solving approaches. The workshop explores portfolio development strategies that showcase your skills to potential employers, including personal projects, contributions to open-source initiatives, and competition participation. Industry experts share insights on in-demand AI specializations, required technical and soft skills, and how to navigate career progression in different AI roles. Attendees will leave with a personalized career roadmap and practical resources to help them stand out in the AI job market.",
    image: `${process.env.PUBLIC_URL}/images/SuccCareerAI.jpg` 
  },
  {
    id: 13,
    title: "AI in Astronomy Event",
    date: "December 28, 2023",
    description: "Explore the revolutionary application of AI in analyzing deep space objects, from automated celestial body classification to processing massive astronomical datasets for scientific discovery.",
    fullDescription: "This fascinating event explores the transformative role of artificial intelligence in modern astronomy, focusing on the analysis of deep space objects. Participants will learn how machine learning algorithms are helping astronomers process the unprecedented volume of data from advanced telescopes and space missions. The presentation covers AI applications in celestial object classification, exoplanet detection, gravitational wave analysis, and cosmological modeling. Experts will demonstrate how neural networks and computer vision techniques are enabling new discoveries that would be impossible through traditional analytical methods. The event includes visualizations of AI-processed astronomical data, case studies of recent breakthroughs, and discussions about future collaborations between AI researchers and astronomers. Suitable for astronomy enthusiasts, AI students, and anyone interested in interdisciplinary scientific research.",
    image: `${process.env.PUBLIC_URL}/images/AIASTRO.jpg` 
  },
  {
    id: 12,
    title: "Introductory Event on AI",
    date: "October 27, 2023",
    description: "Begin your AI journey with this accessible introduction to artificial intelligence concepts, current applications across industries, and exciting developments shaping the future of technology.",
    fullDescription: "This beginner-friendly introductory event provides a comprehensive overview of artificial intelligence and its growing impact across various fields. Participants will learn fundamental AI concepts explained in accessible terms, including machine learning, neural networks, and natural language processing. The presentation showcases real-world AI applications transforming industries like healthcare, finance, transportation, and entertainment. Attendees will gain insight into the current state of AI technology, major recent breakthroughs, and emerging trends that will shape the future technological landscape. The event includes interactive demonstrations, Q&A sessions with AI practitioners, and guidance on resources for those interested in further exploring the field of artificial intelligence.",
    image: `${process.env.PUBLIC_URL}/images/Intro.jpg` 
  },
  {
    id: 11,
    title: "Arduino Course",
    date: "July 15, 2023",
    description: "Learn Arduino programming and hardware interfacing from mechatronics engineer Muhammad Samara in this comprehensive course featuring hands-on projects, circuit design, and practical IoT applications.",
    fullDescription: "This comprehensive Arduino course led by mechatronics engineer and instructor Muhammad Samara provides a strong foundation in microcontroller programming and electronics. Participants will progress from basic circuit design and Arduino programming fundamentals to advanced sensor integration, motor control, and IoT connectivity. The course emphasizes hands-on learning through practical projects that solve real-world problems, including home automation systems, environmental monitoring devices, and interactive displays. Attendees will master important hardware interfacing techniques, troubleshooting methodologies, and best practices for creating reliable embedded systems. By the end of the course, participants will have developed several functional Arduino projects and gained the confidence to conceptualize, design, and implement their own creative solutions using microcontroller technology.",
    image: `${process.env.PUBLIC_URL}/images/Arduino.jpg` 
  },
  {
    id: 10,
    title: "AI & MATLAB Summary",
    date: "June 24, 2023",  
    description: "Discover MATLAB's powerful capabilities for machine learning and deep learning applications with guidance from a Technical Manager at MathWorks, exploring practical implementation techniques and industry best practices.",
    fullDescription: "This workshop, led by a Technical Manager from MathWorks, provides an extensive overview of MATLAB's capabilities for artificial intelligence applications. Participants will learn efficient approaches for implementing machine learning algorithms in MATLAB, including data preprocessing, feature selection, model training, and evaluation. The session covers MATLAB's deep learning toolbox, demonstrating how to build, train, and deploy neural networks for various applications like image processing, signal analysis, and pattern recognition. Attendees will explore practical examples of AI implementation across different industries, learning how to leverage MATLAB's visualization tools for gaining insights from complex data. The workshop includes hands-on exercises to reinforce concepts and provides resources for continued learning and application development.",
    image: `${process.env.PUBLIC_URL}/images/AIAndMatlab.jpg` 
  },
  {
    id: 9,
    title: "Responsive AI",
    date: "May 31, 2023",
    description: "Join industry expert Baha Rabbah for an important discussion on responsible AI development, exploring ethical considerations, best practices, and collaborative approaches to ensuring AI systems benefit humanity.",
    fullDescription: "This critical discussion led by AI ethics expert Baha Rabbah explores the importance of developing artificial intelligence systems responsibly. Participants will examine key ethical considerations in AI development, including fairness, transparency, privacy, and accountability. The session covers best practices for mitigating algorithmic bias, ensuring data privacy, and designing AI systems with human values in mind. Attendees will learn practical approaches for implementing ethical guidelines in AI projects, from initial conception through deployment and monitoring. The discussion encourages multidisciplinary collaboration between technical experts, ethicists, policymakers, and end users to create AI systems that genuinely benefit humanity. Case studies of both problematic and exemplary AI implementations will highlight the real-world impact of responsible AI development practices.",
    image: `${process.env.PUBLIC_URL}/images/ResponsibleAI.jpg` 
  },
  {
    id: 8,
    title: "Python Course",
    date: "May 20, 2023",
    description: "Build a solid foundation in Python programming with this beginner-friendly course covering essential concepts like operators, conditional statements, loops, and object-oriented programming principles.",
    fullDescription: "This comprehensive Python programming course provides a strong foundation for beginners while offering valuable insights for those looking to refine their skills. Starting with fundamental programming concepts, participants will learn about Python's syntax, data types, operators, and basic input/output operations. The course progresses through control flow mechanisms including conditional statements and various loop structures. Participants will master functions, learn efficient data manipulation with Python's built-in data structures, and explore file handling operations. The latter part of the course introduces object-oriented programming principles, teaching students how to create classes, implement inheritance, and utilize polymorphism. Throughout the course, practical exercises and mini-projects reinforce learning and demonstrate Python's versatility across different application domains.",
    image: `${process.env.PUBLIC_URL}/images/PythonCourse.jpg` 
  },
  {
    id: 7,
    title: "Skill Spark CV",
    date: "May 16, 2023",
    description: "Transform your resume with resume writing expert Sundos Alshoubaki, learning proven techniques for highlighting your skills, experiences, and achievements to capture employers' attention.",
    fullDescription: "This Skill Spark workshop, led by resume writing expert Sundos Alshoubaki, teaches participants how to create compelling resumes that stand out in competitive job markets. Attendees will learn strategic approaches to showcasing their professional experiences, skills, and achievements in ways that resonate with hiring managers and applicant tracking systems. The session covers optimal resume structures for different career stages, industry-specific customization techniques, and powerful language choices that highlight accomplishments. Participants will discover how to identify and emphasize transferable skills, address employment gaps effectively, and create visually appealing layouts that enhance readability. The workshop includes practical exercises, before-and-after examples, and personalized feedback to help attendees implement best practices immediately.",
    image: `${process.env.PUBLIC_URL}/images/SkillSparkCV.jpg` 
  },
  {
    id: 6,
    title: "Data Preparation Course",
    date: "May 10, 2023",
    description: "Master essential data preparation techniques with Basel Husam, learning professional approaches to data analysis, cleaning, and preprocessing that form the foundation of successful data science projects.",
    fullDescription: "This comprehensive data preparation course led by data scientist Basel Husam equips participants with crucial skills for handling real-world datasets. The course covers systematic approaches to exploratory data analysis, teaching students how to gain insights from raw data through statistical analysis and visualization techniques. Participants will learn effective data cleaning methodologies to address missing values, outliers, duplicates, and inconsistencies that can compromise analysis quality. The course explores various data preprocessing techniques including normalization, standardization, encoding categorical variables, and feature engineering. Students will practice implementing these skills using popular data science tools and libraries, working with diverse datasets that reflect real-world challenges. By completion, participants will be able to transform messy, raw data into clean, analysis-ready datasets suitable for machine learning applications.",
    image: `${process.env.PUBLIC_URL}/images/DataPreparation.jpg` 
  },
  {
    id: 5,
    title: "Skill Spark Creative Thinking",
    date: "April 9, 2023",
    description: "Enhance your problem-solving abilities with creative thinking expert Subhi Abdalla, exploring innovative approaches to critical thinking, ideation, and tackling complex challenges across various domains.",
    fullDescription: "This interactive Skill Spark workshop, facilitated by creative thinking specialist Subhi Abdalla, helps participants develop and strengthen their creative problem-solving abilities. The session introduces proven techniques for breaking conventional thinking patterns, generating innovative ideas, and approaching challenges from multiple perspectives. Attendees will learn structured methodologies for critical thinking, systematic problem analysis, and effective decision-making. Through hands-on exercises and collaborative activities, participants will practice applying creative thinking tools to real-world scenarios, developing their ability to identify unique solutions to complex problems. The workshop also covers strategies for overcoming mental blocks, fostering a creative mindset, and creating environments that support innovation. Suitable for professionals across all disciplines looking to enhance their problem-solving capabilities.",
    image: `${process.env.PUBLIC_URL}/images/SkillSparkCreativeThinking.jpg` 
  },
  {
    id: 4,
    title: "Skill Spark LinkedIn",
    date: "January 12, 2023",
    description: "Optimize your LinkedIn presence with social media strategist Abdel Rahman AlSabbagh, learning insider tips for profile optimization, professional networking, and leveraging LinkedIn for career advancement.",
    fullDescription: "This Skill Spark workshop led by LinkedIn expert Abdel Rahman AlSabbagh provides comprehensive guidance on maximizing LinkedIn's potential for professional development. Participants will learn step-by-step approaches to creating a compelling LinkedIn profile that attracts recruiters and industry connections. The session covers strategic networking techniques, effective content engagement, and visibility optimization within LinkedIn's algorithm. Attendees will discover how to leverage LinkedIn's various features for job searching, business development, and thought leadership. The workshop includes practical advice on crafting engaging posts, building a professional brand, and using LinkedIn analytics to refine your strategy. Whether you're a student, job seeker, or established professional, this workshop offers valuable insights to enhance your digital professional presence.",
    image: `${process.env.PUBLIC_URL}/images/SkillSpark.jpg` 
  },
  {
    id: 3,
    title: "Eye on AI",
    date: "January 3, 2023",
    description: "Gain valuable insights into artificial intelligence trends and future developments with industry expert Osama Fityan, exploring how AI is transforming industries and creating new opportunities.",
    fullDescription: "This forward-looking event featuring AI expert Osama Fityan examines the current state and future trajectory of artificial intelligence technologies. Participants will explore how AI is fundamentally reshaping industries including healthcare, finance, manufacturing, and entertainment. The presentation covers recent breakthroughs in machine learning, natural language processing, computer vision, and robotics, highlighting their practical implications for businesses and society. Attendees will gain insights into emerging AI trends, the evolving regulatory landscape, and potential societal impacts of widespread AI adoption. The session also addresses common misconceptions about AI and provides a realistic assessment of both the opportunities and challenges that lie ahead. Suitable for business leaders, technology professionals, and anyone interested in understanding how AI will influence our collective future.",
    image: `${process.env.PUBLIC_URL}/images/EyeOnAi.jpg` 
  },
  {
    id: 2,
    title: "Beyond Detection",
    date: "December 29, 2022",
    description: "Explore advanced speech recognition applications with Dr. Harald Singer from NUANCE/Microsoft, examining cutting-edge techniques that go beyond basic voice detection to enable sophisticated audio analysis and interaction.",
    fullDescription: "This specialized workshop led by Dr. Harald Singer, a leading expert from NUANCE/Microsoft, explores the frontier of speech recognition technology beyond basic detection capabilities. Participants will learn about advanced applications including semantic understanding, emotion detection, speaker identification, and multilingual processing. The session examines how modern speech recognition systems integrate with broader AI frameworks to enable more natural human-computer interaction. Technical aspects covered include deep learning architectures for speech processing, techniques for improving recognition accuracy in challenging environments, and approaches for handling specialized vocabulary. The workshop also addresses implementation considerations for deploying speech recognition in various contexts, from mobile applications to enterprise solutions. Perfect for developers, researchers, and professionals interested in the cutting edge of voice technology.",
    image: `${process.env.PUBLIC_URL}/images/BeyondDetection.jpg` 
  },
  {
    id: 1,
    title: "Launching of the IEEE CIS Student Branch",
    date: "November 15, 2022",
    description: "Celebrate the official launch of the IEEE Computational Intelligence Society Student Branch, bringing together faculty, students, and industry representatives to establish a community dedicated to AI and computational intelligence.",
    fullDescription: "This milestone event marked the official establishment of the IEEE Computational Intelligence Society Student Branch, creating a hub for students interested in artificial intelligence, neural networks, evolutionary computation, and other computational intelligence technologies. The launching ceremony featured addresses from IEEE leaders who shared the organization's vision and the benefits of being part of the IEEE CIS community. Faculty representatives discussed how the student branch would enhance educational opportunities and research collaboration in computational intelligence fields. The event included a comprehensive overview of planned activities, including technical workshops, competitions, research presentations, and industry networking opportunities. Following the formal proceedings, attendees participated in a networking session that facilitated connections between students, academics, and industry professionals working in AI and computational intelligence domains.",
    image: `${process.env.PUBLIC_URL}/images/LaunchingCeremony.jpg` 
  }
];

const EventsWorkshops = () => {
  const eventRefs = useRef([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    eventRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      eventRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; 
  };

  eventRefs.current = eventsData.map((_, i) => eventRefs.current[i] ?? createRef());

  return (
    <section className="events-workshops" id="events-workshops">
      <div className="container">
        <h2 className="section-title">Events & Workshops</h2>
        <p className="section-description">
          Explore our journey through various technical events and knowledge-sharing workshops.
        </p>
        
        <div className="timeline">
          {eventsData.map((event, index) => (
            <div 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              key={event.id}
              ref={el => eventRefs.current[index] = el}
            >
              <div className="timeline-content">
                <div className="event-image">
                  <img src={event.image} alt={event.title} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`; 
                  }} />
                </div>
                <div className="event-date">{event.date}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <button 
                  className="learn-more-btn"
                  onClick={() => openEventDetails(event)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="close-modal-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-image">
              <img src={selectedEvent.image} alt={selectedEvent.title} onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`; 
              }} />
            </div>
            <div className="modal-date">{selectedEvent.date}</div>
            <div className="modal-description">
              <p>{selectedEvent.fullDescription}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsWorkshops;