"use client"
import {Label, TextInput} from "flowbite-react";
import {SyntheticEvent, useState} from "react";

type InputProps = {
    labelValue?: string,
    inputSizing: "sm" | "md" | "lg",
    name: string,
    value?: string,
    type?: string,
    placeholder?: string,
    handleChange?: ({value, name} : {value: string, name: string}) => void
}

export function Input ({labelValue, inputSizing, name, handleChange, type, value, placeholder}:InputProps)  {

    function onHandleInputChange(e : React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        handleChange && handleChange({value, name});
    }

    return <>
        {labelValue ? <div className="mb-2 block">
            <Label
                htmlFor={name}
                value={labelValue}
            />
        </div> : null}
        <TextInput
            id={name}
            sizing={inputSizing}
            type={type ? type : 'text'}
            onChange={onHandleInputChange}
            value={value}
            placeholder={placeholder}
        />
    </>
}