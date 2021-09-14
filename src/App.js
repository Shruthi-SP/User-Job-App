import React from 'react'
import { Link, Route } from 'react-router-dom'
//import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Admin from './Admin'
import ApplyJobForm from './ApplyJobForm'
import Home from './Home'


function App() {
  return (    
    <div align='center'>
      <h1 >User Job Application</h1>

      <ul style={{display: 'flex', flexDirection:'row', padding:'0px', backgroundColor:'gray', justifyContent:'space-around', width:'30%',top:'0px'}}>

        <li style={{listStyle: 'none', margin:'10px 10px',}}><Link style={{textDecoration: 'none', fontSize:'18px', color:'white',}} to='/'>Home</Link></li>

        <li style={{listStyle: 'none', margin:'10px 10px',}}><Link style={{textDecoration: 'none', fontSize:'18px', color:'white',}} to='/apply'>Apply for Job</Link></li>
       
        <li style={{listStyle: 'none', margin:'10px 10px',}}><Link style={{textDecoration: 'none', fontSize:'18px', color:'white',}} to='/admin'>Admin</Link></li>
      </ul>
      
      <Route path='/' component={Home} exact={true}/>
      <Route path='/apply' component={ApplyJobForm} exact={true} />
      <Route path='/admin' component={Admin} exact={true} />

    </div>
  )
}

export default App;
