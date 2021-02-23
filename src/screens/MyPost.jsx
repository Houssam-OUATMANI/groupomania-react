import React, {useEffect , useState} from 'react'

import './myPost.css'

export default function MyPost(){

      const [data, setData] =  useState('')
      const userCredantials = JSON.parse(localStorage.getItem('auth'))

      useEffect(()=>{
            async function getMyPosts(){
                  const URL = `http://127.0.0.1:5000/api/posts/get-my-posts/${userCredantials.userId}`
                  console.log(URL)

                  const getPosts = await fetch(URL)
                  const response = await getPosts.json()

                  setData(response)
            }
            getMyPosts()
      },[])

      console.log(data)
      if(data){
            if(data.length < 1){
                  return(
                        <h1>VOUS N'AVEZ CRÉE AUNCUN POST</h1>
                  )
            }

            return(
                  data.map(obj => (
            
                        <div className="card">
                              <div className="card-username__info">
                                    <div>
                                          <img src={obj.imageUrl} alt=""/>
                                    </div>
                                    <h2> {obj.name}</h2>
                              </div>
                              <div className="detail">
                                    <hr/>
                                    <br/>
                                    <h3>{obj.detail}</h3>
                                    <br/>
                                    <hr/>
                              </div>
      
                              <div className="card-image__post">
                                    <img src={obj.imageUrl} alt=""/>
                              </div>
      
                              <div className="card-reaction">
                                    <span><i class="fas fa-thumbs-up"></i>{obj.likes}</span>
                                    <span><i class="fas fa-thumbs-down"></i>{obj.dislikes}</span>
                              </div>
      
                              <div className="card-edit">
                                   <button className="btn-update">UPDATE</button>
                                   <button className="btn-delete">DELETE</button>
                              </div>
                        </div>       
                        )) 
            )

      }
      else {
            return ("")
      }
}