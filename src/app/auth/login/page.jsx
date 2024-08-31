'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { error } from '@/components/toast';

function Page() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const response = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false,
        });

        if (response.ok) {
            router.replace('/dashboard', { scroll: false });
        } else {
            error('Usuario o contraseña incorrectos');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="flex items-center min-h-screen p-4 w-full bg-gray-100 dark:bg-gray-900">
            <div className="flex-1 max-w-5xl mx-auto">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col overflow-hidden md:flex-row">
                    <div className="relative h-32 md:h-auto md:w-1/2">
                        <Image
                            src="/Login.avif"
                            alt="login image"
                            width={500}
                            height={500}
                            className="opacity-50 dark:opacity-20 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex justify-center items-center p-4">
                            <h1 className="text-gray-800 dark:text-white font-bold text-2xl md:text-4xl animate-bounce text-center">
                                BIENVENIDO
                                <br />
                                <span className='bg-gradient-to-b from-[#1A1C23] dark:from-[#FFFFFF] to-[#3fb5b1] dark:to-[#368f8c] text-transparent bg-clip-text leading-normal'>
                                    A
                                </span>
                                <br />
                                <span className="text-[#3fb5b1]">NEXUS FLOW</span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-center sm:p-12 md:w-1/2 p-6">
                        <div className="flex flex-col gap-5 w-full">
                            <h2 className="text-gray-800 dark:text-white font-semibold text-xl text-center">INICIAR SESIÓN</h2>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <Image
                                    src="/Login-incognito.png"
                                    alt="Mascota"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-gray-500 dark:text-white">
                                <Input
                                    id='username'
                                    label='Usuario'
                                    placeholder='Usuario'
                                    register={register}
                                    required={{ value: true, message: 'Ingrese un usuario' }}
                                    errors={errors}
                                />
                                <Input
                                    id='password'
                                    label='Contraseña'
                                    placeholder='••••••••••••'
                                    type='password'
                                    register={register}
                                    required={{ value: true, message: 'Ingrese una contraseña' }}
                                    errors={errors}
                                />
                                <Button
                                    type='submit'
                                    label={isSubmitting ? 'Iniciando ...' : 'Entrar'}
                                    icon={isSubmitting ? ImSpinner : null}
                                    iconAnimate='animate-spin'
                                />
                            </form>
                            <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-5"></div>
                            <Link
                                href="/auth/identify"
                                className="text-sm text-[#368f8c] dark:text-[#00aaff] font-semibold hover:underline hover:text-[#5bd086] dark:hover:text-[#33c1ff]"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
