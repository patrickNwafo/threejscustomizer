import React from "react";

const DownloadButton = ({ onDownloadImage, onDownloadModel }) => {
    const handleDownloadImageClick = () => {
        onDownloadImage();
    };

    const handleDownloadModelClick = () => {
        onDownloadModel();
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={handleDownloadImageClick}
                className="px-4 py-2 text-white bg-[#A3B18A] rounded"
            >
                Make this
            </button>

        </div>
    );
};

export default DownloadButton;
