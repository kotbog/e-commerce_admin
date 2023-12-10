"use client"
import Banner from "@/app/components/Banner";
import {Input} from "@/app/components/Input";
import InputElementWithAddon from "@/app/components/InputElementWithAddon";
import Button from "@/app/components/Button";
import FileUpload from "@/app/components/FileUpload";
import TextareaElement from "@/app/components/Textarea";
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";


type ProductEditorProps = {
    name: string,
    article: string,
    price: string | number,
    desc?: string,
    images?: Array<string>
};

const ProductEditor : FC<ProductEditorProps> = ({name, article, price, desc, images}) => {
    const [banner, setBanner] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        SKU: '',
        imgs: null as any | FileList | Array<String>,
        desc: ''
    });


    useEffect(()=>{
        setFormData({
            name: name,
            price: price as string,
            SKU: article,
            imgs: images,
            desc: desc ? desc : ''
        })
    }, []);

    function handleChange ({value, name} : {value: string, name: string}) {
        setFormData({...formData, [name]: value });
    }
    function handleFileEvent(value: FileList | null) {
        setFormData({...formData, imgs: value})
    }
    return <form className={'flex py-4 justify-between'}>
        {banner ? <Banner value={`Товар ${formData.name} був`} linkValue={'доданий'} linkTo={'/products'} handleClose={() => {setBanner(false)} }/> : null}
        <div className={'basis-1/3'}>
            <Input value={formData.name} inputSizing={'md'} labelValue={'Назва товару'} name={'name'} handleChange={handleChange}/>
            <Input value={formData.SKU} inputSizing={'md'} labelValue={'Артикул'} name={'SKU'} handleChange={handleChange}/>
            <InputElementWithAddon value={formData.price} addon={"₴"} placeholder={'Наприклад: 100.0, 5300'} label={"Ціна"} name={"price"} handleChange={handleChange}/>
            <Button color={'primary'} type={'submit'} value={'Зберегти'}/>
        </div>
        <div className={'basis-1/2'}>
            <FileUpload name={"imgs"} handleChange={handleFileEvent}/>
            <div className={'flex items-center'}>
            {
                (Array.isArray(formData.imgs) && formData.imgs.every(item => typeof item === 'string'))
                && formData.imgs.map(img => {
                    return <div className={'w-20'} key={name}>
                        <Image src={img ? img : ""} alt={`${name}-img`} width={50} height={100} className={'object-contain'}/>
                    </div>
                })
            }
            </div>
            <TextareaElement name={'desc'} handleChange={handleChange} value={desc}/>
        </div>
    </form>
}

export default ProductEditor;