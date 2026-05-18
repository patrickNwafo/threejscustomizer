import CustomButton from './CustomButton'

const EXAMPLES = [
    "Bold gym logo: iron barbell with wings, metallic silver on black, vector style",
    "Minimalist lion head lifting weights, geometric lines, black and gold",
    "Fire fist punching upward, neon orange glow, dark background, gym badge",
    "Eagle with spread wings holding a dumbbell, shield shape, military style",
    "Skull wearing a crown made of barbells, streetwear graphic, black and white",
    "Mountain peak with lightning bolt, minimal line art, dark navy palette",
];

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className='aipicker-container' style={{ width: 230, minHeight: 260 }}>
            <p className="picker-label">AI Image Generator</p>
            <textarea
                className='aipicker-textarea'
                placeholder='Describe your design...'
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    💡 Gym logo ideas
                </p>
                <div className="flex flex-col gap-1 max-h-[120px] overflow-y-auto pr-1">
                    {EXAMPLES.map((ex, i) => (
                        <button
                            key={i}
                            onClick={() => setPrompt(ex)}
                            className="text-left text-[10px] text-gray-600 hover:text-gray-900 leading-snug px-2 py-1 rounded-lg hover:bg-black/5 transition-colors"
                        >
                            {ex.length > 60 ? ex.slice(0, 58) + "…" : ex}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap gap-2 pt-1'>
                {generatingImg ? (
                    <CustomButton
                        type="outline"
                        title="Generating..."
                        customStyles="text-xs opacity-60 cursor-not-allowed"
                    />
                ) : (
                    <>
                        <CustomButton
                            type="outline"
                            title="Logo"
                            handleClick={() => handleSubmit('logo')}
                            customStyles="text-xs"
                        />
                        <CustomButton
                            type="filled"
                            title="Full Shirt"
                            handleClick={() => handleSubmit('full')}
                            customStyles="text-xs"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default AIPicker