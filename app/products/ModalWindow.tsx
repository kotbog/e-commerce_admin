'use client'
import {Modal} from "flowbite-react";
import {FC, useState} from "react";
import Button from "@/app/components/Button";
import {Input} from "@/app/components/Input";
import Textarea from "@/app/components/Textarea";


type ModalWindowType = {
    showModal: boolean,
    onCloseModal: () => void
}

type ProductCategory = {
    name: string,
    desc: string
}

const ModalWindow : FC<ModalWindowType> = ({showModal, onCloseModal}) => {
    const [category, setCategory] = useState<ProductCategory>({
        name: '',
        desc: ''
    });
    function handleChange ({value, name} : {value: string, name: string}) {
        setCategory({...category, [name]: value });
    }

    const addCategory = () => {
        fetch(`http://localhost:4000/category`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert(`Категорія ${category.name} додана`);
            setCategory({name: '', desc:''});
        }).catch((e) => {console.error(e)})
    }

    return <Modal show={showModal} onClose={onCloseModal}>
        <Modal.Body>
            <Modal.Header>Додати нову категорію</Modal.Header>
            <div>
                <Input inputSizing={"md"} name={"name"} handleChange={handleChange} value={category.name} labelValue={'Назва'} placeholder={'Введіть назву'}/>
                <Textarea name={"desc"} handleChange={handleChange} value={category.desc}/>
                <Button color={'primary'} value={'Додати'} onClick={addCategory}/>
            </div>
        </Modal.Body>
    </Modal>
}

export default ModalWindow;