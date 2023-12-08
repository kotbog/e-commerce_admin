"use client";

import Button from "@/app/components/Button";
import TextareaElement from "@/app/components/Textarea";
import FileUpload from "@/app/components/FileUpload";
import {Input} from "@/app/components/Input";
import InputElementWithAddon from "@/app/components/InputElementWithAddon";
import React, {FC, useState} from "react";

type fileImgType = {
    fieldName: string,
    originalFilename: string,
    path: string,
    size:  number,
    headers: any
}

type objType = {
    [key: string]: string | Array<fileImgType> | null | FileList
}

type AddProductFormProps = {

}
const AddProductForm : FC<AddProductFormProps>  = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        SKU: '',
        imgs: null as any | FileList,
        desc: ''
    })
    function objToFormData(obj : objType) {
        const formData = new FormData();

        Object.entries(obj).forEach(([key, value]) => {
            if(key==="imgs" && value) {
                let i = 0;
                Array.from(value as FileList).map(item => {
                    alert(key + " " + value[i]);
                    formData.append(key, value[i] as string | Blob);
                    i++;
                });
            } else {
                formData.append(key, value as string);
            }
        });

        return formData;
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const FormData = objToFormData(formData);
        const response = await fetch('http://localhost:4000/product/', {
            method: 'POST',
            body: FormData,
        })
        const data = await response.json()
    }
    function handleChange ({value, name} : {value: string, name: string}) {
        setFormData({...formData, [name]: value });
    }
    function handleFileEvent(value: FileList | null) {
        setFormData({...formData, imgs: value})
    }

    return <form className={'flex py-4 justify-between'} onSubmit={handleSubmit}>
        <div className={'basis-1/3'}>
            <Input inputSizing={'md'} labelValue={'Назва товару'} name={'name'} handleChange={handleChange}/>
            <Input inputSizing={'md'} labelValue={'Артикул'} name={'SKU'} handleChange={handleChange}/>
            <InputElementWithAddon addon={"₴"} placeholder={'Наприклад: 100.0, 5300'} label={"Ціна"} name={"price"} handleChange={handleChange}/>
            <button type={'submit'}>send</button>
        </div>
        <div className={'basis-1/2'}>
            <FileUpload name={"imgs"} handleChange={handleFileEvent}/>
            <TextareaElement name={'desc'} handleChange={handleChange}/>
        </div>
    </form>
}

export default AddProductForm;