# Proje: Kişisel Blog

## 1. Proje özeti
- Statik kişisel blog. Sahibi: [ADIN]. Site dili: Türkçe.
- Teknoloji: Astro + Markdown. Backend, veritabanı ve sunucu tarafı kod YOK.
- Amaç: hızlı, sade, mobil uyumlu, kolay yazı eklenen bir blog.
- Yeni paket/bağımlılık eklemeden önce bana sor ve nedenini açıkla.

## 2. Komutlar
- Geliştirme sunucusunu ARKA PLANDA başlat (terminali kilitlemesin):
  `npm run dev -- --background --host`
  (Bu çalışmazsa: `npx astro dev --background --host`)
- Yönetim: `npx astro dev status`, `npx astro dev logs`, `npx astro dev stop`
- Sunucu http://localhost:4321 adresinde çalışır; ağdan `http://<VM-IP>:4321`.
- Zaten çalışan bir sunucu varsa yenisini başlatma, önce `status` kontrol et.
- Görev bitince sunucuyu durdurma, açık bırak (ben tarayıcıdan bakıyorum).
- Derleme kontrolü: `npm run build`
- Derleme önizleme: `npm run preview -- --host`

## 3. Klasör haritası
- `src/content/blog/`  → blog yazıları (.md / .mdx)
- `src/pages/`         → sayfalar
- `src/components/`    → bileşenler
- `src/layouts/`       → sayfa düzenleri
- `src/styles/` veya global CSS → stiller
- `src/consts.ts`      → site başlığı, açıklaması, sosyal linkler (TEK kaynak)
- `public/`            → sabit dosyalar (favicon, resimler)
- `docs/`              → planlar ve ham notlar. YAYINLANMAZ, siteye dahil edilmez.
- `docs/benim-bilgilerim.md` → sahibinin ham notları (içerik için ana kaynak)
- `docs/ornek-yazim.md`      → yazım üslubu örneği

## 4. İçerik kuralları
- Yazı eklerken ÖNCE `src/content.config.ts` (veya `src/content/config.ts`) dosyasındaki şemayı oku; front matter bu şemaya birebir uymalı. Şemada olmayan alan ekleme, gerekiyorsa öner.
- Dosya adı (slug): küçük harf, tireli, Türkçe karakter yok. Örn: `ilk-yazim.md`.
- Tarih biçimi: YYYY-MM-DD.
- Uydurma yasak: kişisel bilgi, tarih, link, iş geçmişi, alıntı, istatistik UYDURMA. Bilmediğin yere `[DOLDUR]` yaz ve raporda listele.
- Sahibinin üslubunu `docs/ornek-yazim.md`'den öğren: kısa cümleler, samimi, ilk tekil şahıs. Pazarlama dili ve gereksiz süs kullanma.
- Her görsele anlamlı `alt` metni yaz.

## 5. Kod ve tasarım kuralları
- Önce şablondaki mevcut yapıyı ve isimlendirmeyi koru; gereksiz yeniden yazma yapma.
- Sade CSS kullan; yeni framework ekleme.
- Mobil öncelikli tasarla. 360px genişlikte bozulmamalı.
- Erişilebilirlik: yeterli renk kontrastı, klavye ile gezinme, anlamlı başlık sırası (h1 → h2 → h3).
- Sayfa performansı: gereksiz JS ekleme, görselleri makul boyutta tut.

## 6. Çalışma kuralları
- Her görevi kendi git dalında yap (`feature/...`). `main`'e doğrudan commit atma.
- Küçük, anlamlı commit'ler at. Commit mesajı Türkçe ve açıklayıcı olsun.
- SADECE görevle ilgili dosyalara dokun. Kapsam dışı iyileştirme yapma; öneri olarak raporla.
- Dosya silmeden, büyük yeniden yapılandırma yapmadan veya bağımlılık eklemeden önce sor.
- Belirsiz bir şey varsa tahmin yürütme, soru sor.
- Gizli bilgi (şifre, anahtar, kişisel e-posta/telefon) koda veya commit'e yazma.
- Bu dosyada çelişki olursa 1-9. bölümler (proje sahibinin kuralları) geçerlidir. "Astro Resmi Kuralları" bölümü ise Astro'ya özel bilgi ve doküman linkleri içindir.
- İlgili işe başlamadan önce Astro Resmi Kuralları'ndaki doküman linklerine bak (örn. yazı eklerken content-collections, sayfa eklerken routing).

## 7. Bitti sayılması için (Definition of Done)
1. `npm run build` hatasız tamamlandı.
2. Değiştirdiğin sayfalar dev sunucuda açılıp kontrol edildi.
3. Konsolda/terminalde yeni uyarı veya hata yok.
4. Rapor verildi (aşağıdaki biçimde).

## 8. Rapor formatı (her görev sonunda)
- **Ne yaptım:** kısa madde madde
- **Değişen dosyalar:** liste
- **Build sonucu:** başarılı/başarısız (+ hata varsa çıktısı)
- **Doldurulması gereken yerler:** `[DOLDUR]` listesi
- **Önerilerim / riskler:** kapsam dışı fark ettiklerim
- **Benden beklenen karar:** varsa

## 9. Roller ve yetkileri
Her oturumda sana bir rol verilecek. Sadece o rolün alanında çalış.

- **Planlayıcı:** Yalnızca `docs/plan.md` yazar. Kod ve içerik dosyalarına DOKUNMAZ. Sorular sorar.
- **Frontend/Tasarım:** `src/components`, `src/layouts`, `src/pages`, stil dosyaları. `src/content/blog/` içindeki yazılara DOKUNMAZ.
- **İçerik:** `src/content/`, `src/consts.ts`, ilgili sayfa metinleri. Bileşen ve stil koduna DOKUNMAZ.
- **QA/Review:** Dosya DEĞİŞTİRMEZ. Çalıştırır, inceler, önceliklendirilmiş rapor yazar (kritik / önemli / küçük).

---

# Astro Resmi Kuralları (şablonla geldi, silme)

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
