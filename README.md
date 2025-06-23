# CVTalk – Akıllı Mülakat Simülatörü

Bu proje, kullanıcıların CV'lerini yükleyerek yapay zeka destekli bir mülakat simülasyonu deneyimlemelerini sağlayan bir web uygulamasıdır.

## Özellikler

- **CV Analizi:** Yüklenen PDF özgeçmişinizden metin çıkarır.
- **Yapay Zeka Destekli Mülakatlar:** Özgeçmişinize dayanarak dinamik ve sohbetvari bir mülakat gerçekleştirir.
- **Performans Değerlendirmesi:** Mülakatın sonunda yapay zeka, ayrıntılı geri bildirim ve işe alım olasılık puanı (0-100) sağlar.
- **Başarı/Başarısızlık Simülasyonu:** Gerçek bir mülakat sonucunu simüle etmek için nihai sonucu görüntüler.

## Teknolojiler

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **API:** OpenRouter (Claude 3 Haiku)
- **CV Parser:** `pdf-parse`, `mammoth`

## Kurulum ve Çalıştırma

Aşağıdaki adımları izleyerek projeyi yerel makinenizde çalıştırabilirsiniz.

### Ön Koşullar

- Node.js (v18 veya üzeri)
- npm

### Kurulum ve Ayarlar

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Ortam Değişkenlerini Ayarlayın:**
    Projenin ana dizininde bulunan `.env.example` dosyasının bir kopyasını oluşturun ve adını `.env` olarak değiştirin. Ardından kendi OpenRouter API anahtarınızı girin.
    ```
    OPENROUTER_API_KEY="YOUR_API_KEY_HERE"
    ```

3.  **Projeyi Başlatın:**
    Aşağıdaki komut hem backend'i (port 3001) hem de frontend'i (port 3000) aynı anda başlatacaktır.
    ```bash
    npm run dev
    ```

4.  **Uygulamayı Açın:**
    Tarayıcınızda `http://localhost:3000` adresini ziyaret edin.
