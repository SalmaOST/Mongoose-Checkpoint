const mongoose=require('mongoose')


// Use the mongoose basic *schema types*.
// First of all we need a **Schema**. Each schema maps to a MongoDB collection  and defines the shape of the documents within that collection.
const Schema = mongoose.Schema
const PersonProptype = new Schema({
  name:{ type: String, required: true },
  age:{type: Number, default:18},
  favoriteFoods: [String]
})
module.exports = mongoose.model('Person', personSchema)





// Create a `document` instance using the `Person` constructor you build before.
// Pass to the constructor an object having the fields `name`, `age`,
// and `favoriteFoods`. Their types must be conformant to the ones in
// the Person `Schema`. Then call the method `document.save()` on the returned
// document instance, passing to it a callback using the Node convention.
var person = new Person;
person.name = "Salla";
person.age = 21;
person.favoriteFoods = ["pizza", "chinese"];
var CreateAndSavePerson = function(done){
  person.save(function(err, data){
    if (err){
      return done(err);
    }
    else{
    done(null, data);
    }
  });
};


// Create many people using `Model.create()`, using the function argument 'arrayOfPeople'.
var createSeveralPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function(err, data) {
      if (err) {
        done(err)
      }
      else {
        done(null, data)
      }
    })
}





// Find all the people having a given name, using Model.find() -> [Person]
// In its simplest usage, `Model.find()`and returns an array of matches.
var findPersonName = function(personName, done) {
    const person = Person.find({name: personName}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
}

// `Model.findOne()` behaves like `.find()`, but it returns **only one**
// Find just one person which has a certain food in her favorites,
// using `Model.findOne() -> Person`. Use the function argument `food` as search key
var findOneByFood = function(food, done){
    const person = Person.findOne({favoriteFoods: food}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
}


// When saving a document, mongodb automatically add the field `_id`,
//Find the person having a certain Id,using `Model.findById() -> Person`.
// Use the function argument 'personId' as search key.
var findPersonById = function(personId, done) {
    const person = Person.findById({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
};


//Find a person by Id with the parameter personId as search key. Add "hamburger" to the list of her `favoriteFoods`
// Then .save()
// the updated `Person`.
var findEditThenSave = function(personId, done) {
    const ToAdd = 'hamburger'
    const person = Person.findById({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      data.favoriteFoods.push(ToAdd)
      data.save(function(err, data){
        if (err) {
          return done(err)
        }
        else {
          return done(null, data)
        }
      })
    })
}




//Find a person by `name` and set her age to `20`. Use the function parameter personName as search key.
// In order to do that you need to pass the options document `{ new: true }` as the 3rd argument to `findOneAndUpdate()`.
var findAndUpdate = function(personName, done) {
    var newAge = 20
    const person = Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
}

// Delete one person by her `_id`. You should use the methods
// `findByIdAndRemove(). They are similar to the previous update methods. They pass the removed document to the cb.
// using the function argument `personId` as search key.
var removeId = function(personId, done) {
    const person = Person.findByIdAndRemove({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
}

// `Model.remove()` is useful to delete all the documents matching given criteria.
// Delete all the people whose name is "Mary", using `Model.remove()`.
// Pass to it a query ducument with the "name" field set, and of course a callback.
var removeManyPeople = function(done) {
    var ToRemove = "Mary";
    const person = Person.remove({name: ToRemove}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
}



//Making the limit to 2 documents . it should only show the person who love burrito 
//
var queryChain = function(done) {
    var foodSearch = "burrito";
    const people = Person.find({favoriteFoods: foodSearch})
    .limit(2)
    .select({age: 0})
    .sort({name: 1})
    .exec(function(err, data){
      if (err) {
        done(err)
      }
      else {
        done(null, data)
      }
    })
}
