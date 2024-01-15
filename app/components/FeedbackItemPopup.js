import Popup from "./Popup";

export default function FeedbackItemPopup({title, setShow}) {
    return (
        <Popup title={''} setShow={setShow}> 
            {title}
        </Popup>
    );
}