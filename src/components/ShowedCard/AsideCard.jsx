import { useState } from "react"
import MoveCard from "../MoveCard";
import "../../assets/css/Card/AsideCard.css";

const AsideCard = (props) => {
    const [moveCard, setMoveCard] = useState(false)

    return (
        <>  
            <div>
                <div className="card__aside card__aside__options" onClick={() => setMoveCard(true)}>
                    <i className="fa-solid fa-arrow-right fa-lg"></i>
                    <span className=" card__aside__options--title" >Move</span>
                </div>
                {moveCard &&
                    <MoveCard id={props.payload.id} 
                        setMoveCard={setMoveCard} 
                        setCardEdit={setMoveCard} 
                        idList={props.payload.idList} 
                        idBoard={props.payload.idBoard}/>
                }
            </div>
        </>
    )

}

export default AsideCard