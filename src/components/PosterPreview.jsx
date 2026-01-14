import React, { useState } from 'react';

export function PosterPreview({ data, id, onRandomizeBubbles }) {
    // A3 High Res Base Scale
    const width = 1191 * 1.5;
    const height = 842 * 1.5;

    const isSale = data.type === 'sale';
    const typeText = isSale ? 'VENDITA' : 'AFFITTO';

    // Design Color (Teal from image)
    const themeColor = '#17a9bc';

    // Bubble configurations - can be randomized
    const [bubbles, setBubbles] = useState([
        {
            position: 'top-right',
            size: 500,
            color: '#8bd0db',
            translateX: '45%',
            translateY: '-45%'
        },
        {
            position: 'bottom-left',
            size: 600,
            color: '#8bd0db',
            translateX: '-45%',
            translateY: '45%'
        }
    ]);

    // Color palette for bubbles (light blue and complementary tones)
    const bubbleColors = [
        '#8bd0db', // light cyan
        '#a8e6f0', // lighter cyan
        '#6bc4d4', // medium cyan
        '#b8e8f5', // very light blue
        '#9dd9e8', // soft cyan
        '#ffd4a3', // complementary peach
        '#ffe4c4', // complementary light peach
        '#ffc4a3', // complementary orange-peach
    ];

    // Function to generate random bubble configuration
    const randomizeBubbles = () => {
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'left-center', 'right-center'];
        const numBubbles = Math.floor(Math.random() * 2) + 2; // 2-3 bubbles

        const newBubbles = [];
        for (let i = 0; i < numBubbles; i++) {
            const position = positions[Math.floor(Math.random() * positions.length)];
            const size = Math.floor(Math.random() * 400) + 300; // 300-700px
            const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

            let translateX = '0%';
            let translateY = '0%';

            // Calculate translation based on position
            switch (position) {
                case 'top-left':
                    translateX = '-45%';
                    translateY = '-45%';
                    break;
                case 'top-right':
                    translateX = '45%';
                    translateY = '-45%';
                    break;
                case 'bottom-left':
                    translateX = '-45%';
                    translateY = '45%';
                    break;
                case 'bottom-right':
                    translateX = '45%';
                    translateY = '45%';
                    break;
                case 'top-center':
                    translateX = '0%';
                    translateY = '-50%';
                    break;
                case 'bottom-center':
                    translateX = '0%';
                    translateY = '50%';
                    break;
                case 'left-center':
                    translateX = '-50%';
                    translateY = '0%';
                    break;
                case 'right-center':
                    translateX = '50%';
                    translateY = '0%';
                    break;
            }

            newBubbles.push({
                position,
                size,
                color,
                translateX,
                translateY
            });
        }

        setBubbles(newBubbles);
    };

    // Function to reset to standard bubble configuration
    const resetToStandardBubbles = () => {
        setBubbles([
            {
                position: 'top-right',
                size: 500,
                color: '#8bd0db',
                translateX: '45%',
                translateY: '-45%'
            },
            {
                position: 'bottom-left',
                size: 600,
                color: '#8bd0db',
                translateX: '-45%',
                translateY: '45%'
            }
        ]);
    };

    // Expose randomize and reset functions to parent
    React.useEffect(() => {
        if (onRandomizeBubbles) {
            onRandomizeBubbles({ randomize: randomizeBubbles, reset: resetToStandardBubbles });
        }
    }, [onRandomizeBubbles]);

    // Helper function to get position styles
    const getPositionStyle = (position) => {
        const baseStyle = { position: 'absolute' };

        switch (position) {
            case 'top-left':
                return { ...baseStyle, top: 0, left: 0 };
            case 'top-right':
                return { ...baseStyle, top: 0, right: 0 };
            case 'bottom-left':
                return { ...baseStyle, bottom: 0, left: 0 };
            case 'bottom-right':
                return { ...baseStyle, bottom: 0, right: 0 };
            case 'top-center':
                return { ...baseStyle, top: 0, left: '50%' };
            case 'bottom-center':
                return { ...baseStyle, bottom: 0, left: '50%' };
            case 'left-center':
                return { ...baseStyle, top: '50%', left: 0 };
            case 'right-center':
                return { ...baseStyle, top: '50%', right: 0 };
            default:
                return baseStyle;
        }
    };

    return (
        <div className="relative origin-center transition-transform duration-200"
            style={{
                transform: 'scale(0.35)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' // Shadow-2xl equivalent
            }}>

            <div
                id={id}
                className="bg-white text-gray-900 overflow-hidden relative flex flex-col p-0"
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                {/* Decorative Circles - Dynamic and randomizable */}
                {bubbles.map((bubble, index) => (
                    <div
                        key={index}
                        className="absolute rounded-full z-0 transition-all duration-700 ease-in-out"
                        style={{
                            ...getPositionStyle(bubble.position),
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            backgroundColor: bubble.color,
                            transform: `translate(${bubble.translateX}, ${bubble.translateY})`,
                        }}
                    />
                ))}

                {/* Main Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col pb-16" style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '147px' }}>

                    {/* Header Type */}
                    <h1
                        className="font-bold uppercase tracking-tight mb-10"
                        style={{
                            color: '#008ba3',
                            fontSize: '7.475em',
                        }}
                    >
                        {typeText}
                    </h1>

                    <div className="flex flex-1 gap-16 items-start">
                        {/* Left Column: Image */}
                        <div className="w-[55%] h-[667px] relative mt-2" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
                            {data.imagePreview ? (
                                <img
                                    src={data.imagePreview}
                                    alt="Property"
                                    className="w-full h-full object-cover bg-gray-100"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">
                                    <span className="text-3xl font-medium">Foto Immobile</span>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Details - Better spacing/centering */}
                        <div className="w-[45%] flex flex-col items-end text-right" style={{ height: '669px' }}>

                            {/* Zone / Title */}
                            <h2
                                className="font-bold uppercase tracking-wide mb-10 text-center w-full"
                                style={{
                                    color: '#008ba3',
                                    fontSize: '3.335em',
                                    marginTop: '-60px'
                                }}
                            >
                                {data.title || 'ZONA...'}
                            </h2>

                            {/* Features Badge */}
                            <div
                                className="w-full rounded-2xl mb-6 flex items-center justify-center font-bold text-white"
                                style={{
                                    backgroundColor: '#008ba3',
                                    fontSize: '2.3em',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                    lineHeight: '1',
                                    textAlign: 'center',
                                    padding: '1.5rem 2rem',
                                    minHeight: '4.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {(() => {
                                    const roomsNum = parseInt(data.rooms) || 0;
                                    const bathroomsNum = parseInt(data.bathrooms) || 0;
                                    const roomsText = roomsNum === 1 ? 'Camera' : 'Camere';
                                    const bathroomsText = bathroomsNum === 1 ? 'Bagno' : 'Bagni';

                                    if (data.sqm || data.rooms || data.bathrooms) {
                                        return `${data.sqm || '...'} mq | ${data.rooms || '...'} ${roomsText} | ${data.bathrooms || '...'} ${bathroomsText}`;
                                    }
                                    return 'Mq | Camere | Bagni';
                                })()}
                            </div>

                            {/* Description */}
                            <div
                                className="w-full text-left text-gray-700 font-light leading-relaxed whitespace-pre-wrap pl-2 flex-1 overflow-hidden"
                                style={{
                                    fontSize: '2.3em',
                                    marginTop: '40px',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'normal'
                                }}
                            >
                                {data.description || 'Descrizione immobile...'}
                            </div>

                            {/* Footer Details */}
                            <div className="w-full mt-8 flex flex-col items-end gap-3 border-t-2 border-gray-100 pt-3">
                                <div className="w-full flex justify-between items-end">
                                    <div className="text-left">
                                        {/* Reference */}
                                        <div className="text-gray-500 mb-1" style={{ fontSize: '1.84em' }}>
                                            {data.referenceNumber ? `Rif. ${data.referenceNumber}` : 'Rif. ...'}
                                        </div>
                                        {/* Energy Class */}
                                        <div className="text-gray-800 font-medium" style={{ fontSize: '1.725em' }}>
                                            {data.energyClassLetter || data.ipeNumber
                                                ? `Classe ${data.energyClassLetter || '...'} - ipe ${data.ipeNumber || '...'}`
                                                : 'Classe ... - ipe ...'
                                            }
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div
                                        className="font-bold text-black leading-none flex items-baseline gap-2"
                                        style={{ fontSize: '5.2785em' }}
                                    >
                                        <span>€</span>
                                        <span>{data.price || '---'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
