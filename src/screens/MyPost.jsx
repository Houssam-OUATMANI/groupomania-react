import React, {useEffect , useState, useContext} from 'react'
import { Link} from 'react-router-dom'

import { AuthContext } from '../context/auth.context'
import './myPost.css'
import LikeIcone from '../components/Navigation/LikeIcone';

export default function MyPost(){
      const auth = useContext(AuthContext)
      const [data, setData] =  useState('')
      const userCredantials = JSON.parse(localStorage.getItem('auth'))


      async function getMyPosts(){
            const URL = `http://127.0.0.1:5000/api/posts/get-my-posts/${userCredantials.userId}`
            console.log(URL)

            const getPosts = await fetch(URL, {
                  headers : {
                        Authorization : 'Bearer ' + auth.token
                  }
            })
            const response = await getPosts.json()

            setData(response)
      }
      useEffect(()=>{
            getMyPosts()
      },[])
      
      console.log(data)

      // Update POST
      function handleUpdatePost(e){
          
      }
      // DELETE POST

    async function handleDeletePost(e){
            const URL = "http://127.0.0.1:5000/api/posts/delete-post/"
            const id = e.target.dataset.id
            console.log(id)
            const deletePost = await fetch(URL+id, {
                  method : 'delete',
                  headers : {
                        Authorization : 'Bearer ' + auth.token
                  }
            })
            const response = await deletePost.json().then(getMyPosts())
            console.log(response)
      }

      if(data){
            if(data.length < 1){
                  return(
                        <div className="post-null-container">
                              <h2 className="post-null">Aucune publication n'a été crée pour le moment</h2>
                              <Link className="post-null-add" to="/add-post">Par ici pour crée une publication</Link>
                        </div>
            )
            }

            return(
                  data.map(obj => (
            
                        <div className="card" key={obj.id} >
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
      
                              <div className="card-edit">
                                   <button className="btn-update" onClick={handleUpdatePost}>UPDATE</button>
                                   <button className="btn-delete" onClick={handleDeletePost} data-id={obj.id}>DELETE</button>
                              </div>
                        </div>       
                        )) 
            )

      }
      else {
            return ("")
      }
}