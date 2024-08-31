import { FaUserCheck } from 'react-icons/fa';
import { TbFaceIdError } from 'react-icons/tb';
import { toast } from 'sonner';

export function error(description) {
    return toast('Error', {
        description: description,
        icon: <TbFaceIdError className="text-2xl text-neutral-200" />,
        duration: 2000,
        classNames: {
            toast: '!bg-red-500 !border-none',
            title: '!text-neutral-200 !text-xl',
            description: '!text-neutral-300',
        },
    });
}

export function success(description) {
    return toast('Correcto', {
        description: description,
        icon: <FaUserCheck className="text-2xl text-neutral-200" />,
        duration: 2000,
        classNames: {
            toast: '!bg-green-500',
            title: '!text-neutral-200 !text-xl',
            description: '!text-neutral-300',
        },
    });
}
