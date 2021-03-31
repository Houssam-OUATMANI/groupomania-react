import React,{useState} from 'react'

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

      return(
            <span onClick={isClicked === false ? handleAddLikes : handleCancelLikes}>
                  <i className={isClicked === false ?"fas fa-heart fa-lg fa-2x " : "fas fa-heart fa-2x red"}></i> {like}
            </span>
      )
}