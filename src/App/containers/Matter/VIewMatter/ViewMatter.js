import React, { useEffect, useState } from 'react';
import api from '../../../../resources/api';
import { Card, Tabs, Button, Modal, Table, Popconfirm, Upload, notification, Spin} from 'antd';
import { number } from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import Communication from './communnication';
import TaskFuntions from './Task';
import Activity from './Activity';
import 'jspdf-autotable';
import Bills from './Bills';
import Documents from './Documents';
import Calendar from './Calendar';
import Notes from './Notes';

const { TabPane } = Tabs;

function CompanyView(props) {
  let response = {};
  const [desc, setdesc] = useState('');
  const [Active, setActive] = useState("1")
  const [TabKey, setTabKey] = useState("")
  const [Loading, setLoading] = useState(true)
  const [total, settotal] = useState("0")
  const [Client, setClient] = useState('');
  const [Amount, setAmount] = useState('0');
  const [state, setState] = useState({ visible: false });
  const [contact, setContact] = useState([]);
  const [act, setAct] = useState([]);
  const [address, setAddress] = useState();
  const [events, setEvents] = useState();
  const [firstName, setfirstName] = useState();
  const [ID, setID] = useState();
  const [Website, setWebsite] = useState();
  const [Email, setEmail] = useState();
  const [Number, setNumber] = useState();
  const [BillAmount, setBillAmount] = useState(0)
  console.log(props.location.state);
    const fetchBills = ( ) =>{
      api.get('/billing/bill/viewforuser/'+ props.location.state.userId + '/' + props.location.state.id).then((res)=>{
        console.log(res)
        let billamount = 0
        res.data.data.map((value , index)=>{
  
          if(value.status === "Unpaid"){
            billamount = billamount + parseFloat(value.balance).toFixed('2')
          }
          /*
          if(value.status=="draft"){
            draftBills.push(temp)
          }
          */
        })
        console.log(billamount)
        setBillAmount(billamount)
      })
    }
  useEffect(() => {
    async function fetchData() {
      await api.get('/matter/view/' + props.location.state.id).then((res) => {
        response = res.data;
        response.data.client =
          response.data.client === null
            ? {
                _id: '',
                updated_at: '',
                created_at: '-',
                userId: '-',
                title: '-',
                lastName: '-',
                firstName: '',
                __v: 0,
                image: '',
                customFields: [
                  {
                    Email: '-',
                  },
                ],
                address: [],
                website: [],
                phone: [],
                emailAddress: [],
                company: ['-'],
              }
            : response.data.client;
        setdesc(res.data.data.matterDescription);
        setClient(
          res.data.data.client.firstName + ' ' + res.data.data.client.lastName

          // res.data.data.client
        );
      });
      {
        /*
                calendar = await api.get('/calendar/viewforuser/'+props.location.state.id)
               .then(()=>{
               api.get('/activity/viewformatter/'+props.location.state.userId+props.location.state.id).then((res)=>{console.log(res)})
           })*/
      }
      setValue();
    }
    fetchData();
    fetchBills()
  }, []);

  useEffect(() => {
    api
      .get(
        '/activity/viewformatter/' +
          props.location.state.userId +
          '/' +
          props.location.state.id
      )
      .then((res) => {
        let activity = [];
        let total = 0
        res.data.data.map((val, index) => {

          let rate = val.rate
          if(rate.includes("$")){
            rate = parseFloat(rate.substring(0, rate.length - 1))
          }

          if(val.type === "time" && val.time != undefined ){
            console.log(rate)

            const sHours = parseInt(val.time.split(':')[0]);
            const sMinutes = parseInt(val.time.split(':')[1]);
            const sSecs =  parseFloat(val.time.split(':')[2])
            console.log(sHours + "  " + sMinutes)
            total = total + rate * sHours + ((rate/60)*sMinutes) +  ((rate/3600)*sSecs)
          }
          if(val.type ==="expense"){ 
              total = total + rate * parseInt(val.qty)
        }
         
          activity.push(val);
          
        });
        console.log('activiviviviv', activity);
        setAct(activity);
        settotal(total)
      });
  }, []);

  const setValue = () => {
    const amnt = window.localStorage.getItem('total');
    setAmount(amnt);

    let data = [];
    //  setRealatedContacts(rcntct)
    
    response.data.relatedContacts.map(async (value, index) => {
      console.log(value.contact);
      const cntct = await api.get('/contact/view/' + value.contact);
      console.log(cntct.data);
      const mail = response.data.client.emailAddress.map((value, index) => {
        return (
          <div className="table-span-light" key={index}>
            <p>{value.emailAddress}</p>
          </div>
        );
      });
      const Num = response.data.client.phone.map((value, index) => {
        return (
          <div className="table-span-light" key={index}>
            <p>{value.number}</p>
          </div>
        );
      });
      data.push(
        <Card title="Related Contact" className="form-width mb-4">
          <table class="table table-borderless table-responsive">
            <tbody>
              <tr>
                <td className="border-0 py-2">
                  <span className="table-span-dark">Client</span>
                </td>
                <td className="border-0 py-2">
                  <span className="table-span-light">
                    {cntct.data.data.firstName + cntct.data.data.lastName}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-2">
                  <span className="table-span-dark">Phone</span>
                </td>
                <td className="border-0 py-2">
                  <span className="table-span-light">{Num}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-2">
                  <span className="table-span-dark">Email</span>
                </td>
                <td className="border-0 py-2">
                  <span className="table-span-light">{mail}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      );
      setContact(data);
      console.log(contact)
    });

    // setEvents(evnt)
    const adrs = response.data.client.address.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>{value.street}</p>
          {console.log('data', response.data)}
          <p>{value.city}</p>
          <p>{value.state}</p>
          <p>{value.zipCode}</p>
          <p>{value.country}</p>
          <p>{value.type}</p>
        </div>
      );
    });
    const mail = response.data.client.emailAddress.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {value.emailType} : {value.emailAddress}
          </p>
        </div>
      );
    });
    const Num = response.data.client.phone.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {console.log(value)}
            {value.phoneType} : {value.phone}
          </p>
        </div>
      );
    });
    const fNAme =
      response.data.client.firstName + ' ' + response.data.client.lastName;
    const IDx = response.data.client._id;
    setAddress(adrs);
    setID(IDx);
    setfirstName(fNAme);
    setEmail(mail);
    setNumber(Num);
    setLoading(false)
  };
  function callback(key) {
    console.log(key);
    setActive(key)
  }

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const handleCancel = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const handleCreateBills = (e) =>{
    console.log(props)
    props.history.push('/create/bills')
  }

  const handleRecordPayment = ( ) => {
    props.history.push('/manage/billing/record')
  }

  //data source for bills section
  

  const handleBills = () => {
    console.log(props.location.state.id);
    props.history.push('/view/matter/bills', props.location.state.id);
  };
  return (
    <Spin size="large" spinning = {Loading}>
      <div>
      <Card >
        <Row>
          <Col sm className="pb-2">
            <h4>{Client}</h4>
            <p>{desc}</p>
          </Col>
          <Col sm>
          <div>
            <Button
              className="mr-2"
              onClick={() =>
                props.history.push('/edit/matter', props.location.state.id)
              }
            >
              Edit
            </Button>
            <Popconfirm
                    title="Are you sure you want to delete this Matter?"
                    onConfirm={() =>
                      api
                        .get('/matter/delete/' + props.location.state.id)
                        .then(() => {
                          notification.success({ message: 'Matter deleted.' });
                          props.history.push(
                            '/manage/matter',
                            props.location.state.id
                          );
                        })
                        .catch(() =>
                          notification.error({ message: 'Failed to delete' })
                        )}
                    onCancel={()=>{}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button  danger>
                      Delete
                  </Button>
                  </Popconfirm>
    
          </div>
          </Col>
        </Row>
      </Card>
      <Tabs activeKey= { Active } onChange={callback} >
        <TabPane tab="Dashboard" key="1" style={{ padding: '0px' }}>
          <Card
          bodyStyle={{padding : "0px"}}
            title="Financial"
            extra={
              <div>
                <Button type="link" onClick={()=>{setActive("2")}}>Add expense/time entry</Button>

                <Button type="link" onClick={()=>{setActive("9")}}>View Bills</Button>
                <Button type="link" onClick={handleBills}>
                  Quick Bills
                </Button>
              </div>
            }
            className="form-width mb-4"
          >
            <div className="text-center pt-2">
       
              <div class="d-flex py-2 mt-2 matter-amount">
                <div style={{ flex: 1, 'border-right': '2px solid #B2E4D6' }}>
                  <p style={{fontSize : "13px"}}>
                    <b>Work in progress amount</b>
                  </p>
                     <span>{parseFloat(total).toFixed('2')}</span>
                </div>
              
                <div style={{ flex: 1, 'border-right': '2px solid #B2E4D6' }}>
                  <p style={{fontSize : "13px"}}>
                    <b>Trust Funds</b>
                  </p>
                  <span>$0.00</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{fontSize : "13px"}}>
                    <b>Outstanding balance</b>
                  </p>
                  <span>${BillAmount}</span>
                </div>
                
              </div>
            </div>
          </Card>
          <Card
            title="Details"
            extra={
              <Button type="link" onClick={() =>
                props.history.push('/edit/matter', props.location.state.id)
              }>
                Add Contact
              </Button>
            }
            className="form-width mb-4"
          >
            <table class="table table-borderless table-responsive ">
              <tbody>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Client</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{firstName}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Phone</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{Number}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Email</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{Email}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Address</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{address}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          {contact.map((value, index) => {
            return value;
          })}
          <Modal
            title="Add Contact"
            visible={state.visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form>
              <Row>
                <Col sm>
                  <Form.Group controlId="relationship">
                    <Form.Label>Relationship</Form.Label>
                    <Form.Control
                      name="relationship"
                      type="text"
                      placeholder="Relationship"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="rcontact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control as="select" name="contact">
                      <option>1</option>
                      <option>2</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="billThis">
                <Form.Check
                  name="billThis"
                  type="checkbox"
                  label="Bill this contact"
                />
              </Form.Group>
            </Form>
          </Modal>
        </TabPane>
        <TabPane tab="Activities" key="2">
          <Activity id={props.location.state.id}></Activity>
        </TabPane>
        <TabPane tab="Calendar" key="3">
          <Calendar
            userId={props.location.state.userId}
            matterId={props.location.state.id}
          />
        </TabPane>
        <TabPane tab="Communication" key="4">
          <Communication id={props.location.state.id}></Communication>
        </TabPane>
        {
          /*
          <TabPane tab="Phone Log" key="5">
          <Card
            title="Phone Log"
            extra={<a href="#"></a>}
            className="form-width mb-4"
          ></Card>
             </TabPane>
          */
        }
     
        <TabPane tab="Notes" key="6">
          <Notes id={props.location.state.id}></Notes>
        </TabPane>
        <TabPane tab="Document" key="7">
          {console.log('matter in viw', props.location.state.matters)}
          <Documents
            matters={props.location.state.matters}
            userId={props.location.state.userId}
            matterId={props.location.state.id}
          />
        </TabPane>
        <TabPane tab="Task" key="8">
          <TaskFuntions id={props.location.state.id}></TaskFuntions>
        </TabPane>
        <TabPane tab="Bills" key="9">
          <Bills 
          userId={props.location.state.userId}
          matterId={props.location.state.id}
          handleRecordPayment={handleRecordPayment} 
          handleBills = {handleCreateBills} />
        </TabPane>
      </Tabs>
    </div>
  
    </Spin>
    );
}

export default CompanyView;
