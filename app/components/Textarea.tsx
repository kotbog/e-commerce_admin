"use client"
import {Label, Textarea} from "flowbite-react";
import {FC, MutableRefObject} from "react";

type TextareaElementProps = {
    name: string,
    handleChange: ({value, name} : {value: string, name: string}) => void
}

const TextareaElement : FC<TextareaElementProps> = ({name, handleChange}) => {
    function onTextareaChange(e : React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        handleChange({name, value});
    }
    return <div
        className="max-w-md"
        id="textarea"
    >
        <div className="mb-2 block">
            <Label
                htmlFor={name}
                value="Введіть опис"
            />
        </div>
        <Textarea
            id="description"
            name={name}
            placeholder="Залиште опис..."
            required
            rows={4}
            className={'p-3 w-full'}
            onChange={onTextareaChange}
        />
    </div>
}
export default TextareaElement;