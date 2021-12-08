import React, { createElement, useState, useEffect } from 'react'

export default () => {

  const [quote, setQuote] = useState("");

  // reset game 
  useEffect(() => {
    fetch("https://api.kanye.rest/")
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        setQuote(res["quote"])
      })

  }, [])


  return (
    <div className='overlay'>
      <h3>"{quote}"</h3>
      <img
        className='victory-gif'
        src='https://thumbs.gfycat.com/UnfoldedRewardingAmericanalligator-size_restricted.gif'
        alt='kanye.gif'
      />
      <form>

        <button className='btn btn-danger'>restart</button>
      </form>
    </div>
  );
}
