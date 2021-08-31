import {useEffect, useState} from "react";
import {PlusIcon, TrashIcon} from "@heroicons/react/outline";
import {file} from "tailwindcss/lib/cli/colors";
import _ from "lodash";

function UploadImage(props){

    const {
        onChange,
        multiple = false,
    } = props;

    window._ = _;
    const [files, setFiles] = useState([]);
    
    useEffect(() => {
        if(typeof onChange === 'function'){
            onChange(files)
        }
    },[files, onChange])

    function handleChange(e){
        const file = e.target.files[0];

        if(!file) return;

        if(!_.startsWith(file.type, 'image')){
            return alert('There is no permission to upload a file other than an image')
        }

        files.push(file)
        setFiles([...files])
    }

    function remove(index){
        files.splice(index, (index ? index : index+1))
        setFiles([...files])
    }

    const inputProps = _.omit(props, ['onChange', 'multiple'])

    const showAdd = () => {
        if(!files.length) return true;
        return !_.isNumber(multiple) ? multiple : files.length < multiple;
    }

    return(
        <div className="flex flex-wrap gap-4">
            {files && files.map((file, index) => (
                <div
                    className="overflow-hidden w-24 h-24 flex justify-center items-center relative border rounded-lg hover:shadow-md shadow-sm transition cursor-pointer group bg-center bg-cover"
                    key={index}
                    style={{backgroundImage: `url(${URL.createObjectURL(file)})`}}
                >
                    <TrashIcon
                        className="h-8 w-8 opacity-0 hover:opacity-100 group-hover:opacity-60"
                        onClick={() => remove(index)}
                    />
                    <span className="bg-black w-full absolute bottom-0 text-xs text-white text-center bg-opacity-30 p-0.5 truncate">
                        {file.name}
                    </span>
                </div>
                ))}
            {showAdd() &&
            <div className="w-24 h-24 relative border-2 border-dashed hover:bg-gray-50 cursor-pointer group">
                <PlusIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 group-hover:text-gray-400 cursor-pointer"/>
                <input
                    type="file"
                    accept="image/*"
                    {...inputProps}
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                    onChange={handleChange}
                />
            </div>
            }
        </div>
    )
}

export default UploadImage;