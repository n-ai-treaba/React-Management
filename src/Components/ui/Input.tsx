import { ComponentPropsWithoutRef, ReactNode } from "react";

type InputProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"input">;

function Input({ children, ...props }: InputProps) {
  return (
    <div className="control">
      <label>{children}</label>
      <input {...props}></input>
    </div>
  );
}

export default Input;
