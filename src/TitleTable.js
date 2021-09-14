import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const TitleTable = (props) => {
    const { data, jobTitle, updateStatus } = props

    const handleShortlist = (id) => {
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{'status': 'shortlisted'})
            .then((response) => {
                const result = response.data
                console.log('put', result)
                //updateStatus(result)
                updateStatus(result, jobTitle)
            })
    }

    const handleReject = (id) => {
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{'status': 'rejected'})
        .then((response) => {
            const result = response.data
            console.log('put reject', result)
            updateStatus(result, jobTitle)
        })
    }

    const handleViewDetails = (id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
            .then((response)=>{
                const result = response.data
                console.log(result)
                swal(`${result.name}`, `Contact number-${result.phone}\nEmail-${result.email}\nSkills-${result.skills}\nExperience-${result.experience}`)
            })
            .catch((err)=>{
                alert(err.message)
            })
    }

    return (
        <div align='center'>
            <h3>{jobTitle}</h3>
            <p>List of candidates who applied for {jobTitle} job.</p>
            <table border='1'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Technical Skills</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>View Details</th>
                        <th>Update Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(ele =>{
                            return <tr key={ele._id}>
                                <td>{ele.name}</td>
                                <td>{ele.skills}</td>
                                <td>{ele.experience}</td>
                                <td>{ele.createdAt.split('').splice(0,10).join('').split('-').reverse().join('/')}</td>
                                <td><button style={{backgroundColor:'lightblue'}}onClick={()=>{handleViewDetails(ele._id)}}>View Details</button></td>
                                <td>{
                                    ele.status === 'applied' ? 
                                    <div>
                                        <button style={{backgroundColor:'green', color:'white'}}onClick={()=>{handleShortlist(ele._id)}}>ShortList</button><button style={{backgroundColor:'red', color:'white'}}onClick={()=>{handleReject(ele._id)}}>Reject</button>
                                    </div> : ele.status === 'rejected' ? 
                                    <button style={{backgroundColor:'red', color:'white'}}>Rejected</button> : <button style={{backgroundColor:'green', color:'white'}}>Shortlisted</button>
                                }</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TitleTable