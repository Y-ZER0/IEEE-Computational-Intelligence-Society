import React, { useEffect, useRef } from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import '../ComponentsStyling/HeroContent.css';

function HeroContent() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 200;
    
    const globeRadius = Math.min(canvas.width, canvas.height) * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2; // around the circle
      const phi = Math.random() * Math.PI; // top to bottom
      
      const x = centerX + globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = centerY + globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);
      
      particles.push({
        x,
        y,
        z,
        r: Math.random() * 1.5 + 0.5,
        color: `rgba(44, 171, 226, ${Math.random() * 0.5 + 0.5})`,
        originalX: x,
        originalY: y,
        originalZ: z
      });
    }
    
    const connections = [];
    const connectionDistance = globeRadius * 0.25;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (dist < connectionDistance) {
          connections.push({
            from: i,
            to: j,
            dist
          });
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, globeRadius * 1.3);
      gradient.addColorStop(0, 'rgba(44, 171, 226, 0.1)');
      gradient.addColorStop(0.7, 'rgba(44, 171, 226, 0.02)');
      gradient.addColorStop(1, 'rgba(44, 171, 226, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();
      
      const time = Date.now() * 0.001;
      particles.forEach(p => {
        const rotationSpeed = 0.1;
        const cos = Math.cos(rotationSpeed * time);
        const sin = Math.sin(rotationSpeed * time);
        
        const rotatedX = cos * (p.originalX - centerX) + sin * (p.originalZ) + centerX;
        const rotatedZ = -sin * (p.originalX - centerX) + cos * (p.originalZ);
        
        p.x = rotatedX;
        p.z = rotatedZ;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (p.z / globeRadius + 1), 0, Math.PI * 2);
        ctx.fill();
      });
      
      connections.forEach(conn => {
        const p1 = particles[conn.from];
        const p2 = particles[conn.to];
        
        if (p1.z > 0 && p2.z > 0) {
          const opacity = Math.max(0, 1 - conn.dist / connectionDistance) * 0.5;
          ctx.strokeStyle = `rgba(44, 171, 226, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
      
      const hexCount = 6;
      for (let i = 0; i < hexCount; i++) {
        const angle = (i / hexCount) * Math.PI * 2 + time * 0.2;
        const dist = globeRadius * 0.7;
        const hexX = centerX + Math.cos(angle) * dist;
        const hexY = centerY + Math.sin(angle) * dist;
        const hexSize = globeRadius * 0.15;
        
        ctx.strokeStyle = 'rgba(44, 171, 226, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const hexAngle = (j / 6) * Math.PI * 2;
          const hx = hexX + Math.cos(hexAngle) * hexSize;
          const hy = hexY + Math.sin(hexAngle) * hexSize;
          if (j === 0) {
            ctx.moveTo(hx, hy);
          } else {
            ctx.lineTo(hx, hy);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }
      
      const streamCount = 10;
      for (let i = 0; i < streamCount; i++) {
        const angle = (i / streamCount) * Math.PI * 2;
        const startRadius = globeRadius * 1.1;
        const endRadius = globeRadius * 1.6;
        const startX = centerX + Math.cos(angle) * startRadius;
        const startY = centerY + Math.sin(angle) * startRadius;
        const endX = centerX + Math.cos(angle) * endRadius;
        const endY = centerY + Math.sin(angle) * endRadius;
        
        const streamGradient = ctx.createLinearGradient(startX, startY, endX, endY);
        streamGradient.addColorStop(0, 'rgba(44, 171, 226, 0.8)');
        streamGradient.addColorStop(1, 'rgba(44, 171, 226, 0)');
        
        ctx.strokeStyle = streamGradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        const pulseTime = (time * 0.5 + i / streamCount) % 1;
        const pulseX = startX + (endX - startX) * pulseTime;
        const pulseY = startY + (endY - startY) * pulseTime;
        const pulseRadius = 2 * (1 - pulseTime);
        
        ctx.fillStyle = 'rgba(44, 171, 226, 0.8)';
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="hero-container" id="home">
      <div className="bg-circuit-pattern"></div>
      <div className="bg-glow-effects"></div>
      
      <div className="hero-globe-section">
        <canvas ref={canvasRef} className="earth-animation"></canvas>
        <div className="globe-overlay"></div>
      </div>
      
      <div className="hero-content-section">
        <div className="social-icons">
          <a 
            href="https://www.instagram.com/ieeecisuj/" 
            className="social-icon-link" 
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={24} strokeWidth={2} />
          </a>
          <a 
            href="https://www.facebook.com/IEEE.CIS.JU" 
            className="social-icon-link" 
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={24} strokeWidth={2} />
          </a>
          <a 
            href="https://www.linkedin.com/company/ieeecisju/posts/?feedView=all" 
            className="social-icon-link" 
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} strokeWidth={2} />
          </a>
        </div>
        
        <div className="hero-content">
          <h3 className="hero-subtitle">Empowering Future Innovators in AI and Machine Learning</h3>
          <h1 className="hero-title">Your Gateway to Computational Intelligence Excellence</h1>
          <p className="hero-description">
            Welcome to the IEEE Computational Intelligence Society (CIS) at the University of Jordan. 
          </p>
          <div className="button-container">
            <a href="#join" className="btn btn--primary">
              <span>Join Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;