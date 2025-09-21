import { createBrowserRouter } from "react-router";
import Recipe from "../page/RecipeBook/recipe";
import Home from "../page/home/homepage";
export const Routes =  createBrowserRouter(

[
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'recipebook',
        element:<Recipe />
    }
]
)