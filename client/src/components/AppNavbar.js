import React, { Component, Fragment } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavbar extends Component {
	state = {
		isOpen: false
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	}
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { isAuthenticated, user, isAdmin } = this.props.auth;
		const adminLinks = (
			<Fragment>
				<NavItem>
					<span className="navbar-text mr-3">
						<strong>{user ? `Welcome ${user.name}, you are an admin` : ''} </strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);
		const authLinks = (
			<Fragment>
				<NavItem>
					<span className="navbar-text mr-3">
						<strong>{user ? `Welcome ${user.name}` : ''} </strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);

		const guestLinks = (
			<Fragment>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</Fragment>
		);
		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">Reports List</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								{isAdmin && isAuthenticated ? adminLinks : (isAuthenticated ? authLinks : guestLinks)}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);

	}
}

const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps, null)(AppNavbar);