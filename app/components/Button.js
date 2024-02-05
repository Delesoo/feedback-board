export default function Button(props) {
    const extraClasses = props?.className || '';
    return (
        <button 
            {...props} 
            disabled={props.disabled}
            className={
            "flex items-center gap-2 py-1 px-4 rounded-md text-opacity-90 border shadow-sm "
            + (props.primary ? 'bg-red-500 text-white' : ' text-gray-600')
            + (props.disabled ? ' text-opacity-70 bg-opacity-70 cursor-not-allowed' : ' ')
        } />
    );
}