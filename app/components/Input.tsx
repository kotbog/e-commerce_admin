"use client"
import {Label, TextInput} from "flowbite-react";

type InputProps = {
    labelValue?: string,
    inputSizing: "sm" | "md" | "lg"
}

export function Input ({labelValue, inputSizing}:InputProps)  {
    return <div>
        {labelValue ? <div className="mb-2 block">
            <Label
                htmlFor="input"
                value={labelValue}
            />
        </div> : null}

        <TextInput
            id="input"
            sizing={inputSizing}
            type="text"
        />
    </div>
}