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

// Gua gak ta ngapa padahal smalem gua pake tailwind doang bisa, jadi gua pake css biasa aja
bukaList.addEventListener("click", () => {
  if (kelas.style.maxHeight == "0px") {
    kelas.style.maxHeight = `${kelas.scrollHeight}px`;
  } else {
    kelas.style.maxHeight = "0px";
  }
});

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
const  api = 'https://be-kuesioner.synchronizeteams.my.id';
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        window.location.href = 'login.html';
    }
console.log(token);
console.log(formData);

console.log('Preparing to send request to API');
console.log('Form Data:', formData);
console.log('Token:', token);

fetch(`${api}/api/kuesioner/create`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
})
.then(response => {
    console.log('Response Status:', response.status);
    if (!response.ok) {
        console.error('Response Error:', response);
        throw new Error('Gagal mengirim data');
    }
    return response.json();
})
.then(data => {
    console.log('Data received from server:', data);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Terimakasih telah mengisi kuesioner ini, anda akan segera di-alihkan kehalaman nomor antrian.",
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        // Redirect ke halaman antrian setelah alert
        window.location.href = 'antrian.html';
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
});});
