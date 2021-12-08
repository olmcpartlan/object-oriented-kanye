import React, { Component, createElement, useState, useEffect } from 'react'

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
      {<h3>"{quote}"</h3>}
      <img
        className='defeat-gif'
        src='http://31.media.tumblr.com/9998b827ba5d007a02d8002e4635faae/tumblr_mj236gC7tk1renc7io1_500.gif'
        alt='kanye.gif'
      />
      <form>
        <button className='btn btn-danger'>restart</button>
      </form>
    </div>
  );
}