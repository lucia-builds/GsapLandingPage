import { ReactLenis } from 'lenis/react';
import Projects from './components/Projects.jsx';
export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <main>
        <Projects />

        <div style={{ height: '100vh' }} />
      </main>
    </ReactLenis>
  );
}