import React from 'react';
import { Tabs } from 'antd';
import ClientListing from './pages/clients';
import Activity from './pages/Activity';
import Earnings from './pages/Earnings';
const { TabPane } = Tabs;

const Reports = () => {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Total Earnings" key="1">
                <Earnings />
            </TabPane>
            <TabPane tab="Clients Listing" key="2">
                <ClientListing />
            </TabPane>
            <TabPane tab="Activity" key="3">
                <Activity></Activity>
            </TabPane>

        </Tabs>
    )
}

export default Reports