import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

const {onSent,resentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
      <div className="main-container">

        {!showResult
        ?<>

        <div className="greet">
            <p><span>Hello, Ebi.</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Write a poem about a robot who dreams of being human.</p>
                <img src={assets.compass_icon} alt="" />
            </div>

            <div className="card">
                <p>Explain quantum mechanics in simple terms.</p>
                <img src={assets.bulb_icon} alt="" />
            </div>

            <div className="card">
                <p>Create a menu for a restaurant on Mars.</p>
                <img src={assets.message_icon} alt="" />
            </div>

            <div className="card">
                <p>Write a JavaScript function that reverses a string.</p>
                <img src={assets.code_icon} alt="" />
            </div>
            </div>
        </>
        :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />Ebi s Paul
                <p>{resentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                ?<div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
                
            </div>
        </div>
        }



        
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                </div>
            </div>
            <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.

            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
