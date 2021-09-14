import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TitleTable from './TitleTable'

const Admin = (props) => {
    const [data, setData] = useState([])
    const [tableData, setTableData] = useState([])
    const [jobTitle, setJobTitle] = useState('')

    useEffect(()=>{
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
            .then((response)=>{
                const result = response.data
                console.log(result)
                setData(result)
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }, [])
    
    const handleFrontEnd = (e) => {
        const result = data.filter(ele => ele.jobTitle == 'Front-End Developer')
        console.log(result)
        setTableData(result)
        setJobTitle('Front-End Developer')
    }
    const handleNode = (e) => {
        const result = data.filter(ele => ele.jobTitle == 'Node.js Developer')
        console.log(result)
        setTableData(result)
        setJobTitle('Node.js Developer')
    }
    const handleMean = (e) => {
        const result = data.filter(ele => ele.jobTitle == 'MEAN Stack Developer')
        console.log(result)
        setTableData(result)
        setJobTitle('MEAN Stack Developer')
    }
    const handleFullStack = (e) => {
        const result = data.filter(ele => ele.jobTitle == 'FULL Stack Developer')
        console.log(result)
        setTableData(result)
        setJobTitle('FULL Stack Developer')
    }

    const updateStatus = (obj, jobTitleName) => {
        const result = data.map(ele=>{
            if(ele._id === obj._id){
                return {...ele, ...obj}
            }
            else {
                return {...ele}
            }
        })
        setData(result)
        const updateTable = result.filter(ele => ele.jobTitle == jobTitleName)
        console.log('update status result', result)
        setTableData(updateTable)
        setJobTitle(jobTitleName)
    }

    return (
        <div align='center'>
            <h1>Admin Dashboard</h1>

            <input style={{backgroundColor:'#6495ED', color:'white', padding:'5px', border:'none', margin:'10px'}}type='button' value='Front-End Developer' onClick={handleFrontEnd} />

            <input style={{backgroundColor:'#6495ED', color:'white', padding:'5px', border:'none', marginLeft:'10px'}}type='button' value='Node.js' onClick={handleNode} />

            <input style={{backgroundColor:'#6495ED', color:'white', padding:'5px', border:'none', marginLeft:'10px'}}type='button' value='MEAN Stack Developer' onClick={handleMean} />

            <input style={{backgroundColor:'#6495ED', color:'white', padding:'5px', border:'none', marginLeft:'10px'}}type='button' value='FULL Stack Developer' onClick={handleFullStack} />

            {
                tableData.length > 0 && <TitleTable data={tableData} jobTitle={jobTitle} updateStatus={updateStatus}/>
            }
        </div>
    )
}
export default Admin