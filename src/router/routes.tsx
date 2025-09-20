import { createBrowserRouter } from "react-router";
import Recipe from "../page/RecipeBook/recipe";

export const Routes =  createBrowserRouter(

[
    {
        path:'recipebook',
        element:<Recipe />
    }
]
)