
import app from '../../services/auth/base'
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../../services/auth/Auth";
import './Login.css';




const Login = ({ history }) => {
    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div className="container">
                <div className="abs-center">
                    <div className="jumbotron col-md-5">
                        <h3>Iniciar sesión</h3>
                        <form onSubmit={handleLogin}>


                            <div className="form-group">
                                <div className="input-icon icon-username"></div>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control mb-4"
                                    placeholder="Correo"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className="input-icon icon-password"></div>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control mb-4"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <button type="submit" className="btn btn-dark btn-lg btn-block">
                                Entrar
                <span></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default withRouter(Login);
