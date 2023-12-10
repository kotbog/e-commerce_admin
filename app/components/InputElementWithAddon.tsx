'use client';

import { Label, TextInput } from 'flowbite-react';

type InputElementWithAddonProps = {
    addon: string,
    placeholder: string,
    label?: string,
    name: string,
    value?:string,
    handleChange: ({value, name} : {value: string, name: string}) => void
}

export default function InputElementWithAddon({addon, placeholder, label, name, handleChange, value}:InputElementWithAddonProps) {
    function onTextInputChange(e : React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        handleChange({value, name});
    }

    return (
        <div className="max-w-md">
            {label ?
                <div className="mb-2 block">
                    <Label
                        htmlFor={name}
                        value={label}
                    />
                </div>
                : null
            }

            <TextInput
                addon={addon}
                id={name}
                placeholder={placeholder}
                required
                onChange={onTextInputChange}
                value={value}
            />
        </div>
    )
}