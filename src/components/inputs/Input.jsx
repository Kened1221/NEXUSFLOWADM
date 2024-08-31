'use client';

import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const Input = ({
    id,
    label,
    type = 'text',
    uppercase,
    value,
    defaultValue,
    placeholder,
    disabled,
    register,
    required,
    validate,
    minLength,
    pattern,
    errors,
}) => {
    const [viewPassword, setViewPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                htmlFor={id}
                className={`
        block 
        text-sm
        font-medium
        leading-6
        transition-colors
        duration-300
        ${isFocused || errors[id] ? 'text-[#69c0cf]' : 'text-gray-700 dark:text-white'}
      `}
            >
                {label}
            </label>
            <div className="w-full relative">
                <input
                    id={id}
                    disabled={disabled}
                    {...register(id, { required, validate, minLength, pattern })}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    type={
                        type === 'text' || type === 'number'
                            ? type
                            : viewPassword
                                ? 'text'
                                : 'password'
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`
          block
          w-full
          text-base
          rounded-md
          py-1.5
          px-2
          border-0
          text-black
          dark:text-[#ffffff]
          placeholder:text-neutral-400
          placeholder:dark:text-neutral-500
          ring-inset
          focus:ring-[#8ad9e6]
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id]
                            ? 'ring-red-500'
                            : 'ring-neutral-300 dark:ring-neutral-500'
                        }
          ${disabled ? 'ring-0' : 'ring-1'}
          ${disabled ? 'bg-neutral-200 dark:bg-neutral-800' : 'bg-transparent'}
          ${uppercase ? 'uppercase' : ''}
      `}
                />
                {type === 'password' && (
                    <div
                        onClick={() => setViewPassword(!viewPassword)}
                        className="absolute right-2 top-2 cursor-pointer text-xl"
                    >
                        {viewPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </div>
                )}
            </div>
            {errors[id] && (
                <p className="text-end text-red-500 text-sm">{errors[id].message}</p>
            )}
        </div>
    );
};

export default Input;
