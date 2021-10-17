import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

const FileUpload = ({ fileInputRef }) => {

    const[file,setFile] = useState()

    return (
        <div className="cardrive-file-upload-wrapper">
            <div className="file-upload min-h-300 w-full rounded-md shadow flex justify-center items-center">
                <div
                    onClick={(e) => fileInputRef.current.click()}
                    className="browse-area border-2  border-dashed rounded-md border-blue-500 h-300 w-full flex justify-center items-center cursor-pointer hover:bg-gray-300"
                >
                    <div className="info flex flex-col justify-center items-center">
                        <input
                            type="file"
                            name="carImage"
                            id="carImage"
                            hidden={true}
                            ref={fileInputRef}
                            onChange={e =>{
                              setFile(e.target.files[0])
                            }}
                        />
                        <i className="ti-cloud mb-2 text-blue-500 text-3xl"></i>
                        <p className="font-bold">{(file == undefined) ? "Browse Files" : file.name}</p>
                        {(file != undefined) && (
                        <p className="file-size">{ file.size} KB</p>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
