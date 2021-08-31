import React, {
    createRef,
    Fragment,
    useContext,
    useReducer,
    useCallback,
    useEffect, useRef
} from "react";

import _ from "lodash";
import {useId} from "../../uses/use-id";

const redusers = {

    toggleOptions: function(){

        /* o debug */ console.log('Action: toggleOptions')
        const [state] = arguments;

        if(state.disabled) return state;
        return {...state, listboxState: !state.listboxState}
    },

    openOptions: function(){

        /* o debug */ console.log('Action: openOptions')
        const [state] = arguments;

        if(state.disabled) return state;
        return {...state, listboxState: true}
    },

    closeOptions: function(){

        /* o debug */ console.log('Action: openOptions')
        const [state] = arguments;

        if(state.disabled) return state;
        return {...state, listboxState: false}
    },

    selectActiveValue: function(state){
        const newValue = state.options[state.activeOptionIndex]?.refData?.current?.value;

        if(newValue){
            state.propsRef.current?.onChange?.(newValue)
            return this.closeOptions(state)
        }

        return state;
    },

    setActiveCurrentValue: function(){

        /* o debug */ console.log('Action: setActiveCurrentValue')
        const [state] = arguments;

        const index = _.findIndex(state.options, v => _.isEqual(v.refData?.current?.value, state.propsRef.current?.value ))

        state.activeOptionIndex = index !== -1 ? index : null;

        return {...state}
    },

    registerOption: function (state, action) {
        return{
            ...state,
            options: [...state.options, { id: action.id, refData: action.refData }],
        }
    },

    unregisterOption: function (state, {id}){
        let nextOptions = state.options.slice()
        let currentActiveOption =
            state.activeOptionIndex !== null ? nextOptions[state.activeOptionIndex] : null

        let idx = nextOptions.findIndex(a => a.id === id)

        if (idx !== -1) nextOptions.splice(idx, 1)

        return {
            ...state,
            options: nextOptions,
            activeOptionIndex: (() => {
                if (idx === state.activeOptionIndex) return null
                if (currentActiveOption === null) return null
                return nextOptions.indexOf(currentActiveOption)
            })(),
        }
    },

    goToOption: function(state, {focus, id}){

        if(focus === 'next' && ( state.activeOptionIndex < (state.options.length - 1) || state.activeOptionIndex === null) ){
            state = this.setActive(state, {index: state.activeOptionIndex !== null ? (state.activeOptionIndex + 1) : 0});
        }

        if(focus === 'prev' && (state.activeOptionIndex > 0 || state.activeOptionIndex === null)){
            state = this.setActive(state, {index: state.activeOptionIndex !== null ? state.activeOptionIndex - 1 : (state.options.length - 1)});
        }

        if(focus === 'specific' && id && state.activeOptionIndex !== id){
            state = this.setActive(state, {index: id});
        }

        return {...state}
    },

    setActive: function (){

        /* o debug */ console.log('Action: setActive')
        const [state, {index}] = arguments;

        return {...state, activeOptionIndex: index}
    }

}

function stateReducer(state, action) {

    if(_.has(redusers, action.type)){
        return redusers[action.type](state, action);
    }

    //not has a type - return error
    new Error('Error: No valid type!!!');

    return state;
}


function useListboxContext(component) {
    let context = useContext(ListboxContext)
    if (context === null) {
        let err = new Error(`<${component} /> is missing a parent <${Listbox.name} /> component.`)
        if (Error.captureStackTrace) Error.captureStackTrace(err, useListboxContext)
        throw err
    }
    return context
}


const ListboxContext = React.createContext(null);


function Listbox({value, onChange, disabled, orientation, children, as})
{
    let reducerBag = useReducer(stateReducer, {
        listboxState: false,
        propsRef: { current: { value, onChange } },
        labelRef: createRef(),
        buttonRef: createRef(),
        optionsRef: createRef(),
        disabled,
        orientation,
        options: [],
        searchQuery: '',
        activeOptionIndex: null,
    });

    let [{ listboxState, propsRef, optionsRef, buttonRef }, dispatch] = reducerBag;

    useEffect(() => {
        function close(e){
            let target = e.target;

            if (listboxState !== true) return

            if (buttonRef.current?.contains(target)) return
            if (optionsRef.current?.contains(target)) return

            dispatch({ type: 'openOptions' })

            // if (!isFocusableElement(target, FocusableMode.Loose)) {
            //     event.preventDefault()
            //     buttonRef.current?.focus()
            // }
        }

        window.addEventListener('mousedown', close);

        return () => window.removeEventListener('mousedown', close)
    }, [])

    useEffect(() => {
        propsRef.current.value = value;
    },[propsRef, value])

    const Tag = as ?? Fragment;

    return (
        <ListboxContext.Provider value={reducerBag}>
            <Tag>
                {children}
            </Tag>
        </ListboxContext.Provider>
    )
}

function Label({as, children, className}){

    const [{labelRef}, dispatch] = useContext(ListboxContext);

    const Tag = as ?? 'label';

    return(
        <Tag
            onClick={() => dispatch({type: 'toggleOptions'})}
            ref={labelRef}
            className={className}
        >
            {children}
        </Tag>
    )
}

function Button(props)
{
    const [{buttonRef, listboxState}, dispatch] = useContext(ListboxContext);

    const Tag = props.as ?? 'button'

    const handleClick = () =>
    {
        if(!listboxState){
            dispatch({type: 'setActiveCurrentValue'})
        }

        dispatch({type: 'toggleOptions'})
    }

    return(
        <Tag
            {...props}
            onClick={handleClick}
            ref={buttonRef}
        />
    );
}

function Options(props)
{
    const [{
        listboxState,
        optionsRef,
        options,
        activeOptionIndex,
        propsRef
    }, dispatch] = useListboxContext('Listbox','Options');

    useEffect(() => {
        let container = optionsRef.current
        if (!container) return
        if (listboxState !== true) return
        if (container === document.activeElement) return

        container.focus({ preventScroll: true })

    },[listboxState, optionsRef])

    if(!listboxState) return null;

    const Tag = props.as ?? 'ul';




    function navigate(e){
        // eslint-disable-next-line default-case
        switch (e.key){
            case 'ArrowUp':
                dispatch({type: 'goToOption', focus: 'prev'})
                break;
            case 'ArrowDown':
                dispatch({type: 'goToOption', focus: 'next'})
                break;
            case 'Enter' :

                const newValue = options[activeOptionIndex]?.refData?.current?.value;

                if(newValue) {
                   propsRef.current?.onChange?.(newValue)
                }

                dispatch({type: 'closeOptions'});

                break;
            case 'Escape' :
                dispatch({type: 'toggleOptions'});
        }
    }

    return(
        <Tag
            {...props}
            ref={optionsRef}
            onKeyDown={navigate}
            tabIndex={0}
            autoFocus={true}
        />
    )
}

function Option(props)
{
    const {disabled = false, value} = props;

    const [{propsRef, activeOptionIndex, options}, dispatch] = useListboxContext('Listbox','Option');
    const id = `listbox-option-${useId()}`

    const handleClick = () =>
    {
        select();
        dispatch({type: 'closeOptions'})
    }

    let active = activeOptionIndex !== null ? options[activeOptionIndex].id === id : false
    let selected = propsRef.current?.value ? _.isEqual(propsRef.current?.value, value) : false;

    const refData = useRef({disabled:disabled, value:value});

    useEffect(() => {
        dispatch({type: 'registerOption', id: id, refData: refData})
        return () => dispatch({type: 'unregisterOption', id: id})
    },[refData, id, dispatch]);

    useEffect(() => {
        refData.current.disabled = disabled;
    },[refData, disabled]);

    useEffect(() => {
        refData.current = {
            ...refData.current,
            value: value,
            textValue: document.getElementById(id)?.textContent?.toLowerCase()
        };
    },[id, refData, value]);

    useEffect(() => {
        if(!active) return;
        if(disabled) return;
        document.getElementById(id)?.scrollIntoView?.({block: 'nearest'});
    },[active, id, disabled, activeOptionIndex])

    let select = useCallback(() => propsRef.current.onChange(value), [propsRef, value])

    const propsToChildren = {
        active:active,
        selected:selected,
        disabled: props.disabled,
        value: props.value
    }

    let newPropsName = _.mapValues(props, v => typeof v === "function" ? v(propsToChildren) : v);

    let newChildren = _.map(props.children, v => typeof v === "function" ? v(propsToChildren) : v)

    const hoverHandle = () => {
        if (disabled) return
        if (active) return
        dispatch({type: 'setActive', index: _.findIndex(options, v => v.id === id)});
    }

    const blurHandle = () => {
        if (disabled) return
        if (!active) return
        dispatch({type: 'setActive', index: null})
    }

    return(
        <li
            {..._.omit(newPropsName, ['children'])}
            onClick={handleClick}
            onMouseMove={hoverHandle}
            onMouseLeave={blurHandle}
            onPointerMove={hoverHandle}
            onPointerLeave={blurHandle}
            tabIndex={-1}
            id={id}
        >
            {newChildren}
        </li>
    )
}

Listbox.Button = Button;
Listbox.Options = Options;
Listbox.Option = Option;
Listbox.Label = Label;

export default Listbox;