import React, { useState, useEffect, useDispatch, useSelector } from 'react'
import { Form, Row, Col, Button } from "react-bootstrap";
import { message, Modal, Card, Result, notification } from 'antd';
import api from '../../../resources/api'
import AddPerson from '../AddEditContact/AddPersonModal'
import DynamicFeild from '../AddEditMatter/DynamicFeilds/index'
import { connect } from 'react-redux'
import { Collapse } from 'antd';

const { Panel } = Collapse;

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

let res = {}
let customFields = null
let contacts = {}
let optns = null
let editMode = false
let editRes = ""
let customData = []
let clientId = 0
let error = {
  relationship: [""]
}

class AddEditMatter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: "Flat",
      status: "Open",
      client: "",
      relatedContacts: [],
      list: [],
      tasks: [],
      task: [],
      customFields: [{
      }],
      modal: false,
      disable: false
    }

  }
  handleCustom(e) {
    e.persist()
    const { id, value, name } = e.target
    customData[id] = { [name]: value }
  }

  async componentDidMount() {
    const { _id, isOwner, userName } = this.props.user
    api
      .get('/tasks/viewforuser/' + _id)
      .then((res) => {
        this.setState({ list: res.data.data })
      })

    if (this.props.location.pathname === "/manage/Matter/edit") {
      editMode = true;
      editRes = this.props.location.state
    }
    res = await api.get('/user/view/' + _id).then(
      contacts = await api.get('contact/viewforuser/' + _id))


    optns = contacts.data.data.map((value, index) => {
      if (isOwner || userName === value.userName)
        return <option id={index}>{value.firstName}</option>
    })


    customFields = res.data.data.customFields.map((value, index) => {
      return <Form.Group key={index} controlId={index}>
        <Form.Label>{value.name}</Form.Label>
        <Form.Control required={value.required}
          name={value.name} type={value.type}
          onChange={this.handleCustom}
        />
      </Form.Group>
    })
    this.setState({ optns: optns, customFields: customFields })
  }
  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Matter Created!, Continue to add a account'
    });
  };
  openNotificationWithfailure = type => {
    notification[type]({
      message: 'Failure'
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    notification.destroy()


    if ((this.state.matterDescription === "" || this.state.matterDescription === undefined)) {
      return notification.warning({
        message: "Please add a matter description",
      });
    } else if ((this.state.client === "" || this.state.client === undefined)) {
      return notification.warning({
        message: "Please add a Contact",
      });
    } else {
      this.setState({
        disable: true
      })
      const data = this.state
      data.customFields = customData
      data.userId = this.props.user._id
      if (this.state.editMode) {
        //  dispatch(updateBlog({id:state._id,body:state}))
      } else {
        const { userName } = this.props.location.state
        api.post('matter/create', { ...data, userName }).then((matter) => {
          const { _id } = matter.data.data
          this.state.task.map((item) => {
            api.get('/tasks/view/' + item).then((res) => {
              const { data } = res.data
              delete data.__v
              delete data.created_at
              delete data.updated_at
              delete data._id
              data.matter = _id
              api.post(`tasks/create`, data).then((saved) => console.log(saved))
            })
          })
          this.openNotificationWithIcon('success')
          this.setState({
            disable: false
          })
          if (this.props.location != undefined) {
            this.props.history.push('/accounts')
          }
        }).catch(() => {
          this.openNotificationWithfailure('error')
        })

      }


    }
  }

  render() {


    const addFeild = () => {
      let list = this.state.relatedContacts
      list.push({ relationship: "", contact: "", billThis: "", id: "" })
      this.setState({ relatedContacts: list })
      let newState = this.state
      newState.Relation = this.state.relatedContacts
      this.setState(newState)
    }
    const addTask = () => {
      const { tasks } = this.state
      tasks.push("")
      this.setState({
        ...this.state, tasks
      })
    }

    const handleChange = (e) => {
      e.persist()

      if (e.target.name === "client") {
        if (e.target.selectedIndex != 0) {
          this.setState(st => ({ ...st, [e.target.name]: contacts.data.data[e.target.selectedIndex - 1] }))
        } else {
          this.setState(st => ({ ...st, [e.target.name]: "" }))
        }
      }
      else {
        this.setState(st => ({ ...st, [e.target.name]: e.target.value }))
      }


      console.log(this.state)
    }
    const handleDelete = (e) => {
      e.persist()
      const { name, id } = e.target
      let newState = this.state
      newState.relatedContacts.splice(id, 1)
      this.setState(newState)
    }
    const handleTaskChange = (e) => {
      const { id, value, name } = e.target
      if (value === "Select a task") return
      const state = this.state
      state.task[id] = value
      this.setState(state, console.log(this.state, "....state"))
    }

    const HandleDynamicChange = (e) => {
      e.persist()
      let list = this.state
      const { id, value, name, checked, selectedIndex } = e.target
      if (name === "billThis") {
        list.relatedContacts[id][name] = checked
      } else {
        list.relatedContacts[id][name] = value
      }
      if (name == 'contact') {
        list.relatedContacts[id][name] = contacts.data.data[e.target.selectedIndex]._id
        list.relatedContacts[id].id = selectedIndex
      }
      console.log(error.relationship)
      switch (name) {
        case "relationship":
          error.relationship[id] =
            (!validNameRegex.test(value))
              ? "Realtionship must be in characters!"
              : (value.length > 20)
                ? "Relationship must be less than 20 characters long!"
                : "";
          break;

        default:
          break;
      }
      this.setState(list)
    }
    const handledelete = (index) => {
      const { tasks } = this.state
      tasks.splice(index, 1)
      this.setState({
        ...this.state, tasks
      })
    }

    return (
      <div className='form-width'>
        <div className="form-header-container mb-4">
          <h3 className="form-header-text">Add New Matter</h3>
        </div>
        <Card title="Matter Information" className="mb-4">
          <Form className="form-details" >

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Client</Form.Label>
              <Form.Control as="select" name="client" onChange={handleChange}>
                <option>Select a contact</option>
                {optns}
              </Form.Control>
            </Form.Group>
            <div className="form-add mb-4">
              <span onClick={() => this.setState({ modal: true })}>Add Contact</span>
            </div>
            <Form.Group controlId="formGroupMatter">
              <Form.Label>Matter Description</Form.Label>
              <Form.Control required name='matterDescription' as="textarea" rows="3" type="text" placeholder="Matter description"
                value={editRes.matterDescription} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formGroupClientRefenceNumber">
              <Form.Label>Client reference number</Form.Label>
              <Form.Control name='clientReferenceNumber' type="number" placeholder="Client Refence Number"
                value={editRes.clientReferenceNumber} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Practise Area</Form.Label>
              <Form.Control as="select" name="practiseArea" onChange={handleChange} defaultValue={editRes.practiseArea}>
                <option>Select a practise area</option>
                <option>Attorney</option>
                <option>Administrative</option>
                <option>Bankruptcy</option>
                <option>Business</option>
                <option>Builder's Liens</option>
                <option>Civil Litigation</option>
                <option>Commercial</option>
                <option>Conveyance (Purchase)</option>
                <option>Conveyance (Sale)</option>
                <option>Corporate</option>
                <option>Criminal</option>
                <option>Employment</option>
                <option>Estates</option>
                <option>Family</option>
                <option>Immigration</option>
                <option>Insurance</option>
                <option>Personal Injury</option>
                <option>Tax</option>
                <option>Wills</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" onChange={handleChange} defaultValue={editRes.status}>
                <option>Open</option>
                <option>Closed</option>
                <option>Pending</option>
              </Form.Control>
            </Form.Group>
            <Form.Row className="matter-res-date">
              <Col sm>
                <Form.Group controlId="formGroupOpenDate">
                  <Form.Label>Open Date</Form.Label>
                  <Form.Control name='openDate' type="Date" placeholder="OpenDate"
                    value={editRes.openDate} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group controlId="formGroupClosing Date">
                  <Form.Label>Closing Date</Form.Label>
                  <Form.Control name='closing Date' type="Date" placeholder="Closing Date"
                    value={editRes.closeDate} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group controlId="formGroupPendingDate">
                  <Form.Label>Pending Date</Form.Label>
                  <Form.Control name='pendingDate' type="Date" placeholder="PendingDate"
                    value={editRes.pendingDate} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        </Card>

        <Collapse accordion className="mb-2">
          <Panel header="Related Contacts" key="1">
            <Form className="form-details">
              <DynamicFeild name="realtedContacts" InputList={this.state.relatedContacts} option={optns} error={error.relationship} change={HandleDynamicChange} editRes={editRes} delete={handleDelete} editMode={editMode}></DynamicFeild>
              <br />
              <div className="form-add mb-4">
                <span onClick={addFeild}>Add Related Contact</span>
              </div>
            </Form>
          </Panel>
        </Collapse>

        <Collapse accordion className="mb-2">
          <Panel header="Custom Fields" key="1">
            <Form className="form-details">
              <p>Customise your<Button variant="link" onClick={() => this.props.history.push('/settings/customFeilds')}>Custom Fields</Button></p>
              {customFields}
            </Form>
          </Panel>
        </Collapse>

        <Collapse accordion className="mb-2">
          <Panel header="Billing Preference" key="1">
            <Form className="form-details">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Rate</Form.Label>
                <Form.Control as="select" onChange={handleChange} defaultValue={editRes.billingType}>
                  <option>Flat</option>
                  <option>Hourly</option>
                  <option>Contagious</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Panel>
        </Collapse>

        <Collapse accordion className="mb-4">
          <Panel header="Task Automation" key="1">
            <Form className="form-details">
              {
                this.state.tasks.map((_, index) => (
                  <Row>
                    <Col>
                      <Form.Group controlId={index}>
                        <Form.Label>Task</Form.Label>
                        <Form.Control as="select" name="task" onChange={handleTaskChange}>
                          <option>Select a task</option>
                          {
                            this.state.list.map((item, index) => {
                              if (this.props.user.isOwner || this.props.user.userName === item.userName)
                              return <option value={item._id}>{item.taskName}</option>
                            })
                          }
                        </Form.Control>
                      </Form.Group>

                      <div className="form-minus mb-4">
                        <span onClick={() => handledelete(index)}>Remove</span>
                      </div>
                    </Col>
                  </Row>
                ))
              }
              <div className="form-add mb-4">
                <span onClick={addTask}>Add Task</span>
              </div>

            </Form>
          </Panel>
        </Collapse>

        <Button onClick={this.handleSubmit} disabled={this.state.disable} className="btn btn-success" >ADD</Button>
        <Button onClick={() => { this.props.history.goBack() }} >CANCEL</Button>
        <br></br>
        <Modal
          centered
          visible={this.state.modal}
          onOk={() => {
            this.setState({ modal: false })
            this.componentDidMount()
          }}
          onCancel={() => {
            this.setState({ modal: false })
            this.componentDidMount()
          }}
          footer={[
            <Button onClick={() => {
              this.setState({ modal: false })
              this.componentDidMount()
            }}>
              Cancel
          </Button>
          ]}
        >
          <AddPerson></AddPerson>

        </Modal>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  user: state.user.token.user
});
export default connect(mapStateToProps)(AddEditMatter)


