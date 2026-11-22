# Digital Documentation of Industrial Visit – Bursa Efek Indonesia

Cara membuka: klik kanan `index.html` lalu pilih Open with Chrome/Edge (video mungkin tidak tampil di pratinjau bawaan VS Code) (tanpa instalasi, lebih baik dengan internet agar font tampil).

Desain mengacu pada referensi "Marketlens" (Stock Insights Dashboard): tema gelap, aksen lime, ticker pasar, grafik interaktif, kartu media, dan modal.

## Isi folder
- `index.html` : struktur halaman
- `css/style.css` : tampilan responsif
- `js/script.js` : interaksi + DATA yang bisa kamu edit (sejarah, jadwal sesi, daftar foto)
- `assets/images/` : foto `foto-01.jpg` sampai `foto-10.jpg` sudah terisi (memenuhi minimal 10 foto). Untuk menambah foto, tambah file `foto-11.jpg` dst dan satu baris di daftar PHOTOS pada js/script.js (opsional `poster.jpg` untuk sampul video)
- `assets/video/` : vlog `vlog-kunjungan.mp4` (sudah terisi; durasi target tugas 90 detik). `vlog-kunjungan.webm` adalah versi cadangan untuk browser yang tidak bisa memutar MP4; boleh dihapus kalau MP4 sudah berjalan lancar
- `assets/favicon.svg` : ikon tab browser

## Yang wajib diganti
1. `[Nama Siswa]`, `[Kelas]`, `[Nama Sekolah]`, `[Tanggal Kunjungan]` di index.html
2. Keterangan foto (PHOTOS) dan sesi (STEPS) di js/script.js
3. Teks kesimpulan dan refleksi di index.html, tulis dengan kata-katamu sendiri
4. Foto dan video asli dari kunjunganmu

Selama foto belum diganti, galeri menampilkan gambar pengganti otomatis.
Ticker dan grafik di beranda adalah data acak untuk ilustrasi, bukan data pasar.
