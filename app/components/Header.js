'use client';
import { signIn, signOut, useSession } from "next-auth/react"
import Button from "./Button";
import Logout from "./icons/Logout";
import Login from "./icons/Login";

export default function Header() {
    const {data:session} = useSession();
    const isLoggedIn = !!session?.user?.email;
    function logout() {
        signOut();
    }
    function login() {
        signIn('google');
    }
    useSession()
    return (
        <div className="max-w-2xl mx-auto flex gap-4 justify-end p-2 items-center">
            {isLoggedIn && (
                <>
                    <span>
                        Hello, {session.user.name}!
                    </span>
                    <Button className='shadow-md bg-white px-2 py-0' onClick={logout}>Logout <Logout /> </Button>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <span>
                        Not logged in
                    </span>
                    <Button primary={true} className='shadow-md px-2 py-0' onClick={login}>Login <Login /> </Button>
                </>
            )}
        </div>
    )
}