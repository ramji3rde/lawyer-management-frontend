import React, { Component } from 'react';
import Footer from '../../components/HomePage/footer';
import Navigation from '../../components/HomePage/navigation';
import api, { apiUrl } from '../../../resources/api';
import Contactimg from '../../components/img/Lawyer-Blog.png';
import { Rate } from 'antd';
import axios from 'axios';

class Blogcard extends Component {
  state = {
    blogs: [],
    data: {}
  };

  componentDidMount() {
    axios.get(`${apiUrl}/testimonials/showall`).then((res) =>
      this.setState({
        blogs: res.data.data,
      })
    );
    console.log(this.state.blogs);
    api.get(`/footer/showall/`).then((res) => {
      if (!res.data.data[res.data.data.length - 1].blogTitle) {
        res.data.data[res.data.data.length - 1].blogTitle = ""
      }
      this.setState({
        ...this.state, data: res.data.data[res.data.data.length - 1]
      })
    })
  }

  render() {
    const handleRoute = (route) => {
      console.log(route)
      this.props.history.push(route)
    }
    return (
      <>
        <Navigation />
        <div className="text-center my-5">
          <div className="container">
            <div className="row mb-5">
              <div className="banner-text col-lg-8 p-5 section-title">
                <h2 className="text-center">Testimonial</h2>

              </div>
              <div className="banner-img col-lg-4">
                <img src={Contactimg} width="90%" alt="Banner Img" />
              </div>
            </div>
            <div id="profile" className="row">
              {this.state.blogs.map((blog) => (
                <div className="col-md-4 mb-3 overflow-hidden" key={blog._id}>
                  <div className="card shadow-sm blogcard blogcard-box">
                    <img
                      className="card-img-top blogpage-image"
                      src={blog.image || 'img/portfolio/01-small.jpg'}
                      alt="Blog Image"
                    />
                    <div className="card-body">
                      <a href={`/blogpage/${blog._id}`}>
                        <h5 className="card-title overflow-hidden cardblogtitle">
                          {blog.author}
                        </h5>
                      </a>
                      <p className="card-text cardblogdescription overflow-hidden">
                        {blog.description}
                      </p>
                      <Rate disabled defaultValue={blog.rating}></Rate>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer handleRoute={handleRoute} />
      </>
    );
  }
}
export default Blogcard;
