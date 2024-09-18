import { useState } from 'react';

const DownloadModal = ({ onDownloadImage, onDownloadModel, closeModal }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 space-y-4 w-[300px]">
                <h2 className="text-xl font-bold">Download Options</h2>
                <button
                    className="w-full px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                    onClick={onDownloadImage}
                >
                    Download as Image
                </button>
                <button
                    className="w-full px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
                    onClick={onDownloadModel}
                >
                    Download as 3D Model
                </button>
                <button
                    className="w-full px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DownloadModal;
