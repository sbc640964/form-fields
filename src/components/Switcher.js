import classes from "./classes";

function Switcher (props)
{
    const {
        checked = true,
        textOn,
        textOff,
        onChange,
    } = props;

    return(
        <label>
            <label className={classes.label}>Switcher</label>
            <div className="flex space-s-3 items-center">
                <span
                    className={`${classes.switcher.wrap[checked ? 'checked' : 'unchecked']} ${classes.switcher.wrap.base}`}
                >
                    <span
                        className={`${classes.switcher.button[checked ? 'checked' : 'unchecked']} ${classes.switcher.button.base}`}
                        onClick={onChange}
                    >

                    </span>
                </span>
                <span className="text-sm">
                    {checked ? textOn : textOff}
                </span>
            </div>
        </label>
    )
}

export default Switcher;