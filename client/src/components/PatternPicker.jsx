const SIZE = 128;

const drawPattern = (fn) => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    fn(canvas.getContext("2d"), SIZE);
    return canvas.toDataURL("image/png");
};

const makePatterns = () => [
    {
        name: "Stripes",
        draw: (ctx, s) => {
            ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, s, s);
            ctx.strokeStyle = "#000"; ctx.lineWidth = 8;
            for (let x = -s; x < s * 2; x += 20) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + s, s); ctx.stroke();
            }
        },
    },
    {
        name: "Grid",
        draw: (ctx, s) => {
            ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, s, s);
            ctx.strokeStyle = "#999"; ctx.lineWidth = 1.5;
            for (let i = 0; i <= s; i += 16) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke();
            }
        },
    },
    {
        name: "Dots",
        draw: (ctx, s) => {
            ctx.fillStyle = "#f0f0f0"; ctx.fillRect(0, 0, s, s);
            ctx.fillStyle = "#555";
            for (let x = 8; x < s; x += 16)
                for (let y = 8; y < s; y += 16) {
                    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                }
        },
    },
    {
        name: "Crosshatch",
        draw: (ctx, s) => {
            ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, s, s);
            ctx.strokeStyle = "#666"; ctx.lineWidth = 1.5;
            for (let x = 0; x < s * 2; x += 18) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - s, s); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x - s, 0); ctx.lineTo(x, s); ctx.stroke();
            }
        },
    },
    {
        name: "Camo",
        draw: (ctx, s) => {
            ctx.fillStyle = "#6b7c43"; ctx.fillRect(0, 0, s, s);
            const blobs = [["#4a5728", 5], ["#8a9a5b", 4], ["#2d3a1e", 3]];
            blobs.forEach(([color, count]) => {
                ctx.fillStyle = color;
                for (let i = 0; i < count * 3; i++) {
                    ctx.beginPath();
                    ctx.ellipse(
                        Math.random() * s, Math.random() * s,
                        10 + Math.random() * 20, 8 + Math.random() * 15,
                        Math.random() * Math.PI, 0, Math.PI * 2
                    );
                    ctx.fill();
                }
            });
        },
    },
    {
        name: "Carbon",
        draw: (ctx, s) => {
            ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, 0, s, s);
            const tile = 12;
            for (let row = 0; row * tile < s; row++)
                for (let col = 0; col * tile < s; col++) {
                    const offset = row % 2 === 0 ? 0 : tile / 2;
                    const x = col * tile + offset; const y = row * tile;
                    const g = ctx.createLinearGradient(x, y, x + tile, y + tile);
                    g.addColorStop(0, "#333"); g.addColorStop(1, "#111");
                    ctx.fillStyle = g; ctx.fillRect(x, y, tile - 1, tile - 1);
                }
        },
    },
    {
        name: "Denim",
        draw: (ctx, s) => {
            ctx.fillStyle = "#3a5f8a"; ctx.fillRect(0, 0, s, s);
            ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
            for (let i = 0; i < s; i += 4) {
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke();
            }
        },
    },
    {
        name: "Chevron",
        draw: (ctx, s) => {
            ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, s, s);
            ctx.strokeStyle = "#333"; ctx.lineWidth = 6; ctx.lineJoin = "round";
            for (let y = -24; y < s + 24; y += 24) {
                ctx.beginPath();
                ctx.moveTo(0, y + 12); ctx.lineTo(s / 2, y); ctx.lineTo(s, y + 12);
                ctx.stroke();
            }
        },
    },
];

const PatternPicker = ({ onSelect }) => {
    const patterns = makePatterns();

    return (
        <div className="absolute left-full ml-3 top-0 rounded-xl p-3 w-[220px]"
            style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
        >
            <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">Patterns</p>
            <div className="grid grid-cols-4 gap-2">
                {patterns.map((p) => {
                    const dataURL = drawPattern(p.draw);
                    return (
                        <button
                            key={p.name}
                            title={p.name}
                            onClick={() => onSelect(dataURL)}
                            className="w-11 h-11 rounded-lg border-2 border-transparent hover:border-black overflow-hidden transition-all hover:scale-110"
                            style={{ backgroundImage: `url(${dataURL})`, backgroundSize: "cover" }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PatternPicker;
