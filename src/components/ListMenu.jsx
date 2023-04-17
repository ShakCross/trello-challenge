import { useState, useRef, useEffect } from "react";
import ListMove from "./ListMove";
import "../assets/css/ListMenu.css"

const ListMenu = props => {
    const menuRef = useRef();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleMove, setToggleMove] = useState(false);

    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                document.removeEventListener("mousedown", handleClickOutside);
                setToggleMenu(false);
                setToggleMove(false);
            }
        }
        if (toggleMenu || toggleMove)
            document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuRef, toggleMenu, toggleMove]);

    return (
        <div className="lists__menu" ref={menuRef}>
            <button className="lists__menu-btn" onClick={() => 
                toggleMove ? setToggleMove(!toggleMove) : setToggleMenu(!toggleMenu)
            }>
                <i className="fa-solid fa-bars"></i>
            </button>
            {toggleMenu &&
                <div className="lists__menu-dropdown">
                    <div className="lists__menu-title">
                        <p>List actions</p>
                        <hr></hr>
                    </div>
                    <ul className="lists__menu-dropdown__options">
                        <li onClick={() => {
                                setToggleMenu(!toggleMenu);
                                setToggleMove(!toggleMove);
                        }}>
                            Move list...
                        </li>
                    </ul>
                </div>}
            {toggleMove &&
                <ListMove listId={props.listId} boardId={props.boardId} setToggleMenu={setToggleMenu} setToggleMove={setToggleMove} />
            }
        </div>
    );
}

export default ListMenu;