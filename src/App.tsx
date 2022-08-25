import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import LoginPage from './pages/Login';
import { AuthenticationResponse } from './services/CognitoService';
import GraphQLApi from './services/GraphQLApi';
import './style.css';

export default function App() {
  const [state, setState] = React.useState({
    token: localStorage.getItem('token'),
  });

  const onSignIn = (authResponse: AuthenticationResponse) => {
    localStorage.setItem(
      'token',
      authResponse.AuthenticationResult.AccessToken
    );
    setState({ token: authResponse.AuthenticationResult.AccessToken });
  };

  return (
    <div>
      {state.token ? (
        <BrowserRouter>
          <Dashboard />{' '}
        </BrowserRouter>
      ) : (
        <LoginPage onSignIn={onSignIn} />
      )}
    </div>
  );
}
