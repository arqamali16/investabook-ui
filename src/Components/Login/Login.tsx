/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * @description Login page
 */

import React, { Component } from 'react'
import { Input, Form, Checkbox, Button, PageHeader, Row, Col } from 'antd'




const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};



/**
 * Class Component to render Login Page
 * @class
 */
class Login extends Component<any> {

  /**
   * Function to handle on submit login credentials
   * @param fieldValues
   */
  onFinish = (fieldValues: object) => {
    this.props.history.push('/home-tax')
  }

  /** Render */
  render() {
    console.log(this.props);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <PageHeader
          style={{ height: '11%' }}
          className="site-page-header"
          title="Investabook"
        />
        <Row style={{ height: '89%' }}>
          <Col span={12}  >
            <div className='image-centre'>
              <img src='src\assests\pngwave (8).png' />
            </div>
          </Col >
          <Col span={12} className='form-centre'>

            <Form
              {...layout}
              name="basic"
              onFinish={this.onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}


export default Login