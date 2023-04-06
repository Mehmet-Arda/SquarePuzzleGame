# Kare Bulmaca Oyunu
## Açıklama

Bu proje, 4x4 16 görsel ile oluşturulan, başlangıçta karıştırma işlemi yapılarak devamında parçaların doğru yere eşleştirilmesine dayanan bir kare bulmaca oyunudur.

Kullanıcıdan başlangıçta dosya ya da url ile bir görsel alınarak, önce kullanıcının görseli isteğe göre kare şeklinde kırpması sağlanmakta, sonrasında kırpılan görsel 16 parçaya bölünerek oyun başlatılmaktadır.

Proje, temelinde sunucu tarafında NodeJS, ön yüz tarafında ise Vanilla Javascript ile JQuery teknolojilerine dayanmaktadır.




## Çekirdek Teknolojiler

- [NodeJS](https://nodejs.org/en)

- [Javascript-ES6](http://es6-features.org/#Constants)

- [Node Package Manager-NPM](https://www.npmjs.com/)

## Gerekli Kütüphaneler

- [JQuery](https://jquery.com/)

- [Bootstrap](https://getbootstrap.com/)

- [SASS](https://sass-lang.com/)

- [Font Awesome](https://fontawesome.com/)

- [Google Fonts](https://fonts.google.com/)

- [CropperJS](https://github.com/fengyuanchen/cropperjs)

- [ExpressJS](https://expressjs.com/)

- [Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html)

- [CORS](https://expressjs.com/en/resources/middleware/cors.html)


## Yayınlama

- [Cyclic Cloud Platform](https://www.cyclic.sh/)

- [Square Puzzle Game](https://nice-red-rooster-tutu.cyclic.app/square_puzzle_game)


## Geliştirme

- [Visual Studio Code](https://code.visualstudio.com/)

## Uygulama Özellikleri/Kullanımı

1. **Kullanıcı Adı Girme**

Uygulama ilk açıldığında, öncelikle kullanıcı adı girilmektedir.
İsteğe bağlı "beni hatırla" seçeneği işaretlenerek, sonraki girişte kullanıcı adı girme kısmı atlanarak önceki kayıtlı kullanıcı adıyla
bir sonraki işleme geçilmektedir.

![Kullanıcı Adı Girme](https://user-images.githubusercontent.com/56768017/230287707-40ea0b73-a821-41f5-8242-aa5cbafc4e95.png)


2. **Görsel Yükleme**

Kullanıcı adından sonra, oyun için bir görsel seçilmektedir. Bu görsel, dosya ya da url olarak girilebilmektedir.

![Görsel Yükleme](https://user-images.githubusercontent.com/56768017/230288520-5fef1d09-4f67-437c-9b37-57319cef88f0.png)

![Görsel Yükleme](https://user-images.githubusercontent.com/56768017/230289964-5e861713-b7d8-4f6d-a30a-be8a0f08d6a2.png)

![Görsel Yükleme](https://user-images.githubusercontent.com/56768017/230289995-797ebb8b-a84e-409f-8584-8a65ee73b4b1.png)


3. **Yüklenen Görselin Kırpılması**

Kullanıcının yüklediği görselin istenilen yeri kare şeklinde kırpılmaktadır.




![Görsel Yükleme](https://user-images.githubusercontent.com/56768017/230290009-3e8db443-5100-4a14-8cdb-3c3275ae5901.png)




4. **Oyun Alanına Geçiş**

Görsel yüklendikten sonra, yüklenen görsel 16 parçaya bölünmekte ve oyun alanına geçilmektedir.

![Oyun Alanına Geçiş](https://user-images.githubusercontent.com/56768017/230291700-3c9a68d1-ae38-4106-98e4-ce59f15660ca.png)


5. **Oyunun Başlaması**

Oyunun başlayabilmesi için, arayüzde bulunan karıştır butonuna basılarak görseller rastgele karıştırılmaktadır.
En az bir parça doğru yere geldiğinde oyun başlamakta ve karıştırma butonu kilitlenmektedir. 

![Oyunun Başlaması](https://user-images.githubusercontent.com/56768017/230291169-57596531-e12c-48b7-92db-bca8609415ff.png)

![Oyunun Başlaması](https://user-images.githubusercontent.com/56768017/230291186-ace108d1-0b71-400b-a8c1-1ce2d9ff725a.png)


4. **Oyunun Sonu**

Oyundaki tüm görseller doğru yere eşleştirildiğinde oyun sonlandırılmakta, kullanıcının bilgileri ilgili metin belgesine kaydedilmektedir.

![Oyunun Sonu](https://user-images.githubusercontent.com/56768017/230293016-45bc92b3-3b98-4358-9dfb-a22720d0f3d0.png)

![Oyunun Sonu](https://user-images.githubusercontent.com/56768017/230293036-818a8d0b-d15f-4fc6-99d2-c75debf76df6.png)











