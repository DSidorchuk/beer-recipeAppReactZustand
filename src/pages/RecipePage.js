import { useParams } from "react-router-dom";

import { useRecipeStore } from "../store";
import './recipePage.scss';

const RecipePage = () => {
   const {recipeId} = useParams();
   const list = useRecipeStore(state => state.recipes);
   const {
      name,
      first_brewed,
      description,
      image_url,
      abv,
      ibu,
      target_fg,
      target_og,
      ebc,
      srm,
      ph,
      attenuation_level,
      volume,
      boil_volume,
      food_pairing,
      brewers_tips,
      contributed_by,
      ingredients,
      method,
      tagline,
   } = list.find(item => item.id == recipeId);

   return (
      <div className="page"> 
         <div className="page__img">
            <img src={image_url} alt={name}/>
         </div>
         <div className="page__shorts">
            <h2 className="page__shorts-title">{name}</h2>
            <h4 className="page__shorts-subtitle">{tagline}</h4>
            <div className="page__shorts-vol">
                  <p>Volume: {volume.value} {volume.unit}</p>
                  <p>Boil volume: {boil_volume.value} {boil_volume.unit}</p>
            </div>
            <div className="page__shorts-params">
               <div className="page__shorts-block">
                  <p>ABV: {abv}</p>
                  <p>IBU: {ibu}</p>
                  <p>EBC: {ebc}</p>
               </div>
               <div className="page__shorts-block">
                  <p>SRM: {srm}</p>
                  <p>FG: {target_fg}</p>
                  <p>OG: {target_og}</p>
               </div>
               <div className="page__shorts-block">
                  <p>pH: {ph}</p>
                  <p>Attenuation Level: {attenuation_level}</p>
               </div>
            </div>
            <h4 className="page__shorts-subtitle">Hops:</h4>
            <ul className="page__shorts-hops">
               {ingredients.hops.map(item => {
                  return (
                     <li>
                        <p>{item.add}</p>
                        <p>{item.attribute}</p>
                        <p>{item.name}</p>
                        <p>{item.amount.value} {item.amount.unit}</p>
                     </li>
                  )
               })}
            </ul>
            <h4 className="page__shorts-subtitle" >Malt:</h4>
            <ul className="page__shorts-malt">
               {ingredients.malt.map(item => {
                  return (
                     <li>
                        <p>{item.name} </p>
                        <p>{item.amount.value} {item.amount.unit}</p>
                     </li>
                  )
               })}
            </ul>
            <h4 className="page__shorts-subtitle">Yeast:</h4>
            <p className="page__shorts-yeast">{ingredients.yeast}</p>
            <div className="page__shorts-author">
                  <p>Contributed by {contributed_by.replace(/<.+>/, '')} at {first_brewed}</p>
               </div>
         </div>
         <div className="page__details">
            <p className="page__details-descr">{description}</p>
            <h4 className="page__details-subtitle">Method:</h4>
            <p className="page__details-fermentation">
               Fermentation temperature: 
               {method.fermentation.temp.value} {method.fermentation.temp.unit}
            </p>
            <ul className="page__details-mash">
               Mash temperature:
               {method.mash_temp.map(item => {
                  return (
                     <li>
                        <p>Duration: {item.duration}</p>
                        <p>{item.temp.value} {item.temp.unit}</p>
                     </li>
                  )
               })}
            </ul>
            <div className="page__details-tips">{brewers_tips}</div>
            <ul className="page__details-food">
               Food pairing:
               {food_pairing.map(item => {
                  return (
                     <li>{item}</li>
                  )
               })}
            </ul>
         </div>
      </div>
   )
}

export default RecipePage;