import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme';

const Background = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            <div className={`absolute inset-0 transition-all duration-1000 ${
                theme === 'dark' 
                    ? 'bg-[#0f0a25]' 
                    : 'bg-gradient-to-br from-[#d9b38c] to-[#f0d9b5]'
            }`} />
            
            {theme === 'dark' && (
                <Canvas>
                    <Stars
                        radius={70}
                        depth={70}
                        count={3500}
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.8}
                    />
                    <OrbitControls 
                        enableZoom={false} 
                        autoRotate 
                        autoRotateSpeed={0.2} 
                    />
                </Canvas>
            )}
        </div>
    );
};

export default Background;