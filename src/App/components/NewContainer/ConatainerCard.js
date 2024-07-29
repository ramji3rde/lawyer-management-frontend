import React from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import '../NewContainer/ConatainerCard.css'
const { Meta } = Card;
// import client from "../img/clients-assisted.png";
// import billion from "../img/coroprate-transition.png";
// import search from "../img/representations.png";
// import expereince from "../img/experiences.png";
const ConatainerCard = () => {

    return (
        
        <div className="container-card">
            
 <Card style={{ width: 250 }} bordered={false} >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="5+"
            description="Billion worth cororate tranasactions handled last
            year"
          />
        </Card>
        <Card style={{ width: 250 }} bordered={false} >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="100+"
            description="Clients assisted in  setting up in india"
          />
        </Card><Card style={{ width: 250 }}bordered={false} >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="30+"
            description="Clients assisted in  setting up in india"
          />
        </Card><Card style={{ width: 250 }} bordered={false}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="90+"
            description="Years of cummulative partner exprience"
          />
        </Card>
        </div>
    )
}

export default ConatainerCard
