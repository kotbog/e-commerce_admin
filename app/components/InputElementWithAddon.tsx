'use client';

import { Label, TextInput } from 'flowbite-react';

type InputElementWithAddonProps = {
    addon: string,
    placeholder: string,
    label?: string
}

export default function InputElementWithAddon({addon, placeholder, label}:InputElementWithAddonProps) {
    return (
        <div className="max-w-md">
            {label ?
                <div className="mb-2 block">
                    <Label
                        htmlFor="input"
                        value={label}
                    />
                </div>
                : null
            }

            <TextInput
                addon={addon}
                id="input"
                placeholder={placeholder}
                required
            />
        </div>
    )
}