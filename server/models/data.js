const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
    selectValue: {
        type: "String",
    },
    title: {
        type: "String"
    },
    recipient_name: {
        type: "String"
    },
    email: {
        type: "String"
    },
    userid: {
        type: "String"
    }
},
    { timestamps: true });


const PostSchema = new mongoose.Schema({
    expire_at: { type: Date,
        default: new Date(new Date().valueOf() + 604800000)
        , expires: 60 * 60 * 24 * 7 },

    name: {
        type: "String"
    },
    rec_email: {
        type: "String"
    },
    message: {
        type: "String"
    },
    profileImg:
    {
        type: "String"
    },
    recipient_name: {
        type: "String"
    },
    id: {
        type: "String"
    },

    userid: {
        type: "String"
    },
    uuid: {
        type: "String"
    },
});

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    project: String
});

const User = mongoose.model("User", userSchema)

const data = mongoose.model("data", DataSchema);

const post = mongoose.model("post", PostSchema);

module.exports = { data, post, User };


