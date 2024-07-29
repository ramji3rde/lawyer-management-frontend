import React, { useState } from 'react'
import { Tabs, Card, Button, Spin } from 'antd';
import Contact from '../ContactManagement/index';
import Matters from '../Matter/Matter';
import Accounts from '../Accounts/index';
import Documents from '../Documents/index';
import Tasks from '../Tasks/index';
import api from '../../../resources/api'
const { TabPane } = Tabs;

const TakeATour = (props) => {
  const [active, setActive] = useState("1");
  const [loading, setLoading] = useState(false)
  const callBack = (key) => {
    setActive(key)
    console.log(key)
  }

  const onSkip = () => {
    setLoading(true)
    let user = JSON.parse(window.localStorage.getItem('Case.user'))
    user = user.token.user
    delete user.userName
    api.post(`user/update/${user._id}`, { ...user, firstTimeLogin: false })
      .then((res) => {
        console.log(res)
        props.history.push('/dashboard/default')
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const renderButtons = (key) => (
    <div style={{ position: 'absolute', bottom: "4%", right: "4%" }}>
      <div className="row">
        <Button onClick={onSkip}>
          Skip
        </Button>
        {key !== "6" && <Button onClick={() => setActive(key)}>
          Next
        </Button>}
      </div>
    </div>
  )
  return (
    <Spin spinning={loading}>
      <Card style={{ paddingBottom: "4%" }} >
      <h2 style={{marginBottom: "20px"}}>Take a tour</h2>
        <Tabs activeKey={active} defaultActiveKey={active} onChange={callBack}>
          <TabPane tab="Add Client" key="1">
            <Contact />
            {renderButtons("2")}
          </TabPane>
          <TabPane tab="Create Matter" key="2">
            <Matters></Matters>
            {renderButtons("3")}

          </TabPane>
          <TabPane tab="Add Account" key="3">
            <Accounts></Accounts>
            {renderButtons("4")}

          </TabPane>
          <TabPane tab="Add Documents" key="4">
            <Documents></Documents>
            {renderButtons("5")}

          </TabPane>
          <TabPane tab="Add Tasks" key="5">
            <Tasks></Tasks>
            {renderButtons("6")}

          </TabPane>
        </Tabs>
      </Card>
    </Spin>
  )
}

export default TakeATour