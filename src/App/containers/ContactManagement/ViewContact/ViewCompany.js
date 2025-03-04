import React, { useEffect, useState } from 'react';
import api from '../../../../resources/api';
import { Card, Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { values } from 'lodash';

function CompanyView(props) {
  let response = {};
  let data = null;
  const userId = useSelector((state) => state.user.token.user._id);
  const [Loading, setLoading] = useState(true)
  const [address, setAddress] = useState();
  const [Title, setTitle] = useState();
  const [ID, setID] = useState();
  const [Website, setWebsite] = useState();
  const [Email, setEmail] = useState();
  const [Number, setNumber] = useState();
  const [Rate, setRate] = useState();
  const [editableData, setEditableData] = useState({});
  useEffect(() => {
    async function fetchData() {
      await api.get('/company/view/' + props.location.state).then((res) => {
        response = res.data.data;
        console.log(response);
        setEditableData(response);

        setValue();
      });
    }
    console.log(props);
    fetchData();
  }, []);

  const setValue = () => {
    console.log(response);
    const ttl = response.name;
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
    setAddress(adrs);
    setID(idx);
    setRate(rte);
    setTitle(ttl);
    setEmail(mail);
    setNumber(Num);
    setWebsite(Web);
    setLoading(false)
  };

  return (
     <Spin size="large" spinning={Loading}>
       <>
      <Card>
      <div className="d-flex flex-wrap mb-3">
        <div>
          <h3>{Title}</h3>
        </div>
        <div className="red-span">
          <p>Company</p>
        </div>
      </div>
      </Card>
      <div className="d-flex flex-wrap">
        <Card
          extra={
            <Button
              type="link"
              onClick={() => props.history.push('/edit/company', editableData)}
            >
              Edit
            </Button>
          }
          title="Contact Details"
          className="m-2 card-box"
        >
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">Name</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{Title}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">Email Address</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{Email}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">Phone Number</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{Number}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">Website</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{Website}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">Address</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{address}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card title="Billing Information" className="m-2 card-box">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">ID</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{ID}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-1">
                  <span className="table-span-dark">Rate</span>
                </td>
                <td className="border-0 py-1">
                  <span className="table-span-light">{Rate}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </>
  
     </Spin>
    );
}
export default CompanyView;
