'use client';

import { FileInput, Label } from 'flowbite-react';
import {useRef} from "react";

type FileUploadProps = {
    name: string,
    handleChange: (value: FileList) => void
};


const FileUpload = ({name, handleChange}: FileUploadProps) => {
    function onHandleFileInputChange() {
        let fileNamesArray = [] as string[];
        if (fileInputRef.current && fileInputRef.current.files) {
            handleChange( fileInputRef.current.files);
        }
    }
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div
            className="max-w-md"
            id="fileUpload"
        >
            <div className="mb-2 block">
                <Label
                    htmlFor={name}
                    value="Оберіть фото"
                />
            </div>
            <FileInput
                id={name}
                onChange={onHandleFileInputChange}
                multiple
                ref={fileInputRef}
            />
        </div>
    )
}
export default FileUpload;