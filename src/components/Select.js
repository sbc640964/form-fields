import {Listbox} from "@headlessui/react";

function Select(props)
{
    const {
        value,
        options,
        placeholder,
        onChange,
        label,
    } = props;

    return(
        <div role="select">
            <Listbox value={value} onChange={onchange}>
                {label &&
                    <Listbox.Label
                        className="block mb-2"
                    >
                        {label}
                    </Listbox.Label>
                }
                <Listbox.Button
                    as={"button"}
                    className="block border border-gray-100 rounded-lg bg-white shadow-sm p-2 pl-3 pr-4"
                >

                </Listbox.Button>
            </Listbox>
        </div>
    )
}

export default Select