


import styles from './InputBox.module.css'

interface InputBoxProps {
    id: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    labelText: string,
    value: number|string,
    type?: any,
}

export const Inputbox = ({ id, onChange, labelText, value, type }: InputBoxProps) => {
    return (
        <>

            <div className={styles.InputBox}>
                <label htmlFor={id}>{labelText}</label>
                <input id={id} type={type} value={value} onChange={onChange} />
            </div>

        </>
    )
}