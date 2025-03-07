import React, { useEffect, useState } from 'react';
import api from '../../../../resources/api';
import { Card, Button, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Communication from './Views/Communication'
import Bills from './Views/bills'
import Documents from './Views/docs'
import Notes from './Views/Notes';
const { TabPane } = Tabs;


function CompanyView(props) {
  let response = {};
  let data = null;
  const [url, setUrl] = useState('');
  const [Loading, setLoading] = useState(true)
  const userId = useSelector((state) => state.user.token.user._id);
  const [address, setAddress] = useState();
  const [Title, setTitle] = useState();
  const [ID, setID] = useState();
  const [cId, setcId] = useState("")
  const [Website, setWebsite] = useState();
  const [Email, setEmail] = useState();
  const [Number, setNumber] = useState();
  const [Rate, setRate] = useState();
  const [editableData, setEditableData] = useState({});
  useEffect(() => {
    async function fetchData() {
      await api.get('/contact/view/' + props.location.state).then((res) => {
        response = res.data.data;
        console.log(response);
        setValue();
        setEditableData(response);
      });
    }
    console.log(props.location.state);
    fetchData();
  }, []);

  const setValue = () => {
    const ttl = response.firstName + ' ' + response.lastName;
  
    const URL = response.image;
    data = response;
    const idx = response.billingClientId;
    const rte = response.billingCustomRate;
    const adrs = response.address.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p style={{ 'font-size': '15px' }}>{value.type}</p>
          <p>{value.street}</p>
          <p>{value.city}</p>
          <p>{value.state}</p>
          <p>{value.zipCode}</p>
          <p>{value.country}</p>
        </div>
      );
    });
    const Web = response.website.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {value.websiteType} : {value.website}
          </p>
        </div>
      );
    });
    const mail = response.emailAddress.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {value.emailType} : {value.emailAddress}
          </p>
        </div>
      );
    });
    const Num = response.phone.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {value.phoneType} : {value.phone}
          </p>
        </div>
      );
    });
    setUrl(URL);
    setAddress(adrs);
    setID(idx);
    setRate(rte);
    setTitle(ttl);
    setEmail(mail);
    setNumber(Num);
    setWebsite(Web);
    setcId(response._id)
    setLoading(false)
  };

  const handleCreateBills = (e) =>{
    console.log(props)
    props.history.push('/create/bills')
  }

  const handleRecordPayment = ( ) => {
    props.history.push('/manage/billing/record')
  }
  return (
    <>
      <Spin size="large" spinning={Loading}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Dashboard" key="1" style={{ padding: '0px' }}>
          <div className="d-flex flex-wrap mb-3">
            <div>
              <h3>{Title}</h3>
            </div>
            <div className="green-span">
              <p>Client</p>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <Card
              extra={
                <Button
                  type="link"
                  onClick={() =>
                    props.history.push('/edit/contact', editableData)
                  }
                >
                  Edit
                </Button>
              }
              title="Contact Details"
              className="m-2 card-box"
            >
              <Row>
                <Col sm>
                      <img
                        height="200"
                        width="200"
                        src={url}
                        alt="No image"
                      ></img>
                </Col>
              </Row>
              <Row className="py-2">
                <Col sm><span className="table-span-dark">Name</span></Col>
                <Col sm><span className="table-span-light">{Title}</span></Col>
              </Row>
              <Row className="py-2">
                <Col sm><span className="table-span-dark">Email Address</span></Col>
                <Col sm><span className="table-span-light">{Email}</span></Col>
              </Row>
              <Row className="py-2">
                <Col sm><span className="table-span-dark">Phone Number</span></Col>
                <Col sm><span className="table-span-light">{Number}</span></Col>
              </Row>
              <Row className="py-2">
                <Col sm><span className="table-span-dark">Website</span></Col>
                <Col sm><span className="table-span-light">{Website}</span></Col>
              </Row>
              <Row className="py-2">
                <Col sm><span className="table-span-dark">Address</span></Col>
                <Col sm><span className="table-span-light">{address}</span></Col>
              </Row>
            </Card>

            <Card title="Billing Information" className="m-2 card-box">
              <Row className="py-2">
                <Col sm><span className="table-span-dark">ID</span></Col>
                <Col sm><span className="table-span-light">{ID}</span></Col>
              </Row>
              <Row className="py-2">
                <Col sm><span className="table-span-dark">Rate</span></Col>
                <Col sm><span className="table-span-light">{Rate}</span></Col>
              </Row>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="Communication" key="4">
          <Communication id = {cId}></Communication>
        </TabPane>
        
        <TabPane tab="Notes" key="6">
          <Notes  id = {cId} />
        </TabPane>
        <TabPane tab="Document" key="7">

          
            <Documents
            id = {cId}
            matters={props.location.state.matters}
            userId={props.location.state.userId}
            matterId={props.location.state.id}
          />
     
        </TabPane>
        <TabPane tab="Bills" key="9">
          <Bills handleRecordPayment={handleRecordPayment} handleBills = {handleCreateBills}  id = {cId}></Bills>
        </TabPane>
              
        <TabPane tab="Transactions" key="10"></TabPane>
      </Tabs>
    
      </Spin>
    </>
  );
}
export default CompanyView;
