import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

function MaterialPicker() {
  const snap = useSnapshot(state);

  const materials = [
    { key: 'Material.001', label: 'Wheels' },
    { key: 'Material.002', label: 'Shell' },
    { key: 'Material.003', label: 'Screws' },
    { key: 'Material.007', label: 'Bottom' },
  ];

  const handleMaterialSelect = (materialKey) => {
    state.selectedMaterial = materialKey;
    state.color = state.materials[materialKey]; // Update color picker to selected material's color
  };

  return (
    <div className="flex flex-col">
      {materials.map((material) => (
        <button
          key={material.key}
          onClick={() => handleMaterialSelect(material.key)}
          className={`py-2 px-0 font-serif rounded-none transition-all duration-300 ease-in-out 
            ${snap.selectedMaterial === material.key
              ? 'bg-blue-500 text-white shadow-lg transform scale-105'
              : ' text-black hover:bg-gray-400'
            }`}
        >
          {material.label}
        </button>
      ))}
    </div>
  );
}

export default MaterialPicker;