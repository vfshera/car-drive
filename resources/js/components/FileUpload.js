import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

const FileUpload = ({ fileInputRef }) => {
    const [file, setFile] = useState();

    const getFileSize = () => {
        let sizeInKB = Math.round(file.size / 1024);

        if (sizeInKB > 1024) {
            let size = sizeInKB / 1024;

            return size.toFixed(2) + " MB";
        }

        return sizeInKB.toFixed(2) + " KB";
    };

    return (
        <div className="cardrive-file-upload-wrapper">
            <div className="file-upload ">
                <div
                    onClick={(e) => fileInputRef.current.click()}
                    className="browse-area "
                >
                    <div className="info ">
                        <input
                            type="file"
                            name="carImage"
                            id="carImage"
                            hidden={true}
                            ref={fileInputRef}
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                        <i className="ti-cloud-up"></i>
                        <p className="file-name">
                            {file == undefined ? "Choose Image" : file.name}
                        </p>
                        {file != undefined && (
                            <p className="file-size">{getFileSize()} </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
