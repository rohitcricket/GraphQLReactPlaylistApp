const graphql = require("graphql");
const _ = require("lodash");

// define schema, data on the graph, relationship between objects
// define object types in GraphQL

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummy data

var books = [
	{ name: "Atlas Shrugged", genre: "Fiction", id: "1" },
	{ name: "The Fountainhead", genre: "Fiction", id: "2" },
	{ name: "Decisions with Bets", genre: "Business", id: "3" }
];

var authors = [
	{ name: "Ayn Rand", age: "113", id: "1" },
	{ name: "Leonard Peikoff", age: "84", id: "2" },
	{ name: "John David Lewis", age: "56", id: "3" }
];

// define first object type

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
});

// define root queries

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db/other source
				console.log(typeof args.id);
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
