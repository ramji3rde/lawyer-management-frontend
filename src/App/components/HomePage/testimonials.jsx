import React, { Component } from "react";
import axios from 'axios'
import { apiUrl } from "../../../resources/api";
import { Rate } from 'antd';
export class Team extends Component {
  state = {
    testimonials: []
  }

  componentDidMount() {
    axios.get(`${apiUrl}/testimonials/showall`)
      .then(res =>
        this.setState({
          testimonials: res.data.data
        })
      )
  }
  render() {
    const testimonialsData = this.state.testimonials.slice(0, 6)
    return (
      <div id="blog" className="text-center">
        <div className="container">
          <div className="col-12">
            <h2 className="title-bdr">Testimonials</h2>
          </div>
          <div className="row">
            {
              testimonialsData.map(blog => (
                <div id="profile" className="col-md-4 mb-3 overflow-hidden">
                  <div className="card shadow-sm blogcard blogcard-box">
                    <img
                      className="card-img-top blogpage-image"
                      src={blog.image || 'img/portfolio/01-small.jpg'}
                      alt="Blog Image" />
                    <div className="card-body">
                      <a href={`/blogpage/${blog._id}`}>
                        <h5 className="card-title overflow-hidden cardblogtitle">{blog.author}</h5>
                      </a>
                      <p className="card-text cardblogdescription overflow-hidden">{blog.description}</p>
                    <Rate disabled defaultValue={blog.rating || 4}></Rate>

                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="col-md-12 col-md-offset-1 text-center">
            <a href="/testimonials" class="mt-5 text-custom-primary cta-btn-blank"><span>View More</span></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
