import {useState} from 'react'
import {Listbox} from "@headlessui/react";
import {SelectorIcon, CheckIcon} from "@heroicons/react/solid";
import _ from 'lodash';

function Select(props)
{
    const {
        value,
        options,
        placeholder,
        onChange,
        label,
        viewSelector,
        multiple,
    } = props;

    const [selected, setSelected] = useState(null);

    const _setSelected = (newSelected) => {

        setSelected(newSelected)

        if( typeof onChange === 'function' ){
            onChange(newSelected)
        }
    }

    return(
        <div role="listbox" className="relative">
            <Listbox value={selected} onChange={_setSelected}>

                {/* show label if define */}
                {label &&
                    <Listbox.Label
                        className="block mb-2"
                    >
                       {label}
                    </Listbox.Label>
                }

                <div>
                    <Listbox.Button
                        className="border border-gray-300 bg-white transition duration-150 ease-in-out text-sm focus:ring-primary-200 focus:ring-2 focus:border-0 focus:border-primary-300
                    relative w-full py-2 pl-3 pr-10 text-start bg-white rounded-lg shadow-sm cursor-default"
                    >
                    <span className={`${value ? '' : 'text-gray-400'}`}>
                        {value !== '' ? (viewSelector ? _.get(value, viewSelector) : value.label) : placeholder ?? 'Select...'}
                    </span>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                    </Listbox.Button>
                </div>
                {/* the list button trigger to open list */}


                <Listbox.Options
                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-gray-300"
                >
                    {options.map((option, index) => (
                        <Listbox.Option
                            key={index}
                            className={({active}) => `${active ? 'text-primary-900 bg-primary-100' : ''} cursor-default select-none relative py-2 ps-10 pe-4`}
                            value={option}
                        >
                        {({active,selected}) => {

                            //const selected = _.isEqual(option, value);

                            return(
                                <>
                              <span
                                  className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                              >
                                {viewSelector ? _.get(option, viewSelector) : option.label}
                              </span>
                                    {selected ? (
                                            <span
                                                className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                                <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                                            </span>
                                        ) : null}
                                </>
                            )
                        }}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default Select