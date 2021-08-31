import classes from "./classes";

export function Description({children}){
    return(
        <p className={classes.description}>{children}</p>
    )
}

export function Error({error}){

    const errors = error ? (typeof error === "object" ? error : [error]) : [];

    return(
        <>
            {errors.map((v, i) => (
                <small className={classes.error}>{v}</small>
            ))}
        </>
    )
}