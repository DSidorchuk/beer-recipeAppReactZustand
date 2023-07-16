import { create } from 'zustand';
import { devtools} from 'zustand/middleware'


export const useRecipeStore = create(devtools((set) => ({
   recipes: [],
   selectedRecipes: [],
   loadFromPage: 1,
   visible: 5,
   status: 'pending', // fulfilled, loading, rejected
   setRecipes: (list) => set((state) => ({
      ...state,
      status: 'fulfilled',
      recipes: [...state.recipes, ...list],
      loadFromPage: state.loadFromPage + 1,
   }), false, 'set-recipes'),
   toggleRecipe: (recipe) => set((state) => {
      const list = state.selectedRecipes.includes(recipe)
                  ? state.selectedRecipes.filter(item => item.id !== recipe.id)
                  : [...state.selectedRecipes, recipe];
      return {
         ...state,
         selectedRecipes: list,
      }
   }, false, 'toggle-recipe'),
   deleteRecipes: () => set((state) => {
      const updatedList = state.recipes.filter(item => {
         return !state.selectedRecipes.includes(item);
      })
      return {
         ...state,
         selectedRecipes: [],
         recipes: updatedList,
      }
   }, false, 'delete-recipe'),
   changeVisible: () => set((state) => {
      if (state.visible < 15) {
         return {
            ...state,
            visible: state.visible + 5,
         }
      }
      return state;
   }, false, 'change-visible'),
   setLoading: () => set((state) => ({
      ...state, 
      status: 'loading'
   }), false, 'recipe-loading'),
   setRejected: () => set((state) => ({
      ...state, 
      status: 'rejected'
   }), false, 'recipe-fetch-rejected'),
})))