import Button from "@/app/components/Button";
import TextareaElement from "@/app/components/Textarea";
import FileUpload from "@/app/components/FileUpload";
import {Input} from "@/app/components/Input";
import InputElementWithAddon from "@/app/components/InputElementWithAddon";

const AddProduct = () => {
    return <div className={'flex py-4 justify-between'}>
        <div className={'basis-1/3'}>
            <Input inputSizing={'md'} labelValue={'Назва товару'}/>
            <Input inputSizing={'md'} labelValue={'Артикул'}/>
            <InputElementWithAddon addon={"₴"} placeholder={'Наприклад: 100.0, 5300'} label={"Ціна"}/>
        </div>
        <div className={'justify-self-end basis-1/2'}>
            <FileUpload />
            <TextareaElement />
        </div>
    </div>
}

export default AddProduct;