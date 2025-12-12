import React, { useEffect, useRef, useMemo } from 'react';
import { DiaryEntry } from '../types';

interface FishProps {
  entry: DiaryEntry;
  onHover: (entry: DiaryEntry) => void;
  onLeave: () => void;
  containerDimensions: { width: number; height: number };
}

export const Fish: React.FC<FishProps> = ({ entry, onHover, onLeave, containerDimensions }) => {
  // Refs for physics to avoid re-renders
  const posRef = useRef({ 
    x: Math.random() * containerDimensions.width, 
    y: Math.random() * containerDimensions.height 
  });
  const velRef = useRef({ 
    x: (Math.random() - 0.5) * 2, 
    y: (Math.random() - 0.5) * 2 
  });
  const isHoveredRef = useRef(false);
  const fishRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  
  // Dimensions ref to access inside loop
  const dimsRef = useRef(containerDimensions);
  useEffect(() => { dimsRef.current = containerDimensions; }, [containerDimensions]);

  // Characteristics
  const maxSpeed = useMemo(() => 0.8 + Math.random() * 0.8, []); // Slower, more graceful speed
  const size = useMemo(() => 35 + Math.random() * 20, []); // Larger size for better visibility
  const turnSpeed = useMemo(() => 0.02 + Math.random() * 0.02, []);

  const animate = () => {
    // Only animate if element exists
    if (!fishRef.current) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    if (!isHoveredRef.current) {
      const { width, height } = dimsRef.current;
      const pos = posRef.current;
      const vel = velRef.current;
      const margin = 100;

      // Physics: Flocking-lite / Steering Behavior
      
      // 1. Wall Avoidance (Soft Steering)
      if (pos.x < margin) vel.x += turnSpeed;
      if (pos.x > width - margin) vel.x -= turnSpeed;
      if (pos.y < margin) vel.y += turnSpeed;
      if (pos.y > height - margin) vel.y -= turnSpeed;

      // 2. Wander (Organic Randomness)
      const wanderStrength = 0.05;
      vel.x += (Math.random() - 0.5) * wanderStrength;
      vel.y += (Math.random() - 0.5) * wanderStrength;

      // 3. Speed Limit (Normalization)
      const currentSpeed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
      if (currentSpeed > maxSpeed) {
        vel.x = (vel.x / currentSpeed) * maxSpeed;
        vel.y = (vel.y / currentSpeed) * maxSpeed;
      } else if (currentSpeed < maxSpeed * 0.5) {
        // Minimum speed to keep them moving
        vel.x = (vel.x / currentSpeed) * maxSpeed * 0.5;
        vel.y = (vel.y / currentSpeed) * maxSpeed * 0.5;
      }

      // Update Position
      pos.x += vel.x;
      pos.y += vel.y;

      // Calculate Rotation (0 deg is East/Right)
      const rotation = Math.atan2(vel.y, vel.x) * (180 / Math.PI);

      // Direct DOM update for performance
      fishRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotation}deg) scale(1)`;
    } else {
       // While hovered, keep position but scale up
       const pos = posRef.current;
       const vel = velRef.current;
       const rotation = Math.atan2(vel.y, vel.x) * (180 / Math.PI);
       fishRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotation}deg) scale(1.3)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [maxSpeed, turnSpeed]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    onHover(entry);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    onLeave();
  };

  return (
    <div
      ref={fishRef}
      className="absolute cursor-pointer will-change-transform z-10 hover:z-50 mix-blend-screen"
      style={{
        width: size * 2, // 2:1 aspect ratio roughly
        height: size,
        left: 0,
        top: 0,
        // Center the pivot
        marginLeft: -size,
        marginTop: -size / 2,
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full relative" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>
        {/* Organic Fish SVG */}
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
            <defs>
               <linearGradient id={`grad-${entry.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={entry.color_code} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={entry.color_code} stopOpacity="1" />
               </linearGradient>
            </defs>
            
            {/* Body Group: Rotated slightly so default 0deg aligns with velocity vector (Right) */}
            <g>
                {/* Main Body - Smooth tapered shape */}
                <path 
                  d="M 25 25 Q 50 5 95 25 Q 50 45 25 25 Z" 
                  fill={`url(#grad-${entry.id})`}
                />
                
                {/* Tail - Wiggling animation */}
                <g style={{ transformOrigin: '25px 25px' }}>
                    <path 
                      d="M 25 25 Q 15 15 0 10 Q 5 25 0 40 Q 15 35 25 25 Z" 
                      fill={`url(#grad-${entry.id})`}
                      opacity="0.9"
                    />
                    <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        values="-12 25 25; 12 25 25; -12 25 25" 
                        dur={`${0.2 + Math.random() * 0.4}s`} 
                        repeatCount="indefinite" 
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                </g>

                {/* Fins (Pectoral) - Subtle breathing */}
                <g style={{ transformOrigin: '60px 25px' }}>
                    <path d="M 60 25 L 50 10 L 65 20 Z" fill={entry.color_code} opacity="0.6">
                       <animateTransform attributeName="transform" type="rotate" values="0 60 25; 15 60 25; 0 60 25" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M 60 25 L 50 40 L 65 30 Z" fill={entry.color_code} opacity="0.6">
                       <animateTransform attributeName="transform" type="rotate" values="0 60 25; -15 60 25; 0 60 25" dur="1.5s" repeatCount="indefinite" />
                    </path>
                </g>
            </g>
        </svg>
      </div>
    </div>
  );
};