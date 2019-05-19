import React from 'react';
import { connect } from 'react-redux'
import { Dialog, Form, Input, Button } from 'element-react';
import { loginSubmit, logupSubmit } from '../redux/actions'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
    };
  }
  render() {
    return (
      <div>
        <Dialog
          title='chat'
          visible={!this.props.isLogin}
          onCancel={() => this.setState({ dialogVisible: true })}
        >
          <Dialog.Body>
            <Form model={this.state}>
              <Form.Item label="UserName" labelWidth="120">
                <Input value={this.state.userName} onChange={this.onChange.bind(this, 'userName')}></Input>
              </Form.Item>
              <Form.Item label="password" labelWidth="120">
                <Input type='password' value={this.state.passWord} onChange={this.onChange.bind(this, 'passWord')}></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <p>{this.props.userId !== null ? this.props.tip:''}</p>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={this.logup.bind(this)}>logup</Button>
            <Button type="primary" onClick={this.login.bind(this)}>login</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
  login() {
    this.props.loginSubmit({
      userName: this.state.userName,
      passWord: this.state.passWord,
    }).then(() => {
      this.props.history.push('/')
    });
  }
  logup() {
    this.props.logupSubmit({
      userName: this.state.userName,
      passWord: this.state.passWord,
    });
  }
  onChange(key, value) {
    this.setState({[key]:value})
  }
}

export default connect(
  state => ({ appState: state }),
  { loginSubmit, logupSubmit }
)(Login);