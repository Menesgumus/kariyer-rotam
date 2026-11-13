# Kariyer Rotam

Üniversite öğrencilerinin ve yeni mezunların iş ve staj başvurularını tek bir yerden takip edebilmesi için geliştirilen sade bir başvuru takip uygulamasıdır.

## Çözülen Problem ve Hedef Kullanıcı

- **Hedef kullanıcı:** İş veya staj başvurularını takip etmek isteyen üniversite öğrencileri ve yeni mezunlar.
- **Çözülen problem:** Farklı şirketlere yapılan başvuruların ve başvuru aşamalarının dağınık kalması veya unutulması.

## Kullanılan Teknolojiler

- React 19
- TypeScript
- Vite
- Sade CSS
- Tarayıcı `localStorage`

## GitHub Projects Panosu

> **Not (Teslim Öncesi Tamamlanacak):** GitHub deposu (`kariyer-rotam`) ve GitHub Projects panosu henüz oluşturulmadığı için pano bağlantısı burada yer almamaktadır. Teslim öncesinde GitHub Projects panosu oluşturulup bağlantısı bu bölüme eklenmelidir.

## Kurulum ve Çalıştırma

- **Gerekli Node.js sürümü:** Node.js 20+ (bu proje `v24.13.1` ve `npm 11.6.1` ile doğrulandı).

```bash
npm install
npm run dev
```

Üretim derlemesi almak için:

```bash
npm run build
```

## Özellikleri Deneme Adımları

### 1. Başvuru Ekleme ve Listeleme

1. Uygulamayı açtığınızda kayıt yoksa **"Henüz başvuru eklemediniz."** mesajını görün.
2. **Şirket Adı** ve **Pozisyon** alanlarını boş bırakarak (veya yalnızca boşluk girerek) **"Başvuru Ekle"** butonuna tıklayın; Türkçe uyarı mesajı gösterildiğini ve kayıt oluşturulmadığını doğrulayın.
3. **Şirket Adı** (örn. `Acme Teknoloji`), **Pozisyon** (örn. `Frontend Stajyeri`), **Başvuru Tarihi** (varsayılan olarak bugünün tarihi seçilidir) ve isteğe bağlı **İlan Bağlantısı** / **Not** alanlarını doldurup **"Başvuru Ekle"** butonuna tıklayın.
4. Başvurunun **"Başvuruldu"** durumuyla kart olarak listelendiğini, formun temizlendiğini ve tarihin yeniden bugüne ayarlandığını görün.
5. Sayfayı yenileyin (`F5`) ve eklenen başvurunun ekranda korunduğunu doğrulayın.

### 2. Başvuru Durumunu Değiştirme

1. Listede en az iki başvuru kartı varken bir kartın altındaki **Başvuru Durumu** açılır menüsünden yeni bir durum seçin (örn. **Görüşme**, **Teklif** veya **Olumsuz**).
2. Seçilen yeni durumun yalnızca ilgili kartta hemen güncellendiğini, diğer kartların durumunun değişmediğini kontrol edin.
3. Sayfayı yenileyin (`F5`) ve seçilen durumun korunduğunu doğrulayın.

## Veri Saklama Bilgisi

Bu uygulamada veriler yalnızca kullandığınız tarayıcının `localStorage` alanında (`kariyer-rotam-applications` anahtarı altında) saklanır. Herhangi bir sunucu, veritabanı veya harici API kullanılmaz; başka bir tarayıcıya veya cihaza otomatik aktarılmaz.
