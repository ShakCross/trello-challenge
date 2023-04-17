import { useState } from 'react'
import { useAppContext } from "../../context/context";
import cardsAPI from "../../services/cardsAPI";
import "../../assets/css/Card/BodyCard.css";

const BodyCard = (props) => {
    const context = useAppContext();
    const [description, setDescription] = useState(props.payload.desc)
    const [toggleEditDescription, setToggleEditDescription] = useState(false)

    const updateDescription = async () => {
        try {
            const resp = await cardsAPI.updateDesc(description, context.keys, props.payload.id);
            if (resp.status === 200) {
                // update Card in current Card and context
                context.setCards(context.cards.map(card => card.id === props.payload.id ? resp.data : card))
                props.setCurrentCard(resp.data)
            }
        }
        catch (error) {
            console.log(error);
            console.log("error. failed to change description.");
            // reset Description if delete is fail
            setDescription(props.payload.desc)
        }
        setToggleEditDescription(false)
    }



    return (
        <>
            <div className="card__section">
                <div className='card__section__headtitle'>
                    <div className='card__section__headtitle--maintitle'>
                        <i className="fa-solid fa-bars fa-lg" ></i>
                        <h3 className='card__section__headtitle--title'>
                            Description
                        </h3>
                    </div>
                    {/* Button change to text area and reset value of Desc when close with itself */}
                    <button type="button" className="card__section__headtitle--button options--button"
                        onClick={() => { 
                            setToggleEditDescription(!toggleEditDescription);
                            setDescription(props.payload.desc) }}>
                        {toggleEditDescription ? "Cancelar" : props.payload.desc ? "Edit" : "New"}
                    </button>
                </div>

                {toggleEditDescription ?
                    <>
                        <div className="body__input--background" onClick={() => { setToggleEditDescription(false); setDescription(props.payload.desc) }}>
                        </div>
                        < div className='body__input--main'>
                            <textarea className="card__options--textarea" autoFocus
                                value={description} 
                                onChange={event => setDescription(event.target.value)}>
                            </textarea>
                            <button
                                className=" card__section__desc--button options--button"
                                onClick={updateDescription}
                            >
                                Save
                            </button>
                        </div>
                    </>
                    : <p className="card__section--desc">{description}</p>}
            </div>
        </>
    )
}
export default BodyCard