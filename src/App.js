import Form from './components/Form';
import {useState} from "react";
import _ from "lodash";

const selectOptions = [
    {
        label: 'Simcha',
        value: 1,
    },
    {
        label: 'Chaim',
        value: 2,
    },
    {
        label: 'Moshe',
        value: 3,
    },
    {
        label: 'Israel',
        value: 4,
    },
    {
        label: 'Shimshon',
        value: 5,
    },
];

function App() {

    const [data, setData] = useState({});

    function handleChange(name, value){
        _.set(data, name, value);
        setData(_.cloneDeep(data));
    }

    return (
        <div>
            <div className="mx-auto max-w-2xl border rounded-lg shadow-lg mt-60 bg-white p-4">
                <h1 className="text-2xl font-bold mb-2">Forms Elements</h1>
                <Form.Select
                    value="select.label"
                    options={selectOptions}
                    placeholder="Select a men"
                    onChange={handleChange}
                    label="Select input"
                />
            </div>
        </div>
    );
}

export default App;
