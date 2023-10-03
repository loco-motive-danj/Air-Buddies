
// import AuthForm from "./components/auth/AuthForm.jsx";
import { useAddCartMutation } from "../reducers/api";
import { useGetCartByIdQuery } from "../reducers/api";

function Cart() {

    const me = useSelector((state) => state.auth.credentials.user);
    const { data, isLoading } = useGetCartByIdQuery(me.userId);
    // const data = useSelector(state=>state.data);
    
    const onSubmit = async()=>{
        await addPost({
            text:"the coolest post ever",
            authorId: me.userId
        }).then(()=>{
            console.log("added");
            // location.reload()
        }).catch(()=>{
            console.log("error")
        })
    }
    const loggedIn = me.userId;

    return (
        <>
        {isLoading ? 
        <h1>Loading...</h1> : loggedIn !== null && data.length!== 0 ? (<button> </button> ): <Link to={"/*"}></Link>}
        </>
    )
            
}