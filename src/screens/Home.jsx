import React, {useEffect , useState, useContext, Fragment} from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth.context'
import './home.css'
import LikeIcone from '../components/Navigation/LikeIcone';
import UpdateComments from '../components/Navigation/UpdateComments';



export default function Home() {

      const userCredentials = JSON.parse(localStorage.getItem('auth'))


      const auth = useContext(AuthContext)

      // PUBLICATIONS STATE
      const [data, setData] =  useState('')
      

      // Comments
      const [showComments, setShowComments] = useState(false)
      const [comments, setComments ] = useState([])

      // Update Comments
      const [showUpdateForm, setShowUpdateForm] =useState(false)
      const [updateComment, setUpdateComment] = useState([])


      function handleShowComments(){
            setShowComments(!showComments)
      }

      function handleShowUpdateForm(e){
            setShowUpdateForm(!showUpdateForm)
      }

      async function handleDeleteComment(e){
            const id = e.target.dataset.id
            console.log(id)
                              const URL = "http://127.0.0.1:5000/api/comments/delete-comment/"
                              const deleteComment = await fetch(URL+id, {
                  
                                    method : "delete",
                                    headers : {
                                          Authorization : "Bearer " + auth.token
                                    }
                              })
                               await deleteComment.json()
                             await GetPosts()
      }
       async function handleComment(e){
             e.preventDefault()
             const key =  e.target.dataset.id
             //console.log(e.target.dataset.id)
             const sendComment = {
                   comment : comments,
                   postId : +key,
                   userId : userCredentials.userId
             }

                  const URL = "http://127.0.0.1:5000/api/comments/add-comment/"
                  console.log(sendComment)
                  const sendedData = await fetch(URL, {
                        method : 'post',
                        headers : {
                              'Content-Type' : 'application/json',
                              Authorization : 'Bearer ' + auth.token
                        },
                        body : JSON.stringify(sendComment)
                  })
                  const response = await sendedData.json().then(GetPosts())
                  console.log(response)
                  setComments([])
       }

       async function handleUpdateComment(){
            console.log("com updated")
       }
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
      
useEffect(()=>{
            GetPosts()
},[])



      // console.log(data)
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
                                          <form onSubmit={handleComment} data-id={obj.id}>
                                                <input  type="text" name="comment" placeholder="Comment ...." value={comments} onChange={e => setComments(e.target.value)}/>
                                                <button className="btn-comment" type="submit">Comment</button>
                                          </form>

                                    </div>
                                          <div className="comments">
                                                <ul className="comments-list">
                                                      <span title="Voir les commentaires" onClick={handleShowComments}>
                                                            <i class="fas fa-comments fa-lg white" >&nbsp;{obj.comments.length}</i> 
                                                      </span>
                                                      { showComments &&
                                                            obj.comments.map((com)=>(
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
                                                                                    {userCredentials.userId === com.user.id &&
                                                                                          <div className="actions__container">
                                                                                                <i title="Suppression" className="fas fa-trash-alt fa-lg red" onClick={handleDeleteComment} data-id={com.id}></i>&nbsp;&nbsp;
                                                                                                <i title="Modification" class="fas  fa-edit fa-lg green" onClick={handleShowUpdateForm} data-id={com.id}></i>
                                                                                          </div>
                                                                                    }
                                                                                    
                                                                              </div>
                                                                              {(showUpdateForm && userCredentials.userId === com.user.id ) && 
                                                                                    <div className="update__container" key={com.id}>
                                                                                          <UpdateComments onSubmit={handleUpdateComment}
                                                                                           onChange={(e)=>{
                                                                                                 console.log(e.target)
                                                                                                setUpdateComment(e.target.value)}
                                                                                          
                                                                                           } 
                                                                                            value={updateComment}/>
                                                                                    </div>
                                                                              }
                                                                              <div>
                                                                              </div>
                                                                       </div>
                                                                  </li>
                                                            ))
                                                      }
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

