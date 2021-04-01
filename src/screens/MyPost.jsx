import React, {useEffect , useState, useContext, Fragment} from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth.context'
import './myPost.css'
import LikeIcone from '../components/Navigation/LikeIcone';
import UpdateProfilePhoto from '../components/Navigation/UpdateProfilePhoto';
import UpdateProfileUsername from '../components/Navigation/UpdateProfileUsername';


const GET_MY_POSTS_URL = "http://127.0.0.1:5000/api/posts/get-my-posts"
const DELETE_POST_URL = "http://127.0.0.1:5000/api/posts/delete-post/"
const DELETE_COMMENT_URL = "http://127.0.0.1:5000/api/comments/delete-comment/"

const ALL_POST_URL = "http://127.0.0.1:5000/api/posts/all-posts"


export default function MyPost(){
      const auth = useContext(AuthContext)
      const [data, setData] =  useState('')
      const userCredantials = JSON.parse(localStorage.getItem('auth')) || undefined
      const adminCredantails = JSON.parse(localStorage.getItem('admin')) || undefined

     

      // state form update
      const [showUpdateDesc, setShowUpdateDesc] = useState(false)
      const [showUpdatePic, setShowUpdatePic] = useState(false)
      const [showComments, setShowComments]= useState(true)


      async function getMyPosts(){
            if(userCredantials){
                  const URL = `${GET_MY_POSTS_URL}/${userCredantials.userId}`
                  const getPosts = await fetch(URL, {
                        headers : {
                              Authorization : 'Bearer ' + auth.token
                        }
                  })
                  const response = await getPosts.json()
                  setData(response)
            }
            if(adminCredantails){
                
                  const getPosts = await fetch(ALL_POST_URL, {
                        headers : {
                              Authorization : 'Bearer ' + auth.token
                        }
                  })
                  const response = await getPosts.json()
                  setData(response)
            }
      }
      useEffect(()=>{
            getMyPosts()
      },[])
      
     

    async function handleDeletePost(e){
          const conf = window.confirm("Cette publication sera definitivement suprimmée")
            const id = e.target.dataset.id

            if(conf){
                  const deletePost = await fetch(DELETE_POST_URL+id, {
                        method : 'delete',
                        headers : {
                              Authorization : 'Bearer ' + auth.token
                        }
                  })
                  await deletePost.json().then(getMyPosts())
            }
      }

     async function handleDeleteComment(e){
            const id = e.target.dataset.id
                              
                              const deleteComment = await fetch(DELETE_COMMENT_URL+id, {
                                    method : "delete",
                                    headers : {
                                          Authorization : "Bearer " + auth.token
                                    }
                              })
                               await deleteComment.json()
                             await getMyPosts()
      }


      if(data){
            if(data.length < 1){
                  return(
                        <div className="post-null-container">
                              <h2 className="post-null">{!!adminCredantails === true ? "Pas de publication" : "Tu n'as crée aucune publication 😩"} </h2>
                              {
                                    !!adminCredantails === false &&(
                                          <Link className="post-null-add" to="/add-post">Par ici pour  en crée une 🙂 </Link>
                                    )
                              }
                        </div>
            )
            }

            return(
                  data.map(obj => (
                        <Fragment>

                        <div className="card" key={obj.id} >
                              <div className="card-username__info">
                                    <div>
                                          <img src={obj.user.imageUrl} alt=""/>
                                    </div>
                                    <h2 className="username"> {obj.user.username}</h2>
                              </div>
                              <p className="created-at"> Posté le {obj.createdAt.split('T').join(' à ').split('.000Z').join('')}</p>
                              <div className="detail">
                                    <h3>{obj.title}</h3>
                                    <hr/>
                                    <br/>
                                    <h4>{obj.detail}</h4>
                                    <br/>
                                    <hr/>
                              </div>
      
                              <div className="card-image__post">
                                    <img src={obj.imageUrl} alt=""/>
                              </div>
      
                              <div className="card-reaction">
                                  <LikeIcone likes={obj.likes}/>
                              </div>
                              <ul className="comments-list">
                                    <span title="Voir les commentaires" onClick={()=> setShowComments(!showComments)}>
                                          <i className="fas fa-comments fa-lg white" >&nbsp;{obj.comments.length === 0 ? " 😔" : obj.comments.length}</i> 
                                    </span>
                             {showComments &&
                              obj.comments.map(com => (
                                    <li key={com.id}>
                                        <div className="card-username__info" id="username-comment">
                                                <div id="comment-left">
                                                      <img src={com.user.imageUrl} alt=""/>
                                                </div>
                                                <div id="comment-right">
                                                      <p>{com.user.username} <i className="fas fa-arrow-right fa-lg"></i> Le {com.createdAt.split('T').join(' à ').split('.000Z').join('')} </p>
                                                      <h3>{com.comment}</h3>
                                                </div>
                                                <div className="actions__container">
                                                      <i title="Suppression" className="fas fa-trash-alt fa-lg red" onClick={handleDeleteComment} data-id={com.id}></i>&nbsp;&nbsp;
                                                </div>
                                          </div>
                                    </li>
                              ))
                             }
                             </ul>
      
                              <div className="card-edit">
                                    {!!adminCredantails === false && (
                                          <i  className="fas fa-info white fa-3x" onClick={(e)=> {
                                                setShowUpdateDesc( e.currentTarget.showUpdateDesc = !showUpdateDesc)
                                                      console.log(e.currentTarget.setShowUpdateDesc, "salut")
                                                setShowUpdatePic(false)
                                                      }}>
                                          </i>

                                    )}
                                   {!!adminCredantails === false && (
                                         <i  className="fas fa-portrait white fa-3x" onClick={()=>{
                                               setShowUpdatePic(!showUpdatePic)
                                               setShowUpdateDesc(false)
                                         }}>
                                   </i>
                                         
                                         )}
                                   <i  className="fas fa-trash-alt fa-3x white" onClick={handleDeletePost} data-id={obj.id}></i>
      
                              </div>
                        </div>       
                              <div className="card-update">
                                    {showUpdatePic &&
                                          <UpdateProfilePhoto title="Nouvelle photo"/>
                                    }
                                    {showUpdateDesc &&
                                          <UpdateProfileUsername title="Nouvelle description"/>
                                    }
                              </div>
                        </Fragment>
                        )) 
            )

      }
      else {
            return ("")
      }
}