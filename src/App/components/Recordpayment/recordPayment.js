import React from 'react'
import { Card, Space, Table, Button, notification } from 'antd'
import { Form, Col, Row } from 'react-bootstrap'
import api from '../../../resources/api'
import { connect } from 'react-redux'

let optns = null
let contacts = {}
let accounts = {}
class Record extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                client: "",
                destination: "",
                paymentDate: "",
                source: "",
                userId: this.props.userId

            },
            clientId: "",
            clientData: "",
            tableData: [],
            unpaidBills: [],
            payment: [],
            total: 0,
            fromTotal: true,
            optionforAcoount: null,
            sourceAccounts: null,
            disabled: false,
            accounts: []

        }
    }
    componentDidMount() {
        let optionforAcoount = null
        let sourceAccounts = null
        api.get('/contact/viewforuser/' + this.props.userId).then((res) => {
            contacts = res.data.data
            optns = res.data.data.map((value, index) => {
                return <option id={index}>{value.firstName + " " + value.lastName}</option>
            })
        }).then(() => {
            this.setState({ options: optns })
        })

        api.get('/account/viewforuser/' + this.props.userId).then((res) => {
            accounts = res.data.data
            this.setState({ accounts: res.data.data })
        })

    }
    async checkBalance() {
        const account = await api.get(`/account/view/${this.state.data.source}`)
        const destination = await api.get(`/account/view/${this.state.data.destination}`)
        const { balance, _id } = account.data.data
        let total = 0;
        this.state.payment.map((value) => total = total + parseFloat(value));
        if (balance - total >= 0) {
            api.post(`/account/edit/${_id}`, { balance: parseFloat(balance) - total })
            api.post(`/account/edit/${this.state.data.destination}`, { balance: parseFloat(destination.data.data.balance) + total })
            const source_log = {
                accountId: _id,
                before: balance,
                after: parseFloat(balance) - total,
                userId : this.props.userId
            }
            const destination_log = {
                accountId: this.state.data.destination,
                before: destination.data.data.balance,
                after: parseFloat(destination.data.data.balance) + total,
                userId : this.props.userId
            }
            api.post('logs/create', source_log)
            api.post('logs/create', destination_log)
            return true
        }
        notification.error({ message: "Source account has Insufficient balance" })
        this.setState({ disabled: false })
        return false
    }
    render() {
        const handletotalBalance = (e) => {
            e.persist()
            const { id, value } = e.target
            let newState = this.state
            newState.payment[0] = value
            this.setState(newState)
            this.setState({ fromTotal: true })
            console.log(this.state.payment)
        }
        const handlePayment = (e) => {
            e.persist()
            const { id, value } = e.target
            let newState = this.state
            console.log(e.target)
            newState.payment[id] = value
            this.setState(newState)
            console.log(this.state.payment)
        }
        const handleChange = (e) => {
            e.persist()
            const { name, id, value } = e.target
            let newData = this.state.data

            if (name === "client") {
                newData[name] = contacts[e.target.selectedIndex]
                if (e.target.selectedIndex != 0) {
                    this.setState({ clientId: contacts[e.target.selectedIndex - 1]._id })
                    console.log(contacts[e.target.selectedIndex - 1]._id)

                    api.get('/billing/bill/viewforcontact/' + this.props.userId + '/' + contacts[e.target.selectedIndex - 1]._id).then((res) => {
                        this.setState({ clientData: res.data.data })
                        console.log(res.data.data)
                        console.log("foo foo ")
                        let tableData = []
                        let paidBills = []
                        let unpaidBills = []
                        res.data.data.map((value, index) => {
                            if (value.status == "Unpaid") {
                                let pay = this.state.payment
                                pay[index] = 0.00
                                this.setState({ payment: pay, total: this.state.total + parseFloat(value.balance) })

                            }
                            //    const issueDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
                            const temp = {
                                id: value._id,
                                status: value.status,
                                lastSeen: value.lastSeen ? value.lastSeen : "--",
                                dueDate: value.dueDate,
                                invoiceID: value.invoiceId ? value.invoiceId : "-",
                                dueIn: value.dueDate.substring(0, 10),
                                matter: value.matter,
                                openBalace: value.balance,
                                issueDate: value.issueDate.substring(0, 10),
                                openBalance: value.balance,
                                payment: <Form>
                                    <Row>
                                        <Col md="10">
                                            <Form.Group controlId={index}>

                                                <Form.Control
                                                    style={{ height: "60%", }}
                                                    type="text"
                                                    key={index}
                                                    name="payment"
                                                    placeholder="$0.00"
                                                    onChange={handlePayment} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>

                            }
                            if (value.status == "Paid") {
                                paidBills.push(temp)
                            }
                            if (value.status == "Unpaid") {
                                unpaidBills.push(temp)
                            }

                            tableData.push(temp)
                        })
                        this.setState({ tableData: tableData, paidBills: paidBills, unpaidBills: unpaidBills })
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    this.setState({ clientId: "" })
                }

            } else {
                newData[name] = value
            }
            this.setState({ data: newData })
            console.log(this.state)

        }
        const handleSubmit = async (e) => {
            notification.destroy()
            if (this.state.data.client === "" || this.state.data.source === "Select a client") {
                notification.error({ message: "Please select a client" })
            } else if (this.state.data.source === "" || this.state.data.source === "Select a Source") {
                notification.error({ message: "Please select a source" })
            } else if (this.state.data.destination === "" || this.state.data.destination === "Select a Destination") {
                notification.error({ message: "Please select a destination" })
            } else if (this.state.data.paymentDate === "") {
                notification.error({ message: "Please select a payment date" })
            } else {
                this.setState({
                    disabled: true
                })
                if (await this.checkBalance()) {
                    this.state.clientData.map((value, id) => {
                        const data = value
                        data.lastSeen = new Date()
                        if (this.state.fromTotal) {
                            const bal = this.state.payment[0]
                            if (parseFloat(data.balance) - parseFloat(bal) > 0) {
                                data.balance = parseFloat(data.balance) - parseFloat(bal)
                            }
                        } else {
                            const bal = this.state.payment[id]
                            data.balance = parseFloat(data.balance) - parseFloat(bal)
                        }
                        api.post('/billing/bill/edit/' + value._id, data).then((res) => {
                            console.log(res)
                            this.setState({
                                disabled: false
                            })
                            notification.success({ message: "Bill Recorded" })
                        }).catch((err) => {
                            console.log(err)
                            this.setState({
                                disabled: false
                            })
                            notification.error({ message: "Failure " })
                        })
                    })

                    api.post('/billing/create', this.state.data).then((res) => {
                        console.log(res)
                        this.props.history.goBack()
                    })

                }
            }
        }


        const columns = [
            {
                title: 'Invoice ID',
                dataIndex: 'invoiceID',
                key: 'invoiceID',
            },
            {
                title: 'Matter',
                dataIndex: 'matter',
                key: 'matter',
            },
            {
                title: 'Issue Date',
                dataIndex: 'issueDate',
                key: 'issueDate',
            },
            {
                title: 'Due In',
                dataIndex: 'dueIn',
                key: 'dueIn',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            /*
             {
                 title: 'Intrest',
                 dataIndex: 'intrest',
                 key: 'intrest',
               },
              
             */

            {
                title: 'Open Balance',
                dataIndex: 'openBalance',
                key: 'openBalance',
            },
            {
                title: 'Payment',
                dataIndex: 'payment',
                key: 'payment',
            },
        ];


        const title = <div style={{ "display": "flex", "flex-wrap": "wrap" }}>
            <div className="mr-4">
                <p style={{ fontWeight: "bold" }}>Total open balance</p>
                <p style={{ fontWeight: "bold", "float": "right", "font-size": "17px" }}>${this.state.total.toFixed('2')}</p>
            </div>
            <div>
                <Form className="pt-0">
                    <Row>
                        <Col md="8">
                            <Form.Group controlId="paymentAmount">
                                <Form.Label style={{ fontWeight: "bold" }}>Payment Amount</Form.Label>
                                <Form.Control
                                    style={{ height: "38px" }}
                                    required
                                    name="paymentAmount"
                                    type="text"
                                    onChange={handletotalBalance}
                                    placeholder="0.00"
                                //    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>

        const invoiceTitle = this.state.data.client === "" ? <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Select a client to record a payment.</h4> : title

        const invoiceBody = this.state.data.client === "" ?
            null
            :
            <div>

                <Card bodyStyle={{ "padding": "0px" }} className="overflow-auto">
                    <Table dataSource={this.state.unpaidBills} columns={columns} />
                </Card>
                {
                    /* 
                    <div className="mt-3" style={{"display": "flex", "flex-wrap": "wrap", "justify-content": "space-between" }}>
                    <div style={{"flex" : "1"}} className="mr-3">
                        <Form className="pt-0">
                            <Form.Group controlId="formGroupMatter">
                            <Form.Label style={{fontWeight : "bold"}}>Description</Form.Label>
                            <Form.Control 
                                required name='description' 
                                as="textarea" 
                                rows="3" 
                                type="text"
                                placeholder="Description"
                                onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div style={{"flex" : "1"}} className="pt-4">
                        <Card bodyStyle={{"padding": "10px 20px"}}>
                            <p style={{"font-size" : "17px"}}><b>Summary</b></p>
                            <p><b>Payment :</b></p>
                        </Card>
                    </div>
                </div>
           
                    */
                }

            </div>

        return <div>
            <Card title="Record Payment" bodyStyle={{ "padding": "0px 24px 0px" }} className="mb-4">
                <Form className="form-details">
                    <Row>
                        <Col md="3">
                            <Form.Group controlId="formGroupCompany">
                                <Form.Label>Client</Form.Label>
                                <Form.Control
                                    name="client"
                                    as="select"
                                    onChange={handleChange}>
                                    <option>Select a client</option>
                                    {this.state.options}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md="3">
                            <Form.Group controlId="source">
                                <Form.Label>Source</Form.Label>
                                <Form.Control
                                    name="source"
                                    as="select"
                                    onChange={handleChange}>
                                    <option>Select a Source</option>
                                    {
                                        this.state.accounts.map((account, index) => {
                                            if (account.type === "Client Account" || account.type === "Trust Account")
                                                return <option value={account._id} id={index}>{account.accountName}</option>
                                        })
                                    }

                                </Form.Control>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="3">
                            <Form.Group controlId="date">
                                <Form.Label>Payment Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="paymentDate"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md="3">
                            <Form.Group controlId="destinaation">
                                <Form.Label>Destination</Form.Label>
                                <Form.Control
                                    name="destination"
                                    as="select"
                                    onChange={handleChange}>
                                    <option>Select a Destination</option>
                                    {this.state.accounts.map((account, index) => {
                                        if (account.type === "Operating Account" || account.type === "Lawyer Fees")
                                            return <option value={account._id} id={index}>{account.accountName}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Group controlId="formGroupLastName">
                                <Form.Label>Reference</Form.Label>
                                <Form.Control
                                    required
                                    name="reference"
                                    type="text"
                                    placeholder="Enter a checking or reference # here"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card>
                {invoiceTitle}
            </Card>

            {invoiceBody}

            <div className="pt-3">
                <Button type="primary" disabled={this.state.disabled} onClick={handleSubmit}>Record</Button>
                <Button onClick={() => { this.props.history.goBack() }}>Cancel</Button>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
});
export default connect(mapStateToProps)(Record)
