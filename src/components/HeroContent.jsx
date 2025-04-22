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
    
    const nnNodes = [];
    const nnLayerCount = 3;
    const nodesPerLayer = 5;
    const nnWidth = globeRadius * 1.2;
    const nnHeight = globeRadius * 0.9;
    const nnStartX = centerX - nnWidth/2;
    const nnStartY = centerY - nnHeight/2;
    
    for (let layer = 0; layer < nnLayerCount; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const x = nnStartX + (layer * (nnWidth / (nnLayerCount - 1)));
        const y = nnStartY + (node * (nnHeight / (nodesPerLayer - 1)));
        
        nnNodes.push({
          x,
          y,
          radius: 5,
          layerIndex: layer,
          nodeIndex: node,
          pulsePhase: Math.random() * Math.PI * 2,
          highlighted: Math.random() > 0.7
        });
      }
    }
    
    const binaryStreams = [];
    const streamCount = 8;
    
    for (let i = 0; i < streamCount; i++) {
      const stream = {
        x: Math.random() * canvas.width,
        y: -100 - Math.random() * 500,
        speed: 1 + Math.random() * 3,
        length: 80 + Math.random() * 120,
        characters: []
      };
      
      // Generate binary characters for the stream
      for (let j = 0; j < stream.length; j += 20) {
        stream.characters.push({
          value: Math.random() > 0.5 ? '1' : '0',
          y: stream.y + j,
          opacity: 1 - (j / stream.length),
          highlighted: Math.random() > 0.7
        });
      }
      
      binaryStreams.push(stream);
    }
    
    const circuits = [];
    const circuitCount = 12;
    
    for (let i = 0; i < circuitCount; i++) {
      const startAngle = (i / circuitCount) * Math.PI * 2;
      const startRadius = globeRadius * 1.2;
      const endRadius = globeRadius * 1.7;
      const startX = centerX + Math.cos(startAngle) * startRadius;
      const startY = centerY + Math.sin(startAngle) * startRadius;
      
      const path = [{x: startX, y: startY}];
      let currentX = startX;
      let currentY = startY;
      const segments = 3 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < segments; j++) {
        const segmentAngle = startAngle + (Math.random() * 0.8 - 0.4);
        const segmentLength = (endRadius - startRadius) / segments;
        
        if (j % 2 === 0) {
          if (Math.random() > 0.5) {
            currentX += Math.cos(segmentAngle) * segmentLength;
            path.push({x: currentX, y: currentY});
          } else {
            currentY += Math.sin(segmentAngle) * segmentLength;
            path.push({x: currentX, y: currentY});
          }
        } else {
          currentX += Math.cos(segmentAngle) * segmentLength;
          currentY += Math.sin(segmentAngle) * segmentLength;
          path.push({x: currentX, y: currentY});
        }
      }
      
      circuits.push({
        path,
        color: `rgba(44, 171, 226, ${0.6 + Math.random() * 0.4})`,
        pulseSpeed: 1 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    const robotElements = [];
    
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const distance = globeRadius * 1.4;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const size = 15 + Math.random() * 20;
      
      robotElements.push({
        type: 'gear',
        x,
        y,
        size,
        teeth: 6 + Math.floor(Math.random() * 6),
        rotation: 0,
        rotationSpeed: 0.2 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)
      });
    }
    
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 + Math.PI/6;
      const distance = globeRadius * 1.5;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const size = 40 + Math.random() * 20;
      
      robotElements.push({
        type: 'chip',
        x,
        y,
        size,
        rotation: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, globeRadius * 1.3);
      gradient.addColorStop(0, 'rgba(44, 171, 226, 0.1)');
      gradient.addColorStop(0.7, 'rgba(44, 171, 226, 0.02)');
      gradient.addColorStop(1, 'rgba(44, 171, 226, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.font = '12px monospace';
      binaryStreams.forEach(stream => {
        stream.y += stream.speed;
        
        if (stream.y > canvas.height + 100) {
          stream.y = -100 - Math.random() * 200;
          stream.x = Math.random() * canvas.width;
        }
        
        stream.characters.forEach((char, index) => {
          char.y = stream.y + index * 20;
          
          if (char.highlighted) {
            ctx.fillStyle = `rgba(44, 171, 226, ${char.opacity * 0.9})`;
          } else {
            ctx.fillStyle = `rgba(44, 171, 226, ${char.opacity * 0.3})`;
          }
          
          ctx.fillText(char.value, stream.x, char.y);
        });
      });
      
      circuits.forEach(circuit => {
        ctx.strokeStyle = 'rgba(44, 171, 226, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(circuit.path[0].x, circuit.path[0].y);
        
        for (let i = 1; i < circuit.path.length; i++) {
          ctx.lineTo(circuit.path[i].x, circuit.path[i].y);
        }
        
        ctx.stroke();
        
        const totalLength = circuit.path.reduce((total, point, i) => {
          if (i === 0) return 0;
          const prevPoint = circuit.path[i - 1];
          const dx = point.x - prevPoint.x;
          const dy = point.y - prevPoint.y;
          return total + Math.sqrt(dx*dx + dy*dy);
        }, 0);
        
        const pulsePosition = (time * circuit.pulseSpeed + circuit.pulsePhase) % 2;
        let currentDist = 0;
        
        if (pulsePosition < 1) { 
          for (let i = 1; i < circuit.path.length; i++) {
            const prevPoint = circuit.path[i - 1];
            const point = circuit.path[i];
            const dx = point.x - prevPoint.x;
            const dy = point.y - prevPoint.y;
            const segmentLength = Math.sqrt(dx*dx + dy*dy);
            
            const segmentStart = currentDist / totalLength;
            const segmentEnd = (currentDist + segmentLength) / totalLength;
            currentDist += segmentLength;
            
            if (pulsePosition >= segmentStart && pulsePosition <= segmentEnd) {
              const segmentPos = (pulsePosition - segmentStart) / (segmentEnd - segmentStart);
              const pulseX = prevPoint.x + dx * segmentPos;
              const pulseY = prevPoint.y + dy * segmentPos;
              
              // Draw pulse
              ctx.fillStyle = circuit.color;
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
              ctx.fill();
              
              // Draw glow effect
              const glowGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 15);
              glowGradient.addColorStop(0, 'rgba(44, 171, 226, 0.5)');
              glowGradient.addColorStop(1, 'rgba(44, 171, 226, 0)');
              
              ctx.fillStyle = glowGradient;
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 15, 0, Math.PI * 2);
              ctx.fill();
              
              break;
            }
          }
        }
      });
      
      // Draw the neural network in background
      // Draw NN connections first
      for (let i = 0; i < nnNodes.length; i++) {
        const node1 = nnNodes[i];
        
        // Only connect to nodes in the next layer
        if (node1.layerIndex < nnLayerCount - 1) {
          for (let j = 0; j < nnNodes.length; j++) {
            const node2 = nnNodes[j];
            
            if (node2.layerIndex === node1.layerIndex + 1) {
              // Calculate connection strength (simulate neural network activity)
              const time = Date.now() * 0.001;
              const activity = 0.3 + 0.5 * Math.sin(time * 2 + i * 0.7 + j * 0.5) * Math.sin(time * 1.3);
              
              // Determine connection opacity based on activity
              const opacity = Math.max(0.1, activity);
              
              // Draw connection
              ctx.strokeStyle = `rgba(44, 171, 226, ${opacity * 0.3})`;
              ctx.lineWidth = opacity * 1.5;
              ctx.beginPath();
              ctx.moveTo(node1.x, node1.y);
              ctx.lineTo(node2.x, node2.y);
              ctx.stroke();
              
              // Draw data pulse moving along connection
              const pulseTime = (time + i * 0.05 + j * 0.1) % 1;
              const pulseX = node1.x + (node2.x - node1.x) * pulseTime;
              const pulseY = node1.y + (node2.y - node1.y) * pulseTime;
              
              if (activity > 0.5 && Math.random() > 0.7) {
                ctx.fillStyle = 'rgba(44, 171, 226, 0.8)';
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }
      
      // Then draw the nodes
      nnNodes.forEach(node => {
        // Calculate node pulse effect
        const pulse = 0.8 + 0.2 * Math.sin(time * 2 + node.pulsePhase);
        const nodeRadius = node.radius * pulse;
        
        // Draw node glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius * 3);
        glowGradient.addColorStop(0, 'rgba(44, 171, 226, 0.3)');
        glowGradient.addColorStop(1, 'rgba(44, 171, 226, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node
        if (node.highlighted) {
          ctx.fillStyle = 'rgba(44, 171, 226, 0.9)';
        } else {
          ctx.fillStyle = 'rgba(44, 171, 226, 0.5)';
        }
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Update particles
      particles.forEach(p => {
        // Rotation effect
        const rotationSpeed = 0.1;
        const cos = Math.cos(rotationSpeed * time);
        const sin = Math.sin(rotationSpeed * time);
        
        // Apply rotation to original coordinates
        const rotatedX = cos * (p.originalX - centerX) + sin * (p.originalZ) + centerX;
        const rotatedZ = -sin * (p.originalX - centerX) + cos * (p.originalZ);
        
        p.x = rotatedX;
        p.z = rotatedZ;
        
        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (p.z / globeRadius + 1), 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections
      connections.forEach(conn => {
        const p1 = particles[conn.from];
        const p2 = particles[conn.to];
        
        // Only draw connections for visible particles
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
      
      // Add hexagonal grid elements
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
      
      // Add data stream effect
      const streamCount = 10;
      for (let i = 0; i < streamCount; i++) {
        const angle = (i / streamCount) * Math.PI * 2;
        const startRadius = globeRadius * 1.1;
        const endRadius = globeRadius * 1.6;
        const startX = centerX + Math.cos(angle) * startRadius;
        const startY = centerY + Math.sin(angle) * startRadius;
        const endX = centerX + Math.cos(angle) * endRadius;
        const endY = centerY + Math.sin(angle) * endRadius;
        
        // Create gradient for the stream
        const streamGradient = ctx.createLinearGradient(startX, startY, endX, endY);
        streamGradient.addColorStop(0, 'rgba(44, 171, 226, 0.8)');
        streamGradient.addColorStop(1, 'rgba(44, 171, 226, 0)');
        
        ctx.strokeStyle = streamGradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Add pulse effect
        const pulseTime = (time * 0.5 + i / streamCount) % 1;
        const pulseX = startX + (endX - startX) * pulseTime;
        const pulseY = startY + (endY - startY) * pulseTime;
        const pulseRadius = 2 * (1 - pulseTime);
        
        ctx.fillStyle = 'rgba(44, 171, 226, 0.8)';
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw robotic elements
      robotElements.forEach(element => {
        if (element.type === 'gear') {
          // Update gear rotation
          element.rotation += element.rotationSpeed * 0.02;
          
          // Draw gear
          ctx.strokeStyle = 'rgba(44, 171, 226, 0.8)';
          ctx.lineWidth = 2;
          
          // Draw gear outer circle
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw gear inner circle
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.size * 0.6, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw gear teeth
          for (let i = 0; i < element.teeth; i++) {
            const angle = (i / element.teeth) * Math.PI * 2 + element.rotation;
            const innerRadius = element.size * 0.8;
            const outerRadius = element.size * 1.2;
            
            const innerX = element.x + Math.cos(angle) * innerRadius;
            const innerY = element.y + Math.sin(angle) * innerRadius;
            const outerX = element.x + Math.cos(angle) * outerRadius;
            const outerY = element.y + Math.sin(angle) * outerRadius;
            
            ctx.beginPath();
            ctx.moveTo(innerX, innerY);
            ctx.lineTo(outerX, outerY);
            ctx.stroke();
          }
          
          // Draw cross in center
          const crossSize = element.size * 0.4;
          ctx.beginPath();
          ctx.moveTo(element.x - crossSize, element.y);
          ctx.lineTo(element.x + crossSize, element.y);
          ctx.moveTo(element.x, element.y - crossSize);
          ctx.lineTo(element.x, element.y + crossSize);
          ctx.stroke();
          
        } else if (element.type === 'chip') {
          // Calculate pulsing effect
          const pulse = 0.8 + 0.2 * Math.sin(time * 2 + element.pulsePhase);
          
          // Draw chip
          ctx.save();
          ctx.translate(element.x, element.y);
          ctx.rotate(element.rotation);
          
          // Chip outline
          ctx.strokeStyle = 'rgba(44, 171, 226, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.rect(-element.size/2, -element.size/2, element.size, element.size);
          ctx.stroke();
          
          // Circuit patterns inside chip
          const gridSize = 4;
          const cellSize = element.size / gridSize;
          
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              const cellX = -element.size/2 + i * cellSize;
              const cellY = -element.size/2 + j * cellSize;
              
              // Only draw some cells
              if ((i + j) % 2 === 0) {
                ctx.strokeStyle = `rgba(44, 171, 226, ${0.4 * pulse})`;
                ctx.beginPath();
                
                // Draw different circuit patterns
                if ((i + j) % 4 === 0) {
                  // Horizontal lines
                  for (let k = 1; k < 3; k++) {
                    ctx.moveTo(cellX, cellY + cellSize * k/3);
                    ctx.lineTo(cellX + cellSize, cellY + cellSize * k/3);
                  }
                } else {
                  // Vertical lines
                  for (let k = 1; k < 3; k++) {
                    ctx.moveTo(cellX + cellSize * k/3, cellY);
                    ctx.lineTo(cellX + cellSize * k/3, cellY + cellSize);
                  }
                }
                
                ctx.stroke();
              }
            }
          }
          
          // Add connection pins to edges
          const pinCount = 3;
          const pinSize = element.size / 20;
          const pinLength = element.size / 8;
          
          ctx.fillStyle = 'rgba(44, 171, 226, 0.8)';
          
          // Top and bottom pins
          for (let i = 1; i <= pinCount; i++) {
            const pinX = -element.size/2 + element.size * i/(pinCount+1);
            
            // Top pin
            ctx.fillRect(pinX - pinSize/2, -element.size/2 - pinLength, pinSize, pinLength);
            
            // Bottom pin
            ctx.fillRect(pinX - pinSize/2, element.size/2, pinSize, pinLength);
          }
          
          // Left and right pins
          for (let i = 1; i <= pinCount; i++) {
            const pinY = -element.size/2 + element.size * i/(pinCount+1);
            
            // Left pin
            ctx.fillRect(-element.size/2 - pinLength, pinY - pinSize/2, pinLength, pinSize);
            
            // Right pin
            ctx.fillRect(element.size/2, pinY - pinSize/2, pinLength, pinSize);
          }
          
          ctx.restore();
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
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
            As a premier student-led organization, we bridge cutting-edge research with practical applications
            in artificial intelligence, machine learning, and computational intelligence. Explore our events,
            join specialized technical teams, and collaborate with peers to shape the future of intelligent systems.
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