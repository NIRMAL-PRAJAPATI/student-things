const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usermodule = require('./models/user');
const usermodule2 = require('./models/residential information');
const usermodule3 = require('./models/professional information');
const projectmodule = require('./models/profile project');
const complaintmodule = require('./models/complaints');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const upload = require('./config files/multerfile');
const mail = require('./config files/mail send');

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt token verifier
const jwtverifyfunction = async (encodedform) => {
    let temp;

    if(encodedform) {
        jwt.verify(encodedform, "secret", async (err, result) => {
            temp = result.username;
        })
    } else {
        temp = "";
    }
    return temp;
}

// cookie chacker function
function cookiechecker(req, res, next) {
    if (!req.cookies.sponzeall_user) {
        res.render('error');
    } else {
        next();
    }
}

app.get('/', async (req, res) => {
    const projectlist = await projectmodule.find({}).sort({ '__v': -1 }).limit(4);
    const userlist = await usermodule.find({}).sort({ '__v': -1 }).limit(5);
    res.render("home", { projectlist, userlist });
})

app.get('/registration', (req, res) => {
    res.render("student");
})

app.get('/users', cookiechecker, async (req, res) => {
    let userarr = await usermodule.find();

    res.render("users", { users: userarr });
})

app.get('/login', (req, res) => {
    res.render("login", { msg: "" });
})

app.post('/create', upload.single('image'), async (req, res) => {
    let { name, email, mobile, birthdate, username, password } = req.body;

    let check = await usermodule.findOne({ username: username });

    if (!check) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                let variable;
                if (req.file) {
                    variable = req.file.filename;
                } else {
                    variable = "defult.png";
                }

                await usermodule.create({ name, email, mobile, birthdate, image: variable, username, password: hash })

                let token = jwt.sign({ username }, "secret");
                res.cookie("sponzeall_user", token, { maxAge: 10 * 24 * 60 * 60 * 1000 }).redirect(`/profile/${token}`);
            })
        })
    } else {
        res.render('student');
    }
})

app.post("/loginprocess", async (req, res) => {
    let user = await usermodule.findOne({ username: req.body.logusername });

    if (!user) {
        return res.render("login", { msg: "Sorry, entered username or password is incorrect, Try Again !" });
    }

    bcrypt.compare(req.body.logpassword, user.password, (err, result) => {
        if (!result) {
            res.render("login", { msg: "Sorry, entered username or password is incorrect, Try Again !" });
        } else {
            let token = jwt.sign({ username: user.username }, "secret");
            res.cookie("sponzeall_user", token, { maxAge: 10 * 24 * 60 * 60 * 1000 }).redirect(`/profile/${token}`);
        }
    });
})

app.get("/projectlist", async (req, res) => {
    let projectlist = await projectmodule.find();

    res.render('projectlist', { msg: projectlist });
})

app.get("/projectlist/:id/like", cookiechecker, async (req, res) => {
    let like = await projectmodule.findOne({ _id: req.params.id });
    let username = await jwtverifyfunction(req.cookies.sponzeall_user);

    if (like.likes.indexOf(username) === -1) {
        like.likes.push(username);
    } else {
        like.likes.splice(like.likes.indexOf(username), 1);
    }
    await like.save();

    res.redirect('/projectlist');
})

app.post('/profile/resinformation/:uid', cookiechecker, async (req, res) => {
    let { address, pincode, city, state, country } = req.body;

    
        let username = await jwtverifyfunction(req.params.uid);
        if (username) {
            let data1 = await usermodule.findOne({ username});
            let data2 = await usermodule2.findOne({ username});

            if (data2) {
                await usermodule2.findOneAndUpdate({ username}, { address, pincode, city, state, country });
            } else {
                await usermodule2.create({ username: data1.username, address, pincode, city, state, country });
            }

            res.redirect(`/profile/${req.params.uid}`);
        } else {
            res.render('error');
        }
    })

app.post('/profile/profinformation/:uid', cookiechecker, async (req, res) => {
    let { type, qualification, scwname, skill, language } = req.body;
        let username = await jwtverifyfunction(req.params.uid);
        if (username) {
            let data1 = await usermodule.findOne({ username });
            let data2 = await usermodule3.findOne({ username });

            if (data2) {
                await usermodule3.findOneAndUpdate({ username }, { type, qualification, scwname, skill, language });
            } else {
                await usermodule3.create({ username: data1.username, type, qualification, scwname, skill, language });
            }

            res.redirect(`/profile/${req.params.uid}`);
        } else {
            res.render('error');
        }
    })

app.post('/profile/update/:uid', cookiechecker, upload.single("image"), async (req, res) => {
    let { name, email, mobile, birthdate } = req.body;

        let username = await jwtverifyfunction(req.params.uid);

        let variable;
        if (req.file) {
            variable = req.file.filename;
        } else {
            variable = "defult.png";
        }

        await usermodule.findOneAndUpdate({ username }, { image: variable, name, email, mobile, birthdate });

        res.redirect(`/profile/${req.params.uid}`);
    })

app.get('/profile/logout', async (req, res) => {
    res.clearCookie("sponzeall_user").render("loader", { msg: "Student Logout Successfully !" });
})

app.get('/profile/:encodedusername', cookiechecker, async (req, res) => {
    let encodedform = req.params.encodedusername;
        let username = await jwtverifyfunction(encodedform);
        
        if (username) {
            let user = await usermodule.findOne({ username });
            let resinfo = await usermodule2.findOne({ username });
            let profinfo = await usermodule3.findOne({ username });

            if (resinfo && profinfo) {
                res.render('profile', { msg: user, msg2: resinfo, msg3: profinfo });
            } else if (resinfo) {
                res.render('profile', { msg: user, msg2: resinfo, msg3: "none" });
            } else if (profinfo) {
                res.render('profile', { msg: user, msg2: "none", msg3: profinfo });
            } else {
                res.render('profile', { msg: user, msg2: "none", msg3: "none" });
            }

        } else {
            res.render('error');
        }
    })

app.post('/profile/project/create', cookiechecker, async (req, res) => {
    let { title, discription, technology, link } = req.body;
        let username = await jwtverifyfunction(req.cookies.sponzeall_user);
        let user = await usermodule.findOne({ username });

        let projectcreate = await projectmodule.create({
            username: user.username,
            title: title,
            discription: discription,
            technology: technology,
            link: link
        })

        user.projects.push(projectcreate._id)
        await user.save();

    res.redirect(`/profile/project/${req.cookies.sponzeall_user}`);
})

app.get('/profile/project/:id', cookiechecker, async (req, res) => {

        jwt.verify(req.params.id, "secret", async (error, result) => {
        if (result) {
            let user = await usermodule.findOne({ username: result.username }).populate("projects");

            res.render('profproject', { msg: user });
        }
        else {
            res.render('error');
        }
    })
})

app.get('/profile/project/:id/delete', cookiechecker, async (req, res) => {
    await projectmodule.findOneAndDelete({ _id: req.params.id });

    res.redirect(`/profile/project/${req.cookies.sponzeall_user}`);
})

app.get('/explore', async (req, res) => {
    let userarr = await usermodule.find();
    let username = await jwtverifyfunction(req.cookies.sponzeall_user);

    res.render('explore', { users: userarr, username });
})

app.get('/explore/:id', async (req, res) => {
    let a = await usermodule.findOne({ _id: req.params.id });
    let b = await usermodule2.findOne({ username: a.username });
    let c = await usermodule3.findOne({ username: a.username });
    let d = await projectmodule.find({ username: a.username });

    if (!a) { a = ""; }
    if (!b) { b = ""; }
    if (!c) { c = ""; }
    if (!d) { d = ""; }

    res.render('viewprofile', { peruser: a, resuser: b, prouser: c, projectlist: d });
})

app.get('/complaint', async (req, res) => {
    res.render('complaint');
})

app.post('/send-email', cookiechecker, async (req, res) => {

        // let username = await jwtverifyfunction(req.cookies.sponzeall_user);
        jwt.verify(req.cookies.sponzeall_user, "secret", async (error, result) => {
        let userdetails = await usermodule.findOne({ username: result.username });

        const { subject, message } = req.body;

        await complaintmodule.create({
            username: result.username,
            subject, message
        })

        let mailOptions = {
            from: userdetails.email,
            to: 'nirmalprajapati4008@gmail.com',
            subject: subject,
            text: "FROM : " + userdetails.email + " NAME : " + userdetails.name + " USERNAME : " + userdetails.username + " MESSAGE : " + message,
        };

        mail.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(500).send('Error to send complaint! try again after sometimes.');
            }
            res.status(200).redirect(`/profile/activity/${req.cookies.sponzeall_user}`);
        });
    })
    });

app.get('/profile/activity/:id', async (req, res) => {
        let username = await jwtverifyfunction(req.params.id);
        let complaintdata = await complaintmodule.find({ username });

        if (!complaintdata) { res.render('activity') };

        res.render('activity', { complaintdata: complaintdata })
    })

app.get('/delete/:id', async (req, res) => {
    let cookiedeleter = await usermodule.findOne({ _id: req.params.id });
        let username = await jwtverifyfunction(req.cookies.sponzeall_user);

        if (username == cookiedeleter.username) {
            res.clearCookie("sponzeall_user");
        }
    await usermodule.findOneAndDelete({ _id: req.params.id });

    res.render("loader", { msg: "Selected Student Deleted Successfully!" })
})

app.get('/user/:error', async (req, res) => {
    res.render("error")
})

app.get('/:error', async (req, res) => {
    res.render("error")
})

app.listen(3000);