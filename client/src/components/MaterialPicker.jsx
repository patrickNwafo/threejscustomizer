import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

function MaterialPicker() {
  const snap = useSnapshot(state);

  const materials = [
    { key: 'Material.009', label: 'Wheels' },
    { key: 'Material.011', label: 'Shell' },
    { key: 'Material.010', label: 'Screws' },
    { key: 'Material.012', label: 'Bottom' },
  ];

  const handleMaterialSelect = (materialKey) => {
    state.selectedMaterial = materialKey;
    state.color = state.materials[materialKey]; // Update color picker to selected material's color
  };

  return (
    <div className="flex flex-row bg-[#A3B18A] p-2 space-x-2">
      {materials.map((material) => (
        <button
          key={material.key}
          onClick={() => handleMaterialSelect(material.key)}
          className={`py-2 px-0 font-serif rounded-none transition-all duration-300 ease-in-out 
            ${snap.selectedMaterial === material.key
              ? ' text-gray-300 shadow-lg transform scale-105'
              : ' text-white'
            }`}
        >
          {material.label}
        </button>
      ))}
    </div>
  );
}

export default MaterialPicker;