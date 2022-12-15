import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import MHeader from './Header'




function NewTicket(props){

    const[prjdata, setPrjdata] = useState({
        firstName:'',
        lastName:'',
        email:'',
        date:'',
        issue:'',
        information:''
    })

  
    const changeValue=(e)=>{
        console.log(e);
        setPrjdata({
            ...prjdata, [e.target.name]:e.target.value
        });
    }

    const createPrj =(e)=>{
        if((prjdata.firstName | prjdata.lastName | prjdata.information | prjdata.email | prjdata.issue | prjdata.date === '') | (prjdata.issue === 'Please Select One')){
            alert('You Must Fill Out All Fields')
        }
        else if(prjdata.issue === ''){
            prjdata.issue = 'bug'
        e.preventDefault();
        const axios = require('axios');

        axios.post("https://hc4lpy0u3m.execute-api.us-west-2.amazonaws.com/Test/createticket",{
        "body":"{\"priority\":4,\"title\":\"Ticket\",\"type\":\""+prjdata.issue+"\",\"description\":\""
        +prjdata.information+" "+prjdata.date+" "+ prjdata.firstName +" "+ prjdata.lastName +" "+prjdata.email+"\"}"
        })
            .then(res=>{
                if(res.status === 200){
                    return res;
                }else{
                    return null;
                }
                
            })
            .then(res=>{
                if(res!=null){
                    alert("Ticket Created!");
                }    
                console.log(JSON.stringify(prjdata.type) + "res2 " + JSON.stringify(res)); 

            });
        }
        else {
        e.preventDefault();
        const axios = require('axios');

        axios.post("https://hc4lpy0u3m.execute-api.us-west-2.amazonaws.com/Test/createticket",{
        "body":"{\"priority\":4,\"title\":\"Ticket\",\"type\":\""+ prjdata.issue+"\",\"description\":\""
        +prjdata.information+" "+prjdata.date+" "+ prjdata.firstName +" "+ prjdata.lastName +" "+prjdata.email+"\"}"
        })
            .then(res=>{
                if(res.status === 200){
                    return res;
                }else{
                    return null;
                }
                
            })
            .then(res=>{
                if(res!=null){
                    alert("Ticket Created!");
                }    
            });

            
    }}

        return(
        <body className="inputbox">
                <MHeader/>
                <Form className="login-form" onSubmit={createPrj}>
                <h1 className="header">Contact Us!</h1>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label">First Name</Label>
                                    <Input tabIndex={1} bsSize="lg" type="text" onChange={changeValue} name = "firstName"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="label">Email</Label>
                                <Input bsSize="lg" type="email" onChange={changeValue} name = "email"/> 
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label">Last Name</Label>
                                    <Input tabIndex={2} bsSize="lg" type="text" onChange={changeValue} name = "lastName"/>
                            </FormGroup>
                            <FormGroup>
                                <Label className="label">Date of Issue</Label>
                                    <Input bsSize="lg" type="date" onChange={changeValue} name = "date"/> 
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label className="label">How Can We Help You?</Label>
                            <Input bsSize="lg"  type="select" onChange={changeValue}  name = "issue">
                                <option value={'bug'}>Bug</option>
                                <option value={'question'}>Question</option>
                                <option value={'feature'}>Feature</option>
                                <option value={'task'}>Task</option>
                            </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="label">Please Provide Us With Details</Label>
                            <Input bsSize="lg" type="textarea" onChange={changeValue} name = "information" height={1000}/>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button block color="success" type="submit">Submit</Button>
                        </Col>
                        <Col>
                            <Button block color="danger" type="reset">Cancel</Button>
                        </Col>
                    </Row>
                </Form>
        </body>
        );
}
export default NewTicket;