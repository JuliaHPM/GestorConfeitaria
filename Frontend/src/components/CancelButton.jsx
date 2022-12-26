import { Button } from '../styles/components/CancelButton';

export function CancelButton({ text, onClick, ...rest }) {
    return (
        <Button onClick={onClick} type='button' {...rest}>{text}</Button>
    )
}