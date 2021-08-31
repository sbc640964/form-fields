import {useState} from "react";

let id = 0
function generateId() {
    return ++id
}

export function useId() {
    const [id] = useState(generateId)
    return id
}
