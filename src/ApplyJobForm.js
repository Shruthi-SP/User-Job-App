import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import swal from 'sweetalert'

const ApplyJobForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [formErrors, setFormErrors] = useState({ })
    const errors = {}

    const handleChange = (e) => {
        const attr = e.target.name
        const result = e.target.value
        if(attr === 'name'){
            setName(result)
        }
        else if(attr === 'email'){
            setEmail(result)
        }
        else if(attr === 'phone'){
            setPhone(result)
        }
        else if(attr === 'jobTitle'){
            setJobTitle(result)
        }
        else if(attr === 'experience'){
            setExperience(result)
        }
        else if(attr === 'skills'){
            setSkills(result)
        }
    }

    const runValidation = () =>{
        if(name.trim().length===0){
            errors.name = 'name cannot be blank'
        }
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors.email = 'email is not valid'
        }
        if(phone.trim().length===0){
            errors.phone = 'contact number required'
        }
        if(jobTitle.length === 0){
            errors.jobTitle = 'choose job title'
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const formData = {
            name: name,
            email: email,
            phone: phone,
            jobTitle: jobTitle,
            experience: experience,
            skills: skills
            }
            axios.post('http://dct-application-form.herokuapp.com/users/application-form', formData )
                .then((response)=>{
                    const result = response.data
                    console.log(result)
                })
                .catch((err)=>{
                    console.log(err.message)
                })
            swal('Successful', 'Applied Successfully')
            console.log('form data : ', formData)
            setName('')
            setEmail('')
            setPhone('')
            setJobTitle('')
            setExperience('')
            setSkills('')
        } else{
            console.log('form errors', errors)
            setFormErrors(errors)
        }                    
    }

    return (
        <div style={{ borderRadius:'5px', backgroundColor:'#f2f2f2', padding:'20px',boxSizing:'border-box'}}>
            <h1>Job Application form</h1>
            <form onSubmit={handleSubmit}>
                <label style={{padding:'12px 12px 12px 0',display:'inline-block', clear:'left',width:'250px', textAlign:'left'}}>Full Name</label>
                <input  type='text' name='name' value={name} onChange={handleChange} />
                {formErrors.name && <span style={{color:'red'}}>{formErrors.name}</span>}<br/>

                <label style={{padding:'12px 12px 12px 0',display:'inline-block', clear:'left',width:'250px', textAlign:'left'}}>Email address</label>
                <input type='text' placeholder='example@gmail.com' name='email' value={email} onChange={handleChange} />
                {formErrors.email && <span style={{color:'red'}}>{formErrors.email}</span>}<br/>

                <label style={{padding:'12px 12px 12px 0',display:'inline-block', clear:'left',width:'250px', textAlign:'left'}}>Contact Number</label>
                <input type='number' placeholder='+91 9876543210' name='phone' value={phone} onChange={handleChange} />
                {formErrors.phone && <span style={{color:'red'}}>{formErrors.phone}</span>}<br/>

                <label style={{padding:'12px 12px 12px 0',display:'inline-block', clear:'left',width:'250px', textAlign:'left'}}>Applying for job</label>
                <select name='jobTitle' value={jobTitle} onChange={handleChange}>
                    <option>--- Select ---</option>
                    <option value='Front-End Developer'>Front-End Developer</option>
                    <option value='Node.js Developer'>Node.js Developer</option>
                    <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                    <option value='FULL Stack Developer'>FULL Stack Developer</option>
                </select>
                {formErrors.jobTitle && <span style={{color:'red'}}>{formErrors.jobTitle}</span>}<br/>

                <label style={{padding:'12px 12px 12px 0',display:'inline-block', clear:'left',width:'250px', textAlign:'left'}}>Experience</label>
                <input type='text' placeholder='Experience(2 years, 3 months)' name='experience' value={experience} onChange={handleChange} /><br />

                <label style={{padding:'12px 12px 12px 0',display:'inline-block', clear:'left',width:'250px', textAlign:'left'}}>Technical Skills</label>
                <textarea type='text' placeholder='Technical skills' name='skills' value={skills} onChange={handleChange} /><br />

                <input style={{backgroundColor:'blue', color:'white', padding:'12px 20px',border:'none',cursor:'pointer',}} type='submit' value='Send Application' />
                
            </form>
        </div>
    )
}
export default ApplyJobForm