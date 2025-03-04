import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Col, Button } from 'react-bootstrap'
import { Card, message, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../../../resources/api'

const validNameRegex = RegExp(
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);

const EditAccount = (props) => {

    const history = useHistory()
    const { user } = useSelector((state) => state.user.token);
    const userId = user._id
    const [firstTrue, setfirstTrue] = useState(false)
    const [state, setState] = useState({
        userId: userId,
        type: "",
        accountName: "",
        contactId: "",
        accountNumber: "",
        institution: "",
        domicileBranch: "",
        swiftCode: "",
        transitNumber: "",
        currency: "",
        openingBalance: ""
    })
    const [error, setError] = useState({})
    const [display, setDisplay] = useState(false)
    const [Disabled, setDisabled] = useState(false)
    const [contacts, setcontacts] = useState([])
    // get Account Data
    const fetchContacts = () => {
        api.get('/contact/viewforuser/' + userId).then((res) => {
            console.log(res, '.........contacts')
            setcontacts(res.data.data)
        })
    }
    useEffect(() => {
        fetchContacts()
    }, [])
    useEffect(() => {
        api
            .get("/account/view/" + props.location.state)
            .then((res) => {
                let newState = state
                newState.defaultAccount = res.data.data.defaultAccount
                if (newState.defaultAccount) {
                    setfirstTrue(true)
                }
                setState(newState)
                setState({ ...state, ...res.data.data })
                console.log(state)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    // handel the change of form & set the error msg
    const handelChange = e => {
        e.persist();
        setDisplay(false)
        const { name, value } = e.target;
        console.log("chnage")
        if (name === "defaultAccount") {
            let data = state
            data.defaultAccount = data.defaultAccount ? false : true
            setState(data)
        } else {
            let errors = error
            switch (name) {
                case "type":
                    errors.type = value === "default" ? "Account Type is required!" : "";
                    break;
                case "accountName":
                    errors.accountName =
                        value.length == 0
                            ? "Account Name is required!"
                            : !validNameRegex.test(value)
                                ? "Account Name must be in characters!"
                                : "";
                    break;

                case "accountNumber":
                    errors.accountNumber =
                        value.length == 0
                            ? "Account Number is required!"
                            : "";
                    break;
                case "institution":
                    errors.institution =
                        value.length == 0
                            ? "Institution is required!"
                            : !validNameRegex.test(value)
                                ? "Institution must be in characters!"
                                : "";
                    break;
                case "domicileBranch":
                    errors.DomicileBranch =
                        value.length == 0
                            ? "Domicile Branch is required!"
                            : "";
                    break;
                case "swiftCode":
                    errors.swiftCode =
                        value.length == 0
                            ? "Swift Code is required!"
                            : "";
                    break;
                case "transitNumber":
                    errors.transitNumber =
                        value.length == 0
                            ? "Transit Number is required!"
                            : "";
                    break;
                case "currency":
                    errors.currency = value === "default" ? "Currency is required!" : "";
                    break;
                case "openingBalance":
                    errors.openingBalance =
                        value.length == 0
                            ? "Opening Balance is required!"
                            : value > 0
                                ? ""
                                : "Opening Balance Greater than 0"
                    break;
                default:
                    break;
            }
            setError((st) => ({ ...st, ...errors }))
            setState((st) => ({ ...st, [name]: value }));

        }
        console.log(state.defaultAccount)
    }

    // handel Submit of form 
    const handelSubmit = e => {
        e.preventDefault();
        notification.destroy()
        if (!display) {
            const validateForm = (error) => {
                let valid = true;
                Object.values(error).forEach((val) => val.length > 0 && (valid = false));
                return valid;
            };
            if (validateForm(error)) {
                checkValidity();
            } else {
                setDisplay(true)
                return notification.warning({
                    message: "Failed to Add New Account",
                });
            }
        }
    };

    // Check the Fields are Empty 
    function checkValidity() {
        if (!Object.keys(state).every((k) => state[k] !== "")) {
            setDisplay(true)
            return notification.warning({
                message: "Fields Should Not Be Empty",
            });
        } else {
            // if form is valid then do something
            setDisabled(true)
            /*
            if(firstTrue){
                let newState = state
                newState.defaultAccount = !newState.defaultAccount
                setState(newState)
            }
            */
            api.post("/account/edit/" + props.location.state, state)
                .then((res) => {
                    console.log(res)
                    setDisabled(false)
                    notification.success({ message: "Account Edited." })
                    history.goBack();
                }).catch((err) => {
                    console.log(err);
                    setDisabled(false)
                    notification.error({ message: "Failed to edit account." })
                });
        }

    }

    return (
        <>
            <div className='form-width'>
                <div className="form-header-container mb-4">
                    <h3 className="form-header-text">Edit Account</h3>
                </div>
                <Card className="mb-4">
                    <Form className="form-details">
                        <Form.Group controlId="type">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="type"
                                onChange={handelChange}
                                value={state["type"]}
                            >
                                <option value="default">Select Account Type</option>
                                <option value="Operating Account">Operating Account</option>
                                <option value="Client Account">Client Account</option>
                                <option value="Trust Account">Trust Account</option>
                                <option value="Lawyer Fees">Lawyer Fees</option>
                            </Form.Control>
                            <p className="help-block text-danger">{error.type}</p>
                        </Form.Group>


                        <Form.Group controlId="accountName">
                            <Form.Label>Account Name</Form.Label>
                            <Form.Control type="text" name="accountName" placeholder="Account name" value={state["accountName"]} onChange={handelChange} />
                            <p className="help-block text-danger">{error.accountName}</p>
                        </Form.Group>

                        {
                            state.type !== "Operating Account" && (
                                <Form.Group controlId="contactId">
                                    <Form.Label>Account Holder</Form.Label>
                                    <Form.Control as="select" name="contactId" value={state["contactId"]} placeholder="Account Holder" onChange={handelChange} >
                                        <option>Select a contact</option>
                                        {
                                            contacts.map((value) => {
                                                if (user.isOwner || value.userName === user.userName)
                                                    return <option value={value._id}>{value.firstName + " " + value.lastName}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <p className="help-block text-danger">{error.accountHolder}</p>
                                </Form.Group>
                            )

                        }

                        <Form.Group controlId="accountNumber">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control type="number" name="accountNumber" placeholder="Account Number" value={state["accountNumber"]} onChange={handelChange} />
                            <p className="help-block text-danger">{error.accountNumber}</p>
                        </Form.Group>

                        <Form.Group controlId="institution">
                            <Form.Label>Institution</Form.Label>
                            <Form.Control type="text" name="institution" placeholder="Institution" value={state["institution"]} onChange={handelChange} />
                            <p className="help-block text-danger">{error.institution}</p>
                        </Form.Group>

                        <Form.Group controlId="domicileBranch">
                            <Form.Label>Domicile Branch</Form.Label>
                            <Form.Control type="text" name="domicileBranch" placeholder="Domicile Branch" value={state["domicileBranch"]} onChange={handelChange} />
                            <p className="help-block text-danger">{error.domicileBranch}</p>
                        </Form.Group>

                        <Form.Group controlId="swiftCode">
                            <Form.Label>Swift Code</Form.Label>
                            <Form.Control type="text" name="swiftCode" placeholder="Swift Code" value={state["swiftCode"]} onChange={handelChange} />
                            <p className="help-block text-danger">{error.swiftCode}</p>
                        </Form.Group>
                        <Form.Row>
                            <Col sm>
                                <Form.Group controlId="transitNumber">
                                    <Form.Label>Transit Number</Form.Label>
                                    <Form.Control type="text" name="transitNumber" placeholder="Transit Number" value={state["transitNumber"]} onChange={handelChange} />
                                    <p className="help-block text-danger">{error.transitNumber}</p>
                                </Form.Group>
                            </Col>
                            <Col sm>
                                <Form.Group controlId="currency">
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="currency"
                                        onChange={handelChange}
                                        value={state["currency"]}
                                    >
                                        <option value="default">Select Currency</option>
                                        <option value="$">$</option>
                                        <option value="Euro">Euro</option>
                                        <option value="Pound">Pound</option>
                                    </Form.Control>
                                    <p className="help-block text-danger">{error.currency}</p>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="openingBalance">
                            <Form.Label>Opening Balance</Form.Label>
                            <Form.Control type="number" name="openingBalance" placeholder="Opening Balance" value={state["openingBalance"]} onChange={handelChange} />
                            <p className="help-block text-danger">{error.openingBalance}</p>
                        </Form.Group>

                        <Form.Group controlId="defaultAccount">
                            <Form.Check defaultChecked={state.defaultAccount} type="checkbox" name="defaultAccount" label="Set the account as default account" onChange={handelChange} />
                        </Form.Group>
                        <br /><br />
                        <Button disabled={Disabled} onClick={handelSubmit}>Edit Bank Account</Button>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default EditAccount
