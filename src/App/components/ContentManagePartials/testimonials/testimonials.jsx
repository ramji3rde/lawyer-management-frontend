import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlog, createBlog, updateTestimonial } from '../../../../store/Actions';
import { Form, Button } from 'react-bootstrap';
import { notification, Card, Spin } from 'antd';
import api from '../../../../resources/api';
import { result } from 'lodash';
import CKEditor from 'ckeditor4-react';
import { Rate } from 'antd';

const validNameRegex = RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);

const AddEditBlog = (props) => {
  const [state, setState] = useState({
    author: '',
    description: '',
    image: '',
    rating: 4
  });
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState({});

  //image url
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const selected = useSelector((state) => state.testimonials.selected);

  useEffect(() => {
    if (!selected) {
      setEditMode(false);
    } else {
      setState({ ...selected });
      setEditMode(true);
    }
  }, []);



  const handleChange = (e) => {
    e.persist();
    setDisplay(false);
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case 'author':
        errors.author =
          value.length == 0
            ? 'Author is required'
            : !validNameRegex.test(value)
              ? 'Author Name must be in characters!'
              : '';
        break;
      case 'description':
        errors.description =
          value.length == 0
            ? 'Description is required'
            : value.length < 10
              ? 'Description is too Short'
              : '';
        break;
      default:
        break;
    }
    setError({ ...errors });
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!display) {
      const validateForm = (error) => {
        let valid = true;
        Object.values(error).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
      };
      if (validateForm(error)) {
        checkValidity();
      } else {
        setDisplay(true);
        return notification.warning({
          message: 'Failed to Add New Blog',
        });
      }
    }
  };

  function checkValidity() {
    console.log({ state }, { editMode })
    if (!Object.keys(state).every((k) => state[k] !== '')) {
      setDisplay(true);
      return notification.warning({
        message: 'Fields Should Not Be Empty',
      });
    } else {
      setLoading(false)
      if (editMode) {
        console.log('blog', state);
        dispatch(
          updateTestimonial({ id: state._id, body: state }, (err, response) => {
            if (err) {
              notification.error(err);
            } else {
              props.history.goBack();
              notification.success(response);
            }
            setLoading(false)
          })
        );
      } else {
        var docFormData = new FormData();
        docFormData.set('image', state.image);
        api
          .post('/footer/upload', docFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            console.log({ response })
            api
              .post('/testimonials/create', { ...state, image: response.data.message })
              .then((result) => {
                // image upload to the server
                console.log({ result })
                setLoading(false)
                props.history.goBack();
                notification.success({ message: "Testimonial added" })
              })
              .catch((err) => {
                setLoading(false)
                console.log({ err });
              });

          }).catch((err) => {
            console.log(err)
            setLoading(false)
            notification.warning({ message: "Cannot add testimonial, Please try again later" })
          })

      }
    }
  }

  // handel Image Upload
  const uploadImage = (e) => {
    setState({ ...state, image: e.target.files[0] });
  };

  return (
    <Spin spinning={loading}>
      <Card>
        <h3 className="text-center">{editMode ? 'Edit Blog' : 'Add New Blog'}</h3>
        {
          editMode && typeof state.image === 'string' &&
          (<img style={{ width: '200px', height: '200px' }} src={state.image}></img>)
        }
        <Form className="form-details">
          <Form.Group controlId="formGroupEmail">
            <input
              type="file"
              name="file"
              onChange={uploadImage}
              placeholder="Upload Image"
            />
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Author</Form.Label>
            <Form.Control
              name="author"
              type="text"
              placeholder="author"
              value={state['author']}
              onChange={handleChange}
            />
            <p className="help-block text-danger">{error.author}</p>
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Description"
              value={state['description']}
              onChange={handleChange}
            />
            <p className="help-block text-danger">{error.shortDescription}</p>
          </Form.Group>
          <Rate className="mb-4" defaultValue={state.rating} onChange={(r) => setState({ ...state, rating: r })} ></Rate>
          <p className="help-block text-danger">{error.description}</p>
          <Button onClick={handleSubmit}>{editMode ? 'Update' : 'Create'}</Button>
        </Form>
      </Card>
    </Spin>
  );
};

export default AddEditBlog;
