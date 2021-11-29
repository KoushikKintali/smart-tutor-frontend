import React, { Component } from 'react'
import {Layout, Row, Col, Select, Button, Modal} from 'antd'
import {Recorder} from 'react-voice-recorder'
import history from '../../../containers/Decider/History'
import { ArrowLeftOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { STUDENT_API_RESULT } from 'Config/deploymentConfig/mock.js'
import 'antd/dist/antd.css';
import 'react-voice-recorder/dist/index.css'
import './_index.less'
const axios = require('axios');
const { Option } = Select;
class SmartTutorStudent extends Component {
    constructor(props) {
        super(props)
     
        this.state = {
            audioDetails: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                  h: 0,
                  m: 0,
                  s: 0
                }
            },
            selectedClassId : null,
            selectedSubjectId : null,
            selectedUnitId : null,
            synopObj: null,
            activeAudioId: null,
            recording: false,
            openRecordingModal: false,
            studentResponse:null,
        }
    }
    componentDidMount(){
        axios.get('https://dev2d-nucleus.leadschool.in/smart-tutor/api/v1/1/master/class')
        .then(response => this.setState({ studentResponse : response.data }));
    }
    handleAudioStop(data){
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
              h: 0,
              m: 0,
              s: 0
            }
        };
        this.setState({ 
            audioDetails: reset,
            recording: false
        }, () => {
            this.setState({
                audioDetails : data
            })
        });
    }
    
    handleAudioUpload(file) {
        this.setState({
            openRecordingModal : false
        })
    }
    
    handleReset() {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        this.setState({ audioDetails: reset });
    }
    handleClassChange(value) {
        this.setState({
            selectedClassId : value,
            selectedSubjectId : null,
            selectedUnitId : null,
        })
    }

    handleSubjectChange(value) {
        this.setState({
            selectedSubjectId: value,
            selectedUnitId: null,
        })
    }

    handleUnitChange(value) {
        const { selectedClassId, selectedSubjectId } = this.state;
        this.setState({
            selectedUnitId: value
        },() => {
            let synopsis = STUDENT_API_RESULT.classSubjects.find(
                subObj => subObj.id === selectedSubjectId)?.subjectChapters.find(chapterObj => chapterObj.id === value);
            this.setState({
                synopObj : null
            },()=>{
                this.setState({
                    synopObj : synopsis
                })
            })
        })
    }

    handlePlayAudioClick(id){
        const {activeAudioId} = this.state;
        if(activeAudioId){
            const elem = document.getElementById(activeAudioId);
            elem.pause();
        }
        this.setState({
            activeAudioId : id
        })
        const curElem = document.getElementById(id)
        curElem.play();
    }

    handlePauseAudioClick(id){
        const curElem = document.getElementById(id)
        curElem.pause();
        this.setState({
            activeAudioId : null
        })
    }
    handleCountDown(){
        if(!this.state.recording){
            this.setState({
                recording : true
            })
        }
    }

    render() {
        const { audioDetails, selectedClassId, selectedSubjectId, selectedUnitId, synopObj, activeAudioId, openRecordingModal, recording } = this.state
        return (
            <Layout>
                <Col span={24}>
                    <Row className="header">
                        <ArrowLeftOutlined style={{fontSize : '10px', marginTop: '12px', marginRight: '12px'}} onClick={ () => {history.push('/student-app-home')}}/>
                        <h5>Smart Tutor</h5>
                    </Row>
                </Col>
                <Col span={16} offset={4}>
                    <Row justify="space-between" align="middle">
                        <Col span={12}>
                            <Select
                                className="select-search"
                                showSearch
                                placeholder="Subject"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                value={selectedSubjectId}
                                onChange={(value) => this.handleSubjectChange(value)}
                            >
                                {
                                    STUDENT_API_RESULT.classSubjects.map((subjectObj) => {
                                        return (<Option key={subjectObj.id} value={subjectObj.id}>{subjectObj.name}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Select
                                className="select-search"
                                showSearch
                                placeholder="Chapter"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                value={selectedUnitId}
                                onChange={(value) => this.handleUnitChange(value)}
                            >
                                {
                                    STUDENT_API_RESULT.classSubjects.find(
                                        subObj => subObj.id === selectedSubjectId)?.subjectChapters.map((chapterObj) => {
                                        return (<Option key={chapterObj.id} value={chapterObj.id}>{chapterObj.name}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={22} offset={1}>
                    <Row className="pdf-container" justify="space-between" align="middle">
                    {
                        synopObj ?
                        <iframe className="pdf-view" src={synopObj.synopsis[0].content}></iframe>
                         : null
                    }
                    </Row>
                </Col>
                <Col span={22} offset={1}>
                    <Row justify="space-between" align="middle">
                        <Col span={12}>
                            <Row className="audio-container" justify="start" align="middle">
                                {
                                    synopObj && synopObj.synopsis[0].synopsisBlobs.map(audioObj => {
                                        return (
                                            <Row>
                                                <audio key={audioObj.id} id={audioObj.id}>
                                                    <source type="audio/mp3" src={audioObj.link} />
                                                </audio>
                                                {
                                                    activeAudioId === audioObj.id ? 
                                                    <PauseCircleOutlined className="pause-button" onClick={()=>{this.handlePauseAudioClick(audioObj.id)}}/> 
                                                    : <PlayCircleOutlined className="play-button" onClick={()=>{this.handlePlayAudioClick(audioObj.id)}}></PlayCircleOutlined>
                                                }
                                            </Row>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Layout>
        );
    }
}


export default SmartTutorStudent;
