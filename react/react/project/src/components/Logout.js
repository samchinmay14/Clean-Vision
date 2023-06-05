import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slice';

export default function Logout()
{
    const navigator=useNavigate();
    const dispatch=useDispatch();
    localStorage.clear();
    dispatch(logout());
    navigator("/home");
}