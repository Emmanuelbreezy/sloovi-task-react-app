import React from 'react'
import { Col, Container } from 'react-bootstrap';
import ListTask from '../../components/Home/ListTask';
import DefaultLayout from '../../hoc/Default-Layout';
import { useAppSelector } from '../../redux/store/hook';


const Home = () => {
  const { name } = useAppSelector(state => state.auth.authentication);

 
  return (
    <DefaultLayout>
         <div className="slv-home-container">
            <Container>
                <Col xs={12} lg={4} className="slv-col-home-container">
                   <h3>Welcome, {name ? name : 'Visitor'} </h3>
                    <ListTask />
                </Col>
            </Container>
         </div>
    </DefaultLayout>
  )
}

export default Home;
