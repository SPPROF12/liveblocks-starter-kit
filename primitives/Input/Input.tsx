import clsx from "clsx";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const { className, ...inputProps } = props;

    return (
      <input
        ref={ref}
        className={twMerge(className, "py-2 px-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
        {...inputProps}
      />
    );
  }
);
