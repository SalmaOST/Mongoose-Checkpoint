const mongoose=require('mongoose')
//EX1
const connectionDBs=async()=>{
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Connected to DBs.....'))
    .catch(err=>console.log('err in the connection',err));
  }
connectionDBs();



//EX2
const Schema = mongoose.Schema
const PersonProptype = new Schema({
  name:{ type: String, required: true },
  age:{type: Number, default:18},
  favoriteFoods: [String]
})
const Person = mongoose.model('Person', personSchema)





//EX3
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


//EX4
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




//EX5
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

//EX6
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


//EX7
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


//EX8
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




//EX9
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

//10
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

//EX11
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



//EX12
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


