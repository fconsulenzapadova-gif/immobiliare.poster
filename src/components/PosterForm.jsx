import React from 'react';
import { Upload, X, Euro, Home, Tag, Type as TypeIcon } from 'lucide-react';

export function PosterForm({ data, onChange }) {
    const handleChange = (field, value) => {
        onChange(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size too large. Max 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('imagePreview', reader.result);
            };
            reader.readAsDataURL(file);
            handleChange('image', file);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Type Selection */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#333] rounded-xl">
                <button
                    onClick={() => handleChange('type', 'sale')}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${data.type === 'sale'
                        ? 'bg-[#1a1a1a] text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    VENDITA
                </button>
                <button
                    onClick={() => handleChange('type', 'rent')}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${data.type === 'rent'
                        ? 'bg-[#1a1a1a] text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    AFFITTO
                </button>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    Foto Principale
                </label>
                <div className="relative group">
                    {data.imagePreview ? (
                        <div className="relative h-48 w-full rounded-xl overflow-hidden border border-[#444]">
                            <img
                                src={data.imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => {
                                    handleChange('image', null);
                                    handleChange('imagePreview', null);
                                }}
                                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#444] rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all group">
                            <div className="p-4 bg-[#333] rounded-full mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-400 font-medium">Clicca o trascina una foto qui</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG fino a 5MB</p>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    )}
                </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Home className="w-3 h-3" /> Zona / Titolo
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="Es. ZONA NAZARETH"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Tag className="w-3 h-3" /> Caratteristiche (Badge)
                    </label>
                    <input
                        type="text"
                        value={data.features}
                        onChange={(e) => handleChange('features', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="Es. 250 mq | 3 Camere +1 | 3 Bagni"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <Tag className="w-3 h-3" /> Prezzo
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={data.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                                placeholder="0"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <Euro className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <Tag className="w-3 h-3" /> Rif. Agenzia
                        </label>
                        <input
                            type="text"
                            value={data.reference}
                            onChange={(e) => handleChange('reference', e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                            placeholder="Es. Rif. 517"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <TypeIcon className="w-3 h-3" /> Classe Energetica
                    </label>
                    <input
                        type="text"
                        value={data.energyClass}
                        onChange={(e) => handleChange('energyClass', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                        placeholder="Es. Classe B - ipe 60,22"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <TypeIcon className="w-3 h-3" /> Descrizione
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="w-full h-32 bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none leading-relaxed"
                        placeholder="Descrivi le caratteristiche principali dell'immobile..."
                    />
                </div>
            </div>
        </div>
    );
}
