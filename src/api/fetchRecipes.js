export const fetchRecipes = async (page) => {
   const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`); 
   if(response.ok) {
      const data = await response.json();
      return data;
   }
   throw new Error('Could not fetch');
}