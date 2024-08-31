import Button from '@/components/buttons/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex items-center min-h-screen p-6 w-full bg-gray-100 dark:bg-gray-900">
            <div className="flex-1 max-w-4xl mx-auto">
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col overflow-hidden md:flex-row">
                    <div className="relative md:w-1/2 min-h-[15rem]">
                        <Image
                            src="/Login.avif"
                            alt="login image"
                            width={600}
                            height={600}
                            className="rounded-l-xl object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-6 p-6 sm:p-12 md:w-1/2">
                        <h2 className="font-bold text-3xl text-center text-gray-800 dark:text-gray-100">
                            BIENVENIDO A
                            <br />
                            <span className="text-[#368f8c]">NEXUS FLOW</span>
                        </h2>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Image
                                src="/Mascota.png"
                                alt="Mascota"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                            <span className="text-black dark:text-gray-300 text-center font-semibold text-xl">
                                Sistema de gestión del estudiante
                            </span>
                            <div className="w-full h-px bg-gray-300 dark:bg-neutral-500 my-2"></div>
                            <Link href="/dashboard" className="w-full">
                                <Button label="Iniciar sesión" />
                            </Link>
                        </div>
                        <div className="w-full h-px bg-gray-300 dark:bg-neutral-500 my-4"></div>
                        <span className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-center">
                            v1.0 - 2024
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
