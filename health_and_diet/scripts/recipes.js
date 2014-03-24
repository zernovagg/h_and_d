/*
Meal planning application, used for dragging and dropping a plan in HTML

Recipe list is a JSON list to insert it into the HTML and update it more easily

What this little app needs to do in English

1. Load all recipes by type into lists under the days of the week table

2. Allow for recipes to be dragged and dropped into the days of the week

3. Allow for the current week's plan to be saved with recipes in the current state (is this possible?)

4. Allows for the user to clear the recipes out of the week by hitting the clear button.


*/

'use strict';

var data = {
    "recipes": [
        { "id": "1", "name": "chicken rice soup", "type": "main" },
        { "id": "2", "name": "steaks", "type": "main" },
        { "id": "3", "name": "apple pie", "type": "dessert" },
        { "id": "4", "name": "roasted brussel sprouts", "type": "side" },
        { "id": "5", "name": "mashed potatoes", "type": "side" },
        { "id": "6", "name": "fish tacos", "type": "main" },
        { "id": "7", "name": "salad", "type": "side" },
        { "id": "8", "name": "grilled chicken salad", "type": "main" },
        { "id": "9", "name": "side veggie", "type": "side" },
        { "id": "10", "name": "mixed fruit", "type": "dessert" },
        { "id": "11", "name": "shepherd's pie", "type": "main" },
        { "id": "12", "name": "spaghetti and home made sauce", "type": "main" },
        { "id": "13", "name": "roast squash", "type": "side" },
        { "id": "14", "name": "lamb steaks", "type": "main" },
        { "id": "15", "name": "crockpot beef stew", "type": "main" },
        { "id": "16", "name": "kielbasa crockpot meal", "type": "main" },
        { "id": "17", "name": "beet salad", "type": "side" },
        { "id": "18", "name": "chili", "type": "main" },
        { "id": "19", "name": "corn muffins", "type": "side" },
        { "id": "20", "name": "grilled sausages", "type": "main" },
        { "id": "21", "name": "grilled veggies", "type": "side" },
        { "id": "22", "name": "turkey meatloaf", "type": "main" },
        { "id": "23", "name": "meatloaf", "type": "main" },
        { "id": "24", "name": "mashed cauliflower", "type": "side" },
        { "id": "25", "name": "sloppy joes", "type": "main" },
        { "id": "26", "name": "poached dover sole", "type": "main" },
        { "id": "27", "name": "salmon", "type": "main" },
        { "id": "28", "name": "steamed broccoli", "type": "side" },
        { "id": "29", "name": "cous cous", "type": "side" },
        { "id": "30", "name": "hamburgers", "type": "side" },
        { "id": "31", "name": "roast cauliflower", "type": "side" }
    ],
    "weeks": {
        "2013-04-14": {
            "Sunday": ["1", "4"],
            "Monday": ["2", "5"],
            "Tuesday": ["2", "5"],
            "Wednesday": ["2", "5"],
            "Thursday": ["2", "5"],
            "Friday": ["2", "5"],
            "Saturday": ["2", "5"]
        }
    }
};

/* Working to create an MVC structure */


var Model = (function () {
    /* create Model class  */
    var Model = function (raw) {
        if (raw instanceof Model) {
            raw = raw.data;
        }
        
        this.data = raw;
    };
    
    /* Adding a method onto the Model class */
    /* What exactly is this doing? It is getting one thing out of the data? Used in pluck to do that - correct?
        And why do you need to set something - when are we using the setting portion of this? 
        So is the setter being used to update a value and the getter being used to grab the value?
        Why is this a switch - how is it determined which times you use get and which you use set? 
        Knows what to do based on how many arugments you have entered (1 will get, 2 will set) */
    
    Model.prototype.prop = function (name, value) {
        switch (arguments.length) {  /* Side note - arguments refers to the variable number of argument passed to the function, it is not an array, but similar to one */
        case 1:
            // Getter
            return this.data[name];
        case 2:
            // Setter
            this.data[name] = value;
            break;
        }
        
        return this;
    };
    
    return Model;
}());

console.log(new Model(data.recipes));


var Collection = (function () {
    /* Creating the collection, to be the group of data */
    var Collection = function (data) {
        this.data = [];
        
        this.setData(data);
    };
    
    /* Base this on the Model class from above */
    Collection.prototype.model = Model;
    
    /* Pushing the raw data into an array */
    Collection.prototype.setData = function (raw) {
        var Model = this.model;
        var data = this.data;
        var i = 0;
        var length = raw.length;
        
        for (; i < length; i++) {
            data.push(new Model(raw[i]));
        }
    };
    
    
    /* Method to be able to pluck out a part of the array when desired */
    Collection.prototype.pluck = function (name) {
        var model;
        var value;
        var returnArray = []; /* What the output will be */
        var data = this.data; /* to set the data based on what you pass into the method */
        var length = data.length; 
        var i = 0;
        
        /* Looping over the data to grab a particular value out of it */
        for (; i < length; i++) {
            model = data[i];
            value = model.prop(name); /* where the prop method from above is being used */
            returnArray.push(value);
        }
        
        return returnArray;
    };
    
    return Collection;
}());


/* Extend the model class to be used for the recipes */
var RecipeModel = (function() {
    var RecipeModel = function () {
        Model.apply(this, arguments);
    };
    
    RecipeModel.prototype = Object.create(Model.prototype);
    
    return RecipeModel;
}());


/* Extend the collection class to be used for the recipes */
var RecipeCollection = (function() {
    /* Creating a new class, using the Collection class as it's direct pointer in the inheritance chain */
    var RecipeCollection  = function () {
        Collection.apply(this, arguments);
    };
    
    /* Object.create creates a new empty object that points directly to the object used, in this case Collection */
    RecipeCollection.prototype = Object.create(Collection.prototype);
        
    /* What is happening here? Is it taking the model that is assigned through apply and making it into RecipeModel? */
    RecipeCollection.prototype.model = RecipeModel;
    
    
    /* Filter method to be able to sort the data by type 
        This could also be a getter that would actually just sort by type or somethiing, think about that? 
        The output of this is an array of the RecipeModels */
    RecipeCollection.prototype.filter = function (callback) {
        return this.data.filter(callback);
    };
    
    return RecipeCollection; 
}());

/* Shows that all the recipe data has been pushed into an array containing the objects */
//console.log(new RecipeCollection(data.recipes));

// Grabbing all the recipes out of the RecipeCollection

console.log(typeof(Model));

(function () {
    var recipes = new RecipeCollection(data.recipes);
    console.log(recipes);
    
    /* The code below is the same thing repeated 3 times to do it with the 3 different types -
        How do I refactor this so that there isn't so much repitition in it? 
        Make a function to take in a variable to be the list name & type, to spit out the proper list filtered.
        Make a function for a loop - takes in a variable for the list name? */
    
    /* Filter the data by type */
    
    var recipeListMain = recipes.filter(function(model) {
        return model.prop('type') == 'main';     
    });
    
    var recipeListSide = recipes.filter(function(model) {
        return model.prop('type') == 'side';
    });
    
    var recipeListDessert = recipes.filter(function(model) {
        return model.prop('type') == 'dessert';
    });
    
    /* Create the collection of the main type and then pluck out the name and insert in the html */
    var recipeListMainList = new RecipeCollection(recipeListMain)

    var recipeListMainListName = (recipeListMainList.pluck('name'));
    
    var lengthMain = recipeListMainListName.length;
    var i = 0;
    var mainList = document.getElementById("recipeList-main");
    for(; i < lengthMain; i++) {
        var listItem = document.createElement("li");
        listItem.innerHTML = recipeListMainListName[i];
        mainList.appendChild(listItem);
    }
    
    /* Create the collection of the side type and then pluck out the name and insert in the html */
    var recipeListSideList = new RecipeCollection(recipeListSide);
    
    var recipeListSideListName = (recipeListSideList.pluck('name'));
    
    var lengthSide = recipeListSideListName.length;
    var j = 0;
    var sideList = document.getElementById('recipeList-side');
    for(; j < lengthSide; j++) {
        var listItemSide = document.createElement('li');
        listItemSide.innerHTML = recipeListSideListName[j];
        sideList.appendChild(listItemSide);
    }
    
    /* Create the collection of the dessert type and then pluck out the name and insert in the html */
    var recipeListDessertList = new RecipeCollection(recipeListDessert);
    
    var recipeListDessertListName = (recipeListDessertList.pluck('name'));
    
    var lengthDessert = recipeListDessertListName.length;
    var k = 0;
    var dessertList = document.getElementById('recipeList-dessert');
    for(; k < lengthDessert; k++) {
        var listItemDessert = document.createElement('li');
        listItemDessert.innerHTML = recipeListDessertListName[k];
        dessertList.appendChild(listItemDessert);
    }
    
})();
