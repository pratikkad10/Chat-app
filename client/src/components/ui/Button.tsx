import type { ReactElement } from "react"

interface ButtonInterface {
    variant: "primary" | "secondary" | "danger",
    onClick?: () => void,
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement

}

const variantClasses = {
    primary: "primary bg-custom-purple-600 text-white ",
    secondary: "secondary bg-custom-purple-300 text-custom-purple-600",
    danger: "bg-red-500 hover:bg-red-400 text-white"
}

const sizeClass = {
    sm: "text-sm px-1 py-2 rounded",
    md: "text-md px-4 py-2 rounded-md",
    lg: "text-lg px-6 py-4 rounded-lg"
}

const defaultStyle: string = "flex items-center gap-2 font-light cursor-pointer text-center"

export const Button = (props: ButtonInterface) => {
    return  <button 
    onClick={props.onClick}
    className={`${defaultStyle} ${variantClasses[props.variant]} ${sizeClass[props.size]} `}>
                {props.startIcon}
                {props.text}
                {props.endIcon}
            </button>
}