import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import users from "../data/users.json";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const user = users.find(
            (u) => u.username === data.username && u.password === data.password
        );
        if (user) {
            login(user);
            toast.success("Logged in successfully");
            navigate("/");
        } else {
            toast.error("Invalid username or password");
        }
    };

    return (
        <div className="container">
            <div className="login-card">
                <h1>Dish Rating App</h1>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label htmlFor="username">
                            Username <span className="red">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            {...register("username", {
                                required: "Username is required"
                            })}
                        />
                        {errors.username && (
                            <span className="error-message">
                                {errors.username.message}
                            </span>
                        )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password">
                            Password <span className="red">*</span>
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && (
                            <span className="error-message">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="btn-container">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
