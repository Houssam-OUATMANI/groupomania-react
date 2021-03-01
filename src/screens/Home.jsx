import React, {useEffect , useState, useContext, Fragment} from 'react'
import { useForm } from  'react-hook-form'
import { Link} from 'react-router-dom'

import { AuthContext } from '../context/auth.context'
import './home.css'
import LikeIcone from '../components/Navigation/LikeIcone';



export default function Home() {

      const auth = useContext(AuthContext)
      const [data, setData] =  useState('')
      const { handleSubmit , register , errors } = useForm()

      //Likes state

      const [likes, setLikes] = useState()
      const [disLikes, setDisLikes] = useState()

      // Comments
      const [comments, setComments ] = useState([])

      //console.log( 'data', data)
      
      // async function sendComments(data){
      //       const URL = "http://127.0.0.1:5000/api/comments/add-comment/"
      //       console.log(data)
      //       const sendedData = await fetch(URL, {
      //             method : 'post',
      //             headers : {
      //                   'Content-Type' : 'application/json',
      //                   Authorization : 'Bearer ' + auth.token
      //             },
      //             body : JSON.stringify(data)
      //       })

      //       const response = await sendedData.json()
      //       console.log(response)
      // }
      
useEffect(()=>{

            async function GetPosts(){
      
                  const data = await fetch('http://127.0.0.1:5000/api/posts/all-posts', {
                        headers: {
                              Authorization : 'Bearer ' + auth.token
                        }
                  })
                  const response = await data.json()
                  console.log(response)
                  setData(response)
            }
            GetPosts()
},[])

       console.log(data)
            if(data && data.length > 0 ){
                  return (  
                              data.map(obj => (
                              <div className="card" key={obj.id}>
                                    <div className="card-username__info">
                                          <div>
                                                <img src={obj.user.imageUrl} alt=""/>
                                          </div>
                                          <h2 className="username"> {obj.user.username}</h2>
                                    </div>
                                    <p className="created-at"> Posté le {obj.createdAt.split('T').join(' à ').split('.000Z').join('')}</p>
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
                                         <LikeIcone likes={obj.likes}/>
                                    </div>
            
                                    <div className="card-comment">
                                          <form onChange={(e)=> {
                                                e.preventDefault()
                                                console.log(e.target.value)
                                                setComments(e.target.value)
                                          }}>
                                                <input type="text" name="comment" placeholder="Comment ...." ref={register({required : true})}/>
                                                <button className="btn-comment" type="submit">Comment</button>
                                          </form>

                                    </div>
                                          <div className="comments">
                                                <ul className="comments-list">
                                                      {obj.comments.map((com)=>(
                                                            <li key={com.id}>
                                                                 <div>
                                                                        <div className="card-username__info" id="username-comment">
                                                                              <div id="comment-left">
                                                                                    <img src={com.user.imageUrl} alt=""/>
                                                                              </div>
                                                                              <div id="comment-right">
                                                                                    <p>{com.user.username} <i className="fas fa-arrow-right fa-lg"></i> Le {com.createdAt.split('T').join(' à ').split('.000Z').join('')} </p>
                                                                                    <h3>{com.comment}</h3>
                                                                              </div>
                                                                              
                                                                        </div>
                                                                        <div>
                                                                        </div>
                                                                 </div>
                                                            </li>
                                                      ))}
                                                </ul>
                                          </div>
                              </div>       
                              )) 
                        )

                  }
                  return(
                        <div className="post-null-container">
                              <h2 className="post-null">Aucune publication n'a été crée pour le moment</h2>
                              <Link className="post-null-add" to="/add-post">Par ici pour crée une publication</Link>
                        </div>
                        
                  )
      
}

