import './LandingPage.css'
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function LandingPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
  
    const loggedSession = useSelector((state) => (state.session.user));
    return (
        "hello"
    )
}

export default LandingPage