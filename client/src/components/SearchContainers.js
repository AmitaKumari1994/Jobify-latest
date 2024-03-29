import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import {FormRow,FormRowSelect} from '.'

const SearchContainers = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions
  } = useAppContext()

  const handleSearch = (e)=>{
    if (isLoading) return
    handleChange({name:e.target.name,value:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    clearFilters();
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          <FormRow
            type ='text'
            name = 'search'
            value={search}
            handleChange = {handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name ='searchStatus'
            value = {searchStatus}
            handleChange={handleSearch}
            list={['all',...statusOptions]}
          />

          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name ='searchType'
            value = {searchType}
            handleChange={handleSearch}
            list={['all',...jobTypeOptions]}
          />
          
          {/* sort */}
          <FormRowSelect
            name ='sort'
            value = {sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
            clear Filters
          </button>


        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainers
