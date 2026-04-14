import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// ==========================================
// 1. PASTE YOUR SPECIFIC IMAGE URLS HERE
// ==========================================
const myCustomImages = [
  "https://images.unsplash.com/photo-1506744626753-eba7bc3613bb?q=80&w=1000",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000",
  "https://images.unsplash.com/photo-1414235077428-33898bca4b76?q=80&w=1000",
  // Add as many external or local URLs as you want!
];

export default function Projects() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  useGSAP(() => {
    const rows = rowsRef.current;
    const section = containerRef.current;
    
    // Calculate how much space the container needs
    const calculateLayout = () => {
      const isMobile = window.innerWidth < 1024;
      const startWidth = isMobile ? 200 : 125;
      const endWidth = isMobile ? 600 : 500;

      const firstRow = rows[0];
      if (!firstRow) return;
      
      firstRow.style.width = `${endWidth}%`;
      const expandedHeight = firstRow.offsetHeight;
      firstRow.style.width = `${startWidth}%`;

      const sectionPadding = 200; 
      const rowGap = window.innerWidth * 0.02; 
      const totalHeight = (expandedHeight * rows.length) + (rowGap * (rows.length - 1)) + sectionPadding;
      
      section.style.height = `${totalHeight}px`;
      return { startWidth, endWidth };
    };

    const { startWidth, endWidth } = calculateLayout();
    window.addEventListener('resize', calculateLayout);

    // Update width based on scroll progress
    const updateWidths = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      rows.forEach((row) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const absTop = rect.top + scrollY;
        const absBottom = absTop + row.offsetHeight;

        const startAnimate = absTop - vh;
        const endAnimate = absBottom;
        const range = endAnimate - startAnimate;

        let progress = (scrollY - startAnimate) / range;
        progress = Math.max(0, Math.min(1, progress));

        const currentWidth = startWidth + (endWidth - startWidth) * progress;
        row.style.width = `${currentWidth}%`;
      });
    };

    gsap.ticker.add(updateWidths);

    return () => {
      gsap.ticker.remove(updateWidths);
      window.removeEventListener('resize', calculateLayout);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="projects-container">
      
      {/* Generate 10 Rows */}
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="project-row" 
          ref={el => rowsRef.current[rowIndex] = el}
        >
          
          {/* Generate 6 Images per Row */}
          {Array.from({ length: 6 }).map((_, colIndex) => {
            
            // This math ensures we loop through your array continuously 
            // no matter how many images you provided.
            const imageIndex = (rowIndex * 6 + colIndex) % myCustomImages.length;
            const imageUrl = myCustomImages[imageIndex];

            return (
              <div key={colIndex} className="project-card">
                <img 
                  src={imageUrl} 
                  alt={`Project image ${imageIndex + 1}`} 
                  loading="lazy"
                />
              </div>
            );
          })}
          
        </div>
      ))}
    </section>
  );
}