const loading = document.getElementById("loading");
const bukaList = document.getElementById("BukaList");
const kelas = document.getElementById("kelas");
const main = document.getElementById("main");

window.addEventListener("load", () => {
  loading.classList.remove("flex");
  loading.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("block");
});

bukaList.addEventListener("click", () => {
  if (kelas.classList.contains("max-h-0")) {
    kelas.classList.replace("max-h-0", "max-h-[2000px]");
  } else {
    kelas.classList.replace("max-h-[2000px]", "max-h-0");
  }
});


//API

const link = "https://e52e-66-96-225-177.ngrok-free.app/";

document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah reload halaman

  // Ambil nilai input dari form
  const formData = {
      nama_wali_siswa: document.getElementById('nama_wali_siswa').value,
      nama_siswa: document.getElementById('nama_siswa').value,
      kelas: document.querySelector('input[name="kelas"]:checked')?.value || '',
      tampilan_produk: document.querySelector('input[name="tampilan_produk"]:checked')?.value || '',
      tampilan_stand: document.querySelector('input[name="tampilan_stand"]:checked')?.value || '',
      penjelasan_produk: document.querySelector('input[name="penjelasan_produk"]:checked')?.value || '',
      hiburan: document.querySelector('input[name="hiburan"]:checked')?.value || '',
      kritik_saran: document.getElementById('kritik_saran').value
  };

  // Kirim data ke API menggunakan Fetch
  fetch('https://e52e-66-96-225-177.ngrok-free.app/api/kuisioner/creates', { // Ganti dengan URL API Anda
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Gagal mengirim data');
      }
      return response.json();
  })
  .then(data => {
      console.log('Data berhasil dikirim:', data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Terimakasih telah mengisi kuesioner ini.",
        showConfirmButton: false,
        timer: 1500
      });
  })
  .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Terdapat kesalahan, mohon coba sesaat lagi.",
        showConfirmButton: false,
        timer: 1500
      });
  });
});