import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, notification, Card } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { getFirmMembers, AddFirmMembers, EditFirmMembers, UpdateUserDetails } from "../../../store/Actions";
import api from "../../../resources/api"
import { Popconfirm, message } from 'antd';
import ManageFirmModal from './MembersModal'
import { Switch } from 'antd';

const LawyerManagement = (props) => {

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const [editMode, seteditMode] = useState(false);
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [member_details, setMembeDetails] = useState({
    name: '',
    userName: ''
  })

  const [error, setError] = useState({
    name: '',
    userName: ''
  })
  //Search Related 
  const [state, setState] = useState({})

  const { members } = useSelector((state) => state.members)
  const { user } = useSelector((state) => state.user.token)

  useEffect(() => {
    dispatch(getFirmMembers(user._id))
  }, []);

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // console.log('Node',node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      console.log(dataIndex, record)
      return (record[dataIndex] || '').toString().toLowerCase().includes((value || '').toLowerCase())
    },

    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={(text || '').toString()}
        />
      ) : (
        text
      )
  })
  const handleEdit = (member) => {
    seteditMode(true);
    setVisible(true);
    setMembeDetails(member)
  }

  useEffect(() => {
    if (members) {
      const new_table = [...rootMember, ...members]
      new_table.map((item, index) => {
        if (item.userName === user.userName) {
          item.isActive = true;
        } else {
          item.isActive = false
        }
      })
      setTableData(new_table)
    }
  }, [members])

  const OnActiveMemberChange = (checked, record) => {
    if (checked) {
      const new_table = [...rootMember, ...members]
      new_table.map((item, index) => {

        if (item.userName === record.userName) {
          item.isActive = true;
          dispatch(UpdateUserDetails({
            ...user,
            isOwner: item.userName === user.ownerUserName ? true : false,
            userName: record.userName
          }))
        } else {
          item.isActive = false
        }

      })
      setTableData(new_table)
    } else {
      const new_table = [...rootMember]
      dispatch(UpdateUserDetails({
        ...user,
        isOwner: true,
        userName: record.userName
      }))
      members.map((item, index) => {
        new_table.push({
          ...item,
          isActive: false
        })
      })
      setTableData(new_table)
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      sorter: (a, b, c) => (
        c === 'ascend'
          ? a.name < b.name
          : a.name > b.name
      )
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b, c) => (
        c === 'ascend'
          ? a.userName < b.userName
          : a.userName > b.userName
      )
    },
    {
      title: 'Active',
      render: (_, record) => {
        return (
          <Switch checked={record.isActive} onChange={(ch) => OnActiveMemberChange(ch, record)} />
        )
      }
    },

    {
      title: 'Edit',
      render: (_, record) => {
        if (record.userName !== user.ownerUserName)
          return (
            <Button onClick={() => handleEdit(record)}>Edit</Button>
          )
      }
    },

    {
      title: 'Delete',
      dataIndex: "delete",
      key: "_id",
      render: (_, record) => {
        if (record.userName !== user.ownerUserName)
          return (
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          )
      }
    },

  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };


  const handleDelete = (id) => {

    api.get(`/members/delete/${id}`).then(res => {
      console.log({ res })
      dispatch(getFirmMembers(user._id))
      // notification.success({"User Deleted!"})

    }).catch(error => {
      console.log({ error })
      notification.error("Can't delete user")
    })
  }

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    setMembeDetails((st) => ({ ...st, [name]: value }));
    var err = error;
    switch (name) {
      case "userName":
        err.userName = value.length > 0
          ? ""
          : "Please provide a name";
        break;
      case "name":
        err.name = value.length > 0
          ? ""
          : "Please provide a username";
        break;

      default:
        break;
    }
    setError({ ...err });
  }

  const checkValidity = () => {
    if (member_details["name"] === "" || member_details["userName"] === "") {
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else {
      setLoading(true)
      !editMode
        ? dispatch(
          AddFirmMembers({ ...member_details, userId: user._id }, (err, response) => {
            console.log(response)
            if (err) {
              setLoading(false);
              notification.error(response);
            } else {
              setLoading(false);
              setVisible(false);
              setMembeDetails({
                name: '',
                userName: ''
              })
              notification.success(response);
            }
          })
        )
        : dispatch(
          EditFirmMembers({ ...member_details, userId: user._id }, (err, response) => {
            console.log({ err, response })
            if (err) {
              setLoading(false);
              notification.error(response);
            } else {
              setLoading(false);
              setVisible(false);
              seteditMode(false);
              setMembeDetails({
                name: '',
                userName: ''
              })
              notification.success(response);
            }
          })
        );
    }
  };

  const handleSubmit = () => {
    const validateForm = () => {
      let valid = true;
      Object.values(error).forEach((val) => val.length > 0 && (valid = false));
      return valid;
    };
    if (validateForm()) {
      checkValidity();
    } else {
      return notification.warning({
        message: "Failed to Register.",
      });
    }
  }

  const rootMember = [{
    name: user.firstName + " " + user.lastName,
    userName: user.ownerUserName,
    isActive: user.isOwner,
    isOwner: user.isOwner,
  }]

  return (
    <>

      <ManageFirmModal
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={() => setVisible(false)}
        visible={visible}
        editMode={editMode}
        error={error}
        MemberDetails={member_details}
        loading={loading}
      />

      <div className="d-flex mb-2 title-component-header">
        <div className="title-header-name">
          {/* <h5>Firm members</h5> */}
        </div>
        <div className="d-flex extra-iteam-div">
          <button
            className="btn  btn-outline-primary   btn-sm"
            onClick={() => setVisible(true)}
          >
            Add Members
          </button>
        </div>
      </div>

      <Card bodyStyle={{ padding: '0px' }} className="overflow-auto">
        <Table className="table-responsive"
          dataSource={
            tableData.length
              ? tableData
              : members
                ? [...rootMember, ...members]
                : [...rootMember]
          }
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => { }, // double click row
              onContextMenu: event => { }, // right button click row
              onMouseEnter: event => { }, // mouse enter row
              onMouseLeave: event => { }, // mouse leave row
            };
          }}>

        </Table>
      </Card>
    </>
  );
};

export default LawyerManagement;
