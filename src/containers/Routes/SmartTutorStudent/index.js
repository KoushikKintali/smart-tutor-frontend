import React, { Component } from 'react'
import {Layout, Row, Col, Select, DatePicker} from 'antd'
import history from '../../../containers/Decider/History'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './_index.less'
class About extends Component {
    render() {
        return (
            <Layout>
                <Col span={24}>
                    <Row className="header">
                        <ArrowLeftOutlined style={{fontSize : '10px', marginTop: '12px', marginRight: '12px'}} onClick={ () => {history.push('/student-app-home')}}/>
                        <h5>Smart Tutor</h5>
                    </Row>
                </Col>
                <Col span={22} offset={1}>
                    <Row justify="space-around" align="middle">
                        <Col span={8}>
                            <Select
                                className="select-search"
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Select
                                className="select-search"
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={6} offset={16}>

                </Col>
            </Layout>
        );
    }
}


export default About;