import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Input, Space, notification, Card, Popconfirm, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../resources/api';
import { DollarTwoTone, UsergroupAddOutlined } from '@ant-design/icons';
import { values } from 'lodash';
const { Column, ColumnGroup } = Table;

const ContactsManage = (props) => {
  const { user } = useSelector((state) => state.user.token);
  const userId = user._id
  const [Loading, setLoading] = useState(true)
  const [tableData, settableData] = useState([])
  const [Values, setValues] = useState({
    earning: 0,
    clients: 0
  })

  const fetchBills = async (_id) => {
    const res = await api.get('/billing/bill/viewforuser/' + userId + '/' + _id)
    console.log(res)
    let earning = 0
    const bills = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    bills.map((bill, index) => {
      if (bill.status === "Paid")
        earning = earning + parseFloat(bill.balance)
    })
    if (bills.length > 0)
      return {
        earning: earning,
        last_invoice: bills[0].issueDate
      }
    return {
      earning: earning,
      last_invoice: ''
    }
  }
  const fetchEventData = () => {
    // api.get('/matter/viewforuser/' + userId).then(async (res) => {
    //   let matters = []
    //   let earning = 0
    //   res.data.data.map(async (item, index) => {
    //     if (user.isOwner || item.userName === user.userName) {
    //       api.get('/billing/bill/viewforuser/' + userId + '/' + item._id)
    //         .then((res) => {
    //           let earning = 0
    //           const bills = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    //           bills.map((bill, index) => {
    //             if (bill.status === "Paid")
    //               earning = earning + parseFloat(bill.balance)
    //           })
    //           const details = bills.length > 0
    //             ? {
    //               earning: earning,
    //               last_invoice: bills[0].issueDate
    //             }
    //             : {
    //               earning: earning,
    //               last_invoice: ''
    //             }

    //           if (details.earning > 0) {
    //             earning += parseFloat(details.earning)
    //             const _matter = {
    //               matter: item.matterDescription,
    //               client: item.client.firstName + " " + item.client.lastName,
    //               startDate: item.openDate,
    //               endDate: item.closeDate,
    //               earning: details.earning,
    //               invoice: details.last_invoice === '' ? "-" : new Date(details.last_invoice).toUTCString()
    //             }
    //             matters.push(_matter)
    //           }
    //         })
    //         .catch((err) => {

    //         })
    //     }
    //   })
    //   settableData(matters) //Todo : check the async execution of this function
    //   setValues({
    //     ...Values,
    //     earning: earning
    //   })
    //   setLoading(false);
    // })
    api.get('/matter/viewforuser/' + userId).then(async (res) => {
      let matters = []
      let earning = 0
      res.data.data.map(async (item, index) => {
        if (user.isOwner || item.userName === user.userName) {
          const details = await fetchBills(item._id)
          if (details.earning > 0) {
            earning += parseFloat(details.earning)
            const matter = {
              matter: item.matterDescription,
              client: item.client.firstName + " " + item.client.lastName,
              startDate: item.openDate,
              endDate: item.closeDate,
              earning: details.earning,
              invoice: details.last_invoice === '' ? "-" : new Date(details.last_invoice).toUTCString()
            }
            matters.push(matter)
            settableData(matters) //Todo : check the async execution of this function
            setValues({
              ...values,
              earning: earning
            })
          }
        }
      })
      setLoading(false);
    })
  }
  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <Spin size="large" spinning={Loading}>
      <Card>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-4">
                <UsergroupAddOutlined
                  className="d-flex justify-content-center align-item-center h-100"
                  style={{ fontSize: '56px', color: '#228ae6' }} />
              </div>
              <div className="col-8">
                <h5>Total Clients</h5>
                <h3>{tableData.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-4">
                <DollarTwoTone
                  className="d-flex justify-content-center align-item-center h-100"
                  style={{ fontSize: '56px', color: '#228ae6' }} />
              </div>
              <div className="col-8">
                <h5>Total Earning</h5>
                <h3>{Values.earning}</h3>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Table className="table-responsive" dataSource={tableData}>
          <Column
            title="Client"
            dataIndex="client"
            key="client"
          />
          <Column
            title="Matter"
            dataIndex="matter"
            key="matter"
          />
          <Column
            title="Start Date"
            dataIndex="startDate"
            key="startDate"
          />
          <Column
            title="End Date"
            dataIndex="endDate"
            key="endDate"
          />
          <Column title="Total Earning" dataIndex="earning" key="earning" />
          <Column title="Last Invoice" dataIndex="invoice" key="invoice" />
        </Table>
      </Card>

    </Spin >
  );
};

export default ContactsManage;
