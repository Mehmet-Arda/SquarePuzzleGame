
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();


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

                res.send({ response: "Tebrikler ilk kayıtlı puan" });

                fs.writeFile("highestscore.txt", JSON.stringify(usersinfo), err => {
                    if (err)
                        console.log("Yazma işleminde hata.");

                });



            }


        });


        /*   res.send({ response: req.body }); */


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

});


app.route("/").get((req, res) => {
    res.render("index");
})


app.listen(process.env.PORT || port, () => {

    console.log("Listening on port 3000");
})