import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import { Navbar, NavbarBrand, Row, Col, Container } from 'reactstrap';
import Carriers from '../components/Carriers';
import Countries from '../components/Countries';
import Cost from '../components/Cost';

export default () => {
  return (
    <Fragment>
      <Navbar color="dark">
        <NavbarBrand href="/">Insights Dashboard</NavbarBrand>
      </Navbar>
      <Container>
        <Row>
          <Col xs="6">
            <Carriers title="Inbound by Carrier" label="Amount of Messages" />
          </Col>
          <Col xs="6">
            <Countries title="Inbound by Country" label="Amount of Messages" />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Cost />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
