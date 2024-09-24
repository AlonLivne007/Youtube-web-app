import LoginButton from "./LoginButton";

function LoginForm({ users, onLogin }) {
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
                <div className="form-text text-center">
                    Password must be at least 8 characters long, and contain numbers,
                    english letters and symbols.
                </div>
            </div>
            <LoginButton users = { users } onLogin = { onLogin }></LoginButton>
        </>
    );
}

export default LoginForm;