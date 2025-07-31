import React from 'react';
import { SafeHtml, Image } from '@uniwebcms/core-components';
import { getPageProfile } from '@uniwebcms/module-sdk';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import './style.css';

const FloatingImages = ({ images }) => {
    const [active, setActive] = React.useState(0);

    const animationConfigs = React.useMemo(
        () =>
            images.map(() => {
                const rotate = ((Math.random() * 2 + 3) * (Math.random() < 0.5 ? -1 : 1)).toFixed(
                    2
                ); // -5 to +5 deg
                const scale = (1 + Math.random() * 0.05).toFixed(3); // 1.000 to 1.050
                const type = ['rotate', 'scale', 'rotateScale'][Math.floor(Math.random() * 3)];
                return { type, rotate, scale };
            }),
        [images.length]
    );

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, active]);

    return (
        <div className="relative w-full h-full p-6">
            {images.map((image, index) => {
                const isActive = index === active;
                const { type, rotate, scale } = animationConfigs[index];
                const styleVars = isActive
                    ? {
                          '--tw-rotate-angle': `${rotate}deg`,
                          '--tw-scale-factor': scale,
                          opacity: 1,
                      }
                    : { opacity: 0 };

                let animationName;
                if (type === 'rotate') animationName = 'rotateInOut';
                else if (type === 'scale') animationName = 'scaleInOut';
                else animationName = 'rotateScaleInOut';

                return (
                    <Image
                        key={index}
                        profile={getPageProfile()}
                        {...image}
                        className={`absolute inset-20 w-[calc(100%-160px)] h-[calc(100%-160px)] object-contain ${
                            isActive ? 'z-10' : 'z-0 pointer-events-none'
                        }`}
                        style={{
                            ...styleVars,
                            animationName: isActive ? animationName : undefined,
                            animationDuration: '3000ms',
                            animationTimingFunction: 'ease-in-out',
                            animationFillMode: 'forwards',
                            transition: 'opacity 1000ms ease-in-out',
                            position: 'absolute',
                        }}
                    />
                );
            })}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center justify-center space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActive(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === active
                                    ? 'bg-primary-600 w-8'
                                    : 'w-3 bg-text-color/30 hover:bg-text-color/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function FeatureShowcase(props) {
    const { block } = props;

    const { title, subtitle, paragraphs } = block.getBlockContent();

    const items = block.getBlockItems();

    const features = items.map((item) => item.title);
    const images = items.map((item) => item.images[0]).filter(Boolean);

    return (
        <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content */}
                <div>
                    <h2 className="mt-4 text-4xl font-bold heading-style">{title}</h2>
                    <p className="mt-4 text-lg text-text-color/80">{subtitle}</p>
                    <ul className="mt-8 space-y-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <HiOutlineCheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0 text-primary-600" />
                                <span className="text-lg text-text-color/90">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <SafeHtml
                        value={paragraphs}
                        className="mt-8 text-lg text-text-color/50 italic"
                    />
                </div>

                {/* Right Column: Visual */}
                <div className="w-full">
                    <div className="relative aspect-square">
                        <FloatingImages images={images} />
                    </div>
                </div>
            </div>
        </section>
    );
}
