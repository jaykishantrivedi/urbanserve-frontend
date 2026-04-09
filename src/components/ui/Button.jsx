/**
 * Reusable Button component
 *
 * @param {"primary" | "ghost" | "outline" | "danger"} variant
 * @param {"sm" | "md" | "lg"} size
 * @param {boolean} fullWidth
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleSubmit}>Submit</Button>
 * <Button variant="ghost">Cancel</Button>
 * <Button variant="danger" fullWidth>Delete</Button>
 */

const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"

const variants = {
    primary: "text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-sm rounded-xl",
    ghost: "text-gray-700 hover:bg-gray-100 rounded-md",
    outline: "text-blue-600 border border-blue-500 hover:bg-blue-50 rounded-xl",
    danger: "text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-sm rounded-xl",
}

const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-6 text-base",
}

const Button = ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    type = "button",
    disabled = false,
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button