import { useContext, useState, useEffect } from "react"
import { DataContext } from "../components/DataContext"


const Home = () => {
const { user, authenticated } = useContext( DataContext )

    return (user && authenticated)? (
        <div>{user.userType}</div>
    ) : (
        <div>no home</div>
    )
}

export default Home