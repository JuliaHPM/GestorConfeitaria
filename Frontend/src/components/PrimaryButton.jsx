import { Button } from "../styles/components/PrimaryButton";

export function PrimaryButton({ label, disabled, type, onClick, icon }) {

    return (
        <>
            <Button disabled={disabled} type={type} onClick={onClick} > {icon && icon}{label}</Button>
        </>
    )
}