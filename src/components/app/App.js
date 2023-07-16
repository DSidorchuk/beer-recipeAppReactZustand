import { Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from '../../pages/MainPage';
import RecipePage from '../../pages/RecipePage';
import NotFoundPage from '../../pages/NotFoundPage';
import { useRecipeStore } from '../../store';
import { fetchRecipes } from '../../api/fetchRecipes';

function App() {
  const {recipes, setRecipes, loadFromPage, setLoading, setRejected} = useRecipeStore(state => state);

   useEffect(() => {
      if(recipes.length === 0) {
        setLoading();
         fetchRecipes(loadFromPage)
            .then(data => setRecipes(data))
            .catch(err => {
              setRejected();
              console.error(err);
            })
      }
   }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/recipe/:recipeId' element={<RecipePage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
