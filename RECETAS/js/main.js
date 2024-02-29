// fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=013a3e02c1254e50991acc241bebc631')
const baseUrl = `https://api.spoonacular.com`;
let apiKey = '?apiKey=013a3e02c1254e50991acc241bebc631';
let cuisine = [];
let handleError = 'API Call error';
let RecipeIds = [];
let arrIngredients = document.createElement('div');
let offset = 0;
let limit = 1;
const previousButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const contentCardSelector = document.querySelector('.content-card');
const searchBtn = document.querySelector('#submitSearch')
const viewContent = document.querySelector('#viewContent');
document.addEventListener("DOMContentLoaded", function(offset){
    
    if(offset == 0){
        previousButton.style.visibility = 'none';
        }
    else{
        previousButton.style.visibility = 'auto'
    }
    })

const fetchRecipes = async () => {
    try{
        
    viewContent.innerHTML='';
    let searchQuery = document.querySelector('#searchQuery').value;
    let query = `&query=${searchQuery}`;
    
    let offsetString = `&offset=${offset}`;
   
    let limitString = `&number=${limit}`;
    if(searchQuery == ''){
        query = '';
    };
    
        const response = await fetch(`${baseUrl}/recipes/complexSearch${apiKey}${limitString}${query}${offsetString}&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true`)
    if(!response.ok){
        throw new Error(handleError);
    }
    const data = await response.json();
    console.log(data);
    const recipeList = data.results;
    recipeList.forEach((recipes) => {
        const ingredientList = recipes.extendedIngredients;
        const instructionList = recipes.analyzedInstructions[0].steps;
        const contentCard = document.createElement('div');
        contentCard.classList.add('content-card')
        contentCard.innerHTML = `
        <div class="content-card-head">
        <img src="${recipes.image}">
        <a id="goToRecipe" href="${recipes.spoonacularSourceUrl}" target="_blank">
        <h1>${recipes.title}</h1>
        </a>
        </div>
        <div class="content-card-ingredients">
            <ul class="ingredientList"><h3>Ingredients:</h3>
            <br>
            </ul></div>
        <div class="content-card-instructions">
            <ol class="instructionList"><h3>Instructions:</h3>
            <br>
        </ol></div>`
    viewContent.appendChild(contentCard);
    ingredientList.forEach((ingredients) => {
        const ingredientCard = document.createElement('li');
        ingredientCard.innerHTML = ingredients.nameClean
        const ingredientUnorderedList = document.querySelector('.ingredientList')
        ingredientUnorderedList.appendChild(ingredientCard)
    })

    instructionList.forEach((instructions) => {
        const InstructionCard = document.createElement('li');
        InstructionCard.innerHTML = instructions.step
        const instructionOrderedList = document.querySelector('.instructionList')
        instructionOrderedList.appendChild(InstructionCard)
    })
    })


    }
    
    catch(err){
        console.log(err);
        throw new Error(handleError);
    }

}
fetchRecipes().then((msg) =>{
    console.log(msg);
}).catch((err) =>{
    console.log(err);
})

const prevBtn = () => {
  
        offset--;
        fetchRecipes(offset)
    }
   
    
    

    const nextBtn = () => {
        if(offset * limit < 900){
            offset++
        fetchRecipes(offset)
        }
        
    }

