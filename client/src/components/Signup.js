import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRegister } from './../actions/authAction';

const SignupForm = ({
    errors,
    touched,
    isSubmitting
}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    {errors.error && <p>{errors.error}</p>}
                    <div className="card">
                        <div className="card-header">
                            Signup
                        </div>
                        <div className="card-body">
                            <Form>
                                <div className="form-group">
                                    <Field 
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        autoComplete="off"
                                        className={classnames('form-control', {
                                            'is-invalid': touched.fullName && errors.fullName
                                        })}
                                    />
                                    <div className="invalid-feedback">{errors.fullName}</div>
                                </div>
                                <div className="form-group">
                                    <Field 
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="off"
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
                                        autoComplete="off"
                                        className={classnames('form-control', {
                                            'is-invalid': touched.password && errors.password
                                        })}
                                    />
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <div className="mb-2">
                                    <Link
                                        to="/login"
                                        className="text-secondary"
                                    >
                                        Already Have An Account?
                                    </Link>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-dark"
                                    disabled={isSubmitting}
                                >Register
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Signup = withFormik({
    mapPropsToValues() {
        return {
            email: '',
            fullName: '',
            password: ''
        };
    },
    handleSubmit(values, { props, setErrors, setSubmitting }) {
        console.log(values);
        props.startRegister(values).then(() => {
            setSubmitting(false);
        }).catch((e) => {
            setErrors({ error: e.data.error });
            setSubmitting(false);
        });
    },
    validationSchema: Yup.object().shape({
        fullName: Yup.string().min(3).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
    })
})(SignupForm);

const mapDispatchToProps = (dispatch) => {
    return {
        startRegister: (user) => dispatch(startRegister(user))
    };
};

export default connect(undefined, mapDispatchToProps)(Signup);