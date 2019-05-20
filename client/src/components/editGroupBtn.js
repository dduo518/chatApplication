import React from 'react';
import { connect } from 'react-redux'
import { Button, Dialog, Form, Input, Select } from 'element-react';
import { createGroup } from '../redux/actions'
class AddGroupBtn extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      show: props.isShow,
      selectList: props.selectList
    };
  }
  submit() {
    this.props.createGroup({
      groupName: this.state.groupName,
      members: this.state.selectList
    }).then(() => {
      this.setState({ show: false })
      this.setState({ groupName: '' })
      this.setState({ selectList: [] })
    })
  }
  render() {
      return (
        <div className='btn'>
          <Button
            type='primary'
            icon='plus'
            onClick={() => this.setState({ show: true })}
          ></Button>
            <Dialog
              title='add group'
              visible={this.state.show}
              onCancel={() => this.setState({ show: false })}
            >
              <Dialog.Body>
                <Form model={this.state}>
                  <Form.Item label="GroupName" labelWidth="120">
                  <Input
                    value={this.state.groupName}
                    onChange={(value) => this.setState({ groupName: value })}
                  ></Input>
                  </Form.Item>
                  <Form.Item label="GroupUser" labelWidth="120">
                    <Select
                      value={this.state.selectList}
                      multiple={true}
                      label='selectUser'
                      onChange={(val) => this.setState({ selectList: val })}
                    >
                      {
                        this.props.list.map(el => {
                          return <Select.Option key={el.userId} label={el.userName} value={el.userId} />
                        })
                      }
                    </Select>
                  </Form.Item>
                </Form>
              </Dialog.Body>
              <Dialog.Footer className="dialog-footer">
                <Button type="primary" onClick={this.submit.bind(this)}>submit</Button>
              </Dialog.Footer>
            </Dialog>
        </div>
      )
  }
}

export default connect(
  null,
  { createGroup }
)(AddGroupBtn)