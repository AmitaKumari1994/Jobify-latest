import React from 'react'
import {FormRow,FormRowSelect,Alert} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Addjob = () => {
  const {
    isLoading,
    isEditing,
    showAlert ,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    setEditJob
  } = useAppContext()


const handleSubmit = (e)=>{
  e.preventDefault()

   if(!position || !company || !jobLocation){
     displayAlert()
     return
   }

if(isEditing){
   editJob()
  return
}  
  createJob()
  
}

const handleJobInput = (e)=>{
  const name = e.target.name;
  const value = e.target.value;
  handleChange({name,value})
}

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing?'edit job':'add job'}</h3>
        {showAlert && <Alert/>}
        <div className='form-center'>
          <FormRow 
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
          />
          <FormRow 
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
          />
          <FormRow 
          type='text'
          labelText={`job location`}
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}
          />
          {/*Job status*/}
          { <FormRowSelect name='status' value={status} handleChange = {handleJobInput} list={statusOptions}/> }
          {/*Job type*/}
          <FormRowSelect name='jobType' labelText='type' value={jobType} handleChange = {handleJobInput} list={jobTypeOptions}/>
          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>Submit</button>
            <button 
            className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValues()
            }}>Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default Addjob
