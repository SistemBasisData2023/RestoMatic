<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">RestoMatic</h1>
</div>

**Kelompok SBD Q17:**

- Althaf Nafi Anwar - 2106634881
- Seno Pamungkas Rahman - 2106731586
- Zalfy Putra Rezky - 2106731453

---

## Dekripsi

"RestoMatic adalah platform web yang bertujuan untuk memudahkan pelanggan dalam memesan makanan dan minuman dari sebuah restoran. Dalam platform ini, pelanggan bisa melakukan registrasi atau login user. Pelanggan dapat menelusuri menu berupa makanan dan minuman, lengkap dengan rating nya. Pelanggan juga dapat melakukan filter terhadap menu berdasarkan rating. Halaman makanan/minuman akan menampilkan nama makanan/minuman, gambar, deskripsi, rating, dan review. Setelah memilih makanan/minmuman, setiap item akan dimasukkan ke dalam order, di mana order akan menampilkan nama item, jumlah, total harga, dan saldo user. Pelanggan dapat melakukan topup saldo dan terdapat error checking yang memastikan apakah saldo pelanggan cukup atau tidak untuk melakukan pembayaran. Selain itu, pelanggan juga bisa memberi rating dan review ke makanan/minuman yang diinginkan agar dapat dilihat oleh pelanggan lain.

### Tables

1. Pelanggan : id, username, password, email, saldo
2. Restaurant : id, gambar, nama, deskripsi, rating, review
3. Makanan : id, gambar, nama, deskripsi, rating, restaurant_id
4. Minuman : id, gambar, nama, deskripsi, rating, restaurant_id
5. Order : id, pelanggan_id, restaurant_id, makanan_id[], minuman_id[], saldo_user, total_harga

![Alt text](assets/table_diagram.png)
