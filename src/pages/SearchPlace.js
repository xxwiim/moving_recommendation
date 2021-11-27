import React, { useState } from 'react'
import MapContainer from './MapContainer';
import { Link } from 'react-router-dom';
import './SearchPlace.scss';

function SearchPlace() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  return (
    <div className="SearchPlace">
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="직장의 주소를 입력해주세요" onChange={onChange} value={InputText} />
        <button type="submit">주소찾기</button>
      </form>
      <MapContainer searchPlace={Place} />
    </div>
  )
}

export default SearchPlace;