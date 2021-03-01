import React,{useState, useEffect} from 'react'

export default function LikeIcone(props){

      const [like, setLike] = useState(+props.likes)
      const [isClicked, setIsClicked] = useState(false)

      function handleAddLikes(){
            setLike(like + 1)
            setIsClicked(true)
      }

      function handleCancelLikes(){
            setLike(like - 1)
            setIsClicked(false)
      }

      console.log('like', like)
      return(
            <span onClick={isClicked === false ? handleAddLikes : handleCancelLikes}>
                  <i className={isClicked === false ?"fas fa-heart fa-lg " : "fas fa-heart fa-lg red"}></i> {like}
            </span>
      )
}