import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  async getUserName() {
    const theUser = await getUser();
    this.setState({ user: theUser.name, loading: false });
  }

  render() {
    this.getUserName();
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <p>Carregando...</p>
          : (
            <h1 data-testid="header-user-name">{ user }</h1>
          )}
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <br />
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <br />
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
