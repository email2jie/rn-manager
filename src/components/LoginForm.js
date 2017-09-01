import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Spinner, Input, Button, Card, CardSection } from './common';

class LoginForm extends Component {
  state = { loading: false, error: '', email: '', password: '' };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch((error) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginFailed(error) {
    this.setState({ loading: false, error: error.message });
  }
  onLoginSuccess() {
    this.setState({ loading: false, error: '', email: '', password: '' });
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return ( 
        <Button onPress={this.onButtonPress.bind(this)}>
          Log In
        </Button>
        )  
}

render() {
  return (
    <Card>
      <CardSection>
        <Input
          secureTextEntry={undefined}
          placeholder="user@gmail.com"
          value={this.state.email}
          label="Email"
          onChangeText={email => this.setState({ email })}
        /> 
      </CardSection>
      <CardSection>
        <Input
          secureTextEntry
          placeholder="password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          label="Password"
        />

    </CardSection>

    <Text style={styles.errorTextStyle}>{this.state.error}</Text>

    <CardSection>
      {this.renderButton()}
    </CardSection>
  </Card>
  )
  }


}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
};

export default LoginForm;
