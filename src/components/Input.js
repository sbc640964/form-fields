import classes from "./classes";
/*
this a component to input tag not radio and not checkbox
 */

import BaseInput from "./baseInput";
import {Description, Error} from "./Tolls";

function Input(props){
    return(
        <div>
            <label className={classes.label}>
                {props.label}
                <BaseInput {...props}
                    className={classes.baseInput}
                />
                {props.description &&
                <Description>{props.description}</Description>
                }
                {props.error &&
                    <Error error={props.error}/>
                }
            </label>
        </div>
    )
}

export default Input;