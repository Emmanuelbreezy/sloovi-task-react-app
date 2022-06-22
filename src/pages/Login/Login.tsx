import React from 'react'
import  {useFormik} from 'formik';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import DefaultLayout from '../../hoc/Default-Layout';
import { useSigninUserMutation } from '../../redux/store/services/authenticationApi.services';
import { useAppDispatch } from '../../redux/store/hook';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/store/states/reducerSlice/authenticationSlice';
import { homePathUrl } from '../../routes/constant';
import AlertCustom from '../../components/Alert/Alert';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const  [signinUser, { data, isLoading, isError, error, isSuccess}] = useSigninUserMutation();

    const formik = useFormik({
        initialValues:{   
            email: 'smithwills1989@gmail.com',
            password: '12345678'
        },
       validationSchema: '',
          onSubmit: values => {
            const objData = {
                email: values.email.toLowerCase(),
                password: values.password
            };
            signinUser(objData);
        }
    });

    if(isSuccess){
        dispatch(setUser({
            accessToken: data.results.token,
            companyId: data.results.company_id,
            userId: data.results.user_id,
            name: data.results.name,
            isAuth: data.results.token ? true : false
        }));
        
        navigate(homePathUrl)
        
    }

    
  return (
    <DefaultLayout>
        <div className="slv-login-container">
            <Container>

                <Col xs={12} lg={4} className="slv-col-login-container">
               
                  <Card>
                    <Card.Body>
                    <Form noValidate onSubmit={formik.handleSubmit} className="slv-form-base">
                        <h2>Sign In</h2>
                        
                        {isError && error && <AlertCustom type="danger" message={'Error Occur, Try again'} />}
                        {isSuccess && data && <AlertCustom type="success" message={'Successfully login'} />}

                        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                 autoComplete='off'
                                    name='email'
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.email}
                                 isInvalid={!!formik.errors.email}
                                 disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                autoComplete='off'
                                name='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                isInvalid={!!formik.errors.password}
                                disabled
                            />
                        </Form.Group>
                
                        <Button className={`text-white ${isLoading ? 'disabled': ''}`} type="submit">
                            {isLoading 
                               ? (<div className="d-flex align-items-center justify-content-center">
                                      <Spinner size="sm" animation="border" variant="secondary" />
                                        <span className="ms-1 text-sm"><small>Please Wait...</small></span></div>) 
                                :(<span>Sign In</span>)
                            }
                        </Button>
                    </Form>
                   </Card.Body>
                </Card>
              </Col>
            </Container>
        </div>
    </DefaultLayout>
  )
}


export default Login;