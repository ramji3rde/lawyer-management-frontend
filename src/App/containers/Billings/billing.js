import React from 'react';
import { Tabs, Card, Table, Button, Popconfirm, message, notification, Spin, Modal } from 'antd';
import { Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from '../../../resources/api';
import { connect } from 'react-redux'
import ExportExcel from './ExcelExport'
const { TabPane } = Tabs;

class billing extends React.Component {
  constructor() {
    super()
    this.state = {
      tableData: [],
      draftBills: [],
      unpaidBills: [],
      paidBills: [],
      status: false,
      loading: true,
      visible: false,
      disable: false,
      emailAddress: "",
      imageFile: {}
    }
  }
  handelBills = (type) => {
    if (type === 'record') {
      this.props.history.push('/manage/billing/record');
    }
  };

  cancel(e) {
    message.error('Canceled');
  }



  componentDidMount() {
    const { _id, isOwner, userName } = this.props.user
    api.get('/billing/bill/viewforuser/' + _id).then((res) => {
      console.log(res.data.data)
      let tableData = []
      let paidBills = []
      let unpaidBills = []
      let draftBills = []
      res.data.data.map((value, index) => {
        console.log({ testttt: value.client })
        //    const issueDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
        if (isOwner || userName === value.userName) {
          const temp = {
            key: index,
            _id: value._id,
            lastSeen: value.lastSeen ? value.lastSeen.substring(0, 10) : "-",
            status: value.status,
            dueDate: value.dueDate.substring(0, 10),
            id: value.invoiceId ? value.invoiceId : '-',
            client: value.client ? value.client.firstName + " " + value.client.lastName : "-",
            matter: value.matter ? value.matter.matterDescription : "-",
            emailAddress: value.client && value.client.emailAddress[0] ? value.client.emailAddress[0].emailAddress : "",
            issueDate: value.issueDate.substring(0, 10),
            balance: parseFloat(value.balance).toFixed('2')
          }
          if (value.status == "Paid") {
            paidBills.push(temp)
          }
          if (value.status == "Unpaid") {
            unpaidBills.push(temp)
          }
          if (value.status == "draft") {
            draftBills.push(temp)
          }
          tableData.push(temp)
        }
      })
      this.setState({
        tableData: tableData,
        paidBills: paidBills,
        unpaidBills: unpaidBills,
        draftBills: draftBills,
        loading: false
      })
    })
  }

  render() {
    const callback = () => { };
    const handelAction = (record, type) => {
      const data = record
      delete data.matter
      delete data.client
      if (type === "fromDraft") {
        data.status = "Unpaid"

      } else
        if (type === "fromUnpaid") {
          data.status = "Paid"
        }
      api.post('/billing/bill/edit/' + record._id, data).then((res) => {
        console.log(res)
        if (type == "fromDraft") {
          const newState = this.state
          newState.draftBills.splice(record.key, 1)
          newState.unpaidBills.push(res.data.data)
        }
        if (type == "fromUnpaid") {
          const newState = this.state
          newState.unpaidBills.splice(record.key, 1)
          newState.paidBills.push(res.data.data)
        }

        notification.success({ message: "Success" })
        setTimeout(() => {
          //  window.location.reload()
          this.componentDidMount()
        }, 1000)

      }).catch((err) => {
        console.log(err)
        notification.error("Failed")
      })

    }
    const handleDelete = (record) => {
      api
        .get('/billing/bill/delete/' + record._id)
        .then((res) => {
          console.log(res)
          this.componentDidMount()
          notification.success({ message: 'Bills Deleted !' });
          setTimeout(() => {
            //window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          notification.error({ message: 'Failed to delete' });
        });
    };

    const columnsforDraft = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Approve this draft bill"
              onConfirm={() => handelAction(record, "fromDraft")}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Form.Check type="checkbox" />
            </Popconfirm>
          );
        },
      },
      {
        title: 'Last Seen',
        dataIndex: 'lastSeen',
        key: 'lastSeen',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
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
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
      },
      {
        title: 'SendInvoice',
        dataIndex: 'SendInvoice',
        key: 'send',
        render: (_, record) => {
          return (

            <Button onClick={() => {
              this.setState({
                visible: true,
                emailAddress: record.emailAddress
              })
            }}>Send Invoice</Button>

          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'Delete',
        key: 'Delete',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure you want to delete this bill ?"
              onConfirm={() => handleDelete(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                Delete
              </Button>
            </Popconfirm>
          );
        },
      }
    ];

    const unpaidColumns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Mark as Paid"
              onConfirm={() => handelAction(record, "fromUnpaid")}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Form.Check type="checkbox" />
            </Popconfirm>
          );
        },
      },

      {
        title: 'Last Seen',
        dataIndex: 'lastSeen',
        key: 'lastSeen',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
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
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
      },
      {
        title: 'SendInvoice',
        dataIndex: 'SendInvoice',
        key: 'send',
        render: (_, record) => {
          return (

            <Button onClick={() => {
              this.setState({
                visible: true,
                emailAddress: record.emailAddress
              })
            }}>Send Invoice</Button>

          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'Delete',
        key: 'Delete',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure you want to delete this bill ?"
              onConfirm={() => handleDelete(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                Delete
              </Button>
            </Popconfirm>
          );
        },
      }

    ];
    const paidColumns = [

      {
        title: 'Last Seen',
        dataIndex: 'lastSeen',
        key: 'lastSeen',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
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
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
      },
      {
        title: 'SendInvoice',
        dataIndex: 'SendInvoice',
        key: 'send',
        render: (_, record) => {
          return (

            <Button onClick={() => {
              this.setState({
                visible: true,
                emailAddress: record.emailAddress
              })
            }}>Send Invoice</Button>

          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'Delete',
        key: 'Delete',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure you want to delete this bill ?"
              onConfirm={() => handleDelete(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                Delete
              </Button>
            </Popconfirm>
          );
        },
      }

    ];


    const exportPDF = () => {
      const unit = 'pt';
      const size = 'A4'; // Use A1, A2, A3 or A4
      const orientation = 'portrait'; // portrait or landscape

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);

      doc.setFontSize(15);

      const title = 'Bills';
      const headers = [
        [
          'Last Seen',
          'Status',
          'Due Date',
          'ID',
          'Client',
          'Matter',
          'Issue Date',
          'Balance',
        ],
      ];

      let data = []
      this.state.tableData.map((val, index) => {
        const td = [val.lastSeen, val.status, val.dueDate, val.id, val.client, val.matter, val.issueDate, val.balance]
        data.push(td)
      })


      let content = {
        startY: 50,
        head: headers,
        body: data,
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save('Bill.pdf');
    };
    const uploadImage = (e) => {
      this.setState({
        imageFile: e.target.files[0]
      });
    };

    const handleInvoice = () => {
      notification.destroy()
      if (this.state.imageFile === {}) {
        notification.warning({ message: "Please upload a document" })
      } else {
        this.setState({
          disable: true
        })
        var docFormData = new FormData();
        docFormData.set('image', this.state.imageFile)
        api
          .post('/footer/upload', docFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            console.log(response)
            notification.success({ message: 'Sending Email...' });
            //       console.log(response.data.message)
            let data = {
              to: this.state.emailAddress,
              subject: "Invoice",
              text: response.data.message,
              date: new Date()
            }
            console.log(data)
            api.post(`/communication/sendemail`, data).then((email) => {
              console.log(email)
              this.setState({
                disable: false,
                visible: false
              })
              notification.success({
                message: "Invoice sent"
              })
            })

          }).catch((err) => {
            console.log(err)
            this.setState({
              disable: false,
              visible: false
            })

            notification.error({ message: 'Try again later.' });
          })


      }
    }
    return (
      <Spin size="large" spinning={this.state.loading}>
        <div className="p-2 ">
          <div className="d-flex mb-2 title-component-header">
            <div className="title-header-name">
              <h5>Billing</h5>
            </div>
            <div className="d-flex extra-iteam-div">
              <button
                className="btn  btn-outline-primary   btn-sm"
                onClick={exportPDF}
              >
                Export to Pdf
                </button>
              <ExportExcel dataSource={this.state.tableData || []} />
              <button
                className="btn  btn-outline-primary   btn-sm"
                onClick={() => this.handelBills('record')}
              >
                Record Payment
                </button>
              <button
                className="btn  btn-outline-primary   btn-sm"
                onClick={() => this.props.history.push('/create/bills')}
              >
                New Bills
                </button>
            </div>
          </div>
          <Card
          >
            <Tabs defaultActiveKey="4" onChange={callback}>

              <TabPane tab="Draft" key="1">
                <Table className="table-responsive" dataSource={this.state.draftBills} columns={columnsforDraft} />
              </TabPane>

              <TabPane tab="All" key="4">
                <Table className="table-responsive" dataSource={this.state.tableData} columns={paidColumns} />
              </TabPane>
              <TabPane tab="Unpaid" key="3">
                <Table className="table-responsive" dataSource={this.state.unpaidBills} columns={unpaidColumns} />
              </TabPane>
              <TabPane tab="Paid" key="2">
                <Table className="table-responsive" dataSource={this.state.paidBills} columns={paidColumns} />
              </TabPane>
            </Tabs>
          </Card>
          <Modal
            title="Send Invoice"
            visible={this.state.visible}
            onCancel={() => { this.setState({ visible: false }) }}
            onOk={handleInvoice}
            footer={[
              <Button onClick={() => { this.setState({ visible: false }) }}>
                Cancel
            </Button>,
              <Button type="primary" disabled={this.state.disable} onClick={handleInvoice}>
                Send
            </Button>,
            ]}
          >
            <Form
              id='myForm'
              className="form"
              className="form-details">
              <Form.Group controlId="formGroupEmail">
                <input
                  type="file"
                  name="File"
                  onChange={uploadImage}
                  placeholder="Upload Image"
                />
              </Form.Group>
            </Form>

          </Modal>

        </div>

      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.token.user
});

export default connect(mapStateToProps)(billing)