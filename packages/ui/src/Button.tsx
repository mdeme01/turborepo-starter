export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
    return <button {...props} className="bg-primary rounded-lg p-2 text-white" />
}
