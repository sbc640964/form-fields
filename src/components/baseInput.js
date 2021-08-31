function BaseInput(props)
{
    const {
        label,
        placholder,
        value,
        onChange,
        description,
        className,
        type = 'text',
    } = props

    return(
        <>
            <input
                {...props}
            />
        </>
    )
}

export default BaseInput;