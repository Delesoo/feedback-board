export default function Button(props) {
    return (
        <button 
            {...props} 
            className={"py-1 px-4 rounded-md text-opacity-90 " 
            + (props.primary ? 'bg-red-500 text-white' : 'text-gray-600')}
        />
    );
}