import React from 'react';
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
      </header>
    );
  }
}

export default Header;
