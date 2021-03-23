const math = require('mathjs')
//Here is the code for basic recommendation using user vectors

//We have the dataset of all wines
//FIXME : Once the dataset created, we have to get a tocategorical for the differents aromas -> Si tu arrive à les scrapper c'est facile

// Creating the user vector (/ depends on the dataset)
//FIXME : Est ce qu'on donne un user vector prédefini ou un user vector avec que des 0 ? -> que des zeros ou alors au debut on le forces à noter quelques vins

//Once we have the user vector user_vector

//To predict the score we use the cos distance 
function predict_cos_score(user_vector,wine){
  return math.dot(user_vector, wine)/(math.norm(user_vector)*math.norm(wine))
}
