interface InputInterface {
    type: string,
    placeholder: string,
    name: string,
    value?: string,
    label?: string
    onChange?: () => void
    size: "sm" | "md" | "lg",
    reference?:any
}

const sizeStyles = {
    sm: "",
    md: "",
    lg: ""
}

const Input = (props: InputInterface) => {
    return (
        <input ref={props.reference}
        className={`${sizeStyles[props.size]} w-full outline-none border border-custom-light-800 rounded-md px-4 py-2 text-zinc-100 `}
        type={props.type} placeholder={props.placeholder} required value={props.value} name={props.name} onChange={props.onChange} />
    )
}

export default Input