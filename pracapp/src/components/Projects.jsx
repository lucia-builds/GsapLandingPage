import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const myCustomImages = [
  "https://img.freepik.com/premium-vector/digital-hand-touching-technology-polygonal-wireframe-art_201274-495.jpg?semt=ais_hybrid&w=740&q=80",
  "https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.jpg?s=612x612&w=0&k=20&c=nejA5SuHcN2fAdO7Bkaf9pJrwzyLPBCyOLZgMaslGko=",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVS7Lu_DQtqNwpxoKMjsxoIdxEJcxFZ8QiOA&s",
  "https://img.freepik.com/free-vector/blue-technology-digital-landscape-futuristic-background_1017-24919.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0NnCp_t2mT0lYUU5rzeaN7ZXZ--RDHMYdg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkiZ6mMTeq8MqwLzn4GYGR7jMUTNdyG2zW0A&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRQljjrOyf7i62f5TK6RF9hggPumSlmhaBA&s",
  "https://images.unsplash.com/photo-1773332611514-238856b76198?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNM30onayyr2uJH-FyhHvwYChaneU7gxYpTR8Zk8nBJA&s",
  "https://cit.edu.in/uploads/department/20260122_1116__mage__eneration_simple_compose_01kfj3sj2pfpr900wbacpekb11_1773810451.png",
  "https://imagedelivery.net/B3aR18lLMvcGgAp8NIV2xQ/1cb83695-ada6-4a8c-2be9-88d4947ffe00/public",
  "https://png.pngtree.com/thumb_back/fh260/background/20240716/pngtree-3d-electronic-computer-hardware-technology-motherboard-digital-chip-image_16010809.jpg",
  "https://media.istockphoto.com/id/2186780950/photo/software-engineers-collaborating-on-a-project-analyzing-code-on-computer-monitors-in-office.jpg?b=1&s=1024x1024&w=0&k=20&c=oozrgFNvOsFuXDxDJsneoyzLUuntF5ySKVji8ILqYVA=",
  "https://images.pexels.com/photos/17485039/pexels-photo-17485039/free-photo-of-ipad-iphone-and-macbook-air-as-the-good-companies-for-an-artist.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "../src/assets/pictures/robot2.jpg",
  "../src/assets/pictures/Ai.jpg",
  "../src/assets/pictures/robot.jpg",
  "https://thedatascientist.com/wp-content/uploads/2025/04/PC-tune-up-softwa.jpg",
  "../src/assets/pictures/marketing.jpg",
  "https://www.jainuniversity.ac.in/uploads/blog/mba-marketing-course-details-syllabus-eligibility.webp",
  "../src/assets/pictures/successful.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2H4co1wmUdIRJqdsOUtZYJC5HsO8ZsvUuWg&s"
  
];

export default function Projects() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  useGSAP(() => {
    const rows = rowsRef.current;
    const section = containerRef.current;
    const calculateLayout = () => {
      const isMobile = window.innerWidth < 850;
      const startWidth = isMobile ? 200 : 125;
      const endWidth = isMobile ? 400 : 500;

      const firstRow = rows[0];
      if (!firstRow) return;
      
      firstRow.style.width = `${endWidth}%`;
      const expandedHeight = firstRow.offsetHeight;
      firstRow.style.width = `${startWidth}%`;

      const sectionPadding = 100; 
      const rowGap = window.innerWidth * 0.01; 
      const totalHeight = (expandedHeight * rows.length) + (rowGap * (rows.length - 1)) + sectionPadding;
      
      section.style.height = `${totalHeight}px`;
      return { startWidth, endWidth };
    };

    const { startWidth, endWidth } = calculateLayout();
    window.addEventListener('resize', calculateLayout);
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
      
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="project-row" 
          ref={el => rowsRef.current[rowIndex] = el}
        >
          
          {/*Generate images in a row */}
          {Array.from({ length: 6 }).map((_, colIndex) => {
            
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