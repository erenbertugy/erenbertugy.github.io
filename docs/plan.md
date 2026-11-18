# Ağ Günlüğü — Blog V1 Planı

> Bu dosya Planlayıcı rolünde hazırlandı. Kod, içerik ve yapılandırma dosyalarına dokunulmadı.
> Plan sahibin onayına sunulur; onaylanan maddeler ilgili roldeki oturumlarda uygulanır.

## 0. Alınan kararlar (sahibin cevapları)

| Konu | Karar |
| --- | --- |
| Blog adı | **Ağ Günlüğü** |
| İlk yazı | **TCP ve UDP: Farkları ne?** |
| Projeler sayfası | V1'de yok, menüde gösterilmeyecek |
| İletişim | E-posta (mailto) + GitHub + LinkedIn |
| Tasarım | Sade, tek vurgu rengi, açık + koyu tema |
| V1 kapsamı | RSS, koyu tema, etiketler (arama yok) |
| Hakkımda | Meslek, yaş, ilgi alanları (iş yeri adı yok) |
| Site adresi | Şimdilik `https://example.com` kalacak, yayın öncesi değişecek |
| URL'ler | **Türkçe yollar onaylandı:** `/yazilar`, `/hakkimda`, `/iletisim`, `/etiket/[tag]` |
| Demo içerik | Demo yazılar silinecek (onaylandı). Placeholder görseller Aşama 5'te, build doğrulandıktan sonra silinecek |
| İlk yazının tarihi | `pubDate`, yazı hazır olduğunda belirlenecek |
| Etiketler | İlk yazı için `Ağ` ve `Protokoller` |

## 1. Hedef ve kapsam

### Hedef
- Network ve DevOps konularında, Türkçe, sade ve anlaşılır yazılar yayınlayan kişisel blog.
- Okuyucunun 360px telefondan masaüstüne kadar rahat okuduğu, hızlı ve erişilebilir bir site.
- Yeni yazı eklemenin tek adım olması: `src/content/blog/` altına Markdown dosyası + şemaya uygun front matter.

### V1 kapsamında yapılacaklar
- Astro şablonunun Türkçeleştirilmesi ve "Ağ Günlüğü" kimliğine uyarlanması.
- Dört sayfa: Ana sayfa, Yazılar, Hakkımda, İletişim.
- Yazı detay sayfası ve etiket sayfaları.
- Açık/koyu tema (sistem tercihine saygılı, seçim hatırlanır).
- RSS akışının Türkçe site bilgileriyle güncellenmesi.
- İlk gerçek yazı: TCP ve UDP karşılaştırması.
- Şablonun demo yazılarının ve İngilizce yer tutucularının temizlenmesi.

### Bilerek yapılmayacaklar (V1 dışı)
- **Arama**: istemci tarafı arama yeni JS/paket gerektirir; kapsam dışı, sonraya.
- **Projeler sayfası**: gerçek proje bilgisi yok; uydurma içerik yazılmayacak. Bilgi gelince eklenir.
- **İletişim formu**: backend yok, sunucu tarafı kod yok; yalnızca mailto.
- **Yorumlar, bülten, analitik, çerez bandı**: kapsam dışı.
- **Çoklu dil**: site yalnızca Türkçe.
- **Yeni paket/bağımlılık**: tema ve etiketler mevcut Astro yetenekleriyle, paket eklemeden yapılacak.
- **Yazı içi arama, önceki/sonraki yazı, okuma süresi**: V1 dışı, öneri olarak not edildi.
- **Görsel üretimi / stok fotoğraf**: gerçek olmayan görsel kullanılmayacak; yazılar metin ağırlıklı.

## 2. Sayfa listesi ve amaçları

| Yol | Sayfa | Amaç |
| --- | --- | --- |
| `/` | Ana sayfa | Kim olduğumu 1-2 cümlede anlatmak, son 3 yazıyı göstermek, yazılara yönlendirmek |
| `/yazilar` | Yazılar | Tüm yazıları tarih, başlık, kısa açıklama ve etiketlerle listelemek |
| `/yazilar/[slug]` | Yazı detayı | Yazının kendisi; başlık, tarih, etiketler, okunaklı prose düzeni |
| `/hakkimda` | Hakkımda | Meslek, yaş, ilgi alanları ve bu blogda ne yazdığım |
| `/iletisim` | İletişim | E-posta (mailto), GitHub ve LinkedIn bağlantıları |
| `/etiket/[tag]` | Etiket | Bir etiketteki yazıları listelemek |
| `/rss.xml` | RSS | Mevcut akışın Türkçe başlık/açıklama ve yeni yollarla güncellenmesi |

**Menü (4 öğe):** Ana Sayfa · Yazılar · Hakkımda · İletişim — Projeler menüde yok.

### URL kararı
Türkçe yollar **onaylandı**: `/yazilar`, `/hakkimda`, `/iletisim`, `/etiket/[tag]`.
Bu, `src/pages/blog/` ve `src/pages/about.astro` dosyalarının taşınması demektir. Taşıma Aşama 3'te yapılır. Site henüz yayında olmadığı için yönlendirme gerekmez; RSS ve iç linkler birlikte güncellenir.

## 3. Şablondan tutulacaklar, silinecekler, değiştirilecekler

### Tutulacaklar
- Astro + Markdown/MDX içerik koleksiyonu yapısı ve `getCollection` akışı.
- `@astrojs/rss`, `@astrojs/sitemap`, `@astrojs/mdx`, `sharp` entegrasyonları.
- Yerel Atkinson Hyperlegible fontu (`astro.config.mjs` + `src/assets/fonts/`) — okunaklı, ek indirme yok.
- `HeaderLink` bileşenindeki aktif menü mantığı.
- `FormattedDate` bileşeni (yerelleştirilecek).
- `BlogPost` düzeninin temel akışı: başlık → tarih → içerik.
- `global.css` içindeki erişilebilirlik yardımcıları (`.sr-only`) ve temel prose kuralları.

### Taşınacaklar (onaylandı)
- `src/pages/blog/` → `src/pages/yazilar/`; `src/pages/about.astro` → `src/pages/hakkimda.astro`; yeni iletişim sayfası `src/pages/iletisim.astro` yolunda olacak.
- Taşıma sırasında Header, Footer, RSS ve tüm iç bağlantılar yeni yollara güncellenir.

### Silinecekler / kaldırılacaklar
- Demo yazılar: `first-post.md`, `second-post.md`, `third-post.md`, `markdown-style-guide.md`, `using-mdx.mdx` (silme onaylandı).
  - Not: MDX entegrasyonu ileride kullanılabileceği için `astro.config.mjs` ve `.mdx` desteği kalır.
- `about.astro` içindeki Lorem ipsum metni ve `blog-placeholder-about.jpg` kullanımı.
- Astro'ya ait sosyal bağlantılar (Mastodon, Twitter/X, Astro GitHub) — Header ve Footer'dan.
- Footer'daki "Your name here. All rights reserved." metni.
- Ana sayfadaki "Hello, Astronaut!" tanıtım bloğu.
- Yazılar listesindeki ilk yazıyı dev manşet yapan özel CSS.
- `lang="en"` ve İngilizce meta açıklamalar.
- Kullanılmayan placeholder görseller (`src/assets/blog-placeholder-*.jpg`): silme onaylandı; Aşama 5'te build doğrulandıktan sonra temizlenir.

### Değiştirilecekler
- `src/consts.ts`: site adı, açıklama, yazar adı, sosyal linkler ve e-posta için **tek kaynak**.
- `src/content.config.ts`: isteğe bağlı `tags` alanı.
- `src/components/Header.astro`, `Footer.astro`: Türkçe menü, gerçek linkler, sade düzen.
- `src/components/BaseHead.astro`: Türkçe meta, yazar/OG bilgileri, `lang="tr"` ile uyum.
- `src/layouts/BlogPost.astro`: ortak düzene bağlanma, etiket rozetleri, Türkçe tarih.
- `src/pages/index.astro`, yazılar listesi, hakkımda, iletişim.
- `src/pages/rss.xml.js`: yeni yollar ve Türkçe bilgiler.
- `src/styles/global.css`: renk değişkenleri, koyu tema, tipografi ve boşluk düzeni.
- `astro.config.mjs`: yalnızca `site` adresi yayın öncesi güncellenecek (şimdilik kalıyor).

### Yeni eklenecekler
- `src/layouts/BaseLayout.astro`: `html/head/header/main/footer` iskeleti; sayfalar arası tekrarı kaldırır ve tema düğmesini tek yerde tutar.
- `src/pages/iletisim.astro`.
- `src/pages/etiket/[tag].astro`: etikete göre filtrelenen yazı listesi.
- Küçük bir etiket slug yardımcısı (Türkçe karakterleri ASCII'ye çevirir; paket gerektirmez). Yeri: `src/lib/` veya mevcut yapıya uygun tek dosya.

## 4. Tasarım yönü

**İlke:** "Sade, renkli, anlaşılır." Referanslar (Josh Comeau, Astro Cactus, Sam Who) kişisel ve okunaklı; kalabalık düzen yok.

### Renk paleti (tek vurgu: teal)
| Değişken | Açık tema | Koyu tema | Gerekçe |
| --- | --- | --- | --- |
| Arka plan | `#FBFAF7` | `#0F1417` | Saf beyaz yerine hafif sıcak zemin; göz yormaz |
| Yüzey (kart/kod) | `#FFFFFF` | `#161C20` | Katmanları ayırır, gölge gerektirmez |
| Metin | `#1F2328` | `#E6E8EA` | Yüksek kontrast, uzun okuma için |
| Soluk metin | `#5B6470` | `#A3ADB5` | Tarih/etiket gibi ikincil bilgi; kontrast yine yeterli |
| Kenarlık | `#E4E1DA` | `#2A333A` | İnce çizgilerle bölüm ayırma |
| Vurgu | `#0F766E` | `#5EEAD4` | Tek renk; link ve aktif menüde kullanılır |
| Vurgu (güçlü) | `#115E59` | `#99F6E4` | Hover ve odak durumları |

- Renkler CSS değişkenleriyle tanımlanır, `data-theme` ile değişir; `color-scheme` de güncellenir.
- Koyu temada vurgu rengi açılır, böylece koyu zeminde kontrast korunur.

### Yazı tipi
- **Atkinson Hyperlegible** (mevcut, yerel, 400/700). Gerekçe: okunabilirlik için tasarlanmış, yeni indirme yok, şablonda hazır.
- Gövde 19-20px, satır yüksekliği ~1.7; başlıklarda aynı aile, daha sıkı satır aralığı.
- Kod için `ui-monospace` sistem yığını; ek font yok.

### Düzen
- İçerik sütunu ~68ch (720px), liste sayfaları 960px'e kadar genişleyebilir.
- Üst menü: ince alt kenarlık, gölge yok; logo/site adı solda, menü sağda.
- Mobilde menü alt satıra sarar; **hamburger menü için JS eklenmez**.
- Kartlar yerine ince ayırıcılı liste: başlık, tarih, kısa açıklama, etiket rozetleri.
- Alt bilgi: telif + GitHub/LinkedIn/e-posta, sade tek satır.
- 8px tabanlı boşluk ölçeği (8/16/24/32/48).

### Açık/koyu tema
- Varsayılan: işletim sistemi tercihi (`prefers-color-scheme`).
- Sağ üstte tek düğme (güneş/ay SVG); seçim `localStorage`'da saklanır.
- `<head>` içinde küçük bir satır içi script ile tema, sayfa boyanmadan önce uygulanır (flash yok).
- JS kapalıysa düğme gizlenir; sistem teması çalışmaya devam eder.
- Düğmede `aria-label` ve `aria-pressed` güncellenir; klavye ile kullanılabilir.

### Erişilebilirlik
- "İçeriğe geç" bağlantısı, görünür `:focus-visible` çerçevesi.
- Başlık sırası h1 → h2 → h3; menüde aktif sayfa işaretlenir.
- Tüm görsellere anlamlı `alt`; dekoratifse boş `alt` + `aria-hidden`.
- Minimal hareket; `prefers-reduced-motion` desteklenir.
- 360px'te yatay kaydırma olmaz, dokunma hedefleri en az 44px.

## 5. Aşamalara bölünmüş görev listesi

> Kural: her rol kendi `feature/...` dalında çalışır, `main`'e doğrudan commit atmaz. Commit mesajları Türkçe ve küçük olur. Paket eklenmez.
>
> **Çalışma notu:** Her görev tamamlandığında ilgili `- [ ]` kutusu `- [x]` yapılır. Bir oturumda yalnızca tek aşama uygulanır; Aşama 1 iki parça halinde (1A ve 1B) yürütülür.

### Aşama 0 — Hazırlık ve onay
- [ ] Planı gözden geçirip onayla — **Sahip / Planlayıcı**
- [x] URL'lerin Türkçeleştirilmesi kararını onayla — **Sahip**
- [x] Demo yazıların ve placeholder görsellerin silinmesini onayla — **Sahip**
- [ ] `feature/blog-v1` dalını aç — **Frontend**

**Aşama sonu:** URL ve silme onayları alındı, dal hazır.

### Aşama 1A — Ortak iskelet
- [x] `BaseLayout.astro` ekle: head + header + main + footer, slot — **Frontend**
- [x] Tüm sayfaları `BaseLayout` kullanacak şekilde bağla — **Frontend**
- [x] `lang="tr"`, "İçeriğe geç" bağlantısı, Türkçe meta/OG alanları — **Frontend**

**Aşama 1A sonu çalışır olmalı:** Sayfalar ortak düzeni kullanır, sayfa kaynağında `lang="tr"` vardır, `npm run build` hatasız biter.

### Aşama 1B — Kimlik, menü ve footer
- [x] `src/consts.ts`: `SITE_TITLE = 'Ağ Günlüğü'`, Türkçe açıklama, yazar adı, GitHub/LinkedIn/e-posta; bilinmeyen alanlar `[DOLDUR]` — **Frontend**
- [x] `FormattedDate` tarihi `tr-TR` biçimine çevir — **Frontend**
- [x] Header: 4 maddeli Türkçe menü, aktif durum, mobilde sarma — **Frontend**
- [x] Footer: telif + gerçek sosyal linkler, şablon metinlerini kaldır — **Frontend**

**Aşama 1 sonu çalışır olmalı:** Dört sayfa açılır, menü doğru çalışır, şablonun İngilizce başlık/menü/footer metni kalmaz, `npm run build` hatasız biter.

### Aşama 2 — Tasarım sistemi ve koyu tema
- [x] `global.css`: renk değişkenleri, açık/koyu palet, tipografi, boşluklar — **Frontend**
- [x] Tema düğmesi bileşeni + `localStorage` + sistem tercihi — **Frontend**
- [x] `<head>` içinde tema flash'ını önleyen küçük script — **Frontend**
- [x] Prose düzeni: başlıklar, link, kod, tablo, alıntı, liste — **Frontend**
- [x] Odak halkaları, skip link, `prefers-reduced-motion` — **Frontend**
- [ ] 360px / 768px / 1280px kontrolü ve düzeltmeler — **Frontend**

**Aşama sonu çalışır olmalı:** Tema düğmesi iki temada da çalışır ve yenilemede hatırlanır; ilk yüklemede renk sıçraması yok; 360px'te yatay kaydırma yok; metin ve linkler her iki temada okunur.

### Aşama 3 — Sayfalar
- [x] `pages/blog/` → `pages/yazilar/`, `about.astro` → `hakkimda.astro` taşı; iç linkler ve RSS yollarını güncelle — **Frontend**
- [x] Ana sayfa: kısa tanıtım + son 3 yazı + "Tüm yazılar" bağlantısı — **Frontend**
- [x] Yazılar listesi: tarih, başlık, açıklama, etiketler; boş durum metni — **Frontend**
- [x] Hakkımda sayfası: `BaseLayout` + prose; meslek, yaş, ilgi alanları, ne yazdığım — **İçerik** (metin) / **Frontend** (sayfa)
- [x] İletişim sayfası: mailto + GitHub + LinkedIn, kısa not — **Frontend**
- [x] Hero görsel politikası: gerçek görsel yoksa görsel alanı gösterilmez; `alt` zorunlu — **Frontend**
- [x] Projeler sayfası eklenmez, menüde yer almaz — **Frontend**

**Aşama sonu çalışır olmalı:** Menüdeki her bağlantı gerçek bir sayfaya gider; hiçbir sayfada Lorem ipsum veya şablon metni yoktur; Hakkımda ve İletişim içerikleri yayınlanabilir durumdadır.

### Aşama 4 — Etiketler
- [x] `content.config.ts` şemasına isteğe bağlı `tags: string[]` ekle — **İçerik**
- [x] Yazı detayında ve listede etiket rozetleri — **Frontend**
- [x] `/etiket/[tag]` sayfası: `getStaticPaths` ile etiket yolları, aynı liste düzeni — **Frontend**
- [x] Türkçe karakterleri ASCII slug'a çeviren küçük yardımcı — **Frontend**
- [x] Etiketsiz yazılarda ve boş etiketlerde hatasız davranış — **Frontend**

**Aşama sonu çalışır olmalı:** Bir yazıya `tags: ["Ağ", "Protokoller"]` verildiğinde detay sayfasında rozetler görünür, `/etiket/ag` ve `/etiket/protokoller` yalnızca ilgili yazıları listeler, build tüm etiket sayfalarını üretir.

### Aşama 5 — İlk içerik ve temizlik
- [x] "TCP ve UDP: Farkları ne?" yazısını yaz: front matter (başlık, açıklama, `pubDate`, `tags`); `pubDate`, yazı hazır olduğunda belirlenir — **İçerik**
- [x] Yazıda uydurma istatistik/alıntı kullanma; gerekiyorsa kaynak bağlantısı ver — **İçerik**
- [ ] Hakkımda metnini `docs/benim-bilgilerim.md` ile sınırlı tut; bilinmeyen ayrıntıyı yazma — **İçerik**
- [x] Demo yazıları kaldır — **İçerik**
- [ ] RSS akışını yeni yollar ve Türkçe bilgilerle doğrula — **Frontend**
- [ ] Sitemap çıktısında tüm sayfaların olduğunu doğrula — **Frontend**
- [ ] `npm run build` çalıştır; başarılıysa placeholder görselleri sil (`src/assets/blog-placeholder-*.jpg`) — **Frontend**
- [ ] Silme sonrası `npm run build` tekrar çalıştır — **Frontend**

**Aşama sonu çalışır olmalı:** Ana sayfada gerçek yazı görünür; yazı sayfası, etiketleri ve RSS kaydı doğru çalışır; demo içerik ve kullanılmayan placeholder görseller kalmamıştır; `npm run build` hatasız biter.

### Aşama 6 — QA ve yayın kontrolü
- [ ] `npm run build` çalıştır, çıktıyı raporla — **QA**
- [ ] Dört sayfa + yazı + etiket sayfasını dev sunucuda aç, konsol hatalarını kontrol et — **QA**
- [ ] 360 / 768 / 1280px görsel kontrol, taşma ve dokunma hedefleri — **QA**
- [ ] Klavye ile gezinme, skip link, odak sırası — **QA**
- [ ] Renk kontrastı (açık + koyu tema) — **QA**
- [ ] Tüm iç/dış bağlantılar, mailto, RSS ve sitemap — **QA**
- [ ] `lang`, başlık, meta açıklama ve OG etiketleri — **QA**
- [ ] Bulguları kritik / önemli / küçük olarak önceliklendirip raporla — **QA**
- [ ] Kritik ve önemli bulguları ilgili rolde düzelt, QA tekrarı — **Frontend / İçerik**

**Aşama sonu çalışır olmalı:** AGENTS.md'deki Definition of Done sağlanır: build hatasız, sayfalar kontrol edilmiş, konsolda yeni hata/uyarı yok, rapor yazılmış.

## 6. Açık sorular ve riskler

### Riskler
- **`docs/ornek-yazim.md` boş.** Üslup örneği yok; içerik yazılırken yalnızca `docs/benim-bilgilerim.md` ve AGENTS.md'deki "kısa cümle, samimi, ilk tekil şahıs" kuralı kullanılabilir. Bu dosyaya 3-5 paragraf örnek eklenmesi yazı kalitesini belirgin artırır.
- **Teknik doğruluk.** TCP/UDP yazısı sahibin uzmanlık alanı; yayından önce teknik gözden geçirme gerekir. İçerik rolü istatistik veya kaynak uydurmayacak.
- **Hakkımda bilgileri sınırlı.** "Salla bir şeyler" notu var ama AGENTS.md uydurmayı yasaklıyor. Yalnızca bilinenler yazılacak; şehir, okul, iş yeri gibi ayrıntılar boş kalacak.
- **Site adresi `example.com`.** Canonical, OG ve sitemap yayın öncesi gerçek adresle güncellenmeli; yoksa arama motorlarına yanlış sinyal gider.
- **OG görseli.** Şablondaki Astro logolu yedek görsel kaldırılırsa `og:image` boş kalır. V1'de metin tabanlı paylaşım kabul edilebilir; gerçek kapak görseli sonraya bırakılabilir.
- **Etiket sayfalarının çoğalması.** Türkçe etiketlerin slug'ları ileride çakışabilir (ör. "Ağ" / "Ag"); yardımcı fonksiyonda tek yönlü ve belgelenmiş bir kural kullanılmalı.
- **Mobil menü.** Dört öğe 360px'te sığmazsa menü alt satıra saracak; hamburger JS eklenmeyecek. Satır yüksekliği ve dokunma hedefi QA'da kontrol edilmeli.
- **Astro sürümü.** Proje Astro 7 kullanıyor; içerik koleksiyonu API'si mevcut şablonla çalışıyor. Görevler sırasında resmi dokümanlara bakılmalı, sürüm yükseltmesi yapılmamalı.
- **Kapsam kayması.** Arama, projeler, yorumlar ve bülten V1'e eklenmemeli; her biri ayrı karar ve ayrı plan gerektirir.

### Kapsam dışı fark edilenler (öneri)
- Türkçe URL'ler onaylandı; eski yollar için yönlendirme gerekmez (site yayında değil).
- İleride arama için Astro'nun statik çıktısıyla uyumlu, hafif bir çözüm değerlendirilebilir; paket eklemeden önce sahibe sorulmalı.
- Projeler sayfası için gerçek proje adı, kısa açıklama, teknoloji ve link bilgisi toplanmalı.
- Yazılara "okuma süresi" eklemek küçük bir iyileştirme olur; V1'de gereksiz.
