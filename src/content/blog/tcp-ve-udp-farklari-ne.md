---
title: "TCP ve UDP: Farkları ne?"
description: "TCP ve UDP arasındaki temel farkları, günlük hayattan bir sohbet benzetmesiyle sade bir dille anlatıyorum."
pubDate: 2026-11-17
tags: ["Ağ", "Protokoller"]
---

İki bilgisayar birbiriyle konuştuğunda, önce verinin nasıl taşınacağına karar verirler. Bu kararın en bilinen iki adayı TCP ve UDP. İkisi de aynı ağ üzerinden veri gönderir, ama işi yapma biçimleri birbirinden oldukça farklı.

Bu yazıda TCP'nin ve UDP'nin ne olduğunu, nerede kullanıldığını ve aralarındaki farkları anlatacağım. Network'e yeni başlayan biri için yazdım; gereksiz detaya girmeden ilerleyeceğim.

## Sohbet ayarında bir benzetme

Bir odada iki kişi konuştuğunuzu düşünün.

Birinci durumda karşınızdakiyle telefonla konuşuyorsunuz. Söylediğiniz her cümlenin karşı tarafa ulaştığını duyuyorsunuz. Anlaşılmadıysa tekrar ediyorsunuz. Cümleler sırayla gidiyor, arada bir şey kaybolmuyor. Karşı taraf "bekle, yetişemiyorum" derse yavaşlıyorsunuz.

İkinci durumda ise kalabalık bir koridorda karşı tarafa sesleniyorsunuz. Bağırıyorsunuz ve devam ediyorsunuz. Sesiniz ulaştı mı, ulaşmadı mı bilmiyorsunuz. Bazen bir kelime kayboluyor, bazen sıra karışıyor. Ama bekleyip onay almadığınız için iş çok daha hızlı ilerliyor.

TCP birinci duruma, UDP ikinci duruma benziyor. Bu benzetme her detayı açıklamıyor ama temel farkı anlatmak için işe yarıyor.

## TCP nedir?

TCP (Transmission Control Protocol), veriyi güvenilir bir şekilde taşımayı amaçlayan bir protokol. Veri göndermeye başlamadan önce iki taraf arasında bir bağlantı kurulur. Buna el sıkışma, yani three-way handshake denir.

Bu el sıkışmada taraflar karşılıklı olarak "ben buradayım, seni duyuyorum" mesajları gönderir. Bağlantı kurulduktan sonra veri akmaya başlar. Gelen her parça onaylanır. Bir parça kaybolursa tekrar gönderilir. Parçalar numaralandırıldığı için karşı taraf onları doğru sıraya koyabilir.

TCP'nin bir de akış kontrolü ve tıkanıklık kontrolü tarafı var. Karşı taraf veriyi işlemekte zorlanıyorsa TCP yavaşlar. Ağ tıkanıyorsa gönderim hızını düşürür. Yani TCP sadece taşımıyor, aynı zamanda trafiği yönetiyor.

Bütün bu güvenilirliğin bir bedeli var: gecikme. El sıkışma için ek tur gerekir, onaylar için ek trafik oluşur, TCP başlığı UDP'ye göre daha büyüktür. Veri kaybının kabul edilemediği yerlerde bu bedel ödenmeye değer.

TCP'yi günlük hayatta en çok web trafiğinde görürsünüz. HTTP/1.1 ve HTTP/2 TCP üzerinden çalışır. SSH, e-posta protokolleri (SMTP, IMAP) ve klasik dosya transferi de TCP tarafındadır.

## UDP nedir?

UDP (User Datagram Protocol), veriyi olduğu gibi gönderen bir protokol. Bağlantı kurmak için el sıkışma yok. Paket gönderilir ve gerisi uygulamaya bırakılır.

UDP'de paket kaybolabilir, sıra değişebilir, aynı paket iki kez gelebilir. Protokol bunları düzeltmeye çalışmaz. "Elimden geleni yaptım" der ve çekilir. Bu yüzden UDP başlığı küçüktür ve ek gecikme getirmez.

Bu özellik kulağa kötü gelebilir. Ama her uygulama kayıp paketi dert etmez. Canlı bir görüntülü konuşmada eski bir paketin sonradan gelmesi işe yaramaz; o an konuşulan cümle çoktan geçmiştir. Bir oyunda eski bir konum bilgisinin sonradan gelmesi de oyuncuya yardımcı olmaz. Bu durumlarda hız, güvenilirlikten daha değerli.

UDP'yi DNS, DHCP, NTP gibi altyapı protokollerinde sık görürsünüz. Sesli/görüntülü aramalar, canlı yayınlar ve çevrimiçi oyunlar da genelde UDP kullanır. QUIC de UDP üzerine kurulmuştur; HTTP/3 bu sayede TCP'nin bazı sınırlarından kurtulmayı hedefler.

## Farkları

Aşağıdaki tablo temel farkları tek yerde topluyor.

| Konu | TCP | UDP |
| --- | --- | --- |
| Bağlantı | Veri öncesi bağlantı kurulur | Bağlantı kurulmaz |
| Güvenilirlik | Kayıp paket tekrar gönderilir | Teslim garantisi yok |
| Sıra | Paketler sıraya konur | Sıra garantisi yok |
| Gecikme | Onaylar ve el sıkışma ekler | Daha düşük |
| Başlık boyutu | Daha büyük | Daha küçük |
| Trafik kontrolü | Akış ve tıkanıklık kontrolü var | Protokol seviyesinde yok |
| Tipik kullanım | Web, SSH, e-posta, dosya | DNS, ses/video, oyun, QUIC |

### El sıkışma ve gecikme

TCP, veri göndermeden önce bağlantı kurar. Bu bir tur gidiş-dönüş demektir. Kısa isteklerde bu fark hissedilir. UDP'de böyle bir bekleme yok; ilk paket hemen yola çıkar.

### Güvenilirlik kimin işi?

TCP'de güvenilirlik protokolün işi. UDP'de ise uygulamanın işi. UDP üzerinde çalışan bir uygulama kayıp paketleri önemsemeyebilir, kendi tekrar mekanizmasını kurabilir ya da hiç uğraşmayabilir. Bu esneklik UDP'nin en güçlü tarafı.

### Başlık boyutu ve yük

Her paketin bir başlığı vardır. TCP başlığı UDP başlığına göre daha fazla alan taşır. Tek bir küçük mesaj için bu fark önemsiz görünebilir. Ama saniyede binlerce küçük paket gönderen bir uygulamada toplam yük artar.

### Portlar ortak mı?

TCP ve UDP aynı port numaralarını kullanabilir, çünkü port alanları ayrıdır. Örneğin 53 portu hem UDP hem TCP tarafında DNS için tanımlıdır. DNS çoğunlukla UDP ile çalışır; yanıt büyüdüğünde veya zone transfer gibi işlerde TCP devreye girer.

## Hangi durumda hangisi?

Seçim yaparken tek bir soru sormak çoğu zaman yeterli: Kayıp veri benim için sorun mu?

Cevap "evet" ise TCP mantıklı. Bankacılık işlemi, dosya indirme, e-posta gönderimi, veritabanı bağlantısı gibi işlerde bir baytın kaybolması ciddi sonuç doğurur.

Cevap "hayır, gecikme daha önemli" ise UDP öne çıkar. Canlı yayın, sesli arama, oyun ve anlık konum paylaşımı buna örnek.

Bir de üçüncü yol var: UDP üzerine kendi güvenilirliğini kuran protokoller. QUIC bunun en bilinen örneği. Uygulama, ihtiyaç duyduğu garantiyi kendisi veriyor; böylece TCP'nin genel çözümünün getirdiği bazı gecikmelerden kaçınıyor.

## Özet

- TCP bağlantı kurar, teslimi onaylar, sırayı korur ve kayıpları telafi eder. Karşılığında gecikme ve ek trafik getirir.
- UDP bağlantı kurmaz, teslim garantisi vermez, daha az yük ve daha düşük gecikme sunar.
- Güvenilirlik gerekiyorsa TCP; hız ve anlık tepki gerekiyorsa UDP.
- UDP, güvenilirliği tamamen bırakmış değil; onu uygulamaya devrediyor.

Bu yazı bir başlangıç. TCP'nin el sıkışmasını, tıkanıklık kontrolünü veya QUIC'in nasıl çalıştığını ayrı yazılarda daha detaylı anlatabilirim.

Okuduğunuz için teşekkür ederim. Aklınıza takılan bir nokta olursa yazmaktan çekinmeyin.
