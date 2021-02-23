import React, {useEffect , useState} from 'react'

import { useForm } from  'react-hook-form'

import './home.css'


export default function Home() {

      const [data, setData] =  useState('')
      const { handleSubmit , register , errors } = useForm()

      //console.log( 'data', data)
      
      async function sendComments(data){

            const sendedData = await fetch('', {
                  method : 'post',
                  headers : {
                        'Content-Type' : 'application/json'
                  },
                  body : JSON.stringify(data)
            })
      }
      
useEffect(()=>{

            async function GetPosts(){
      
                  const data = await fetch('http://127.0.0.1:5000/api/posts/all-posts')
                  const response = await data.json()
                  console.log(response)
                  setData(response)
            }
            GetPosts()
},[])

       
            if(data){
                  return (  
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
            
                                    <div className="card-comment">
                                          <form onSubmit={handleSubmit}>
                                                <input type="text" placeholder="Comment ...." ref={register({min : 1})}/>
                                          </form>
                                    </div>
                              </div>       
                              )) 
                        )

                  }
                  return(<h2>Pas de post</h2>)
      
}

