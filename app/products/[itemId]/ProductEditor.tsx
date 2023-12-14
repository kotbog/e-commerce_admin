"use client"
import Banner from "@/app/components/Banner";
import {Input} from "@/app/components/Input";
import InputElementWithAddon from "@/app/components/InputElementWithAddon";
import Button from "@/app/components/Button";
import FileUpload from "@/app/components/FileUpload";
import TextareaElement from "@/app/components/Textarea";
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import {objToFormData} from "@/app/utils/ObjToFormData";
import {Dropdown} from "flowbite-react";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {Category} from "@/app/types";
import ModalWindow from "@/app/products/ModalWindow";


type ProductEditorProps = {
    id: string,
    name: string,
    article: string,
    price: string | number,
    desc?: string,
    imgs?: Array<string>
};

type ProductUpdatesType = {
    name?: string,
    price?: string,
    SKU?: string,
    imgs?: FileList | null,
    desc?: string
}


const ProductEditor : FC<ProductEditorProps> = ({id, name, article, price, desc, imgs}) => {
    const [banner, setBanner] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        SKU: '',
        imgs: null as any | FileList | Array<String>,
        desc: ''
    });
    const [updates, setUpdates] = useState<ProductUpdatesType>();
    const [categories, setCategories] = useState<Array<Category>>()
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        setFormData({
            name: name,
            price: price as string,
            SKU: article,
            imgs: imgs,
            desc: desc ? desc : ''
        });
        fetch(`http://localhost:4000/category`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (res) => {
            setCategories(await res.json());
        }).catch(e => {console.error(e)});

    }, [article, desc, imgs, name, price]);

    function handleChange ({value, name} : {value: string, name: string}) {
        setUpdates({...formData, [name]: value });
        setFormData({...formData, [name]: value });
    }
    function handleFileEvent(value: FileList | null) {
        setUpdates({...formData, imgs: value});
        setFormData({...formData, imgs: value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(updates) {
            const FormData = objToFormData(updates);
            const response = await fetch(`http://localhost:4000/product/${id}`, {
                method: 'PUT',
                body: FormData,
            });
            setBanner(true);
            return await response.json();
        }
        return null;
    }


    return <form className={'flex py-4 justify-between'} onSubmit={handleSubmit}>
        {banner ? <Banner value={`Товар ${formData.name} був змінений`} handleClose={() => {setBanner(false)} }/> : null}
        <ModalWindow showModal={modal} onCloseModal={() => {setModal(false)}}/>
        <div className={'basis-1/3'}>
            <Input value={formData.name} inputSizing={'md'} labelValue={'Назва товару'} name={'name'} handleChange={handleChange}/>
            <Input value={formData.SKU} inputSizing={'md'} labelValue={'Артикул'} name={'SKU'} handleChange={handleChange}/>
            <InputElementWithAddon value={formData.price} addon={"₴"} placeholder={'Наприклад: 100.0, 5300'} label={"Ціна"} name={"price"} handleChange={handleChange}/>
            <div className={'py-3'}>
                <Dropdown label={'category dropdown'} placement="right-start">
                    {
                        categories?.map(item =>  <Dropdown.Item className={'flex justify-between'} key={item._id}>{item.name}</Dropdown.Item>)
                    }
                    <Dropdown.Item className={'flex justify-between'} onClick={() => {setModal(true)}}>Додати категорію<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </Dropdown.Item>
                </Dropdown>
            </div>

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