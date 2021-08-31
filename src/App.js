import Form from './components/Form';
import {useState} from "react";
import _ from "lodash";
import Select from "./components/Select/Select";

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
    {
        label: 'Shira',
        value: 6,
    },
    {
        label: 'Shmuel',
        value: 7,
    },
    {
        label: 'Londoner',
        value: 8,
    },
];

function App() {

    const [data, setData] = useState({});
    const [_data, _setData] = useState({});

    function handleChange(name, value){
        _.set(data, name, value);
        setData(_.cloneDeep(data));
    }

    function getData(path, defaultValue = ''){
        return _.get(data, path, defaultValue);
    }

    return (
        <div>
            <div className="mx-auto max-w-2xl border rounded-lg shadow-lg mt-60 bg-white p-4">
                <h1 className="text-2xl font-bold mb-2">Forms Elements</h1>
                {/*<Form.Select*/}
                {/*    value={getData('select')}*/}
                {/*    options={selectOptions}*/}
                {/*    placeholder="Select a men"*/}
                {/*    onChange={(v) => handleChange('select', v)}*/}
                {/*    label="Select input"*/}
                {/*/>*/}

                <Select
                    value={getData('select')}
                    options={selectOptions}
                    placeholder="Select a men"
                    onChange={(v) => handleChange('select', v)}
                    label="Select input"
                />

                <div className="mt-4">
                    <Form.Field
                        type="text"
                        label="Name"
                        placeholder="כתבו פה משהו..."
                    />
                </div>

                <div className="mt-4">
                    <Form.Switcher

                    />
                </div>

                <div className="mt-4">
                    <Form.UploadImage

                    />
                </div>
            </div>
        </div>
    );
}

export default App;
