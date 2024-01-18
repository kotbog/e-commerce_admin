'use client'
import {Input} from "@/components/Input";
import {FC, useState} from "react";
import {AuthorizeResponse} from "@/app/types";
import {useRouter} from "next/navigation";
import {Button, Label, TextInput} from "flowbite-react";
import {toast, Toaster} from "react-hot-toast";
import {signIn} from "next-auth/react";
import {AiOutlineLoading} from "react-icons/ai";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    LogInSchema,
    validationLoginSchemaType, validationSchemaType,
} from "@/utils/validators/form_validator";
import {zodResolver} from "@hookform/resolvers/zod";


type LoginFormProps = {
}


const LoginForm : FC<LoginFormProps> = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const showToast = () => toast.error(error, {
        duration: 5000,
        position: 'bottom-center'
    });

    const {register, handleSubmit, formState: {errors}} = useForm<validationLoginSchemaType>({
        resolver: zodResolver(LogInSchema)
    });
    const onSubmit: SubmitHandler<validationLoginSchemaType> = async (data) => {
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: '/'
            });
            console.log(res)
            if (!res?.error) {
                router.push('/');
            } else {
                setError('Invalid email or password');
                showToast();
            }
            setLoading(false);
        }catch (e) {
            setError(e as string);
            showToast();
        }
    }


    return <form onSubmit={handleSubmit(onSubmit)}>
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
            Увійти
        </Button>
        <Toaster/>
    </form>
}

export default LoginForm;