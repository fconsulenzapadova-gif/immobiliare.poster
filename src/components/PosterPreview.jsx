import React from 'react';

export function PosterPreview({ data, id }) {
    // A3 High Res Base Scale
    const width = 1191 * 1.5;
    const height = 842 * 1.5;

    const isSale = data.type === 'sale';
    const typeText = isSale ? 'VENDITA' : 'AFFITTO';

    // Design Color (Teal from image)
    const themeColor = '#17a9bc';

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
                {/* Decorative Circles - Resized for better balance */}
                <div
                    className="absolute top-0 right-0 rounded-full z-0"
                    style={{
                        width: '500px',
                        height: '500px',
                        backgroundColor: '#8bd0db',
                        transform: 'translate(45%, -45%)',
                    }}
                />

                <div
                    className="absolute bottom-0 left-0 rounded-full z-0"
                    style={{
                        width: '600px',
                        height: '600px',
                        backgroundColor: '#8bd0db',
                        transform: 'translate(-45%, 45%)',
                    }}
                />

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
                                className="font-bold uppercase tracking-wide mb-3 text-center w-full"
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
                            <div className="w-full mt-8 flex flex-col items-end gap-3 border-t-2 border-gray-100 pt-6">
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
