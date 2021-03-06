import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  Col,
  Container
} from 'reactstrap';
import Carriers from '../components/Carriers';
import Countries from '../components/Countries';
import Cost from '../components/Cost';
import Demo from '../components/Demo';

export default () => {
  return (
    <Fragment>
      <Navbar color="dark">
        <NavbarBrand href="/">Insights Dashboard</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Demo />
          </NavItem>
        </Nav>
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
            <Cost title="Insight Cost to Date" />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
