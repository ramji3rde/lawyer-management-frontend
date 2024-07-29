import React from 'react'
import { Button, Modal, Spin } from 'antd'
import { Form, Col, Row } from 'react-bootstrap'

class MembersModal extends React.Component {

  render() {
    const { visible, handleSubmit, handleCancel, editMode, handleChange, loading, error, MemberDetails } = this.props
    return <>
      <Modal
        title={"Add Firm Members"}
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button onClick={() => this.handleCancel("phone")}>
            Cancel
          </Button>,
          <Button type="primary"
            disabled={loading}
            onClick={handleSubmit}>
            {editMode ? "Update Details" : "Add Member"}
          </Button>,
        ]}
      >
        <Form
          id='myForm'
          className="form"
          ref={form => this.messageForm = form}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={MemberDetails.name}
              placeholder="Name"
              onChange={handleChange} />
            <p className="mt-2" style={{ color: "red" }}>{error.name}</p>
          </Form.Group>
          <Form.Group controlId="Name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={MemberDetails.userName}
              name="userName"
              placeholder="Username"
              onChange={handleChange} />
            <p className="mt-2" style={{ color: "red" }}>{error.userName}</p>
          </Form.Group>
        </Form>

      </Modal>
    </>
  }
}

export default (MembersModal);
