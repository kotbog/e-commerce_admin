"use client"
import {Label, Textarea} from "flowbite-react";

const TextareaElement = () => {
    return <div
        className="max-w-md"
        id="textarea"
    >
        <div className="mb-2 block">
            <Label
                htmlFor="description"
                value="Введіть опис"
            />
        </div>
        <Textarea
            id="description"
            placeholder="Залиште опис..."
            required
            rows={4}
            className={'p-3 w-full'}
        />
    </div>
}
export default TextareaElement;