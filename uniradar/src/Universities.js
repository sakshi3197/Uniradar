import React, {useState, useEffect} from 'react';

const Universities = () => {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )


  }, [])

  return (
    
    <div></div>
  )
}

export default Universities