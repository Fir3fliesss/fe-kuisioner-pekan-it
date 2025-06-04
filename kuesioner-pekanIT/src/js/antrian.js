const api = 'https://be-kuesioner.synchronizeteams.my.id';

const getAntrianBtn = document.getElementById('getAntrianBtn');
const nomorAntrianEl = document.getElementById('nomorAntrian');

document.addEventListener('DOMContentLoaded', async() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }
    try {
        // 1. Generate queue number
        const generateResponse = await fetch(`${api}/api/antrian`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        });

        if (!generateResponse.ok) {
            const errorData = await generateResponse.json();
            throw new Error(errorData.message || 'Gagal membuat antrian');
        }

        // 2. Get queue number
        const getResponse = await fetch(`${api}/api/antrian/show/${userId}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Accept': 'application/json'
            }
        });

        if (!getResponse.ok) {
            const errorData = await getResponse.json();
            throw new Error(errorData.message || 'Gagal mendapatkan antrian');
        }

        const responseData = await getResponse.json();
        console.log('Full API Response:', responseData);

        // Handle different response formats
        let nomorAntrian = '';
        if (responseData.no_antrian) {
            nomorAntrian = responseData.no_antrian;
        } else if (responseData.data && responseData.data.no_antrian) {
            nomorAntrian = responseData.data.no_antrian;
        } else if (responseData.queue_number) {
            nomorAntrian = responseData.queue_number;
        } else {
            console.error('Unexpected API response format:', responseData);
            throw new Error('Format response tidak dikenali');
        }

        nomorAntrianEl.textContent = nomorAntrian;

        Swal.fire({
            title: 'Berhasil!',
            text: `Nomor antrian Anda: ${nomorAntrian}`,
            icon: 'success'
        });
    } catch (error) {
        console.error('Error details:', error);
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error'
        });
    }
});
