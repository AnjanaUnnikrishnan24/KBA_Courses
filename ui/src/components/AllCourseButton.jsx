import React from 'react'
import { Link } from 'react-router-dom'

const AllCourseButton = () => {
  return (
    <div className='flex justify-center mb-40'>
      <Link to='/courses' >
        <button className='w-80 h-10 rounded-full bg-purple-500 text-white font-medium  hover:bg-purple-600' >View all Courses</button>
      </Link>   
    </div>
  )
}

export default AllCourseButton