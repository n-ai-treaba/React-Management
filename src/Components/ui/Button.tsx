import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

type ButtonElProps = {
  children: ReactNode;
  textOnly?: boolean;
  to?: never;
} & ComponentPropsWithoutRef<"button">;

type LinkElProps = {
  to: string;
  children: ReactNode;
  textOnly?: boolean;
} & LinkProps;

type ButtonProps = ButtonElProps | LinkElProps;

function isLinkEl(props: ButtonElProps | LinkElProps): props is LinkElProps {
  return "to" in props;
}

function Button(props: ButtonProps) {
  const { children } = props;

  if (isLinkEl(props)) {
    return (
      <Link
        {...props}
        to={props.to}
        className={props.textOnly ? "button button--text--only" : "button"}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        {...props}
        className={props.textOnly ? "button button--text--only" : "button"}
      >
        {children}
      </button>
    );
  }
}

export default Button;
