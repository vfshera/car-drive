import React,{useEffect} from 'react'
import { useDispatch , useSelector} from "react-redux";


function Dashboard() {
    const authUser = useSelector((state) => state.authUser);
    const{ auth , loggedInUser , loading} = authUser;

    const findUser = () =>{
        
    }

    useEffect(() => {
        findUser();
        
    }, [])

    return (
        <div>
            <h1>Welcome To The Dashboard { loggedInUser?.name }!</h1>
        </div>
    )
}

export default Dashboard
