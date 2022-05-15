import { DataContext } from "../components/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetOwnerDogs } from "../services/UserServices";


const Dog = () => {
    const { user, authenticated } = useContext( DataContext )
    const { ownerDogs, setOwnerDogs } = useState(null)
    
    const navigate = useNavigate()
    
    const handleOwnerInfo = async (id) => {
        const dogs = await GetOwnerDogs(id)
        console.log(dogs)
    }

    useEffect(() => {
        if(user) {
            handleOwnerInfo(user.id)
        }
    }, [user])

    return (user && user.userType === "Walker") ? (
        <div>{navigate("../jobs")}</div>
    ) : (
        <div>owener</div>
    )
}

export default Dog