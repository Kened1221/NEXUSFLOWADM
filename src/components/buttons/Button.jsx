'use client';

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    type,
    iconAnimate,
    className,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`
        flex
        items-center
        justify-center
        gap-3
        px-3
        text-sm
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:bg-[#09a9ad]
        dark:hover:bg-[#02cdd2]
        transition
        w-full
        border-0
        ring-inset
        ring-[#FFC736]
        ${outline ? 'bg-transparent' : 'bg-[#02cdd2] dark:bg-[#368f8c]'}
        ${outline ? 'text-[#ce9d20]' : 'text-white'}
        ${outline ? 'ring-1' : 'ring-0'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${className}
      `}
        >
            {Icon && <Icon size={20} className={`${iconAnimate}`} />}
            {label}
        </button>
    );
};

export default Button;