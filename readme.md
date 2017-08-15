Da-Planets

NOTE: This is a multi-day project take your time building your relationships, Draw them out it will help.

space

Although it may be the "Final Frontier" but we can still learn a lot from what we already know about SPACE....

Perhaps one of the most difficult problems we face when building software is managing the relationships between objects. Life has almost an immeasurable level of connections and it is this vastness that makes building scalable software tasking. Fortunately most relationships can be describe as one of the following connections.

One to One
One to Many
Many to Many
Intelligent software companies will take a careful amount of time planning out these relationships prior to ever writing their first line of code for an application. While it may apear to many as a slow way to start an application having a clear consice plan of these relationships will save countless hours and keyboard headbanging (WARNING: Graphic stick figure death) from being the number one cause of death for a developer.

Real world relationships are complex and often look something like this when brought into code

With all of the complexities involved in building out all of these relationships developers often turn to an ORM (Object Relational Mapper).

For our purposes we will be using a common database MongoDb and an ORM framework called Mongoose. One of the best benefits to an ORM is they provide us with a programmable interface (not a GUI) that allows us to write all of our code without manual queries to the database that we are storing our information to. This flexibility helps tremendously when developers need to switch Models and relationships around. This concept is a small glimpse at one of the S.O.L.I.D principles of Object Oriented programming

Let's start mapping

This project has provided the basic starting points of an application to manage Galaxies, I know a big task right. Thinking about the relationships of space you will need to create a data model for each of the files in the models directory. Every Model will need its own route handler as well. The type of data that you store on each model is up to you. You will want to use the Schemator to ensure data integrity.

Mongoose Schemas are very handy in helping you identify the properties that need to exist on your data models

//DATA MODEL SCHEMA EXAMPLE
let GalaxySchemaModel = {
  name: { type: String, required: true },
  description: { type: String },
  // Relations
  solarSystems: [{ type: ObjectId, ref: 'System' }],
  stars: [{ type: ObjectId, ref: 'Star' }]
}

let SolarSystemSchemaModel = {
  name: { type: String, required: true },
  description: { type: String },
  // Relations
  galaxyId: { type: ObjectId, ref: 'System' }, //NOTICE NO [ ] HERE - belongsTo
  starId: { type: ObjectId, ref: 'Star' }, //OR HERE - hasOne
	planets: [{ type: ObjectId, ref: 'Planet' }] //YEP BACK AGAIN - hasMany
}
You have a mostly working example in the Galaxy Model and Galaxy Routes. Both of these files will need expanded on so you can of course edit the information that you store about each item in your universe but, take your time to work on the relationships and the ability to create and read data first. Also take you time to really map out each of the items and try to identify the relationships they have between each other. The schema syntax is a bit odd when it comes to identifying your relationships but here is a handy json structure that can help you map your schemas out visually.

let blogMap = {
	name: 'Blog'
	relations: {
    // hasMany uses "localField" and "localKeys" or "foreignKey"
    hasMany: {
      comment: {
        // localField is for linking relations
        // user.comments -> array of comments of the user
        localField: 'comments',
        // foreignKey is the "join" field
        // the name of the field on a comment that points to its parent user
        foreignKey: 'commentId'
      }
    },
    // hasOne uses "localField" and "localKey" or "foreignKey"
    hasOne: {
      profile: {
        // localField is for linking relations
        // user.profile -> profile of the user
        localField: 'profile',
        // foreignKey is the "join" field
        // the name of the field on a profile that points to its parent user
        foreignKey: 'userId'
      }
    }
	}
}

let commentMap = {
	name: 'Comment'
	relations: {
    // hasMany uses "localField" and "localKeys" or "foreignKey"
    hasMany: {
      comment: {
        localField: 'comments',
        // foreignKey is the "join" field
        // Nested relationships of the same resource
        foreignKey: 'commentId'
      }
    },
    // hasOne uses "localField" and "localKey" or "foreignKey"
    hasOne: {
      post: {
        localField: 'post',
        localKey: 'postId'
      }
    },
		belongsTo: {
      user: {
        localField: 'user',
        localKey: 'userId'
      }
    }
	}
}
First Steps

Identify the relationships between each of your models

Galaxy -> Star/Planet/Moon/Species

Star -> Galaxy/Planet/Moon/Species

Planet -> Galaxy/Star/Moon/Species

Moon -> Galaxy/Star/Planet/Species

Species -> Galaxy/Star/Planet/Moon // Hint save species for last Many to Many here it gets complicated

Build your models

Know what each object is going to look like.
Write your methods for create, getAll, getOne
Use the Schemator to qualify your data has the necessary fields
Think about what the absolute necessary data needed is to create the object Don't let objects be created if they don't follow your format.
Remember everything is Async :)
Welcome to callback and promise hell
Help on avoiding callback hell
Get your Test Data in

Start with galaxies and stars -> planets -> moons -> species Good Luck if you get stuck please ask for help.