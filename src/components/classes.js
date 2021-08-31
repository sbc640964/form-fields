
const isRtl = document.dir === 'rtl';

const classes = {
    baseInput: 'block border border-gray-300 bg-white transition duration-150 ease-in-out text-sm focus:ring-primary-200 focus:ring-2 focus:border-0 focus:border-primary-300 relative w-full py-2 pl-3 pr-10 text-start bg-white rounded-lg shadow-sm',
    select: 'cursor-default',
    error: 'text-error-600 text-xs',
    description: 'text-gray-500 text-sm',
    label: 'text-gray-800 font-semibold',
    switcher: {
        wrap:{
            base: 'bg-gray-200 h-6 w-11 rounded-full flex items-center cursor-pointer border-2 border-transparent',
            checked: 'bg-primary-600',
            unchecked: 'hover:opacity-80'
        },
        button:{
            base: 'h-5 w-5 bg-white transform transition inline-block rounded-full',
            checked: `${isRtl ? '-' : ''}translate-x-5`,
            unchecked: 'shadow'
        },
    },
};

export default classes;