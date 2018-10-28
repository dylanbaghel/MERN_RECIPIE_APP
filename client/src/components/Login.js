import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogin } from './../actions/authAction';

const LoginForm = ({
    errors,
    touched,
    isSubmitting
}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    {errors.error && <p>{errors.error}</p>}
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body">
                            <Form>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className={classnames('form-control', {
                                            'is-invalid': touched.email && errors.email
                                        })}
                                    />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="password"
                                        placeholder="Password"
                                        className={classnames('form-control', {
                                            'is-invalid': touched.password && errors.password
                                        })}
                                    />
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <div className="mb-2">
                                    <Link
                                        to="/signup"
                                        className="text-secondary"
                                    >
                                        No Account? Create One
                                    </Link>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="btn btn-dark"
                                >Login
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Login = withFormik({
    mapPropsToValues() {
        return {
            email: '',
            password: ''
        };
    },
    handleSubmit(values, { props, setSubmitting, setErrors, resetForm }) {
        console.log(values);
        props.startLogin(values).then((d) => {
        }).catch((e) => {
            setErrors({ error: e.data.error });
        });
        setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
    })
})(LoginForm);

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: (user) => dispatch(startLogin(user))
    };
};

export default connect(undefined, mapDispatchToProps)(Login);