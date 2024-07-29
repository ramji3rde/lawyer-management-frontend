import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Popconfirm, message, notification, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Highlighter from "react-highlight-words";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonial,
  deleteBlog,
  selectBlog,
  deleteTestimonial,
  selectTestimonials
} from "../../../../store/Actions";
import api from "../../../../resources/api";
import { Rate } from 'antd';

const BlogsManage = (props) => {
  const dispatch = useDispatch();
  const [data, setdata] = useState({});
  const [tableData, setTableData] = useState([]);

  //Search Related
  const [state, setState] = useState({});
  const testimonials = useSelector((state) => state.testimonials.testimonials);
  console.log(testimonials, 'testimonials testimonials testimonials')

  useEffect(() => {
    dispatch(
      getTestimonial(null, (err, response) => {
        if (err) {
          notification.error(err);
        } else {
          notification.success(response);
          setTableData(testimonials)
        }
      })
    );
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            // console.log('Node',node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      console.log(dataIndex, record);
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  // const handleBlogSelect = (record) => {
  //   // dispatch(selectBlog(record))
  //   // props.history.push('/lawyer/details')
  // }

  const handleAddNew = () => {
    dispatch(selectBlog());
    props.history.push("/manage/testimonials/add");
  };

  const handleEdit = (record) => {
    dispatch(selectTestimonials(record));
    props.history.push("/manage/testimonials/edit");
  };

  const handleDelete = (record) => {
    dispatch(
      deleteTestimonial({ id: record._id }, (err, response) => {
        if (err) {
          notification.error(err);
        } else {
          notification.success(response);
        }
      })
    );
  };

  const cancel = (e) => {
    message.error('Canceled');
  }
  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "_id",
      ...getColumnSearchProps("author"),
      sorter: (a, b, c) =>
        c === "ascend" ? a.author < b.author : a.author > b.author,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      sorter: (a, b, c) =>
        c === "ascend"
          ? a.description < b.description
          : a.description > b.description,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (_, record) => {
        return (
          record.rating && <Rate disabled defaultValue={record.rating}></Rate>
        );
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "_id",
    //   ...getColumnSearchProps("description"),
    //   sorter: (a, b, c) =>
    //     c === "ascend"
    //       ? a.description < b.description
    //       : a.description > b.description,
    // },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "_id",
      render: (_, record) => {
        return (
          <Button color="warning" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "_id",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure you want to delete this testimonial ?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => cancel()}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
          </Button>
          </Popconfirm>

        );
      },
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  const handleChange = (e) => {
    setdata({
      ...data,
      blogTitle: e.target.value
    })
  }
  const handleDescription = () => {
    notification.destroy()
    api.post(`footer/edit/${data._id}`, data).then((res) => {
      console.log(res)
      notification.success({ message: "Changes saved" })
    }).catch((err) => {
      notification.error({ message: "Please try again later." })
    })

  }
  return (
    <div>
      <div className="p-2 ">
        <Button className="ml-auto" color="success" onClick={handleAddNew}>
          Add New
        </Button>
      </div>
      <Card bodyStyle={{ padding: '0px' }} className="overflow-auto">
        <Table className="overflow-auto"
          dataSource={testimonials}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => { }, // double click row
              onContextMenu: (event) => { }, // right button click row
              onMouseEnter: (event) => { }, // mouse enter row
              onMouseLeave: (event) => { }, // mouse leave row
            };
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default BlogsManage;
