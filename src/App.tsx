import useAxios from 'axios-hooks'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Quizdata from './Component/Quizdata'

const App = () => {
  const { register, errors, handleSubmit } = useForm({})
  const [category, setcategory] = useState('')
  const [show, setshow] = useState(false)
  const [{ data, loading, error }] = useAxios(
    'https://opentdb.com/api_category.php'
  )
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>

  const onSubmit = async (data: any) => {
    // console.log(data.category);
    console.log('HELOOO')
    setcategory(data.category)
    setshow(true)
  }

  return (
    <div>
      {show ? (
        <Quizdata category={category} />
      ) : (
        <div>
          {' '}
          <h1 style={{ marginLeft: '30px' }}>Select a category</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <select name='category' className='select-css' ref={register}>
              {data.trivia_categories.map((category: any) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
            <button
              className='submit_btn'
              type='submit'
              value='Submit'
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
