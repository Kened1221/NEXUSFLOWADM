'use client';

const Select = ({
    id,
    label,
    text,
    options = [],
    disabled,
    register,
    required,
    errors,
    bgColor,
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                htmlFor={id}
                className={`
        block 
        text-sm
        font-medium
        leading-6
      `}
            >
                {label}
            </label>
            <select
                name={id}
                id={id}
                {...register(id, { required })}
                className={`
        block
        w-full
        text-base
        rounded-md
        py-1.5
        px-2
        border-0
        dark:text-neutral-200
        placeholder:text-neutral-400
        placeholder:dark:text-neutral-500
        ring-inset
        focus:ring-[#FFC736]
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${errors[id] ? 'ring-red-500' : 'ring-neutral-300 dark:ring-neutral-500'
                    }
        ${disabled ? 'ring-0' : 'ring-1'}
        ${disabled ? 'bg-neutral-200 dark:bg-neutral-800' : bgColor}
        `}
            >
                <option value={''}>{text}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                        {opt.text}
                    </option>
                ))}
            </select>
            {errors[id] && (
                <p className="text-end text-red-500 text-sm">{errors[id].message}</p>
            )}
        </div>
    );
};

export default Select;