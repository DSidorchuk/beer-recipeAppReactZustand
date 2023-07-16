import './recipe.scss';

const Recipe = (
   {
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
      contributed_by,
      ingredients,
      tagline,
      onClick,
      active,
      visible,
   }
) => {

   const clazz = active ? 'recipe recipe_active' : 'recipe'
   
   return (
      <div 
         className={visible ? clazz : clazz.concat(' recipe_hidden')} 
         onMouseDown={onClick}
         onContextMenu={e => e.preventDefault()}
      >
         <div className="recipe__grid">
            <div className="recipe__img">
               <img src={image_url} alt={name}/>
            </div>
            <div className="recipe__data">
               <h3 className="recipe__name">{name}</h3>
               <p className="recipe__tag">{tagline}</p>
               <div className="recipe__volume">
                  <p>Volume: {volume.value} {volume.unit}</p>
                  <p>Boil volume: {boil_volume.value} {boil_volume.unit}</p>
               </div>
               <div className="recipe__params">
                  <div className="recipe__params-block">
                     <p>ABV: {abv}</p>
                     <p>IBU: {ibu}</p>
                  </div>
                  <div className="recipe__params-block">
                     <p>EBC: {ebc}</p>
                     <p>SRM: {srm}</p>
                  </div>
                  <div className="recipe__params-block">
                     <p>FG: {target_fg}</p>
                     <p>OG: {target_og}</p>
                  </div>
                  <div className="recipe__params-block">
                     <p>pH: {ph}</p>
                     <p>Attenuation Level: {attenuation_level}</p>
                  </div>
               </div>
               <div className="recipe__descr">{description}</div>
               <div className="recipe__ingr">
                  <div className="recipe__ingr-hops">
                     <u>HOPS</u>
                     {ingredients.hops.map(item => {
                        return (
                           <p key={item.name + item.add}>
                              {item.add} {item.name} {item.attribute}
                           </p>
                        )
                     })}
                  </div>
                  <div className="recipe__ingr-malt">
                     <u>MALT</u>
                     {ingredients.malt.map(item => {
                        return (
                           <p key={item.name}>{item.name}</p>
                        )
                     })}
                  </div>
                  <div className="recipe__ingr-yeats">
                     <u>YEATS</u>
                     <p>{ingredients.yeast}</p>
                  </div>
               </div>
               <div className="recipe__author">
                  <p>Contributed by {contributed_by.replace(/<.+>/, '')} at {first_brewed}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Recipe;