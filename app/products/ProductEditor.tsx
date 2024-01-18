"use client"
import Banner from "@/components/Banner";
import {Input} from "@/components/Input";
import InputElementWithAddon from "@/components/InputElementWithAddon";
import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import TextareaElement from "@/components/Textarea";
import React, {FC, useEffect, useState, useTransition} from "react";
import Image from "next/image";
import {objToFormData} from "@/utils/ObjToFormData";
import {Dropdown} from "flowbite-react";
import {Category} from "@/app/types";
import ModalWindow from "@/app/products/ModalWindow";
import {revalidatePath, revalidateTag} from "next/cache";
import {useRouter} from "next/navigation";
import {Promise} from "mongoose";


type ProductEditorProps = {
    id: string,
    name: string,
    article: string,
    price: string | number,
    desc?: string,
    imgs?: Array<string>,
    category?: string,
    bannerText: string,
    update: boolean
};


const ProductEditor : FC<ProductEditorProps> = ({
                                                    id, 
                                                    name, 
                                                    article, 
                                                    category, 
                                                    price, 
                                                    desc, 
                                                    imgs, 
                                                    bannerText,
                                                    update
                                                }) => {
    const [banner, setBanner] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        SKU: '',
        imgs: null as any | FileList | Array<String>,
        desc: '',
        category: ''
    });
    const [categories, setCategories] = useState<Array<Category>>()
    const [modal, setModal] = useState(false);
    const[isPending, startTransition] = useTransition();

    const router = useRouter();

    useEffect(()=>{
        setFormData({
            name: name,
            price: price as string,
            SKU: article,
            imgs: imgs,
            desc: desc ? desc : '',
            category: category || ''
        });
        getCategories().then((res) => {
            console.log("res" + res);
            if(res && !res.error) {
                setCategories(res.categories)
            }

        });

    }, [article, category, desc, imgs, name, price]);

    type getCategoriesResponse = {
        error: boolean,
        categories: {} & Array<Category>
    }
    const getCategories = async  () : Promise<getCategoriesResponse | undefined> =>  {
        try {
            const res = await fetch(`http://localhost:4000/category`, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await res.json();
        }catch (e) {
            console.error(e);
        }
    }

    function handleChange ({value, name} : {value: string, name: string}) {
        setFormData({...formData, [name]: value });
    }
    function handleFileEvent(value: FileList | null) {
        setFormData({...formData, imgs: value});
    }
    function handleCategorySelect(category_name : string) {
        setFormData({...formData, category: category_name});
    }

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(formData) {
            const FormData = objToFormData(formData);
           fetch(`http://localhost:4000/product${update ? id : '/'}`,
                {
                    method: update ? "PUT" : "POST",
                    body: FormData,
                    cache:'no-cache'
                }).then((res) => {
                    setBanner(true);
                    alert(res)
               console.log(res)
                    return res;
           }).catch((e) => {alert(e)})
        }
    }

    function handleDelete () {
        fetch(`http://localhost:4000/product/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                router.push('/products/add');
                return res.json();
            })
            .catch(e => {console.error(e)})
    }


    return <form className={'flex py-4 justify-between'} onSubmit={handleSubmit}>
        {banner ? <Banner value={`${formData.name} ${bannerText}`} handleClose={() => {setBanner(false)} }/> : null}
        <ModalWindow showModal={modal} onCloseModal={() => {setModal(false)}}/>
        <div className={'basis-1/3'}>
            <Input value={formData.name} inputSizing={'md'} labelValue={'Назва товару'} name={'name'} handleChange={handleChange}/>
            <Input value={formData.SKU} inputSizing={'md'} labelValue={'Артикул'} name={'SKU'} handleChange={handleChange}/>
            <InputElementWithAddon value={formData.price} addon={"₴"} placeholder={'Наприклад: 100.0, 5300'} label={"Ціна"} name={"price"} handleChange={handleChange}/>
            <div className={'py-3'}>
                <Dropdown label={formData.category ? formData.category : 'Вибір категорії'} placement="right-start">
                    {
                        categories && categories[0]? categories.map(item =>  <Dropdown.Item className={'flex justify-between'} key={item._id} onClick={() => {handleCategorySelect(item.name)}}>{item.name}</Dropdown.Item>) : null
                    }
                    <Dropdown.Item className={'flex justify-between'} onClick={() => {setModal(true)}}>Додати категорію<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div className={'flex justify-between'}>
                <Button color={'primary'} type={'submit'} value={'Зберегти'} />
                {
                    update && <button className={'p-3'} onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                }

            </div>


        </div>
        <div className={'basis-1/2'}>
            <FileUpload name={"imgs"} handleChange={handleFileEvent}/>
            <div className={'flex items-center'}>
                {
                (Array.isArray(formData.imgs) && formData.imgs.every(item => typeof item === 'string'))
                && formData.imgs.map(img => {
                    return <div className={'w-20'} key={name}>
                        <Image src={img ? img : null} alt={`${name}-img`} width={50} height={100} className={'object-contain'}/>
                    </div>
                })
            }
            </div>
            <TextareaElement name={'desc'} handleChange={handleChange} value={desc}/>
        </div>
    </form>
}

export default ProductEditor;