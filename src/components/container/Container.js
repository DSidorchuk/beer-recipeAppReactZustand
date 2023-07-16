import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../../store";
import { useEffect } from "react";

import Recipe from "../recipe/Recipe";
import './container.scss';
import {fetchRecipes} from '../../api/fetchRecipes'

const Container = () => {
   const navigate = useNavigate();
   const MAX_SIZE = 15;

   const {recipes, toggleRecipe, selectedRecipes, deleteRecipes, loadFromPage, setRecipes, changeVisible, visible} = useRecipeStore(state => state);
   const qtyOfRecipes = recipes.length;
   
   const handleClick = (e, item) => {
      if(e.button === 0) {
         navigate(`/recipe/${item.id}`)
      } else if (e.button === 2) {
         toggleRecipe(item)
      }
   }

   const clickDelete = () => {
      deleteRecipes();
   }

   const loadMoreRecipes = () => {
      if(MAX_SIZE > qtyOfRecipes && qtyOfRecipes !== 0) {
         fetchRecipes(loadFromPage)
            .then(data => setRecipes(data))
            .then(err => console.error(err))
      }
   }

   const onScroll = (e) => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      if(currentScroll >=  documentHeight) {
          window.scrollTo(0, -10);
          changeVisible();
      }
   }

   useEffect(() => {
      loadMoreRecipes()
      window.addEventListener('scroll', onScroll)
      return () => {
         window.removeEventListener('scroll', onScroll);
       };
   }, [qtyOfRecipes])


   return (
      <div className='container'>
         {recipes.slice(0, MAX_SIZE).map((item, i) => {
            const diff = visible - i; 
            return (
                  <Recipe 
                     {...item}
                     key={item.id} 
                     onClick={(e) => handleClick(e, item)}
                     active={selectedRecipes.includes(item)}
                     visible={diff <= 5 && diff >0} 
                  />
            )
         })}
         <button 
            className={selectedRecipes.length === 0 
                        ? "container__btn"
                        : "container__btn container__btn_active"}
            onClick={clickDelete}
         >
            DELETE
         </button>
      </div>
   )
}

export default Container;