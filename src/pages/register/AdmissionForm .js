// import React, { Component } from "react";    
import './AdmissionForm.css'    
    
// class AdmissionForm extends Component {    
//     constructor(props) {    
//         super(props);    
//         this.state = {    
//             studName: '',    
//             emailId: '',    
//             dob: '',    
//             gender: 'select',    
//             phoneNumber: '',    
//             city: '',    
//             formErrors: {}    
//         };    
    
//         this.initialState = this.state;    
//     }    
    
//     handleFormValidation() {    
//         const { studName, orgId, emailId, dob, gender, phoneNumber,land, city } = this.state;    
//         let formErrors = {};    
//         let formIsValid = true;    
    
//         //Company name     
//         if (!studName) {    
//             formIsValid = false;    
//             formErrors["studNameErr"] = "Bedrifts navn må fylles ut.";    
//         }    

//         //Student name     
//         if (!orgId) {    
//             formIsValid = false;    
//             formErrors["orgErr"] = "Org. nummer må fylles ut.";    
//         }    

        
//         if (!land) {    
//             formIsValid = false;    
//             formErrors["landErr"] = "Land må fylles ut.";    
//         } 

//         if (!city) {    
//             formIsValid = false;    
//             formErrors["cityErr"] = "By må fylles ut.";    
//         } 
    
//         //Email    
//         if (!emailId) {    
//             formIsValid = false;    
//             formErrors["emailIdErr"] = "Epost må fylles ut.";    
//         }    
//         else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {    
    
//             formIsValid = false;    
//             formErrors["emailIdErr"] = "Ikke riktig epost format.";    
//         }    
    
//         //DOB    
//         if (!dob) {    
//             formIsValid = false;    
//             formErrors["dobErr"] = "Date of birth is required.";    
//         }    
//         else {    
//             var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;    
//             if (!pattern.test(dob)) {    
//                 formIsValid = false;    
//                 formErrors["dobErr"] = "Invalid date of birth";    
//             }    
//         }    
    
//         //Gender    
//         if (gender === '' || gender === "select") {    
//             formIsValid = false;    
//             formErrors["genderErr"] = "Select gender.";    
//         }    
    
//         //Phone number    
//         if (!phoneNumber) {    
//             formIsValid = false;    
//             formErrors["phoneNumberErr"] = "Telefon nummber må fylles ut.";    
//         }    
//         // else {    
//         //     var mobPattern = /^(?:(?:\\+|0{0,2})47(\s*[\\-]\s*)?|[0]?)?[789]\d{7}$/;    
//         //     if (!mobPattern.test(phoneNumber)) {    
//         //         formIsValid = false;    
//         //         formErrors["phoneNumberErr"] = "Invalid phone number.";    
//         //     }    
//         // }    
    
           
    
//         this.setState({ formErrors: formErrors });    
//         return formIsValid;    
//     }    
    
//     handleChange = (e) => {    
//         const { name, value } = e.target;    
//         this.setState({ [name]: value });    
//     }    
    
//     handleSubmit = (e) => {    
//         e.preventDefault();    
    
//         if (this.handleFormValidation()) {    
//             alert('You have been successfully registered.')    
//             this.setState(this.initialState)    
//         }    
//     }    
    
//     render() {    
    
//         const { studNameErr, emailIdErr, orgErr, phoneNumberErr, landErr, cityErr } = this.state.formErrors;    
    
//         return (    
//             <div className="formDiv">    
//                 <h3 style={{ textAlign: "center" }} >Student Admission Form </ h3>    
//                 <div>    
//                     <form onSubmit={this.handleSubmit}>    
//                         <div>    
//                             <label htmlFor="studName">Bedrifts navn</label>    
//                             <input type="text" name="studName"    
//                                 value={this.state.studName}    
//                                 onChange={this.handleChange}    
//                                 placeholder="Bilvask AS.."    
//                                 className={studNameErr ? ' showError' : ''} />    
//                             {studNameErr &&    
//                                 <div style={{ color: "red", paddingBottom: 10 }}>{studNameErr}</div>    
//                             }    
    
//                         </div>    

//                         <div>    
//                             <label htmlFor="orgNumber">Org. nummer</label>    
//                             <input type="text" name="orgNumber"    
//                                 value={this.state.orgId}    
//                                 onChange={this.handleChange}    
//                                 placeholder="999 999 999"    
//                                 className={orgErr ? ' showError' : ''} />    
//                             {orgErr &&    
//                                 <div style={{ color: "red", paddingBottom: 10 }}>{orgErr}</div>    
//                             }    
    
//                         </div> 

//                         <div>    
//                             <label htmlFor="email">E-post</label>    
//                             <input type="text" name="email"    
//                                 value={this.state.emailId}    
//                                 onChange={this.handleChange}    
//                                 placeholder="post@email.com"    
//                                 className={emailIdErr ? ' showError' : ''} />    
//                             {emailIdErr &&    
//                                 <div style={{ color: "red", paddingBottom: 10 }}>{emailIdErr}</div>    
//                             }    
    
//                         </div>    
            
            
//                         <div>    
//                             <label htmlFor="phoneNumber">Telefon number</label>    
//                             <input type="text" name="phoneNumber"    
//                                 onChange={this.handleChange}    
//                                 value={this.state.phoneNumber}    
//                                 placeholder="90990909"    
//                                 className={phoneNumberErr ? ' showError' : ''} />    
//                             {phoneNumberErr &&    
//                                 <div style={{ color: "red", paddingBottom: 10 }}>{phoneNumberErr}</div>    
//                             }    
//                         </div>    
//                         <div>    
//                             <label htmlFor="land">Land</label>    
//                             <select name="land"    
//                                 value={this.state.land}    
//                                 onChange={this.handleChange}    
//                                 className={landErr ? ' showError' : ''} >    
//                                 <option value="select">--Velg land--</option>    
//                                 <option value="Norge">Norge</option>    
//                                 <option value="Sverige">Sverige</option>    
//                                 <option value="Danmark">Danmark</option>    
//                             </select>    
//                             {landErr &&    
//                                 <div style={{ color: "red", paddingBottom: 10 }}>{landErr}</div>    
//                             }    
//                         </div>    

//                         <div>    
//                             <label htmlFor="city">By</label>    
//                             <input type="text" name="city"    
//                                 value={this.state.city}    
//                                 onChange={this.handleChange}    
//                                 placeholder="Oslo"    
//                                 className={cityErr ? ' showError' : ''} />    
//                             {cityErr &&    
//                                 <div style={{ color: "red", paddingBottom: 10 }}>{cityErr}</div>    
//                             }    
    
//                         </div> 




//                         <input type="submit" value="Submit" />    
//                     </form>    
//                 </div>    
//             </div >    
//         )    
//     }    
// }    
    
// export default AdmissionForm;

import React, { Component } from "react";    
import './AdmissionForm.css'    
    
class AdmissionForm extends Component {  
    render(){
        return(
            <div>
                <div >
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                    <span className="font-weight-bold">Edogaru</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels">Name</label>
                    <input type="text" className="form-control" placeholder="first name" value=""/></div>
                    <div className="col-md-6"><label className="labels">Surname</label>
                    <input type="text" className="form-control" value="" placeholder="surname"/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Mobile Number</label>
                    
                    <input type="text" className="form-control" placeholder="enter phone number" value=""/></div>
                    <div className="col-md-12"><label className="labels">Address Line 1</label>
                    
                    <input type="text" className="form-control" placeholder="enter address line 1" value=""/></div>
                    <div className="col-md-12"><label className="labels">Address Line 2</label>
                    
                    <input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div className="col-md-12"><label className="labels">Postcode</label>
                    
                    <input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div className="col-md-12"><label className="labels">State</label>
                    
                    <input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div className="col-md-12"><label className="labels">Area</label>
                    
                    <input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div className="col-md-12"><label className="labels">Email ID</label>
                    
                    <input type="text" className="form-control" placeholder="enter email id" value=""/></div>
                    <div className="col-md-12"><label className="labels">Education</label>
                    
                    <input type="text" className="form-control" placeholder="education" value=""/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Country</label>
                    <input type="text" className="form-control" placeholder="country" value=""/></div>
                    <div className="col-md-6"><label className="labels">State/Region</label>
                    <input type="text" className="form-control" value="" placeholder="state"/></div>
                </div>
                <div className='row mt-3'>
                <div className="col-md-6 mt-4 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                <div className="col-md-6 mt-4 text-center"><button className="btn btn-primary profile-button" type="button">Avslutt</button></div>
                </div>
                
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div>
                <br/>
                <div className="col-md-12"><label className="labels">Experience in Designing</label>
                <input type="text" className="form-control" placeholder="experience" value=""/></div> 
                <br/>
                <div className="col-md-12"><label className="labels">Additional Details</label>
                <input type="text" className="form-control" placeholder="additional details" value=""/></div>
            </div>
        </div>
    </div>
</div>
</div>

        )
    }
}

export default AdmissionForm;