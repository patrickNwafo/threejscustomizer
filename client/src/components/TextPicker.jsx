import { useState } from "react";
import CustomButton from "./CustomButton";

const fonts = ["Inter", "serif", "monospace", "cursive", "fantasy"];

const generateTextTexture = (text, font, color, bgColor) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = color;
    ctx.font = `bold 80px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const words = text.split(" ");
    const lineHeight = 90;
    const lines = [];
    let current = "";

    for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width > 440 && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);

    const startY = 256 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
        ctx.fillText(line, 256, startY + i * lineHeight);
    });

    return canvas.toDataURL("image/png");
};

const TextPicker = ({ onApply }) => {
    const [text, setText] = useState("");
    const [font, setFont] = useState("Inter");
    const [textColor, setTextColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");

    const handleApply = (type) => {
        if (!text.trim()) return;
        const dataURL = generateTextTexture(text.trim(), font, textColor, bgColor);
        onApply(type, dataURL);
    };

    return (
        <div
            className="absolute left-full ml-3 top-0 rounded-xl p-3 w-[210px] flex flex-col gap-3"
            style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
        >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Text on Shirt</p>

            <textarea
                className="aipicker-textarea"
                rows={2}
                placeholder="Type your text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <select
                className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-transparent outline-none"
                value={font}
                onChange={(e) => setFont(e.target.value)}
            >
                {fonts.map((f) => (
                    <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
                ))}
            </select>

            <div className="flex items-center gap-3">
                <label className="text-xs text-gray-500">Text</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0"
                />
                <label className="text-xs text-gray-500">BG</label>
                <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0"
                />
            </div>

            <div className="flex gap-2">
                <CustomButton
                    type="outline"
                    title="Logo"
                    handleClick={() => handleApply("logo")}
                    customStyles="text-xs"
                />
                <CustomButton
                    type="filled"
                    title="Full"
                    handleClick={() => handleApply("full")}
                    customStyles="text-xs"
                />
            </div>
        </div>
    );
};

export default TextPicker;
