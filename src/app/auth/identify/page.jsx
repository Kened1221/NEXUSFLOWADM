'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { error, success } from '@/components/toast';

const AUTH_ENDPOINT = '/api/auth/identify';
const CONTENT_TYPE_JSON = 'application/json';

function Page() {
    const [iniciando, setIniciando] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIniciando(true);
        try {
            const res = await fetch(AUTH_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': CONTENT_TYPE_JSON },
                body: JSON.stringify({ email: data.email }),
            });

            const resJson = await res.json();

            if (res.status === 200) {
                success(resJson.message);
            } else {
                error(resJson.message);
            }
        } catch (err) {
            error('Ocurrió un error inesperado');
        } finally {
            setIniciando(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-8">
                <div className="relative flex flex-col items-center">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <Image
                            src="/contrasenia.png"
                            alt="Imagen de recuperación de cuenta"
                            width={300}
                            height={300}
                            className="opacity-50 dark:opacity-20 animate-custom-spin"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center mb-12">
                        <h1 className="text-[#3fb5b1] font-bold text-3xl md:text-4xl lg:text-5xl text-center">
                            RECUPERA
                            <br />
                            <span className='bg-gradient-to-b from-[#3fb5b1] to-[#1A1C23] dark:to-white text-transparent bg-clip-text'>
                                TU
                            </span>
                            <br />
                            <span className="text-gray-800 dark:text-white">CUENTA</span>
                        </h1>
                    </div>
                    <div className="relative z-10 mt-16 w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-gray-500 dark:text-white">
                            <Input
                                id='email'
                                label='Correo'
                                placeholder='email.27@unsch.edu.pe'
                                register={register}
                                required={{ value: true, message: 'Ingrese un correo' }}
                                errors={errors}
                            />
                            <Button
                                type='submit'
                                label={iniciando ? 'Enviando ...' : 'Enviar'}
                                icon={iniciando ? ImSpinner : null}
                                iconAnimate='animate-spin'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
