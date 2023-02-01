import { useNavigate } from "react-router";

const HomePage = () => {
    const navigate = useNavigate()
    return <>
        <button onClick={() => { navigate("/dashboard"); }}>to dashboard</button>
    </>
}

export default HomePage;