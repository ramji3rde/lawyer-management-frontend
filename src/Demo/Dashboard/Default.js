import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Button } from 'react-bootstrap';

import { notification, Progress } from 'antd'
import api from '../../resources/api'
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { logoutUser } from '../../store/Actions'



class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      time: "",
      taskCount: 0,
      taskduetoday: 0,
      eventduetoday: 0,
      eventCount: 0,
      draftCount: 0,
      draftAmount: 0,
      unPaidCount: 0,
      unPaidAmount: 0,
      overDueCount: 0,
      overDueAmount: 0,
      totalHours: 0,
      targetDetails: {},
      percent: 0,
      left: 0,
      activeMatters: 0,
      overdueMatters: 0
    }
  }
  async componentDidMount() {
    var now = new Date();
    const { _id, isOwner, userName } = this.props.user
    api.get('/tasks/viewforuser/' + _id).then((res) => {
      let tcount = 0
      let today = 0
      res.data.data.map((val, index) => {
        if (val.status == false && (isOwner || userName == val.userName)) {
          tcount++
          var date = new Date(Date.parse(val.dueDate));
          if (date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()) {
            today++
          }
        }
      })
      this.setState({ taskCount: tcount, taskduetoday: today })
    })

    api.get('/calendar/viewforuser/' + _id).then((res) => {
      let Ecount = 0
      let eventsToday = 0
      res.data.data.map((val, index) => {
        if (isOwner || userName === val.userName) {
          Ecount++
          var date = new Date(Date.parse(val.startTime));
          if (date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()) {
            eventsToday++
          }
        }
      })

      this.setState({ eventCount: Ecount, eventduetoday: eventsToday })
    })

    api.get('/billing/bill/viewforuser/' + _id).then((res) => {
      let draftCount = 0
      let draftAmount = 0
      let unPaidCount = 0
      let unPaidAmount = 0
      let overDueCount = 0
      let overDueAmount = 0
      const currentDate = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]


      // for test 
      const nnndate = res.data.data[0] ? res.data.data[0].dueDate : "";

      if (currentDate > nnndate) {
        console.log("hellow")
      } else {
        console.log("skadh")
      }
      console.log(currentDate)
      console.log(nnndate)


      res.data.data.map((value, index) => {
        if (isOwner || userName === value.userName) {
          if (value.status == "Unpaid") {
            unPaidCount++
            unPaidAmount = unPaidAmount + parseFloat(value.balance)

            if (currentDate > value.dueDate) {
              overDueCount++
              overDueAmount += parseFloat(value.balance)
            }
          }
          if (value.status == "draft") {
            draftCount++
            draftAmount = draftAmount + parseFloat(value.balance)

          }
        }
      })
      this.setState({
        unPaidAmount: unPaidAmount,
        unPaidCount: unPaidCount,
        draftAmount: draftAmount,
        draftCount: draftCount,
        overDueCount: overDueCount,
        overDueAmount: overDueAmount
      })
    })
    let totalHours = 0
    api.get('/activity/viewforuser/' + _id).then((res) => {
      console.group(res)
      let totalHours = 0
      res.data.data.map((value, index) => {
        let end_of_the_year = new Date(new Date().getFullYear(), 11, 31)
        let start_of_the_year = new Date(new Date().getFullYear(), 1, 1)
        let date = new Date(Date.parse(value.date));
        if (date < end_of_the_year && date > start_of_the_year) {

          if (value.type == "expense") {
            totalHours = totalHours + parseInt(value.qty)
          }
          if (value.type == "time") {

            var sHours = value.time.split(':')[0];
            var sMinutes = value.time.split(':')[1];
            var sSecs = value.time.split(':')[2];
            totalHours = totalHours + parseInt(sHours)
          }
        }
      })
      this.setState({
        totalHours: totalHours
      })
      console.group(this.state.totalHours)
    }).then(() => {
      api.get(`user/view/${_id}`).then((res) => {
        if (res.data.data.target == undefined) {
          res.data.data.target = null
        } else {

          let data = res.data.data.target
          let targetHours = parseFloat(data.target) / parseFloat(data.rate)
          let left = targetHours - this.state.totalHours >= 0 ? targetHours - this.state.totalHours : 0
          console.log(this.state.totalHours + "   " + targetHours)
          let percent = (this.state.totalHours / targetHours) * 100
          this.setState({
            targetHours,
            percent,
            left
          })
        }
        this.setState({
          targetDetails: res.data.data.target,
        })
      })
    })

    api
      .get('/matter/viewforuser/' + _id)
      .then((res) => {
        console.log({ res })
        let activeMatters = 0
        let overdueMatters = 0
        const now = new Date().getTime()

        res.data.data.map((value, index) => {
          if (isOwner || userName === value.userName) {
            const open = new Date(value.openDate).getTime();
            const closed = new Date(value.closeDate).getTime();
            if (value.status === 'Open' && now < closed) {
              activeMatters++
            } else
              if (value.status === 'Open' && now > closed) {
                overdueMatters++
              }
            this.setState({ activeMatters, overdueMatters })
          }
        });
      });



  }


  render() {



    //if(user.token.user.updated)

    const tabContent = (
      <Aux>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Silje Larsen</h6>
            <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3784</span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Julie Vad</h6>
            <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3544</span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Storm Hanse</h6>
            <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />2739</span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Frida Thomse</h6>
            <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />1032</span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Silje Larsen</h6>
            <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />8750</span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Storm Hanse</h6>
            <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />8750</span>
          </div>
        </div>
      </Aux>
    );

    return (
      <Aux>
        <h6 style={{ "font-size": "16px", "padding-bottom": "10px" }}><b>Today's Agenda</b></h6>
        <Row>
          <Col md={6} xl={6}>
            <Card>
              <Card.Body style={{ "padding": "0px 0.6rem" }}>
                <div className="row d-flex align-items-center">
                  <div className="col-6" style={{ "border-right": "1px solid #d7dee2", "padding-right": "0px" }}>
                    <div className="d-flex" style={{ "padding": "1rem 0", "align-items": "center", "justify-content": "space-around" }}>
                      <h5 className="dashboard-taskmargin"><b>{this.state.taskCount}</b></h5>
                      <div className="dashboard-taskmargin">
                        <p className="dashboard-totaltask"><b>Total task due</b></p>
                        <span style={{ "font-size": "9px" }}>Updated just now.</span>
                      </div>
                      <div className="form-add" onClick={() => this.props.history.push('/tasks', "from dashboard")}></div>
                    </div>
                  </div>

                  <div className="col-6">
                    <p className="dashboard-tasktoday">You have {this.state.taskduetoday} tasks due today</p>
                  </div>

                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Card>
              <Card.Body style={{ "padding": "0px 0.6rem" }}>
                <div className="row d-flex align-items-center">
                  <div className="col-6" style={{ "border-right": "1px solid #d7dee2", "padding-right": "0px" }}>
                    <div className="d-flex" style={{ "padding": "1rem 0", "align-items": "center", "justify-content": "space-around" }}>
                      <h5 className="dashboard-taskmargin"><b>{this.state.eventCount}</b></h5>
                      <div className="dashboard-taskmargin">
                        <p className="dashboard-totaltask"><b>Total calendar Events</b></p>
                        <span style={{ "font-size": "9px" }}>Updated just now.</span>
                      </div>
                      <div className="form-add" onClick={() => this.props.history.push('/calendar')}></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="dashboard-tasktoday">You have {this.state.eventduetoday} events scheduled for today</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={6}>
            <Card>
              <Card.Body style={{ "padding": "0px 0.6rem" }}>
                <div className="row d-flex align-items-center">
                  <div className="col-12" style={{ "padding-right": "0px" }}>
                    <div className="d-flex" style={{ "padding": "1rem 0", "align-items": "center", "justify-content": "space-around" }}>
                      <h5 className="dashboard-taskmargin"><b>{this.state.activeMatters}</b></h5>
                      <div className="dashboard-taskmargin">
                        <p className="dashboard-totaltask"><b>Active matters</b></p>
                        <span style={{ "font-size": "9px" }}>Updated just now.</span>
                      </div>
                      <div className="form-add" onClick={() => this.props.history.push('/contact')}></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Card>
              <Card.Body style={{ "padding": "0px 0.6rem" }}>
                <div className="row d-flex align-items-center">
                  <div className="col-12" style={{ "padding-right": "0px" }}>
                    <div className="d-flex" style={{ "padding": "1rem 0", "align-items": "center", "justify-content": "space-around" }}>
                      <h5 className="dashboard-taskmargin"><b>{this.state.overdueMatters}</b></h5>
                      <div className="dashboard-taskmargin">
                        <p className="dashboard-totaltask"><b>Overdue matters</b></p>
                        <span style={{ "font-size": "9px" }}>Updated just now.</span>
                      </div>
                      <div className="form-add" onClick={() => this.props.history.push('/contact')}></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={5} xl={5}>
            <h6 style={{ "font-size": "16px", "padding-bottom": "10px" }}><b>Hourly Metrics</b></h6>
            <Card className='Recent-Users' style={{ "height": "390px" }}>
              <Card.Header>
                <Card.Title as='h5'>Billable Hours Target</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2' style={{ "display": "flex", "justify-content": "center", "align-items": "center" }}>
                {
                  this.state.targetDetails == null ?
                    <div>
                      <h6 className='mb-4 pl-2'><b>Billable Hours Target</b></h6>
                      <div>
                        <Button variant="info" className="btn-sm" onClick={() => this.props.history.push('/target')}>SET UP YOUR TARGET</Button>
                      </div>
                    </div>
                    :
                    <div style={{ textAlign: "center" }}>
                      <Progress type="circle" percent={this.state.percent.toFixed('0')} />

                                  `          <h6 className="responsive-target">{this.state.left} hours more to achive the target</h6>
                      <div>
                        <Button variant="info" className="btn-sm" onClick={() => this.props.history.push('/target')}>RESET YOUR TARGET</Button>
                      </div>
                    </div>
                }
              </Card.Body>
            </Card>

          </Col>

          <Col md={7} xl={7}>
            <h6 style={{ "font-size": "16px", "padding-bottom": "10px" }}><b>Billing Metrics for Firm</b></h6>
            <Row>
              <Col md={12} xl={6}>
                <Card>
                  <Card.Body style={{ "padding": "1rem" }}>
                    <h6 className='mb-4'><b>Draft bills</b></h6>
                    <div className="row d-flex align-items-center">
                      <div className="col-4">
                        <h4 className="f-w-300 d-flex align-items-center m-b-0"><b>
                          {this.state.draftCount}</b></h4>
                      </div>

                      <div className="col-8 text-right">
                        <Button variant="success" className="btn-sm" onClick={() => this.props.history.push('/manage/billing')}>Create New Bills</Button>
                      </div>
                    </div>
                    {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                            </div> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} xl={6}>
                <Card>
                  <Card.Body style={{ "padding": "1rem" }}>
                    <h6 className='mb-4'><b>Total in draft</b></h6>
                    <div className="row d-flex align-items-center">
                      <div className="col-4">
                        <h4 className="f-w-300 d-flex align-items-center m-b-0">
                          {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                          <b> ${this.state.draftAmount.toFixed('2')}</b></h4>
                      </div>

                      <div className="col-8 text-right">
                        <Button variant="info" className="btn-sm" onClick={() => this.props.history.push('/manage/billing')}>Create New Bills</Button>
                      </div>
                    </div>
                    {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                            </div> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12} xl={6}>
                <Card>
                  <Card.Body style={{ "padding": "1rem" }}>
                    <h6 className='mb-4'><b>Unpaid bills</b></h6>
                    <div className="row d-flex align-items-center">
                      <div className="col-4">
                        <h4 className="f-w-300 d-flex align-items-center m-b-0">
                          {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                          <b> {this.state.unPaidCount}</b></h4>
                      </div>
                      <div className="col-8 text-right">
                        <Button variant="success" className="btn-sm" onClick={() => this.props.history.push('/manage/billing')}>Create New Bills</Button>
                      </div>
                    </div>
                    {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                            </div> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} xl={6}>
                <Card>
                  <Card.Body style={{ "padding": "1rem" }}>
                    <h6 className='mb-4'><b>Total unpaid bills</b></h6>
                    <div className="row d-flex align-items-center">
                      <div className="col-4">
                        <h4 className="f-w-300 d-flex align-items-center m-b-0">
                          {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                          <b> ${this.state.unPaidAmount.toFixed('2')}</b></h4>
                      </div>

                      <div className="col-8 text-right">
                        <Button variant="info" className="btn-sm" onClick={() => this.props.history.push('/manage/billing')}>Create New Bills</Button>
                      </div>
                    </div>
                    {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                            </div> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12} xl={6}>
                <Card>
                  <Card.Body style={{ "padding": "1rem" }}>
                    <h6 className='mb-4'><b>Overdue bills</b></h6>
                    <div className="row d-flex align-items-center">
                      <div className="col-4">
                        <h4 className="f-w-300 d-flex align-items-center m-b-0">
                          {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> */}
                          <b>  {this.state.overDueCount} </b></h4>
                      </div>

                      <div className="col-8 text-right">
                        <Button variant="success" className="btn-sm" onClick={() => this.props.history.push('/manage/billing')}>Create New Bills</Button>
                      </div>
                    </div>
                    {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                            </div> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} xl={6}>
                <Card>
                  <Card.Body style={{ "padding": "1rem", }}>
                    <h6 className='mb-4'><b>Total overdue bills</b></h6>
                    <div className="row d-flex align-items-center">
                      <div className="col-4">
                        <h4 className="f-w-300 d-flex align-items-center m-b-0">
                          {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                          <b> ${this.state.overDueAmount.toFixed('2')}</b></h4>
                      </div>

                      <div className="col-8 text-right">
                        <Button variant="info" className="btn-sm" onClick={() => this.props.history.push('/manage/billing')}>View Overdue Bills</Button>
                      </div>
                    </div>
                    <div className="progress m-t-30" style={{ height: '7px' }}>
                      <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {
          /* 
           <Row>   
      <Col md={6} xl={4}>
          <Card>
              <Card.Header>
                  <Card.Title as='h5'>Rating</Card.Title>
              </Card.Header>
              <Card.Body>
                  <div className="row align-items-center justify-content-center m-b-20">
                      <div className="col-6">
                          <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow"/></h2>
                      </div>
                      <div className="col-6">
                          <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                      </div>
                  </div>
	
                  <div className="row">
                      <div className="col-xl-12">
                          <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>5</h6>
                          <h6 className="align-items-center float-right">384</h6>
                          <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                              <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                          </div>
                      </div>
	
                      <div className="col-xl-12">
                          <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>4</h6>
                          <h6 className="align-items-center float-right">145</h6>
                          <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                              <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                          </div>
                      </div>
	
                      <div className="col-xl-12">
                          <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>3</h6>
                          <h6 className="align-items-center float-right">24</h6>
                          <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                              <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                          </div>
                      </div>
	
                      <div className="col-xl-12">
                          <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>2</h6>
                          <h6 className="align-items-center float-right">1</h6>
                          <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                              <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
                          </div>
                      </div>
                      <div className="col-xl-12">
                          <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>1</h6>
                          <h6 className="align-items-center float-right">0</h6>
                          <div className="progress m-t-30  m-b-5" style={{height: '6px'}}>
                              <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"/>
                          </div>
                      </div>
                  </div>
              </Card.Body>
          </Card>
      </Col>
      <Col md={6} xl={8} className='m-b-30'>
          <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                  {tabContent}
              </Tab>
              <Tab eventKey="week" title="This Week">
                  {tabContent}
              </Tab>
              <Tab eventKey="all" title="All">
                  {tabContent}
              </Tab>
          </Tabs>
      </Col>
  </Row>
	
          */
        }
      </Aux>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logoutUser,

});

const mapStateToProps = (state) => ({
  user: state.user.token.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
