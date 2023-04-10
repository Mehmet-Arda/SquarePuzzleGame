
//Sayfa hazır olduğunda çalışacak olaylar event'i
document.addEventListener("DOMContentLoaded", () => {

    let topUsersInfoContainer = $(".top-users-info:nth-child(1)");
    let currentUserInfoContainer = $(".top-users-info:nth-child(3)");

    function getAndSetGameStatistics() {

        let currentUserInfo;
        let topUsersInfo;


        console.log(currentUserInfoContainer);

        topUsersInfoContainer.hide();
        currentUserInfoContainer.hide();

        topUsersInfoContainer.removeClass("d-none");
        currentUserInfoContainer.removeClass("d-none");


        $.ajax({
            method: "POST",
            url: "/get_usersinfo",
            contentType: "application/json",
            data: localStorage.getItem("userinfo")

        }).done((res) => {

            console.log(res.response);

            currentUserInfo = res.response.CurrentUserInfo;
            topUsersInfo = res.response.TopUsersInfo;

            if (res.response != "error") {

                $(".top-users-info .user-info-container").each(function (index) {

                    if (index <= 2) {


                        if (topUsersInfo.length == 0) {

                            $(this).find(".user-name").text(`${index + 1}-`);
                            $(this).find(".number-of-movement").text("-");
                            $(this).find(".point").text("-");

                        } else if (topUsersInfo.length == 1) {

                            if (index == 0) {
                                $(this).find(".user-name").text(`${index + 1}- ${topUsersInfo[index].UserName}`);
                                $(this).find(".number-of-movement").text(topUsersInfo[index].NumberOfMoves);
                                $(this).find(".point").text(topUsersInfo[index].Point);

                            } else if (index == 1 || index == 2) {
                                $(this).find(".user-name").text(`${index + 1}-`);
                                $(this).find(".number-of-movement").text("-");
                                $(this).find(".point").text("-");
                            }

                        }
                        else if (topUsersInfo.length == 2) {

                            if (index == 0 || index == 1) {
                                $(this).find(".user-name").text(`${index + 1}- ${topUsersInfo[index].UserName}`);
                                $(this).find(".number-of-movement").text(topUsersInfo[index].NumberOfMoves);
                                $(this).find(".point").text(topUsersInfo[index].Point);

                            } else if (index == 2) {
                                $(this).find(".user-name").text(`${index + 1}-`);
                                $(this).find(".number-of-movement").text("-");
                                $(this).find(".point").text("-");
                            }

                        } else {

                            $(this).find(".user-name").text(`${index + 1}- ${topUsersInfo[index].UserName}`);
                            $(this).find(".number-of-movement").text(topUsersInfo[index].NumberOfMoves);
                            $(this).find(".point").text(topUsersInfo[index].Point);
                        }

                    }
                    else if (index = 3) {

                        topUsersInfoContainer.fadeIn();

                        currentUserInfoContainer.fadeIn();

                        if (currentUserInfo != null) {

                            $(this).find(".user-name").text(currentUserInfo.UserName);
                            $(this).find(".number-of-movement").text(currentUserInfo.NumberOfMoves);
                            $(this).find(".point").text(currentUserInfo.Point);


                        } else {

                            $(this).find(".user-name").text(JSON.parse(localStorage.getItem("userinfo")).username);
                            $(this).find(".number-of-movement").text("-");
                            $(this).find(".point").text("-");

                        }


                    }


                });



            } else {


            }



        });


    }



    const userRememberedWelcome = $(".user-remembered-welcome");
    const usernameRemembermeContainer = $(".username-rememberme-container");
    const imageInputContainer = $(".image-input-container");

    const backtoUsernameInputBtn = $(".backto-username-input-btn");


    //Kullanıcı adını yeniden girme kısmına dönme
    backtoUsernameInputBtn.click(() => {

        $(".image-input-validation").text("");
        $(".welcome-form-container .image-input-container .username-input-box").removeClass("invalid");

        $(".wrapper .header").css({ "top": "80px", "left": "50%", "transform": "translate(-50%, -50%)" });

        imageInputContainer.fadeOut(() => {

            $(".welcome-form-container").css({ "min-height": "430px" });

            topUsersInfoContainer.fadeOut();
            currentUserInfoContainer.fadeOut();

            $(".welcome-form-container").removeClass("valid");
            $(".welcome-form-container").removeClass("invalid");

            usernameRemembermeContainer.fadeIn();


        });

    });

    let usernameInput = $("#userNameInput");
    let usernameInputValidation = $(".username-input-validation");
    usernameInputValidation.text("").show();


    //3 farklı container'ın gizlenmesi
    imageInputContainer.hide();
    usernameRemembermeContainer.hide();

    imageInputContainer.removeClass("d-none");
    usernameRemembermeContainer.removeClass("d-none");
    //***

    //Local storage'tan kullanıcı bilgilerinin getirilmesi
    let userinfo = JSON.parse(localStorage.getItem?.("userinfo"));

    if (userinfo?.rememberMe) {

        //Beni hatırla denmişse kullanıcı adı sormadan karşılama ekranı ve görsel yükleme container'ının yüklenmesi

        /* userRememberedWelcome.hide(); */
        userRememberedWelcome.removeClass("d-none");

        userRememberedWelcome.text(`Tekrar Hoşgeldiniz, ${userinfo.username}`).show();
        userRememberedWelcome.delay(1000).fadeOut(300, () => {

            $(".wrapper .header").css({ "top": "30px", "left": "80px", "transform": "translate(0, 0)" });

            $(".welcome-form-container").css({ "min-height": "560px" });

            imageInputContainer.delay(400).fadeIn();

            getAndSetGameStatistics();



        });


    } else {
        //Beni hatırla denmemiş ise kullanıcı adı girme container'ının açılması
        usernameRemembermeContainer.fadeIn();
    }





    //Cropper'ı içerisinde barındıran cropper modal'ının açılması
    const cropperModal = new bootstrap.Modal("#cropperModal", {
        keyboard: false
    });


    let cropperImage = $("#cropperImage");

    let preview = $("#preview");

    let cropBtn = $("#crop");




    //Cropper js'in kırptığı görselin yükleneceği aracı img etiketi
    const croppedImage = document.createElement("img");




    let urlImageInput = $("#urlImageInput");
    let urlImageInputValidation = $(".image-input-container .username-input-validation");
    urlImageInputValidation.text("").show();

    //Url input'u için regular expression
    const urlInputRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    let urlInputBox = $(".welcome-form-container .image-input-container .username-input-box");

    //Url input için validasyon fonksiyonu başlangıç
    const validateImageUrl = () => {

        let welcomeFormContainer = $(".welcome-form-container");



        //console.log(urlInputRegex.test(urlImageInput.val()));

        let urlImageInputValue = urlImageInput.val();
        const validationResult = urlInputRegex.test(urlImageInputValue);

        console.log(validationResult);
        console.log(urlImageInputValue);


        if (!validationResult) {

            welcomeFormContainer.removeClass("valid");
            urlInputBox.removeClass("valid");

            welcomeFormContainer.addClass("invalid");
            urlInputBox.addClass("invalid");

            urlImageInputValidation.text("");

            if (urlImageInputValue == "") {
                urlImageInputValidation.text("Lütfen bir url giriniz");
                return false;
            } else {
                urlImageInputValidation.text("Lütfen doğru formatta bir url giriniz.");
                return false;
            }

        } else {

            welcomeFormContainer.removeClass("invalid");
            urlInputBox.removeClass("invalid");

            welcomeFormContainer.addClass("valid");
            urlInputBox.addClass("valid");

            urlImageInputValidation.text("");
            return true;
        }

    };
    //Url input için validasyon fonksiyonu sonu



    urlImageInput.keyup(() => {

        validateImageUrl();

    });



    $(".url-image-input-btn").click((e) => {


        if (validateImageUrl()) {

            cropperImage.attr("src", urlImageInput.val());

            //Resim yüklendiğinde cropper modal'ının açılması
            cropperImage.on("load", () => {
                //imageResize();
                cropperModal.show();

                cropBtnClickEvents();
            });

        }

    });














    //Kullanıcı adı input'u için regular expression
    const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;

    //Kullanıcı adı için validasyon fonksiyonu başlangıç
    const validateUsername = () => {

        let welcomeFormContainer = $(".welcome-form-container");
        let usernameInputBox = $(".welcome-form-container .username-rememberme-container .username-input-box");


        console.log(usernameRegex.test(usernameInput.val()));

        let usernameInputValue = usernameInput.val();
        let validationResult = usernameRegex.test(usernameInputValue);


        if (!validationResult) {

            welcomeFormContainer.removeClass("valid");
            usernameInputBox.removeClass("valid");

            welcomeFormContainer.addClass("invalid");
            usernameInputBox.addClass("invalid");

            usernameInputValidation.text("");

            if (usernameInputValue == "") {
                usernameInputValidation.text("Lütfen bir kullanıcı adı giriniz");
                return false;
            } else if (usernameInputValue.length < 3 || usernameInputValue.length > 30) {
                usernameInputValidation.text("Lütfen 3 ile 30 karakter arası bir değer giriniz");
                return false;
            } else {
                usernameInputValidation.text("Lütfen doğru formatta bir kullanıcı adı giriniz.");
                return false;
            }

        } else {

            welcomeFormContainer.removeClass("invalid");
            usernameInputBox.removeClass("invalid");

            welcomeFormContainer.addClass("valid");
            usernameInputBox.addClass("valid");

            usernameInputValidation.text("");
            return true;
        }

    };
    //Kullanıcı adı için validasyon fonksiyonu sonu



    //Kullanıcı adı sonrası işleme geçme
    $(".username-next-btn").click(() => {

        let rememberMe = $("#_checkbox").is(":checked");

        //Kullanıcı adı validasyon kontrolü
        if (validateUsername()) {

            //Local storage'a eklenecek js objesinin oluşturulması
            let userinfo = {
                username: $.trim($("#userNameInput").val()),
                rememberMe: rememberMe
            };

            //Local storag'a ekleme
            localStorage.setItem("userinfo", JSON.stringify(userinfo));

            //Kullanıcı adı container'ının kapatılıp görsel yükleme container'ının açılması

            $(".welcome-form-container").removeClass("valid");

            $(".wrapper .header").css({ "top": "30px", "left": "80px", "transform": "translate(0, 0)" });

            usernameRemembermeContainer.fadeOut(300, () => {

                $(".welcome-form-container").css({ "min-height": "560px" });

                imageInputContainer.delay(100).fadeIn(300);
                getAndSetGameStatistics();
            });


        }

    });


    //Kullanıcı adı input'unda her tuşa basıldığında validasyon kontrolü
    usernameInput.keyup(() => {
        validateUsername();

    });






    //Görsel yükleme input işlemleri
    const imageInput = $("#imageInput");
    const imageRegex = /(\.jpg|\.jpeg|\.png)$/i;

    const imageInputValidation = $(".image-input-validation");


    //Yüklenen resim dosyası için validasyon fonksiyonu
    const validateImage = (target) => {

        let welcomeFormContainer = $(".welcome-form-container");

        welcomeFormContainer.removeClass("valid");
        welcomeFormContainer.addClass("invalid");


        if (target.files.length == 1) {

            let image = target.files[0];

            if (!imageRegex.test(image.name)) {

                imageInputValidation.text("Lütfen jpeg formatında bir resim yükleyiniz");
                return false;

            } else if (image.size > 6000000) {
                imageInputValidation.text("Yüklediğiniz görselin boyutu çok büyük");
                return false;
            }
            else {

                welcomeFormContainer.removeClass("invalid");
                welcomeFormContainer.addClass("valid");


                imageInputValidation.text("");
                return true;

            }

        } else if (target.files.length > 1) {
            imageInputValidation.text("Lütfen yalnızca bir görsel yükleyiniz");
            return false;
        } else {
            imageInputValidation.text("Lütfen bir görsel yükleyiniz");
            return false;
        }



    } //Yüklenen resim dosyası için validasyon fonksiyonu











    //Kullanıcı her resim yüklediğinde yapılacak işlemler event'i
    imageInput.on("change", (event) => {


        //Yüklenen resim kontrolden geçerse
        if (validateImage(event.target)) {

            $(".welcome-form-container").removeClass("valid");



            let imageFile = event.target.files[0];



            //Görseli yeniden boyutlandırma fonksiyonu
            const imageResize = () => {

                let cropperImage = $("#cropperImage");

                let imageRatio = cropperImage[0].naturalWidth / cropperImage[0].naturalHeight;

                //let height = 800 / imageRatio; //istenilen genişlik **px e göre yükseklik
                let width = 600 * imageRatio; //istenilen yükseklik **px e göre genişlik

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = width;
                canvas.height = 600;

                context.drawImage(cropperImage[0], 0, 0, canvas.width, canvas.height);

                cropperImage.off("load");

                cropperImage.attr("src", canvas.toDataURL("image/png", 1));

                cropperImage.on("load", () => {
                    cropperModal.show();
                })


            }; //Görseli yeniden boyutlandırma fonksiyonu








            //File reader ile yüklenen görselin cropper js'in çalışacağı img etiketine src olarak atanması
            //Resim yüklendiğinde cropper modal'ının açılması
            let reader = new FileReader();

            reader.onload = (event) => {

                cropperImage.attr("src", reader.result);

                //Resim yüklendiğinde cropper modal'ının açılması
                cropperImage.on("load", () => {
                    //imageResize();
                    cropperModal.show();
                });


            }

            reader.readAsDataURL(imageFile);
            //***


            cropBtnClickEvents();




        }//Yüklenen resim kontrolden geçerse


    });//Kullanıcı her resim yüklediğinde yapılacak işlemler event'i



    function cropBtnClickEvents() {

        $(".welcome-form-container").removeClass("valid");





        //Cropper değişkeninin oluşturulması daha sonra cropper nesnesi bu değişkene atanacak
        let cropper;

        //Cropper js'in çalışacağı cropper modal'ının açılması
        $("#cropperModal").on('shown.bs.modal', event => {

            console.log("modal açıldı");
            if ($('.modal-backdrop').length > 1) {
                $('.modal-backdrop').eq(0).fadeOut();
            }


            cropper?.destroy();


            //Cropper nesnesinin, yüklenen görseli kaynak olarak belirterek oluşturulup atanması
            cropper = new Cropper(cropperImage[0], {
                aspectRatio: 1,
                viewMode: 2,
                preview: preview[0],
                cropBoxResizable: true,
                background: true,
                highlight: true,
                guides: true,
                minCropBoxWidth: 130,
                minCropBoxHeight: 130,
                zoomOnTouch: true,
                zoomOnWheel: true
            });



            $("#cropperModal").off('shown.bs.modal');

            //Modal kapandıktan sonra cropper'ın ve modal'ın temizlenmesi
        }).on('hidden.bs.modal', event => {

            console.log("modal kapandı");
            cropper?.destroy();

            cropBtn.off("click");

            //console.log($(".cropper-container").length);

            $(".cropper-container").remove();
            imageInput.val("");
            $("#cropperImage").attr("src", "");

            /*Modalı kapanmaya zorlamak*/
            $('#cropperModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            $("#cropperModal").off('hidden.bs.modal');

        });//Modal kapandıktan sonra cropper'ın ve modal'ın temizlenmesi


        let x = 0;

        //Kırpma butonuna tıklanması, kırpma işlemlerinin gerçekleşmesi
        cropBtn.on("click", () => {

            x++;

            if (x > 1) {
                return;
            }




            //console.log(croppedImage);
            console.log(cropper.getCroppedCanvas());


            //Cropper js'den img etiketine kırpılan görselin src olarak atanması
            croppedImage.src = cropper.getCroppedCanvas().toDataURL("image/png");


            //Kırpılan görsel yüklenmesi, sonrasında 16 parçaya kırpılma işlemi
            croppedImage.addEventListener("load", () => {

                //Kırpılacak görselin x ve y koordinatlarında nereden itibaren kırpılmaya başlanacağı
                let sx = 0, sy = 0;

                //Kırpılma genişlik/yükseklik çözünürlüğü
                let increaseDensity = croppedImage.naturalWidth / 4;

                console.log("Kırpılan görsel doğal genişlik:" + croppedImage.naturalWidth);
                console.log("Kırpılan görsel 1/16 artış miktarı:" + increaseDensity);



                //const gameArea = document.createElement("div");




                //Oyun bölmesinin oluşturulması

                const gameIsStartingInfo = $("<div></div>");
                gameIsStartingInfo.addClass("game-is-starting-info");

                const gameIsStartingInfoText = $("<div></div>");
                gameIsStartingInfoText.text("Oyun Başlıyor!");
                gameIsStartingInfoText.addClass("game-is-starting-info-text");

                gameIsStartingInfo.append(gameIsStartingInfoText);





                const gameSection = $("<section></section>");
                gameSection.addClass("game-section");
                gameSection.css("z-index", 111);


                const gameAreaContainer = $("<div></div>");
                gameAreaContainer.addClass("game-area-container");



                const leftSideBarContainer = $("<div></div>");
                leftSideBarContainer.addClass("left-side-bar-container");


                const leftSidebar0 = $("<div></div>");
                leftSidebar0.addClass("left-side-bar");

                const leftSidebar1 = $("<div></div>");
                leftSidebar1.addClass("left-side-bar");





                const rightSidebar = $("<div></div>");
                rightSidebar.addClass("right-side-bar");


                /*  const gameAreaCurrentUserInfoHeader = $("<div></div>");
                 gameAreaCurrentUserInfoHeader.addClass("current-user-info-header");
 
 
                 const gameAreaCurrentUserInfoContainer = $("<div></div>");
                 gameAreaCurrentUserInfoContainer.addClass("current-user-info-container");
 
 
                 const gameAreaCurrentUserNameContainer = $("<div></div>");
                 gameAreaCurrentUserNameContainer.addClass("current-user-info-name-container");
 
 
                 const gameAreaCurrentUserNameText = $("<div></div>");
                 gameAreaCurrentUserNameText.addClass("current-user-info-name-text");
 
 
                 const gameAreaCurrentUserName = $("<div></div>");
                 gameAreaCurrentUserName.addClass("current-user-info-name");
 
 
 
                 const gameAreaCurrentUserNumOfMovementContainer = $("<div></div>");
                 gameAreaCurrentUserNumOfMovementContainer.addClass("current-user-info-num-of-movement-container");
 
                 const gameAreaCurrentUserNumOfMovementText = $("<div></div>");
                 gameAreaCurrentUserNumOfMovementText.addClass("current-user-info-num-of-movement-text");
 
 
                 const gameAreaCurrentUserNumOfMovement = $("<div></div>");
                 gameAreaCurrentUserNumOfMovement.addClass("current-user-info-num-of-movement"); */


                const shuffleIcon = $("<i></i>");
                shuffleIcon.addClass("fa-solid fa-shuffle");



                //Oyun alanı div'inin oluşturulması
                const gameArea = $("<div></div>");
                gameArea.addClass("game-area");
                gameArea.addClass("game-mode-zero");



                //Karıştır butonunun oluşturulması
                const shuffleButton = $("<button></button>");
                shuffleButton.text("Karıştır");
                shuffleButton.addClass("game-button game-button-shuffle");

                shuffleButton.append(shuffleIcon);


                const wrapper = $(".wrapper");

                $(".welcome-section").fadeOut();



                //16 parçaya kırpma esnasında for döngüsünün bitişini yakalamak için promise nesnesi oluşturulması
                let promise = new Promise(resolve => {

                    //16 parça için 16 tur
                    for (let i = 0; i <= 15; i++) {


                        //Kırpılmış görsel container'ının oluşturulması
                        const croppedImageContainer = $("<div></div>");
                        croppedImageContainer.addClass("cropped-image-container");


                        //16'da 1 parçanın atanacağı img etiketi
                        //Bu element aynı zamanda oyun alanına yerleştirilecek nihai görseller
                        let croppedImage16 = document.createElement("img");

                        croppedImage16.classList.add("cropped-image");


                        //Kırpmanın asıl gerçekleştirildiği canvas elemanının oluşturulması
                        let canvas = document.createElement("canvas");

                        canvas.width = croppedImage.naturalWidth;
                        canvas.height = croppedImage.naturalHeight;

                        let context = canvas.getContext("2d");


                        //Canvas'ın contex'i kullanılarak 16'da 1 parçanın kırpılarak elde edilmesi
                        context.drawImage(croppedImage, sx, sy, increaseDensity, increaseDensity, 0, 0, canvas.width, canvas.height);

                        croppedImage16.src = canvas.toDataURL("image/jpeg");


                        //Kırpılan her görsel yüklendiğinde
                        croppedImage16.addEventListener("load", () => {

                            console.log(croppedImage16);

                            //Kırpılan görselin oyun alanına basılması

                            croppedImageContainer.append(croppedImage16);

                            gameArea.append(croppedImageContainer);

                            if (i == 15) {
                                //Promise sonu
                                resolve("Kırpılma işlemi bitti");
                            }

                        })




                        sx += increaseDensity;


                        if (sx == croppedImage.naturalWidth) {

                            sx = 0;
                            sy += increaseDensity;
                        }



                    }//16 parça için 16 tur



                })//16 parçaya kırpma esnasında for döngüsünün bitişini yakalamak için promise nesnesi oluşturulması


                //16 parça kırpılma işlemi bittikten sonra, elemanların görsel arayüze basılması
                promise.then(data => {
                    console.log(data);

                    cropBtn.off("click");
                    croppedImage.removeEventListener("load", () => { });


                    cropperModal.hide();


                    gameIsStartingInfo.hide();


                    gameSection.hide();


                    leftSideBarContainer.hide();

                    leftSidebar0.hide();
                    leftSidebar1.hide();

                    rightSidebar.hide();

                    rightSidebar.append(currentUserInfoContainer);

                    /* shuffleButton.hide(); */

                    shuffleButton.addClass("disabled-button");

                    gameAreaContainer.append(gameArea);

                    leftSidebar0.append(shuffleButton);

                    leftSideBarContainer.append(leftSidebar0, leftSidebar1);

                    gameSection.append(leftSideBarContainer);

                    gameSection.append(gameAreaContainer);

                    gameSection.append(rightSidebar);


                    wrapper.append(gameIsStartingInfo);
                    wrapper.append(gameSection);




                    $(".cropped-image-container").each(function () {

                        $(this).hide();

                    });

                    let i = 400;


                    gameIsStartingInfo.fadeIn(() => {

                        $(".wrapper .header").hide();


                        gameIsStartingInfoText.delay(1800).fadeOut(() => {
                            gameIsStartingInfo.delay(600).fadeOut(() => {
                            });
                        });

                        gameSection.delay(3800).fadeIn(() => {



                            leftSideBarContainer.fadeIn(() => {

                            });

                            leftSidebar0.fadeIn();

                            rightSidebar.fadeIn();



                            $(".cropped-image-container").each(function () {

                                i += 200;
                                $(this).delay(i).fadeIn();

                            });


                            setTimeout(() => {
                                let i = 400;
                                $(".cropped-image").each(function (index) {

                                    i += 200;
                                    let image = $(this);
                                    setTimeout(function () {
                                        image.addClass("gray-filter-on");

                                        if (index == 15) {

                                            shuffleButton.removeClass("disabled-button");

                                        }

                                    }, i);


                                });

                            }, 3400);



                            //Kırpılan her görsele uygulanacak eventin atanması
                            croppedImagesEvents();

                            //Karıştır butonuna tıklanma eventi atanması
                            $(".game-button-shuffle").click(() => {

                                shuffleCroppedImages();

                            });



                        });

                    });









                })//16 parça kırpılma işlemi bittikten sonra, elemanların görsel arayüze basılması




            })//Kırpılan görsel yüklenmesi, sonrasında 16 parçaya kırpılma işlemi



        });
        //Kırpma butonuna tıklanması, kırpma işlemlerinin gerçekleşmesi

    }



    //Düğüm class'ının oluşturulması
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }

    //Tek yönlü bağlı liste class'ının ve metodlarının oluşturulması
    class LinkedList {

        //Yapıcı metod
        constructor() {
            this.header = this.tail = null;
            this.size = 0;
        }


        //Yazdırma metodu
        printList() {
            let data = "";
            let current = this.header;


            while (current != null) {

                data = data + current.data + " ";
                current = current.next;

            }

            return data;
        }


        //Başa data ekleme metodu
        prependData(data) {

            const n = new Node(data);

            if (this.header == null) {
                this.header = this.tail = n;

            } else {
                n.next = this.header;
                this.header = n;

            }

            this.size++;

        }


        //Başa düğüm ekleme metodu
        prependNode(node) {

            const n = node;

            if (this.header == null) {
                this.header = this.tail = n;

            } else {
                n.next = this.header;
                this.header = n;

            }

            this.size++;

        }


        //Sona data ekleme metodu
        appendData(data) {
            const n = new Node(data);

            if (this.tail == null) {
                this.header = this.tail = n;
            } else {
                const oldTail = this.tail;
                this.tail = n;
                oldTail.next = this.tail;

            }

            this.size++;


        }


        //Sona düğüm ekleme metodu
        appendNode(node) {
            const n = node;

            if (this.tail == null) {
                this.header = this.tail = n;
            } else {

                const oldTail = this.tail;
                this.tail = n;
                oldTail.next = this.tail;

            }

            this.size++;


        }






        //Baştan çıkarma metodu
        removeFirst() {

            let oldNode;

            if (this.header == null) {
                return null;
            } else if (this.header.next == null) {
                oldNode = this.header;

                this.header = this.tail = null;

                return oldNode;

            } else {
                oldNode = this.header;

                // oldNode.next = null; olursa referans tipi olduğu için aradaki bağlantı kesiliyor.

                this.header = this.header.next;//Buradaki bağlantı null oluyor.

                oldNode.next = null;//O yüzden bu kod bu satırda yer almalı, yukarda değil.


            }


            this.size--;

            return oldNode;

        }




        //Sondan çıkarma metodu
        removeLast() {

            let oldNode;


            if (this.tail == null) {

                return null;

            } else if (this.header.next == null) {

                oldNode = this.header;

                this.header = this.tail = null;

                return oldNode;
            } else {

                oldNode = this.tail;

                let current = this.header;

                while (current.next.next != null) {
                    current = current.next;
                }

                current.next = null;

                this.tail = current;


            }

            this.size--;
            return oldNode;


        }



        //Araya data ekleme metodu
        insertDataAt(pos, data) {

            if (pos < 0 || pos > this.size) {
                return;
            } else if (pos === 0) {
                this.prependData(data);
            } else if (pos === this.size) {
                this.appendData(data);
            } else {
                const n = new Node(data);
                let prev = null;
                let current = this.header;
                let counter = 0;

                while (counter < pos) {

                    prev = current;
                    current = current.next;
                    counter++;
                }

                n.next = current;
                prev.next = n;

                this.size++;

            }


        }


        //Araya düğüm ekleme metodu
        insertNodeAt(pos, node) {


            if (pos < 0 || pos > this.size) {
                return;
            } else if (pos === 0) {
                this.prependNode(node);
            } else if (pos === this.size) {

                this.appendNode(node);
            } else {
                const n = node;
                let prev = null;
                let current = this.header;
                let counter = 0;

                while (counter < pos) {

                    prev = current;
                    current = current.next;
                    counter++;
                }

                n.next = current;
                prev.next = n;

                this.size++;

            }


        }


        //Aradan çıkarma metodu
        removeAt(pos) {

            let oldNode;

            if (pos < 0 || pos >= this.size) {

                return;
            } else if (pos === 0) {

                return this.removeFirst();

            } else if (pos === (this.size - 1)) {

                return this.removeLast();
            } else {

                let prev = null;
                let current = this.header;
                let counter = 0;

                while (counter < pos) {
                    prev = current;
                    current = current.next;
                    counter++;
                }

                oldNode = current;

                prev.next = current.next;

                oldNode.next = null;
                this.size--;

            }

            return oldNode;

        }


        //Düğümlerin yer değiştirilme metodu
        replace(data0, data1) {

            //let current = this.header;
            let pos0, pos1;

            pos0 = this.dataToPosition(data0);
            pos1 = this.dataToPosition(data1);



            let node0 = this.removeAt(pos0);

            let node1;


            this.insertNodeAt(pos1, node0);


            if (pos0 > pos1) {

                node1 = this.removeAt(pos1 + 1);

            } else if (pos1 > pos0) {

                node1 = this.removeAt(pos1 - 1);
            }

            this.insertNodeAt(pos0, node1);


            console.log("Listede yer değiştirecek 0. pozisyon: " + pos0);
            console.log("Listede yer değiştirecek 1. pozisyon: " + pos1);

            console.log("Bağlı Liste Yer Değiştirildi Yeni Liste:\n" + this.printList());




        }



        //Argüman olarak verilen düğüm verisinin hangi pozisyonda/index'te/konumda olduğunu bulan metod
        dataToPosition(data) {

            let current = this.header;
            let position = 0;
            let counter = 0;

            while (current != null) {

                if (current.data == data) {
                    position = counter;
                }

                current = current.next;
                counter++;
            }


            return position;

        }


        //Argüman olarak verilen düğüm verisinin doğru pozisyonda olup olmadığının kontrolünü yapan metod
        isPositionCorrect(data) {

            if (data == this.dataToPosition(data)) {
                return true;
            } else {
                return false;
            }

        }





    }//Tek yönlü bağlı liste class'ının ve metodlarının oluşturulması


    //Listenin oluşturulması
    let list = new LinkedList();

    //16 düğümün eklenmesi
    for (let i = 0; i <= 15; i++) {
        list.appendData(i);
    }

    console.log("\nBaşlangıç Bağlı Liste:\n" + list.printList());




    //Kırpılan 16 görsele uygulanacak işlemler fonksiyonu
    function croppedImagesEvents() {

        console.log("Kırpılan Görseller Olay Fonksiyonu Çalıştı.\n Kırpılan Görsel Sayısı:");
        console.log($(".cropped-image").length);


        let clickCount = 0, data0 = 0, data1 = 0;

        let pos0 = 0, pos1 = 0;


        //Kırpılan görsellere tıklandığında
        $(".cropped-image-container").click(function () {

            //Tıklanan görselin datasını alma
            let clickedImageData = $(this).index();

            clickCount++;

            //Görsellere kaç kez tıklanıldığına göre işlemler
            switch (clickCount) {

                //İlk görsele tıklanılması
                case 1:

                    data0 = clickedImageData;


                    $(".cropped-image-container").eq(data0).removeClass("position-false");

                    $(".cropped-image-container").eq(data0).addClass("selected");

                    console.log("\n1. görsele tıklandı:");
                    console.log("data0:" + data0);
                    console.log("data1:" + data1);
                    break;

                //İkinci görsele tıklanılması
                case 2: if (clickedImageData != data0) {

                    data1 = clickedImageData;

                    $(".game-area-container").removeClass("position-correct");
                    $(".game-area-container").removeClass("position-false");

                    $(".cropped-image-container").eq(data1).removeClass("position-false");

                    $(".cropped-image-container").eq(data1).addClass("selected");

                    console.log("\n2. görsele tıklandı:");
                    console.log("data0:" + data0);
                    console.log("data1:" + data1);

                    //İki tıklanan görsel için yer değiştirme fonksiyonunun çağrılması



                    setTimeout(() => {
                        replaceCroppedImages(data0, data1);

                        //Tıklamayı yakalayan değişkenlerin sıradaki ikili tıklama için başlangıç değerlerine döndürülmesi
                        clickCount = data0 = data1 = 0;


                    }, 1000);


                    break;

                    //İki kez aynı görsele tıklanılması
                } else {
                    console.log("\ncase 2.2 aynı elemana tıklandı");

                    $(".cropped-image-container").eq(data0).removeClass("selected");

                    clickCount = data0 = data1 = 0;
                    break;

                }

                default:/*  clickCount = data0 = data1 = 0; */
                    break;
            }





        })



    }//Kırpılan 16 görsele uygulanacak işlemler fonksiyonu



    //Kırpılan görsellere hareket animasyonunu sağlacak class isminin üretilmesi fonksiyonu
    function createAnimationClassName(data) {

        switch (data) {
            case 0: return "zero";
            case 1: return "one";
            case 2: return "two";
            case 3: return "three";
            case 4: return "four";
            case 5: return "five";
            case 6: return "six";
            case 7: return "seven";
            case 8: return "eight";
            case 9: return "nine";
            case 10: return "ten";
            case 11: return "eleven";
            case 12: return "twelve";
            case 13: return "thirteen";
            case 14: return "fourteen";
            case 15: return "fifteen";

        }
    }//Kırpılan görsellere hareket animasyonunu sağlacak class isminin üretilmesi fonksiyonu



    //Hamle sayısı ile puan global değişkenleri
    let gameNumberOfMoves = 0;
    let gamePoint = 0;


    //Tıklanan kırpılmış görsellerin yer değiştirilmesi işlemleri fonksiyonu
    function replaceCroppedImages(data0, data1) {


        document.querySelectorAll(".cropped-image-container .cropped-image")[data0].classList.add("gray-filter-on");
        document.querySelectorAll(".cropped-image-container .cropped-image")[data1].classList.add("gray-filter-on");

        //Yer değişikliği yapılacak data'lara karşılık gelen düğümlerin pozisyonlarının bulunması
        pos0 = list.dataToPosition(data0);
        pos1 = list.dataToPosition(data1);

        console.log("\ngörsellerin pozisyonları:");
        console.log("pos0:" + pos0);
        console.log("pos1:" + pos1);

        //Bağlı listede yer değiştirilme işlemi
        list.replace(data0, data1);


        //Görsel arayüzde görsellerin yer değiştirme animasyonunu uygulayacak sınıf isimlerinin oluşturulması
        let pos0AnimationClassName = createAnimationClassName(data0) + "-" + "to" + "-" + createAnimationClassName(pos1);
        let pos1AnimationClassName = createAnimationClassName(data1) + "-" + "to" + "-" + createAnimationClassName(pos0);


        console.log("0.görsel varolan animasyon class'ı:" + document.querySelectorAll(".cropped-image-container")[data0].classList[1]);
        console.log("1.görsel varolan animasyon class'ı:" + document.querySelectorAll(".cropped-image-container")[data1].classList[1]);


        console.log("0.görsel yeni animasyon class'ı:" + pos0AnimationClassName);
        console.log("1.görsel yeni animasyon class'ı:" + pos1AnimationClassName);

        //let prevClassName0 = document.querySelectorAll(".cropped-image")[data0].classList[1];
        //let prevClassName1 = document.querySelectorAll(".cropped-image")[data1].classList[1];

        //$(".cropped-image").eq(data0).removeClass(prevClassName0);
        //$(".cropped-image").eq(data1).removeClass(prevClassName1);

        //Görsellerin sınıf isimlerinin önceki animasyon class'ından temizlenmesi
        /* document.querySelectorAll(".cropped-image")[data0].className = "cropped-image gray-filter-on";
        document.querySelectorAll(".cropped-image")[data1].className = "cropped-image gray-filter-on"; */


        if (document.querySelectorAll(".cropped-image-container")[data0].classList.contains("selected")) {

            document.querySelectorAll(".cropped-image-container")[data0].className = "cropped-image-container moving";
            document.querySelectorAll(".cropped-image-container")[data1].className = "cropped-image-container moving";


            setTimeout(() => {

                document.querySelectorAll(".cropped-image-container")[data0].classList.remove("moving");
                document.querySelectorAll(".cropped-image-container")[data1].classList.remove("moving");


            }, 1000);


        } else {

            document.querySelectorAll(".cropped-image-container")[data0].className = "cropped-image-container";
            document.querySelectorAll(".cropped-image-container")[data1].className = "cropped-image-container";

        }





        //Görsellere yeni animasyon class'larının verilmesi
        $(".cropped-image-container").eq(data0).addClass(pos0AnimationClassName);
        $(".cropped-image-container").eq(data1).addClass(pos1AnimationClassName);





        //Verilerin bağlı liste içerisinde doğru pozisyonda olup olmadıklarının bulunması
        let data0isPositionCorrect = list.isPositionCorrect(data0);
        let data1isPositionCorrect = list.isPositionCorrect(data1);


        //Oyun başladıktan sonra puan ve hamle sayısının her yer değiştirme sonrası güncellenmesi
        if (!$(".game-area").hasClass("game-mode-zero")) {



            $(".game-area-container").removeClass("position-correct");
            $(".game-area-container").removeClass("position-false");

            console.log("hamle sayısı arttırıldı");
            gameNumberOfMoves++;

            $(".left-side-bar .number-of-moves").text(gameNumberOfMoves);


            if (!data0isPositionCorrect && !data1isPositionCorrect) {

                console.log("yanlış hamle yapıldı");
                gamePoint = gamePoint - 10;

                if (gamePoint < 0) {
                    $(".left-side-bar .point").css({ "color": "red" });
                } else {
                    $(".left-side-bar .point").css({ "color": "#07d410" });
                }

                $(".left-side-bar .point").text(gamePoint);

            }


            if (!data0isPositionCorrect) {
                $(".cropped-image-container").eq(data0).addClass("position-false");

            }

            if (!data1isPositionCorrect) {
                $(".cropped-image-container").eq(data1).addClass("position-false");
            }



            if (data0isPositionCorrect || data1isPositionCorrect) {

                $(".game-area-container").addClass("position-correct");
            }
            else {


                $(".game-area-container").addClass("position-false");


            }







        }


        //İlk tıklanan görsel yer değiştirdikten sonra, verinin bulunduğu düğüm doğru pozisyonda ise
        if (data0isPositionCorrect) {


            croppedImagesPositionCorrectEvents(data0);

        }

        //İkinci tıklanan görsel yer değiştirdikten sonra, verinin bulunduğu düğüm doğru pozisyonda ise
        if (data1isPositionCorrect) {


            croppedImagesPositionCorrectEvents(data1);

        }






    }//Tıklanan kırpılmış görsellerin yer değiştirilmesi işlemleri fonksiyonu












    //Argüman olarak verilmiş dataya karşılık gelen düğüm doğru pozisyonda ise uygulanacak işlemler fonksiyonu
    function croppedImagesPositionCorrectEvents(data) {


        if (!$(".game-area").hasClass("game-mode-zero")) {



            console.log("doğru hamle yapıldı");
            gamePoint = gamePoint + 5;

            if (gamePoint < 0) {
                $(".left-side-bar .point").css({ "color": "red" });
            } else {
                $(".left-side-bar .point").css({ "color": "#07d410" });
            }

            $(".left-side-bar .point").text(gamePoint);

        }





        //Kırpılan görsele pozisyon-doğru class'ının verilmesi ile görselin kilitlenmesi

        $(".cropped-image").eq(data).removeClass("gray-filter-on");

        $(".cropped-image-container").eq(data).addClass("position-correct");

        $(".cropped-image-container").eq(data).removeClass("position-false");








        /*  $(".cropped-image").eq(data).addClass("gray-scale-off");*/

        //Pozisyonu doğru olan görsellerin sayısı 16 ise oyun sonunun tespiti
        if ($(".cropped-image-container.position-correct").length == 16) {

            console.log("\n******oyun bitti******");


            let gameOverImage = $("<img>");
            gameOverImage.addClass("game-over-image");





            const gameOverInfoContainer = $("<div></div>");

            gameOverInfoContainer.addClass("game-over-info-container");


            const gameOverInfoInnerContainer = $("<div></div>");
            gameOverInfoInnerContainer.addClass("game-over-info-inner-container");


            const gameOverInfo = $("<div></div>");
            gameOverInfo.addClass("game-over-info");


            const congratText = $("<div></div>");
            congratText.addClass("game-over-congrat-text");



            congratText.text(`Tebrikler oyunu bitirdiniz.`);





            const userNameContainer = $("<div></div>");
            userNameContainer.addClass("game-over-user-name-container");

            const userNameText = $("<div></div>");
            userNameText.addClass("game-over-user-name-text");

            const userName = $("<div></div>");
            userName.addClass("game-over-user-name");

            let username = JSON.parse(localStorage.getItem("userinfo")).username;

            userName.text(username);

            userNameText.text("Kullanıcı Adınız: ");

            userNameContainer.append(userNameText, userName);



            const gameOverPointContainer = $("<div></div>");
            gameOverPointContainer.addClass("game-over-point-container");


            const gameOverPointText = $("<div></div>");
            gameOverPointText.addClass("game-over-point-text");



            const gameOverPoint = $("<div></div>");
            gameOverPoint.addClass("game-over-point");


            let point = $(".game-section .left-side-bar .point").text();

            gameOverPoint.text(point);

            gameOverPointText.text("Puan: ");

            gameOverPointContainer.append(gameOverPointText, gameOverPoint);






            const gameOverNumberOfMovesContainer = $("<div></div>");
            gameOverNumberOfMovesContainer.addClass("game-over-number-of-moves-container");

            const gameOverNumberOfMovesText = $("<div></div>");
            gameOverNumberOfMovesText.addClass("game-over-number-of-moves-text");

            const gameOverNumberOfMoves = $("<div></div>");
            gameOverNumberOfMoves.addClass("game-over-number-of-moves");

            let numberofmoves = $(".game-section .left-side-bar .number-of-moves").text();

            gameOverNumberOfMoves.text(numberofmoves);

            gameOverNumberOfMovesText.text("Hamle Sayısı: ");

            gameOverNumberOfMovesContainer.append(gameOverNumberOfMovesText, gameOverNumberOfMoves);




            gameOverInfoContainer.hide();
            gameOverImage.hide();



            gameOverInfoInnerContainer.append(gameOverImage, gameOverInfo);


            gameOverInfoContainer.append(gameOverInfoInnerContainer);

            $(".wrapper").append(gameOverInfoContainer);

            gameOverInfoContainer.delay(3000).fadeIn();

            gameOverInfoInnerContainer.delay(3000).fadeIn();

            gameOverImage.attr("src", croppedImage.src);

            gameOverImage.on("load", () => {

                gameOverImage.delay(3000).fadeIn();

            })


            const replayButton = $("<div></div>");
            replayButton.addClass("game-button");
            replayButton.text("Tekrar Oyna");
            replayButton.css({ "text-align": "center" });


            replayButton.click(() => {
                location.reload();
            });

            gameOverInfo.append(congratText, userNameContainer, gameOverNumberOfMovesContainer, gameOverPointContainer, replayButton);

            gameOverInfo.delay(3000).fadeIn();



            let userinfo = { UserName: username, NumberOfMoves: numberofmoves, Point: point };




            $.ajax({
                method: "POST",
                url: "/square_puzzle_game",
                contentType: "application/json",
                data: JSON.stringify(userinfo)

            }).done((res) => {

                console.log(res.response);

                if (res.response == "Tebrikler yeni en yüksek puan") {

                    gameOverPointText.text("Yeni En Yüksek Puan! : ");
                }
                else if (res.response == "Tebrikler ilk kayıtlı puan") {
                    gameOverPointText.text("Tebrikler ilk kayıtlı puan ! :");
                }
                else if (res.response == "error") {
                    console.log("Yazdırma işleminde hata");
                    console.log(res.error);
                }



            });












        }




    }//Argüman olarak verilmiş dataya karşılık gelen düğüm doğru pozisyonda ise uygulanacak işlemler fonksiyonu



    //Oyun başladıktan sonra hamle sayısı ile puanı gösterecek elementlerin oluşturulup basılması fonksiyonu
    function numberOfMoves_pointElementsCreate() {

        const numberOfMoves = $("<div></div>");
        const numberOfMovesContainer = $("<div></div>");
        const numberOfMovesText = $("<div></div>");


        numberOfMoves.text(gameNumberOfMoves);
        numberOfMovesText.text("Hamle Sayısı: ");


        numberOfMovesContainer.addClass("number-of-moves-container");
        numberOfMoves.addClass("number-of-moves");
        numberOfMovesText.addClass("number-of-moves-text");



        numberOfMovesContainer.append(numberOfMovesText, numberOfMoves);




        const pointContainer = $("<div></div>");
        const pointText = $("<div></div>");
        const point = $("<div></div>");

        pointText.addClass("point-text");
        point.addClass("point");
        pointContainer.addClass("point-container");


        point.text(gamePoint);
        pointText.text("Puan: ");

        pointContainer.append(pointText, point);



        const movesAndPointContainer = $("<div></div>");
        movesAndPointContainer.addClass("moves-point-container");

        movesAndPointContainer.append(numberOfMovesContainer, pointContainer);

        movesAndPointContainer.hide();

        let leftSidebar1 = $(".game-section .left-side-bar:nth-child(2)");

        leftSidebar1.append(movesAndPointContainer);

        leftSidebar1.fadeIn();

        movesAndPointContainer.fadeIn();

    }//Oyun başladıktan sonra hamle sayısı ile puanı gösterecek elementlerin oluşturulup basılması fonksiyonu



    //Kırpılmış 16 görselin oyun başlamadan önce karıştırma işlemini yapan algoritma fonksiyonu
    function shuffleCroppedImages() {

        const list = [];

        for (let i = 0; i <= 15; i++) {
            list.push(i);
        }

        shuffleArray(list);
        console.log(list);

        let promise = new Promise(resolve => {
            list.forEach((data, index) => {

                let fromData = data;
                let toData = 0;
                let positionCorrectIndexes = [];


                $(".cropped-image-container.position-correct").each(function () {

                    console.log("Pozisyon doğru olan eleman shuffle döngüsü içinde indexi: " + $(this).index());
                    positionCorrectIndexes.push($(this).index());

                });

                do {

                    toData = getRndInteger(0, 16);

                } while (fromData == toData || positionCorrectIndexes.includes(toData));


                console.log("from data:" + fromData + " " + "to data:" + toData);

                replaceCroppedImages(fromData, toData);


                if (index == 15) {
                    resolve();
                }




            });
        })


        promise.then(() => {

            if ($(".cropped-image-container.position-correct").length > 0) {

                //alert("oyun başladı");

                $(".game-area").hasClass("game-mode-zero") ? $(".game-area").removeClass("game-mode-zero") : "";


                gamePoint = $(".cropped-image-container.position-correct").length * 5;
                $(".left-side-bar .point").text(gamePoint);

                $(".game-button-shuffle").hasClass("disabled-button") ? "" : $(".game-button-shuffle").addClass("disabled-button");

                numberOfMoves_pointElementsCreate();


            }
        });





    }//Kırpılmış 16 görselin oyun başlamadan önce karıştırma işlemini yapan algoritma fonksiyonu


    //Bir dizinin elemanlarının karıştırılmasını gerçekleştiren fonksiyon
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    //Min dahil Max dahil olmayacak şekilde rastgele sayı döndüren fonksiyon
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }




})//Sayfa hazır olduğunda çalışacak olaylar