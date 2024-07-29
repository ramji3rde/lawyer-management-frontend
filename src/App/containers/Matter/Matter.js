import React from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  notification,
  Popconfirm,
  Card,
  Spin
} from 'antd';
import { Form } from 'react-bootstrap';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import api from '../../../resources/api';
import { connect } from 'react-redux';
import ExportExcel from './ExcelExport';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

let response = {};
let tableData = [];
class matterManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      tableData: [],
      searchData: [],
      showSearchMatter: false,
      showSearchClient: false,
      showSearchPractise: false,
      value: '',
      loading: true,
      finalData: [],
      record: {}
    };
    this.filterByMatterInput = this.filterByMatterInput.bind(this);
  }
  async componentDidMount() {
    let data = [];
    let open = [];
    let closed = [];
    let pending = [];
    const { user } = this.props
    await api
      .get('/matter/viewforuser/' + user._id)
      .then((res) => (response = res.data.data));
    console.log(response);
    response.map((value, index) => {
      if (user.isOwner || user.userName === value.userName) {
        let newData = {
          index: index,
          key: index,
          id: value._id,
          matterDescription: value.matterDescription,
          Client:
            value.client !== null
              ? value.client.firstName + ' ' + value.client.lastName
              : '-',
          PractiseArea: value.practiseArea ? value.practiseArea : '-',
          OpenDate: value.openDate ? value.openDate : '-',
        };
        if (value.status === 'Open') {
          open.push(newData);
        } else if (value.status === 'Closed') {
          closed.push(newData);
        } else if (value.status === 'Pending') {
          pending.push(newData);
        }
        data.push(newData);
      }
    });
    if (this.state.tableData != []) {
      this.setState({
        tableData: data,
        open: open,
        closed: closed,
        pending: pending,
        all: data,
        loading: false
      });
    }
  }
  filterByMatterInput = () => (
    <div>
      <SearchOutlined
        style={{ "vertical-align": "revert" }}
        onClick={() => {
          this.state.showSearchMatter === false
            ? this.setState({
              ...this.state,
              showSearchMatter: true,
              showSearchClient: false,
              showSearchPractise: false,
            })
            : this.setState({ ...this.state, showSearchMatter: false });
        }}
      />
      <span style={{ paddingLeft: "8px" }}> Matter Description </span>

      <div>
        {this.state.showSearchMatter && (
          <input
            className="mt-2"
            placeholder="Search Matter "
            value={this.state.value}
            onChange={(e) => {
              let filteredData = [];
              this.setState({ value: e.target.value });
              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = this.state.tableData.filter(
                  (item) =>
                    item.matterDescription !== undefined &&
                    item.matterDescription
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                );
                this.setState({ finalData: filteredData });
              } else {
                this.setState({
                  finalData: this.state.tableData,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
  filterByClientInput = () => (
    <div>
      <SearchOutlined
        style={{ "vertical-align": "revert" }}
        onClick={() => {
          this.state.showSearchClient === false
            ? this.setState({
              ...this.state,
              showSearchClient: true,
              showSearchPractise: false,
              showSearchMatter: false,
            })
            : this.setState({ ...this.state, showSearchClient: false });
        }}
      />
      <span style={{ paddingLeft: "8px" }}> Client </span>

      <div>
        {this.state.showSearchClient && (
          <input
            className="mt-2"
            placeholder="Search Client "
            value={this.state.value}
            onChange={(e) => {
              let filteredData = [];
              this.setState({ value: e.target.value });

              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = this.state.tableData.filter(
                  (item) =>
                    item.Client !== undefined &&
                    item.Client.toLowerCase().includes(
                      e.target.value.toLowerCase()
                    )
                );
                this.setState({ finalData: filteredData });
              } else {
                this.setState({
                  finalData: this.state.tableData,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
  filterByPractiseInput = () => (
    <div>
      <SearchOutlined
        style={{ "vertical-align": "revert" }}
        onClick={() => {
          this.state.showSearchPractise === false
            ? this.setState({
              ...this.state,
              showSearchPractise: true,
              showSearchClient: false,

              showSearchMatter: false,
            })
            : this.setState({ ...this.state, showSearchPractise: false });
        }}
      />
      <span style={{ paddingLeft: "8px" }}> Practise Area </span>

      <div >
        {this.state.showSearchPractise && (
          <input className="mt-2"
            placeholder="Search Practise Area "
            value={this.state.value}
            onChange={(e) => {
              let filteredData = [];
              this.setState({ value: e.target.value });

              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = this.state.tableData.filter(
                  (item) =>
                    item.PractiseArea !== undefined &&
                    item.PractiseArea.toLowerCase().includes(
                      e.target.value.toLowerCase()
                    )
                );
                this.setState({ finalData: filteredData });
              } else {
                this.setState({
                  finalData: this.state.tableData,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
  render() {
    //Search Related

    /*
  useEffect(() => {
    
    async function fetchData() {
     response = await api.get('/contact/showall')
      setTable()
    }
    fetchData();
  }, []);
 */

    //   const handleciSelect = (record) => {
    //     // dispatch(selectBlog(record))
    //     // this.props.history.push('/lawyer/details')
    //   }

    const handleAddNew = (type) => {
      //  dispatch(selectBlog())
      this.props.history.push('/manage/Matter/add', this.props.user);
    };

    const handleEdit = (record) => {
      const current = this.state.finalData.length === 0 && this.state.value.length === 0
        ? this.state.tableData
        : this.state.finalData

      const selected = current.filter((item, index) => { if (item.selected) return item })
      if (selected.length > 0) {
        this.props.history.push('/edit/matter', record.id);
      } else {
        notification.warn({ message: "Please select a matter" })
      }
    };

    const handleDelete = (record) => {
      const current = this.state.finalData.length === 0 && this.state.value.length === 0
        ? this.state.tableData
        : this.state.finalData

      const selected = current.filter((item, index) => { if (item.selected) return item })
      if (selected.length > 0) {
        api
          .get('/matter/delete/' + record.id)
          .then(() => {
            this.componentDidMount()
            notification.success({ message: 'Matter deleted.' })
          })
          .catch(() => notification.error({ message: 'Failed to delete' }));
      } else {
        notification.warn({ message: "Please select a matter" })
      }

    };

    const columns = [
      {
        title: this.filterByMatterInput,
        dataIndex: 'matterDescription',
        key: '_id',
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
        title: this.filterByClientInput,
        dataIndex: 'Client',
        key: '_id',
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
        title: this.filterByPractiseInput,
        dataIndex: 'PractiseArea',
        key: '_id',
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
        title: 'Open Date',
        dataIndex: 'OpenDate',
        key: '_id',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.OpenDate.length - b.OpenDate.length,
      },
      {
        title: 'Action',
        render: (_, record) => {
          const { value, finalData, tableData } = this.state
          return (
            <Form.Check
              checked={record.selected}
              onChange={(event) => {
                if (finalData.length === 0 && value === '') {
                  let temp = tableData
                  temp.map((t, i) => {
                    if (i == record.index) {
                      t.selected = !t.selected
                    } else {
                      t.selected = false
                    }
                  })
                  this.setState({ ...this.state, tableData: temp })
                } else {
                  let temp = finalData
                  temp.map((t, i) => {
                    if (i == record.index) {
                      t.selected = !t.selected
                    } else {
                      t.selected = false
                    }
                  })
                  this.setState({ ...this.state, final: temp })
                }
                this.setState({ ...this.state, record: record })

              }
              }
              type="checkbox" />
          );
        },
      },
      //  {
      //   title: 'View',
      //   dataIndex: 'view',
      //   key: '_id',
      //   render: (_, record) => {
      //     return (
      //       <Button color="warning" onClick={() => handleView(record)}>
      //         View
      //       </Button>
      //     );
      //   },
      // },
      // {
      //   title: 'Edit',
      //   dataIndex: 'edit',
      //   key: '_id',
      //   render: (_, record) => {
      //     return (
      //       <Button color="warning" onClick={() => handleEdit(record)}>
      //         Edit
      //       </Button>
      //     );
      //   },
      // },
      // {
      //   title: 'Delete',
      //   dataIndex: 'delete',
      //   key: '_id',
      //   render: (_, record) => {
      //     return (
      //       <Popconfirm
      //         title="Are you sure delete this matter?"
      //         onConfirm={() => handleDelete(record)}
      //         okText="Yes"
      //         cancelText="No"
      //       >
      //         <Button danger>Delete</Button>
      //       </Popconfirm>
      //     );
      //   },
      // },
    ];

    console.log(this.state)
    const handleView = (rec) => {
      const current = this.state.finalData.length === 0 && this.state.value.length === 0
        ? this.state.tableData
        : this.state.finalData

      const selected = current.filter((item, index) => { if (item.selected) return item })
      if (selected.length > 0) {
        let data = {};
        data.id = response[rec.key]._id;
        data.userId = this.props.user._id;
        data.matters = this.state.tableData;
        this.props.history.push('/view/matter', data);
      } else {
        notification.warn({ message: "Please select a matter" })
      }

    };
    const setTable = (type) => {
      if (type === 'All') {
        this.setState({ tableData: this.state.all });
      } else if (type === 'open') {
        this.setState({ tableData: this.state.open });
      } else if (type === 'closed') {
        this.setState({ tableData: this.state.closed });
      } else if (type === 'pending') {
        this.setState({ tableData: this.state.pending });
      }
    };
    const exportPDF = () => {
      const unit = 'pt';
      const size = 'A4'; // Use A1, A2, A3 or A4
      const orientation = 'portrait'; // portrait or landscape

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);

      doc.setFontSize(15);

      const title = 'Matters';
      const headers = [
        ['S.N', 'Matter', 'Client', 'Practice Area', 'Open Date'],
      ];

      let data = [];
      console.log(this.state.tableData)
      this.state.tableData.map((value, index) => {
        const td = [
          index + 1,
          value.matterDescription,
          value.Client,
          value.PractiseArea ? value.PractiseArea : '-',
          value.OpenDate ? value.OpenDate : '-',
        ];
        data.push(td);
      });

      let content = {
        startY: 50,
        head: headers,
        body: data,
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save('matters.pdf');
    };
    console.log(this.state)
    return (
      <Spin size="large" spinning={this.state.loading}>
        <div className="d-flex mb-2 title-component-header">
          <div className="title-header-name">
            <h5>Matter</h5>
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
              onClick={() => handleAddNew()}
            >
              Add Matter
                </button>
          </div>
        </div>
        <Card>
          <div>
            <span className="ml-auto"></span>
            <div className="d-flex justify-content-between">
              <div>

                <Button
                  style={{ "margin": "0 10px 10px 0" }}
                  onClick={() => {
                    setTable('All');
                  }}
                >
                  All
</Button>

                <Button
                  style={{ "margin": "0 10px 10px 0" }}
                  onClick={() => {
                    setTable('open');
                  }}
                >
                  Open
                </Button>
                <Button
                  style={{ "margin": "0 10px 10px 0" }}
                  onClick={() => {
                    setTable('pending');
                  }}
                >
                  Pending
                </Button>
                <Button
                  style={{ "margin": "0 10px 10px 0" }}
                  onClick={() => {
                    setTable('closed');
                  }}
                >
                  Closed
                </Button>
              </div>
              <div>
                <Button
                  style={{ "margin": "0 10px 10px 0" }}
                  color="warning" onClick={() => handleView(this.state.record)}>
                  View
                </Button>
                <Button
                  style={{ "margin": "0 10px 10px 0" }}
                  color="warning" onClick={() => handleEdit(this.state.record)}>
                  Edit
                </Button>

                <Popconfirm
                  title="Are you sure delete a matter?"
                  onConfirm={() => handleDelete(this.state.record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    style={{ "margin": "0 10px 10px 0" }}
                    danger>Delete</Button>
                </Popconfirm>

              </div>

            </div>
          </div>
          <br></br>

          <Table
            //   style={{cursor: "pointer"}}
            className="table-responsive"
            dataSource={
              this.state.finalData.length === 0 && this.state.value.length === 0
                ? this.state.tableData
                : this.state.finalData
            }
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                //      onClick: () => handleView(record),
                onDoubleClick: () => handleView(record), // double click row
                onContextMenu: (event) => { }, // right button click row
                onMouseEnter: (event) => { }, // mouse enter row
                onMouseLeave: (event) => { }, // mouse leave row
              };
            }}
          ></Table>
        </Card>

      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.token.user,
});
export default connect(mapStateToProps)(matterManage);
