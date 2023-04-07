
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mehmetardayuksel:Y3TJFh3fSBsNlcJf@squarepuzzlegame.eagiql1.mongodb.net/SquarePuzzleGame?retryWrites=true&w=majority");
let UsersGameInfo = mongoose.model("UsersGameInfo", { UserName: String, NumberOfMoves: String, Point: String }, "UsersGameInfo");


const cors = require("cors");


const port = 3000;

app.use(cors({
    origin: "*",
}))



app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.json());




app.route("/square_puzzle_game")
    .get((req, res) => {

        res.render("index");
    })
    .post((req, res) => {


        let currentUserInfo = { UserName: req.body.UserName, NumberOfMoves: req.body.NumberOfMoves, Point: req.body.Point };

        let usersInfo = [];

        let oldUserInfo;

        let i;


        UsersGameInfo.find().then(async (data) => {

            console.log(data);

            usersInfo = data;

            if (data.length > 0) {

                oldUserInfo = usersInfo.find((user, index) => {

                    i = index;
                    return user.UserName == currentUserInfo.UserName

                });


                if (oldUserInfo != undefined) {

                    if (oldUserInfo.Point < currentUserInfo.Point) {

                        const updated = await UsersGameInfo.updateOne({ UserName: currentUserInfo.UserName }, { NumberOfMoves: currentUserInfo.NumberOfMoves, Point: currentUserInfo.Point });


                        res.send({ response: "Tebrikler yeni en yüksek puan" });


                    } else {
                        res.send({ response: "Rekor kıramadınız." });
                    }

                } else {


                    let user = new UsersGameInfo();

                    user.UserName = currentUserInfo.UserName;
                    user.NumberOfMoves = currentUserInfo.NumberOfMoves;
                    user.Point = currentUserInfo.Point;

                    user.save();

                    res.send({ response: "Tebrikler ilk kayıtlı puan" });

                }
            } else {

                let user = new UsersGameInfo();

                user.UserName = currentUserInfo.UserName;
                user.NumberOfMoves = currentUserInfo.NumberOfMoves;
                user.Point = currentUserInfo.Point;

                user.save();

                res.send({ response: "Tebrikler ilk kayıtlı puan" });
            }


        });







    });


app.route("/get_usersinfo").post((req, res) => {

    let usersInfo = [];

    let currentUserInfo = { UserName: req.body.username };

    UsersGameInfo.find().sort({ Point: -1 }).limit(3).then((topUsers) => {

        UsersGameInfo.findOne({ UserName: currentUserInfo.UserName }).then((currentUser) => {

            res.send({ response: { TopUsersInfo: topUsers, CurrentUserInfo: currentUser } });

        })


    });







});



/* 

app.route("/square_puzzle_game")
    .get((req, res) => {

        res.render("index");
    })
    .post((req, res) => {


        let userinfo = { UserName: req.body.UserName, NumberOfMoves: req.body.NumberOfMoves, Point: req.body.Point };

        let usersinfo = [];

        let oldUserInfo;

        let i;

        fs.readFile("highestscore.txt", "utf8", (err, data) => {

            if (data != undefined) {

                console.log("data: " + data);

                usersinfo = JSON.parse(data);

                oldUserInfo = usersinfo.find((user, index) => {

                    i = index;
                    return user.UserName == userinfo.UserName

                });


                if (oldUserInfo != undefined) {

                    if (oldUserInfo.Point < userinfo.Point) {

                        usersinfo[i].NumberOfMoves = userinfo.NumberOfMoves;
                        usersinfo[i].Point = userinfo.Point;

                        usersinfo.sort((a, b) => {
                            return b.Point - a.Point;
                        });

                        fs.writeFile("highestscore.txt", JSON.stringify(usersinfo), err => {

                            if (err) {
                                console.log("Yazma işleminde hata.");
                                res.send({ response: "error", error: err })
                            } else {
                                res.send({ response: "Tebrikler yeni en yüksek puan" });
                            }



                        });




                    } else {
                        res.send({ response: "Rekor kıramadınız." });
                    }

                } else {

                    usersinfo.push(userinfo);

                    usersinfo.sort((a, b) => {
                        return b.Point - a.Point;
                    });



                    fs.writeFile("highestscore.txt", JSON.stringify(usersinfo), err => {
                        if (err) {
                            console.log("Yazma işleminde hata.");
                            res.send({ response: "error", error: err })
                        } else {
                            res.send({ response: "Tebrikler ilk kayıtlı puan" });
                        }



                    });


                }



            } else {


                usersinfo.push(userinfo);

                usersinfo.sort((a, b) => {
                    return b.Point - a.Point;
                });

               

                fs.writeFile("highestscore.txt", JSON.stringify(usersinfo), err => {
                    if (err){
                        console.log("Yazma işleminde hata.");
                        res.send({ response: "error", error: err })
                    }else{
                        res.send({ response: "Tebrikler ilk kayıtlı puan" });
                    }
                        

                });



            }


        });




    });


app.route("/get_usersinfo").post((req, res) => {

    let usersInfo = [];

    let currentUserInfo;

    fs.readFile("highestscore.txt", "utf8", (err, data) => {

        if (data != undefined) {

            usersInfo = JSON.parse(data);


            let topUsersInfo = usersInfo.slice(0, 3);

            currentUserInfo = usersInfo.find((info, index) => {

                return info.UserName == req.body.username;
            });



            res.send({ response: { TopUsersInfo: topUsersInfo, CurrentUserInfo: currentUserInfo } });


        } else {

            res.send({ response: "error" });
        }

    });

}); */


app.route("/").get((req, res) => {
    res.render("index");
})


app.listen(process.env.PORT || port, () => {

    console.log("Listening on port 3000");
})