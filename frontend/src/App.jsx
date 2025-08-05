import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar';
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { RiComputerFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { RiBloggerFill } from "react-icons/ri";


const App = () => {
  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false)
  const ai = new GoogleGenAI({ apiKey: "AIzaSyD5Qu47LNjNgrn3z-Y8DDlQ_xIM0dpdVWE" });

  let messages = [{

  }];

  const [data, setData] = useState(messages);
  async function getResponse() {
    if (prompt === "") {
      alert("please enter a prompt");
      return;
    }

    setData(prevData => [...prevData, { role: "user", content: prompt }])
    setScreen(2);

    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    setData(prevData => [...prevData, { role: "ai", content: response.text }])

    setPrompt("");
    console.log(messages);
    setLoading(false);
  }

  return (
    <div>
      <Navbar />

      <div className="screens">
        {
          screen === 1 ?
            <div className="screen-1  w-screen h-[65vh] px-[150px] flex items-center justify-center flex-col">
              <h3 className='!text-[40px] font-[700]'>SmartChat<span className='text-purple-500'> AI</span></h3>
              <div className="flex mt-5 items-center gap-[15px]">
                 <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
                  <i className='text-[30px]'><RiComputerFill /></i>
                  <p className='mt-3'>Create a website html css and js.</p>
                 </div>

                 <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
                  <i className='text-[30px]'><FaBook /></i>
                  <p className='mt-3'>Write a book for me. Topic is coding.</p>
                 </div>

                 <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
                  <i className='text-[30px]'><FaBookOpen /></i>
                  <p className='mt-3'>Tell me a comedy story.</p>
                 </div>

                 <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
                  <i className='text-[30px]'><RiBloggerFill /></i>
                  <p className='mt-3'>Generate me a blog content for travelling</p>
                 </div>

              </div>
            </div> : <>
              <div className="screen-2 overflow-y-auto w-screen h-[70vh] px-[150px]">
                {
                  data ? data.map((item, index) => {
                    return (
                      <>
                        {
                          item.role === "user" ?
                            <div className="user bg-gray-800 w-fit max-w-[40vw] mb-5 ml-[auto] p-[15px]">
                              <p className='text-[14px] text-[gray]'>User</p>
                              <p>{item.content}</p>
                            </div> :
                            <div className="ai bg-gray-800 w-fit max-w-[40vw] mb-5 mr-[auto] p-[15px]">
                              <p className='text-[14px] text-[gray]'>SmartChat AI</p>
                              <Markdown >
                                {item.content}
                              </Markdown>
                            </div>
                        }
                      </>
                    )
                  }) : "No Messages Yet!"
                }
                {
                  loading ?
                    <div className="loader"><BeatLoader color='#fff' /></div> : ""
                }
              </div>
            </>
        }

      </div>

      <div className="inputBox px-[150px] h-[15vh] pt-3">
        <div className="input w-[90%] mx-[auto] flex items-center gap-[10px] bg-zinc-800 rounded-lg">
          <input onKeyDown={(e) => {
            if (e.key === "Enter") {
              getResponse();
            }
          }} onChange={(e) => { setPrompt(e.target.value) }} value={prompt} type="text" placeholder='Enter your prompt!' className='flex-1 bg-transparent rounded-lg p-[15px] outline-none text-[18px] font-[500]' />
        </div>
        <p className='text-[gray] text-center mt-3'>SmartChat AI can make mistakes! cross check it.</p>
      </div>
    </div>
  )
}

export default App;