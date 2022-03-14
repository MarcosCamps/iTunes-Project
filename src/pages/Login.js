import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      nameUser: '',
      loading: false,
      redirect: false,
    };

    this.validadeButton = this.validadeButton.bind(this);
    this.clickButtonSave = this.clickButtonSave.bind(this);
  }

  validadeButton(event) {
    this.setState({ nameUser: event.target.value });
    const character = 3;
    if (event.target.value.length >= character) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  async clickButtonSave(event) {
    const { nameUser } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    await createUser({ name: nameUser });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { buttonDisabled, loading, redirect } = this.state;
    return (
      <div className="login" data-testid="page-login">
        { loading
          ? <p>Carregando...</p>
          : (
            <form className="enter">
              <h1>TrybeTunes</h1>
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                onChange={ this.validadeButton }
              />
              <br />
              <button
                data-testid="login-submit-button"
                type="submit"
                name="buttonDisabled"
                onClick={ this.clickButtonSave }
                disabled={ buttonDisabled }
              >
                Entrar
              </button>
            </form>
          )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
