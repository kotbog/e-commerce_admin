import SignupForm from "@/app/auth/signup/SignupForm";
import {AuthorizeResponse} from "@/app/types";
import {validationSchemaType} from "@/utils/validators/form_validator";



async function handleSignupFormSubmit({email, password, first_name, last_name}: validationSchemaType) : Promise<AuthorizeResponse> {
    "use server"
    const response = await fetch(`${process.env.API_URL}/api/signup`, {
        method: "post",
        cache:'no-cache',
        body: JSON.stringify({
            email,
            password,
            first_name,
            last_name
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    return await response.json();
}


const Signup = () => {
    return <div>
        <SignupForm handleFormSubmit={handleSignupFormSubmit}/>
    </div>
}

export default Signup