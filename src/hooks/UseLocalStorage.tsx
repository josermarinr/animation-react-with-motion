import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const PREFIX = "todo-project-"; //name to idenfiy in localstorage

export default function UseLocalStorage(key: string, initialValue?: any) {
    const prefixedKey = PREFIX + key;
    let history = useHistory()
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);

        if (jsonValue) {
            return JSON.parse(jsonValue);
        } else {
            history.push('/')
        }

        if (typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
