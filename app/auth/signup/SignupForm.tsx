"use client"
import {FC, useState} from "react";
import {Input} from "@/components/Input";
import {AuthorizeResponse} from "@/app/types";
import {redirect, useRouter} from "next/navigation";
import {SignUpSchema, validationSchemaType} from "@/utils/validators/form_validator";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Label, TextInput} from "flowbite-react";
import {toast, Toaster} from "react-hot-toast";
import Loading from "@/app/loading";
import {AiOutlineLoading} from "react-icons/ai";



type SignupFormProps = {
    handleFormSubmit: (data : validationSchemaType) => Promise<AuthorizeResponse>
}



const SignupForm : FC<SignupFormProps> = ({handleFormSubmit}) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const showToast = () => toast.error(error, {
        duration: 5000,
        position: 'bottom-center'
    });

    const {register, handleSubmit, formState: {errors}} = useForm<validationSchemaType>({
        resolver: zodResolver(SignUpSchema)
    });


    const onSubmit: SubmitHandler<validationSchemaType> = async (data) => {
        setLoading(true);
        const response = await handleFormSubmit(data);
        setLoading(false);
        console.log(response)
        if(response.error) {
            setError(response.message);
            showToast();
        }else {
            router.push('/auth/login');
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={'w-80 m-auto'}>
        <Label htmlFor={'first_name'}>Імя</Label>
        <TextInput
            placeholder={"Ваше ім'я..."}
            type={'text'}
            color={errors.first_name && 'failure'}
            helperText={<>
                <span>{errors.first_name && errors.first_name.message}</span>
            </>}
            {...register('first_name')}
        />
        <Label htmlFor={'last_name'}>Прізвище</Label>
        <TextInput
            placeholder={"Ваше прізвище..."}
            type={'text'}
            color={errors.last_name && 'failure'}
            helperText={<>
                <span>{errors.last_name && errors.last_name.message}</span>
            </>}
            {...register('last_name')}
        />
        <Label htmlFor={'email'}>E-mail</Label>
        <TextInput
            placeholder={"Ваш e-mail..."}
            type={'text'}
            color={errors.email && 'failure'}
            helperText={<>
                <span>{errors.email && errors.email.message}</span>
            </>}
            {...register('email')}
        />
        <Label htmlFor={'password'}>Пароль</Label>
        <TextInput
            placeholder={"Ваш пароль..."}
            type={'password'}
            color={errors.password && 'failure'}
            helperText={<>
                <span>{errors.password && errors.password.message}</span>
            </>}
            {...register('password')}
        />
        <Button type={'submit'} color={'blue'} pill className={'mt-4'} size="md" isProcessing={loading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
            Зареєструватися
        </Button>
        <Toaster/>
    </form>
}

export default SignupForm;