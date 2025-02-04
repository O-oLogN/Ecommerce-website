import {REQUEST_MAPPING, REQUEST_PATH} from "routes";

const SignUpTitle = () => {
    return (
        <p className='w-full text-center mt-[40px]'
        >
            New to my website? <a
            className='text-blue-700 hover:text-blue-950'
            href={ 'http://localhost:5173' + REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_UP }
            >
                Sign up
            </a> now
        </p>
    )
}

export default SignUpTitle