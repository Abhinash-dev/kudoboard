const { data, post, User } = require("../models/data");
const mongoose = require("mongoose");
const { sendEmailWithNodemailer } = require("../Helper/email");

exports.handleRegister = async (req, res) => {
    const { firstname, lastname, email, password, project } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.send({ success: false, msg: "user already exist" })
        } else {
            const user = new User({ firstname, lastname, email, password, project })
            user.save().then(() => {
                res.status(200).json({ success: true, msg: 'Registered successfully' });
            }).catch((err) => {
                console.log(err);
            })
        }

    }
    catch (err) {
        console.error(err);
    }
}

exports.getUser = (req, res) => {
    User.find()
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "user not found", error: err.message })
        );
}

exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "login sucess", user: user })
            } else {
                res.send({ message: "wrong credentials" })
            }
        } else {
            res.send("not register")
        }

    } catch (err) {
        console.error(err);
    }

}



exports.getPost = (req, res) => {
    post.find({ id: `${req.params.id}` })
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "post not found", error: err.message })
        );
};

exports.getLinkPost = (req, res) => {

    post.find({ uuid: `${req.params.id}` })
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "link post not found", error: err.message })
        );
}
exports.getAllPost = (req, res) => {
    post.find().sort({ expire_at: -1 })
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "post not found", error: err.message })
        );
};

exports.getUserboard = (req, res) => {
    post.find({ userid: `${req.params.id}` })
        .sort({ createdAt: -1 })
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "post not found", error: err.message })
        );
};

exports.getTitle = (req, res) => {
    data.find({ _id: `${req.params.id}` })
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "post not found", error: err.message })
        );
};

exports.createKudo = (req, res) => {

    data.create(req.body)
        .then((data) => res.json({ message: "Kudo create successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed", error: err.message })
        );
};


exports.sendLink = (req, res) => {

    const emailData = {
        to: `${req.body.rec_email}`,
        from: "code4dev12@gmail.com",
        subject: "Kudoboard Post",
        // text: `Email received from Kudoboard from \n Sender name: ${req.body.name} \n Sender email: ${req.body.email} \n Sender message: ${req.body.message}`,
        html: `
            <h4 style="color:#000;
            font-family: 'Montserrat',Verdana,Helvetica,sans-serif;
            font-size: 24px;
            font-weight: 700;">Email received from Kudoboard:</h4>
            <p style="font-size:16px; font-family: 'Montserrat',Verdana,Helvetica,sans-serif; color:#000;">
            Sender name:${req.body.name}
            </p>
            <p style="font-size:16px;font-family:'Montserrat',Verdana,Helvetica,sans-serif; color:#000;">Sender message: ${req.body.message}</p>
            <p style="font-size:16px;font-family:'Montserrat',Verdana,Helvetica,sans-serif; color:#000;">Please find below the post link : ${req.body.postlink}</p> 
            <p style="font-size:16px;font-family:'Montserrat',Verdana,Helvetica,sans-serif; color:#000;">Thanks & regards</p>
            <p style="font-size:16px;font-family:'Montserrat',Verdana,Helvetica,sans-serif; color:#000;">Kudoboard Team</p>    
        `,
    };
    sendEmailWithNodemailer(req, res, emailData)
}

exports.postKudo = (req, res) => {
    const url = req.protocol + '://' + req.get('host')

    const post2 = new post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        rec_email: req.body.rec_email,
        recipient_name: req.body.recipient_name,
        message: req.body.message,
        id: req.body.id,
        // email:req.body.email,
        userid: req.body.userid,
        profileImg: url + "/" + req.file.path,
        uuid: req.body.uuid
    });
    post2.save().then(result => {
        res.status(201).json({
            message: "post successfully!",
            data: result
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })

};

exports.deletePost = async (req, res) => {

    try {
        await post.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, msg: 'Post Deleted' });
    }
    catch (err) {
        console.error(err);
    }

};
exports.deleteUser = async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, msg: 'User Deleted' });
    }
    catch (err) {
        console.error(err);
    }

};


exports.putUpdatePost = async (req, res) => {
    const id = req.params.id;
    const message = req.body.message;
    try {
        const updatedResult = await post.findByIdAndUpdate(
            { _id: id },
            {
                message: `${message}`
            },
            {
                new: true
            }
        );

        return res.status(200).json({ success: true, msg: 'Post updated' });
    } catch (error) {
        console.log(error);
    }
};