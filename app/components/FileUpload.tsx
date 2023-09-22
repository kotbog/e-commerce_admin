'use client';

import { FileInput, Label } from 'flowbite-react';

export default function FileUpload() {
    return (
        <div
            className="max-w-md"
            id="fileUpload"
        >
            <div className="mb-2 block">
                <Label
                    htmlFor="file"
                    value="Оберіть фото"
                />
            </div>
            <FileInput
                id="file"
            />
        </div>
    )
}