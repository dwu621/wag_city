import { DataContext } from "../components/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dog = () => {
    const { user, authenticated } = useContext( DataContext )
    const { ownerInfo, setOwnerInfo } = useState(null)
    
    const navigate = useNavigate()
    
    const getOwnerInfo = async (id) => {
        console.log(`getting info for ${id}`)
    }

    useEffect(() => {
        if(user) {
            getOwnerInfo(user.id)
        }
    }, [user])

    return (user && user.userType === "Walker") ? (
        <div>{navigate("../jobs")}</div>
    ) : (
        <div>owener</div>
    )
}

export default Dog