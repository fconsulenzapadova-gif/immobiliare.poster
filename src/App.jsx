import React, { useState } from 'react';
import { PosterForm } from './components/PosterForm';
import { PosterPreview } from './components/PosterPreview';
import { Download, Layout } from 'lucide-react';
import { generatePDF } from './utils/pdfExport';

function App() {
    const [data, setData] = useState({
        title: 'ZONA NAZARETH', // Acts as Zone/Title
        price: '600.000',
        type: 'sale',
        image: null,
        imagePreview: null,
        description: 'A pochi passi dal centro storico proponiamo in vendita Abitazione nuova con ingresso indipendente, finiture di pregio a scelta, tre camere, studio, tre bagni e taverna, terrazza nella zona giorno.\nGarage ampio e posto auto',
        features: '250 mq | 3 Camere +1 | 3 Bagni',
        energyClass: 'Classe B - ipe 60,22',
        reference: 'Rif. 517'
    });

    const handleExport = async () => {
        try {
            await generatePDF('poster-preview');
        } catch (error) {
            console.error('Export failed:', error);
            alert(`Errore durante l'esportazione del PDF: ${error.message}`);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar / Editor */}
            <div className="w-[400px] flex-shrink-0 bg-[#242424] border-r border-[#333] flex flex-col h-full z-10 shadow-xl">
                <div className="p-6 border-b border-[#333] flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Layout className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">PosterGen</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <PosterForm data={data} onChange={setData} />
                </div>

                <div className="p-6 border-t border-[#333] bg-[#1f1f1f]">
                    <button
                        onClick={handleExport}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                    >
                        <Download className="w-5 h-5" />
                        Esporta PDF A3
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-gray-200 p-8 overflow-auto flex items-center justify-center relative isolation-auto">
                {/* Dot pattern opacity increased for visibility */}
                <div className="absolute inset-0 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
                {/* Shadow increased for contrast */}
                <div className="shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <PosterPreview data={data} id="poster-preview" />
                </div>
            </div>
        </div>
    );
}

export default App;
