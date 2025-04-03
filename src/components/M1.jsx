import React from 'react'

export default function M1() {
  return (
    <div style={{ position: 'relative', width: '600px', margin: 'auto' }}>
      <img 
        src="https://example.com/fake-phishing-website.png" 
        alt="Phishing Website" 
        style={{ width: '100%', border: '1px solid #ccc' }} 
      />
      <div style={{ position: 'absolute', top: '20%', left: '10%', background: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
        <h3>Choose the correct options:</h3>
        <label>
          <input type="radio" name="emailSource" value="Legitimate Email" /> Legitimate Email
        </label>
        <br />
        <label>
          <input type="radio" name="emailSource" value="Suspicious Email" /> Suspicious Email
        </label>
        <br />
        <label>
          <input type="radio" name="emailSource" value="Phishing Email" /> Phishing Email
        </label>
        <br />
        <button onClick={() => alert('Your score is: 10')}>Submit</button>
      </div>
    </div>
  )
}
